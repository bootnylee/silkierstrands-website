#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const formFiles = [
  "client/src/components/NewsletterSignup.tsx",
  "client/src/components/UserReviewSection.tsx",
];
const failures = [];
for (const relative of formFiles) {
  const source = readFileSync(resolve(root, relative), "utf8");
  if (relative.endsWith("NewsletterSignup.tsx")) {
    for (const token of ["type=\"email\"", "onSubmit", "required"]) if (!source.includes(token)) failures.push(`${relative} is missing ${token}`);
  }
  if (relative.endsWith("UserReviewSection.tsx")) {
    for (const token of ["handleSubmit", "e.preventDefault()", "text.trim().length < 20"]) if (!source.includes(token)) failures.push(`${relative} is missing validation guard ${token}`);
  }
}
if (failures.length) { console.error("FORMS_GATE_FAILED:"); failures.forEach((failure) => console.error(`- ${failure}`)); process.exitCode = 1; }
else console.log("Forms gate passed: newsletter and user-review inputs retain submit handling and validation guards.");
