#!/usr/bin/env node
/**
 * Canonical renderer for structured weekly content records.
 * It is intentionally the only writer that inserts generated records into
 * client/src/lib/products.ts; generation itself never writes TypeScript.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readContentBatch, validateContentBatch } from "./content-record-schema.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PRODUCTS_FILE = resolve(ROOT, "client/src/lib/products.ts");

function arg(name, fallback = "") {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

function escapeTemplate(value) {
  return String(value).replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function formatOptionalString(field, value) {
  return value ? `    ${field}: ${JSON.stringify(value)},\n` : "";
}

function productRecord(record) {
  return `\n  {\n    id: ${JSON.stringify(record.id)},\n    name: ${JSON.stringify(record.name)},\n    brand: ${JSON.stringify(record.brand)},\n    asin: ${JSON.stringify(record.asin)},\n    price: ${record.price},\n    priceDisplay: ${JSON.stringify(record.priceDisplay)},\n${formatOptionalString("availability", record.availability)}${record.isBuyBoxWinner === undefined ? "" : `    isBuyBoxWinner: ${record.isBuyBoxWinner},\n`}${formatOptionalString("successorAsin", record.successorAsin)}${formatOptionalString("successorName", record.successorName)}${formatOptionalString("commerceNotice", record.commerceNotice)}${record.affiliateAvailable === undefined ? "" : `    affiliateAvailable: ${record.affiliateAvailable},\n`}    rating: ${record.rating},\n    reviewCount: ${record.reviewCount},\n    category: ${JSON.stringify(record.category)},\n    categorySlug: ${JSON.stringify(record.categorySlug)},\n    imageUrl: ${JSON.stringify(record.imageUrl)},\n    amazonImageUrl: ${JSON.stringify(record.amazonImageUrl)},\n    hairTypes: ${JSON.stringify(record.hairTypes)},\n    shortDescription: ${JSON.stringify(record.shortDescription)},\n    fullReview: \`${escapeTemplate(record.fullReview)}\`,\n    pros: ${JSON.stringify(record.pros)},\n    cons: ${JSON.stringify(record.cons)},\n    bestFor: ${JSON.stringify(record.bestFor)},\n    editorPick: ${record.editorPick},\n${formatOptionalString("editorNote", record.editorNote)}    publishDate: ${JSON.stringify(record.publishDate)},\n    slug: ${JSON.stringify(record.slug)},\n    citations: ${JSON.stringify(record.citations)},\n  },`;
}

function comparisonRecord(record) {
  return `\n  {\n    id: ${JSON.stringify(record.id)},\n    title: ${JSON.stringify(record.title)},\n    subtitle: ${JSON.stringify(record.subtitle)},\n    category: ${JSON.stringify(record.category)},\n    categorySlug: ${JSON.stringify(record.categorySlug)},\n    product1Id: ${JSON.stringify(record.product1Id)},\n    product2Id: ${JSON.stringify(record.product2Id)},\n    winnerId: ${JSON.stringify(record.winnerId)},\n    winnerReason: ${JSON.stringify(record.winnerReason)},\n    verdict: ${JSON.stringify(record.verdict)},\n    publishDate: ${JSON.stringify(record.publishDate)},\n    slug: ${JSON.stringify(record.slug)},\n    hairTypes: ${JSON.stringify(record.hairTypes)},\n    citations: ${JSON.stringify(record.citations)},\n  },`;
}

function insertAtCollectionStart(source, declaration, records) {
  if (records.length === 0) return source;
  const anchor = `${declaration} = [`;
  if (!source.includes(anchor)) throw new Error(`Canonical renderer could not find ${anchor}`);
  return source.replace(anchor, `${anchor}${records.join("")}`);
}

function main() {
  const input = arg("--input");
  if (!input) throw new Error("Usage: node scripts/render-content-records.mjs --input <generated-json>");
  const output = arg("--output", PRODUCTS_FILE);
  const batch = readContentBatch(resolve(input));
  const errors = validateContentBatch(batch);
  if (errors.length) throw new Error(`Canonical contract rejected render input:\n- ${errors.join("\n- ")}`);

  let source = readFileSync(PRODUCTS_FILE, "utf8");
  for (const product of batch.products) {
    if (source.includes(`id: ${JSON.stringify(product.id)}`) || source.includes(`slug: ${JSON.stringify(product.slug)}`)) {
      throw new Error(`Canonical renderer refuses duplicate product ${product.id} / ${product.slug}`);
    }
  }
  for (const comparison of batch.comparisons) {
    if (source.includes(`id: ${JSON.stringify(comparison.id)}`) || source.includes(`slug: ${JSON.stringify(comparison.slug)}`)) {
      throw new Error(`Canonical renderer refuses duplicate comparison ${comparison.id} / ${comparison.slug}`);
    }
  }

  source = insertAtCollectionStart(source, "export const allProducts: Product[]", batch.products.map(productRecord));
  source = insertAtCollectionStart(source, "export const comparisons: Comparison[]", batch.comparisons.map(comparisonRecord));
  writeFileSync(resolve(output), source, "utf8");
  console.log(`Rendered ${batch.products.length} product(s) and ${batch.comparisons.length} comparison(s) through the canonical renderer -> ${output}`);
}

try {
  main();
} catch (error) {
  console.error(`CANONICAL_RENDER_FAILED: ${error.message}`);
  process.exitCode = 1;
}
