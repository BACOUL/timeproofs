/* tests/pricing-page.test.js
 * Lightweight static checks for pricing.html.
 *
 * Run from repo root with:
 *   node tests/pricing-page.test.js
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "pricing.html");
const html = fs.readFileSync(filePath, "utf8");

assert.match(html, /Pricing - TimeProofs V1 Pilot Offers/, "page should expose pricing title");
assert.match(html, /Pricing that sells the pilot before the SaaS/, "page should explain pilot-first strategy");
assert.match(html, /TimeProofs Pilot/, "page should include the pilot offer");
assert.match(html, /299 € \/ 499 €/, "page should include pilot pricing");
assert.match(html, /1 AI workflow connected/, "pilot should include one AI workflow");
assert.match(html, /1 action type traced/, "pilot should include one traced action type");
assert.match(html, /Action File generated automatically/, "pilot should include generated Action File");
assert.match(html, /Verification setup/, "pilot should include verification setup");
assert.match(html, /Storage guidance/, "pilot should include storage guidance");
assert.match(html, /Incident reconstruction example/, "pilot should include incident reconstruction example");
assert.match(html, /Agency Kit/, "page should include agency offer");
assert.match(html, /999 €/, "page should include agency kit pricing");
assert.match(html, /Templates Make\/n8n/, "agency kit should include Make/n8n templates");
assert.match(html, /OpenAI example/, "agency kit should include OpenAI example");
assert.match(html, /3 workflows support/, "agency kit should include three workflows support");
assert.match(html, /Commercial argumentation/, "agency kit should include sales argumentation");
assert.match(html, /Future subscriptions/, "page should include future subscriptions");
assert.match(html, /Coming later/, "future subscriptions should be marked as coming later");
assert.match(html, /Verifier remains free/, "page should state verifier remains free");
assert.match(html, /Public demo remains available/, "page should keep demo available");
assert.match(html, /Manual pilot sales only for now/, "page should avoid pretending billing exists");
assert.match(html, /Request a pilot/, "page should include pilot CTA");
assert.match(html, /Run simulated demo/, "page should include demo CTA");
assert.match(html, /Create an Action File/, "page should include creation CTA");
assert.match(html, /Verify a proof/, "page should include verification CTA");

for (const forbiddenClaim of [
  /TimeProofs provides enterprise certification/i,
  /TimeProofs provides court-ready assurance/i,
  /full compliance guarantee/i,
  /guarantees legal validity/i,
  /guarantees regulatory compliance/i,
  /guarantees the AI action was correct/i,
  /online payment is available/i,
  /subscription is available now/i,
  /dashboard included/i,
]) {
  assert.doesNotMatch(html, forbiddenClaim, `page should not contain unsupported claim: ${forbiddenClaim}`);
}

console.log("Pricing page static checks passed.");
