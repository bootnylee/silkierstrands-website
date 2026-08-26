import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Router as WouterRouter } from "wouter";
import { allProducts, categories, comparisons } from "../client/src/lib/products";
import { hairTypes } from "../client/src/lib/hairTypes";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, "static-bodies.json");

(globalThis as typeof globalThis & { React: typeof React }).React = React;
const { default: App } = await import("../client/src/App");

const routes = [
  "/",
  "/reviews",
  "/comparisons",
  "/about",
  "/hair-quiz",
  "/how-we-test",
  ...categories.map((category) => `/category/${category.slug}`),
  ...allProducts.map((product) => `/review/${product.slug}`),
  ...comparisons.map((comparison) => `/comparison/${comparison.slug}`),
  ...hairTypes.map((hairType) => `/hair-type/${hairType.slug}`),
  "/author/renata-cole",
  "/author/jamie-lin",
];

const uniqueRoutes = [...new Set(routes)];
const bodies: Record<string, string> = {};

for (const route of uniqueRoutes) {
  bodies[route] = renderToStaticMarkup(
    <WouterRouter ssrPath={route}>
      <App />
    </WouterRouter>
  );
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, JSON.stringify(bodies), "utf8");
console.log(`Rendered ${uniqueRoutes.length} complete route bodies -> ${outputPath}`);
