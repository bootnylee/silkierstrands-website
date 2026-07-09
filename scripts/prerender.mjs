#!/usr/bin/env node
// SilkierStrands.com — Static Prerender Script
// Generates per-route index.html files with correct SEO tags baked in at build time.
// Run AFTER `vite build` as part of the Netlify build command.
//
// Each route gets its own directory with an index.html that contains:
//   - Unique <title> (≤60 chars)
//   - Unique <meta name="description"> (≤155 chars)
//   - Self-referencing <link rel="canonical">
//   - Matching Open Graph and Twitter Card tags
//   - JSON-LD structured data (Organization, WebSite, BreadcrumbList, Product+Review, Article, ItemList)
//   - Visible <noscript> body content stub for crawlers with JS disabled
//
// Priority 1: Solves the "every URL returns the same generic shell" problem.
// Priority 2: Fixes canonicals — every page self-references its own URL.

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist/public");
const BASE_URL = "https://silkierstrands.com";
const SITE_NAME = "SilkierStrands";
const OG_IMAGE = `${BASE_URL}/og-image.jpg`;

// ─── Read the built index.html shell ─────────────────────────────────────────
const indexHtml = readFileSync(resolve(DIST, "index.html"), "utf-8");

// ─── Load source files ────────────────────────────────────────────────────────
const productsSource = readFileSync(
  resolve(ROOT, "client/src/lib/products.ts"),
  "utf-8"
);
const hairTypesSource = readFileSync(
  resolve(ROOT, "client/src/lib/hairTypes.ts"),
  "utf-8"
);

// ─── Robust extraction helpers ────────────────────────────────────────────────
// Products use backtick template literals for fullReview, which breaks naive
// block-matching regexes. Instead we find each slug position and look backward
// for the nearest occurrence of each field.

function lastMatch(src, re) {
  const all = [...src.matchAll(re)];
  return all.length > 0 ? all[all.length - 1][1] : "";
}

function extractProducts(src) {
  const slugRe = /slug:\s*"([^"]*-review)"/g;
  let m;
  const products = [];
  while ((m = slugRe.exec(src)) !== null) {
    const slug = m[1];
    const pos = m.index;
    const lookback = src.substring(Math.max(0, pos - 6000), pos);
    products.push({
      slug,
      name: lastMatch(lookback, /name:\s*"([^"]+)"/g),
      brand: lastMatch(lookback, /brand:\s*"([^"]+)"/g),
      shortDescription: lastMatch(lookback, /shortDescription:\s*"([^"]+)"/g),
      category: lastMatch(lookback, /category:\s*"([^"]+)"/g),
      categorySlug: lastMatch(lookback, /categorySlug:\s*"([^"]+)"/g),
      publishDate: lastMatch(lookback, /publishDate:\s*"([^"]+)"/g),
      rating: parseFloat(lastMatch(lookback, /rating:\s*([\d.]+)/g) || "0"),
      imageUrl: lastMatch(lookback, /imageUrl:\s*"([^"]+)"/g),
      asin: lastMatch(lookback, /asin:\s*"([^"]+)"/g),
    });
  }
  return products;
}

function extractComparisons(src) {
  const slugRe = /slug:\s*"([^"]*-vs-[^"]*)"/g;
  let m;
  const comparisons = [];
  while ((m = slugRe.exec(src)) !== null) {
    const slug = m[1];
    const pos = m.index;
    const lookback = src.substring(Math.max(0, pos - 4000), pos);
    comparisons.push({
      slug,
      title: lastMatch(lookback, /title:\s*"([^"]+)"/g),
      subtitle: lastMatch(lookback, /subtitle:\s*"([^"]+)"/g),
      category: lastMatch(lookback, /category:\s*"([^"]+)"/g),
      categorySlug: lastMatch(lookback, /categorySlug:\s*"([^"]+)"/g),
      publishDate: lastMatch(lookback, /publishDate:\s*"([^"]+)"/g),
      verdict: lastMatch(lookback, /verdict:\s*"([^"]+)"/g),
    });
  }
  return comparisons;
}

function extractHairTypes(src) {
  // Hair type structure: id: "xxx", slug: "xxx" come BEFORE metaTitle/metaDescription
  // So we find each id+slug pair and look FORWARD for the meta fields
  const blockRe = /id:\s*"([^"]+)",\s*\n\s*slug:\s*"([^"]+)"/g;
  let m;
  const types = [];
  while ((m = blockRe.exec(src)) !== null) {
    const id = m[1];
    const slug = m[2];
    const pos = m.index;
    // Look forward 2500 chars for metaTitle and metaDescription
    const lookfwd = src.substring(pos, pos + 2500);
    const titleM = lookfwd.match(/metaTitle:\s*"([^"]+)"/);
    const descM = lookfwd.match(/metaDescription:\s*\n?\s*"([^"]+)"/);
    const nameM = lookfwd.match(/name:\s*"([^"]+)"/);
    if (titleM && descM) {
      types.push({
        id,
        slug,
        name: nameM ? nameM[1] : id,
        metaTitle: titleM[1],
        metaDescription: descM[1],
      });
    }
  }
  return types;
}

const products = extractProducts(productsSource);
const comparisons = extractComparisons(productsSource);
const hairTypes = extractHairTypes(hairTypesSource);

console.log(`📦 Loaded: ${products.length} products, ${comparisons.length} comparisons, ${hairTypes.length} hair types`);

// ─── Category metadata ────────────────────────────────────────────────────────
const categories = [
  {
    slug: "shampoo-conditioner",
    name: "Shampoo & Conditioner",
    description: "Expert-tested shampoos and conditioners for every hair type. From drugstore staples to salon-grade formulas, we review the products that actually deliver.",
  },
  {
    slug: "hair-masks",
    name: "Hair Masks & Treatments",
    description: "Deep conditioning treatments and repair masks reviewed by our editorial team. Find the best hair mask for your hair type and concern.",
  },
  {
    slug: "serums-oils",
    name: "Serums & Oils",
    description: "Finishing serums, treatment oils, and anti-frizz elixirs reviewed and ranked. Expert picks for shine, smoothness, and frizz control.",
  },
  {
    slug: "hair-dryers",
    name: "Hair Dryers",
    description: "From budget-friendly to professional-grade, we review the blow dryers that deliver salon results at home.",
  },
  {
    slug: "flat-irons",
    name: "Flat Irons & Straighteners",
    description: "Expert reviews of flat irons and hair straighteners across every price point. Find the best flat iron for your hair type.",
  },
  {
    slug: "curling-irons",
    name: "Curling Irons & Wands",
    description: "Curling irons, wands, and rotating barrels reviewed and compared. Expert picks for every curl type and hair texture.",
  },
];

// ─── JSON-LD schema builders ──────────────────────────────────────────────────

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: { "@type": "ImageObject", url: OG_IMAGE },
  };
}

function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    description: "Expert hair product reviews and recommendations for women",
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/reviews?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

function productWithReviewSchema(product) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    brand: { "@type": "Brand", name: product.brand },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: product.rating,
        bestRating: 5,
        worstRating: 1,
      },
      author: {
        "@type": "Organization",
        name: "SilkierStrands Editorial Team",
        url: BASE_URL,
      },
      publisher: { "@type": "Organization", name: SITE_NAME, url: BASE_URL },
      datePublished: product.publishDate,
      reviewBody: product.shortDescription,
    },
  };
  if (product.imageUrl) schema.image = product.imageUrl;
  if (product.asin) {
    schema.offers = {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `https://www.amazon.com/dp/${product.asin}?tag=silkierstrands-20`,
      seller: { "@type": "Organization", name: "Amazon" },
    };
  }
  return schema;
}

function articleSchema(comparison) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.title,
    description: comparison.subtitle,
    author: {
      "@type": "Organization",
      name: "SilkierStrands Editorial Team",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: OG_IMAGE },
    },
    datePublished: comparison.publishDate,
    dateModified: comparison.publishDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/comparison/${comparison.slug}`,
    },
  };
}

function itemListSchema(items, listName, listUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    url: `${BASE_URL}${listUrl}`,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name || item.title,
      url: `${BASE_URL}${item.slug.includes("-vs-") ? "/comparison/" : "/review/"}${item.slug}`,
    })),
  };
}

// ─── HTML injection ───────────────────────────────────────────────────────────

function esc(str) {
  return (str || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function trunc(str, max) {
  if (!str) return "";
  return str.length <= max ? str : str.substring(0, max - 3) + "...";
}

function buildHtml({ title, description, canonical, ogType, ogImage, schemas, bodyStub }) {
  let html = indexHtml;

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${esc(description)}"`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${canonical}"`
  );

  // Replace og:url
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${canonical}"`
  );

  // Replace og:title
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${esc(title)}"`
  );

  // Replace og:description
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${esc(description)}"`
  );

  // Replace og:type
  html = html.replace(
    /<meta property="og:type" content="[^"]*"/,
    `<meta property="og:type" content="${ogType || "website"}"`
  );

  // Replace og:image
  if (ogImage) {
    html = html.replace(
      /<meta property="og:image" content="[^"]*"/,
      `<meta property="og:image" content="${ogImage}"`
    );
  }

  // Replace twitter:title
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${esc(title)}"`
  );

  // Replace twitter:description
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${esc(description)}"`
  );

  // Replace twitter:image
  if (ogImage) {
    html = html.replace(
      /<meta name="twitter:image" content="[^"]*"/,
      `<meta name="twitter:image" content="${ogImage}"`
    );
  }

  // Remove existing JSON-LD scripts from the shell (we inject fresh ones per page)
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "");

  // Build and inject JSON-LD block before </head>
  const schemaBlock = schemas
    .map((s) => `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`)
    .join("\n");
  html = html.replace("</head>", `${schemaBlock}\n</head>`);

  // Inject noscript body stub before </body> (visible content for JS-disabled crawlers)
  if (bodyStub) {
    const noscript = `<noscript><div style="font-family:sans-serif;padding:2rem;max-width:800px;margin:0 auto"><h1>${esc(title)}</h1><p>${esc(description)}</p><p>Please enable JavaScript to view the full SilkierStrands experience.</p></div></noscript>`;
    html = html.replace("</body>", `${noscript}\n</body>`);
  }

  return html;
}

// ─── Write helper ─────────────────────────────────────────────────────────────
function writeRoute(urlPath, html) {
  if (urlPath === "/") {
    writeFileSync(resolve(DIST, "index.html"), html, "utf-8");
    return;
  }
  const dir = resolve(DIST, urlPath.replace(/^\//, ""));
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, "index.html"), html, "utf-8");
}

let count = 0;

// ─── 1. Homepage ─────────────────────────────────────────────────────────────
{
  const title = "SilkierStrands — Expert Hair Product Reviews & Recommendations";
  const description = "SilkierStrands is your trusted source for expert hair product reviews, head-to-head comparisons, and recommendations for the best shampoos, conditioners, hair masks, serums, and styling tools for women.";
  writeRoute("/", buildHtml({
    title,
    description,
    canonical: `${BASE_URL}/`,
    ogType: "website",
    ogImage: OG_IMAGE,
    schemas: [organizationSchema(), websiteSchema()],
    bodyStub: true,
  }));
  count++;
}

// ─── 2. /reviews ─────────────────────────────────────────────────────────────
{
  const title = "All Hair Product Reviews | SilkierStrands";
  const description = "Browse all expert hair product reviews across shampoos, conditioners, hair masks, serums, hair dryers, flat irons, and curling irons. Filter by price and hair type.";
  writeRoute("/reviews", buildHtml({
    title,
    description,
    canonical: `${BASE_URL}/reviews`,
    ogType: "website",
    ogImage: OG_IMAGE,
    schemas: [
      organizationSchema(),
      breadcrumbSchema([{ name: "Home", url: "/" }, { name: "All Reviews", url: "/reviews" }]),
      itemListSchema(products.slice(0, 20), "Hair Product Reviews", "/reviews"),
    ],
    bodyStub: true,
  }));
  count++;
}

// ─── 3. /comparisons ─────────────────────────────────────────────────────────
{
  const title = "Hair Product Comparisons | SilkierStrands";
  const description = "Expert head-to-head comparisons of the best hair products and styling tools. Find out which shampoo, conditioner, hair mask, serum, or styling tool wins.";
  writeRoute("/comparisons", buildHtml({
    title,
    description,
    canonical: `${BASE_URL}/comparisons`,
    ogType: "website",
    ogImage: OG_IMAGE,
    schemas: [
      organizationSchema(),
      breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Comparisons", url: "/comparisons" }]),
      itemListSchema(comparisons.slice(0, 20), "Hair Product Comparisons", "/comparisons"),
    ],
    bodyStub: true,
  }));
  count++;
}

// ─── 4. /about ───────────────────────────────────────────────────────────────
{
  const title = "About SilkierStrands | Expert Hair Reviews";
  const description = "SilkierStrands is your trusted source for expert, unbiased hair product reviews for women. Learn about our review methodology and testing process.";
  writeRoute("/about", buildHtml({
    title,
    description,
    canonical: `${BASE_URL}/about`,
    ogType: "website",
    ogImage: OG_IMAGE,
    schemas: [
      organizationSchema(),
      breadcrumbSchema([{ name: "Home", url: "/" }, { name: "About", url: "/about" }]),
    ],
    bodyStub: true,
  }));
  count++;
}

// ─── 5. /hair-quiz ───────────────────────────────────────────────────────────
{
  const title = "Hair Type Quiz — Find Your Perfect Products";
  const description = "Take our 2-minute hair type quiz to get personalized hair product recommendations for your exact hair type, concerns, and goals.";
  writeRoute("/hair-quiz", buildHtml({
    title,
    description,
    canonical: `${BASE_URL}/hair-quiz`,
    ogType: "website",
    ogImage: OG_IMAGE,
    schemas: [
      organizationSchema(),
      breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Hair Quiz", url: "/hair-quiz" }]),
    ],
    bodyStub: true,
  }));
  count++;
}

// ─── 6. /how-we-test ────────────────────────────────────────────────────────
{
  const title = "How We Test Hair Products | SilkierStrands";
  const description = "Learn how SilkierStrands tests and reviews hair products. Our hands-on methodology covers shampoos, conditioners, masks, serums, and styling tools across all hair types.";
  writeRoute("/how-we-test", buildHtml({
    title,
    description,
    canonical: `${BASE_URL}/how-we-test`,
    ogType: "website",
    ogImage: OG_IMAGE,
    schemas: [
      organizationSchema(),
      breadcrumbSchema([{ name: "Home", url: "/" }, { name: "How We Test", url: "/how-we-test" }]),
    ],
    bodyStub: true,
  }));
  count++;
}
// ─── 7. Category pages ───────────────────────────────────────────────────────
for (const cat of categories) {
  const title = trunc(`Best ${cat.name} Reviews 2025 | SilkierStrands`, 60);
  const description = trunc(cat.description, 155);
  const catProducts = products.filter((p) => p.categorySlug === cat.slug);
  writeRoute(`/category/${cat.slug}`, buildHtml({
    title,
    description,
    canonical: `${BASE_URL}/category/${cat.slug}`,
    ogType: "website",
    ogImage: OG_IMAGE,
    schemas: [
      organizationSchema(),
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Reviews", url: "/reviews" },
        { name: cat.name, url: `/category/${cat.slug}` },
      ]),
      ...(catProducts.length > 0
        ? [itemListSchema(catProducts, `Best ${cat.name}`, `/category/${cat.slug}`)]
        : []),
    ],
    bodyStub: true,
  }));
  count++;
}

// ─── 7. Individual product review pages ──────────────────────────────────────
for (const product of products) {
  const rawTitle = `${product.name} Review — ${product.brand} | SilkierStrands`;
  const title = trunc(rawTitle, 60);
  const description = trunc(
    `Expert review of ${product.name} by ${product.brand}. ${product.shortDescription}`,
    155
  );
  writeRoute(`/review/${product.slug}`, buildHtml({
    title,
    description,
    canonical: `${BASE_URL}/review/${product.slug}`,
    ogType: "article",
    ogImage: product.imageUrl || OG_IMAGE,
    schemas: [
      organizationSchema(),
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Reviews", url: "/reviews" },
        { name: product.category, url: `/category/${product.categorySlug}` },
        { name: product.name, url: `/review/${product.slug}` },
      ]),
      productWithReviewSchema(product),
    ],
    bodyStub: true,
  }));
  count++;
}

// ─── 8. Comparison pages ─────────────────────────────────────────────────────
for (const comp of comparisons) {
  const title = trunc(`${comp.title} | SilkierStrands`, 60);
  const description = trunc(comp.subtitle || comp.verdict, 155);
  writeRoute(`/comparison/${comp.slug}`, buildHtml({
    title,
    description,
    canonical: `${BASE_URL}/comparison/${comp.slug}`,
    ogType: "article",
    ogImage: OG_IMAGE,
    schemas: [
      organizationSchema(),
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Comparisons", url: "/comparisons" },
        { name: comp.title, url: `/comparison/${comp.slug}` },
      ]),
      articleSchema(comp),
    ],
    bodyStub: true,
  }));
  count++;
}

// ─── 9. Hair type pages ───────────────────────────────────────────────────────
for (const ht of hairTypes) {
  const title = trunc(ht.metaTitle, 60);
  const description = trunc(ht.metaDescription, 155);
  writeRoute(`/hair-type/${ht.slug}`, buildHtml({
    title,
    description,
    canonical: `${BASE_URL}/hair-type/${ht.slug}`,
    ogType: "website",
    ogImage: OG_IMAGE,
    schemas: [
      organizationSchema(),
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Hair Types", url: "/reviews" },
        { name: ht.name, url: `/hair-type/${ht.slug}` },
      ]),
    ],
    bodyStub: true,
  }));
  count++;
}

console.log(`\n✅ Prerendered ${count} routes to ${DIST}`);
console.log(`   Products: ${products.length}`);
console.log(`   Comparisons: ${comparisons.length}`);
console.log(`   Hair types: ${hairTypes.length}`);
console.log(`   Categories: ${categories.length}`);
console.log(`   Static pages: 6`);
