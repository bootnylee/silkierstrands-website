#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const batchPath = resolve(process.env.CONTENT_BATCH_FILE || process.argv[2] || "");
if (!batchPath) throw new Error("CONTENT_BATCH_FILE or input path is required");
const generated = JSON.parse(readFileSync(batchPath, "utf8"));
const source = readFileSync(resolve(root, "client/src/lib/products.ts"), "utf8");
const failures = [];

function normalise(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}
function tokens(value) {
  return new Set(normalise(value).split(" ").filter((word) => word.length > 2));
}
function jaccard(left, right) {
  const a = tokens(left); const b = tokens(right);
  const overlap = [...a].filter((word) => b.has(word)).length;
  return overlap / Math.max(1, new Set([...a, ...b]).size);
}
function existing(pattern) {
  return [...source.matchAll(pattern)].map((match) => match[1]).filter(Boolean);
}
const existingNames = existing(/\bname:\s*["']([^"']+)["']/g);
const existingTitles = existing(/\btitle:\s*["']([^"']+)["']/g);

function check(candidate, field, corpus, path) {
  const exact = corpus.find((item) => normalise(item) === normalise(candidate));
  if (exact) failures.push(`${path}.${field} duplicates published content: ${exact}`);
  const nearest = corpus.map((item) => ({ item, score: jaccard(candidate, item) })).sort((a, b) => b.score - a.score)[0];
  if (nearest && nearest.score >= 0.88) failures.push(`${path}.${field} is insufficiently distinct from published content (${Math.round(nearest.score * 100)}% overlap): ${nearest.item}`);
}

generated.products.forEach((product, index) => check(product.name, "name", existingNames, `$.products[${index}]`));
generated.comparisons.forEach((comparison, index) => check(comparison.title, "title", existingTitles, `$.comparisons[${index}]`));
for (let i = 0; i < generated.products.length; i += 1) {
  for (let j = i + 1; j < generated.products.length; j += 1) {
    if (jaccard(generated.products[i].fullReview, generated.products[j].fullReview) >= 0.80) failures.push(`$.products[${i}] and $.products[${j}] reuse materially similar review copy`);
  }
}

if (failures.length) {
  console.error("DISTINCTNESS_GATE_FAILED:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`Distinctness gate passed: ${generated.products.length} product(s) and ${generated.comparisons.length} comparison(s) are distinct from the published index.`);
}
