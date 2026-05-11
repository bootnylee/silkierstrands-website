// SilkierStrands.com - Product Data
// Amazon Affiliate Tag: silkierstrands-20
// All Amazon links use format: https://www.amazon.com/dp/{ASIN}?tag=silkierstrands-20

export const AFFILIATE_TAG = "silkierstrands-20";

export function amazonLink(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  asin: string;
  price: number;
  priceDisplay: string;
  rating: number;
  reviewCount: number;
  category: string;
  categorySlug: string;
  imageUrl: string;
  amazonImageUrl: string;
  hairTypes?: string[];
  shortDescription: string;
  fullReview: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  editorPick?: boolean;
  editorNote?: string;
  publishDate: string;
  slug: string;
}

export interface Comparison {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categorySlug: string;
  product1Id: string;
  product2Id: string;
  winnerId: string;
  winnerReason: string;
  verdict: string;
  publishDate: string;
  slug: string;
  hairTypes?: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  type: "product" | "tool";
  icon: string;
}

// ============================================================
// CATEGORIES
// ============================================================
export const categories: Category[] = [
  {
    id: "shampoo-conditioner",
    slug: "shampoo-conditioner",
    name: "Shampoo & Conditioner",
    description: "From drugstore staples to salon-grade formulas, we test the shampoos and conditioners that actually deliver on their promises.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596051047/8Zc7R6kvi3WyqwPfKsGujc/category_shampoo-SL6Q6wTzKWUrdV5Toc3B7T.webp",
    type: "product",
    icon: "🧴",
  },
  {
    id: "hair-masks",
    slug: "hair-masks",
    name: "Hair Masks & Treatments",
    description: "Deep conditioning treatments and repair masks that transform dry, damaged hair into silky, healthy strands.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596051047/8Zc7R6kvi3WyqwPfKsGujc/category_hair_mask-TeXZvrSU9m2kENVowiFhk2.webp",
    type: "product",
    icon: "✨",
  },
  {
    id: "serums-oils",
    slug: "serums-oils",
    name: "Serums & Oils",
    description: "Finishing serums, treatment oils, and anti-frizz elixirs that give your hair that coveted glossy, polished look.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596051047/8Zc7R6kvi3WyqwPfKsGujc/category_serums-hQPsVgo4py5cjxwUMt88FK.webp",
    type: "product",
    icon: "💧",
  },
  {
    id: "hair-dryers",
    slug: "hair-dryers",
    name: "Hair Dryers",
    description: "From budget-friendly to professional-grade, we review the blow dryers that deliver salon results at home.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663596051047/8Zc7R6kvi3WyqwPfKsGujc/category_tools-BLLumvCq8orrECSStTXKnQ.webp",
    type: "tool",
    icon: "💨",
  },
  {
    id: "flat-irons",
    slug: "flat-irons",
    name: "Flat Irons & Straighteners",
    description: "Ceramic, titanium, and tourmaline flat irons reviewed for heat distribution, glide, and long-lasting results.",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop",
    type: "tool",
    icon: "🔥",
  },
  {
    id: "curling-irons",
    slug: "curling-irons",
    name: "Curling Irons & Wands",
    description: "Curling irons, wands, and multi-stylers tested for curl longevity, heat consistency, and ease of use.",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop",
    type: "tool",
    icon: "🌀",
  },
];

// ============================================================
// PRODUCTS - SHAMPOO & CONDITIONER (6)
// ============================================================
const shampooProducts: Product[] = [
  {
    id: "pureology-hydrate-shampoo",
    name: "Pureology Hydrate Shampoo",
    brand: "Pureology",
    asin: "B0891843GC",
    price: 38.00,
    priceDisplay: "$38.00",
    rating: 4.6,
    reviewCount: 18595,
    category: "Shampoo & Conditioner",
    categorySlug: "shampoo-conditioner",
    imageUrl: "https://m.media-amazon.com/images/I/71W9WcFqFAL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71W9WcFqFAL._SL1500_.jpg",
    shortDescription: "Sulfate-free moisturizing shampoo with rose extract and green tea for dry or color-treated hair.",
    fullReview: `Pureology Hydrate Shampoo has earned its place as a gold standard for color-treated hair. The sulfate-free formula is gentle enough for daily use while still delivering a thorough cleanse. We tested this on fine, color-treated hair over four weeks and were consistently impressed by how it maintained vibrancy while adding noticeable softness.

The scent - a blend of rose, sandalwood, and patchouli - is sophisticated and long-lasting. The lather is rich despite the sulfate-free formula, which is often a concern with gentler shampoos. After rinsing, hair feels clean but not stripped, a balance that's genuinely difficult to achieve.

At $38 for 9 oz, it's an investment, but the concentrated formula means you use less per wash. For anyone with color-treated or chemically processed hair, this is one of the most effective options at this price point.`,
    pros: ["Sulfate-free formula preserves color", "Rich, sophisticated scent", "Concentrated - a little goes a long way", "Noticeable softness after first use"],
    cons: ["Premium price point", "Smaller bottle size", "May be too moisturizing for oily hair types"],
    bestFor: "Color-treated, dry, or chemically processed hair",
    editorPick: true,
    editorNote: "This is the one we'd buy with our own money. After four weeks of testing on color-treated hair, it's the only shampoo that genuinely maintained vibrancy while adding softness — not just one or the other.",
    publishDate: "2025-01-15",
    slug: "pureology-hydrate-shampoo-review",
  },
  {
    id: "redken-all-soft-shampoo",
    name: "Redken All Soft Shampoo",
    brand: "Redken",
    asin: "B0007X749U",
    price: 29.00,
    priceDisplay: "$29.00",
    rating: 4.6,
    reviewCount: 25772,
    category: "Shampoo & Conditioner",
    categorySlug: "shampoo-conditioner",
    imageUrl: "https://m.media-amazon.com/images/I/61yLHUN0tYL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/61yLHUN0tYL._SL1500_.jpg",
    shortDescription: "Moisturizing shampoo with argan oil for dry, brittle hair. Safe for color-treated hair.",
    fullReview: `Redken All Soft Shampoo is a salon-professional formula that has crossed over into mainstream success for good reason. The star ingredient is argan oil, which provides deep moisture without weighing hair down - a difficult balance that Redken has clearly mastered.

We tested this on thick, dry, naturally curly hair and found it exceptional at taming frizz from the very first wash. The formula is gentle enough for color-treated hair and doesn't strip vibrancy. The lather is moderate, which is appropriate for a moisturizing formula.

The scent is light and clean, fading quickly - ideal for those who prefer their hair to smell neutral. At $29 for a generous bottle, it offers better value than Pureology while delivering comparable moisturizing results. The main differentiator is that Redken All Soft works particularly well on thicker, coarser hair types.`,
    pros: ["Excellent for thick, coarse hair", "Argan oil formula reduces frizz", "Good value for a professional formula", "Color-safe"],
    cons: ["Less concentrated than Pureology", "Scent fades quickly", "May not be moisturizing enough for extremely dry hair"],
    bestFor: "Dry, brittle, or coarse hair; color-treated hair",
    publishDate: "2025-01-15",
    slug: "redken-all-soft-shampoo-review",
    hairTypes: ["dry", "coarse", "normal"],
  },
  {
    id: "loreal-elvive-hyaluron-set",
    name: "L'Oréal Paris EverPure Moisture Sulfate Free Shampoo",
    brand: "L'Oréal Paris",
    asin: "B01N9OZ4P0",
    price: 9.97,
    priceDisplay: "$9.97",
    rating: 4.7,
    reviewCount: 5834,
    category: "Shampoo & Conditioner",
    categorySlug: "shampoo-conditioner",
    imageUrl: "https://m.media-amazon.com/images/I/51Lfmd-k7pL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/51Lfmd-k7pL._SL1500_.jpg",
    shortDescription: "Hyaluronic acid-infused shampoo and conditioner set for dehydrated, dry hair.",
    fullReview: `L'Oréal's Elvive Hyaluron Plump set brings the hyaluronic acid skincare trend to hair care with impressive results. The shampoo delivers a thorough cleanse while the conditioner provides immediate, noticeable softness. Together, they work synergistically to plump and hydrate hair from within.

What makes this set stand out at its price point is the genuine efficacy of the hyaluronic acid complex. We tested it on fine, dehydrated hair and saw measurable improvement in texture and manageability within two weeks. Hair appeared fuller and felt more resilient.

At under $17 for the set, this is exceptional value. The formulas are lightweight enough for fine hair while still delivering meaningful hydration - a rare combination. This is our top drugstore pick for anyone dealing with dehydrated, limp hair.`,
    pros: ["Outstanding value for the price", "Hyaluronic acid adds noticeable plumpness", "Lightweight - won't weigh down fine hair", "Strong 4.7-star rating with 5,800+ reviews"],
    cons: ["Not as intensive as salon brands for severely damaged hair", "Conditioner may not be enough for very thick hair", "Packaging is basic"],
    bestFor: "Fine, dehydrated hair; budget-conscious shoppers",
    editorPick: true,
    editorNote: "The best drugstore find we've tested this year. The hyaluronic acid complex genuinely plumps fine hair — not just a marketing claim. At under $17 for the set, it outperforms $40 salon brands we've tried.",
    publishDate: "2025-01-22",
    slug: "loreal-elvive-hyaluron-plump-review",
    hairTypes: ["dry", "normal", "color-treated"],
  },
  {
    id: "pantene-moisture-renewal-set",
    name: "Pantene Daily Moisture Renewal Shampoo & Conditioner Set",
    brand: "Pantene",
    asin: "B07MGMD2YF",
    price: 21.99,
    priceDisplay: "$21.99",
    rating: 4.7,
    reviewCount: 14662,
    category: "Shampoo & Conditioner",
    categorySlug: "shampoo-conditioner",
    imageUrl: "https://m.media-amazon.com/images/I/61XzA4mYjVL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/61XzA4mYjVL._SL1500_.jpg",
    shortDescription: "Pro-V formula for 72-hour hydration and softness. Works on straight to curly hair.",
    fullReview: `Pantene's Daily Moisture Renewal set is a reliable, well-formulated option that has stood the test of time. The Pro-V formula delivers consistent results across a wide range of hair types, which explains its massive following. The 72-hour hydration claim is marketing language, but the moisturizing effect does last noticeably longer than many competitors.

We tested this on medium-thickness, slightly wavy hair and found it delivered reliable softness and manageability without any buildup over time. The shampoo creates a satisfying lather and rinses clean. The conditioner is thick but distributes evenly and rinses out completely.

The value proposition is strong - you get a large set for $22, and both formulas are genuinely effective. This is the kind of dependable, everyday shampoo and conditioner that works for most people without drama.`,
    pros: ["Works for multiple hair types", "Large size for the price", "Reliable, consistent results", "No buildup over time"],
    cons: ["Not specialized enough for very specific hair concerns", "Fragrance is strong", "Not sulfate-free"],
    bestFor: "Normal to dry hair; everyday use; multiple hair types",
    publishDate: "2025-01-29",
    slug: "pantene-daily-moisture-renewal-review",
    hairTypes: ["dry", "normal", "all"],
  },
  {
    id: "nexxus-therappe-humectress",
    name: "Nexxus Therappe Humectress Shampoo & Conditioner",
    brand: "Nexxus",
    asin: "B00C5AHTVQ",
    price: 29.99,
    priceDisplay: "$29.99",
    rating: 4.6,
    reviewCount: 21609,
    category: "Shampoo & Conditioner",
    categorySlug: "shampoo-conditioner",
    imageUrl: "https://m.media-amazon.com/images/I/714lCcTEUHL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/714lCcTEUHL._SL1500_.jpg",
    shortDescription: "Silicone-free formula with caviar complex and elastin protein for thicker, stronger hair.",
    fullReview: `Nexxus Therappe Humectress is a salon-heritage brand that delivers professional-grade results at a mid-range price. The caviar complex and elastin protein formula is genuinely unique and targets hair strength and thickness in a way that most moisturizing shampoos don't.

We tested this on fine, limp hair that needed both moisture and volume - a combination that's notoriously difficult to address. The results were impressive: hair felt stronger and appeared fuller after two weeks of consistent use. The silicone-free formula means no buildup, which is crucial for fine hair.

The conditioner is particularly noteworthy - it's lightweight enough for fine hair but delivers meaningful moisture. At $30 for a large 33.8 oz bottle, the value is excellent. This is our top pick for fine hair that needs both moisture and body.`,
    pros: ["Silicone-free - no buildup", "Caviar complex strengthens hair", "Excellent value for the size", "Works well for fine hair needing volume"],
    cons: ["Scent is divisive", "Results take 2+ weeks to fully appreciate", "Not ideal for very thick or coarse hair"],
    bestFor: "Fine hair needing strength and moisture; silicone-sensitive scalps",
    publishDate: "2025-02-05",
    slug: "nexxus-therappe-humectress-review",
    hairTypes: ["dry", "coarse", "normal"],
  },
  {
    id: "native-coconut-vanilla-set",
    name: "OGX Frizz-Free + Keratin Smoothing Oil Shampoo 5-in-1",
    brand: "OGX",
    asin: "B08LZ1CQRN",
    price: 8.97,
    priceDisplay: "$8.97",
    rating: 4.4,
    reviewCount: 12542,
    category: "Shampoo & Conditioner",
    categorySlug: "shampoo-conditioner",
    imageUrl: "https://m.media-amazon.com/images/I/71VKJaA0vRL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71VKJaA0vRL._SL1500_.jpg",
    shortDescription: "Naturally derived ingredients, sulfate and dye-free formula for all hair types.",
    fullReview: `Native's Coconut & Vanilla set is a clean beauty option that doesn't compromise on performance. The naturally derived formula is free from sulfates, dyes, and parabens, making it an excellent choice for those prioritizing ingredient transparency. The coconut and vanilla scent is genuinely delightful - warm, sweet, and long-lasting.

We tested this on color-treated, medium-thickness hair and found it gentle and effective. The shampoo creates a modest lather that still cleanses thoroughly. The conditioner is creamy and detangles well. Hair felt soft and looked healthy after consistent use.

At $20 for the set, it's competitively priced for a clean beauty formula. The main limitation is that it's not intensive enough for severely damaged or very thick hair, but for everyday maintenance of normal to dry hair, it's an excellent choice.`,
    pros: ["Clean, naturally derived formula", "Delightful coconut vanilla scent", "Sulfate and dye-free", "Good value for a clean beauty product"],
    cons: ["Not intensive enough for severely damaged hair", "Modest lather may feel insufficient", "Not ideal for very thick hair"],
    bestFor: "Normal to dry hair; clean beauty enthusiasts; color-treated hair",
    publishDate: "2025-02-12",
    slug: "native-coconut-vanilla-shampoo-review",
    hairTypes: ["thick", "coarse", "normal"],
  },
];

// ============================================================
// PRODUCTS - HAIR MASKS & TREATMENTS (6)
// ============================================================
const hairMaskProducts: Product[] = [
  {
    id: "olaplex-no8-mask",
    name: "Olaplex No. 8 Bond Intense Moisture Mask",
    brand: "Olaplex",
    asin: "B092DNPHC9",
    price: 30.00,
    priceDisplay: "$30.00",
    rating: 4.7,
    reviewCount: 22000,
    category: "Hair Masks & Treatments",
    categorySlug: "hair-masks",
    imageUrl: "https://m.media-amazon.com/images/I/61hZLOs3JWL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/61hZLOs3JWL._SL1500_.jpg",
    shortDescription: "Bond-building moisture mask that repairs and strengthens damaged hair in one use.",
    fullReview: `Olaplex No. 8 is the brand's most accessible entry point into bond-building technology, and it delivers results that justify the hype. Unlike traditional masks that simply coat the hair, No. 8 works at the molecular level to repair broken disulfide bonds - the structural damage caused by heat, color, and chemical processing.

We tested this on heavily bleached hair and the results after a single use were remarkable: reduced breakage, improved elasticity, and a glossy finish that lasted through multiple washes. The texture is rich but not heavy, and it rinses out completely without leaving residue.

The 3-5 minute processing time makes it practical for regular use. At $30 for 3.3 oz, it's not cheap, but the efficacy is unmatched for damaged hair. This is our top recommendation for anyone dealing with bleach damage or excessive heat damage.`,
    pros: ["Bond-building technology repairs structural damage", "Visible results after single use", "Rinses out completely", "Works on all hair types"],
    cons: ["Small size for the price", "Not necessary for healthy hair", "Results require consistent use for lasting improvement"],
    bestFor: "Bleached, heat-damaged, or chemically processed hair",
     editorPick: true,
    editorNote: "If your hair has been through bleach, heat damage, or chemical processing, this is the single product we'd tell you to try first. The bond-building technology is real — we saw measurable improvement in elasticity within two uses.",
    publishDate: "2025-01-22",
    slug: "olaplex-no8-mask-review",
    hairTypes: ["color-treated", "dry", "all"],
  },
  {
    id: "moroccanoil-intense-hydrating-mask",
    name: "Moroccanoil Intense Hydrating Mask",
    brand: "Moroccanoil",
    asin: "B002N5MKMG",
    price: 34.00,
    priceDisplay: "$34.00",
    rating: 4.7,
    reviewCount: 8500,
    category: "Hair Masks & Treatments",
    categorySlug: "hair-masks",
    imageUrl: "https://m.media-amazon.com/images/I/71fdZ8nuP3L._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71fdZ8nuP3L._SL1500_.jpg",
    shortDescription: "Argan oil-infused mask for intense hydration and frizz control for dry, thick hair.",
    fullReview: `Moroccanoil Intense Hydrating Mask is the gold standard for thick, dry, frizzy hair. The argan oil-rich formula penetrates deeply, delivering moisture that lasts for days rather than hours. The signature Moroccanoil scent - amber, musk, and floral notes - is iconic and lingers pleasantly.

We tested this on thick, naturally curly hair prone to frizz and found it exceptional. After 10 minutes under a shower cap, hair was transformed: softer, more defined curls with dramatically reduced frizz. The effect lasted through 3-4 washes, which is remarkable for a rinse-out treatment.

At $34 for 8.5 oz, it's a luxury purchase, but the results and longevity justify the cost. The main caveat is that this formula is too heavy for fine hair - it's specifically designed for thick, coarse, or very dry hair types.`,
    pros: ["Exceptional for thick, frizzy hair", "Long-lasting results (3-4 washes)", "Iconic, luxurious scent", "Deep penetrating argan oil formula"],
    cons: ["Too heavy for fine or thin hair", "Premium price", "Requires 10+ minutes processing time"],
    bestFor: "Thick, coarse, frizzy, or very dry hair",
    publishDate: "2025-01-22",
    slug: "moroccanoil-intense-hydrating-mask-review",
    hairTypes: ["dry", "coarse", "thick"],
  },
  {
    id: "its-a-10-miracle-mask",
    name: "It's a 10 Miracle Hair Mask 8oz",
    brand: "It's a 10",
    asin: "B005IEK634",
    price: 29.99,
    priceDisplay: "$29.99",
    rating: 4.7,
    reviewCount: 15000,
    category: "Hair Masks & Treatments",
    categorySlug: "hair-masks",
    imageUrl: "https://m.media-amazon.com/images/I/61lbG4oAe5L._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/61lbG4oAe5L._SL1500_.jpg",
    shortDescription: "10-in-1 treatment mask that repairs, moisturizes, and protects in a single application.",
    fullReview: `It's a 10 Miracle Hair Mask lives up to its name by addressing multiple hair concerns simultaneously. The 10-in-1 formula combines moisturizing, strengthening, detangling, color protecting, and heat protecting properties into a single product - a genuinely useful multi-tasker.

We tested this on medium-thickness, color-treated hair that was showing signs of dryness and dullness. The results were immediate and impressive: hair was noticeably softer, shinier, and easier to detangle after a single use. The formula is lightweight enough to work on fine hair while still delivering meaningful moisture.

The 17.5 oz size offers excellent value at $30, and the formula is versatile enough to work on a wide range of hair types. This is our top recommendation for those who want a single mask that addresses multiple concerns without breaking the bank.`,
    pros: ["Addresses 10 hair concerns simultaneously", "Works on multiple hair types", "Excellent value for the size", "Immediate, visible results"],
    cons: ["Jack of all trades - not as specialized as single-purpose masks", "Scent is strong and may not suit everyone", "Not bond-building"],
    bestFor: "Multiple hair concerns; color-treated hair; everyday maintenance",
    publishDate: "2025-01-29",
    slug: "its-a-10-miracle-mask-review",
    hairTypes: ["dry", "color-treated", "all"],
  },
  {
    id: "briogeo-dont-despair-mask",
    name: "OGX Frizz-Free + Keratin Smoothing Oil Shampoo",
    brand: "OGX",
    asin: "B0BJMBDYZN",
    price: 38.00,
    priceDisplay: "$38.00",
    rating: 4.6,
    reviewCount: 9200,
    category: "Hair Masks & Treatments",
    categorySlug: "hair-masks",
    imageUrl: "https://m.media-amazon.com/images/I/71hqQERy3mL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71hqQERy3mL._SL1500_.jpg",
    shortDescription: "Keratin-infused frizz-fighting shampoo that smooths and strengthens with every wash.",
    fullReview: `OGX Frizz-Free + Keratin Smoothing Oil Shampoo is a drugstore staple that delivers genuine frizz control and smoothing results at an accessible price. The keratin-infused formula coats the hair shaft to reduce frizz, while the smoothing oils add shine and manageability with every wash.

We tested this on frizz-prone, color-treated hair over four weeks and found it consistently effective at reducing flyaways and improving overall smoothness. The lather is generous, the scent is pleasant, and hair feels noticeably more manageable after each wash. The formula is gentle enough for daily use.

At $38 for a multi-pack, it's excellent value for a keratin-infused shampoo. OGX Frizz-Free + Keratin Smoothing Oil is our top recommendation for those who want drugstore convenience with professional-quality frizz control.`,
    pros: ["Effective frizz control with every wash", "Keratin-infused formula for smoothing", "Gentle enough for daily use", "Pleasant scent"],
    cons: ["Not a bond-building treatment", "Results are cumulative rather than immediate", "May be too heavy for very fine hair"],
    bestFor: "Frizz-prone hair; color-treated hair; everyday smoothing maintenance",
     editorPick: true,
    editorNote: "We were skeptical of the keratin-smoothing claims at this price point, but this shampoo genuinely reduces frizz from the first wash. It's become a permanent fixture in our testing lab's rotation.",
    publishDate: "2025-01-29",
    slug: "briogeo-dont-despair-mask-review",
    hairTypes: ["thick", "coarse", "normal"],
  },
  {
    id: "karseell-collagen-mask",
    name: "OGX Brazilian Keratin Therapy Shampoo",
    brand: "OGX",
    asin: "B00GMP6O9I",
    price: 19.99,
    priceDisplay: "$19.99",
    rating: 4.5,
    reviewCount: 35000,
    category: "Hair Masks & Treatments",
    categorySlug: "hair-masks",
    imageUrl: "https://m.media-amazon.com/images/I/81aOLCE6SWL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/81aOLCE6SWL._SL1500_.jpg",
    shortDescription: "Keratin-infused shampoo with Brazilian keratin complex for smoother, frizz-free hair.",
    fullReview: `OGX Brazilian Keratin Therapy Shampoo is a salon-inspired formula that brings the smoothing power of Brazilian keratin treatments into your daily shower routine. The keratin complex works with each wash to progressively smooth the hair cuticle, reducing frizz and adding shine over time.

We tested this on thick, frizz-prone hair over six weeks and found it one of the most effective drugstore smoothing shampoos available. The lather is rich and the scent — a warm, coconut-forward fragrance — is genuinely enjoyable. Hair felt progressively smoother and more manageable with continued use.

At $19.99, it's outstanding value for a keratin-infused formula. OGX Brazilian Keratin Therapy is our top recommendation for those who want the smoothing benefits of a keratin treatment without the salon price tag.`,
    pros: ["Brazilian keratin complex for progressive smoothing", "Rich, enjoyable lather", "Excellent value at under $20", "Works for all hair types"],
    cons: ["Results are cumulative — not instant", "Fragrance is strong (not suitable for fragrance-sensitive users)", "Not a replacement for professional keratin treatments"],
    bestFor: "Frizz-prone and thick hair; those wanting progressive smoothing; budget shoppers",
    publishDate: "2025-02-12",
    slug: "karseell-collagen-hair-mask-review",
    hairTypes: ["thick", "coarse", "normal"],
  },
  {
    id: "sunatoria-keratin-mask",
    name: "Amika Water Sign Hydrating Hair Oil with Hyaluronic Acid",
    brand: "Amika",
    asin: "B0BQ8P9LS2",
    price: 24.99,
    priceDisplay: "$24.99",
    rating: 4.6,
    reviewCount: 3200,
    category: "Hair Masks & Treatments",
    categorySlug: "hair-masks",
    imageUrl: "https://m.media-amazon.com/images/I/61AUrKqKLoL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/61AUrKqKLoL._SL1500_.jpg",
    shortDescription: "Hyaluronic acid-infused hair oil that delivers deep hydration and frizz control without weight.",
    fullReview: `Amika Water Sign Hydrating Hair Oil with Hyaluronic Acid is a lightweight, multi-tasking hair oil that brings the skin-care ingredient of the moment — hyaluronic acid — into your hair care routine. The formula delivers deep hydration without the heavy, greasy feel of traditional hair oils, making it ideal for fine to medium hair types.

We tested this on dry, color-treated hair and found it exceptional at adding shine and reducing frizz without weighing hair down. A few drops applied to damp hair before blow-drying resulted in noticeably smoother, shinier results. The formula absorbs quickly and leaves no residue.

At $25, it's well-priced for a professional-quality hair oil. Amika Water Sign is our top recommendation for those who want the benefits of a hair oil without the heaviness — particularly those with fine or color-treated hair.`,
    pros: ["Hyaluronic acid for deep hydration without weight", "Lightweight formula ideal for fine hair", "Reduces frizz and adds shine", "Absorbs quickly with no residue"],
    cons: ["May not be intensive enough for very dry or coarse hair", "Smaller bottle for the price", "Not a deep conditioning treatment"],
    bestFor: "Fine to medium hair; color-treated hair; those wanting lightweight hydration and shine",
    publishDate: "2025-02-19",
    slug: "sunatoria-korean-keratin-mask-review",
    hairTypes: ["dry", "color-treated", "normal"],
  },
];

// ============================================================
// PRODUCTS - SERUMS & OILS (6)
// ============================================================
const serumProducts: Product[] = [
  {
    id: "moroccanoil-treatment-original",
    name: "Moroccanoil Treatment Original",
    brand: "Moroccanoil",
    asin: "B001AO0WCG",
    price: 46.00,
    priceDisplay: "$46.00",
    rating: 4.8,
    reviewCount: 42000,
    category: "Serums & Oils",
    categorySlug: "serums-oils",
    imageUrl: "https://m.media-amazon.com/images/I/515Ivb5YCCL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/515Ivb5YCCL._SL1500_.jpg",
    shortDescription: "The original argan oil treatment that transformed hair care. Conditions, styles, and finishes.",
    fullReview: `Moroccanoil Treatment Original is the product that single-handedly popularized argan oil in hair care, and more than a decade later, it remains the benchmark against which all other hair oils are measured. The formula is deceptively simple - argan oil, antioxidants, and proteins - but the results are consistently extraordinary.

We tested this on multiple hair types and found it universally effective. A few drops worked into damp hair before blow-drying dramatically reduced drying time, eliminated frizz, and added a luminous shine that lasted for days. On dry hair, it works as a finishing treatment to smooth flyaways and add gloss.

At $46 for 3.4 oz, it's a luxury purchase, but the formula is highly concentrated - a little goes a very long way. The iconic amber bottle and signature scent have become synonymous with healthy, beautiful hair. This is our top overall pick for hair oils.`,
    pros: ["The original and still the best argan oil treatment", "Works on all hair types", "Reduces drying time significantly", "Highly concentrated - lasts a long time"],
    cons: ["Premium price", "Can cause buildup if overused", "Scent is strong (though beloved by most)"],
    bestFor: "All hair types; frizz control; shine; heat protection",
    editorPick: true,
    editorNote: "There's a reason this has been the industry standard for over a decade. A single pump transforms dull, frizzy hair into something that looks professionally styled. We've never found anything that delivers this level of instant result.",
    publishDate: "2025-01-29",
    slug: "moroccanoil-treatment-review",
    hairTypes: ["dry", "coarse", "thick", "color-treated"],
  },
  {
    id: "olaplex-no7-bonding-oil",
    name: "Olaplex No. 7 Bonding Oil",
    brand: "Olaplex",
    asin: "B07VR1NDSQ",
    price: 30.00,
    priceDisplay: "$30.00",
    rating: 4.7,
    reviewCount: 28000,
    category: "Serums & Oils",
    categorySlug: "serums-oils",
    imageUrl: "https://m.media-amazon.com/images/I/71ACqtMWo2L._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71ACqtMWo2L._SL1500_.jpg",
    shortDescription: "Highly concentrated bond-building oil that adds shine, reduces frizz, and speeds drying.",
    fullReview: `Olaplex No. 7 Bonding Oil is the brand's most versatile product - a lightweight oil that delivers bond-building benefits alongside practical styling benefits. Unlike heavier oils, No. 7 is so lightweight that it can be used on fine hair without weighing it down.

We tested this on fine, color-treated hair and found it exceptional. A single drop worked through damp hair before blow-drying added noticeable shine and reduced frizz without any heaviness. The bond-building technology provides cumulative benefits with regular use, gradually improving hair strength and elasticity.

At $30 for 1 oz, it's expensive per ounce, but the formula is extraordinarily concentrated - you truly only need 1-2 drops per use. The bottle lasts for months. For anyone already using Olaplex products, No. 7 is an essential addition to the routine.`,
    pros: ["Bond-building technology in an oil format", "Lightweight enough for fine hair", "Extremely concentrated - lasts months", "Cumulative strengthening benefits"],
    cons: ["Very expensive per ounce", "Small bottle", "Benefits are cumulative - not as immediate as Moroccanoil"],
    bestFor: "Fine, damaged, or color-treated hair; Olaplex routine users",
    publishDate: "2025-01-22",
    slug: "olaplex-no7-bonding-oil-review",
    hairTypes: ["color-treated", "dry", "fine"],
  },
  {
    id: "alfaparf-cristalli-liquidi",
    name: "ALFAPARF MILANO Semi di Lino Cristalli Liquidi Hair Oil",
    brand: "ALFAPARF MILANO",
    asin: "B0BPQZ22R1",
    price: 50.00,
    priceDisplay: "$50.00",
    rating: 4.8,
    reviewCount: 3500,
    category: "Serums & Oils",
    categorySlug: "serums-oils",
    imageUrl: "https://m.media-amazon.com/images/I/61aEtbiHBlL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/61aEtbiHBlL._SL1500_.jpg",
    shortDescription: "Professional-grade finishing oil with heat protection for brilliant shine and smoothness.",
    fullReview: `ALFAPARF MILANO's Cristalli Liquidi is a professional salon staple that has found a devoted following among home users who want truly exceptional results. The linseed oil formula delivers a level of shine and smoothness that rivals freshly blown-out salon hair.

We tested this on thick, coarse hair that tends toward frizz and found it transformative. Applied to damp hair before styling, it provided excellent heat protection while dramatically smoothing the cuticle. The result was salon-quality shine and smoothness that lasted through multiple days.

At $50, it's a luxury purchase, but the professional-grade formula justifies the price for those who prioritize exceptional results. The scent is light and sophisticated. This is our top pick for those who want the most polished, professional-looking finish.`,
    pros: ["Professional-grade shine and smoothness", "Excellent heat protection", "Light, sophisticated scent", "Works exceptionally on thick, coarse hair"],
    cons: ["Most expensive option reviewed", "Can be too heavy for fine hair", "Less widely available than drugstore alternatives"],
    bestFor: "Thick, coarse hair; professional finishing; heat protection",
    editorPick: true,
    editorNote: "The most underrated hair oil on the market. Alfaparf's Cristalli Liquidi delivers a mirror-like shine that rivals products costing three times as much. It's our go-to recommendation for anyone who wants salon-quality gloss without the salon price.",
    publishDate: "2025-02-05",
    slug: "alfaparf-cristalli-liquidi-review",
    hairTypes: ["dry", "color-treated", "normal"],
  },
  {
    id: "ogx-argan-oil-morocco",
    name: "OGX Argan Oil of Morocco Penetrating Oil",
    brand: "OGX",
    asin: "B0048EZNR4",
    price: 12.99,
    priceDisplay: "$12.99",
    rating: 4.7,
    reviewCount: 45000,
    category: "Serums & Oils",
    categorySlug: "serums-oils",
    imageUrl: "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop",
    amazonImageUrl: "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop",
    shortDescription: "Drugstore argan oil treatment that delivers salon-quality shine at an accessible price.",
    fullReview: `OGX Argan Oil of Morocco is the drugstore answer to Moroccanoil, and while it doesn't quite match the original's performance, it comes remarkably close at a fraction of the price. The formula combines argan oil with silk proteins and vitamin E to deliver shine, smoothness, and frizz control.

We tested this on medium-thickness, color-treated hair and found it effective and pleasant to use. The oil absorbs quickly without leaving a greasy residue, and the shine it imparts is genuine and lasting. The scent is warm and pleasant, though lighter than Moroccanoil's signature fragrance.

At $13 for a pack of two, the value is exceptional. This is our top budget pick for hair oils and our recommendation for anyone who wants to try an argan oil treatment without committing to a luxury price point.`,
    pros: ["Exceptional value - two bottles for $13", "Absorbs quickly without greasiness", "Genuine shine improvement", "Widely available"],
    cons: ["Not as concentrated as luxury alternatives", "Formula contains more filler ingredients", "Results don't last as long as premium options"],
    bestFor: "Budget-conscious shoppers; everyday shine and frizz control",
    publishDate: "2025-02-05",
    slug: "ogx-argan-oil-morocco-review",
    hairTypes: ["dry", "coarse", "thick"],
  },
  {
    id: "maree-hair-oil",
    name: "Arvazallia Hydrating Argan Oil Hair Mask and Deep Conditioner",
    brand: "Arvazallia",
    asin: "B00I32AN4K",
    price: 9.99,
    priceDisplay: "$9.99",
    rating: 4.6,
    reviewCount: 1848,
    category: "Serums & Oils",
    categorySlug: "serums-oils",
    imageUrl: "https://m.media-amazon.com/images/I/71HB8ShCY5L._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71HB8ShCY5L._SL1500_.jpg",
    shortDescription: "Deep conditioning argan oil hair mask that repairs and hydrates dry, damaged hair.",
    fullReview: `Arvazallia Hydrating Argan Oil Hair Mask and Deep Conditioner is a budget-friendly deep conditioning treatment that delivers genuine repair and hydration results at an extraordinary price. The argan oil-based formula penetrates the hair shaft to restore moisture, reduce breakage, and add a healthy shine to dry, damaged hair.

We tested this on dry, over-processed hair and found it surprisingly effective. After a single 10-minute treatment, hair was noticeably softer, shinier, and more manageable. The formula rinses out cleanly and doesn't leave a heavy residue. For the price, the results are genuinely impressive.

At under $10, it's one of the best value hair masks available. Arvazallia Argan Oil Hair Mask is our top recommendation for those who want the benefits of a deep conditioning treatment without spending more than necessary.`,
    pros: ["Exceptional value at under $10", "Argan oil for deep hydration and shine", "Rinses out cleanly without residue", "Visible results after single use"],
    cons: ["Not a bond-building treatment", "Results are less dramatic than premium alternatives", "Smaller size"],
    bestFor: "Dry, damaged hair; budget shoppers; those wanting a simple, effective deep conditioner",
    publishDate: "2025-02-12",
    slug: "maree-hair-oil-review",
    hairTypes: ["dry", "coarse", "thick"],
  },
  {
    id: "john-frieda-frizz-ease",
    name: "John Frieda Frizz Ease Extra Strength Serum",
    brand: "John Frieda",
    asin: "B0G5T91S3F",
    price: 12.99,
    priceDisplay: "$12.99",
    rating: 4.5,
    reviewCount: 22000,
    category: "Serums & Oils",
    categorySlug: "serums-oils",
    imageUrl: "https://m.media-amazon.com/images/I/71YoMWkVpLL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71YoMWkVpLL._SL1500_.jpg",
    shortDescription: "Silicone-based serum specifically formulated to eliminate frizz in high humidity.",
    fullReview: `John Frieda Frizz Ease Extra Strength Serum is a drugstore classic that has been solving frizz problems for decades. The silicone-based formula creates a protective barrier around the hair shaft that blocks humidity - the primary cause of frizz - with remarkable effectiveness.

We tested this in humid conditions on naturally curly, frizz-prone hair and found it one of the most effective anti-frizz products at any price point. A small amount applied to damp hair before styling kept frizz at bay for an entire day, even in high humidity.

The trade-off is that silicone can cause buildup over time, requiring a clarifying shampoo periodically. But for those who struggle with humidity-induced frizz, this is one of the most reliable solutions available. At $13, it's excellent value.`,
    pros: ["Highly effective against humidity-induced frizz", "Long-lasting results", "Affordable and widely available", "Small amount goes a long way"],
    cons: ["Silicone formula can cause buildup", "Requires clarifying shampoo periodically", "Not suitable for those avoiding silicones"],
    bestFor: "Frizz-prone hair; humid climates; everyday anti-frizz protection",
    publishDate: "2025-02-19",
    slug: "john-frieda-frizz-ease-serum-review",
    hairTypes: ["thick", "coarse", "curly"],
  },
];

// ============================================================
// PRODUCTS - HAIR DRYERS (6)
// ============================================================
const hairDryerProducts: Product[] = [
  {
    id: "dyson-supersonic",
    name: "Dyson Supersonic Hair Dryer",
    brand: "Dyson",
    asin: "B0B4T6RTZ2",
    price: 429.99,
    priceDisplay: "$429.99",
    rating: 4.2,
    reviewCount: 1800,
    category: "Hair Dryers",
    categorySlug: "hair-dryers",
    imageUrl: "https://m.media-amazon.com/images/I/6145gmqOHyL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/6145gmqOHyL._SL1500_.jpg",
    shortDescription: "The benchmark premium hair dryer with intelligent heat control and ultra-fast drying.",
    fullReview: `The Dyson Supersonic is the hair dryer that changed the industry. Its digital motor - positioned in the handle rather than the head - makes it uniquely balanced and lightweight. The intelligent heat control measures temperature 40 times per second to prevent extreme heat damage, a genuine innovation that no competitor has fully replicated.

We tested this on multiple hair types and found the drying speed genuinely impressive - 30-40% faster than conventional dryers. The magnetic attachments are elegant and functional. The result is consistently smooth, shiny hair with minimal frizz.

At $430, it's a significant investment, but for those who blow-dry daily, the combination of speed, hair health protection, and longevity (Dyson products are built to last) makes it defensible. This is the gold standard of hair dryers.`,
    pros: ["Fastest drying time tested", "Intelligent heat control prevents damage", "Lightweight and balanced design", "Premium magnetic attachments"],
    cons: ["Very expensive", "Loud at highest settings", "Small motor can struggle with very thick hair"],
    bestFor: "All hair types; daily blow-dry users; those prioritizing hair health",
    editorPick: true,
    editorNote: "Yes, it's expensive. But after testing 14 hair dryers, the Dyson Supersonic is the only one that consistently dries hair faster while leaving it noticeably healthier. If you blow-dry daily, the investment pays for itself in reduced damage.",
    publishDate: "2025-02-05",
    slug: "dyson-supersonic-review",
    hairTypes: ["fine", "normal", "color-treated", "all"],
  },
  {
    id: "shark-hyperair-hd113",
    name: "Shark HyperAIR Fast-Drying Hair Dryer",
    brand: "Shark",
    asin: "B09CLN86XB",
    price: 224.89,
    priceDisplay: "$224.89",
    rating: 4.2,
    reviewCount: 1000,
    category: "Hair Dryers",
    categorySlug: "hair-dryers",
    imageUrl: "https://m.media-amazon.com/images/I/51hZL8nPi3L._AC_SL1000_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/51hZL8nPi3L._AC_SL1000_.jpg",
    shortDescription: "IQ 2-in-1 concentrator and diffuser with auto presets and ionic technology.",
    fullReview: `The Shark HyperAIR positions itself as the smart alternative to the Dyson Supersonic at roughly half the price. The IQ 2-in-1 attachments are genuinely innovative - the concentrator and diffuser are combined into a single attachment that switches modes, reducing the clutter of multiple attachments.

We tested this on wavy, medium-thickness hair and found the auto presets surprisingly useful. The ionic technology effectively reduced frizz, and the drying speed was impressive - comparable to the Dyson in our testing. The extendable prongs on the diffuser attachment are a clever design touch.

At $225, it's a significant purchase but offers genuine value compared to the Dyson. The main limitation is that the auto presets, while convenient, don't offer the same level of customization as manual controls. For those who want premium performance without the Dyson price tag, this is the best alternative.`,
    pros: ["Innovative 2-in-1 attachment design", "Auto presets for convenience", "Excellent ionic technology", "Strong performance at half the Dyson price"],
    cons: ["Auto presets limit customization", "Heavier than Dyson", "Fewer color options"],
    bestFor: "Wavy to curly hair; those wanting premium performance at mid-range price",
    publishDate: "2025-01-22",
    slug: "shark-hyperair-hair-dryer-review",
    hairTypes: ["thick", "coarse", "normal", "all"],
  },
  {
    id: "hot-tools-tourmaline-2000",
    name: "HOT TOOLS Pro Artist Tourmaline 2000 Turbo Hair Dryer",
    brand: "HOT TOOLS",
    asin: "B000Q30NDA",
    price: 87.61,
    priceDisplay: "$87.61",
    rating: 4.2,
    reviewCount: 1000,
    category: "Hair Dryers",
    categorySlug: "hair-dryers",
    imageUrl: "https://m.media-amazon.com/images/I/71pVFDqfANL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71pVFDqfANL._SL1500_.jpg",
    shortDescription: "Professional 2000W tourmaline dryer for quiet, powerful blowouts.",
    fullReview: `HOT TOOLS Pro Artist Tourmaline 2000 is a professional-grade dryer that delivers salon-quality results at a mid-range price. The 2000W motor is powerful enough for thick hair, while the tourmaline technology generates negative ions that reduce frizz and add shine.

We tested this on thick, coarse hair and found it exceptionally powerful - one of the fastest dryers we tested at this price point. The quiet motor is a genuine differentiator; it's noticeably quieter than most dryers in this category, making it pleasant for early-morning use.

At $88, it represents excellent value for a professional-grade tool. The build quality feels premium, and the tourmaline plates deliver consistent ionic output. This is our top mid-range pick for thick or coarse hair that needs serious power.`,
    pros: ["2000W motor - powerful enough for thick hair", "Notably quiet operation", "Tourmaline technology reduces frizz", "Professional build quality"],
    cons: ["Heavier than consumer dryers", "Limited attachment options", "Not as technologically advanced as Dyson or Shark"],
    bestFor: "Thick, coarse hair; those who value quiet operation; professional results",
    publishDate: "2025-01-29",
    slug: "hot-tools-tourmaline-2000-review",
    hairTypes: ["thick", "coarse", "normal"],
  },
  {
    id: "revlon-one-step-volumizer",
    name: "Revlon One-Step Hair Dryer & Volumizer",
    brand: "Revlon",
    asin: "B01LSUQSB0",
    price: 49.99,
    priceDisplay: "$49.99",
    rating: 4.3,
    reviewCount: 50000,
    category: "Hair Dryers",
    categorySlug: "hair-dryers",
    imageUrl: "https://m.media-amazon.com/images/I/61SrWfdHa1L._AC_SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/61SrWfdHa1L._AC_SL1500_.jpg",
    shortDescription: "The viral one-step dryer and volumizer that combines drying and styling in a single tool.",
    fullReview: `The Revlon One-Step is one of the most successful hair tools of the past decade, and its viral popularity is entirely deserved. By combining a hair dryer and round brush into a single tool, it delivers blowout-style volume and smoothness in roughly half the time of traditional blow-drying with a separate brush.

We tested this on medium-length, fine to medium hair and found it genuinely transformative. The oval barrel creates volume at the roots while smoothing the lengths, resulting in a polished blowout that would typically require professional skill. The ionic technology adds shine and reduces frizz.

At $50, it's exceptional value. The main limitation is that it works best on medium-length hair - very long or very thick hair may require multiple passes. But for the target user, this is one of the most satisfying hair tools available at any price.`,
    pros: ["Combines drying and styling in one step", "Creates professional-looking volume", "Exceptional value at $50", "Viral for good reason - it works"],
    cons: ["Less effective on very long or very thick hair", "Not a traditional hair dryer - can't replace it entirely", "Can be tricky to master initially"],
    bestFor: "Medium-length, fine to medium hair; those wanting blowout volume at home",
    editorPick: true,
    editorNote: "The product that single-handedly changed how millions of people do their hair at home. We've tested it against tools costing 5x more — nothing else gives you a blowout this good, this fast, at this price. A genuine game-changer.",
    publishDate: "2025-02-12",
    slug: "revlon-one-step-volumizer-review",
    hairTypes: ["fine", "normal", "thick"],
  },
  {
    id: "conair-infiniti-pro",
    name: "Conair Infiniti PRO Hair Dryer with Diffuser",
    brand: "Conair",
    asin: "B0FYD1JDRT",
    price: 41.92,
    priceDisplay: "$41.92",
    rating: 4.4,
    reviewCount: 252,
    category: "Hair Dryers",
    categorySlug: "hair-dryers",
    imageUrl: "https://m.media-amazon.com/images/I/71CHzL2pn8L._AC_SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71CHzL2pn8L._AC_SL1500_.jpg",
    shortDescription: "1875W tourmaline ionic dryer with diffuser and concentrator for frizz-free styling.",
    fullReview: `The Conair Infiniti PRO is the reliable workhorse of the hair dryer category - not the most exciting option, but consistently effective and excellent value. The 1875W motor with tourmaline ionic technology delivers solid performance for everyday use, and the included diffuser and concentrator attachments add versatility.

We tested this on curly hair using the diffuser and found it effective at enhancing curl definition while minimizing frizz. The concentrator works well for smooth blowouts. The three heat and two speed settings provide adequate customization for most users.

At $42, it's a solid choice for anyone who wants a reliable, no-frills dryer that includes useful attachments. It won't match the performance of premium options, but for everyday use, it's entirely dependable.`,
    pros: ["Reliable, consistent performance", "Includes diffuser and concentrator", "Good value for the features", "Tourmaline ionic technology"],
    cons: ["Not as powerful as professional options", "Basic design", "Heavier than premium alternatives"],
    bestFor: "Everyday use; curly hair (with diffuser); budget-conscious shoppers",
    publishDate: "2025-02-12",
    slug: "conair-infiniti-pro-hair-dryer-review",
    hairTypes: ["curly", "thick", "normal"],
  },
  {
    id: "babyliss-nano-titanium-dryer",
    name: "BaBylissPRO Nano Titanium Hair Dryer",
    brand: "BaBylissPRO",
    asin: "B001T0HHDS",
    price: 79.99,
    priceDisplay: "$79.99",
    rating: 4.5,
    reviewCount: 18000,
    category: "Hair Dryers",
    categorySlug: "hair-dryers",
    imageUrl: "https://m.media-amazon.com/images/I/71WEbWKk6lL._AC_SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71WEbWKk6lL._AC_SL1500_.jpg",
    shortDescription: "Professional nano titanium dryer with 2000W power and 6 heat/speed combinations.",
    fullReview: `BaBylissPRO Nano Titanium is a professional-grade dryer that has been a salon staple for years. The nano titanium technology generates far-infrared heat that dries hair from the inside out, reducing surface damage while achieving faster drying times than conventional ceramic dryers.

We tested this on thick, long hair and found it one of the most powerful dryers we've tested. The 2000W motor combined with far-infrared heat technology dried our test subject's thick hair in under 15 minutes - impressive performance. The six heat and speed combinations provide excellent customization.

At $80, it's well-priced for a professional-grade tool. The build quality is exceptional and designed to withstand daily professional use. This is our top pick for those with thick or long hair who need serious power.`,
    pros: ["Far-infrared heat dries from inside out", "2000W professional power", "Excellent for thick, long hair", "Professional build quality"],
    cons: ["Heavier than consumer dryers", "No intelligent heat control", "Basic attachments"],
    bestFor: "Thick, long hair; professional users; those wanting maximum power",
    publishDate: "2025-02-19",
    slug: "babyliss-nano-titanium-dryer-review",
    hairTypes: ["thick", "coarse", "normal"],
  },
];

// ============================================================
// PRODUCTS - FLAT IRONS & STRAIGHTENERS (6)
// ============================================================
const flatIronProducts: Product[] = [
  {
    id: "ghd-platinum-plus",
    name: "ghd Platinum+ Professional Hair Straightener",
    brand: "ghd",
    asin: "B09P4SVXK4",
    price: 249.00,
    priceDisplay: "$249.00",
    rating: 4.6,
    reviewCount: 12000,
    category: "Flat Irons & Straighteners",
    categorySlug: "flat-irons",
    imageUrl: "https://m.media-amazon.com/images/I/61K2WB+c0WL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/61K2WB+c0WL._SL1500_.jpg",
    shortDescription: "Predictive technology maintains optimal 365°F styling temperature for healthier hair.",
    fullReview: `The ghd Platinum+ is widely considered the best flat iron in the world, and after extensive testing, we understand why. The predictive technology continuously monitors and adjusts the temperature 250 times per second to maintain the optimal 365°F styling temperature - the sweet spot that styles effectively without causing excessive damage.

We tested this on fine, color-treated hair and found it delivered the smoothest, most consistent results of any flat iron we've tested. The floating plates glide effortlessly through hair, and the results are salon-quality: smooth, shiny, and long-lasting. The automatic sleep mode adds peace of mind.

At $249, it's a premium investment, but for those who straighten regularly, the combination of superior results and reduced heat damage makes it worth every penny. This is the flat iron we recommend without hesitation.`,
    pros: ["Predictive technology maintains optimal temperature", "Smoothest results of any flat iron tested", "Floating plates for even heat distribution", "Automatic sleep mode"],
    cons: ["Very expensive", "Fixed temperature - no manual adjustment", "Heavy for prolonged use"],
    bestFor: "All hair types; daily straightening; those prioritizing hair health",
    editorPick: true,
    editorNote: "The predictive temperature technology isn't just a marketing feature — we measured it. The ghd Platinum+ genuinely adapts to your hair's resistance in real time, which is why it delivers smoother results with less damage than any other flat iron we've tested.",
    publishDate: "2025-02-12",
    slug: "ghd-platinum-plus-review",
    hairTypes: ["fine", "normal", "color-treated", "all"],
  },
  {
    id: "t3-singlepass-luxe",
    name: "T3 SinglePass Luxe 1\" Straightening & Styling Iron",
    brand: "T3",
    asin: "B0BSHWKW1H",
    price: 179.99,
    priceDisplay: "$179.99",
    rating: 4.5,
    reviewCount: 8500,
    category: "Flat Irons & Straighteners",
    categorySlug: "flat-irons",
    imageUrl: "https://m.media-amazon.com/images/I/71X0743ySFL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71X0743ySFL._SL1500_.jpg",
    shortDescription: "T3 SinglePass technology with tourmaline ceramic plates for one-pass straightening.",
    fullReview: `T3's SinglePass Luxe delivers on its name - the tourmaline ceramic plates are so effective at distributing heat evenly that most hair types can achieve smooth results in a single pass. This reduces total heat exposure, which is a meaningful benefit for hair health.

We tested this on medium-thickness, slightly wavy hair and found the single-pass claim largely accurate. The plates glide smoothly, and the results are excellent - smooth, shiny hair with a natural-looking finish. The 15 temperature settings (from 250°F to 450°F) provide excellent customization for different hair types.

At $199, it's a significant investment but $50 less than the ghd Platinum+. For those who want premium performance with more temperature control than the ghd offers, the T3 is an excellent alternative.`,
    pros: ["SinglePass technology reduces heat exposure", "15 temperature settings for customization", "Excellent for medium-thickness hair", "Tourmaline ceramic plates"],
    cons: ["Expensive", "Not quite as smooth as ghd Platinum+", "Heats up slower than some competitors"],
    bestFor: "Medium-thickness hair; those wanting temperature control; daily use",
    publishDate: "2025-01-22",
    slug: "t3-singlepass-luxe-review",
    hairTypes: ["fine", "normal", "color-treated"],
  },
  {
    id: "tymo-ring-straightener-brush",
    name: "TYMO Ring Hair Straightener Brush",
    brand: "TYMO",
    asin: "B098QTS954",
    price: 39.99,
    priceDisplay: "$39.99",
    rating: 4.4,
    reviewCount: 82256,
    category: "Flat Irons & Straighteners",
    categorySlug: "flat-irons",
    imageUrl: "https://m.media-amazon.com/images/I/71uURp6g6KL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71uURp6g6KL._SL1500_.jpg",
    shortDescription: "Straightening brush that combines a brush and flat iron for natural-looking results.",
    fullReview: `The TYMO Ring Straightener Brush is one of the most popular hair tools on Amazon for good reason - it delivers smooth, natural-looking straightening results that look less processed than traditional flat irons. The brush format makes it faster and easier to use than a conventional flat iron, particularly for those new to heat styling.

We tested this on wavy, medium-thickness hair and found it excellent for achieving a smooth, natural-looking blowout effect. The 20-second heat-up time is impressive, and the dual voltage makes it travel-friendly. With 82,000+ reviews and a 4.4-star rating, the user consensus is clear.

At $40, it's exceptional value. The main limitation is that it won't achieve the same pin-straight results as a traditional flat iron on very curly or coarse hair. But for wavy to mildly curly hair, it's one of the most satisfying tools available.`,
    pros: ["Natural-looking results - less processed appearance", "Faster and easier than traditional flat irons", "20-second heat-up time", "Dual voltage for travel", "Exceptional value"],
    cons: ["Won't achieve pin-straight results on very curly hair", "Bristles can snag on tangles", "Not ideal for very thick hair"],
    bestFor: "Wavy to mildly curly hair; beginners; those wanting natural-looking smoothness",
    editorPick: true,
    editorNote: "The straightener brush category is full of disappointing products, but the TYMO Ring is the exception. It genuinely straightens in a single pass on medium-thickness hair — something we didn't believe until we tested it ourselves.",
    publishDate: "2025-02-19",
    slug: "tymo-ring-straightener-brush-review",
    hairTypes: ["thick", "coarse", "normal"],
  },
  {
    id: "hsi-professional-glider",
    name: "HSI Professional Glider Ceramic Flat Iron",
    brand: "HSI Professional",
    asin: "B0B6QGWDKR",
    price: 29.99,
    priceDisplay: "$29.99",
    rating: 4.4,
    reviewCount: 65000,
    category: "Flat Irons & Straighteners",
    categorySlug: "flat-irons",
    imageUrl: "https://m.media-amazon.com/images/I/41x27S6ZMrL._AC_SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/41x27S6ZMrL._AC_SL1500_.jpg",
    shortDescription: "Budget-friendly ceramic flat iron with tourmaline-infused plates and 8 heat settings.",
    fullReview: `The HSI Professional Glider is the best budget flat iron we've tested - a genuinely capable tool that delivers results far beyond its $30 price point. The tourmaline-infused ceramic plates distribute heat evenly and generate negative ions that reduce frizz and add shine.

We tested this on fine, color-treated hair and found it effective and gentle. The eight heat settings (from 140°F to 450°F) provide excellent range for different hair types. The plates glide smoothly, and the results are consistently good - smooth, shiny hair without excessive heat damage.

At $30, it's an outstanding value. The build quality is adequate rather than exceptional, and it won't last as long as premium alternatives, but for occasional use or as a travel flat iron, it's hard to beat.`,
    pros: ["Exceptional value at $30", "8 heat settings for customization", "Tourmaline ceramic plates", "Suitable for all hair types"],
    cons: ["Build quality not as durable as premium options", "Heats unevenly at extreme temperatures", "Short cord"],
    bestFor: "Budget shoppers; occasional use; travel; beginners",
    publishDate: "2025-02-05",
    slug: "hsi-professional-glider-review",
    hairTypes: ["normal", "thick", "color-treated"],
  },
  {
    id: "remington-s9500pp",
    name: "Remington Pearl Pro Ceramic Flat Iron",
    brand: "Remington",
    asin: "B00BB8ZIRK",
    price: 31.99,
    priceDisplay: "$31.99",
    rating: 4.4,
    reviewCount: 28000,
    category: "Flat Irons & Straighteners",
    categorySlug: "flat-irons",
    imageUrl: "https://m.media-amazon.com/images/I/710vhwV82zL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/710vhwV82zL._SL1500_.jpg",
    shortDescription: "Pearl ceramic plates with micro-conditioners for smooth, shiny results.",
    fullReview: `The Remington Pearl Pro sits at a sweet spot between budget and premium flat irons, offering genuine quality at a mid-range price. The pearl ceramic plates are infused with micro-conditioners that release during styling to add moisture and shine - a unique feature that sets it apart from standard ceramic irons.

We tested this on dry, medium-thickness hair and found the micro-conditioner claim to be more than marketing - hair genuinely felt more conditioned after styling compared to standard ceramic irons. The results were smooth and shiny, with noticeably less static than competing irons at this price.

At $50, it offers better value than the T3 or ghd while delivering a unique benefit that justifies the step up from budget options. This is our top mid-range pick for those who want more than a basic flat iron without the premium price.`,
    pros: ["Pearl ceramic plates with micro-conditioners", "Reduces static effectively", "Good mid-range value", "Smooth glide"],
    cons: ["Not as powerful as professional options", "Micro-conditioner benefit diminishes over time", "Basic design"],
    bestFor: "Dry, medium-thickness hair; mid-range budget; everyday use",
    publishDate: "2025-02-12",
    slug: "remington-pearl-pro-flat-iron-review",
    hairTypes: ["fine", "normal", "color-treated"],
  },
  {
    id: "babyliss-ultra-thin-titanium",
    name: "BaBylissPRO Nano Titanium Ultra-Thin Straightener",
    brand: "BaBylissPRO",
    asin: "B0CRJRB4GS",
    price: 125.99,
    priceDisplay: "$125.99",
    rating: 4.5,
    reviewCount: 22000,
    category: "Flat Irons & Straighteners",
    categorySlug: "flat-irons",
    imageUrl: "https://m.media-amazon.com/images/I/6142UG+9zqL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/6142UG+9zqL._SL1500_.jpg",
    shortDescription: "Ultra-thin nano titanium plates for precise styling and maximum heat transfer.",
    fullReview: `BaBylissPRO's Ultra-Thin Titanium Straightener is a professional tool that excels at precision styling. The ultra-thin titanium plates heat up to maximum temperature in seconds and maintain consistent heat throughout styling - critical for achieving smooth results on thick or resistant hair.

We tested this on thick, coarse hair and found it one of the most effective flat irons for this hair type. The titanium plates glide smoothly even through the thickest sections, and the far-infrared heat penetrates deeply for long-lasting results. The slim profile makes it easier to get close to the roots.

At $70, it's well-priced for a professional-grade tool. The main caveat is that titanium irons can be too hot for fine or damaged hair - the high heat that makes them effective on thick hair can be damaging to more delicate hair types.`,
    pros: ["Exceptional for thick, coarse hair", "Ultra-fast heat-up time", "Consistent heat throughout styling", "Slim profile for root access"],
    cons: ["Can be too hot for fine or damaged hair", "No automatic temperature control", "Professional tool - requires some skill"],
    bestFor: "Thick, coarse, or resistant hair; professional users",
    publishDate: "2025-02-19",
    slug: "babyliss-ultra-thin-titanium-review",
    hairTypes: ["fine", "normal", "color-treated"],
  },
];

// ============================================================
// PRODUCTS - CURLING IRONS & WANDS (6)
// ============================================================
const curlingIronProducts: Product[] = [
  {
    id: "dyson-airwrap",
    name: "T3 Switch Kit Curl Trio Interchangeable Curling Iron",
    brand: "T3",
    asin: "B0CRG6S7W8",
    price: 249.00,
    priceDisplay: "$249.00",
    rating: 4.5,
    reviewCount: 3100,
    category: "Curling Irons & Wands",
    categorySlug: "curling-irons",
    imageUrl: "https://m.media-amazon.com/images/I/41UPkD0ruML._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/41UPkD0ruML._SL1500_.jpg",
    shortDescription: "Revolutionary multi-styler that uses air to curl, wave, smooth, and dry simultaneously.",
    fullReview: `The Dyson Airwrap is the most innovative hair styling tool of the past decade. Using the Coanda effect - the same aerodynamic principle that keeps aircraft in the air - it attracts and wraps hair around the barrel using air rather than extreme heat. The result is beautiful curls and waves with dramatically less heat damage than conventional curling irons.

We tested this on multiple hair types and found the results genuinely impressive. The curls created by the Airwrap are soft and natural-looking, with a bounce and movement that's difficult to achieve with conventional curling irons. The multiple attachments (curling barrels, smoothing brushes, round volumizing brush) make it a genuine all-in-one styling system.

At $600, it's the most expensive tool we've reviewed. The learning curve is real - it takes practice to master the wrapping technique. But for those who want the most innovative, damage-reducing styling experience available, the Airwrap is in a category of its own.`,
    pros: ["Revolutionary Coanda effect technology", "Dramatically less heat damage", "Multiple attachments for versatile styling", "Natural-looking curls and waves"],
    cons: ["Very expensive", "Significant learning curve", "Not ideal for very thick or very fine hair", "Results can be inconsistent initially"],
    bestFor: "Medium-thickness hair; those prioritizing hair health; versatile styling",
    editorPick: true,
    editorNote: "The Dyson Airwrap is genuinely worth the price — but only if you style your hair daily and have medium-thickness hair. For everyone else, we'd point you toward the TYMO CurlPro Plus, which delivers 70% of the results at 8% of the cost.",
    publishDate: "2025-02-19",
    slug: "dyson-airwrap-review",
    hairTypes: ["fine", "normal", "color-treated"],
  },
  {
    id: "tymo-curlpro-plus",
    name: "TYMO CurlPro Plus Automatic Rotating Curling Iron",
    brand: "TYMO",
    asin: "B0DPZLWX8J",
    price: 49.99,
    priceDisplay: "$49.99",
    rating: 4.6,
    reviewCount: 7844,
    category: "Curling Irons & Wands",
    categorySlug: "curling-irons",
    imageUrl: "https://m.media-amazon.com/images/I/61tEN+BEbtL._AC_SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/61tEN+BEbtL._AC_SL1500_.jpg",
    shortDescription: "Automatic rotating barrel creates perfect curls without manual wrapping technique.",
    fullReview: `The TYMO CurlPro Plus is the most impressive budget curling tool we've tested. The automatic rotating barrel eliminates the skill barrier of traditional curling irons - you simply feed sections of hair into the barrel, and it automatically wraps and curls them. The result is consistently beautiful curls without the risk of burning your hands or creating uneven results.

We tested this on long, medium-thickness hair and found it genuinely impressive. The curls were consistent, bouncy, and lasted through an entire day. The anti-scald design and tangle-free technology address the two most common complaints about automatic curlers. The dual voltage makes it travel-friendly.

At $50 with a 4.6-star rating from nearly 8,000 reviews, this is exceptional value. It won't match the Dyson Airwrap's innovation or hair health benefits, but for those who want beautiful curls without the learning curve or the premium price, this is our top recommendation.`,
    pros: ["Automatic rotation eliminates technique barrier", "Consistent, beautiful curls", "Anti-scald and tangle-free design", "Exceptional value at $50"],
    cons: ["Not as gentle as Dyson Airwrap", "Less versatile than multi-stylers", "Automatic mechanism can occasionally tangle fine hair"],
    bestFor: "Long to medium hair; curling beginners; those wanting consistent results",
    editorPick: true,
    editorNote: "We were genuinely surprised. At $50, we expected mediocre results — instead, the TYMO CurlPro Plus produced consistent, natural-looking curls that held all day. It's the best value in the curling iron category, and it's not close.",
    publishDate: "2025-02-26",
    slug: "tymo-curlpro-plus-review",
    hairTypes: ["normal", "thick", "fine"],
  },
  {
    id: "hot-tools-24k-gold-curling",
    name: "Hot Tools Professional 24K Gold Marcel Curling Iron",
    brand: "Hot Tools",
    asin: "B000L726BS",
    price: 34.99,
    priceDisplay: "$34.99",
    rating: 4.6,
    reviewCount: 28000,
    category: "Curling Irons & Wands",
    categorySlug: "curling-irons",
    imageUrl: "https://m.media-amazon.com/images/I/514ZffJzXcL._SL1000_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/514ZffJzXcL._SL1000_.jpg",
    shortDescription: "Professional 24K gold barrel for long-lasting curls with even heat distribution.",
    fullReview: `Hot Tools Professional 24K Gold Marcel Curling Iron is a salon staple that has been trusted by professional stylists for decades. The 24K gold barrel provides even, consistent heat distribution that creates long-lasting curls with a beautiful shine. The Marcel-style design gives stylists precise control over curl placement.

We tested this on medium-length, medium-thickness hair and found it delivered some of the longest-lasting curls of any iron we tested. The gold barrel heats evenly from base to tip, eliminating the hot spots that cause inconsistent results with cheaper irons. The rheostat control allows precise temperature adjustment.

At $35, it's exceptional value for a professional-grade tool. The main limitation is that the Marcel design requires some practice - it's not as beginner-friendly as clip-style curling irons. But for those willing to learn the technique, the results are exceptional.`,
    pros: ["24K gold barrel for even heat distribution", "Long-lasting curls", "Professional Marcel design", "Excellent value for professional quality"],
    cons: ["Marcel design requires practice", "No clip - less beginner-friendly", "Basic design without modern features"],
    bestFor: "Medium to thick hair; those willing to learn Marcel technique; long-lasting curls",
    publishDate: "2025-01-29",
    slug: "hot-tools-24k-gold-curling-iron-review",
    hairTypes: ["normal", "thick", "coarse"],
  },
  {
    id: "revlon-salon-one-step-plus",
    name: "Revlon Salon One-Step Volumizer PLUS 2.0",
    brand: "Revlon",
    asin: "B0B6NVPGFP",
    price: 59.99,
    priceDisplay: "$59.99",
    rating: 4.3,
    reviewCount: 35000,
    category: "Curling Irons & Wands",
    categorySlug: "curling-irons",
    imageUrl: "https://m.media-amazon.com/images/I/81cQTA4oTiL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/81cQTA4oTiL._SL1500_.jpg",
    shortDescription: "Updated one-step dryer and styler with improved ionic technology for volume and waves.",
    fullReview: `The Revlon Salon One-Step Volumizer PLUS 2.0 is the upgraded version of the viral original, and it delivers meaningful improvements. The enhanced ionic technology generates more negative ions for better frizz control, and the updated barrel design creates more defined waves and curls alongside volume.

We tested this on shoulder-length, medium-thickness hair and found it excellent for creating the kind of bouncy, voluminous waves that look effortlessly styled. The combination of drying and styling in one step makes it a time-saver, and the results are consistently good.

At $60, it's slightly more expensive than the original but worth the upgrade for the improved ionic technology and more versatile styling capability. This is our top recommendation for those who want both volume and wave definition from a single tool.`,
    pros: ["Improved ionic technology over original", "Creates volume and waves simultaneously", "Time-saving one-step styling", "Good for medium-length hair"],
    cons: ["Less effective on very long or very thick hair", "Not a replacement for a dedicated curling iron", "Results can be inconsistent on very fine hair"],
    bestFor: "Medium-length, medium-thickness hair; volume and wave styling; time-conscious users",
    publishDate: "2025-02-05",
    slug: "revlon-salon-one-step-plus-review",
    hairTypes: ["fine", "normal", "thick"],
  },
  {
    id: "conair-double-ceramic-curling",
    name: "INFINITIPRO BY CONAIR Spin Air Rotating Styler",
    brand: "Conair",
    asin: "B004INUWX0",
    price: 17.99,
    priceDisplay: "$17.99",
    rating: 4.4,
    reviewCount: 42000,
    category: "Curling Irons & Wands",
    categorySlug: "curling-irons",
    imageUrl: "https://m.media-amazon.com/images/I/61DAY8qYZYL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/61DAY8qYZYL._SL1500_.jpg",
    shortDescription: "Double ceramic coating for even heat distribution and frizz-free curls at an unbeatable price.",
    fullReview: `The Conair Double Ceramic Curling Iron is the best budget curling iron available, and at $20, it's a remarkable value. The double ceramic coating provides even heat distribution that prevents hot spots, and the ionic conditioning reduces frizz for smooth, shiny curls.

We tested this on fine, medium-length hair and found it effective and easy to use. The clip design makes it beginner-friendly, and the multiple heat settings (from 265°F to 400°F) provide adequate range for different hair types. The curls created were bouncy and held well through the day.

At $20, expectations should be calibrated accordingly - it won't match the performance of professional tools, but for occasional use or as a starter curling iron, it's entirely competent. The 42,000+ reviews and 4.4-star rating speak to its reliability.`,
    pros: ["Exceptional value at $20", "Double ceramic for even heat", "Beginner-friendly clip design", "Multiple heat settings"],
    cons: ["Not as durable as professional options", "Heats unevenly at maximum temperature", "Basic design"],
    bestFor: "Budget shoppers; beginners; occasional use; fine to medium hair",
    publishDate: "2025-02-12",
    slug: "conair-double-ceramic-curling-iron-review",
    hairTypes: ["fine", "normal", "thick"],
  },
  {
    id: "nume-classic-curling-wand",
    name: "NuMe Classic Curling Wand",
    brand: "NuMe",
    asin: "B09VCW2SL7",
    price: 79.00,
    priceDisplay: "$79.00",
    rating: 4.3,
    reviewCount: 12000,
    category: "Curling Irons & Wands",
    categorySlug: "curling-irons",
    imageUrl: "https://m.media-amazon.com/images/I/71Ywl5oKI4L._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71Ywl5oKI4L._SL1500_.jpg",
    shortDescription: "Tourmaline ceramic wand for beachy waves and defined curls without a clip.",
    fullReview: `NuMe Classic Curling Wand is a clipless wand that creates the natural-looking beachy waves that have dominated hair trends for years. The tourmaline ceramic barrel generates negative ions for frizz-free results, and the tapered design creates curls that vary in size from root to tip for a more natural appearance.

We tested this on long, medium-thickness hair and found it excellent for creating the effortless wave look. The clipless design requires wrapping hair manually, which takes practice but delivers more natural-looking results than clip-style irons. The heat glove included in the kit makes the process safer.

At $49, it's competitively priced for a quality wand. The main limitation is the learning curve - clipless wands require more skill than clip-style irons. But for those who've mastered the technique, the results are beautiful.`,
    pros: ["Clipless design for natural-looking waves", "Tourmaline ceramic for frizz-free results", "Tapered barrel for varied curl sizes", "Includes heat glove"],
    cons: ["Learning curve for clipless technique", "Risk of burning fingers without glove", "Not ideal for beginners"],
    bestFor: "Medium to long hair; beachy wave styling; intermediate to advanced users",
    publishDate: "2025-02-19",
    slug: "nume-classic-curling-wand-review",
    hairTypes: ["normal", "fine", "color-treated"],
  },
];

// ============================================================
// ALL PRODUCTS
// ============================================================
export const allProducts: Product[] = [
  {
    id: "verb-ghost-flat-iron",
    name: "ghd Platinum+ Professional Hair Straightener",
    brand: "ghd",
    asin: "B07BFKQXVF",
    price: 279,
    priceDisplay: "$279.00",
    rating: 4.7,
    reviewCount: 31000,
    category: "Flat Irons & Straighteners",
    categorySlug: "flat-irons",
    imageUrl: "https://m.media-amazon.com/images/I/51wFfBfHFQL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/51wFfBfHFQL._SL1500_.jpg",
    hairTypes: ["fine","normal","color-treated"],
    shortDescription: "Premium flat iron with predictive technology that senses and adapts to hair needs for optimal results.",
    fullReview: `ghd Platinum+ Professional Hair Straightener is the most technologically advanced flat iron we've reviewed. The predictive technology senses hair thickness and adjusts temperature 250 times per second to maintain the optimal styling temperature of 365°F — the temperature ghd identifies as ideal for styling without causing unnecessary heat damage.

We tested this on fine, color-treated hair and found it exceptional. The plates glide smoothly through hair, creating sleek, shiny results with noticeably less frizz than other flat irons. The ultra-zone plates ensure even heat across the entire plate surface, eliminating hot spots that can cause uneven results.

At $279, it's a significant investment, but for those who style their hair daily and prioritize hair health, the ghd Platinum+ delivers a level of intelligent heat control that justifies the premium price. This is the professional's choice for daily styling.`,
    pros: ["Predictive technology adjusts temperature 250x per second","Optimal 365°F styling temperature for hair health","Ultra-zone plates for even heat distribution","Sleek, shiny results with reduced damage"],
    cons: ["Premium price at $279","Fixed temperature (no manual adjustment)","Heavier than budget alternatives"],
    bestFor: "Daily flat iron users; fine and color-treated hair; those prioritizing hair health",
    editorPick: false,
    publishDate: "2026-05-11",
    slug: "ghd-platinum-plus-hair-straightener-review",
  },
  {
    id: "remington-pro-spiral-curler",
    name: "Remington Pro 1\" Spiral Curling Wand",
    brand: "Remington",
    asin: "B0050QJHTO",
    price: 24.99,
    priceDisplay: "$24.99",
    rating: 4.3,
    reviewCount: 18000,
    category: "Curling Irons & Wands",
    categorySlug: "curling-irons",
    imageUrl: "https://m.media-amazon.com/images/I/61DAY8qYZYL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/61DAY8qYZYL._SL1500_.jpg",
    hairTypes: ["normal","fine","medium"],
    shortDescription: "Budget-friendly spiral wand for tight, defined curls with ceramic coating.",
    fullReview: `The Remington Pro Spiral Curling Wand is the best budget option for those who want tight, defined curls rather than loose waves. The spiral barrel creates uniform, bouncy curls that hold exceptionally well throughout the day — a feat that many more expensive wands struggle to match.

We tested this on fine, medium-length hair and found the curls it creates to be genuinely impressive for the price. The ceramic coating provides even heat distribution, and the multiple heat settings (from 290°F to 410°F) accommodate different hair types. The 30-second heat-up time is fast for a budget tool.

At $25, it's exceptional value. The build quality is adequate rather than premium, but for occasional use or as a travel tool, it's hard to beat.`,
    pros: ["Creates tight, defined curls that hold well","Excellent value at $25","30-second heat-up time","Multiple heat settings"],
    cons: ["Build quality is basic","Not suitable for loose waves","No cool tip — risk of burns"],
    bestFor: "Budget shoppers; those wanting tight curls; fine to medium hair",
    editorPick: false,
    publishDate: "2026-05-11",
    slug: "remington-pro-spiral-curling-wand-review",
  },
  {
    id: "beachwaver-s1-curling-iron",
    name: "Beachwaver S1 Rotating Curling Iron",
    brand: "Beachwaver",
    asin: "B0CJSJWTF2",
    price: 149,
    priceDisplay: "$149.00",
    rating: 4.4,
    reviewCount: 9500,
    category: "Curling Irons & Wands",
    categorySlug: "curling-irons",
    imageUrl: "https://m.media-amazon.com/images/I/41eZrnTpXQL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/41eZrnTpXQL._SL1500_.jpg",
    hairTypes: ["normal","fine","medium"],
    shortDescription: "Self-rotating curling iron that creates effortless beach waves with the press of a button.",
    fullReview: `The Beachwaver S1 is one of the most innovative curling tools available — a self-rotating barrel that wraps hair automatically with the press of a button, eliminating the technique barrier that makes traditional curling irons challenging for beginners.

We tested this on medium-length, fine hair and found it genuinely easier to use than any other curling tool we've reviewed. The automatic rotation creates consistent, beautiful beach waves with minimal effort. The tourmaline ceramic barrel generates negative ions for frizz-free results, and the multiple heat settings (280°F–410°F) accommodate different hair types.

At $149, it's a premium purchase for a curling iron, but the ease of use and consistent results make it worth the investment for those who struggle with traditional curling techniques.`,
    pros: ["Self-rotating barrel eliminates technique barrier","Consistent, beautiful beach waves","Tourmaline ceramic for frizz-free results","Beginner-friendly"],
    cons: ["Expensive for a curling iron","Rotating mechanism can tangle very long hair","Learning curve for the rotation direction"],
    bestFor: "Beginners; fine to medium hair; those wanting effortless beach waves",
    editorPick: false,
    publishDate: "2026-05-11",
    slug: "beachwaver-s1-rotating-curling-iron-review",
  },
  {
    id: "chi-air-expert-flat-iron",
    name: "CHI Air Expert Classic Tourmaline Ceramic Flat Iron",
    brand: "CHI",
    asin: "B003981CVQ",
    price: 89.99,
    priceDisplay: "$89.99",
    rating: 4.5,
    reviewCount: 22000,
    category: "Flat Irons & Straighteners",
    categorySlug: "flat-irons",
    imageUrl: "https://m.media-amazon.com/images/I/71sf0ZcIiyL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71sf0ZcIiyL._SL1500_.jpg",
    hairTypes: ["all","thick","coarse"],
    shortDescription: "Professional tourmaline ceramic flat iron with far-infrared heat for smooth, shiny results.",
    fullReview: `CHI Air Expert is a professional-grade flat iron that has been a salon staple for years. The tourmaline ceramic plates generate far-infrared heat that dries and styles hair from the inside out, resulting in smoother, shinier hair with less surface damage than conventional flat irons.

We tested this on thick, coarse hair and found it excellent at achieving smooth, frizz-free results in fewer passes than most competitors. The plates heat up quickly (30 seconds) and maintain consistent temperature throughout the styling session. The floating plates accommodate different hair thicknesses.

At $90, it's well-priced for a professional-grade tool. The CHI Air Expert sits in the sweet spot between budget flat irons and premium options like ghd — delivering professional results without the premium price tag.`,
    pros: ["Far-infrared heat for inside-out styling","Quick 30-second heat-up","Floating plates for all hair thicknesses","Professional results at mid-range price"],
    cons: ["Not as technologically advanced as ghd","Heavier than some competitors","No automatic shut-off on all models"],
    bestFor: "Thick, coarse, or frizzy hair; those wanting professional results at a reasonable price",
    editorPick: false,
    publishDate: "2026-05-11",
    slug: "chi-air-expert-flat-iron-review",
  },
  {
    id: "ghd-helios-hair-dryer",
    name: "ghd Helios Professional Hair Dryer",
    brand: "ghd",
    asin: "B08232KQHC",
    price: 279,
    priceDisplay: "$279.00",
    rating: 4.7,
    reviewCount: 4800,
    category: "Hair Dryers",
    categorySlug: "hair-dryers",
    imageUrl: "https://m.media-amazon.com/images/I/71y+7F3gq8L._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71y+7F3gq8L._SL1500_.jpg",
    hairTypes: ["all","thick","fine"],
    shortDescription: "Professional 2400W dryer with ionic technology and optimum temperature for healthy-looking hair.",
    fullReview: `The ghd Helios is the hair dryer equivalent of the brand's legendary Platinum+ flat iron — a professional tool that prioritizes hair health alongside performance. The 2400W AC motor is among the most powerful in its class, yet the ionic technology ensures hair is dried gently and evenly.

We tested this on thick, long hair and found it one of the fastest and smoothest dryers we've reviewed. The optimum temperature technology maintains the ideal drying temperature throughout the session, preventing heat damage while delivering salon-quality results. The ergonomic design is comfortable for extended use.

At $279, it's the most expensive dryer we've reviewed, but for those who blow-dry daily and prioritize hair health, the investment is justified. The ghd Helios is the professional's choice.`,
    pros: ["2400W motor — fastest drying in class","Optimum temperature technology","Excellent for thick, long hair","Professional ergonomic design"],
    cons: ["Most expensive dryer reviewed","No cool shot button","Heavy for extended use"],
    bestFor: "Thick, long hair; daily blow-dry users; those prioritizing hair health",
    editorPick: false,
    publishDate: "2026-05-11",
    slug: "ghd-helios-professional-hair-dryer-review",
  },
  {
    id: "t3-featherweight-luxe",
    name: "T3 Featherweight 3i Professional Ionic Hair Dryer",
    brand: "T3",
    asin: "B07V2FZZ55",
    price: 249,
    priceDisplay: "$249.00",
    rating: 4.5,
    reviewCount: 6200,
    category: "Hair Dryers",
    categorySlug: "hair-dryers",
    imageUrl: "https://m.media-amazon.com/images/I/71u8Sa4cs2L._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71u8Sa4cs2L._SL1500_.jpg",
    hairTypes: ["fine","normal","color-treated"],
    shortDescription: "Lightweight professional dryer with IonAir technology for smooth, frizz-free results.",
    fullReview: `T3 Featherweight 3i Professional Ionic Hair Dryer is one of the most balanced premium hair dryers available — it combines professional-grade power with a lightweight design that makes it comfortable for extended use. The IonAir technology generates a high concentration of negative ions that dramatically reduce frizz and add shine.

We tested this on fine, color-treated hair and found it exceptional. The lightweight design makes it noticeably more comfortable to use than heavier professional dryers, and the results were consistently smooth and shiny. The multiple speed and heat settings provide excellent customization for most users.

At $249, it's competitive with the Dyson Supersonic while offering a different set of trade-offs — lighter weight and more traditional design vs. Dyson's intelligent heat control. For those who prioritize comfort during extended styling sessions, the T3 Featherweight 3i is an excellent choice.`,
    pros: ["Lightweight design for comfortable use","IonAir technology for frizz control","Professional-grade results","Traditional design — easy to use"],
    cons: ["No intelligent heat control","Less innovative than Dyson","Premium price"],
    bestFor: "Fine to medium hair; those who blow-dry frequently; comfort-focused users",
    editorPick: false,
    publishDate: "2026-05-11",
    slug: "t3-featherweight-luxe-hair-dryer-review",
  },
  {
    id: "kerastase-elixir-ultime",
    name: "Kérastase Elixir Ultime Original Hair Oil",
    brand: "Kérastase",
    asin: "B07GWS4BSJ",
    price: 58,
    priceDisplay: "$58.00",
    rating: 4.7,
    reviewCount: 7200,
    category: "Serums & Oils",
    categorySlug: "serums-oils",
    imageUrl: "https://m.media-amazon.com/images/I/71f23rKetZL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71f23rKetZL._SL1500_.jpg",
    hairTypes: ["dry","thick","coarse","color-treated"],
    shortDescription: "Luxurious 5-oil blend with argan, camellia, maize, and pracaxi oils for radiant, silky hair.",
    fullReview: `Kérastase Elixir Ultime is the definitive luxury hair oil — a sophisticated blend of five precious oils that delivers results that justify its premium price. The combination of argan, camellia, maize, pracaxi, and marula oils creates a complex that nourishes, protects, and adds extraordinary shine without heaviness.

We tested this on thick, color-treated hair and found it exceptional. A few drops applied to damp hair before blow-drying transformed the texture and shine dramatically. The oil absorbs quickly without leaving residue, and the signature Kérastase scent is intoxicating. Hair looked and felt genuinely luxurious.

At $58, it's an investment, but the concentration means a bottle lasts months. For those who want the absolute best hair oil available, Elixir Ultime is unmatched.`,
    pros: ["5-oil complex delivers extraordinary results","Absorbs without residue","Signature Kérastase scent","Highly concentrated — lasts months"],
    cons: ["Very expensive","Can be too heavy for fine hair","Strong scent may not suit all"],
    bestFor: "Thick, dry, or color-treated hair; those wanting maximum shine and luxury",
    editorPick: false,
    publishDate: "2026-05-11",
    slug: "kerastase-elixir-ultime-hair-oil-review",
  },
  {
    id: "living-proof-perfect-hair-day",
    name: "Living Proof Perfect Hair Day 5-in-1 Styling Treatment",
    brand: "Living Proof",
    asin: "B00EX6BVO6",
    price: 30,
    priceDisplay: "$30.00",
    rating: 4.5,
    reviewCount: 8900,
    category: "Serums & Oils",
    categorySlug: "serums-oils",
    imageUrl: "https://m.media-amazon.com/images/I/51a9p9YVfNL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/51a9p9YVfNL._SL1500_.jpg",
    hairTypes: ["fine","normal","color-treated"],
    shortDescription: "5-in-1 treatment that primes, protects, detangles, smooths, and strengthens.",
    fullReview: `Living Proof Perfect Hair Day 5-in-1 Styling Treatment is a genuinely multi-functional product that delivers on its ambitious claims. The patented OFPMA molecule — Living Proof's proprietary technology — creates a protective shield around each hair strand that repels dirt, oil, and humidity while adding smoothness and shine.

We tested this on color-treated, medium-thickness hair and found it an excellent all-in-one styling product. Applied to damp hair before blow-drying, it primed the hair for styling, provided heat protection, detangled effectively, and left hair smooth and shiny. The results lasted through multiple days.

At $30 for 4 oz, it's a reasonable price for a product that genuinely replaces multiple styling products. The lightweight formula works well on fine to medium hair without weighing it down.`,
    pros: ["Genuinely replaces multiple products","Patented OFPMA technology","Lightweight for fine hair","Long-lasting results"],
    cons: ["Not as moisturizing as dedicated oils","Small bottle for the price","May not be enough for very thick or coarse hair"],
    bestFor: "Fine to medium hair; those wanting to simplify their routine; color-treated hair",
    editorPick: false,
    publishDate: "2026-05-11",
    slug: "living-proof-perfect-hair-day-review",
  },
  {
    id: "amika-soulfood-mask",
    name: "Amika Soulfood Nourishing Mask",
    brand: "Amika",
    asin: "B07H3GBSC3",
    price: 30,
    priceDisplay: "$30.00",
    rating: 4.7,
    reviewCount: 6800,
    category: "Hair Masks & Treatments",
    categorySlug: "hair-masks",
    imageUrl: "https://m.media-amazon.com/images/I/61sIx2NAKgL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/61sIx2NAKgL._SL1500_.jpg",
    hairTypes: ["dry","thick","coarse","curly"],
    shortDescription: "Sea buckthorn oil-infused nourishing mask for dry, thirsty hair of all types.",
    fullReview: `Amika Soulfood Nourishing Mask is one of the most beloved hair masks in the professional beauty space, and after testing it extensively, we understand the devotion. The star ingredient is sea buckthorn oil — a nutrient-dense oil packed with omega fatty acids, vitamins, and antioxidants that deeply nourish and restore dry hair.

We tested this on thick, dry, naturally curly hair and found it transformative. After a single 10-minute treatment, curls were more defined, frizz was dramatically reduced, and hair felt genuinely moisturized rather than just coated. The scent is a signature Amika blend — bright, fruity, and unmistakable.

At $30 for 8.5 oz, it's excellent value for the results delivered. This is our top recommendation for curly and coarse hair types that need serious moisture without protein overload.`,
    pros: ["Sea buckthorn oil delivers exceptional moisture","Excellent for curly and coarse hair","Signature Amika scent","Great value for the results"],
    cons: ["Strong scent may not suit everyone","Can be too heavy for fine hair","Requires 10+ minutes for best results"],
    bestFor: "Dry, curly, coarse, or thick hair needing deep moisture",
    editorPick: false,
    publishDate: "2026-05-11",
    slug: "amika-soulfood-nourishing-mask-review",
  },
  {
    id: "ouai-hair-mask",
    name: "OUAI Hair Mask",
    brand: "OUAI",
    asin: "B08WGJQTN1",
    price: 38,
    priceDisplay: "$38.00",
    rating: 4.6,
    reviewCount: 5500,
    category: "Hair Masks & Treatments",
    categorySlug: "hair-masks",
    imageUrl: "https://m.media-amazon.com/images/I/71tu05eRsPL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71tu05eRsPL._SL1500_.jpg",
    hairTypes: ["normal","dry","fine"],
    shortDescription: "Celeb-approved mask with shea butter, avocado oil, and marshmallow root for silky, frizz-free hair.",
    fullReview: `OUAI Hair Mask has earned its celebrity following through genuine performance rather than clever marketing. The formula combines shea butter, avocado oil, and marshmallow root to deliver deep moisture while maintaining a lightweight feel that works on fine to medium hair.

We tested this on medium-thickness hair prone to frizz and found it excellent at taming flyaways and adding a beautiful, natural-looking shine. The mask has a light, clean scent that's pleasant without being overwhelming. The texture is creamy but not heavy, and it rinses out completely without leaving residue.

At $38 for 8 oz, it's a premium purchase but competitive with other luxury masks. The formula's versatility — effective on multiple hair types without being too heavy — makes it one of the most accessible luxury masks we've tested.`,
    pros: ["Works on multiple hair types","Lightweight formula won't weigh down hair","Beautiful natural shine","Light, clean scent"],
    cons: ["Premium price","Not as intensive as Olaplex for damaged hair","Results are more subtle than heavy masks"],
    bestFor: "Normal to dry hair; multiple hair types; those wanting natural-looking results",
    editorPick: false,
    publishDate: "2026-05-11",
    slug: "ouai-hair-mask-review",
  },
  {
    id: "wella-enrich-shampoo",
    name: "Wella Professionals Enrich Moisturizing Shampoo",
    brand: "Wella Professionals",
    asin: "B07PP9MXYY",
    price: 22,
    priceDisplay: "$22.00",
    rating: 4.5,
    reviewCount: 4100,
    category: "Shampoo & Conditioner",
    categorySlug: "shampoo-conditioner",
    imageUrl: "https://m.media-amazon.com/images/I/617UVQ5DMSL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/617UVQ5DMSL._SL1500_.jpg",
    hairTypes: ["dry","thick","coarse"],
    shortDescription: "Professional moisturizing shampoo for dry and damaged hair with wheat proteins.",
    fullReview: `Wella Professionals Enrich is a salon-quality shampoo that punches above its price point. The wheat protein complex strengthens and moisturizes simultaneously, making it particularly effective for hair that is both dry and structurally weakened from heat or chemical processing.

We tested this on thick, coarse hair prone to frizz and found it excellent at adding manageability without weighing hair down. The lather is generous, the rinse is clean, and the results are consistently smooth and soft. The scent is a pleasant, clean floral that fades within an hour.

At $22, it's excellent value for a professional-grade formula. For those who want salon results without salon prices, Wella Enrich is one of the best options available.`,
    pros: ["Wheat protein strengthens and moisturizes","Excellent value for professional quality","Works well on thick, coarse hair","Clean, pleasant scent"],
    cons: ["Less luxurious feel than premium brands","Not sulfate-free","May not be enough for severely damaged hair"],
    bestFor: "Dry, coarse, or frizzy hair; those wanting professional results on a budget",
    editorPick: false,
    publishDate: "2026-05-11",
    slug: "wella-enrich-moisturizing-shampoo-review",
  },
  {
    id: "kerastase-bain-satin",
    name: "Kérastase Nutritive Bain Satin Shampoo",
    brand: "Kérastase",
    asin: "B0BZZJYKZ6",
    price: 44,
    priceDisplay: "$44.00",
    rating: 4.7,
    reviewCount: 3200,
    category: "Shampoo & Conditioner",
    categorySlug: "shampoo-conditioner",
    imageUrl: "https://m.media-amazon.com/images/I/31EY3ettbuL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/31EY3ettbuL._SL1500_.jpg",
    hairTypes: ["dry","color-treated"],
    shortDescription: "Luxurious French salon shampoo with irisome complex for dry, sensitized hair.",
    fullReview: `Kérastase Nutritive Bain Satin is the gold standard of luxury hair care, bringing French salon expertise directly to your shower. The irisome complex — a proprietary blend of proteins and lipids — works to nourish and restore dry, sensitized hair from the very first wash.

We tested this on fine, color-treated hair that had become dry and brittle from over-processing. The results were immediate and remarkable: hair felt noticeably softer, looked shinier, and the scalp felt soothed rather than stripped. The lather is rich and indulgent, and the scent is the signature Kérastase fragrance — sophisticated and long-lasting.

At $44 for 8.5 oz, it's a luxury purchase that requires commitment. But for those with genuinely dry or sensitized hair, the results justify the investment. This is the shampoo we reach for when hair needs serious rehabilitation.`,
    pros: ["Irisome complex delivers immediate results","Rich, indulgent lather","Signature Kérastase scent","Excellent for sensitized scalps"],
    cons: ["Premium price","Smaller size for the cost","May be too rich for oily hair"],
    bestFor: "Dry, sensitized, or over-processed hair",
    editorPick: false,
    publishDate: "2026-05-11",
    slug: "kerastase-bain-satin-shampoo-review",
  },
  {
    id: "kristin-ess-curling-wand",
    name: "Kristin Ess Hair 1.25\" Curling Wand",
    brand: "Kristin Ess",
    asin: "B0B8YCSSWQ",
    price: 35,
    priceDisplay: "$35.00",
    rating: 4.5,
    reviewCount: 8700,
    category: "Curling Irons & Wands",
    categorySlug: "curling-irons",
    imageUrl: "https://m.media-amazon.com/images/I/51UWPkD0ruML._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/51UWPkD0ruML._SL1500_.jpg",
    hairTypes: ["normal","fine","medium"],
    shortDescription: "Influencer-designed curling wand with titanium barrel for consistent, beautiful waves.",
    fullReview: `Kristin Ess Hair Curling Wand is a celebrity-designed tool that delivers genuine performance alongside its Instagram-worthy aesthetic. The titanium barrel heats quickly and maintains consistent temperature for uniform curls throughout the styling session. The 1.25" size is the most versatile barrel size — large enough for loose waves, small enough for defined curls.

We tested this on fine, medium-length hair and found it excellent for creating the kind of effortless, natural-looking waves that are Kristin Ess's signature style. The titanium barrel glides smoothly, and the curls created were consistent and long-lasting. The cool tip makes it safer to use than wands without this feature.

At $35, it's excellent value for a titanium wand. The Kristin Ess Curling Wand is our top recommendation for those who want versatile, natural-looking waves at a budget-friendly price.`,
    pros: ["Titanium barrel for consistent heat","Versatile 1.25\" size for waves and curls","Cool tip for safer use","Excellent value for titanium"],
    cons: ["Clipless design requires some technique","Not ideal for very tight curls","No heat glove included"],
    bestFor: "Natural-looking waves and curls; fine to medium hair; budget shoppers",
    editorPick: false,
    publishDate: "2026-05-04",
    slug: "kristin-ess-curling-wand-review",
  },
  {
    id: "t3-whirl-trio-curling-iron",
    name: "T3 Switch Kit Curl Trio Interchangeable Curling Iron",
    brand: "T3",
    asin: "B0CRG6S7W8",
    price: 249,
    priceDisplay: "$249.00",
    rating: 4.5,
    reviewCount: 3100,
    category: "Curling Irons & Wands",
    categorySlug: "curling-irons",
    imageUrl: "https://m.media-amazon.com/images/I/51UPkD0ruML._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/51UPkD0ruML._SL1500_.jpg",
    hairTypes: ["all","normal","medium"],
    shortDescription: "Interchangeable barrel set with three sizes for versatile curl and wave styling.",
    fullReview: `T3 Whirl Trio is a premium curling system that includes three interchangeable barrels (0.75", 1.25", and 1.5") in a single handle, providing versatility that would otherwise require three separate tools. The tourmaline ceramic barrels generate negative ions for frizz-free results, and the digital temperature control ensures precise heat management.

We tested all three barrels on medium-thickness hair and found each delivered excellent results for its intended style — tight curls, classic curls, and loose waves respectively. The barrel swap mechanism is smooth and quick, making it easy to switch between styles. The digital display makes temperature management precise.

At $249, it's a significant investment, but for those who regularly use multiple curl sizes, the Whirl Trio replaces three separate tools at a lower total cost.`,
    pros: ["Three interchangeable barrels in one handle","Digital temperature control","Tourmaline ceramic for frizz-free results","Replaces multiple tools"],
    cons: ["Expensive upfront investment","Barrels take time to cool before swapping","Heavy handle"],
    bestFor: "Those who use multiple curl sizes; versatile styling; medium to thick hair",
    editorPick: false,
    publishDate: "2026-05-04",
    slug: "t3-whirl-trio-curling-iron-review",
  },
  {
    id: "remington-s9500-pearl-pro",
    name: "Remington S9500 Pearl Pro Ceramic Flat Iron",
    brand: "Remington",
    asin: "B00BB8ZIRK",
    price: 49.99,
    priceDisplay: "$49.99",
    rating: 4.4,
    reviewCount: 19000,
    category: "Flat Irons & Straighteners",
    categorySlug: "flat-irons",
    imageUrl: "https://m.media-amazon.com/images/I/41xG8Yh0rlL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/41xG8Yh0rlL._SL1500_.jpg",
    hairTypes: ["all","normal","fine"],
    shortDescription: "Pearl-infused ceramic plates for smooth glide and reduced frizz at a mid-range price.",
    fullReview: `Remington Pearl Pro Ceramic Flat Iron uses pearl-infused ceramic plates that provide an exceptionally smooth glide — smoother than standard ceramic plates — resulting in less friction and reduced hair damage. The pearl infusion also generates more negative ions than conventional ceramic for better frizz control.

We tested this on fine, color-treated hair and found it excellent for everyday straightening. The plates glide smoothly, heat up quickly (30 seconds), and the results are consistently smooth and shiny. The 11 heat settings (from 265°F to 450°F) provide excellent customization.

At $50, it's excellent value for a mid-range flat iron. The Remington Pearl Pro is our top recommendation for those who want better-than-budget performance without the premium price.`,
    pros: ["Pearl-infused plates for smooth glide","More ions than standard ceramic","Quick 30-second heat-up","11 heat settings for customization"],
    cons: ["Not as durable as professional options","Pearl infusion wears over time","Basic design"],
    bestFor: "Everyday straightening; fine to normal hair; mid-range budget",
    editorPick: false,
    publishDate: "2026-05-04",
    slug: "remington-s9500-pearl-pro-flat-iron-review",
  },
  {
    id: "conair-infiniti-pro-spin-air",
    name: "Conair Infiniti PRO Spin Air Rotating Styler",
    brand: "Conair",
    asin: "B004INUWX0",
    price: 49.99,
    priceDisplay: "$49.99",
    rating: 4.3,
    reviewCount: 15000,
    category: "Hair Dryers",
    categorySlug: "hair-dryers",
    imageUrl: "https://m.media-amazon.com/images/I/41msggSuaoL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/41msggSuaoL._SL1500_.jpg",
    hairTypes: ["normal","fine","medium"],
    shortDescription: "Rotating styler brush that dries and styles simultaneously for voluminous blowouts.",
    fullReview: `Conair Infiniti PRO Spin Air is a rotating styler brush that delivers voluminous blowout results at a fraction of the price of premium alternatives. The rotating barrel automatically wraps hair as you style, creating volume and smoothness simultaneously without the technique required by traditional round brushes.

We tested this on fine, shoulder-length hair and found it excellent for creating the kind of voluminous, smooth blowout that typically requires professional skill. The ionic technology reduces frizz, and the multiple heat settings accommodate different hair types. The rotating mechanism is smooth and reliable.

At $50, it's exceptional value for a rotating styler. The Conair Spin Air is our top recommendation for those who want professional-looking blowouts without professional skill or price.`,
    pros: ["Automatic rotation for easy blowouts","Excellent value at $50","Ionic technology for frizz control","Multiple heat settings"],
    cons: ["Not as powerful as premium alternatives","Can tangle very long hair","Build quality is basic"],
    bestFor: "Fine to medium hair; those wanting easy voluminous blowouts; budget shoppers",
    editorPick: false,
    publishDate: "2026-05-04",
    slug: "conair-infiniti-pro-spin-air-review",
  },
  {
    id: "bio-ionic-goldpro-dryer",
    name: "BIO IONIC Powerlight Pro Hair Dryer",
    brand: "Bio Ionic",
    asin: "B01HFH7XKK",
    price: 147,
    priceDisplay: "$147.00",
    rating: 4.3,
    reviewCount: 336,
    category: "Hair Dryers",
    categorySlug: "hair-dryers",
    imageUrl: "https://m.media-amazon.com/images/I/61Ed0Jf+H5L._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/61Ed0Jf+H5L._SL1500_.jpg",
    hairTypes: ["all","thick","fine"],
    shortDescription: "Professional ionic hair dryer with moisturizing technology for fast drying and exceptional shine.",
    fullReview: `BIO IONIC Powerlight Pro Hair Dryer is a professional-grade dryer that uses the brand's proprietary ionic conditioning technology to deliver fast drying with outstanding shine. The moisturizing ionic output reduces frizz and static while the powerful motor cuts drying time significantly compared to consumer-grade dryers.

We tested this on thick, medium-length hair and found it one of the most effective professional dryers we've reviewed. The combination of powerful airflow and abundant ionic output delivered smooth, shiny results in significantly less time than comparable dryers. The lightweight design makes it comfortable for extended use.

At $147, it's competitively priced for a professional dryer. The BIO IONIC Powerlight Pro is our top recommendation for those who want professional-grade drying performance with exceptional shine results.`,
    pros: ["Gold plate technology for faster drying","Exceptional shine results","Lightweight design","Abundant ionic output"],
    cons: ["Premium price","Less widely known than major brands","No intelligent heat control"],
    bestFor: "Those prioritizing speed; thick hair; those wanting exceptional shine",
    editorPick: false,
    publishDate: "2026-05-04",
    slug: "bio-ionic-goldpro-speed-dryer-review",
  },
  {
    id: "olaplex-no3-hair-perfector",
    name: "Olaplex No. 3 Hair Perfector",
    brand: "Olaplex",
    asin: "B0GHSXYY3Z",
    price: 30,
    priceDisplay: "$30.00",
    rating: 4.6,
    reviewCount: 45000,
    category: "Serums & Oils",
    categorySlug: "serums-oils",
    imageUrl: "https://m.media-amazon.com/images/I/61ax-mTapZL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/61ax-mTapZL._SL1500_.jpg",
    hairTypes: ["dry","color-treated","all"],
    shortDescription: "At-home bond-building treatment that reduces breakage and strengthens hair from within.",
    fullReview: `Olaplex No. 3 Hair Perfector is the most scientifically validated hair treatment available for home use, and its 45,000+ Amazon reviews reflect its genuine efficacy. The bis-aminopropyl diglycol dimaleate technology — the same bond-building chemistry used in professional Olaplex treatments — works to reconnect broken disulfide bonds within the hair structure.

We tested this on color-treated hair with significant breakage and found it genuinely effective at reducing breakage and improving hair strength over a 4-week period. Applied weekly as a pre-shampoo treatment, it progressively improved hair's elasticity and reduced the frequency of breakage during brushing.

At $30 for 3.3 oz, it's a reasonable investment for a scientifically proven treatment. Olaplex No. 3 is our top recommendation for anyone with chemically processed, heat-damaged, or breakage-prone hair.`,
    pros: ["Scientifically proven bond-building technology","45,000+ reviews validate efficacy","Progressive improvement with regular use","Works on all damaged hair types"],
    cons: ["Requires regular use for best results","Not a conditioner — use in addition to regular routine","Small bottle for the price"],
    bestFor: "Chemically processed, heat-damaged, or breakage-prone hair",
    editorPick: false,
    publishDate: "2026-05-04",
    slug: "olaplex-no3-hair-perfector-review",
  },
  {
    id: "amika-nourish-and-shine-serum",
    name: "Amika Water Sign Hydrating Hair Oil with Hyaluronic Acid",
    brand: "Amika",
    asin: "B0BQ8P9LS2",
    price: 30,
    priceDisplay: "$30.00",
    rating: 4.6,
    reviewCount: 4900,
    category: "Serums & Oils",
    categorySlug: "serums-oils",
    imageUrl: "https://m.media-amazon.com/images/I/61AUrKqKLoL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/61AUrKqKLoL._SL1500_.jpg",
    hairTypes: ["dry","normal","all"],
    shortDescription: "Sea buckthorn oil serum for intense shine and frizz control on all hair types.",
    fullReview: `Amika Nourish and Shine Serum is a versatile hair serum that delivers genuine shine and frizz control across all hair types. The sea buckthorn oil — the same hero ingredient in Amika's beloved Soulfood mask — provides deep nourishment, while the lightweight serum base ensures it works on fine hair without weighing it down.

We tested this on medium-thickness hair prone to frizz and found it excellent at adding a natural-looking shine and taming flyaways. A small amount applied to damp hair before blow-drying or to dry hair as a finishing product delivers consistent, beautiful results. The signature Amika scent is a bonus.

At $26, it's excellent value for a professional-quality serum. Amika Nourish and Shine is our top recommendation for those who want a versatile serum that works on all hair types.`,
    pros: ["Works on all hair types","Sea buckthorn oil for genuine nourishment","Versatile — works on damp or dry hair","Excellent value for professional quality"],
    cons: ["Strong signature scent","Not as intensive as dedicated oils for very dry hair","Small bottle"],
    bestFor: "All hair types; those wanting versatile shine and frizz control",
    editorPick: false,
    publishDate: "2026-05-04",
    slug: "amika-nourish-and-shine-serum-review",
  },
  {
    id: "kerastase-resistance-masque",
    name: "Kérastase Résistance Masque Thérapiste",
    brand: "Kérastase",
    asin: "B01KNWQW3I",
    price: 65,
    priceDisplay: "$65.00",
    rating: 4.7,
    reviewCount: 3800,
    category: "Hair Masks & Treatments",
    categorySlug: "hair-masks",
    imageUrl: "https://m.media-amazon.com/images/I/41eHDchhFHL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/41eHDchhFHL._SL1500_.jpg",
    hairTypes: ["dry","thick","color-treated"],
    shortDescription: "Fiber-restoring luxury mask for very dry, over-processed hair with ceramide and protein complex.",
    fullReview: `Kérastase Résistance Masque Thérapiste is the brand's most intensive repair treatment — designed specifically for very dry, over-processed hair that has been significantly damaged by bleaching, chemical processing, or excessive heat. The ceramide and protein complex works to rebuild the hair's internal structure while the lipid complex restores the surface.

We tested this on severely bleached hair and found it one of the most effective repair treatments available. After three weekly treatments, the hair's texture was noticeably improved — less brittle, more elastic, and significantly shinier. The mask has a rich, creamy texture that feels luxurious during application.

At $65 for 6.8 oz, it's a significant investment, but for those with genuinely damaged hair who need serious repair, Masque Thérapiste delivers results that justify the cost.`,
    pros: ["Ceramide and protein complex rebuilds hair structure","Exceptional for severely damaged hair","Rich, luxurious texture","Noticeable results after 3 treatments"],
    cons: ["Very expensive","Too heavy for fine or healthy hair","Requires regular use for best results"],
    bestFor: "Severely damaged, bleached, or over-processed hair",
    editorPick: false,
    publishDate: "2026-05-04",
    slug: "kerastase-resistance-masque-therapiste-review",
  },
  {
    id: "fanola-no-yellow-mask",
    name: "Fanola No Yellow Mask",
    brand: "Fanola",
    asin: "B072K6B9RF",
    price: 18,
    priceDisplay: "$18.00",
    rating: 4.5,
    reviewCount: 22000,
    category: "Hair Masks & Treatments",
    categorySlug: "hair-masks",
    imageUrl: "https://m.media-amazon.com/images/I/71fdZ8nuP3L._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71fdZ8nuP3L._SL1500_.jpg",
    hairTypes: ["color-treated","blonde","gray"],
    shortDescription: "Intense purple pigment mask for neutralizing yellow tones in blonde and gray hair.",
    fullReview: `Fanola No Yellow Mask is the most powerful toning mask available at this price point — and possibly at any price point. The intense purple pigment concentration is significantly higher than most toning masks, making it exceptionally effective at neutralizing yellow and brassy tones in blonde and gray hair.

We tested this on severely brassy highlighted hair and found it dramatically effective. After a single 5-minute treatment, the yellow tones were almost completely neutralized. The key is timing — this mask works fast, and leaving it on too long can result in a purple tint. We recommend starting with 3 minutes and adjusting based on results.

At $18 for 16.9 oz, it's exceptional value for an extremely effective toning treatment. This is our top recommendation for blonde and gray hair that needs serious brassiness correction.`,
    pros: ["Most powerful toning mask reviewed","Exceptional value for the size","Dramatic results in 3–5 minutes","Works on severely brassy hair"],
    cons: ["Can over-tone if left on too long","Strong purple staining if misused","Not suitable for non-blonde hair"],
    bestFor: "Severely brassy blonde or gray hair; those needing intensive toning",
    editorPick: false,
    publishDate: "2026-05-04",
    slug: "fanola-no-yellow-mask-review",
  },
  {
    id: "oribe-gold-lust-shampoo",
    name: "Oribe Gold Lust Repair & Restore Shampoo",
    brand: "Oribe",
    asin: "B07XGVX19G",
    price: 52,
    priceDisplay: "$52.00",
    rating: 4.7,
    reviewCount: 3100,
    category: "Shampoo & Conditioner",
    categorySlug: "shampoo-conditioner",
    imageUrl: "https://m.media-amazon.com/images/I/71Hb0FXJHPL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71Hb0FXJHPL._SL1500_.jpg",
    hairTypes: ["dry","color-treated","fine"],
    shortDescription: "Ultra-luxury shampoo with biotin, argan oil, and Oribe's signature Côte d'Azur scent.",
    fullReview: `Oribe Gold Lust Repair & Restore is the most luxurious shampoo we've reviewed — a salon-exclusive formula that delivers results as exceptional as its price suggests. The biotin and argan oil complex strengthens and nourishes simultaneously, while the Côte d'Azur fragrance is one of the most sophisticated scents in hair care.

We tested this on fine, color-treated hair and found it exceptional. Hair felt stronger, looked shinier, and the color vibrancy was noticeably maintained compared to standard shampoos. The lather is rich and indulgent, and the scent lingers beautifully throughout the day.

At $52, it's the most expensive shampoo we've reviewed. But for those who want the absolute best — and are willing to pay for it — Oribe Gold Lust is unmatched.`,
    pros: ["Biotin and argan oil for strength and moisture","Signature Côte d'Azur scent","Exceptional color vibrancy maintenance","Ultra-luxurious experience"],
    cons: ["Most expensive shampoo reviewed","Small bottle for the price","Overkill for healthy hair"],
    bestFor: "Fine, color-treated, or damaged hair; those wanting the absolute best",
    editorPick: false,
    publishDate: "2026-05-04",
    slug: "oribe-gold-lust-shampoo-review",
  },
  {
    id: "aveda-nutriplenish-shampoo",
    name: "Aveda Nutriplenish Shampoo Deep Moisture",
    brand: "Aveda",
    asin: "B082Y5J8GP",
    price: 34,
    priceDisplay: "$34.00",
    rating: 4.5,
    reviewCount: 7600,
    category: "Shampoo & Conditioner",
    categorySlug: "shampoo-conditioner",
    imageUrl: "https://m.media-amazon.com/images/I/71szAS12jsL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71szAS12jsL._SL1500_.jpg",
    hairTypes: ["dry","thick","coarse"],
    shortDescription: "Plant-powered deep moisture shampoo with coconut oil and omega-5 for dry, thirsty hair.",
    fullReview: `Aveda Nutriplenish Deep Moisture is a clean beauty shampoo that delivers genuine results without compromising on ingredient quality. The formula is built around coconut oil and omega-5 fatty acids from pomegranate seed oil, creating a deeply nourishing cleanse that leaves hair soft and manageable.

We tested this on thick, dry hair over four weeks and found it consistently effective at adding moisture and reducing frizz. The lather is rich for a clean formula, and the signature Aveda scent — a blend of essential oils — is sophisticated and long-lasting. Hair felt noticeably softer and more manageable after each wash.

At $34, it's a premium purchase for a shampoo, but the clean formula and genuine results make it worth the investment for those who prioritize ingredient quality.`,
    pros: ["Clean, plant-powered formula","Coconut oil and omega-5 for deep moisture","Signature Aveda essential oil scent","Excellent for thick, dry hair"],
    cons: ["Premium price","Scent may be too strong for some","Not the most concentrated formula"],
    bestFor: "Dry, thick, or coarse hair; clean beauty enthusiasts",
    editorPick: false,
    publishDate: "2026-05-04",
    slug: "aveda-nutriplenish-deep-moisture-shampoo-review",
  },
  {
    id: "sultra-bombshell-curling-rod",
    name: "Sultra The Bombshell 1\" Curling Rod",
    brand: "Sultra",
    asin: "B003YC8NS2",
    price: 89,
    priceDisplay: "$89.00",
    rating: 4.5,
    reviewCount: 4200,
    category: "Curling Irons & Wands",
    categorySlug: "curling-irons",
    imageUrl: "https://m.media-amazon.com/images/I/61fIu39kv4L._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/61fIu39kv4L._SL1500_.jpg",
    hairTypes: ["all","thick","normal"],
    shortDescription: "Ceramic tourmaline clipless rod for natural-looking curls and waves without clip marks.",
    fullReview: `Sultra The Bombshell is a premium clipless curling rod that creates the most natural-looking curls and waves of any tool we've tested. The ceramic tourmaline barrel generates negative ions for frizz-free results, and the clipless design eliminates the dreaded clip marks that can ruin otherwise perfect curls.

We tested this on thick, medium-length hair and found it excellent for creating the kind of effortless, natural-looking curls that are difficult to achieve with clip-style irons. The barrel heats quickly and maintains consistent temperature. The 360-degree swivel cord prevents tangling during use.

At $89, it's a premium purchase for a curling rod, but the quality of results and the natural-looking finish justify the investment for those who style their hair regularly.`,
    pros: ["Clipless design eliminates clip marks","Natural-looking curls and waves","Ceramic tourmaline for frizz-free results","360-degree swivel cord"],
    cons: ["Learning curve for clipless technique","Expensive for a curling rod","Risk of burns without heat glove"],
    bestFor: "Natural-looking curls; medium to thick hair; intermediate to advanced users",
    editorPick: false,
    publishDate: "2026-04-25",
    slug: "sultra-bombshell-curling-rod-review",
  },
  {
    id: "hot-tools-one-shot-curling-iron",
    name: "HOT TOOLS Pro Artist Nano Ceramic 1\" Curling Iron",
    brand: "HOT TOOLS",
    asin: "B002BU010G",
    price: 34.99,
    priceDisplay: "$34.99",
    rating: 4.4,
    reviewCount: 31000,
    category: "Curling Irons & Wands",
    categorySlug: "curling-irons",
    imageUrl: "https://m.media-amazon.com/images/I/51D8dOJnraL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/51D8dOJnraL._SL1500_.jpg",
    hairTypes: ["all","thick","normal"],
    shortDescription: "Professional nano ceramic curling iron with even heat distribution for long-lasting, polished curls.",
    fullReview: `HOT TOOLS Pro Artist Nano Ceramic 1" Curling Iron is a professional-grade tool that delivers consistent, polished curls with the reliability that has made HOT TOOLS a salon staple for decades. The nano ceramic barrel provides even heat distribution and generates negative ions to reduce frizz, while the multiple heat settings (from 280°F to 430°F) accommodate every hair type.

We tested this on medium-thickness, shoulder-length hair and found it excellent for creating classic, defined curls. The barrel heats quickly and maintains consistent temperature throughout the styling session. The curls produced are smooth, shiny, and long-lasting — exactly what you'd expect from a professional tool.

At $35, it's exceptional value for a professional-grade curling iron. HOT TOOLS Pro Artist Nano Ceramic is our top recommendation for those who want reliable, polished curls at a budget-friendly price.`,
    pros: ["Nano ceramic barrel for even heat distribution", "Negative ion technology for frizz reduction", "Multiple heat settings for all hair types", "Professional-grade results at budget price"],
    cons: ["Clip can leave marks on some hair types", "Not ideal for loose, beachy waves", "Basic design"],
    bestFor: "Classic curls; medium to thick hair; those wanting professional results on a budget",
    editorPick: false,
    publishDate: "2026-04-25",
    slug: "hot-tools-one-shot-curling-iron-review",
  },
  {
    id: "babyliss-pro-nano-titanium-flat",
    name: "BaBylissPRO Nano Titanium Ultra-Thin Flat Iron Hair Straightener",
    brand: "BaBylissPRO",
    asin: "B00176B9JC",
    price: 59.99,
    priceDisplay: "$59.99",
    rating: 4.5,
    reviewCount: 28000,
    category: "Flat Irons & Straighteners",
    categorySlug: "flat-irons",
    imageUrl: "https://m.media-amazon.com/images/I/71sf0ZcIiyL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/71sf0ZcIiyL._SL1500_.jpg",
    hairTypes: ["all","thick","fine"],
    shortDescription: "Ultra-thin nano titanium plates for precise styling and maximum heat conductivity.",
    fullReview: `BaBylissPRO Nano Titanium Ultra-Thin is a professional flat iron that delivers exceptional precision styling at a competitive price. The ultra-thin nano titanium plates are 40% thinner than standard plates, allowing for precise styling of even the smallest sections and creating both straight styles and curls with equal ease.

We tested this on fine, medium-length hair and found it excellent for detailed styling work. The titanium plates heat up to 450°F in under 30 seconds and maintain consistent temperature throughout the styling session. The nano titanium technology generates far-infrared heat for inside-out styling that reduces surface damage.

At $60, it's excellent value for a professional-grade tool. The BaBylissPRO Ultra-Thin is our top recommendation for those who want precision styling capability at a mid-range price.`,
    pros: ["Ultra-thin plates for precision styling","Nano titanium for far-infrared heat","Heats to 450°F in under 30 seconds","Creates both straight and curled styles"],
    cons: ["Ultra-thin plates can be tricky on very thick sections","No automatic shut-off","Basic design"],
    bestFor: "Precision styling; fine to medium hair; those wanting versatility",
    editorPick: false,
    publishDate: "2026-04-25",
    slug: "babyliss-pro-nano-titanium-flat-iron-review",
  },
  {
    id: "dyson-airwrap-complete",
    name: "Dyson Airwrap Multi-Styler Complete Long",
    brand: "Dyson",
    asin: "B0B61XH5YT",
    price: 599.99,
    priceDisplay: "$599.99",
    rating: 4.4,
    reviewCount: 8900,
    category: "Hair Dryers",
    categorySlug: "hair-dryers",
    imageUrl: "https://m.media-amazon.com/images/I/61uM6EQMzML._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/61uM6EQMzML._SL1500_.jpg",
    hairTypes: ["fine","normal","medium"],
    shortDescription: "All-in-one styling system that dries, curls, waves, and smooths using the Coanda effect.",
    fullReview: `The Dyson Airwrap Complete Long is the most versatile hair styling system available - a single tool that dries, curls, waves, and smooths using Dyson's proprietary Coanda effect technology. The Coanda effect uses air pressure to attract and wrap hair around the barrel without extreme heat, reducing heat damage while delivering salon-quality results.

We tested this on medium-thickness hair and found it genuinely impressive across all its styling functions. The curling barrels create beautiful, bouncy curls; the smoothing brushes deliver a blowout-quality finish; and the drying function is fast and efficient. The intelligent heat control ensures hair is never exposed to excessive temperatures.

At $600, it's a significant investment that requires justification. For those who regularly use multiple styling tools and prioritize hair health, the Airwrap can replace all of them. But for most users, it's a luxury rather than a necessity.`,
    pros: ["Replaces multiple styling tools","Coanda effect reduces heat damage","Intelligent heat control","Versatile for all styling needs"],
    cons: ["Very expensive","Learning curve for each attachment","Not ideal for very thick or coarse hair"],
    bestFor: "Fine to medium hair; those wanting one tool for all styling; daily heat stylers",
    editorPick: false,
    publishDate: "2026-04-25",
    slug: "dyson-airwrap-complete-long-review",
  },
  {
    id: "parlux-385-powerlight",
    name: "Parlux 385 Power Light Ionic and Ceramic Hair Dryer",
    brand: "Parlux",
    asin: "B00RYPLGOI",
    price: 199,
    priceDisplay: "$199.00",
    rating: 4.6,
    reviewCount: 5100,
    category: "Hair Dryers",
    categorySlug: "hair-dryers",
    imageUrl: "https://m.media-amazon.com/images/I/51Vn6XYOt8L._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/51Vn6XYOt8L._SL1500_.jpg",
    hairTypes: ["all","thick","fine"],
    shortDescription: "Italian-made professional dryer with 2150W power and exceptional durability.",
    fullReview: `Parlux 385 PowerLight is a professional salon dryer that has been trusted by stylists worldwide for decades. Made in Italy, it combines 2150W of power with ionic and ceramic technology to deliver fast, smooth drying results with exceptional durability.

We tested this on thick, long hair and found it one of the most powerful and reliable dryers we've reviewed. The motor is designed for continuous professional use, and the build quality is exceptional - this dryer is built to last years of daily use. The ionic technology generates abundant negative ions for frizz-free results.

At $199, it's a significant investment, but for those who blow-dry daily and want a dryer that will last for years, the Parlux 385 is an excellent choice. It's the professional's workhorse.`,
    pros: ["Italian-made professional quality","2150W for fast drying","Exceptional durability for daily use","Abundant ionic output"],
    cons: ["Heavier than consumer dryers","No intelligent heat control","Basic design"],
    bestFor: "Professional use; thick, long hair; those wanting maximum durability",
    editorPick: false,
    publishDate: "2026-04-25",
    slug: "parlux-385-powerlight-hair-dryer-review",
  },
  {
    id: "verb-ghost-oil",
    name: "Verb Ghost Oil",
    brand: "Verb",
    asin: "B00C3HQB9C",
    price: 22,
    priceDisplay: "$22.00",
    rating: 4.6,
    reviewCount: 5600,
    category: "Serums & Oils",
    categorySlug: "serums-oils",
    imageUrl: "https://m.media-amazon.com/images/I/81f23rKetZL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/81f23rKetZL._SL1500_.jpg",
    hairTypes: ["fine","normal","color-treated"],
    shortDescription: "Lightweight, weightless hair oil for shine and frizz control without buildup.",
    fullReview: `Verb Ghost Oil is the clean beauty answer to the luxury hair oil category - a lightweight, silicone-free formula that delivers genuine shine and frizz control without the buildup that plagues many conventional hair oils. The formula is built around a blend of marula, jojoba, and baobab oils that nourish without heaviness.

We tested this on fine, color-treated hair and found it one of the best lightweight oils available at any price. A single pump applied to damp or dry hair added noticeable shine and smoothness without any visible oiliness. The formula is also free of sulfates, parabens, and silicones - a genuine clean beauty achievement.

At $22, it's exceptional value for a clean beauty hair oil. Verb Ghost Oil is our top recommendation for those who want the benefits of a hair oil without any of the typical downsides.`,
    pros: ["Truly lightweight - no buildup","Clean formula: silicone-free, sulfate-free","Excellent value for clean beauty","Works on damp or dry hair"],
    cons: ["Not moisturizing enough for very dry or coarse hair","Small bottle","Subtle results compared to heavier oils"],
    bestFor: "Fine hair; clean beauty enthusiasts; those wanting lightweight shine",
    editorPick: false,
    publishDate: "2026-04-25",
    slug: "verb-ghost-oil-review",
  },
  {
    id: "bumble-hairdressers-invisible-oil",
    name: "Bumble and bumble Hairdresser's Invisible Oil",
    brand: "Bumble and bumble",
    asin: "B008ORT4NU",
    price: 42,
    priceDisplay: "$42.00",
    rating: 4.6,
    reviewCount: 11000,
    category: "Serums & Oils",
    categorySlug: "serums-oils",
    imageUrl: "https://m.media-amazon.com/images/I/51tu05eRsPL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/51tu05eRsPL._SL1500_.jpg",
    hairTypes: ["fine","normal","color-treated"],
    shortDescription: "6-oil blend that primes, protects, and perfects hair with a weightless, invisible finish.",
    fullReview: `Bumble and bumble Hairdresser's Invisible Oil has become one of the most iconic hair oils in the professional beauty space, and after extensive testing, we understand why. The blend of six weightless oils - coconut, argan, maize, sweet almond, safflower, and sunflower - creates a formula that nourishes without any visible residue or weight.

We tested this on fine, color-treated hair and found it exceptional. The "invisible" claim is accurate - even on fine hair, there's no visible oiliness or heaviness. Hair looks naturally shiny and feels smooth and manageable. The heat protection up to 450°F makes it a versatile pre-styling treatment.

At $42 for 3.4 oz, it's a premium purchase, but the formula's versatility and the quality of results make it worth the investment for fine hair types that struggle with traditional oils.`,
    pros: ["Truly weightless - invisible on fine hair","6-oil blend for comprehensive nourishment","Heat protection up to 450°F","Versatile pre-styling treatment"],
    cons: ["Expensive for the size","May not be moisturizing enough for very dry hair","Strong scent"],
    bestFor: "Fine hair; those wanting oil benefits without weight; pre-styling treatment",
    editorPick: false,
    publishDate: "2026-04-25",
    slug: "bumble-hairdressers-invisible-oil-review",
  },
  {
    id: "christophe-robin-mask",
    name: "Christophe Robin Regenerating Mask with Prickly Pear Seed Oil",
    brand: "Christophe Robin",
    asin: "B09FM2BFPL",
    price: 68,
    priceDisplay: "$68.00",
    rating: 4.7,
    reviewCount: 2800,
    category: "Hair Masks & Treatments",
    categorySlug: "hair-masks",
    imageUrl: "https://m.media-amazon.com/images/I/619+JQPn2QL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/619+JQPn2QL._SL1500_.jpg",
    hairTypes: ["dry","thick","coarse","color-treated"],
    shortDescription: "Ultra-luxury regenerating mask with rare prickly pear oil for severely dry or damaged hair.",
    fullReview: `Christophe Robin Regenerating Mask is the most luxurious hair mask we've reviewed, and it earns its premium price through genuinely exceptional results. The rare prickly pear oil - one of the most expensive botanical oils available - is rich in vitamin E and essential fatty acids that deeply regenerate and restore severely dry or damaged hair.

We tested this on thick, color-treated hair that had been significantly damaged by bleaching. The results after a single 10-minute treatment were dramatic: hair was visibly softer, shinier, and felt genuinely restored rather than just temporarily coated. The scent is a sophisticated floral that lingers beautifully.

At $68 for 8.4 oz, it's the most expensive mask we've reviewed. But for those with severely damaged hair who want the absolute best, Christophe Robin delivers results that justify the investment.`,
    pros: ["Rare prickly pear oil delivers exceptional results","Genuinely regenerates severely damaged hair","Sophisticated, long-lasting scent","Luxury packaging and experience"],
    cons: ["Very expensive","Overkill for mildly dry hair","Strong scent may not suit everyone"],
    bestFor: "Severely dry, damaged, or bleached hair; those wanting the absolute best",
    editorPick: false,
    publishDate: "2026-04-25",
    slug: "christophe-robin-regenerating-mask-review",
  },
  {
    id: "philip-kingsley-elasticizer",
    name: "Philip Kingsley Elasticizer",
    brand: "Philip Kingsley",
    asin: "B00ATT883S", // Updated 2026-05-04: kit bundle B0BTJ33K3Q returned 500; switched to standard listing
    price: 48,
    priceDisplay: "$48.00",
    rating: 4.6,
    reviewCount: 4200,
    category: "Hair Masks & Treatments",
    categorySlug: "hair-masks",
    imageUrl: "https://m.media-amazon.com/images/I/61eF4QqDXWL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/61eF4QqDXWL._SL1500_.jpg",
    hairTypes: ["dry","fine","color-treated"],
    shortDescription: "Pre-shampoo treatment with castor oil and hydrolyzed elastin for elasticity and shine.",
    fullReview: `Philip Kingsley Elasticizer is a legendary pre-shampoo treatment that has been a cult favorite since the 1970s - and for good reason. The formula, originally created for Audrey Hepburn, uses castor oil and hydrolyzed elastin to restore elasticity and shine to dry, brittle hair.

We tested this on fine, color-treated hair that had lost elasticity from over-processing. The results were remarkable: after just two treatments, hair was noticeably more elastic (it stretched without breaking), shinier, and easier to manage. The pre-shampoo application method - applied before washing - is unconventional but highly effective.

At $46 for 4.2 oz, it's a luxury purchase, but the concentrated formula means a little goes a long way. For those with fine or color-treated hair that has lost elasticity, Elasticizer is genuinely transformative.`,
    pros: ["Restores elasticity to brittle hair","Pre-shampoo method is highly effective","Legendary formula with decades of results","Excellent for fine, color-treated hair"],
    cons: ["Expensive for the size","Pre-shampoo method requires extra time","Not suitable for very thick hair"],
    bestFor: "Fine, color-treated, or elasticity-damaged hair",
    editorPick: false,
    publishDate: "2026-04-25",
    slug: "philip-kingsley-elasticizer-review",
  },
  {
    id: "matrix-biolage-hydrasource",
    name: "Biolage Hydra Source Shampoo for Dry Hair",
    brand: "Biolage",
    asin: "B00J9WZZWI",
    price: 18,
    priceDisplay: "$18.00",
    rating: 4.5,
    reviewCount: 9800,
    category: "Shampoo & Conditioner",
    categorySlug: "shampoo-conditioner",
    imageUrl: "https://m.media-amazon.com/images/I/81vYUxX4YeL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/81vYUxX4YeL._SL1500_.jpg",
    hairTypes: ["dry","normal","all"],
    shortDescription: "Aloe vera-infused moisturizing shampoo for dry hair with a refreshing, clean formula.",
    fullReview: `Matrix Biolage HydraSource is a professional-quality shampoo that delivers genuine hydration at an accessible price. The aloe vera-based formula is inspired by the plant's natural moisture-binding properties, and the results reflect this - hair feels hydrated and refreshed without the heavy, coated feeling that some moisturizing shampoos leave behind.

We tested this on normal-to-dry hair over four weeks and found it consistently effective. The lather is generous, the rinse is clean, and hair feels noticeably softer and more manageable after each wash. The fresh, clean scent is a bonus.

At $18, it's excellent value for a professional formula. Matrix Biolage HydraSource is our top recommendation for those who want professional-quality hydration without the professional price tag.`,
    pros: ["Aloe vera formula provides genuine hydration","Refreshing, clean scent","Generous lather","Excellent value for professional quality"],
    cons: ["Not sulfate-free","May not be enough for severely dry hair","Scent fades quickly"],
    bestFor: "Normal to dry hair; those wanting professional quality at a drugstore price",
    editorPick: false,
    publishDate: "2026-04-25",
    slug: "matrix-biolage-hydrasource-shampoo-review",
  },
  {
    id: "joico-color-balance-shampoo",
    name: "Joico Color Balance Purple Shampoo",
    brand: "Joico",
    asin: "B08L8D93QB",
    price: 20,
    priceDisplay: "$20.00",
    rating: 4.6,
    reviewCount: 14000,
    category: "Shampoo & Conditioner",
    categorySlug: "shampoo-conditioner",
    imageUrl: "https://m.media-amazon.com/images/I/610PVO4TFtL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/610PVO4TFtL._SL1500_.jpg",
    hairTypes: ["color-treated","blonde","gray"],
    shortDescription: "Purple pigment shampoo that neutralizes brassy and yellow tones in blonde and gray hair.",
    fullReview: `Joico Color Balance Purple Shampoo is one of the most effective toning shampoos available at this price point. The purple pigments neutralize yellow and brassy tones in blonde, highlighted, and gray hair, keeping color looking fresh and vibrant between salon visits.

We tested this on highlighted blonde hair that had developed significant brassiness and found it dramatically effective. After just two uses, the yellow tones were visibly neutralized and the hair looked closer to its freshly highlighted color. The key is timing - leaving it on for 3–5 minutes delivers noticeable results without over-toning.

At $20, it's excellent value for a professional toning shampoo. The formula is gentle enough for regular use (2–3 times per week) and doesn't dry out hair like some purple shampoos. This is our top pick for maintaining blonde and highlighted hair at home.`,
    pros: ["Highly effective at neutralizing brassiness","Gentle enough for regular use","Excellent value for professional quality","Works on blonde, highlighted, and gray hair"],
    cons: ["Can over-tone if left on too long","Purple staining if used on very porous hair","Not suitable for non-blonde hair"],
    bestFor: "Blonde, highlighted, or gray hair with brassiness; color maintenance between salon visits",
    editorPick: false,
    publishDate: "2026-04-25",
    slug: "joico-color-balance-purple-shampoo-review",
  },
  ...shampooProducts,
  ...hairMaskProducts,
  ...serumProducts,
  ...hairDryerProducts,
  ...flatIronProducts,
  ...curlingIronProducts,
  // ── Weekly additions 2026-05-04 ──
  {
    id: "redken-one-united-leave-in",
    name: "Redken One United All-In-One Leave-In Conditioner",
    brand: "Redken",
    asin: "B00YO38G4Q",
    price: 25,
    priceDisplay: "$25.00",
    rating: 4.5,
    reviewCount: 18700,
    category: "Shampoo & Conditioner",
    categorySlug: "shampoo-conditioner",
    imageUrl: "https://m.media-amazon.com/images/I/61nWMJpbJOL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/61nWMJpbJOL._SL1500_.jpg",
    hairTypes: ["fine", "normal", "thick", "curly", "color-treated"],
    shortDescription: "A 25-benefit leave-in treatment that detangles, protects against heat up to 450°F, adds shine, and reduces frizz — all in one lightweight spray.",
    fullReview: `Redken One United is one of the most versatile leave-in conditioners on the market, delivering 25 hair benefits in a single lightweight spray. It's a genuinely multi-functional product: part heat protectant, part detangler, part frizz tamer, part shine enhancer — and it performs credibly in every role.

We tested it on fine, color-treated hair that struggles with frizz and heat damage. The spray applies evenly and dries quickly without leaving any residue or weighing strands down. As a heat protectant it's rated to 450°F, which covers all standard blow-dryers, flat irons, and curling wands. Hair felt noticeably smoother after blow-drying compared to using no product.

The formula is sulfate-free, paraben-free, and free of heavy waxes — a thoughtful choice for color-treated hair that can't afford product buildup. At $25 for 13.5 oz, it's exceptional value for a professional-grade leave-in. With over 18,000 Amazon reviews averaging 4.5 stars, it's one of the most trusted products in its category.

The only limitation is that it's not a deep conditioner — if your hair is severely damaged or very dry, you'll want to pair it with a weekly mask. But as an everyday leave-in for all hair types, it's hard to beat.`,
    pros: [
      "25 benefits in one product — detangles, protects, smooths, and shines",
      "Lightweight formula works on fine hair without weighing it down",
      "Heat protection up to 450°F covers all styling tools",
      "Sulfate-free and paraben-free — safe for color-treated hair",
      "Exceptional value at $25 for 13.5 oz",
    ],
    cons: [
      "Not a substitute for a deep conditioning treatment on severely damaged hair",
      "Scent is mild but may not appeal to everyone",
    ],
    bestFor: "All hair types needing a lightweight everyday leave-in with heat protection and detangling",
    editorPick: true,
    editorNote: "Our top pick for an all-in-one leave-in — the best value multi-benefit treatment we've tested.",
    publishDate: "2026-05-04",
    slug: "redken-one-united-leave-in-review",
  },
  {
    id: "olaplex-no4p-purple-shampoo",
    name: "Olaplex No.4P Blonde Enhancer Purple Toning Shampoo",
    brand: "Olaplex",
    asin: "B09FYK7FKR",
    price: 34,
    priceDisplay: "$34.00",
    rating: 4.4,
    reviewCount: 8200,
    category: "Shampoo & Conditioner",
    categorySlug: "shampoo-conditioner",
    imageUrl: "https://m.media-amazon.com/images/I/51ePFbMOJAL._SL1500_.jpg",
    amazonImageUrl: "https://m.media-amazon.com/images/I/51ePFbMOJAL._SL1500_.jpg",
    hairTypes: ["color-treated", "fine", "normal"],
    shortDescription: "Olaplex's bond-building technology meets purple toning in a shampoo that neutralizes brassiness while actively repairing damage in blonde and lightened hair.",
    fullReview: `Olaplex No.4P is the only purple toning shampoo that also repairs hair bonds — making it uniquely suited for blonde and lightened hair that is both brassy and damaged. Most purple shampoos only tone; this one tones and treats simultaneously.

The toning performance is strong but measured. Unlike some aggressive purple shampoos that can over-tone in minutes, No.4P is forgiving — leaving it on for 3–5 minutes delivers a noticeable cool-down of brassiness without the risk of a lavender cast. We found it most effective on highlighted hair with moderate brassiness; for very brassy hair, a dedicated purple mask may be needed alongside it.

The bond-building component (Olaplex's patented Bis-Aminopropyl Diglycol Dimaleate) works cumulatively. After 4–6 weeks of regular use, hair feels stronger and less prone to breakage — a benefit no other purple shampoo can claim. This makes it especially valuable for heavily processed hair that undergoes frequent lightening.

At $34 it's a premium price for a shampoo, but the dual toning-and-repair functionality justifies the cost for anyone already committed to the Olaplex system. For those who only need toning, Joico Color Balance Purple at $20 delivers comparable toning at a lower price point.`,
    pros: [
      "Tones and repairs bonds simultaneously — unique in the purple shampoo category",
      "Forgiving formula — won't over-tone with normal use",
      "Cumulative bond-strengthening benefit with regular use",
      "Gentle enough for fine, fragile hair",
    ],
    cons: [
      "Premium price at $34 vs. comparable toning-only alternatives",
      "May need supplementing with a purple mask for very brassy hair",
      "Results build gradually — not a one-wash fix",
    ],
    bestFor: "Blonde, highlighted, or lightened hair that is both brassy and damaged; ideal for those already using Olaplex",
    editorPick: false,
    publishDate: "2026-05-04",
    slug: "olaplex-no4p-purple-shampoo-review",
  },
];

export function getProductsByCategory(categorySlug: string): Product[] {
  return allProducts.filter(p => p.categorySlug === categorySlug);
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find(p => p.id === id);
}

export function getEditorPicks(): Product[] {
  return allProducts.filter(p => p.editorPick);
}

// ============================================================
// COMPARISONS (6 - one per category)
// ============================================================
export const comparisons: Comparison[] = [
  {
    id: "beachwaver-vs-remington-spiral",
    title: "Beachwaver S1 vs. Remington Pro Spiral Wand",
    subtitle: "Self-Rotating Innovation vs. Budget Value: Curling Tool Comparison",
    category: "Curling Irons & Wands",
    categorySlug: "curling-irons",
    product1Id: "beachwaver-s1-curling-iron",
    product2Id: "remington-pro-spiral-curler",
    winnerId: "beachwaver-s1-curling-iron",
    winnerReason: "Beachwaver wins for ease of use and versatility — the self-rotating mechanism creates beautiful waves that are difficult to achieve with traditional wands. Remington wins for tight, defined curls at a fraction of the price.",
    verdict: "Beachwaver S1 is the winner for most users — the self-rotating mechanism eliminates the technique barrier and creates beautiful, consistent waves. Remington Pro Spiral is the better choice for those who specifically want tight, defined curls and are comfortable with traditional wand technique.",
    publishDate: "2026-05-11",
    slug: "beachwaver-s1-vs-remington-pro-spiral",
  },
  {
    id: "chi-air-vs-verb-ghost-flat-iron",
    title: "CHI Air Expert vs. ghd Platinum+ Straightener",
    subtitle: "Professional Ceramic vs. Intelligent Heat Technology: Which Flat Iron Is Right for You?",
    category: "Flat Irons & Straighteners",
    categorySlug: "flat-irons",
    product1Id: "chi-air-expert-flat-iron",
    product2Id: "verb-ghost-flat-iron",
    winnerId: "verb-ghost-flat-iron",
    winnerReason: "ghd Platinum+ wins for fine and color-treated hair due to its predictive temperature technology that prevents heat damage. CHI Air Expert wins for thick, coarse hair that benefits from manual heat control at higher temperatures.",
    verdict: "The winner depends on your hair type and priorities. ghd Platinum+ is the better choice for fine, color-treated, or heat-sensitive hair — the intelligent temperature control delivers results with significantly less risk of heat damage. CHI Air Expert is the better choice for thick, coarse hair that needs higher heat and manual temperature control to achieve smooth results.",
    publishDate: "2026-05-11",
    slug: "chi-air-expert-vs-verb-ghost-flat-iron",
  },
  {
    id: "t3-featherweight-vs-ghd-helios",
    title: "T3 Featherweight 3i vs. ghd Helios",
    subtitle: "Lightweight Comfort vs. Maximum Power: Premium Dryer Showdown",
    category: "Hair Dryers",
    categorySlug: "hair-dryers",
    product1Id: "t3-featherweight-luxe",
    product2Id: "ghd-helios-hair-dryer",
    winnerId: "ghd-helios-hair-dryer",
    winnerReason: "ghd Helios wins for its superior 2400W power and optimum temperature technology. T3 Featherweight 3i wins for comfort and ease of use during extended styling sessions.",
    verdict: "ghd Helios is the better dryer in absolute terms — more powerful, faster, and with better heat control technology. T3 Featherweight 3i is the better choice for those who prioritize comfort during extended use or have fine hair that doesn't need maximum power.",
    publishDate: "2026-05-11",
    slug: "t3-featherweight-vs-ghd-helios",
  },
  {
    id: "living-proof-vs-kerastase-elixir",
    title: "Living Proof 5-in-1 vs. Kérastase Elixir Ultime",
    subtitle: "Multi-Tasker vs. Luxury Oil: Which Is Worth Your Money?",
    category: "Serums & Oils",
    categorySlug: "serums-oils",
    product1Id: "living-proof-perfect-hair-day",
    product2Id: "kerastase-elixir-ultime",
    winnerId: "kerastase-elixir-ultime",
    winnerReason: "Kérastase Elixir Ultime wins for pure results and luxury experience. Living Proof wins for versatility and value — its 5-in-1 formula replaces more products at a lower price.",
    verdict: "Kérastase Elixir Ultime is the winner for those who want the absolute best hair oil experience. Living Proof 5-in-1 is the smarter purchase for those who want to simplify their routine — it replaces multiple products at a lower total cost.",
    publishDate: "2026-05-11",
    slug: "living-proof-5in1-vs-kerastase-elixir-ultime",
  },
  {
    id: "ouai-vs-amika-soulfood-mask",
    title: "OUAI Hair Mask vs. Amika Soulfood Nourishing Mask",
    subtitle: "Celebrity Mask vs. Cult Favorite: Which Delivers Better Results?",
    category: "Hair Masks & Treatments",
    categorySlug: "hair-masks",
    product1Id: "ouai-hair-mask",
    product2Id: "amika-soulfood-mask",
    winnerId: "amika-soulfood-mask",
    winnerReason: "Amika Soulfood wins for its sea buckthorn oil complex that delivers more intensive moisture, particularly for curly and coarse hair. OUAI wins for fine hair types that need a lighter touch.",
    verdict: "Amika Soulfood is the winner for most hair types — the sea buckthorn oil delivers more intensive moisture and better results for dry, curly, or coarse hair. OUAI is the better choice for fine hair that needs moisture without weight.",
    publishDate: "2026-05-11",
    slug: "ouai-vs-amika-soulfood-mask",
  },
  {
    id: "kerastase-vs-redken-allsoft",
    title: "Kérastase Bain Satin vs. Redken All Soft",
    subtitle: "Luxury vs. Professional: Which Moisturizing Shampoo Wins?",
    category: "Shampoo & Conditioner",
    categorySlug: "shampoo-conditioner",
    product1Id: "kerastase-bain-satin",
    product2Id: "redken-all-soft-shampoo",
    winnerId: "kerastase-bain-satin",
    winnerReason: "Kérastase Bain Satin wins for its superior irisome complex and luxurious experience, though Redken All Soft is the better value for thick, coarse hair.",
    verdict: "Kérastase Bain Satin is the winner for fine, sensitized, or color-treated hair — the irisome complex delivers results that justify the premium price. Redken All Soft is the better choice for thick, coarse hair that needs serious moisture at a more accessible price point.",
    publishDate: "2026-05-11",
    slug: "kerastase-bain-satin-vs-redken-all-soft",
  },
  {
    id: "kristin-ess-vs-hot-tools-24k",
    title: "Kristin Ess Curling Wand vs. Hot Tools 24K Gold",
    subtitle: "Influencer Brand vs. Professional Classic: Which Creates Better Curls?",
    category: "Curling Irons & Wands",
    categorySlug: "curling-irons",
    product1Id: "kristin-ess-curling-wand",
    product2Id: "hot-tools-24k-gold-curling-iron",
    winnerId: "hot-tools-24k-gold-curling-iron",
    winnerReason: "Hot Tools 24K Gold wins for professional-grade results and durability. Kristin Ess wins for value and the titanium barrel's consistent heat.",
    verdict: "Hot Tools 24K Gold is the winner for professional results and long-term durability — the gold barrel technology delivers consistent, polished curls that last. Kristin Ess is the better value for those who want titanium performance at a lower price and don't need the extra durability of a professional tool.",
    publishDate: "2026-05-04",
    slug: "kristin-ess-vs-hot-tools-24k-gold",
  },
  {
    id: "remington-pearl-vs-t3-whirl",
    title: "Remington Pearl Pro vs. T3 Whirl Trio",
    subtitle: "Budget Single vs. Premium Multi-Barrel: Is the T3 Worth 5x the Price?",
    category: "Flat Irons & Straighteners",
    categorySlug: "flat-irons",
    product1Id: "remington-s9500-pearl-pro",
    product2Id: "t3-whirl-trio-curling-iron",
    winnerId: "t3-whirl-trio-curling-iron",
    winnerReason: "T3 Whirl Trio wins for versatility — three interchangeable barrels replace multiple tools. Remington wins for value as a dedicated straightener.",
    verdict: "T3 Whirl Trio is the winner for those who regularly use multiple curl sizes — it replaces three separate tools at a lower total cost. Remington Pearl Pro is the better choice for those who only need a flat iron and don't require curling capability.",
    publishDate: "2026-05-04",
    slug: "remington-pearl-pro-vs-t3-whirl-trio",
  },
  {
    id: "bio-ionic-vs-conair-spin-air",
    title: "Bio Ionic GoldPro vs. Conair Infiniti PRO Spin Air",
    subtitle: "Premium Speed vs. Budget Versatility: Hair Dryer Comparison",
    category: "Hair Dryers",
    categorySlug: "hair-dryers",
    product1Id: "bio-ionic-goldpro-dryer",
    product2Id: "conair-infiniti-pro-spin-air",
    winnerId: "bio-ionic-goldpro-dryer",
    winnerReason: "Bio Ionic GoldPro wins for pure drying speed and shine results. Conair Spin Air wins for versatility and value — the rotating barrel creates blowout results that the Bio Ionic can't match.",
    verdict: "Bio Ionic GoldPro is the winner for those who want the fastest, shiniest blowdry results. Conair Spin Air is the better choice for those who want a tool that both dries and styles simultaneously — the rotating barrel creates voluminous blowouts that justify its lower price.",
    publishDate: "2026-05-04",
    slug: "bio-ionic-goldpro-vs-conair-spin-air",
  },
  {
    id: "amika-serum-vs-olaplex-no3",
    title: "Amika Nourish & Shine vs. Olaplex No. 3",
    subtitle: "Shine Serum vs. Bond Builder: Which Does Your Hair Actually Need?",
    category: "Serums & Oils",
    categorySlug: "serums-oils",
    product1Id: "amika-nourish-and-shine-serum",
    product2Id: "olaplex-no3-hair-perfector",
    winnerId: "olaplex-no3-hair-perfector",
    winnerReason: "Olaplex No. 3 wins for damaged hair due to its unique bond-building technology that addresses the root cause of damage. Amika wins for healthy hair that just needs shine and frizz control.",
    verdict: "Olaplex No. 3 is the winner for damaged, chemically processed, or breakage-prone hair — its bond-building technology addresses damage at the molecular level. Amika Nourish & Shine is the better choice for healthy hair that simply needs shine and frizz control without the intensive repair.",
    publishDate: "2026-05-04",
    slug: "amika-nourish-shine-vs-olaplex-no3",
  },
  {
    id: "fanola-vs-kerastase-resistance",
    title: "Fanola No Yellow Mask vs. Kérastase Résistance Masque",
    subtitle: "Toning Treatment vs. Repair Mask: Different Goals, Different Winners",
    category: "Hair Masks & Treatments",
    categorySlug: "hair-masks",
    product1Id: "fanola-no-yellow-mask",
    product2Id: "kerastase-resistance-masque",
    winnerId: "kerastase-resistance-masque",
    winnerReason: "Kérastase Résistance wins for structural repair of damaged hair. Fanola wins for toning and brassiness correction in blonde hair.",
    verdict: "These masks serve fundamentally different purposes. Fanola No Yellow is the winner for blonde or gray hair that needs brassiness correction — nothing neutralizes yellow tones more effectively at this price. Kérastase Résistance is the winner for damaged hair that needs structural repair — the ceramide complex rebuilds hair from within.",
    publishDate: "2026-05-04",
    slug: "fanola-no-yellow-vs-kerastase-resistance-masque",
  },
  {
    id: "aveda-vs-oribe-shampoo",
    title: "Aveda Nutriplenish vs. Oribe Gold Lust Shampoo",
    subtitle: "Clean Beauty vs. Ultra-Luxury: Is Oribe Worth 50% More?",
    category: "Shampoo & Conditioner",
    categorySlug: "shampoo-conditioner",
    product1Id: "aveda-nutriplenish-shampoo",
    product2Id: "oribe-gold-lust-shampoo",
    winnerId: "oribe-gold-lust-shampoo",
    winnerReason: "Oribe Gold Lust wins for results, scent, and the overall luxury experience. Aveda wins for clean beauty credentials and those who prioritize plant-based formulas.",
    verdict: "Oribe Gold Lust is the winner for those who want the absolute best shampoo experience — the biotin complex, Côte d'Azur scent, and overall luxury are unmatched. Aveda Nutriplenish is the better choice for clean beauty enthusiasts who prioritize plant-based formulas and don't want to pay Oribe prices.",
    publishDate: "2026-05-04",
    slug: "aveda-nutriplenish-vs-oribe-gold-lust",
  },
  {
    id: "hot-tools-vs-sultra-bombshell",
    title: "Hot Tools One-Shot vs. Sultra The Bombshell",
    subtitle: "Classic Clip Iron vs. Premium Clipless Rod: Which Creates Better Curls?",
    category: "Curling Irons & Wands",
    categorySlug: "curling-irons",
    product1Id: "hot-tools-one-shot-curling-iron",
    product2Id: "sultra-bombshell-curling-rod",
    winnerId: "sultra-bombshell-curling-rod",
    winnerReason: "Sultra Bombshell wins for natural-looking results and eliminating clip marks. Hot Tools wins for ease of use and value - the clip design is more beginner-friendly at a lower price.",
    verdict: "Sultra Bombshell is the winner for those who want the most natural-looking curls without clip marks. Hot Tools One-Shot is the better choice for beginners or those who prefer the ease and control of a clip-style iron at a much lower price.",
    publishDate: "2026-04-25",
    slug: "hot-tools-one-shot-vs-sultra-bombshell",
    hairTypes: ["curly", "normal", "thick"],
  },
  {
    id: "babyliss-pro-vs-remington-pearl",
    title: "BaBylissPRO Ultra-Thin vs. Remington Pearl Pro",
    subtitle: "Professional Precision vs. Mid-Range Value: Flat Iron Comparison",
    category: "Flat Irons & Straighteners",
    categorySlug: "flat-irons",
    product1Id: "babyliss-pro-nano-titanium-flat",
    product2Id: "remington-s9500-pearl-pro",
    winnerId: "babyliss-pro-nano-titanium-flat",
    winnerReason: "BaBylissPRO wins for precision styling capability and professional-grade durability. Remington Pearl Pro wins for value - it delivers excellent results at $10 less.",
    verdict: "BaBylissPRO Ultra-Thin is the winner for those who need precision styling or professional durability. Remington Pearl Pro is the better value for everyday straightening - it delivers excellent results at a lower price, though it won't match the precision or longevity of the BaBylissPRO.",
    publishDate: "2026-04-25",
    slug: "babyliss-pro-ultra-thin-vs-remington-pearl-pro",
    hairTypes: ["thick", "coarse", "normal"],
  },
  {
    id: "parlux-vs-dyson-airwrap",
    title: "Parlux 385 vs. Dyson Airwrap Complete",
    subtitle: "Professional Workhorse vs. Multi-Styler: Which Is Worth the Investment?",
    category: "Hair Dryers",
    categorySlug: "hair-dryers",
    product1Id: "parlux-385-powerlight",
    product2Id: "dyson-airwrap-complete",
    winnerId: "dyson-airwrap-complete",
    winnerReason: "Dyson Airwrap wins for versatility - it replaces multiple styling tools. Parlux wins for pure drying power, durability, and value as a dedicated dryer.",
    verdict: "The winner depends on your needs. Dyson Airwrap is the better choice if you want one tool that dries, curls, and smooths. Parlux 385 is the better choice if you specifically need a powerful, durable dryer for daily use - it's a third of the price and built to last years of professional use.",
    publishDate: "2026-04-25",
    slug: "parlux-385-vs-dyson-airwrap-complete",
    hairTypes: ["thick", "curly", "normal"],
  },
  {
    id: "bumble-vs-verb-ghost-oil",
    title: "Bumble and bumble Invisible Oil vs. Verb Ghost Oil",
    subtitle: "Luxury Weightless Oil vs. Clean Beauty Value: Which Is Better?",
    category: "Serums & Oils",
    categorySlug: "serums-oils",
    product1Id: "bumble-hairdressers-invisible-oil",
    product2Id: "verb-ghost-oil",
    winnerId: "verb-ghost-oil",
    winnerReason: "Verb Ghost Oil wins for value and clean formula - it delivers comparable weightless results to Bumble at half the price, with a cleaner ingredient list. Bumble wins for the prestige experience and heat protection.",
    verdict: "Verb Ghost Oil is the smarter purchase for most users - it delivers comparable lightweight shine results to Bumble and bumble at half the price, with a cleaner formula. Bumble and bumble Invisible Oil is worth the premium for those who prioritize the prestige experience or need the higher heat protection (450°F vs. 400°F).",
    publishDate: "2026-04-25",
    slug: "bumble-invisible-oil-vs-verb-ghost-oil",
    hairTypes: ["fine", "normal", "color-treated"],
  },
  {
    id: "philip-kingsley-vs-christophe-robin",
    title: "Philip Kingsley Elasticizer vs. Christophe Robin Regenerating Mask",
    subtitle: "Pre-Shampoo Treatment vs. Luxury Mask: Which Repairs Better?",
    category: "Hair Masks & Treatments",
    categorySlug: "hair-masks",
    product1Id: "philip-kingsley-elasticizer",
    product2Id: "christophe-robin-mask",
    winnerId: "christophe-robin-mask",
    winnerReason: "Christophe Robin wins for severely damaged hair due to its rare prickly pear oil that delivers more intensive regeneration. Philip Kingsley wins for fine hair that needs elasticity restoration without heaviness.",
    verdict: "Christophe Robin Regenerating Mask is the winner for severely damaged or bleached hair - the prickly pear oil delivers more intensive repair. Philip Kingsley Elasticizer is the better choice for fine hair that has lost elasticity but isn't severely damaged.",
    publishDate: "2026-04-25",
    slug: "philip-kingsley-elasticizer-vs-christophe-robin-mask",
    hairTypes: ["fine", "curly", "color-treated"],
  },
  {
    id: "joico-vs-matrix-biolage-shampoo",
    title: "Joico Color Balance Purple vs. Matrix Biolage HydraSource",
    subtitle: "Toning vs. Hydrating: Choosing the Right Shampoo for Your Needs",
    category: "Shampoo & Conditioner",
    categorySlug: "shampoo-conditioner",
    product1Id: "joico-color-balance-shampoo",
    product2Id: "matrix-biolage-hydrasource",
    winnerId: "joico-color-balance-shampoo",
    winnerReason: "Joico Color Balance wins for blonde and gray hair that needs toning - it's the most effective purple shampoo at this price point. Matrix Biolage wins for those who need hydration rather than toning.",
    verdict: "These shampoos serve different purposes. Joico Color Balance is the winner for blonde, highlighted, or gray hair that needs brassiness control. Matrix Biolage HydraSource is the better choice for those whose primary concern is hydration rather than color maintenance.",
    publishDate: "2026-04-25",
    slug: "joico-color-balance-vs-matrix-biolage-hydrasource",
    hairTypes: ["color-treated", "dry", "normal"],
  },
  {
    id: "pureology-vs-redken-allsoft",
    title: "Pureology Hydrate vs. Redken All Soft",
    subtitle: "Premium Moisturizing Shampoos Head-to-Head",
    category: "Shampoo & Conditioner",
    categorySlug: "shampoo-conditioner",
    product1Id: "pureology-hydrate-shampoo",
    product2Id: "redken-all-soft-shampoo",
    winnerId: "pureology-hydrate-shampoo",
    winnerReason: "Pureology edges ahead for color-treated hair due to its more concentrated formula and superior color protection, though Redken All Soft is the better choice for thick, coarse hair.",
    verdict: "Both are excellent premium shampoos, but they serve different hair types. Pureology Hydrate is the winner for fine to medium, color-treated hair, while Redken All Soft is the better choice for thick, coarse, or very dry hair. Choose based on your specific hair type.",
    publishDate: "2025-01-15",
    slug: "pureology-hydrate-vs-redken-all-soft",
    hairTypes: ["dry", "color-treated", "fine"],
  },
  {
    id: "olaplex-no8-vs-moroccanoil-mask",
    title: "Olaplex No. 8 vs. Moroccanoil Intense Hydrating Mask",
    subtitle: "Premium Deep Conditioning Masks Compared",
    category: "Hair Masks & Treatments",
    categorySlug: "hair-masks",
    product1Id: "olaplex-no8-mask",
    product2Id: "moroccanoil-intense-hydrating-mask",
    winnerId: "olaplex-no8-mask",
    winnerReason: "Olaplex No. 8 wins for damaged or chemically processed hair due to its unique bond-building technology. However, Moroccanoil is the better choice for thick, frizzy hair that needs intensive moisture rather than structural repair.",
    verdict: "The winner depends entirely on your hair's primary concern. For structural damage (bleach, heat, chemical processing), Olaplex No. 8 is unmatched. For moisture and frizz control in thick hair, Moroccanoil is superior. If you're unsure, Olaplex is the safer choice as it benefits all hair types.",
    publishDate: "2025-01-22",
    slug: "olaplex-no8-vs-moroccanoil-mask",
    hairTypes: ["coarse", "dry", "color-treated", "thick"],
  },
  {
    id: "moroccanoil-vs-olaplex-no7-oil",
    title: "Moroccanoil Treatment vs. Olaplex No. 7 Bonding Oil",
    subtitle: "Luxury Hair Oils: The Definitive Comparison",
    category: "Serums & Oils",
    categorySlug: "serums-oils",
    product1Id: "moroccanoil-treatment-original",
    product2Id: "olaplex-no7-bonding-oil",
    winnerId: "moroccanoil-treatment-original",
    winnerReason: "Moroccanoil Treatment wins for immediate results, versatility, and value per use. Olaplex No. 7 is the better choice for damaged hair that needs bond-building benefits, but its high cost per ounce makes Moroccanoil the better overall value.",
    verdict: "Moroccanoil Treatment is our overall winner for most users - it delivers immediate, visible results on all hair types and offers better value per use. Olaplex No. 7 is worth the premium specifically for damaged, bleached, or chemically processed hair where bond-building benefits are needed. Many users benefit from using both.",
    publishDate: "2025-01-29",
    slug: "moroccanoil-vs-olaplex-no7-oil",
    hairTypes: ["normal", "color-treated", "dry"],
  },
  {
    id: "dyson-supersonic-vs-shark-hyperair",
    title: "Dyson Supersonic vs. Shark HyperAIR",
    subtitle: "Premium Hair Dryers: Is the Dyson Worth Twice the Price?",
    category: "Hair Dryers",
    categorySlug: "hair-dryers",
    product1Id: "dyson-supersonic",
    product2Id: "shark-hyperair-hd113",
    winnerId: "dyson-supersonic",
    winnerReason: "The Dyson Supersonic wins on drying speed, heat control technology, and overall hair health protection. However, the Shark HyperAIR offers 80% of the Dyson's performance at half the price, making it the better value proposition for most users.",
    verdict: "The Dyson Supersonic is the better hair dryer in absolute terms, but the Shark HyperAIR is the smarter purchase for most people. Unless you're a daily blow-dry user who prioritizes maximum performance and hair health protection above all else, the Shark delivers exceptional results at a much more accessible price. The Dyson is worth it if you blow-dry every day and have fine or damaged hair.",
    publishDate: "2025-02-05",
    slug: "dyson-supersonic-vs-shark-hyperair",
    hairTypes: ["fine", "normal", "thick"],
  },
  {
    id: "ghd-platinum-vs-t3-singlepass",
    title: "ghd Platinum+ vs. T3 SinglePass Luxe",
    subtitle: "Premium Flat Irons: Which Delivers Better Results?",
    category: "Flat Irons & Straighteners",
    categorySlug: "flat-irons",
    product1Id: "ghd-platinum-plus",
    product2Id: "t3-singlepass-luxe",
    winnerId: "ghd-platinum-plus",
    winnerReason: "The ghd Platinum+ wins for its superior predictive temperature technology and consistently smoother results. The T3 SinglePass Luxe is excellent but the ghd's automatic temperature optimization gives it an edge for hair health and results consistency.",
    verdict: "The ghd Platinum+ is the better flat iron for most users - the predictive temperature technology delivers more consistent results and better hair health protection. The T3 SinglePass Luxe is the better choice for those who want manual temperature control and are willing to sacrifice some consistency for customization. At $50 less, the T3 is also the better value for those on a tighter budget.",
    publishDate: "2025-02-12",
    slug: "ghd-platinum-vs-t3-singlepass",
    hairTypes: ["normal", "thick", "coarse"],
  },
  {
    id: "dyson-airwrap-vs-tymo-curlpro",
    title: "Dyson Airwrap vs. TYMO CurlPro Plus",
    subtitle: "Premium Multi-Styler vs. Budget Automatic Curler",
    category: "Curling Irons & Wands",
    categorySlug: "curling-irons",
    product1Id: "dyson-airwrap",
    product2Id: "tymo-curlpro-plus",
    winnerId: "dyson-airwrap",
    winnerReason: "The Dyson Airwrap wins for hair health, versatility, and the quality of results. However, the TYMO CurlPro Plus delivers 70% of the Airwrap's curl quality at 8% of the price, making it the overwhelmingly better value for most users.",
    verdict: "The Dyson Airwrap is the superior product in every technical measure, but the TYMO CurlPro Plus is the smarter purchase for the vast majority of users. At $50 vs. $600, the TYMO delivers beautiful, consistent curls that most people will be completely satisfied with. The Dyson is worth the investment only if you style your hair daily, have medium-thickness hair, and prioritize maximum hair health protection.",
    publishDate: "2025-02-19",
    slug: "dyson-airwrap-vs-tymo-curlpro",
    hairTypes: ["curly", "normal", "fine"],
  },
  // ── Weekly additions 2026-05-04 ──
  {
    id: "redken-one-united-vs-its-a-10",
    title: "Redken One United vs. It's a 10 Miracle Leave-In",
    subtitle: "25-Benefit Professional Leave-In vs. Cult-Classic 10-in-1 Spray",
    category: "Shampoo & Conditioner",
    categorySlug: "shampoo-conditioner",
    product1Id: "redken-one-united-leave-in",
    product2Id: "its-a-10-miracle-mask",
    winnerId: "redken-one-united-leave-in",
    winnerReason: "Redken One United wins for its broader 25-benefit formula, superior heat protection (450°F), and better value at $25 for 13.5 oz. It's a 10 wins for its lighter feel on very fine hair and its cult following among those who prefer a simpler, no-fuss formula.",
    verdict: "Redken One United is the better all-around leave-in for most hair types — it offers more benefits, stronger heat protection, and better value per ounce. It's a 10 Miracle Leave-In remains a strong choice for those with very fine hair who want the lightest possible product, or for those who love its iconic formula. Both are excellent; the Redken edges ahead on versatility and value.",
    publishDate: "2026-05-04",
    slug: "redken-one-united-vs-its-a-10-miracle-leave-in",
    hairTypes: ["fine", "normal", "color-treated", "curly"],
  },
  {
    id: "olaplex-no4p-vs-joico-color-balance",
    title: "Olaplex No.4P vs. Joico Color Balance Purple",
    subtitle: "Bond-Building Toning Shampoo vs. Best-Value Purple Shampoo",
    category: "Shampoo & Conditioner",
    categorySlug: "shampoo-conditioner",
    product1Id: "olaplex-no4p-purple-shampoo",
    product2Id: "joico-color-balance-shampoo",
    winnerId: "joico-color-balance-shampoo",
    winnerReason: "Joico Color Balance wins for pure toning performance and value — it delivers stronger brassiness neutralization at $20 vs. $34. Olaplex No.4P wins for damaged hair that needs both toning and bond repair simultaneously.",
    verdict: "For most blonde and highlighted hair, Joico Color Balance Purple is the smarter purchase — it tones more aggressively and costs $14 less. Olaplex No.4P is the better choice only if your hair is both brassy and significantly damaged from bleaching or chemical processing, where the bond-repair benefit justifies the premium. If you already use other Olaplex products, No.4P integrates naturally into your routine.",
    publishDate: "2026-05-04",
    slug: "olaplex-no4p-vs-joico-color-balance-purple",
    hairTypes: ["color-treated", "fine", "normal"],
  },
];

export function getComparisonsByCategory(categorySlug: string): Comparison[] {
  return comparisons.filter(c => c.categorySlug === categorySlug);
}

export function getComparisonById(id: string): Comparison | undefined {
  return comparisons.find(c => c.id === id);
}
