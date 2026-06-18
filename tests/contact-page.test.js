/* tests/contact-page.test.js
 * Lightweight static checks for contact.html.
 *
 * Run from repo root with:
 *   node tests/contact-page.test.js
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "contact.html");
const html = fs.readFileSync(filePath, "utf8");

assert.match(html, /Contact - TimeProofs pilot request/, "page should expose contact title");
assert.match(html, /Request a TimeProofs pilot for one AI workflow/, "page should position pilot request");
assert.match(html, /One workflow/, "page should focus on one workflow");
assert.match(html, /Two-week pilot/, "page should mention two-week pilot");
assert.match(html, /No payment required to discuss/, "page should avoid payment on first discussion");
assert.match(html, /No sensitive upload by default/, "page should preserve privacy-first default");
assert.match(html, /Best fit:/, "page should qualify audience");
assert.match(html, /Pilot format/, "page should include pilot format");
assert.match(html, /Pick one workflow/, "page should include workflow selection step");
assert.match(html, /Generate Action Files/, "page should mention Action Files");
assert.match(html, /Verify the Seal/, "page should mention Seal verification");
assert.match(html, /What to send in the first message/, "page should explain requested information");
assert.match(html, /No account or dashboard required/, "page should avoid dashboard/account scope");
assert.match(html, /No payment on this page/, "page should not process payment");
assert.match(html, /Raw prompts, outputs, documents, credentials, tokens, private keys, or personal data should not be sent by default/, "page should forbid sensitive default upload");
assert.match(html, /Good pilot candidates/, "page should list pilot candidates");
assert.match(html, /Copyable pilot request template/, "page should include copyable template");
assert.match(html, /mailto:contact@timeproofs.io/, "page should use email contact without backend form");

for (const forbiddenClaim of [
  /payment required before discussion/i,
  /create your account to request a pilot/i,
  /dashboard access is required/i,
  /upload raw prompts by default/i,
  /upload raw outputs by default/i,
  /full CRM integration included/i,
  /guarantees legal proof/i,
  /court-ready guarantee/i,
  /full AI Act compliance guarantee/i,
  /full GDPR compliance guarantee/i,
  /AI correctness guarantee/i,
]) {
  assert.doesNotMatch(html, forbiddenClaim, `contact page should not contain unsupported claim: ${forbiddenClaim}`);
}

console.log("Contact pilot page static checks passed.");
