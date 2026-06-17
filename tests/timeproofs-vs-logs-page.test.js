/* tests/timeproofs-vs-logs-page.test.js
 * Lightweight static checks for timeproofs-vs-logs.html.
 *
 * Run from repo root with:
 *   node tests/timeproofs-vs-logs-page.test.js
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "timeproofs-vs-logs.html");
const html = fs.readFileSync(filePath, "utf8");

assert.match(html, /TimeProofs vs Logs/, "page should expose a TimeProofs vs Logs title");
assert.match(html, /does not replace logs/i, "page should state that TimeProofs does not replace logs");
assert.match(html, /signed, exportable, verifiable AI Action File/i, "page should explain the Action File value");
assert.match(html, /Logs explain systems\. TimeProofs packages proof\./, "page should include the core positioning line");
assert.match(html, /Complements logs/, "page should include complements-logs positioning");
assert.match(html, /Hash-only by default/, "page should include the hash-only privacy model");
assert.match(html, /Clear comparison/, "page should include a comparison section");
assert.match(html, /What TimeProofs is not/, "page should include limitations section");
assert.match(html, /Not a SIEM, monitoring, APM, or observability tool/, "page should avoid replacing observability tools");
assert.match(html, /Not an AI correctness validator/, "page should avoid AI correctness claims");
assert.match(html, /Not a legal-proof guarantee/, "page should avoid absolute legal proof claims");
assert.match(html, /not prove that the AI was correct/i, "page should include verification boundaries");
assert.match(html, /Run the simulated demo/, "page should link to the simulated demo");
assert.match(html, /Create an Action File/, "page should link to Action File creation");
assert.match(html, /Verify a proof/, "page should link to verification");

for (const forbiddenClaim of [
  /replaces logs/i,
  /replaces observability/i,
  /court-ready/i,
  /legally proven/i,
  /guarantees compliance/i,
  /proves AI correctness/i,
]) {
  assert.doesNotMatch(html, forbiddenClaim, `page should not contain unsupported claim: ${forbiddenClaim}`);
}

console.log("TimeProofs vs logs page static checks passed.");
