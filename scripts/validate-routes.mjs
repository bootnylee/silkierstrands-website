#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const routeData = JSON.parse(readFileSync(resolve(root, "scripts/site-data.json"), "utf8"));
const sitemap = readFileSync(resolve(root, "client/public/sitemap.xml"), "utf8");
const app = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const failures = [];
const products = routeData.allProducts || [];
const comparisons = routeData.comparisons || [];
const ids = new Set(products.map((product) => product.id));
const productSlugs = new Set();
const comparisonSlugs = new Set();
for (const product of products) {
  if (!product.slug || productSlugs.has(product.slug)) failures.push(`Invalid or duplicate product route slug: ${product.slug || "<empty>"}`);
  productSlugs.add(product.slug);
  if (!sitemap.includes(`<loc>https://silkierstrands.com/review/${product.slug}</loc>`)) failures.push(`Sitemap lacks review route for ${product.slug}`);
}
for (const comparison of comparisons) {
  if (!comparison.slug || comparisonSlugs.has(comparison.slug)) failures.push(`Invalid or duplicate comparison route slug: ${comparison.slug || "<empty>"}`);
  comparisonSlugs.add(comparison.slug);
  for (const field of ["product1Id", "product2Id", "winnerId"]) if (!ids.has(comparison[field])) failures.push(`Comparison ${comparison.slug} has unresolved ${field}: ${comparison[field]}`);
  if (![comparison.product1Id, comparison.product2Id].includes(comparison.winnerId)) failures.push(`Comparison ${comparison.slug} winnerId is not a compared product`);
  if (!sitemap.includes(`<loc>https://silkierstrands.com/comparison/${comparison.slug}</loc>`)) failures.push(`Sitemap lacks comparison route for ${comparison.slug}`);
}
for (const route of ["/review/:slug", "/comparison/:slug", "/category/:slug", "/hair-type/:slug"]) if (!app.includes(`path="${route}"`)) failures.push(`Route registry lacks ${route}`);
if (failures.length) { console.error("ROUTES_GATE_FAILED:"); failures.forEach((failure) => console.error(`- ${failure}`)); process.exitCode = 1; }
else console.log(`Routes gate passed: ${products.length} review records and ${comparisons.length} comparison records resolve and appear in the sitemap.`);
