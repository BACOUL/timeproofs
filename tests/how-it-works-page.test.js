/* tests/how-it-works-page.test.js
 * Lightweight static checks for how-it-works.html.
 *
 * Run from repo root with:
 *   node tests/how-it-works-page.test.js
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "how-it-works.html");
const html = fs.readFileSync(filePath, "utf8");

assert.match(html, /How TimeProofs Works/, "page should expose how-it-works title");
assert.match(html, /From AI action to verifiable Action File/, "page should include core heading");
assert.match(html, /AI action/, "page should include AI action step");
assert.match(html, /Action File/, "page should include Action File step");
assert.match(html, /payload_hash/, "page should include payload_hash step");
assert.match(html, /Seal/, "page should include Seal step");
assert.match(html, /Verify/, "page should include Verify step");
assert.match(html, /The five-step flow/, "page should explain the full flow");
assert.match(html, /structured \.action\.json/, "page should mention the .action.json record");
assert.match(html, /canonicalized and hashed locally/, "page should explain local hashing");
assert.match(html, /signs the payload hash/, "page should explain Seal signing");
assert.match(html, /checks the Seal signature/, "page should explain verification");
assert.match(html, /Raw prompt, output, documents, files, tokens, and secrets should not be sent by default/, "page should include privacy boundary");
assert.match(html, /Verification checks integrity and Seal authenticity/, "page should explain verification scope");
assert.match(html, /does not prove AI correctness/i, "page should avoid AI correctness claims");
assert.match(html, /does not replace logs/i, "page should avoid replacing logs");
assert.match(html, /Run simulated demo/, "page should link to simulated demo");
assert.match(html, /Create an Action File/, "page should link to Action File creation");
assert.match(html, /Verify a proof/, "page should link to verification");
assert.match(html, /See pilot use cases/, "page should link to pilot use cases");

for (const forbiddenClaim of [
  /proves AI correctness/i,
  /guarantees legal validity/i,
  /guarantees regulatory compliance/i,
  /court-ready/i,
  /legally proven/i,
  /TimeProofs replaces logs/i,
  /sends raw prompt by default/i,
]) {
  assert.doesNotMatch(html, forbiddenClaim, `page should not contain unsupported claim: ${forbiddenClaim}`);
}

console.log("How it works page static checks passed.");
