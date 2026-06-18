/* tests/logs-vs-timeproofs-page.test.js
 * Static checks for the Logs vs TimeProofs page.
 *
 * Run from repo root with:
 *   node tests/logs-vs-timeproofs-page.test.js
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const pagePath = path.join(root, "logs-vs-timeproofs.html");
const sitemapPath = path.join(root, "sitemap.xml");

assert.ok(fs.existsSync(pagePath), "logs-vs-timeproofs.html should exist");

const html = fs.readFileSync(pagePath, "utf8");
const sitemap = fs.readFileSync(sitemapPath, "utf8");

assert.match(html, /Logs help engineers debug\. TimeProofs helps teams reconstruct AI actions\./i, "page should explain the category difference");
assert.match(html, /Technical logs vs TimeProofs/i, "page should include comparison table heading");
assert.match(html, /technical logs/i, "page should discuss technical logs");
assert.match(html, /business-readable record/i, "page should position Action Files as business-readable");
assert.match(html, /structured \.action\.json file/i, "page should mention .action.json structure");
assert.match(html, /customer-owned and portable/i, "page should explain portable company-owned storage");
assert.match(html, /complements logs/i, "page should say TimeProofs complements logs");
assert.match(html, /does not make logs useless/i, "page should avoid anti-log positioning");
assert.match(html, /does not prove the AI was correct/i, "page should preserve AI correctness limit");
assert.match(html, /does not guarantee legal validity or court-ready proof/i, "page should preserve legal limits");
assert.match(html, /does not provide full AI Act, GDPR or regulated-audit compliance/i, "page should avoid full compliance claim");
assert.match(html, /hash-only by default/i, "page should preserve hash-only model");
assert.match(html, /Request pilot/i, "page should include pilot CTA");
assert.match(html, /\/contact\.html/i, "page should link to contact page");
assert.match(html, /\/demo-simulated-ai-action\.html/i, "page should link to demo page");

const forbiddenClaims = [
  /logs are useless/i,
  /replace technical logs/i,
  /replaces technical logs/i,
  /guarantees? legal proof/i,
  /court-ready guarantee/i,
  /full AI Act compliance guarantee/i,
  /full GDPR compliance guarantee/i,
  /AI correctness guarantee/i,
  /upload raw prompts by default/i,
  /upload raw outputs by default/i,
];

for (const forbiddenClaim of forbiddenClaims) {
  assert.doesNotMatch(html, forbiddenClaim, `page should avoid unsupported claim: ${forbiddenClaim}`);
}

assert.match(sitemap, /https:\/\/timeproofs\.io\/logs-vs-timeproofs\.html/i, "sitemap should include logs-vs-timeproofs.html");

console.log("Logs vs TimeProofs page static checks passed.");
