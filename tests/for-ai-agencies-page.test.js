/* tests/for-ai-agencies-page.test.js
 * Static checks for the For AI Agencies page.
 *
 * Run from repo root with:
 *   node tests/for-ai-agencies-page.test.js
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const pagePath = path.join(root, "for-ai-agencies.html");
const sitemapPath = path.join(root, "sitemap.xml");

assert.ok(fs.existsSync(pagePath), "for-ai-agencies.html should exist");

const html = fs.readFileSync(pagePath, "utf8");
const sitemap = fs.readFileSync(sitemapPath, "utf8");

assert.match(html, /Add a black box to the AI workflows you deliver/i, "page should use agency positioning");
assert.match(html, /AI agencies/i, "page should address AI agencies");
assert.match(html, /no-code builders/i, "page should address no-code builders");
assert.match(html, /Make and n8n builders/i, "page should mention Make and n8n builders");
assert.match(html, /Zapier consultants/i, "page should mention Zapier consultants");
assert.match(html, /chatbot integrators/i, "page should mention chatbot integrators");
assert.match(html, /first channel/i, "page should frame agencies as validation channel");
assert.match(html, /final market remains every organization using AI actions/i, "page should avoid making agencies the only market");
assert.match(html, /How agencies install TimeProofs/i, "page should include installation process");
assert.match(html, /Generate the Action File after the business action/i, "page should explain Action File generation after business action");
assert.match(html, /Seal only the payload hash/i, "page should preserve hash-only sealing");
assert.match(html, /Do not send raw prompts, outputs, files, credentials or client data by default/i, "page should preserve sensitive-data guardrail");
assert.match(html, /Agency Kit/i, "page should mention Agency Kit");
assert.match(html, /coming after validation/i, "page should avoid implying Agency Kit is live");
assert.match(html, /Request an agency pilot/i, "page should include agency pilot CTA");
assert.match(html, /\/contact\.html/i, "page should link to contact page");
assert.match(html, /\/pricing\.html/i, "page should link to pricing page");
assert.match(html, /\/privacy\.html/i, "page should link to privacy page");

const forbiddenClaims = [
  /certified integrator/i,
  /official certification/i,
  /certification is live/i,
  /guarantees? legal proof/i,
  /court-ready guarantee/i,
  /full AI Act compliance guarantee/i,
  /full GDPR compliance guarantee/i,
  /AI correctness guarantee/i,
  /replaces technical logs/i,
  /upload raw prompts by default/i,
  /upload raw outputs by default/i,
  /dashboard access is required/i,
  /payment required before discussion/i,
];

for (const forbiddenClaim of forbiddenClaims) {
  assert.doesNotMatch(html, forbiddenClaim, `page should avoid unsupported claim: ${forbiddenClaim}`);
}

assert.match(sitemap, /https:\/\/timeproofs\.io\/for-ai-agencies\.html/i, "sitemap should include for-ai-agencies.html");

console.log("For AI Agencies page static checks passed.");
