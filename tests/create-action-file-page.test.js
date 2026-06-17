/* tests/create-action-file-page.test.js
 * Lightweight static checks for create-action-file.html.
 *
 * Run from repo root with:
 *   node tests/create-action-file-page.test.js
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "create-action-file.html");
const html = fs.readFileSync(filePath, "utf8");

assert.match(html, /Create a TimeProofs Action File/, "page should expose the Action File generator title");
assert.match(html, /\/sdk\/action-file-v1\.js/, "page should load the Action File SDK");
assert.match(html, /hashActionFileCore/, "page should calculate the local payload hash");
assert.match(html, /\/api\/seal/, "page should call the Seal API endpoint");
assert.match(html, /Download \.action\.json/, "page should expose the download action");
assert.match(html, /No raw prompts required/, "page should include privacy-first warning copy");
assert.match(html, /payload_hash/, "page should include payload_hash in the Seal request");
assert.match(html, /action_id/, "page should include action_id in the Seal request");
assert.match(html, /proof_level/, "page should include proof_level in the Seal request");
assert.doesNotMatch(html, /body:\s*JSON\.stringify\([^)]*action_core/s, "Seal request must not send action_core directly");
assert.doesNotMatch(html, /body:\s*JSON\.stringify\([^)]*summary/s, "Seal request must not send action summary directly");

console.log("Create Action File page static checks passed.");
