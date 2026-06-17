/* tests/action-file-v1.test.js
 * Dependency-free smoke tests for sdk/action-file-v1.js.
 * Run from repo root with: node tests/action-file-v1.test.js
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

const {
  CANONICALIZATION_PROFILE,
  createActionFile,
  validateActionFile,
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

  const validation = await validateActionFile(actionFile);
  assert.strictEqual(validation.ok, true, `${relativePath} validateActionFile should pass`);
  assert.strictEqual(validation.status, "valid");
  assert.strictEqual(validation.expected_payload_hash, expectedHash);
  assert.strictEqual(validation.actual_payload_hash, expectedHash);
  assert.deepStrictEqual(validation.errors, []);
  assert.strictEqual(validation.profile, CANONICALIZATION_PROFILE);
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
  const localAnnotationValidation = await validateActionFile(localAnnotationMutation);
  assert.strictEqual(localAnnotationValidation.ok, true, "changing local_annotations should still validate");

  const integrityMutation = cloneJson(targetConfirmed);
  integrityMutation.integrity.payload_hash = "sha256:0000000000000000000000000000000000000000000000000000000000000000";
  integrityMutation.integrity.seal = { status: "changed_outside_hashable_payload" };
  assert.strictEqual(
    await hashActionFileCore(integrityMutation),
    originalHash,
    "changing integrity must not change payload hash"
  );
  const integrityMutationValidation = await validateActionFile(integrityMutation);
  assert.strictEqual(integrityMutationValidation.ok, false, "wrong integrity.payload_hash should fail validation");
  assert.strictEqual(integrityMutationValidation.status, "modified_payload");
  assert.strictEqual(integrityMutationValidation.actual_payload_hash, originalHash);

  const actionCoreMutation = cloneJson(targetConfirmed);
  actionCoreMutation.action_core.action.summary = "Created a support ticket from a modified incoming request.";
  assert.strictEqual(
    await hashActionFileCore(actionCoreMutation),
    "sha256:0c3ee55db1b65e55eafc3cb33c1c09d5b857161f3cf0535bb169054de537c3a7",
    "changing action_core.action.summary must change payload hash"
  );
  const actionCoreMutationValidation = await validateActionFile(actionCoreMutation);
  assert.strictEqual(actionCoreMutationValidation.ok, false, "changed action_core should fail validation against stored hash");
  assert.strictEqual(actionCoreMutationValidation.status, "modified_payload");
  assert.ok(
    actionCoreMutationValidation.errors.includes("integrity.payload_hash does not match the recomputed payload hash"),
    "changed action_core should report payload hash mismatch"
  );

  const evidenceOrderMutation = cloneJson(readJson("examples/action-files/externally-verifiable-file-delivered.action.json"));
  evidenceOrderMutation.action_core.evidence.references.reverse();
  assert.notStrictEqual(
    await hashActionFileCore(evidenceOrderMutation),
    "sha256:101d847f15ffca1dceaa26d8e1b0da761fd29b748b2acd314b8b7e12c086e6ad",
    "changing array order inside action_core must change payload hash"
  );
  const evidenceOrderValidation = await validateActionFile(evidenceOrderMutation);
  assert.strictEqual(evidenceOrderValidation.ok, false, "changed evidence order should fail validation");
  assert.strictEqual(evidenceOrderValidation.status, "modified_payload");

  const hashablePayload = createHashableActionFilePayload(targetConfirmed);
  assert.deepStrictEqual(Object.keys(hashablePayload).sort(), ["action_core", "format", "schema_version"]);

  const canonical = canonicalizeActionFileCore(targetConfirmed);
  assert.ok(canonical.startsWith('{"action_core":'), "canonical payload should start with sorted action_core key");
  assert.ok(!canonical.includes("local_annotations"), "canonical payload must not include local_annotations");
  assert.ok(!canonical.includes("verification_result"), "canonical payload must not include verification_result");
  assert.ok(!canonical.includes("payload_hash"), "canonical payload must not include payload_hash");

  const createdFromCore = createActionFile(
    {
      action_core: targetConfirmed.action_core,
      local_annotations: { note: "outside hash" },
    },
    { include_empty_non_hashable_containers: true }
  );

  assert.strictEqual(createdFromCore.format, "timeproofs.action.v1");
  assert.strictEqual(createdFromCore.schema_version, "1.0.0-design");
  assert.strictEqual(createdFromCore.integrity.canonicalization_profile, "timeproofs-json-canonical-v1");
  assert.strictEqual(createdFromCore.integrity.hash_algorithm, "sha256");
  assert.deepStrictEqual(createdFromCore.local_annotations, { note: "outside hash" });
  assert.deepStrictEqual(createdFromCore.verification_result, {});
  assert.strictEqual(
    await hashActionFileCore(createdFromCore),
    "sha256:51679947418fdef8abec1f0171e236685cc7f3027b548816765f8708eacc61c9",
    "createActionFile from action_core should preserve the same hashable payload"
  );
  const createdFromCoreMissingHash = await validateActionFile(createdFromCore);
  assert.strictEqual(createdFromCoreMissingHash.ok, false, "created file without payload_hash should fail strict validation");
  assert.ok(
    createdFromCoreMissingHash.errors.includes("integrity.payload_hash is required"),
    "strict validation should require integrity.payload_hash"
  );
  const createdFromCoreLooseValidation = await validateActionFile(createdFromCore, { require_payload_hash: false });
  assert.strictEqual(createdFromCoreLooseValidation.ok, true, "loose validation should allow missing payload_hash");
  assert.strictEqual(
    createdFromCoreLooseValidation.actual_payload_hash,
    "sha256:51679947418fdef8abec1f0171e236685cc7f3027b548816765f8708eacc61c9"
  );

  const createdFromFields = createActionFile({
    action_id: "act_demo_created_from_fields_001",
    created_at: "2026-06-16T19:05:00Z",
    actor: {
      type: "automation",
      id: "local_creator_test",
      name: "Local creator test",
      version: "1.0.0",
    },
    action: {
      type: "document.generated",
      status: "executed",
      summary: "Generated a synthetic document record locally.",
      occurred_at: "2026-06-16T19:05:00Z",
    },
    proof_level: "executed",
    workflow: {
      provider: "local_test",
      workflow_id: "wf_local_creator_test",
      run_id: "run_local_creator_001",
      environment: "test",
    },
    evidence: {
      references: [
        {
          type: "generated_document_fingerprint",
          reference: "generated-doc-demo-001",
          fingerprint: "sha256:5555555555555555555555555555555555555555555555555555555555555555",
          stored_by: "customer",
        },
      ],
    },
    limitations: ["Synthetic local creation test only."],
  });

  assert.strictEqual(createdFromFields.action_core.action_id, "act_demo_created_from_fields_001");
  assert.strictEqual(createdFromFields.action_core.proof_level, "executed");
  assert.strictEqual(createdFromFields.integrity.canonicalization_profile, "timeproofs-json-canonical-v1");
  assert.ok(!createdFromFields.local_annotations, "local_annotations should be omitted unless provided or requested");
  assert.ok(!createdFromFields.verification_result, "verification_result should be omitted unless provided or requested");

  const invalidTopLevel = cloneJson(targetConfirmed);
  invalidTopLevel.seal = { status: "unexpected_top_level" };
  const invalidTopLevelValidation = await validateActionFile(invalidTopLevel);
  assert.strictEqual(invalidTopLevelValidation.ok, false, "unexpected top-level seal should fail validation");
  assert.ok(
    invalidTopLevelValidation.errors.includes("Unexpected top-level key: seal"),
    "unexpected top-level key should be reported"
  );

  const invalidPayloadHashFormat = cloneJson(targetConfirmed);
  invalidPayloadHashFormat.integrity.payload_hash = "sha256:ABC";
  const invalidPayloadHashValidation = await validateActionFile(invalidPayloadHashFormat);
  assert.strictEqual(invalidPayloadHashValidation.ok, false, "invalid payload hash format should fail validation");
  assert.ok(
    invalidPayloadHashValidation.errors.includes("integrity.payload_hash must match sha256:<64 lowercase hex>"),
    "invalid payload hash format should be reported"
  );

  assert.throws(
    () =>
      createActionFile({
        action_id: "act_invalid_missing_actor",
        created_at: "2026-06-16T19:10:00Z",
        action: {
          type: "email.drafted",
          status: "declared",
          summary: "Invalid missing actor.",
        },
        proof_level: "declared",
      }),
    /actor must be an object/,
    "createActionFile should reject missing actor"
  );

  assert.throws(
    () =>
      createActionFile({
        action_id: "act_invalid_proof_level",
        created_at: "2026-06-16T19:10:00Z",
        actor: { type: "automation", id: "test" },
        action: {
          type: "email.drafted",
          status: "declared",
          summary: "Invalid proof level.",
        },
        proof_level: "certified",
      }),
    /proof_level must be one of/,
    "createActionFile should reject unsupported proof level"
  );

  assert.ok(fs.existsSync(examplesDir), "examples/action-files directory should exist");
  console.log("Action File v1 local helper tests passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
