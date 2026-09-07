#!/usr/bin/env node
/**
 * validate-asins.mjs — Pre-publish ASIN validation gate for SilkierStrands.
 *
 * PART 2 of the affiliate-link guardrail system (React site version).
 *
 * Reads all products from client/src/lib/products.ts, verifies each ASIN
 * resolves to a live Amazon listing with a matching title, and exits with
 * code 1 (blocking the deploy) if any product fails.
 *
 * Usage:
 *   node scripts/validate-asins.mjs [--warn-only]
 *
 * Environment variables (set in Netlify dashboard → Site settings → Environment):
 *   ASIN_VALIDATE=warn              → warn-only mode for remote catalog validation
 *   CREATORS_API_CLIENT_ID          → Amazon Creators API client ID
 *   CREATORS_API_CLIENT_SECRET      → Amazon Creators API client secret
 *   CREATORS_API_PARTNER_TAG        → compared to the registered API partner tag; mismatch logs a warning
 *   Credentials portal: https://affiliate-program.amazon.com/creatorsapi
 *
 * Auth: OAuth 2.0 client_credentials via Login with Amazon (LwA)
 * Token endpoint: https://api.amazon.com/auth/o2/token
 * API endpoint:   https://creatorsapi.amazon/catalog/v1/getItems
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import https from "https";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const PRODUCTS_FILE = join(REPO_ROOT, "client/src/lib/products.ts");

// ── Creators API config ────────────────────────────────────────────────────
const CREATORS_CLIENT_ID     = process.env.CREATORS_API_CLIENT_ID || "";
const CREATORS_CLIENT_SECRET = process.env.CREATORS_API_CLIENT_SECRET || "";
// Creators API app is registered to this store; site affiliate links keep their own tags.
const API_PARTNER_TAG        = "trailbuiltove-20";
const CONFIGURED_PARTNER_TAG = process.env.CREATORS_API_PARTNER_TAG || "";
const MARKETPLACE            = "www.amazon.com";

const WARN_ONLY = process.argv.includes("--warn-only") || process.env.ASIN_VALIDATE === "warn";
const MATCH_THRESHOLD = 0.60;
// Creators API can return a transient empty item set under short-lived quota or
// catalog propagation pressure. Retry before treating a listing as unavailable.
const REQUEST_DELAY_MS = 2500;
const LOOKUP_ATTEMPTS = 3;
const RETRY_BACKOFF_MS = 3000;
// Warn-only remote validation must not consume the entire build window when
// the catalog API is systematically unavailable. Blocking-mode behavior is
// deliberately unchanged.
const WARN_ONLY_REMOTE_FAILURE_THRESHOLD = 5;
const WARN_ONLY_REMOTE_TIME_BUDGET_MS = 3 * 60 * 1000;
let warnOnlyRemoteDeadlineMs = null;

// Token cache
let _tokenCache = { token: null, expiresAt: 0 };

// ─────────────────────────────────────────────────────────────────────────────
// Extract products from products.ts
// ─────────────────────────────────────────────────────────────────────────────
function extractProducts(filePath) {
  const content = readFileSync(filePath, "utf-8");
  const products = [];
  const seen = new Set();

  const objPattern  = /\{[^{}]*?name:\s*["']([^"']{3,100})["'][^{}]*?asin:\s*["']([A-Z0-9]{10})["'][^{}]*?\}/gs;
  const objPattern2 = /\{[^{}]*?asin:\s*["']([A-Z0-9]{10})["'][^{}]*?name:\s*["']([^"']{3,100})["'][^{}]*?\}/gs;

  let m;
  while ((m = objPattern.exec(content)) !== null) {
    const key = `${m[1]}|${m[2]}`;
    if (!seen.has(key)) { seen.add(key); products.push({ name: m[1].trim(), asin: m[2].trim() }); }
  }
  while ((m = objPattern2.exec(content)) !== null) {
    const key = `${m[2]}|${m[1]}`;
    if (!seen.has(key)) { seen.add(key); products.push({ name: m[2].trim(), asin: m[1].trim() }); }
  }
  return products;
}

// ─────────────────────────────────────────────────────────────────────────────
// Fuzzy title matching
// ─────────────────────────────────────────────────────────────────────────────
function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function titleMatches(expected, amazonTitle) {
  if (!amazonTitle) return { matches: false, score: 0 };
  const stop = new Set(["a","an","the","for","and","or","in","on","of","to","with","lb","lbs","by","at","from","amazon"]);
  const expWords = new Set(normalize(expected).split(" ").filter(w => w.length > 1 && !stop.has(w)));
  const amzWords = new Set(normalize(amazonTitle).split(" ").filter(w => w.length > 1 && !stop.has(w)));
  if (expWords.size === 0) return { matches: false, score: 0 };
  const shared = [...expWords].filter(w => amzWords.has(w));
  const overlap = shared.length / expWords.size;
  const requiredShared = expWords.size <= 2 ? 1 : 2;
  return { matches: overlap >= MATCH_THRESHOLD && shared.length >= requiredShared, score: overlap };
}

function findAmazonSearchUrls(root) {
  const hits = [];
  for (const entry of readdirSync(root)) {
    const path = join(root, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) hits.push(...findAmazonSearchUrls(path));
    else if (/\.(?:ts|tsx|js|jsx|html)$/i.test(entry) && /amazon\.com\/s\?/i.test(readFileSync(path, "utf-8"))) hits.push(path);
  }
  return hits;
}

// ─────────────────────────────────────────────────────────────────────────────
// HTTP helper
// ─────────────────────────────────────────────────────────────────────────────
function warnOnlyRemoteBudgetExpired() {
  return Boolean(WARN_ONLY && warnOnlyRemoteDeadlineMs && Date.now() >= warnOnlyRemoteDeadlineMs);
}

function requestTimeoutMs() {
  if (!WARN_ONLY || !warnOnlyRemoteDeadlineMs) return 12000;
  return Math.max(1, Math.min(12000, warnOnlyRemoteDeadlineMs - Date.now()));
}

function classifyWarnOnlyRemoteFailure(result) {
  if (result.resolves || result.matches) return null;
  const detail = String(result.error || "");
  if (/no items returned/i.test(detail)) return "no-items";
  if (/(creators api|api request|authentication failed|lookup unavailable|http\s*[45]\d\d)/i.test(detail)) return "api-failure";
  return null;
}

function httpPost(hostname, path, headers, body) {
  return new Promise((resolve, reject) => {
    const data = typeof body === "string" ? body : JSON.stringify(body);
    const req = https.request(
      { hostname, path, method: "POST", headers: { ...headers, "Content-Length": Buffer.byteLength(data) }, timeout: requestTimeoutMs() },
      (res) => {
        let raw = "";
        res.on("data", c => { raw += c; });
        res.on("end", () => resolve({ status: res.statusCode, body: raw }));
      }
    );
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("Request timeout")); });
    req.write(data);
    req.end();
  });
}

function httpGet(hostname, path, headers) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      { hostname, path, method: "GET", headers, timeout: requestTimeoutMs() },
      (res) => {
        let raw = "";
        res.on("data", c => { raw += c; });
        res.on("end", () => resolve({ status: res.statusCode, body: raw }));
      }
    );
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("Request timeout")); });
    req.end();
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Creators API — OAuth 2.0 token + GetItems
// ─────────────────────────────────────────────────────────────────────────────
async function getAccessToken() {
  const now = Date.now() / 1000;
  if (_tokenCache.token && now < _tokenCache.expiresAt - 60) return _tokenCache.token;

  const cacheToken = (resp, generation) => {
    const data = JSON.parse(resp.body || "{}");
    if (resp.status < 200 || resp.status >= 300 || !data.access_token) {
      throw new Error(`${generation} Creators API authentication failed (HTTP ${resp.status})`);
    }
    _tokenCache.token = data.access_token;
    _tokenCache.expiresAt = now + (data.expires_in || 3600);
    return _tokenCache.token;
  };

  try {
    const resp = await httpPost(
      "api.amazon.com", "/auth/o2/token",
      { "Content-Type": "application/json" },
      JSON.stringify({
        grant_type: "client_credentials",
        client_id: CREATORS_CLIENT_ID,
        client_secret: CREATORS_CLIENT_SECRET,
        scope: "creatorsapi::default",
      })
    );
    return cacheToken(resp, "v3");
  } catch (v3Error) {
    const basic = Buffer.from(`${CREATORS_CLIENT_ID}:${CREATORS_CLIENT_SECRET}`).toString("base64");
    const resp = await httpPost(
      "creatorsapi.auth.us-east-1.amazoncognito.com", "/oauth2/token",
      {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${basic}`,
      },
      "grant_type=client_credentials&scope=creatorsapi%2Fdefault"
    );
    try {
      return cacheToken(resp, "v2");
    } catch (v2Error) {
      throw new Error(`Creators API authentication failed for both v3 and v2 flows: ${v3Error.message}; ${v2Error.message}`);
    }
  }
}

async function creatorsApiLookup(asin) {
  const token = await getAccessToken();
  const resp = await httpPost(
    "creatorsapi.amazon", "/catalog/v1/getItems",
    {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "x-marketplace": MARKETPLACE,
    },
    JSON.stringify({
      itemIds: [asin],
      itemIdType: "ASIN",
      marketplace: MARKETPLACE,
      partnerTag: API_PARTNER_TAG,
      partnerType: "Associates",
      resources: ["itemInfo.title", "images.primary.small", "offersV2.listings.price"],
    })
  );
  return JSON.parse(resp.body);
}

// ─────────────────────────────────────────────────────────────────────────────
// Fallback: scrape public Amazon page
// ─────────────────────────────────────────────────────────────────────────────
async function scrapeAmazonTitle(asin) {
  try {
    const resp = await httpGet(
      "www.amazon.com", `/dp/${asin}`,
      {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      }
    );
    if (resp.status === 404) return { title: null, error: "ASIN not found (404)" };
    const m = resp.body.match(/id="productTitle"[^>]*>\s*([^<]{5,300})/);
    if (m) return { title: m[1].trim(), error: null };
    const m2 = resp.body.match(/<meta[^>]+property="og:title"[^>]+content="([^"]{5,300})"/);
    if (m2) return { title: m2[1].trim(), error: null };
    if (resp.body.includes("robot") || resp.body.includes("captcha"))
      return { title: null, error: "Amazon bot-check" };
    return { title: null, error: "Title not found in page" };
  } catch (e) {
    return { title: null, error: e.message };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Verify one ASIN
// ─────────────────────────────────────────────────────────────────────────────
async function verifyAsin(asin, name) {
  let lastApiIssue = "Creators API lookup unavailable";
  if (warnOnlyRemoteBudgetExpired()) return { budgetExhausted: true };
  if (CREATORS_CLIENT_ID && CREATORS_CLIENT_SECRET) {
    for (let attempt = 1; attempt <= LOOKUP_ATTEMPTS; attempt++) {
      try {
        const data = await creatorsApiLookup(asin);
        const items = data?.itemsResult?.items || [];
        if (items.length > 0) {
          const title = items[0]?.itemInfo?.title?.displayValue || null;
          const { matches, score } = titleMatches(name, title || "");
          return { title, resolves: true, matches, score, source: "creators_api", error: null };
        }
        lastApiIssue = data?.errors?.[0]?.message || "No items returned";
      } catch (error) {
        lastApiIssue = error?.message || "Creators API request failed";
      }
      if (warnOnlyRemoteBudgetExpired()) return { budgetExhausted: true };
      if (attempt < LOOKUP_ATTEMPTS) {
        const waitMs = WARN_ONLY && warnOnlyRemoteDeadlineMs
          ? Math.max(0, Math.min(RETRY_BACKOFF_MS * attempt, warnOnlyRemoteDeadlineMs - Date.now()))
          : RETRY_BACKOFF_MS * attempt;
        if (waitMs > 0) await sleep(waitMs);
      }
    }
  }

  // A final title fetch helps distinguish persistent API empty responses from a
  // real delisting. A missing or bot-protected title still fails closed.
  if (warnOnlyRemoteBudgetExpired()) return { budgetExhausted: true };
  const { title, error } = await scrapeAmazonTitle(asin);
  if (warnOnlyRemoteBudgetExpired()) return { budgetExhausted: true };
  if (error || !title) {
    return { title: null, resolves: false, matches: false, score: 0, source: "scrape", error: `${lastApiIssue}; ${error || "not found"}` };
  }
  const { matches, score } = titleMatches(name, title);
  return { title, resolves: true, matches, score, source: "scrape", error: null };
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  if (CONFIGURED_PARTNER_TAG && CONFIGURED_PARTNER_TAG !== API_PARTNER_TAG) {
    console.warn("WARNING: configured Creators API partner tag differs from the app registration; using trailbuiltove-20 for API requests.");
  }
  console.log(`\n${"=".repeat(60)}`);
  console.log(`ASIN Validation Gate — SilkierStrands`);
  console.log(`Auth: ${CREATORS_CLIENT_ID ? "Creators API (OAuth 2.0)" : "public page scraping (fallback)"}`);
  console.log(`${"=".repeat(60)}`);

  const products = extractProducts(PRODUCTS_FILE);
  const searchUrlFiles = findAmazonSearchUrls(join(REPO_ROOT, "client", "src"));
  console.log(`Checking ${products.length} products...`);
  console.log(`Mode: ${WARN_ONLY ? "warn-only remote validation" : "blocking direct-ASIN policy"}\n`);

  let passed = 0, failed = 0;
  const failures = [];
  // Product extraction and direct-link structural checks above always run in
  // full. Only warn-only *remote* lookups are eligible for early exit.
  const remoteStartedAt = Date.now();
  warnOnlyRemoteDeadlineMs = WARN_ONLY ? remoteStartedAt + WARN_ONLY_REMOTE_TIME_BUDGET_MS : null;
  let priorRemoteFailureClass = null;
  let consecutiveRemoteApiFailures = 0;
  let shortCircuitLogged = false;
  const logTimeBudgetShortCircuit = (skipped) => {
    if (shortCircuitLogged) return;
    console.log(`remote validation time budget reached after ${Date.now() - remoteStartedAt}ms; ${skipped} products skipped (warn-only)`);
    shortCircuitLogged = true;
  };
  for (const file of searchUrlFiles) {
    failed++;
    failures.push({ product: "Amazon search URL", asin: "N/A", issue: `Amazon search destinations are prohibited (${file})`, amazon_title: null });
  }
  if (products.length === 0) {
    failed++;
    failures.push({ product: "Product catalog", asin: "N/A", issue: "No direct-ASIN product records were found", amazon_title: null });
  }

  for (let i = 0; i < products.length; i++) {
    if (WARN_ONLY && warnOnlyRemoteBudgetExpired()) {
      logTimeBudgetShortCircuit(products.length - i);
      break;
    }

    const { name, asin } = products[i];
    const result = await verifyAsin(asin, name);
    if (WARN_ONLY && (result.budgetExhausted || warnOnlyRemoteBudgetExpired())) {
      logTimeBudgetShortCircuit(products.length - i);
      break;
    }

    if (result.resolves && result.matches) {
      console.log(`  ✓ ${name} (${asin})`);
      passed++;
      priorRemoteFailureClass = null;
      consecutiveRemoteApiFailures = 0;
    } else {
      const issue = !result.resolves
        ? (result.error || "ASIN not found")
        : `title mismatch (${Math.round(result.score * 100)}%): got "${(result.title || "N/A").slice(0, 60)}"`;
      console.log(`  ✗ ${name} (${asin}): ${issue}`);
      failed++;
      failures.push({ product: name, asin, issue, amazon_title: result.title });

      const failureClass = WARN_ONLY ? classifyWarnOnlyRemoteFailure(result) : null;
      if (failureClass) {
        consecutiveRemoteApiFailures = failureClass === priorRemoteFailureClass
          ? consecutiveRemoteApiFailures + 1
          : 1;
        priorRemoteFailureClass = failureClass;
      } else {
        priorRemoteFailureClass = null;
        consecutiveRemoteApiFailures = 0;
      }

      if (WARN_ONLY && consecutiveRemoteApiFailures >= WARN_ONLY_REMOTE_FAILURE_THRESHOLD) {
        const skipped = products.length - i - 1;
        console.log(`remote validation short-circuited after ${consecutiveRemoteApiFailures} consecutive API failures; ${skipped} products skipped (warn-only)`);
        shortCircuitLogged = true;
        break;
      }
    }

    if (i < products.length - 1) {
      const waitMs = WARN_ONLY && warnOnlyRemoteDeadlineMs
        ? Math.max(0, Math.min(REQUEST_DELAY_MS, warnOnlyRemoteDeadlineMs - Date.now()))
        : REQUEST_DELAY_MS;
      if (waitMs > 0) await sleep(waitMs);
    }
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`SUMMARY: ${passed} passed, ${failed} failed`);

  if (failures.length > 0) {
    console.log(`\n⚠  ${failed} product(s) failed:`);
    failures.forEach(f => console.log(`   • ${f.product} (${f.asin}): ${f.issue}`));
    if (WARN_ONLY) {
      console.log("\n⚠  warn-only mode: remote validation findings reported; deploy proceeding.");
      process.exit(0);
    }
    console.log("\n✗  Deploy BLOCKED. Fix the above issues before publishing.");
    process.exit(1);
  } else {
    console.log("\n✓  All products validated. Deploy proceeding.");
    process.exit(0);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
