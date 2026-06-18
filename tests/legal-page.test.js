/* tests/legal-page.test.js
 * Lightweight static checks for legal.html.
 *
 * Run from repo root with:
 *   node tests/legal-page.test.js
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "legal.html");
const html = fs.readFileSync(filePath, "utf8");

assert.match(html, /Legal - TimeProofs Action File limitations/, "page should expose legal title");
assert.match(html, /traceability artifact, not a legal verdict/, "page should set legal positioning");
assert.match(html, /technical integrity and Seal consistency/, "page should explain technical scope");
assert.match(html, /Not legal advice/, "page should state not legal advice");
assert.match(html, /What TimeProofs can technically show/, "page should include technical proof section");
assert.match(html, /Payload hash consistency/, "page should explain payload hash consistency");
assert.match(html, /Seal signature status/, "page should explain Seal signature status");
assert.match(html, /Structured record coherence/, "page should explain traceability record coherence");
assert.match(html, /What TimeProofs does not prove/, "page should include negative scope section");
assert.match(html, /does not prove that the AI output was correct/, "page should reject AI correctness proof");
assert.match(html, /does not guarantee the legal validity/, "page should reject legal validity guarantee");
assert.match(html, /does not provide notarization, legal certification, regulated audit, or court-ready assurance/, "page should reject notarization and court-ready claims");
assert.match(html, /Proof levels are evidence labels, not legal levels/, "page should frame proof levels correctly");
assert.match(html, /Does not replace legal review or regulated audit/, "page should limit externally verifiable level");
assert.match(html, /Compliance and audit boundaries/, "page should include compliance boundaries");
assert.match(html, /not a full AI Act compliance product/, "page should reject full AI Act compliance");
assert.match(html, /not a full GDPR compliance guarantee/, "page should reject GDPR guarantee");
assert.match(html, /Customer responsibilities/, "page should include customer responsibilities");
assert.match(html, /Customer is responsible for the action/, "page should make customer responsible for action content");
assert.match(html, /Use in disputes/, "page should warn about dispute reliance");
assert.match(html, /Acceptable use/, "page should include acceptable use");
assert.match(html, /Availability and changes/, "page should include availability limits");

for (const forbiddenClaim of [
  /TimeProofs proves the AI was correct/i,
  /TimeProofs guarantees legal validity/i,
  /TimeProofs provides legal certification/i,
  /TimeProofs provides notarization/i,
  /TimeProofs provides court-ready assurance/i,
  /full AI Act compliance guaranteed/i,
  /full GDPR compliance guaranteed/i,
  /third party must accept the record/i,
  /proof levels replace legal review/i,
  /regulated audit replacement/i,
]) {
  assert.doesNotMatch(html, forbiddenClaim, `page should not contain unsupported legal claim: ${forbiddenClaim}`);
}

console.log("Legal page static checks passed.");
