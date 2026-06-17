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

const sealRequestMatch = html.match(/body\s*:\s*JSON\.stringify\(\{([\s\S]*?)\}\)/);
assert.ok(sealRequestMatch, "Seal request body should be present");

const sealRequestBody = sealRequestMatch[1];

for (const requiredKey of [
  "format",
  "action_id",
  "payload_hash",
  "proof_level",
  "client_generated_at",
  "metadata",
]) {
  assert.match(
    sealRequestBody,
    new RegExp(`${requiredKey}\\s*:`),
    `Seal request should include ${requiredKey}`
  );
}

for (const forbiddenKey of [
  "action_core",
  "summary",
  "prompt",
  "completion",
  "raw_content",
  "document",
  "file",
  "private_key",
  "token",
  "api_key",
]) {
  assert.doesNotMatch(
    sealRequestBody,
    new RegExp(`${forbiddenKey}\\s*:`),
    `Seal request must not send ${forbiddenKey} as a field`
  );
}

assert.match(
  sealRequestBody,
  /action_id\s*:\s*actionFile\.action_core\.action_id/,
  "Seal request may derive action_id from the local Action File"
);
assert.match(
  sealRequestBody,
  /proof_level\s*:\s*actionFile\.action_core\.proof_level/,
  "Seal request may derive proof_level from the local Action File"
);

console.log("Create Action File page static checks passed.");
