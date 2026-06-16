/* tests/action-file-v1.test.js
 * Dependency-free smoke tests for sdk/action-file-v1.js.
 * Run from repo root with: node tests/action-file-v1.test.js
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const {
  CANONICALIZATION_PROFILE,
  createHashableActionFilePayload,
  canonicalizeActionFileCore,
  hashActionFileCore,
  checkActionFilePayloadHash,
  isNonHashableTopLevelKey,
} = require("../sdk/action-file-v1.js");

const repoRoot = path.resolve(__dirname, "..");
const examplesDir = path.join(repoRoot, "examples", "action-files");

function readJson(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  return JSON.parse(fs.readFileSync(absolutePath, "utf8"));
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

async function expectHash(relativePath, expectedHash) {
  const actionFile = readJson(relativePath);
  const actual = await hashActionFileCore(actionFile);
  assert.strictEqual(actual, expectedHash, `${relativePath} payload hash mismatch`);

  const check = await checkActionFilePayloadHash(actionFile);
  assert.strictEqual(check.ok, true, `${relativePath} checkActionFilePayloadHash should pass`);
  assert.strictEqual(check.expected, expectedHash);
  assert.strictEqual(check.actual, expectedHash);
  assert.strictEqual(check.profile, CANONICALIZATION_PROFILE);
}

async function main() {
  assert.strictEqual(CANONICALIZATION_PROFILE, "timeproofs-json-canonical-v1");
  assert.strictEqual(isNonHashableTopLevelKey("integrity"), true);
  assert.strictEqual(isNonHashableTopLevelKey("local_annotations"), true);
  assert.strictEqual(isNonHashableTopLevelKey("verification_result"), true);
  assert.strictEqual(isNonHashableTopLevelKey("action_core"), false);

  await expectHash(
    "examples/action-files/declared-email-drafted.action.json",
    "sha256:231c6b5ca29078119421fcf4aedaee827917b1b6ffaad8b75c1076b98c5b51ea"
  );

  await expectHash(
    "examples/action-files/target-confirmed-support-ticket.action.json",
    "sha256:51679947418fdef8abec1f0171e236685cc7f3027b548816765f8708eacc61c9"
  );

  await expectHash(
    "examples/action-files/externally-verifiable-file-delivered.action.json",
    "sha256:101d847f15ffca1dceaa26d8e1b0da761fd29b748b2acd314b8b7e12c086e6ad"
  );

  const targetConfirmed = readJson("examples/action-files/target-confirmed-support-ticket.action.json");
  const originalHash = await hashActionFileCore(targetConfirmed);

  const localAnnotationMutation = cloneJson(targetConfirmed);
  localAnnotationMutation.local_annotations = {
    reviewer: "demo-reviewer",
    note: "This annotation is outside the hashable payload.",
  };
  assert.strictEqual(
    await hashActionFileCore(localAnnotationMutation),
    originalHash,
    "changing local_annotations must not change payload hash"
  );

  const integrityMutation = cloneJson(targetConfirmed);
  integrityMutation.integrity.payload_hash = "sha256:0000000000000000000000000000000000000000000000000000000000000000";
  integrityMutation.integrity.seal = { status: "changed_outside_hashable_payload" };
  assert.strictEqual(
    await hashActionFileCore(integrityMutation),
    originalHash,
    "changing integrity must not change payload hash"
  );

  const actionCoreMutation = cloneJson(targetConfirmed);
  actionCoreMutation.action_core.action.summary = "Created a support ticket from a modified incoming request.";
  assert.strictEqual(
    await hashActionFileCore(actionCoreMutation),
    "sha256:0c3ee55db1b65e55eafc3cb33c1c09d5b857161f3cf0535bb169054de537c3a7",
    "changing action_core.action.summary must change payload hash"
  );

  const evidenceOrderMutation = cloneJson(readJson("examples/action-files/externally-verifiable-file-delivered.action.json"));
  evidenceOrderMutation.action_core.evidence.references.reverse();
  assert.notStrictEqual(
    await hashActionFileCore(evidenceOrderMutation),
    "sha256:101d847f15ffca1dceaa26d8e1b0da761fd29b748b2acd314b8b7e12c086e6ad",
    "changing array order inside action_core must change payload hash"
  );

  const hashablePayload = createHashableActionFilePayload(targetConfirmed);
  assert.deepStrictEqual(Object.keys(hashablePayload).sort(), ["action_core", "format", "schema_version"]);

  const canonical = canonicalizeActionFileCore(targetConfirmed);
  assert.ok(canonical.startsWith('{"action_core":'), "canonical payload should start with sorted action_core key");
  assert.ok(!canonical.includes("local_annotations"), "canonical payload must not include local_annotations");
  assert.ok(!canonical.includes("verification_result"), "canonical payload must not include verification_result");
  assert.ok(!canonical.includes("payload_hash"), "canonical payload must not include payload_hash");

  assert.ok(fs.existsSync(examplesDir), "examples/action-files directory should exist");
  console.log("Action File v1 local hash helper tests passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
