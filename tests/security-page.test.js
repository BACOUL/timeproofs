/* tests/security-page.test.js
 * Lightweight static checks for security.html.
 *
 * Run from repo root with:
 *   node tests/security-page.test.js
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "security.html");
const html = fs.readFileSync(filePath, "utf8");

assert.match(html, /Security - TimeProofs Action File Seal Model/, "page should expose security title");
assert.match(html, /Security for verifiable AI Action Files/, "page should explain Action File security positioning");
assert.match(html, /Local hashing/, "page should include local hashing");
assert.match(html, /Canonical payload hash/, "page should include canonical payload hash");
assert.match(html, /Asymmetric signatures/, "page should include asymmetric signatures");
assert.match(html, /No blockchain by default/, "page should state no blockchain by default");
assert.match(html, /Action File security flow/, "page should include security flow");
assert.match(html, /Seal fields are excluded/, "page should explain anti-circular hashing");
assert.match(html, /TimeProofs signs the payload hash/, "page should explain Seal signing");
assert.match(html, /public_key_id/, "page should include public key id");
assert.match(html, /Ed25519/, "page should include target signature algorithm");
assert.match(html, /Public key id and key rotation/, "page should include key rotation section");
assert.match(html, /Active keys/, "page should explain active keys");
assert.match(html, /Retired keys/, "page should explain retired keys");
assert.match(html, /Compromised keys/, "page should explain compromised keys");
assert.match(html, /Verifier behavior/, "page should include verifier behavior");
assert.match(html, /modified payload/, "page should include modified payload status");
assert.match(html, /invalid signature/, "page should include invalid signature status");
assert.match(html, /unknown key/, "page should include unknown key status");
assert.match(html, /Threat model: protected and not protected/, "page should include threat model");
assert.match(html, /Does not protect/, "page should include non-protected cases");
assert.match(html, /AI output was correct/, "page should include AI correctness limitation");
assert.match(html, /No full AI Act or GDPR compliance guarantee/, "page should include compliance limitation");
assert.match(html, /No court-ready assurance/, "page should include court-ready limitation");

for (const forbiddenClaim of [
  /guarantees the AI output was correct/i,
  /provides absolute legal proof/i,
  /provides court-ready assurance/i,
  /full AI Act compliance guaranteed/i,
  /full GDPR compliance guaranteed/i,
  /blockchain anchoring is active/i,
  /private key is published/i,
  /raw sensitive AI content is signed/i,
  /TimeProofs reviews the underlying sensitive content/i,
]) {
  assert.doesNotMatch(html, forbiddenClaim, `page should not contain unsupported claim: ${forbiddenClaim}`);
}

console.log("Security page static checks passed.");
