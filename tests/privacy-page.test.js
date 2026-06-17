/* tests/privacy-page.test.js
 * Lightweight static checks for privacy.html.
 *
 * Run from repo root with:
 *   node tests/privacy-page.test.js
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "privacy.html");
const html = fs.readFileSync(filePath, "utf8");

assert.match(html, /Privacy - TimeProofs AI Action Files/, "page should expose privacy title");
assert.match(html, /TimeProofs seals fingerprints, not sensitive AI content/, "page should explain hash-only privacy positioning");
assert.match(html, /company keeps the Action Files/, "page should state company stores Action Files");
assert.match(html, /receives only fingerprints or payload hashes/, "page should state TimeProofs receives only hashes by default");
assert.match(html, /Company-owned storage/, "page should include company-owned storage chip");
assert.match(html, /Hash-only by default/, "page should include hash-only chip");
assert.match(html, /Local verification possible/, "page should include local verification chip");
assert.match(html, /No absolute anonymity promise/, "page should avoid absolute anonymity claims");
assert.match(html, /Privacy model for Action Files/, "page should include Action File privacy model");
assert.match(html, /The company stores Action Files/, "page should explain company storage");
assert.match(html, /TimeProofs receives hashes/, "page should explain hash-only sealing input");
assert.match(html, /Verification can be local/, "page should explain local verification");
assert.match(html, /What TimeProofs should never receive by default/, "page should include never receive section");
assert.match(html, /Raw prompts or full AI outputs/, "page should prohibit raw prompts and outputs by default");
assert.match(html, /API keys, tokens, passwords, private keys, or credentials/, "page should prohibit secrets by default");
assert.match(html, /Full Action Files if only the canonical payload hash is needed for sealing/, "page should prefer payload hash over full Action File");
assert.match(html, /What the company controls/, "page should include company controls section");
assert.match(html, /Storage location/, "page should include storage location");
assert.match(html, /Evidence policy/, "page should include evidence policy");
assert.match(html, /How the privacy linter helps/, "page should include privacy linter section");
assert.match(html, /warns when an Action File may contain sensitive/, "page should explain linter warnings");
assert.match(html, /Does not guarantee that every sensitive value is detected/, "page should state linter limits");
assert.match(html, /Privacy limits/, "page should include privacy limits");
assert.match(html, /Proof levels do not replace legal review/, "page should include governance/legal limits");

for (const forbiddenClaim of [
  /guarantees absolute anonymity/i,
  /TimeProofs receives sensitive action content by default/i,
  /TimeProofs stores all Action Files/i,
  /raw prompts are uploaded by default/i,
  /full compliance guarantee/i,
  /GDPR compliant by default/i,
  /AI Act compliant by default/i,
  /legal-proof guarantee/i,
  /court-ready/i,
]) {
  assert.doesNotMatch(html, forbiddenClaim, `page should not contain unsupported claim: ${forbiddenClaim}`);
}

console.log("Privacy page static checks passed.");
