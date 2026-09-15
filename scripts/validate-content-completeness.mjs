#!/usr/bin/env node
/**
 * Advisory-only content completeness gate. It deliberately exits non-zero on
 * findings so the shadow pipeline can record its result; package build remains
 * non-enforcing until a separate enforcement decision.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { validateContentBatch } from "./content-record-schema.mjs";

const file = resolve(process.env.CONTENT_BATCH_FILE || process.argv[2] || "");
if (!file) throw new Error("CONTENT_BATCH_FILE or input path is required");
const batch = JSON.parse(readFileSync(file, "utf8"));
const findings = [...validateContentBatch(batch)];
const placeholder = /\b(?:undefined|null|tbd|todo|lorem ipsum|placeholder|coming soon|insert\s+(?:copy|text)|\[citation needed\])\b/i;

function inspect(value, path) {
  if (typeof value === "string") {
    if (!value.trim()) findings.push(`${path} is declared but empty`);
    if (placeholder.test(value)) findings.push(`${path} contains placeholder prose`);
    return;
  }
  if (Array.isArray(value)) {
    // A weekly batch may legitimately contain only products or only comparisons;
    // required per-record arrays are enforced by the canonical schema instead.
    if (value.length === 0 && !["$.products", "$.comparisons"].includes(path)) findings.push(`${path} is declared but empty`);
    value.forEach((child, index) => inspect(child, `${path}[${index}]`));
    return;
  }
  if (value && typeof value === "object") Object.entries(value).forEach(([key, child]) => inspect(child, `${path}.${key}`));
}
inspect(batch, "$");
for (const [index, product] of batch.products.entries()) {
  if (!product.imageUrl || !product.amazonImageUrl) findings.push(`$.products[${index}] product box has no image`);
}

if (findings.length) {
  console.error("CONTENT_COMPLETENESS_REPORTED_FAILURE:");
  findings.forEach((finding) => console.error(`- ${finding}`));
  process.exitCode = 1;
} else {
  console.log(`Content completeness gate passed: ${batch.products.length} product(s), ${batch.comparisons.length} comparison(s), no undefined, placeholders, empty declared fields, or missing product images.`);
}
