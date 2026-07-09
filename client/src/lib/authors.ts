// SilkierStrands.com — Editorial Author Personas
// These are pen-name authors used for editorial attribution.
// No fabricated credentials or certifications are claimed.

export interface Author {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  shortBio: string;
  url: string;
  /** Placeholder image — replace with a real photo when available */
  imageUrl: string;
}

export const authors: Author[] = [
  {
    id: "renata-cole",
    slug: "renata-cole",
    name: "Renata Cole",
    role: "Lead Beauty Editor",
    bio: "Renata leads the editorial team at SilkierStrands, overseeing product selection, testing standards, and review quality. She has spent years writing about hair care and beauty, with a focus on finding products that genuinely deliver — not just ones with impressive marketing. Her reviews prioritise real-world performance across different hair types, honest pros and cons, and value for money.",
    shortBio: "Lead Beauty Editor at SilkierStrands. Focused on real-world product performance and honest, unsponsored reviews.",
    url: "https://silkierstrands.com/author/renata-cole",
    imageUrl: "",
  },
  {
    id: "jamie-lin",
    slug: "jamie-lin",
    name: "Jamie Lin",
    role: "Reviews Editor",
    bio: "Jamie covers styling tools and hair treatments at SilkierStrands, with a particular interest in the science behind hair care formulas and heat-styling technology. Before joining the team, Jamie spent time testing consumer electronics and personal care products. Her approach is methodical: she tests every product over a minimum two-week period and documents results across multiple hair types before writing a verdict.",
    shortBio: "Reviews Editor at SilkierStrands. Specialises in styling tools, treatments, and evidence-based hair care.",
    url: "https://silkierstrands.com/author/jamie-lin",
    imageUrl: "",
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find(a => a.slug === slug);
}

export function getAuthorById(id: string): Author | undefined {
  return authors.find(a => a.id === id);
}

// ─── Author assignment map ────────────────────────────────────────────────────
// Distributes bylines across both authors (roughly 50/50, alternating by slug).
// Products/comparisons not in this map fall back to "renata-cole".
// To reassign a byline, change the value here — no other file needs editing.

const PRODUCT_AUTHOR_MAP: Record<string, string> = {
  // Shampoo & Conditioner
  "pureology-hydrate-shampoo-review": "renata-cole",
  "redken-all-soft-shampoo-review": "jamie-lin",
  "loreal-elvive-hyaluron-plump-review": "renata-cole",
  "pantene-daily-moisture-renewal-review": "jamie-lin",
  "nexxus-therappe-humectress-review": "renata-cole",
  "native-coconut-vanilla-shampoo-review": "jamie-lin",
  "wella-enrich-moisturizing-shampoo-review": "renata-cole",
  "kerastase-bain-satin-shampoo-review": "jamie-lin",
  "oribe-gold-lust-shampoo-review": "renata-cole",
  "aveda-nutriplenish-deep-moisture-shampoo-review": "jamie-lin",
  "matrix-biolage-hydrasource-shampoo-review": "renata-cole",
  "joico-color-balance-purple-shampoo-review": "jamie-lin",
  "olaplex-no4p-purple-shampoo-review": "renata-cole",
  // Hair Masks & Treatments
  "olaplex-no8-mask-review": "renata-cole",
  "moroccanoil-intense-hydrating-mask-review": "jamie-lin",
  "its-a-10-miracle-mask-review": "renata-cole",
  "briogeo-dont-despair-mask-review": "jamie-lin",
  "karseell-collagen-hair-mask-review": "renata-cole",
  "sunatoria-korean-keratin-mask-review": "jamie-lin",
  "amika-soulfood-nourishing-mask-review": "renata-cole",
  "ouai-hair-mask-review": "jamie-lin",
  "kerastase-resistance-masque-therapiste-review": "renata-cole",
  "fanola-no-yellow-mask-review": "jamie-lin",
  "christophe-robin-regenerating-mask-review": "renata-cole",
  "philip-kingsley-elasticizer-review": "jamie-lin",
  "olaplex-no3-hair-perfector-review": "renata-cole",
  "k18-leave-in-molecular-repair-mask-review": "jamie-lin",
  "briogeo-dont-despair-repair-mask-review": "renata-cole",
  // Serums & Oils
  "moroccanoil-treatment-review": "renata-cole",
  "olaplex-no7-bonding-oil-review": "jamie-lin",
  "alfaparf-cristalli-liquidi-review": "renata-cole",
  "ogx-argan-oil-morocco-review": "jamie-lin",
  "maree-hair-oil-review": "renata-cole",
  "john-frieda-frizz-ease-serum-review": "jamie-lin",
  "kerastase-elixir-ultime-hair-oil-review": "renata-cole",
  "living-proof-perfect-hair-day-review": "jamie-lin",
  "amika-nourish-and-shine-serum-review": "renata-cole",
  "verb-ghost-oil-review": "jamie-lin",
  "bumble-hairdressers-invisible-oil-review": "renata-cole",
  "mielle-rosemary-mint-hair-oil-review": "jamie-lin",
  "moroccanoil-treatment-original-review": "renata-cole",
  "olaplex-no9-bond-protector-review": "jamie-lin",
  "redken-one-united-leave-in-review": "renata-cole",
  "itsa10-miracle-leave-in-product-review": "jamie-lin",
  "kenra-platinum-blow-dry-spray-review": "renata-cole",
  // Hair Dryers
  "dyson-supersonic-review": "jamie-lin",
  "shark-hyperair-hair-dryer-review": "renata-cole",
  "hot-tools-tourmaline-2000-review": "jamie-lin",
  "revlon-one-step-volumizer-review": "renata-cole",
  "conair-infiniti-pro-hair-dryer-review": "jamie-lin",
  "babyliss-nano-titanium-dryer-review": "renata-cole",
  "wavytalk-professional-ionic-hair-dryer-review": "jamie-lin",
  "ghd-helios-professional-hair-dryer-review": "renata-cole",
  "t3-featherweight-luxe-hair-dryer-review": "jamie-lin",
  "parlux-385-powerlight-hair-dryer-review": "renata-cole",
  "bio-ionic-goldpro-speed-dryer-review": "jamie-lin",
  // Flat Irons
  "ghd-platinum-plus-review": "jamie-lin",
  "t3-singlepass-luxe-review": "renata-cole",
  "tymo-ring-straightener-brush-review": "jamie-lin",
  "hsi-professional-glider-review": "renata-cole",
  "remington-pearl-pro-flat-iron-review": "jamie-lin",
  "babyliss-ultra-thin-titanium-review": "renata-cole",
  "remington-shine-therapy-2-inch-flat-iron-review": "jamie-lin",
  "ghd-platinum-plus-hair-straightener-review": "renata-cole",
  "babyliss-pro-nano-titanium-flat-iron-review": "jamie-lin",
  "chi-air-expert-flat-iron-review": "renata-cole",
  "remington-s9500-pearl-pro-flat-iron-review": "jamie-lin",
  // Curling Irons
  "dyson-airwrap-review": "jamie-lin",
  "tymo-curlpro-plus-review": "renata-cole",
  "hot-tools-24k-gold-curling-iron-review": "jamie-lin",
  "revlon-salon-one-step-plus-review": "renata-cole",
  "conair-double-ceramic-curling-iron-review": "jamie-lin",
  "nume-classic-curling-wand-review": "renata-cole",
  "kristin-ess-curling-wand-review": "jamie-lin",
  "t3-whirl-trio-curling-iron-review": "renata-cole",
  "beachwaver-s1-rotating-curling-iron-review": "jamie-lin",
  "dyson-airwrap-complete-long-review": "renata-cole",
  "hot-tools-one-shot-curling-iron-review": "jamie-lin",
  "sultra-bombshell-curling-rod-review": "renata-cole",
  "conair-infiniti-pro-spin-air-review": "jamie-lin",
  "remington-pro-spiral-curling-wand-review": "renata-cole",
  // Curly / textured hair
  "sheamoisture-curl-enhancing-smoothie-review": "renata-cole",
  "mielle-pomegranate-honey-curl-cream-review": "jamie-lin",
};

const COMPARISON_AUTHOR_MAP: Record<string, string> = {
  "pureology-hydrate-vs-redken-all-soft": "renata-cole",
  "olaplex-no8-vs-moroccanoil-mask": "jamie-lin",
  "moroccanoil-vs-olaplex-no7-oil": "renata-cole",
  "dyson-supersonic-vs-shark-hyperair": "jamie-lin",
  "ghd-platinum-vs-t3-singlepass": "renata-cole",
  "dyson-airwrap-vs-tymo-curlpro": "jamie-lin",
  "redken-one-united-vs-its-a-10-miracle-leave-in": "renata-cole",
  "olaplex-no4p-vs-joico-color-balance-purple": "jamie-lin",
  "olaplex-no9-bond-protector-vs-verb-ghost-oil": "renata-cole",
  "olaplex-no9-bond-protector-vs-olaplex-no7-bonding-oil": "jamie-lin",
  "sheamoisture-curl-smoothie-vs-mielle-pomegranate-honey-curl-cream": "renata-cole",
  "sheamoisture-curl-smoothie-vs-itsa10-miracle-leave-in": "jamie-lin",
  "itsa10-miracle-leave-in-vs-redken-one-united": "renata-cole",
  "moroccanoil-treatment-vs-olaplex-no7-bonding-oil": "jamie-lin",
  "k18-molecular-repair-vs-briogeo-dont-despair-repair": "renata-cole",
  "sheamoisture-manuka-honey-vs-christophe-robin-regenerating-mask": "jamie-lin",
  "remington-shine-therapy-vs-remington-pearl-pro": "renata-cole",
  "wavytalk-ionic-hair-dryer-vs-conair-infiniti-pro": "jamie-lin",
  "kenra-platinum-blow-dry-spray-vs-redken-one-united": "renata-cole",
  "mielle-rosemary-mint-oil-vs-kerastase-elixir-ultime": "jamie-lin",
  "beachwaver-s1-vs-remington-pro-spiral": "renata-cole",
  "chi-air-expert-vs-verb-ghost-flat-iron": "jamie-lin",
  "t3-featherweight-vs-ghd-helios": "renata-cole",
  "living-proof-5in1-vs-kerastase-elixir-ultime": "jamie-lin",
  "ouai-vs-amika-soulfood-mask": "renata-cole",
  "kerastase-bain-satin-vs-redken-all-soft": "jamie-lin",
  "kristin-ess-vs-hot-tools-24k-gold": "renata-cole",
  "remington-pearl-pro-vs-t3-whirl-trio": "jamie-lin",
  "bio-ionic-goldpro-vs-conair-spin-air": "renata-cole",
  "amika-nourish-shine-vs-olaplex-no3": "jamie-lin",
  "fanola-no-yellow-vs-kerastase-resistance-masque": "renata-cole",
  "aveda-nutriplenish-vs-oribe-gold-lust": "jamie-lin",
  "hot-tools-one-shot-vs-sultra-bombshell": "renata-cole",
  "babyliss-pro-ultra-thin-vs-remington-pearl-pro": "jamie-lin",
  "parlux-385-vs-dyson-airwrap-complete": "renata-cole",
  "bumble-invisible-oil-vs-verb-ghost-oil": "jamie-lin",
  "philip-kingsley-elasticizer-vs-christophe-robin-mask": "renata-cole",
  "joico-color-balance-vs-matrix-biolage-hydrasource": "jamie-lin",
};

const DEFAULT_AUTHOR_ID = "renata-cole";

export function getAuthorForProduct(slug: string): Author {
  const authorId = PRODUCT_AUTHOR_MAP[slug] ?? DEFAULT_AUTHOR_ID;
  return getAuthorById(authorId) ?? authors[0];
}

export function getAuthorForComparison(slug: string): Author {
  const authorId = COMPARISON_AUTHOR_MAP[slug] ?? DEFAULT_AUTHOR_ID;
  return getAuthorById(authorId) ?? authors[0];
}
