/* tests/use-cases-pilots-page.test.js
 * Lightweight static checks for use-cases-pilots.html.
 *
 * Run from repo root with:
 *   node tests/use-cases-pilots-page.test.js
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "use-cases-pilots.html");
const html = fs.readFileSync(filePath, "utf8");

assert.match(html, /TimeProofs Use Cases and Pilots/, "page should expose use cases and pilots title");
assert.match(html, /Start with one AI action worth proving/, "page should include the core pilot positioning");
assert.match(html, /1 workflow/, "page should keep pilot scope narrow");
assert.match(html, /Hash-only by default/, "page should include the hash-only privacy model");
assert.match(html, /2-week pilot/, "page should include a short pilot shape");
assert.match(html, /Pilot boundary/, "page should include a boundary statement");
assert.match(html, /does not certify AI correctness/i, "page should avoid AI correctness claims");
assert.match(html, /regulatory acceptance/i, "page should include acceptance boundary wording");

for (const useCase of [
  /AI support reply prepared/,
  /CRM follow-up generated/,
  /Supplier response summarized/,
  /Agentic task executed/,
  /Customer-facing evidence packet/,
  /High-risk AI decision support logged/,
]) {
  assert.match(html, useCase, `page should include pilot use case: ${useCase}`);
}

assert.match(html, /Pilot acceptance criteria/, "page should include acceptance criteria");
assert.match(html, /Success signals/, "page should include success signals");
assert.match(html, /Stop signals/, "page should include stop signals");
assert.match(html, /Simple pilot package/, "page should include simple pilot package section");
assert.match(html, /Run simulated demo/, "page should link to simulated demo");
assert.match(html, /Create an Action File/, "page should link to Action File creation");
assert.match(html, /Request a pilot/, "page should include pilot CTA");

for (const forbiddenClaim of [
  /certifies AI correctness/i,
  /guarantees legal compliance/i,
  /regulatory acceptance guaranteed/i,
  /court-ready/i,
  /legally proven/i,
  /full governance maturity guaranteed/i,
]) {
  assert.doesNotMatch(html, forbiddenClaim, `page should not contain unsupported claim: ${forbiddenClaim}`);
}

console.log("Use cases and pilots page static checks passed.");
