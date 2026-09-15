import { readFileSync } from "node:fs";

const STRING = { type: "string", minLength: 1 };
const OPTIONAL_STRING = { type: "string", minLength: 1 };
const URL = { type: "string", minLength: 8, pattern: "^https?://" };
const HAIR_TYPE = { type: "string", minLength: 1 };

export const CITATION_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["claim", "url", "title"],
  properties: {
    claim: STRING,
    url: URL,
    title: STRING,
  },
};

export const PRODUCT_RECORD_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "id", "name", "brand", "asin", "price", "priceDisplay", "rating", "reviewCount",
    "category", "categorySlug", "imageUrl", "amazonImageUrl", "hairTypes", "shortDescription",
    "fullReview", "pros", "cons", "bestFor", "editorPick", "publishDate", "slug", "citations",
  ],
  properties: {
    id: { ...STRING, pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
    name: STRING,
    brand: STRING,
    asin: { type: "string", pattern: "^[A-Z0-9]{10}$" },
    price: { type: "number", minimum: 0 },
    priceDisplay: STRING,
    availability: OPTIONAL_STRING,
    isBuyBoxWinner: { type: "boolean" },
    successorAsin: { type: "string", pattern: "^[A-Z0-9]{10}$" },
    successorName: OPTIONAL_STRING,
    commerceNotice: OPTIONAL_STRING,
    affiliateAvailable: { type: "boolean" },
    rating: { type: "number", minimum: 0, maximum: 5 },
    reviewCount: { type: "integer", minimum: 0 },
    category: STRING,
    categorySlug: { ...STRING, pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
    imageUrl: URL,
    amazonImageUrl: URL,
    hairTypes: { type: "array", minItems: 1, items: HAIR_TYPE },
    shortDescription: { type: "string", minLength: 40 },
    fullReview: { type: "string", minLength: 500 },
    pros: { type: "array", minItems: 3, items: STRING },
    cons: { type: "array", minItems: 2, items: STRING },
    bestFor: STRING,
    editorPick: { type: "boolean" },
    editorNote: OPTIONAL_STRING,
    publishDate: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$" },
    slug: { ...STRING, pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*-review$" },
    citations: { type: "array", minItems: 1, items: CITATION_SCHEMA },
  },
};

export const COMPARISON_RECORD_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "id", "title", "subtitle", "category", "categorySlug", "product1Id", "product2Id", "winnerId",
    "winnerReason", "verdict", "publishDate", "slug", "hairTypes", "citations",
  ],
  properties: {
    id: { ...STRING, pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
    title: STRING,
    subtitle: STRING,
    category: STRING,
    categorySlug: { ...STRING, pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
    product1Id: { ...STRING, pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
    product2Id: { ...STRING, pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
    winnerId: { ...STRING, pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
    winnerReason: { type: "string", minLength: 80 },
    verdict: { type: "string", minLength: 120 },
    publishDate: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$" },
    slug: { ...STRING, pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
    hairTypes: { type: "array", minItems: 1, items: HAIR_TYPE },
    citations: { type: "array", minItems: 1, items: CITATION_SCHEMA },
  },
};

export const CONTENT_BATCH_SCHEMA = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "SilkierStrands canonical content-record batch",
  type: "object",
  additionalProperties: false,
  required: ["products", "comparisons"],
  properties: {
    products: { type: "array", items: PRODUCT_RECORD_SCHEMA },
    comparisons: { type: "array", items: COMPARISON_RECORD_SCHEMA },
  },
};

function typeName(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

function validateValue(value, schema, path, errors) {
  if (schema.type === "object") {
    if (!value || Array.isArray(value) || typeof value !== "object") {
      errors.push(`${path} must be an object; received ${typeName(value)}`);
      return;
    }
    const properties = schema.properties || {};
    for (const key of schema.required || []) {
      if (!(key in value)) errors.push(`${path}.${key} is required`);
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!(key in properties)) errors.push(`${path}.${key} is not allowed by the canonical contract`);
      }
    }
    for (const [key, childSchema] of Object.entries(properties)) {
      if (key in value) validateValue(value[key], childSchema, `${path}.${key}`, errors);
    }
    return;
  }

  if (schema.type === "array") {
    if (!Array.isArray(value)) {
      errors.push(`${path} must be an array; received ${typeName(value)}`);
      return;
    }
    if (schema.minItems !== undefined && value.length < schema.minItems) errors.push(`${path} requires at least ${schema.minItems} item(s)`);
    value.forEach((item, index) => validateValue(item, schema.items, `${path}[${index}]`, errors));
    return;
  }

  if (schema.type === "integer") {
    if (!Number.isInteger(value)) errors.push(`${path} must be an integer; received ${typeName(value)}`);
  } else if (typeof value !== schema.type) {
    errors.push(`${path} must be ${schema.type}; received ${typeName(value)}`);
    return;
  }

  if (schema.type === "string") {
    if (schema.minLength !== undefined && value.trim().length < schema.minLength) errors.push(`${path} must contain at least ${schema.minLength} character(s)`);
    if (schema.pattern && !(new RegExp(schema.pattern).test(value))) errors.push(`${path} does not match ${schema.pattern}`);
  }
  if (schema.type === "number" || schema.type === "integer") {
    if (!Number.isFinite(value)) errors.push(`${path} must be finite`);
    if (schema.minimum !== undefined && value < schema.minimum) errors.push(`${path} must be at least ${schema.minimum}`);
    if (schema.maximum !== undefined && value > schema.maximum) errors.push(`${path} must be at most ${schema.maximum}`);
  }
}

export function validateContentBatch(batch, { publishedIndex = null, expectedDate = null } = {}) {
  const errors = [];
  validateValue(batch, CONTENT_BATCH_SCHEMA, "$", errors);
  if (errors.length > 0) return errors;

  const products = batch.products;
  const comparisons = batch.comparisons;
  if (products.length + comparisons.length === 0) errors.push("$ must contain at least one product or comparison record");

  const productIds = new Set();
  const productSlugs = new Set();
  for (const [index, product] of products.entries()) {
    if (productIds.has(product.id)) errors.push(`$.products[${index}].id duplicates another generated product: ${product.id}`);
    if (productSlugs.has(product.slug)) errors.push(`$.products[${index}].slug duplicates another generated product: ${product.slug}`);
    productIds.add(product.id);
    productSlugs.add(product.slug);
    if (expectedDate && product.publishDate !== expectedDate) errors.push(`$.products[${index}].publishDate must equal run date ${expectedDate}`);
    if (product.successorAsin && product.affiliateAvailable !== false && !product.commerceNotice) {
      errors.push(`$.products[${index}] requires commerceNotice when successorAsin is present and affiliateAvailable is not false`);
    }
  }

  const comparisonIds = new Set();
  const comparisonSlugs = new Set();
  const availableIds = new Set([...(publishedIndex?.productIds || []), ...productIds]);
  for (const [index, comparison] of comparisons.entries()) {
    if (comparisonIds.has(comparison.id)) errors.push(`$.comparisons[${index}].id duplicates another generated comparison: ${comparison.id}`);
    if (comparisonSlugs.has(comparison.slug)) errors.push(`$.comparisons[${index}].slug duplicates another generated comparison: ${comparison.slug}`);
    comparisonIds.add(comparison.id);
    comparisonSlugs.add(comparison.slug);
    if (expectedDate && comparison.publishDate !== expectedDate) errors.push(`$.comparisons[${index}].publishDate must equal run date ${expectedDate}`);
    for (const field of ["product1Id", "product2Id", "winnerId"]) {
      if (!availableIds.has(comparison[field])) errors.push(`$.comparisons[${index}].${field} does not resolve to a published or generated product`);
    }
    if (comparison.product1Id === comparison.product2Id) errors.push(`$.comparisons[${index}] must compare two distinct products`);
    if (![comparison.product1Id, comparison.product2Id].includes(comparison.winnerId)) errors.push(`$.comparisons[${index}].winnerId must equal product1Id or product2Id`);
  }

  if (publishedIndex) {
    for (const product of products) {
      if (publishedIndex.productIds?.has(product.id)) errors.push(`$.products id already exists in the published index: ${product.id}`);
      if (publishedIndex.productSlugs?.has(product.slug)) errors.push(`$.products slug already exists in the published index: ${product.slug}`);
    }
    for (const comparison of comparisons) {
      if (publishedIndex.comparisonIds?.has(comparison.id)) errors.push(`$.comparisons id already exists in the published index: ${comparison.id}`);
      if (publishedIndex.comparisonSlugs?.has(comparison.slug)) errors.push(`$.comparisons slug already exists in the published index: ${comparison.slug}`);
    }
  }
  return errors;
}

export function readContentBatch(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}
