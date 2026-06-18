/* tests/v1-final-qa.test.js
 * Final lightweight QA checks for TimeProofs V1 static pages.
 *
 * Run from repo root with:
 *   node tests/v1-final-qa.test.js
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const requiredFiles = [
  "index.html",
  "contact.html",
  "pricing.html",
  "use-cases-pilots.html",
  "use-cases.html",
  "for-companies.html",
  "how-it-works.html",
  "demo-simulated-ai-action.html",
  "logs-vs-timeproofs.html",
  "verify.html",
  "docs.html",
  "proofspec.html",
  "security.html",
  "privacy.html",
  "legal.html",
  "keys.html",
];

for (const file of requiredFiles) {
  assert.ok(fs.existsSync(path.join(root, file)), `${file} should exist`);
}

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
for (const file of requiredFiles) {
  const expectedLoc = file === "index.html" ? "https://timeproofs.io/" : `https://timeproofs.io/${file}`;
  assert.match(sitemap, new RegExp(expectedLoc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `sitemap should include ${expectedLoc}`);
}

const currentPages = [
  "index.html",
  "contact.html",
  "pricing.html",
  "privacy.html",
  "security.html",
  "legal.html",
  "for-companies.html",
  "how-it-works.html",
  "use-cases-pilots.html",
];

const forbiddenClaims = [
  /guarantees?\s+legal\s+proof/i,
  /court-ready\s+guarantee/i,
  /full\s+AI\s+Act\s+compliance\s+guarantee/i,
  /full\s+GDPR\s+compliance\s+guarantee/i,
  /AI\s+correctness\s+guarantee/i,
  /TimeProofs\s+proves\s+the\s+AI\s+was\s+correct/i,
  /TimeProofs\s+replaces\s+technical\s+logs/i,
  /TimeProofs\s+stores\s+all\s+AI\s+actions/i,
  /upload\s+raw\s+prompts\s+by\s+default/i,
  /upload\s+raw\s+outputs\s+by\s+default/i,
  /dashboard\s+access\s+is\s+required/i,
  /payment\s+required\s+before\s+discussion/i,
];

for (const file of currentPages) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  for (const forbiddenClaim of forbiddenClaims) {
    assert.doesNotMatch(html, forbiddenClaim, `${file} should avoid unsupported claim: ${forbiddenClaim}`);
  }
}

const contact = fs.readFileSync(path.join(root, "contact.html"), "utf8");
assert.match(contact, /Request a TimeProofs pilot for one AI workflow/i, "contact page should frame pilot request");
assert.match(contact, /mailto:contact@timeproofs\.io/i, "contact page should use mailto path, not backend form");
assert.match(contact, /No sensitive upload by default/i, "contact page should preserve privacy-first pilot path");

const legal = fs.readFileSync(path.join(root, "legal.html"), "utf8");
assert.match(legal, /traceability artifact, not a legal verdict/i, "legal page should state product limit");
assert.match(legal, /does not prove that the AI output was correct/i, "legal page should reject AI correctness proof");
assert.match(legal, /not a full AI Act compliance product/i, "legal page should reject full AI Act compliance");
assert.match(legal, /not a full GDPR compliance guarantee/i, "legal page should reject full GDPR guarantee");

const security = fs.readFileSync(path.join(root, "security.html"), "utf8");
assert.match(security, /canonical payload hashes/i, "security page should mention canonical payload hashes");
assert.match(security, /public keys/i, "security page should mention public keys");
assert.match(security, /no blockchain by default/i, "security page should mention no blockchain by default");

const privacy = fs.readFileSync(path.join(root, "privacy.html"), "utf8");
assert.match(privacy, /hash-only sealing by default/i, "privacy page should keep hash-only model");
assert.match(privacy, /sensitive content is not uploaded by default/i, "privacy page should keep no sensitive upload default");

console.log("TimeProofs V1 final QA static checks passed.");
