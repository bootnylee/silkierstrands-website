#!/usr/bin/env node
/**
 * Warn-only ASIN verification for generated shadow records.
 * A bot block, CAPTCHA, timeout, minimal page, unavailable service, or title
 * mismatch is INCONCLUSIVE/WARN; only HTTP 404 or a rendered product page with
 * no buying options is DEAD. This checker never blocks a shadow branch push.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const batchFile = resolve(process.env.CONTENT_BATCH_FILE || process.argv[2] || "");
if (!batchFile) throw new Error("CONTENT_BATCH_FILE or input path is required");
const outputArg = process.argv.indexOf("--output");
const output = resolve(outputArg >= 0 && process.argv[outputArg + 1]
  ? process.argv[outputArg + 1]
  : process.env.CONTENT_RENDER_DIR
    ? resolve(process.env.CONTENT_RENDER_DIR, "asin-mapping-report.json")
    : ".ops/shadow-render/asin-mapping-report.json");
const batch = JSON.parse(readFileSync(batchFile, "utf8"));
const timeoutMs = 15_000;

function normalise(value) {
  return String(value || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}
function titleSimilarity(expected, observed) {
  const stop = new Set(["a", "an", "and", "for", "from", "in", "of", "on", "the", "to", "with", "oz", "fl"]);
  const expectedTokens = new Set(normalise(expected).split(" ").filter((token) => token.length > 1 && !stop.has(token)));
  const observedTokens = new Set(normalise(observed).split(" ").filter((token) => token.length > 1 && !stop.has(token)));
  const shared = [...expectedTokens].filter((token) => observedTokens.has(token)).length;
  return expectedTokens.size ? shared / expectedTokens.size : 0;
}
function botBlocked(page) {
  return /captcha|robot check|sorry, we just need to make sure|automated access|enter the characters you see below/i.test(page);
}
function titleFromPage(page) {
  const match = page.match(/id=["']productTitle["'][^>]*>\s*([^<]{3,500})/i)
    || page.match(/<meta[^>]+(?:property|name)=["']og:title["'][^>]+content=["']([^"']{3,500})/i);
  return match ? match[1].replace(/\s+/g, " ").trim() : "";
}
function hasBuyingOptions(page) {
  return /(?:add-to-cart-button|buy-now-button|buybox|add to cart|buy now|available from these sellers)/i.test(page);
}
async function lookup(product) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`https://www.amazon.com/dp/${product.asin}`, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    if (response.status === 404) return { verdict: "DEAD", source: "amazon_public_page", title: null, detail: "Amazon product page returned HTTP 404" };
    const page = await response.text();
    if (response.status === 403 || response.status === 429 || botBlocked(page)) {
      return { verdict: "INCONCLUSIVE", source: "amazon_public_page", title: null, detail: `Amazon returned bot or rate-limit response (HTTP ${response.status})` };
    }
    if (!response.ok) return { verdict: "INCONCLUSIVE", source: "amazon_public_page", title: null, detail: `Amazon returned HTTP ${response.status}` };
    if (page.length < 1500) return { verdict: "INCONCLUSIVE", source: "amazon_public_page", title: null, detail: "Amazon returned minimal HTML" };
    const title = titleFromPage(page);
    if (!title) return { verdict: "INCONCLUSIVE", source: "amazon_public_page", title: null, detail: "Amazon page did not expose a rendered product title" };
    if (!hasBuyingOptions(page)) return { verdict: "DEAD", source: "amazon_public_page", title, detail: "Rendered Amazon product page has no buying options" };
    const score = titleSimilarity(product.name, title);
    return {
      verdict: score >= 0.48 ? "MATCH" : "INCONCLUSIVE",
      source: "amazon_public_page",
      title,
      score: Number(score.toFixed(3)),
      detail: score >= 0.48 ? "" : "Rendered title does not sufficiently match the generated product name",
    };
  } catch (error) {
    return { verdict: "INCONCLUSIVE", source: "amazon_public_page", title: null, detail: error.name === "AbortError" ? `Amazon request timed out after ${timeoutMs}ms` : `Amazon request failed: ${error.message}` };
  } finally {
    clearTimeout(timer);
  }
}

const findings = [];
for (const product of batch.products || []) {
  const result = await lookup(product);
  findings.push({ product: product.name, asin: product.asin, ...result });
  console.log(`${result.verdict.padEnd(12)} | ${product.asin} | ${product.name} | ${result.detail || result.title || "verified"}`);
}
const summary = Object.fromEntries(["MATCH", "DEAD", "INCONCLUSIVE"].map((verdict) => [verdict, findings.filter((finding) => finding.verdict === verdict).length]));
const report = {
  generated_at: new Date().toISOString(),
  validator: "scripts/validate-shadow-asin-mappings.mjs",
  non_blocking: true,
  policy: "Only HTTP 404 or a rendered Amazon page with no buying options is dead; bot blocks, CAPTCHA, minimal HTML, timeouts, service errors, and mismatches are inconclusive.",
  summary,
  findings,
};
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(`ASIN warn-only gate complete: match=${summary.MATCH} dead=${summary.DEAD} inconclusive=${summary.INCONCLUSIVE}; report=${output}`);
