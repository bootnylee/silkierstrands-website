// SilkierStrands.com — Sitemap Generator
// Run after: pnpm exec tsx scripts/extract-site-data.ts
// Emits only unique review and comparison records the application can resolve.

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const BASE_URL = "https://silkierstrands.com";
const TODAY = new Date().toISOString().split("T")[0];

const routeData = JSON.parse(readFileSync(resolve(__dirname, "site-data.json"), "utf-8"));
const productSlugs = routeData.allProducts.map((product) => product.slug);
const comparisonSlugs = routeData.comparisons.map((comparison) => comparison.slug);

const hairTypesSource = readFileSync(resolve(ROOT, "client/src/lib/hairTypes.ts"), "utf-8");
const hairTypeSlugs = [...hairTypesSource.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
const authorSlugs = ["renata-cole", "jamie-lin"];

const staticPages = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/reviews", priority: "0.9", changefreq: "weekly" },
  { url: "/comparisons", priority: "0.9", changefreq: "weekly" },
  { url: "/about", priority: "0.5", changefreq: "monthly" },
  { url: "/how-we-test", priority: "0.6", changefreq: "monthly" },
  { url: "/hair-quiz", priority: "0.6", changefreq: "monthly" },
  { url: "/category/shampoo-conditioner", priority: "0.8", changefreq: "weekly" },
  { url: "/category/hair-masks", priority: "0.8", changefreq: "weekly" },
  { url: "/category/serums-oils", priority: "0.8", changefreq: "weekly" },
  { url: "/category/hair-dryers", priority: "0.8", changefreq: "weekly" },
  { url: "/category/flat-irons", priority: "0.8", changefreq: "weekly" },
  { url: "/category/curling-irons", priority: "0.8", changefreq: "weekly" },
];

function buildSitemapEntry({ url, priority, changefreq, lastmod }) {
  return `  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${lastmod || TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const entries = [
  ...staticPages.map((page) => buildSitemapEntry({ ...page, lastmod: TODAY })),
  ...authorSlugs.map((slug) => buildSitemapEntry({ url: `/author/${slug}`, priority: "0.5", changefreq: "monthly", lastmod: TODAY })),
  ...hairTypeSlugs.map((slug) => buildSitemapEntry({ url: `/hair-type/${slug}`, priority: "0.7", changefreq: "monthly", lastmod: TODAY })),
  ...productSlugs.map((slug) => buildSitemapEntry({ url: `/review/${slug}`, priority: "0.7", changefreq: "monthly", lastmod: TODAY })),
  ...comparisonSlugs.map((slug) => buildSitemapEntry({ url: `/comparison/${slug}`, priority: "0.8", changefreq: "monthly", lastmod: TODAY })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

const outputPath = resolve(__dirname, "../client/public/sitemap.xml");
writeFileSync(outputPath, sitemap, "utf-8");
console.log(`Sitemap generated: ${outputPath}`);
console.log(`Static: ${staticPages.length}, Authors: ${authorSlugs.length}, Hair types: ${hairTypeSlugs.length}, Reviews: ${productSlugs.length}, Comparisons: ${comparisonSlugs.length}`);
