// SilkierStrands.com — Sitemap Generator
// Run: node scripts/generate-sitemap.mjs
// Generates /client/public/sitemap.xml from product data

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const BASE_URL = "https://silkierstrands.com";
const TODAY = new Date().toISOString().split("T")[0];

// ─── Read product/comparison slugs from products.ts (same approach as prerender) ─
const productsSource = readFileSync(resolve(ROOT, "client/src/lib/products.ts"), "utf-8");

const productSlugs = [...productsSource.matchAll(/slug:\s*"([^"]*-review)"/g)].map(m => m[1]);
const comparisonSlugs = [...productsSource.matchAll(/slug:\s*"([^"]*-vs-[^"]*)"/g)].map(m => m[1]);

// ─── Hair type slugs ──────────────────────────────────────────────────────────
const hairTypesSource = readFileSync(resolve(ROOT, "client/src/lib/hairTypes.ts"), "utf-8");
const hairTypeSlugs = [...hairTypesSource.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);

// ─── Author slugs ─────────────────────────────────────────────────────────────
const authorSlugs = ["renata-cole", "jamie-lin"];

// ─── Static pages ─────────────────────────────────────────────────────────────
const staticPages = [
  { url: "/",                               priority: "1.0", changefreq: "weekly"  },
  { url: "/reviews",                        priority: "0.9", changefreq: "weekly"  },
  { url: "/comparisons",                    priority: "0.9", changefreq: "weekly"  },
  { url: "/about",                          priority: "0.5", changefreq: "monthly" },
  { url: "/how-we-test",                    priority: "0.6", changefreq: "monthly" },
  { url: "/hair-quiz",                      priority: "0.6", changefreq: "monthly" },
  { url: "/category/shampoo-conditioner",   priority: "0.8", changefreq: "weekly"  },
  { url: "/category/hair-masks",            priority: "0.8", changefreq: "weekly"  },
  { url: "/category/serums-oils",           priority: "0.8", changefreq: "weekly"  },
  { url: "/category/hair-dryers",           priority: "0.8", changefreq: "weekly"  },
  { url: "/category/flat-irons",            priority: "0.8", changefreq: "weekly"  },
  { url: "/category/curling-irons",         priority: "0.8", changefreq: "weekly"  },
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
  ...staticPages.map(p => buildSitemapEntry({ ...p, lastmod: TODAY })),
  ...authorSlugs.map(slug => buildSitemapEntry({
    url: `/author/${slug}`,
    priority: "0.5",
    changefreq: "monthly",
    lastmod: TODAY,
  })),
  ...hairTypeSlugs.map(slug => buildSitemapEntry({
    url: `/hair-type/${slug}`,
    priority: "0.7",
    changefreq: "monthly",
    lastmod: TODAY,
  })),
  ...productSlugs.map(slug => buildSitemapEntry({
    url: `/review/${slug}`,
    priority: "0.7",
    changefreq: "monthly",
    lastmod: TODAY,
  })),
  ...comparisonSlugs.map(slug => buildSitemapEntry({
    url: `/comparison/${slug}`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod: TODAY,
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

const outputPath = resolve(__dirname, "../client/public/sitemap.xml");
writeFileSync(outputPath, sitemap, "utf-8");
console.log(`✅ Sitemap generated: ${outputPath}`);
console.log(`   ${entries.length} URLs total`);
console.log(`   Static: ${staticPages.length}, Authors: ${authorSlugs.length}, Hair types: ${hairTypeSlugs.length}, Reviews: ${productSlugs.length}, Comparisons: ${comparisonSlugs.length}`);
