/* tests/homepage-conversion-funnel.test.js
 * Static checks for the homepage conversion funnel.
 *
 * Run from repo root with:
 *   node tests/homepage-conversion-funnel.test.js
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const pagePath = path.join(root, "index.html");

assert.ok(fs.existsSync(pagePath), "index.html should exist");

const html = fs.readFileSync(pagePath, "utf8");

assert.match(html, /TimeProofs is the black box for AI actions/i, "homepage should keep the core positioning");
assert.match(html, /Privacy-first traceability for observable AI actions/i, "homepage should keep privacy-first traceability framing");
assert.match(html, /Run the demo/i, "homepage should expose a direct demo CTA");
assert.match(html, /href="\/demo-simulated-ai-action\.html"/i, "primary demo CTA should point to the real simulated demo page");
assert.match(html, /href="\/contact\.html"/i, "pilot CTAs should point to the structured contact page");
assert.match(html, /href="\/pricing\.html"/i, "homepage should link to pilot pricing");
assert.match(html, /href="\/for-ai-agencies\.html"/i, "For Agencies navigation should point to the agency page");
assert.match(html, /href="\/for-companies\.html"/i, "homepage should link to the companies page");
assert.match(html, /href="\/use-cases-pilots\.html"/i, "homepage should link to pilot use cases");
assert.match(html, /Pilot 299 € \/ 499 €/i, "homepage should make pilot pricing visible");
assert.match(html, /Agency Kit/i, "homepage should mention Agency Kit as a builder offer");
assert.match(html, /999 €/i, "homepage should mention the Agency Kit price");
assert.match(html, /AI support assistant created a ticket/i, "homepage should show a concrete Action File example");
assert.match(html, /support\.ticket_created/i, "homepage example should use a concrete action code");
assert.match(html, /Valid Seal · fingerprint matches/i, "homepage should show a concrete verification outcome");
assert.match(html, /One paid pilot before the SaaS/i, "homepage should steer visitors toward pilot validation before SaaS");
assert.match(html, /No full SaaS build required/i, "final CTA should reinforce pilot-first execution");

const forbiddenPatterns = [
  /href="#demo"/i,
  /For Agencies<\/a>\s*<a href="\/use-cases\.html"/i,
  /href="mailto:contact@timeproofs\.io[^\"]*"[^>]*>Request a pilot/i,
  /proves the AI was correct/i,
  /guarantees? legal validity/i,
  /full compliance certification/i,
  /replaces technical logs/i,
  /court-ready/i,
  /legal-proof guarantee/i,
];

for (const pattern of forbiddenPatterns) {
  assert.doesNotMatch(html, pattern, `homepage should avoid broken funnel or unsupported claim: ${pattern}`);
}

console.log("Homepage conversion funnel static checks passed.");
