/* tests/for-companies-page.test.js
 * Lightweight static checks for for-companies.html.
 *
 * Run from repo root with:
 *   node tests/for-companies-page.test.js
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "for-companies.html");
const html = fs.readFileSync(filePath, "utf8");

assert.match(html, /TimeProofs for Companies/, "page should expose companies title");
assert.match(html, /When your AI acts, you need to know what happened/, "page should include the core company positioning");
assert.match(html, /signed, exportable, verifiable AI Action File/, "page should explain business value");
assert.match(html, /Customer-owned evidence/, "page should emphasize customer-owned evidence");
assert.match(html, /Hash-only by default/, "page should include hash-only privacy positioning");
assert.match(html, /Verifier-friendly/, "page should mention verifier-friendly records");
assert.match(html, /Why companies need Action Files/, "page should include the company need section");
assert.match(html, /Who this is for/, "page should include buyer/team section");
assert.match(html, /Support teams/, "page should address support teams");
assert.match(html, /Sales and revenue teams/, "page should address sales and revenue teams");
assert.match(html, /Procurement teams/, "page should address procurement teams");
assert.match(html, /Operations teams/, "page should address operations teams");
assert.match(html, /Risk and compliance teams/, "page should address risk and compliance teams");
assert.match(html, /AI builders and integrators/, "page should address AI builders and integrators");
assert.match(html, /structured\s*(?:<[^>]+>)*\.action\.json/i, "page should mention the Action File format");
assert.match(html, /local payload hash/, "page should mention local payload hash");
assert.match(html, /TimeProofs Seal/, "page should mention the Seal");
assert.match(html, /detect whether the saved Action File changed/, "page should explain verification value");
assert.match(html, /Start with a small pilot/, "page should include pilot entry point");
assert.match(html, /See pilot use cases/, "page should link to pilot use cases");
assert.match(html, /See how it works/, "page should link to how it works");
assert.match(html, /Run the demo/, "page should link to demo");
assert.match(html, /Request a pilot/, "page should include pilot CTA");

for (const forbiddenClaim of [
  /judges whether the AI was correct/i,
  /guarantees legal validity/i,
  /guarantees regulatory compliance/i,
  /guarantees third-party acceptance/i,
  /TimeProofs provides a legal proof guarantee/i,
  /court-ready/i,
  /legally proven/i,
  /full compliance guarantee/i,
  /stores raw customer content by default/i,
]) {
  assert.doesNotMatch(html, forbiddenClaim, `page should not contain unsupported claim: ${forbiddenClaim}`);
}

console.log("For companies page static checks passed.");
