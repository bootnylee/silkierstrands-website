#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const layout = readFileSync(resolve(root, "client/src/components/SiteLayout.tsx"), "utf8");
const review = readFileSync(resolve(root, "client/src/pages/ProductReview.tsx"), "utf8");
const comparison = readFileSync(resolve(root, "client/src/pages/ComparisonPage.tsx"), "utf8");
const failures = [];
if (!layout.includes("As an Amazon Associate, SilkierStrands earns from qualifying purchases.")) failures.push("Site-wide affiliate disclosure is missing from SiteLayout");
for (const [name, source] of [["ProductReview", review], ["ComparisonPage", comparison]]) {
  if (!source.includes("SiteLayout")) failures.push(`${name} does not render through SiteLayout`);
  if (!source.includes("VerifiedAmazonCta")) failures.push(`${name} contains no verified affiliate CTA for disclosure coverage verification`);
}
if (failures.length) { console.error("AFFILIATE_DISCLOSURE_GATE_FAILED:"); failures.forEach((failure) => console.error(`- ${failure}`)); process.exitCode = 1; }
else console.log("Affiliate disclosure gate passed: product-bearing routes render through the site-wide Amazon Associate disclosure.");
