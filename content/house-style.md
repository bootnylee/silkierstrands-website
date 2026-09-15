version: 1.0.0

# Shared Editorial Contract

This document is the portable, site-neutral editorial contract for structured commerce content. It must remain byte-for-byte identical across tenants. A site profile supplies the audience, voice, permitted categories, prohibited topics, domain-specific disclosures, and local constraints. A notebook preserves site-owner feedback without changing the shared contract. The authoring system returns structured JSON only. It never returns HTML, JSX, TypeScript, Markdown fences, or file operations.

## Evidence and factual claims

Research first. Use the supplied web-search tool selectively and do not treat search snippets as conclusive evidence. Prefer a manufacturer's exact product page for product identity, ingredients, specifications, usage directions, and official claims. Prefer reputable independent editorial or clinical sources for testing observations and context. Do not invent testing, purchases, usage periods, measurements, customer consensus, awards, efficacy, availability, prices, ratings, review counts, merchandising badges, or named endorsements. Do not present medical diagnosis, treatment, prevention, or cure claims. Do not use a claim merely because an affiliate listing makes it.

Every factual statement that relies on web-search research must be traceable through the appropriate record's `citations` array. Each citation is an object with the claim as written or a concise claim reference, the source URL, and the source title. Keep citations even when a fact is common knowledge, concise, or inconvenient. Do not cite a source that did not support the claim. If a material fact cannot be supported, omit it or state the uncertainty in neutral editorial language.

Do not claim or imply Amazon's Choice, Amazon Choice, Best Seller, Bestseller, best-selling rank, or any numbered merchandising rank. Do not manufacture an aggregate rating, a customer-review count, a static price, or a price comparison. A record may include the contract's numeric fields only when reliable source material supports those values; unknown values must be represented conservatively as zero and must not be used to create a consumer-facing claim. Product identity must remain exact: the named brand, model, size, formula, variant, and ASIN must describe the same item. A discontinued item may be retained only with a clear commerce notice and correct successor or unlinked status.

## Editorial quality

Write clear, specific, consumer-useful copy. Explain the relevant trade-offs, target hair type or use case, application constraints, cost context without false precision, and limits. Avoid hype, unverifiable superlatives, formulaic openings, pseudo-personal testing, universal recommendations, and unsupported outcome promises. Do not say that the editorial team tested, measured, used, bought, or recommends a product unless the site profile explicitly authorizes a substantiated first-party claim. Do not leave placeholders such as `undefined`, `TBD`, `TODO`, `lorem ipsum`, `[citation needed]`, empty strings, empty arrays, or comments asking a downstream editor to fill content. Use plain text with normal punctuation; newlines in `fullReview` separate paragraphs.

Each product needs a stable lowercase hyphenated `id` and a stable lowercase hyphenated `slug` ending in `-review`. Its record must contain an exact 10-character uppercase alphanumeric ASIN; a category and category slug approved in the site profile; both a primary `imageUrl` and `amazonImageUrl`; a nonempty target-hair-types array; a concise summary; a substantial review; at least three practical pros; at least two material cons; and a concrete best-for statement. Do not create a product box without a real image URL. Product copy must be substantially distinct from published records and from other new records.

A comparison must resolve both products by ID, select one of those IDs as `winnerId`, describe the winner rationale, give a qualified verdict, and include hair types. Comparisons should answer a real choice rather than artificially force unrelated items into a contest. The same canonical record contract applies whether a review is standalone or referenced from a comparison. Existing published IDs and slugs are reserved and cannot be reused.

## Affiliate disclosure and linking

Affiliate links are rendered by the site template, not by generated copy. Do not add raw affiliate URLs, purchase calls to action, links, HTML, or disclosure markup to generated text. The renderer and layout own CTA policy and the site-wide affiliate disclosure. Do not write copy that obscures, contradicts, or conditions the required disclosure. Internal linking is represented by references to published IDs, slugs, categories, and comparisons in the supplied index; do not invent internal URLs.

## Required JSON envelope

Return exactly one JSON object with exactly two top-level keys: `products` and `comparisons`. Both are arrays. No Markdown fence, prose, note, explanation, source list outside a record, or extra top-level property is allowed. All product and comparison objects must satisfy the canonical schema supplied in the run message. The run message is the authoritative machine schema; this section is a human-readable restatement.

```json
{
  "products": [
    {
      "id": "lowercase-hyphenated-id",
      "name": "Exact product name",
      "brand": "Brand",
      "asin": "ABCDEFGHIJ",
      "price": 0,
      "priceDisplay": "$0.00",
      "availability": "optional nonempty string",
      "isBuyBoxWinner": false,
      "successorAsin": "optional 10-character ASIN",
      "successorName": "optional nonempty string",
      "commerceNotice": "optional nonempty string",
      "affiliateAvailable": true,
      "rating": 0,
      "reviewCount": 0,
      "category": "Approved category",
      "categorySlug": "approved-category-slug",
      "imageUrl": "https://example.com/product-image.jpg",
      "amazonImageUrl": "https://example.com/product-image.jpg",
      "hairTypes": ["approved-hair-type"],
      "shortDescription": "At least 40 characters.",
      "fullReview": "At least 500 characters, with paragraphs separated by blank lines.",
      "pros": ["Specific practical benefit", "Specific practical benefit", "Specific practical benefit"],
      "cons": ["Specific trade-off", "Specific trade-off"],
      "bestFor": "Specific target user or hair need",
      "editorPick": false,
      "editorNote": "optional nonempty string",
      "publishDate": "YYYY-MM-DD",
      "slug": "lowercase-hyphenated-review",
      "citations": [{"claim": "Supported factual claim", "url": "https://source.example/path", "title": "Source title"}]
    }
  ],
  "comparisons": [
    {
      "id": "lowercase-hyphenated-id",
      "title": "Specific comparison title",
      "subtitle": "Specific comparison subtitle",
      "category": "Approved category",
      "categorySlug": "approved-category-slug",
      "product1Id": "published-or-new-product-id",
      "product2Id": "published-or-new-product-id",
      "winnerId": "one-of-the-two-product-ids",
      "winnerReason": "At least 80 characters of qualified reasoning.",
      "verdict": "At least 120 characters of qualified buying guidance.",
      "publishDate": "YYYY-MM-DD",
      "slug": "lowercase-hyphenated-comparison",
      "hairTypes": ["approved-hair-type"],
      "citations": [{"claim": "Supported factual claim", "url": "https://source.example/path", "title": "Source title"}]
    }
  ]
}
```

## Final self-check

Before returning JSON, check every required key, data type, ID relationship, image URL, category, date, citation object, paragraph, and array. Check that factual claims have sources and that claims never exceed the source. Confirm no duplicated title, product, ID, ASIN, slug, or comparison from the supplied index. Confirm neither a product record nor a comparison record has an unpopulated field. A structurally incomplete response is a failed response.
