#!/usr/bin/env node
/**
 * Shadow-mode weekly content pipeline.
 * Generates structured content with Claude, validates the canonical record
 * contract before rendering, runs all required gates, writes telemetry, and
 * deliberately never commits or pushes. The GitHub workflow owns branch push.
 */
import { execFile as execFileCallback } from "node:child_process";
import { promisify } from "node:util";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CONTENT_BATCH_SCHEMA, validateContentBatch } from "./content-record-schema.mjs";

const execFile = promisify(execFileCallback);
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CONTENT_DIR = resolve(ROOT, "content");
const OUTPUT_DIR = resolve(ROOT, ".ops", "content-runs");
const GENERATED_DIR = resolve(ROOT, ".ops", "generated-content");
const PRODUCTS_FILE = resolve(ROOT, "client", "src", "lib", "products.ts");
const RENDERER = resolve(__dirname, "render-content-records.mjs");
const MAX_TIMEOUT_MS = 120_000;

function argument(name, fallback = "") {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const RUN_DATE = argument("--date", new Date().toISOString().slice(0, 10));
const OUTPUT_PATH = resolve(argument("--output", resolve(GENERATED_DIR, `${RUN_DATE}.json`)));
const RAW_OUTPUT_PATH = resolve(argument("--raw-output", resolve(GENERATED_DIR, `${RUN_DATE}.raw.txt`)));
const RENDER_DIR = resolve(argument("--render-dir", resolve(ROOT, ".ops", "shadow-render")));

function fail(message) {
  throw new Error(message);
}

function readRequired(relativePath) {
  const path = resolve(ROOT, relativePath);
  if (!existsSync(path)) fail(`Required content contract file is missing: ${relativePath}`);
  return readFileSync(path, "utf8");
}

function parseHouseStyleVersion(text) {
  const match = text.match(/^version:\s*(\S+)\s*$/m);
  if (!match) fail("content/house-style.md must begin or contain a version: header line");
  return match[1];
}

function tokenEstimate(text) {
  // Deliberately only a local estimate; the API usage object is the cost source of truth.
  return Math.ceil(text.trim().split(/\s+/).filter(Boolean).length / 0.75);
}

function scanBalancedObjects(source, arrayStart) {
  const objects = [];
  let bracketDepth = 0;
  let braceDepth = 0;
  let objectStart = -1;
  let quote = "";
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  for (let index = arrayStart; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];
    if (lineComment) { if (char === "\n") lineComment = false; continue; }
    if (blockComment) { if (char === "*" && next === "/") { blockComment = false; index += 1; } continue; }
    if (quote) {
      if (!escaped && char === quote) quote = "";
      escaped = !escaped && char === "\\";
      if (char !== "\\") escaped = false;
      continue;
    }
    if (char === "/" && next === "/") { lineComment = true; index += 1; continue; }
    if (char === "/" && next === "*") { blockComment = true; index += 1; continue; }
    if (["'", "\"", "`"].includes(char)) { quote = char; escaped = false; continue; }
    if (char === "[") { bracketDepth += 1; continue; }
    if (char === "]") { bracketDepth -= 1; if (bracketDepth === 0) break; continue; }
    if (char === "{") { if (bracketDepth === 1 && braceDepth === 0) objectStart = index; braceDepth += 1; continue; }
    if (char === "}" && braceDepth > 0) {
      braceDepth -= 1;
      if (bracketDepth === 1 && braceDepth === 0 && objectStart >= 0) {
        objects.push(source.slice(objectStart, index + 1));
        objectStart = -1;
      }
    }
  }
  return objects;
}

function collectionObjects(source, declaration) {
  const start = source.indexOf(declaration);
  if (start < 0) fail(`Published index cannot locate ${declaration}`);
  const openingBracket = source.indexOf("[", start);
  if (openingBracket < 0) fail(`Published index cannot locate collection body for ${declaration}`);
  return scanBalancedObjects(source, openingBracket);
}

function stringProperty(objectText, property) {
  const pattern = new RegExp(`\\b${property}\\s*:\\s*(["'])((?:\\\\.|(?!\\1).)*)\\1`, "s");
  const match = pattern.exec(objectText);
  return match ? match[2].replace(/\\([\\"'])/g, "$1").trim() : "";
}

function publishedIndex() {
  const source = readFileSync(PRODUCTS_FILE, "utf8");
  const products = collectionObjects(source, "export const allProducts: Product[]").map((entry) => ({
    id: stringProperty(entry, "id"), name: stringProperty(entry, "name"), slug: stringProperty(entry, "slug"),
    category: stringProperty(entry, "category"), categorySlug: stringProperty(entry, "categorySlug"),
    publishDate: stringProperty(entry, "publishDate"),
  })).filter((entry) => entry.id && entry.slug);
  const comparisons = collectionObjects(source, "export const comparisons: Comparison[]").map((entry) => ({
    id: stringProperty(entry, "id"), title: stringProperty(entry, "title"), slug: stringProperty(entry, "slug"),
    category: stringProperty(entry, "category"), categorySlug: stringProperty(entry, "categorySlug"),
    publishDate: stringProperty(entry, "publishDate"),
  })).filter((entry) => entry.id && entry.slug);
  return {
    products,
    comparisons,
    productIds: new Set(products.map((entry) => entry.id)),
    productSlugs: new Set(products.map((entry) => entry.slug)),
    comparisonIds: new Set(comparisons.map((entry) => entry.id)),
    comparisonSlugs: new Set(comparisons.map((entry) => entry.slug)),
  };
}

function buildPromptIndex(index) {
  return {
    published_products: index.products.map(({ id, name, slug, category, categorySlug, publishDate }) => ({ id, name, slug, category, categorySlug, publishDate })),
    published_comparisons: index.comparisons.map(({ id, title, slug, category, categorySlug, publishDate }) => ({ id, title, slug, category, categorySlug, publishDate })),
  };
}

function topicForRun(queue) {
  if (!Array.isArray(queue)) fail("content/topic-queue.json must be a JSON array");
  const topic = queue.find((candidate) => candidate && candidate.used === false);
  if (!topic) fail("content/topic-queue.json contains no unused topic; refusing silent no-op");
  for (const field of ["targetKeyword", "intendedArchetype"]) {
    if (typeof topic[field] !== "string" || !topic[field].trim()) fail(`Topic queue entry is missing ${field}`);
  }
  return topic;
}

async function canonicalPublishAlreadyExists() {
  const { stdout } = await execFile("git", ["log", "origin/main", "--format=%H%x09%ad%x09%s", "--date=short", "--since", `${RUN_DATE}T00:00:00Z`, "--until", `${RUN_DATE}T23:59:59Z`], { cwd: ROOT });
  return stdout.split("\n").filter(Boolean).some((line) => {
    const [, date = "", subject = ""] = line.split("\t");
    return date === RUN_DATE && /weekly content update|weekly content|content:|publish/i.test(subject);
  });
}

async function latestShadowTelemetry() {
  // Shadow branches retain telemetry while main remains untouched. Looking only
  // at this repository's remote refs makes the cache-version tripwire durable.
  const { stdout } = await execFile("git", ["for-each-ref", "--format=%(refname:short)", "refs/remotes/origin/content-shadow"], { cwd: ROOT });
  const branches = stdout.split("\n").filter(Boolean).sort().reverse();
  for (const branch of branches) {
    const date = branch.split("/").at(-1);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date >= RUN_DATE) continue;
    try {
      const result = await execFile("git", ["show", `${branch}:.ops/content-runs/${date}.json`], { cwd: ROOT });
      const telemetry = JSON.parse(result.stdout);
      if (telemetry?.house_style_version) return telemetry;
    } catch {
      // A branch can be a partial or manually cleaned shadow run; continue to
      // the next dated ref rather than assuming a cache baseline.
    }
  }
  return null;
}

function requestObject({ houseStyle, siteProfile, notebook, topic, index }) {
  return {
    model: "claude-sonnet-5",
    system: [
      { type: "text", text: houseStyle, cache_control: { type: "ephemeral", ttl: "1h" } },
      { type: "text", text: `${siteProfile}\n\n${notebook}`, cache_control: { type: "ephemeral", ttl: "1h" } },
    ],
    tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 8 }],
    messages: [{
      role: "user",
      content: [
        "Create the weekly content batch as JSON only. Do not emit HTML, Markdown, code fences, or commentary.",
        `Today's date: ${RUN_DATE}`,
        `Selected topic: ${JSON.stringify(topic)}`,
        "Use the supplied published index to avoid duplicated IDs, slugs, titles, and product records. Use existing IDs when a comparison references a published product.",
        "Every factual claim derived from web search must have a citation object with url and title in the record citations array.",
        "Return exactly this JSON schema:",
        JSON.stringify(CONTENT_BATCH_SCHEMA),
        "Published article index and internal-link targets:",
        JSON.stringify(buildPromptIndex(index)),
      ].join("\n\n"),
    }],
  };
}

async function fetchClaude(request) {
  if (!process.env.ANTHROPIC_API_KEY) fail("ANTHROPIC_API_KEY is required; no generation request was made");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), MAX_TIMEOUT_MS);
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-beta": "prompt-caching-2024-07-31",
      },
      body: JSON.stringify({ ...request, max_tokens: 12_000 }),
    });
    const bodyText = await response.text();
    let body;
    try { body = JSON.parse(bodyText); } catch { fail(`Claude API returned non-JSON HTTP ${response.status}: ${bodyText.slice(0, 500)}`); }
    if (!response.ok) fail(`Claude API HTTP ${response.status}: ${body?.error?.message || bodyText.slice(0, 500)}`);
    return body;
  } catch (error) {
    if (error.name === "AbortError") fail(`Claude API timed out after ${MAX_TIMEOUT_MS}ms`);
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function searchErrors(response) {
  const content = Array.isArray(response.content) ? response.content : [];
  return content.filter((block) => block?.type === "web_search_tool_result_error");
}

function classifySearchErrors(errors) {
  const failures = [];
  const tolerable = [];
  for (const error of errors) {
    const detail = JSON.stringify(error).toLowerCase();
    if (detail.includes("max_uses_exceeded")) tolerable.push(error);
    else if (detail.includes("unavailable") || detail.includes("too_many_requests")) failures.push(error);
    else failures.push(error);
  }
  return { failures, tolerable };
}

function extractOutput(response) {
  const text = (response.content || []).filter((block) => block.type === "text").map((block) => block.text).join("\n").trim();
  if (!text) fail("Claude response contained no text JSON payload");
  return text;
}

function apiUsage(response) {
  const usage = response.usage || {};
  const webSearchRequests = (response.content || []).filter((block) => block.type === "server_tool_use" && block.name === "web_search").length;
  return {
    input_tokens: Number(usage.input_tokens || 0),
    output_tokens: Number(usage.output_tokens || 0),
    cache_creation_input_tokens: Number(usage.cache_creation_input_tokens || 0),
    cache_read_input_tokens: Number(usage.cache_read_input_tokens || 0),
    server_tool_use: { web_search_requests: webSearchRequests },
  };
}

function computeCost(usage) {
  return Number((
    usage.input_tokens * (2 / 1_000_000) +
    usage.output_tokens * (10 / 1_000_000) +
    usage.cache_creation_input_tokens * (4 / 1_000_000) +
    usage.cache_read_input_tokens * (0.2 / 1_000_000) +
    usage.server_tool_use.web_search_requests * (10 / 1_000)
  ).toFixed(6));
}

async function run(command, args, { allowFailure = false, env = process.env } = {}) {
  try {
    const result = await execFile(command, args, { cwd: ROOT, env, maxBuffer: 20 * 1024 * 1024 });
    return { ok: true, stdout: result.stdout, stderr: result.stderr, code: 0 };
  } catch (error) {
    const result = { ok: false, stdout: error.stdout || "", stderr: error.stderr || error.message, code: error.code || 1 };
    if (!allowFailure) fail(`${command} ${args.join(" ")} failed:\n${result.stderr || result.stdout}`);
    return result;
  }
}

async function writeTelemetry(telemetry) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(resolve(OUTPUT_DIR, `${RUN_DATE}.json`), `${JSON.stringify(telemetry, null, 2)}\n`, "utf8");
}

async function main() {
  const startedAt = Date.now();
  const gates = {};
  const houseStyle = readRequired("content/house-style.md");
  const siteProfile = readRequired("content/site-profile.md");
  const notebook = readRequired("content/notebook.md");
  const queue = JSON.parse(readRequired("content/topic-queue.json"));
  const houseStyleVersion = parseHouseStyleVersion(houseStyle);
  const index = publishedIndex();
  const topic = topicForRun(queue);
  const priorTelemetryPath = resolve(OUTPUT_DIR, `${RUN_DATE}.json`);
  const baseTelemetry = {
    date: RUN_DATE,
    site: "silkierstrands",
    model: "claude-sonnet-5",
    house_style_version: houseStyleVersion,
    usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: 0, cache_read_input_tokens: 0, server_tool_use: { web_search_requests: 0 } },
    computed_cost_usd: 0,
    duration_ms: 0,
    gates,
    published: false,
    notes: "shadow run",
  };

  try {
    const priorShadowTelemetry = await latestShadowTelemetry();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(RUN_DATE)) fail("--date must be YYYY-MM-DD");
    if (await canonicalPublishAlreadyExists()) fail(`Idempotency guard: a same-day canonical publish commit already exists on origin/main for ${RUN_DATE}`);
    if (existsSync(priorTelemetryPath)) fail(`Idempotency guard: telemetry already exists for ${RUN_DATE}; refusing a second shadow article`);

    const estimatedHouseStyleTokens = tokenEstimate(houseStyle);
    if (estimatedHouseStyleTokens < 1024) {
      console.warn(`CACHE_TRIPWIRE_WARNING: house-style.md estimates ${estimatedHouseStyleTokens} tokens, below Claude's 1,024-token minimum cacheable prefix. It was not padded.`);
    }
    const request = requestObject({ houseStyle, siteProfile, notebook, topic, index });
    const response = await fetchClaude(request);
    baseTelemetry.usage = apiUsage(response);
    baseTelemetry.computed_cost_usd = computeCost(baseTelemetry.usage);
    if (priorShadowTelemetry?.house_style_version && priorShadowTelemetry.house_style_version !== houseStyleVersion) {
      if (baseTelemetry.usage.cache_creation_input_tokens <= 0) {
        fail(`Cache tripwire: house-style version changed from ${priorShadowTelemetry.house_style_version} to ${houseStyleVersion}, but the API did not report a cache write`);
      }
      baseTelemetry.notes = `${baseTelemetry.notes}; cache tripwire passed: house-style version changed and cache write observed`;
    }
    const webErrors = classifySearchErrors(searchErrors(response));
    if (webErrors.failures.length) fail(`Claude web search failed: ${JSON.stringify(webErrors.failures)}`);

    const rawOutput = extractOutput(response);
    mkdirSync(dirname(RAW_OUTPUT_PATH), { recursive: true });
    writeFileSync(RAW_OUTPUT_PATH, `${rawOutput}\n`, "utf8");
    let batch;
    try { batch = JSON.parse(rawOutput); } catch (error) { fail(`Schema gate: Claude output is not valid JSON: ${error.message}`); }
    const schemaErrors = validateContentBatch(batch, { publishedIndex: index, expectedDate: RUN_DATE });
    gates["json-schema"] = schemaErrors.length === 0 ? { status: "passed" } : { status: "failed", errors: schemaErrors };
    if (schemaErrors.length) fail(`Schema gate failed:\n- ${schemaErrors.join("\n- ")}`);
    mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
    writeFileSync(OUTPUT_PATH, `${JSON.stringify(batch, null, 2)}\n`, "utf8");

    const outputEnv = { ...process.env, CONTENT_BATCH_FILE: OUTPUT_PATH, CONTENT_RUN_DATE: RUN_DATE, CONTENT_RENDER_DIR: RENDER_DIR };
    const gatePlan = [
      ["validate-content-completeness", ["node", "scripts/validate-content-completeness.mjs"], false],
      ["validate-distinctness", ["node", "scripts/validate-distinctness.mjs"], true],
    ];
    for (const [name, [command, ...args], blocking] of gatePlan) {
      const result = await run(command, args, { allowFailure: !blocking, env: outputEnv });
      gates[name] = { status: result.ok ? "passed" : (blocking ? "failed" : "reported-failure"), blocking, output: `${result.stdout}${result.stderr}`.trim() };
      if (blocking && !result.ok) fail(`${name} failed`);
    }

    await run("node", [RENDERER, "--input", OUTPUT_PATH, "--output", PRODUCTS_FILE]);
    await run("pnpm", ["exec", "tsx", "scripts/extract-site-data.ts"]);
    await run("node", ["scripts/generate-sitemap.mjs"]);
    await run("pnpm", ["build"]);
    await run("pnpm", ["exec", "tsx", "scripts/render-static-bodies.tsx"]);
    await run("node", ["scripts/prerender.mjs"]);

    const renderedGatePlan = [
      ["validate-mvp", ["node", "scripts/validate-mvp.mjs"]],
      ["validate-commerce-template", ["node", "scripts/validate-commerce-template.mjs"]],
      ["validate-routes", ["node", "scripts/validate-routes.mjs"]],
      ["validate-crawlability", ["node", "scripts/validate-crawlability.mjs"]],
      ["validate-forms", ["node", "scripts/validate-forms.mjs"]],
      ["asin-mapping-verification", ["node", "scripts/validate-shadow-asin-mappings.mjs", "--output", resolve(RENDER_DIR, "asin-mapping-report.json")]],
      ["affiliate-disclosure", ["node", "scripts/validate-affiliate-disclosure.mjs"]],
    ];
    for (const [name, [command, ...args]] of renderedGatePlan) {
      const result = await run(command, args, { allowFailure: name === "asin-mapping-verification", env: outputEnv });
      let status = result.ok ? "passed" : (name === "asin-mapping-verification" ? "warn" : "failed");
      if (name === "asin-mapping-verification" && result.ok) {
        const report = JSON.parse(readFileSync(resolve(RENDER_DIR, "asin-mapping-report.json"), "utf8"));
        if (report.summary?.DEAD > 0) status = "warn-dead";
        else if (report.summary?.INCONCLUSIVE > 0) status = "inconclusive";
      }
      gates[name] = { status, blocking: name !== "asin-mapping-verification", output: `${result.stdout}${result.stderr}`.trim() };
      if (!result.ok && name !== "asin-mapping-verification") fail(`${name} failed`);
    }

    if (baseTelemetry.usage.cache_read_input_tokens === 0 && baseTelemetry.usage.cache_creation_input_tokens === 0) {
      baseTelemetry.notes = `${baseTelemetry.notes}; cache tripwire: no cache read or write reported`;
    } else if (baseTelemetry.usage.cache_creation_input_tokens > 0) {
      baseTelemetry.notes = `${baseTelemetry.notes}; cache write observed`;
    } else if (baseTelemetry.usage.cache_read_input_tokens > 0) {
      baseTelemetry.notes = `${baseTelemetry.notes}; cache read observed`;
    }
    if (webErrors.tolerable.length) baseTelemetry.notes = `${baseTelemetry.notes}; web search max_uses_exceeded tolerated`;
    baseTelemetry.duration_ms = Date.now() - startedAt;
    await writeTelemetry(baseTelemetry);
    console.log(`SHADOW_PIPELINE_COMPLETE: generated=${OUTPUT_PATH} rendered=${RENDER_DIR} telemetry=${resolve(OUTPUT_DIR, `${RUN_DATE}.json`)}`);
  } catch (error) {
    baseTelemetry.duration_ms = Date.now() - startedAt;
    baseTelemetry.notes = `${baseTelemetry.notes}; failed: ${error.message}`;
    try { await writeTelemetry(baseTelemetry); } catch (telemetryError) { console.error(`TELEMETRY_WRITE_FAILED: ${telemetryError.message}`); }
    console.error(`WEEKLY_CONTENT_PIPELINE_FAILED: ${error.message}`);
    process.exitCode = 1;
  }
}

main();
