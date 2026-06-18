/* tests/site-header-contract.test.js
 * Static checks for the shared marketing/conversion header contract.
 *
 * Run from repo root with:
 *   node tests/site-header-contract.test.js
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const pages = [
  "index.html",
  "for-ai-agencies.html",
  "for-companies.html",
  "use-cases-pilots.html",
  "pricing.html",
  "contact.html",
];

const requiredLinks = [
  ["Home", "/"],
  ["Demo", "/demo-simulated-ai-action.html"],
  ["For Agencies", "/for-ai-agencies.html"],
  ["For Companies", "/for-companies.html"],
  ["Pilots", "/use-cases-pilots.html"],
  ["Pricing", "/pricing.html"],
  ["Docs", "/docs.html"],
  ["Verify", "/verify.html"],
  ["Request a pilot", "/contact.html"],
];

for (const page of pages) {
  const pagePath = path.join(root, page);
  assert.ok(fs.existsSync(pagePath), `${page} should exist`);
  const html = fs.readFileSync(pagePath, "utf8");
  const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
  assert.ok(headerMatch, `${page} should include a header`);
  const header = headerMatch[0];

  assert.match(header, /class="tp-header"/i, `${page} should use the standard header class`);
  assert.match(header, /TimeProofs/i, `${page} should keep brand label`);

  for (const [label, href] of requiredLinks) {
    const escapedHref = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const labelRegex = new RegExp(`<a[^>]+href="${escapedHref}"[^>]*>${label}<\\/a>`, "i");
    assert.match(header, labelRegex, `${page} should include ${label} → ${href}`);
  }

  assert.doesNotMatch(header, /mailto:contact@timeproofs\.io/i, `${page} header should not use a direct mailto CTA`);
  assert.doesNotMatch(header, /For Agencies<\/a>\s*<a href="\/use-cases\.html"/i, `${page} should not route For Agencies to use-cases.html`);
  assert.doesNotMatch(header, /href="\/create-action-file\.html"/i, `${page} should not expose old Create link in the main marketing header`);
}

console.log("Site header contract checks passed.");
