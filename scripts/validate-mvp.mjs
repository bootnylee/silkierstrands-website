#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const read = (file) => readFileSync(resolve(root, file), "utf8");
const failures = [];
const productContract = read("client/src/lib/products.ts");
const commerce = read("client/src/components/ProductCommerce.tsx");
const review = read("client/src/pages/ProductReview.tsx");
const comparison = read("client/src/pages/ComparisonPage.tsx");
for (const field of ["id", "name", "brand", "asin", "price", "priceDisplay", "category", "imageUrl", "amazonImageUrl", "shortDescription", "fullReview", "pros", "cons", "bestFor", "publishDate", "slug"]) {
  if (!new RegExp(`\\b${field}\\??:`).test(productContract)) failures.push(`Product contract is missing ${field}`);
}
for (const token of ["VerifiedAmazonCta", "FreshCatalogPrice", "commerceItemListSchema", "commerceFaqSchema"]) {
  if (!review.includes(token)) failures.push(`Review route is missing ${token}`);
}
for (const token of ["ProductComparisonTable", "VerifiedAmazonCta", "commerceComparisonFaqSchema"]) {
  if (!comparison.includes(token)) failures.push(`Comparison route is missing ${token}`);
}
if (!commerce.includes('rel="sponsored nofollow noopener"')) failures.push("Affiliate CTA does not preserve sponsored nofollow noopener rel policy");
if (failures.length) {
  console.error("MVP_GATE_FAILED:"); failures.forEach((failure) => console.error(`- ${failure}`)); process.exitCode = 1;
} else console.log("MVP gate passed: canonical product contract and review/comparison commerce templates are intact.");
