import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { allProducts, comparisons } from "../client/src/lib/products";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, "site-data.json");

const productsById = new Map(allProducts.map((product) => [product.id, product]));
const productsBySlug = new Map<string, typeof allProducts[number]>();
for (const product of allProducts) {
  if (productsBySlug.has(product.slug)) {
    throw new Error(`Duplicate review slug in catalog: ${product.slug}`);
  }
  productsBySlug.set(product.slug, product);
}

const resolvableComparisons = comparisons.filter((comparison) => {
  const productIds = [comparison.product1Id, comparison.product2Id];
  const winnerId = comparison.winnerId;
  return productIds.every((id) => productsById.has(id)) && productsById.has(winnerId);
});

if (resolvableComparisons.length !== comparisons.length) {
  const invalid = comparisons
    .filter((comparison) => !resolvableComparisons.includes(comparison))
    .map((comparison) => comparison.slug)
    .join(", ");
  throw new Error(`Unresolvable comparison data: ${invalid}`);
}

const payload = {
  allProducts,
  comparisons: resolvableComparisons,
};
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, JSON.stringify(payload, null, 2) + "\n");
console.log(`Validated ${allProducts.length} products and ${resolvableComparisons.length} comparisons -> ${outputPath}`);
