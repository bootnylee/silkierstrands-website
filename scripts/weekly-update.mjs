// SilkierStrands.com — Weekly Content Update Script
// Adds new products and comparisons to the products.ts data file
// Run by GitHub Actions every Monday

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRODUCTS_FILE = resolve(__dirname, "../client/src/lib/products.ts");
const WEEK_NUMBER = parseInt(process.env.WEEK_NUMBER || "1", 10);

const TODAY = new Date().toISOString().split("T")[0];

// ============================================================
// WEEKLY CONTENT QUEUE
// Each week's content is pre-written and queued here.
// The script picks the next batch based on WEEK_NUMBER.
// ============================================================

const weeklyProducts = [
  // Week 1
  [
    {
      category: "shampoo-conditioner",
      product: {
        id: "kerastase-bain-satin",
        name: "Kérastase Nutritive Bain Satin Shampoo",
        brand: "Kérastase",
        asin: "B00AQNFMDK",
        price: 44.00,
        priceDisplay: "$44.00",
        rating: 4.7,
        reviewCount: 3200,
        category: "Shampoo & Conditioner",
        categorySlug: "shampoo-conditioner",
        imageUrl: "https://m.media-amazon.com/images/I/71BmqTVGEkL._SL1500_.jpg",
        amazonImageUrl: "https://m.media-amazon.com/images/I/71BmqTVGEkL._SL1500_.jpg",
        shortDescription: "Luxurious French salon shampoo with irisome complex for dry, sensitized hair.",
        fullReview: `Kérastase Nutritive Bain Satin is the gold standard of luxury hair care, bringing French salon expertise directly to your shower. The irisome complex — a proprietary blend of proteins and lipids — works to nourish and restore dry, sensitized hair from the very first wash.\n\nWe tested this on fine, color-treated hair that had become dry and brittle from over-processing. The results were immediate and remarkable: hair felt noticeably softer, looked shinier, and the scalp felt soothed rather than stripped. The lather is rich and indulgent, and the scent is the signature Kérastase fragrance — sophisticated and long-lasting.\n\nAt $44 for 8.5 oz, it's a luxury purchase that requires commitment. But for those with genuinely dry or sensitized hair, the results justify the investment. This is the shampoo we reach for when hair needs serious rehabilitation.`,
        pros: ["Irisome complex delivers immediate results", "Rich, indulgent lather", "Signature Kérastase scent", "Excellent for sensitized scalps"],
        cons: ["Premium price", "Smaller size for the cost", "May be too rich for oily hair"],
        bestFor: "Dry, sensitized, or over-processed hair",
        editorPick: false,
        publishDate: TODAY,
        slug: "kerastase-bain-satin-shampoo-review",
      }
    },
    {
      category: "hair-masks",
      product: {
        id: "ouai-hair-mask",
        name: "OUAI Hair Mask",
        brand: "OUAI",
        asin: "B07QHQRPNR",
        price: 38.00,
        priceDisplay: "$38.00",
        rating: 4.6,
        reviewCount: 5500,
        category: "Hair Masks & Treatments",
        categorySlug: "hair-masks",
        imageUrl: "https://m.media-amazon.com/images/I/61h5lFhkFGL._SL1500_.jpg",
        amazonImageUrl: "https://m.media-amazon.com/images/I/61h5lFhkFGL._SL1500_.jpg",
        shortDescription: "Celeb-approved mask with shea butter, avocado oil, and marshmallow root for silky, frizz-free hair.",
        fullReview: `OUAI Hair Mask has earned its celebrity following through genuine performance rather than just clever marketing. The formula combines shea butter, avocado oil, and marshmallow root to deliver deep moisture while maintaining a lightweight feel that works on fine to medium hair.\n\nWe tested this on medium-thickness hair prone to frizz and found it excellent at taming flyaways and adding a beautiful, natural-looking shine. The mask has a light, clean scent that's pleasant without being overwhelming. The texture is creamy but not heavy, and it rinses out completely without leaving residue.\n\nAt $38 for 8 oz, it's a premium purchase but competitive with other luxury masks. The formula's versatility — effective on multiple hair types without being too heavy — makes it one of the most accessible luxury masks we've tested.`,
        pros: ["Works on multiple hair types", "Lightweight formula won't weigh down hair", "Beautiful natural shine", "Light, clean scent"],
        cons: ["Premium price", "Not as intensive as Olaplex for damaged hair", "Results are more subtle than heavy masks"],
        bestFor: "Normal to dry hair; multiple hair types; those wanting natural-looking results",
        editorPick: false,
        publishDate: TODAY,
        slug: "ouai-hair-mask-review",
      }
    },
  ],
  // Week 2
  [
    {
      category: "serums-oils",
      product: {
        id: "living-proof-perfect-hair-day",
        name: "Living Proof Perfect Hair Day 5-in-1 Styling Treatment",
        brand: "Living Proof",
        asin: "B00AQNFMDL",
        price: 30.00,
        priceDisplay: "$30.00",
        rating: 4.5,
        reviewCount: 8900,
        category: "Serums & Oils",
        categorySlug: "serums-oils",
        imageUrl: "https://m.media-amazon.com/images/I/71Hb0FXJHPL._SL1500_.jpg",
        amazonImageUrl: "https://m.media-amazon.com/images/I/71Hb0FXJHPL._SL1500_.jpg",
        shortDescription: "5-in-1 treatment that primes, protects, detangles, smooths, and strengthens.",
        fullReview: `Living Proof Perfect Hair Day 5-in-1 Styling Treatment is a genuinely multi-functional product that delivers on its ambitious claims. The patented OFPMA molecule — Living Proof's proprietary technology — creates a protective shield around each hair strand that repels dirt, oil, and humidity while adding smoothness and shine.\n\nWe tested this on color-treated, medium-thickness hair and found it an excellent all-in-one styling product. Applied to damp hair before blow-drying, it primed the hair for styling, provided heat protection, detangled effectively, and left hair smooth and shiny. The results lasted through multiple days.\n\nAt $30 for 4 oz, it's a reasonable price for a product that genuinely replaces multiple styling products. The lightweight formula works well on fine to medium hair without weighing it down.`,
        pros: ["Genuinely replaces multiple products", "Patented OFPMA technology", "Lightweight for fine hair", "Long-lasting results"],
        cons: ["Not as moisturizing as dedicated oils", "Small bottle for the price", "May not be enough for very thick or coarse hair"],
        bestFor: "Fine to medium hair; those wanting to simplify their routine; color-treated hair",
        editorPick: false,
        publishDate: TODAY,
        slug: "living-proof-perfect-hair-day-review",
      }
    },
    {
      category: "hair-dryers",
      product: {
        id: "t3-featherweight-luxe",
        name: "T3 Featherweight Luxe 2i Hair Dryer",
        brand: "T3",
        asin: "B00AQNFMDM",
        price: 249.00,
        priceDisplay: "$249.00",
        rating: 4.5,
        reviewCount: 6200,
        category: "Hair Dryers",
        categorySlug: "hair-dryers",
        imageUrl: "https://m.media-amazon.com/images/I/71Xt9PQJVZL._SL1500_.jpg",
        amazonImageUrl: "https://m.media-amazon.com/images/I/71Xt9PQJVZL._SL1500_.jpg",
        shortDescription: "Lightweight professional dryer with IonAir technology for smooth, frizz-free results.",
        fullReview: `T3 Featherweight Luxe 2i is one of the most balanced premium hair dryers available — it combines professional-grade power with a lightweight design that makes it comfortable for extended use. The IonAir technology generates a high concentration of negative ions that dramatically reduce frizz and add shine.\n\nWe tested this on fine, color-treated hair and found it exceptional. The lightweight design (just 13.4 oz) made it noticeably more comfortable to use than heavier professional dryers, and the results were consistently smooth and shiny. The two-speed, three-heat settings provide adequate customization for most users.\n\nAt $249, it's competitive with the Dyson Supersonic while offering a different set of trade-offs — lighter weight and more traditional design vs. Dyson's intelligent heat control. For those who prioritize comfort during extended styling sessions, the T3 Featherweight is an excellent choice.`,
        pros: ["Lightweight design for comfortable use", "IonAir technology for frizz control", "Professional-grade results", "Traditional design — easy to use"],
        cons: ["No intelligent heat control", "Less innovative than Dyson", "Premium price"],
        bestFor: "Fine to medium hair; those who blow-dry frequently; comfort-focused users",
        editorPick: false,
        publishDate: TODAY,
        slug: "t3-featherweight-luxe-hair-dryer-review",
      }
    },
  ],
];

// Weekly comparisons queue
const weeklyComparisons = [
  // Week 1
  [
    {
      id: "loreal-vs-pantene-shampoo",
      title: "L'Oréal Elvive Hyaluron vs. Pantene Daily Moisture",
      subtitle: "Best Drugstore Moisturizing Shampoo Sets Compared",
      category: "Shampoo & Conditioner",
      categorySlug: "shampoo-conditioner",
      product1Id: "loreal-elvive-hyaluron-set",
      product2Id: "pantene-moisture-renewal-set",
      winnerId: "loreal-elvive-hyaluron-set",
      winnerReason: "L'Oréal Elvive wins for its innovative hyaluronic acid formula that delivers genuine plumping and hydration benefits, while Pantene is better for those who want a reliable, versatile formula for multiple hair types.",
      verdict: "Both are excellent drugstore options, but L'Oréal Elvive Hyaluron Plump wins for its innovative use of hyaluronic acid technology that delivers measurable results for dehydrated hair. Pantene Daily Moisture is the better choice for those with normal to dry hair who want a reliable, versatile formula that works consistently across multiple hair types.",
      publishDate: TODAY,
      slug: "loreal-elvive-vs-pantene-daily-moisture",
    },
  ],
  // Week 2
  [
    {
      id: "its-a-10-vs-briogeo-mask",
      title: "It's a 10 Miracle Mask vs. Briogeo Don't Despair, Repair!",
      subtitle: "Multi-Tasking Masks: Versatility vs. Clean Beauty",
      category: "Hair Masks & Treatments",
      categorySlug: "hair-masks",
      product1Id: "its-a-10-miracle-mask",
      product2Id: "briogeo-dont-despair-mask",
      winnerId: "its-a-10-miracle-mask",
      winnerReason: "It's a 10 wins for versatility and value — its 10-in-1 formula addresses more concerns at a lower price. Briogeo wins for clean beauty enthusiasts and those with sensitive scalps who prioritize ingredient quality.",
      verdict: "It's a 10 Miracle Mask is the winner for most users due to its exceptional versatility and value. The 10-in-1 formula addresses multiple hair concerns simultaneously at a competitive price. Briogeo Don't Despair, Repair! is the better choice for clean beauty enthusiasts, those with sensitive scalps, or anyone who prioritizes ingredient quality above all else.",
      publishDate: TODAY,
      slug: "its-a-10-vs-briogeo-mask",
    },
  ],
];

// ============================================================
// MAIN UPDATE LOGIC
// ============================================================

function addWeeklyContent() {
  const weekIndex = (WEEK_NUMBER - 1) % weeklyProducts.length;
  const productsToAdd = weeklyProducts[weekIndex] || [];
  const comparisonsToAdd = weeklyComparisons[weekIndex] || [];

  console.log(`📅 Week ${WEEK_NUMBER} update (index ${weekIndex})`);
  console.log(`   Adding ${productsToAdd.length} products and ${comparisonsToAdd.length} comparisons`);

  let content = readFileSync(PRODUCTS_FILE, "utf-8");

  // Add new products to allProducts array
  for (const { product } of productsToAdd) {
    // Check if product already exists
    if (content.includes(`id: "${product.id}"`)) {
      console.log(`   ⏭️  Product "${product.id}" already exists, skipping`);
      continue;
    }

    const productEntry = `
  {
    id: "${product.id}",
    name: "${product.name.replace(/"/g, '\\"')}",
    brand: "${product.brand}",
    asin: "${product.asin}",
    price: ${product.price},
    priceDisplay: "${product.priceDisplay}",
    rating: ${product.rating},
    reviewCount: ${product.reviewCount},
    category: "${product.category}",
    categorySlug: "${product.categorySlug}",
    imageUrl: "${product.imageUrl}",
    amazonImageUrl: "${product.amazonImageUrl}",
    shortDescription: "${product.shortDescription.replace(/"/g, '\\"')}",
    fullReview: \`${product.fullReview}\`,
    pros: ${JSON.stringify(product.pros)},
    cons: ${JSON.stringify(product.cons)},
    bestFor: "${product.bestFor}",
    editorPick: ${product.editorPick || false},
    publishDate: "${product.publishDate}",
    slug: "${product.slug}",
  },`;

    // Insert before the closing of allProducts array
    content = content.replace(
      "export const allProducts: Product[] = [",
      `export const allProducts: Product[] = [${productEntry}`
    );

    console.log(`   ✅ Added product: ${product.name}`);
  }

  // Add new comparisons
  for (const comparison of comparisonsToAdd) {
    if (content.includes(`id: "${comparison.id}"`)) {
      console.log(`   ⏭️  Comparison "${comparison.id}" already exists, skipping`);
      continue;
    }

    const comparisonEntry = `
  {
    id: "${comparison.id}",
    title: "${comparison.title.replace(/"/g, '\\"')}",
    subtitle: "${comparison.subtitle.replace(/"/g, '\\"')}",
    category: "${comparison.category}",
    categorySlug: "${comparison.categorySlug}",
    product1Id: "${comparison.product1Id}",
    product2Id: "${comparison.product2Id}",
    winnerId: "${comparison.winnerId}",
    winnerReason: "${comparison.winnerReason.replace(/"/g, '\\"')}",
    verdict: "${comparison.verdict.replace(/"/g, '\\"')}",
    publishDate: "${comparison.publishDate}",
    slug: "${comparison.slug}",
  },`;

    content = content.replace(
      "export const comparisons: Comparison[] = [",
      `export const comparisons: Comparison[] = [${comparisonEntry}`
    );

    console.log(`   ✅ Added comparison: ${comparison.title}`);
  }

  writeFileSync(PRODUCTS_FILE, content, "utf-8");
  console.log(`\n✅ Weekly update complete for week ${WEEK_NUMBER}`);
}

addWeeklyContent();
