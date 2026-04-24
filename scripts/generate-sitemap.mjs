// SilkierStrands.com — Sitemap Generator
// Run: node scripts/generate-sitemap.mjs
// Generates /client/public/sitemap.xml from product data

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE_URL = "https://silkierstrands.com";
const TODAY = new Date().toISOString().split("T")[0];

// Static pages
const staticPages = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/reviews", priority: "0.9", changefreq: "weekly" },
  { url: "/comparisons", priority: "0.9", changefreq: "weekly" },
  { url: "/about", priority: "0.5", changefreq: "monthly" },
  { url: "/category/shampoo-conditioner", priority: "0.8", changefreq: "weekly" },
  { url: "/category/hair-masks", priority: "0.8", changefreq: "weekly" },
  { url: "/category/serums-oils", priority: "0.8", changefreq: "weekly" },
  { url: "/category/hair-dryers", priority: "0.8", changefreq: "weekly" },
  { url: "/category/flat-irons", priority: "0.8", changefreq: "weekly" },
  { url: "/category/curling-irons", priority: "0.8", changefreq: "weekly" },
];

// Import product data (we'll read from the TS file via a simple regex parse)
// For simplicity, we hardcode the slugs here — in production this would import from the data file
const productSlugs = [
  "pureology-hydrate-shampoo-review",
  "redken-all-soft-shampoo-review",
  "loreal-elvive-hyaluron-plump-review",
  "pantene-daily-moisture-renewal-review",
  "nexxus-therappe-humectress-review",
  "native-coconut-vanilla-shampoo-review",
  "olaplex-no8-bond-mask-review",
  "moroccanoil-intense-hydrating-mask-review",
  "its-a-10-miracle-mask-review",
  "briogeo-dont-despair-repair-mask-review",
  "karseell-collagen-hair-mask-review",
  "sunatoria-korean-keratin-mask-review",
  "moroccanoil-treatment-original-review",
  "olaplex-no7-bonding-oil-review",
  "alfaparf-cristalli-liquidi-review",
  "ogx-argan-oil-morocco-review",
  "maree-hair-oil-review",
  "john-frieda-frizz-ease-serum-review",
  "dyson-supersonic-hair-dryer-review",
  "shark-hyperair-hair-dryer-review",
  "hot-tools-tourmaline-2000-review",
  "revlon-one-step-volumizer-review",
  "conair-infiniti-pro-hair-dryer-review",
  "babyliss-nano-titanium-dryer-review",
  "ghd-platinum-plus-straightener-review",
  "t3-singlepass-luxe-review",
  "tymo-ring-straightener-brush-review",
  "hsi-professional-glider-review",
  "remington-pearl-pro-flat-iron-review",
  "babyliss-ultra-thin-titanium-review",
  "dyson-airwrap-multi-styler-review",
  "tymo-curlpro-plus-review",
  "hot-tools-24k-gold-curling-iron-review",
  "revlon-salon-one-step-plus-review",
  "conair-double-ceramic-curling-iron-review",
  "nume-classic-curling-wand-review",
];

const comparisonSlugs = [
  "pureology-hydrate-vs-redken-all-soft",
  "olaplex-no8-vs-moroccanoil-mask",
  "moroccanoil-vs-olaplex-no7-oil",
  "dyson-supersonic-vs-shark-hyperair",
  "ghd-platinum-vs-t3-singlepass",
  "dyson-airwrap-vs-tymo-curlpro",
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
console.log(`   ${entries.length} URLs included`);
