#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const failures = [];
const robotsPath = resolve(root, "client/public/robots.txt");
const sitemapPath = resolve(root, "client/public/sitemap.xml");
const dist = resolve(root, "dist/public");
if (!existsSync(robotsPath)) failures.push("robots.txt is missing");
if (!existsSync(sitemapPath)) failures.push("sitemap.xml is missing");
if (!existsSync(dist)) failures.push("rendered output directory dist/public is missing");
if (!failures.length) {
  const robots = readFileSync(robotsPath, "utf8");
  const sitemap = readFileSync(sitemapPath, "utf8");
  if (!/User-agent:\s*\*/i.test(robots) || !/Allow:\s*\//i.test(robots)) failures.push("robots.txt does not allow general crawlers");
  if (!/Sitemap:\s*https:\/\/silkierstrands\.com\/sitemap\.xml/i.test(robots)) failures.push("robots.txt does not reference the canonical sitemap");
  if (!sitemap.startsWith('<?xml version="1.0"')) failures.push("sitemap.xml does not start with XML declaration");
  if ((sitemap.match(/<loc>https:\/\/silkierstrands\.com\//g) || []).length < 10) failures.push("sitemap.xml has too few canonical routes");
  for (const file of ["index.html", "robots.txt", "sitemap.xml"]) if (!existsSync(resolve(dist, file))) failures.push(`Rendered output is missing ${file}`);
}
if (failures.length) { console.error("CRAWLABILITY_GATE_FAILED:"); failures.forEach((failure) => console.error(`- ${failure}`)); process.exitCode = 1; }
else console.log("Crawlability gate passed: robots, canonical sitemap, and rendered public files are present.");
