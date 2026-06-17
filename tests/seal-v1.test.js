/* tests/seal-v1.test.js
 * Dependency-free smoke tests for sdk/seal-v1.js.
 *
 * Run from repo root with:
 *   node tests/seal-v1.test.js
 *
 * Security note:
 * - This test generates an ephemeral Ed25519 key pair at runtime.
 * - No private key is committed to the repository.
 * - No production key material is used.
 */

const assert = require("assert");
const crypto = require("crypto");

const {
  SEAL_VERSION,
  ACTION_FILE_FORMAT,
  SIGNATURE_ALGORITHM,
  CANONICALIZATION_PROFILE,
  createSealPayload,
  validateSealPayload,
  canonicalizeSealPayload,
  signSealPayload,
  createSeal,
  verifySeal,
} = require("../sdk/seal-v1.js");

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function createRuntimeTestKeys() {
  return crypto.generateKeyPairSync("ed25519", {
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });
}

async function main() {
  assert.strictEqual(SEAL_VERSION, "timeproofs.seal.v1");
  assert.strictEqual(ACTION_FILE_FORMAT, "timeproofs.action.v1");
  assert.strictEqual(SIGNATURE_ALGORITHM, "Ed25519");
  assert.strictEqual(CANONICALIZATION_PROFILE, "timeproofs-json-canonical-v1");

  const { publicKey, privateKey } = createRuntimeTestKeys();

  const sealPayload = createSealPayload({
    seal_id: "seal_test_001",
    payload_hash: "sha256:231c6b5ca29078119421fcf4aedaee827917b1b6ffaad8b75c1076b98c5b51ea",
    action_id: "act_demo_001",
    proof_level: "executed",
    sealed_at: "2026-06-17T08:30:00Z",
    public_key_id: "timeproofs-test-runtime-001",
  });

  assert.strictEqual(sealPayload.seal_version, "timeproofs.seal.v1");
  assert.strictEqual(sealPayload.format, "timeproofs.action.v1");
  assert.strictEqual(sealPayload.signature_algorithm, "Ed25519");
  validateSealPayload(sealPayload);

  const canonicalPayload = canonicalizeSealPayload(sealPayload);
  assert.ok(canonicalPayload.startsWith('{"action_id":'), "Seal payload canonicalization should sort keys");
  assert.ok(canonicalPayload.includes('"payload_hash"'), "canonical Seal payload should include payload_hash");
  assert.ok(!canonicalPayload.includes("signature"), "canonical Seal payload must not include signature");

  const signed = signSealPayload(sealPayload, { private_key_pem: privateKey });
  assert.strictEqual(signed.signature_algorithm, "Ed25519");
  assert.strictEqual(signed.canonicalization_profile, "timeproofs-json-canonical-v1");
  assert.match(signed.signature, /^[A-Za-z0-9_-]+$/, "signature should be base64url encoded");

  const seal = createSeal(sealPayload, { private_key_pem: privateKey });
  assert.deepStrictEqual(seal.seal_payload, sealPayload);
  assert.match(seal.signature, /^[A-Za-z0-9_-]+$/, "Seal signature should be base64url encoded");

  const verification = verifySeal(seal, { public_key_pem: publicKey });
  assert.strictEqual(verification.ok, true, "valid Seal should verify");
  assert.strictEqual(verification.status, "valid");
  assert.strictEqual(verification.public_key_id, "timeproofs-test-runtime-001");

  const mutatedSeal = cloneJson(seal);
  mutatedSeal.seal_payload.payload_hash = "sha256:0000000000000000000000000000000000000000000000000000000000000000";
  const mutatedVerification = verifySeal(mutatedSeal, { public_key_pem: publicKey });
  assert.strictEqual(mutatedVerification.ok, false, "mutated Seal payload should not verify");
  assert.strictEqual(mutatedVerification.status, "invalid_signature");

  const wrongKeyPair = createRuntimeTestKeys();
  const wrongKeyVerification = verifySeal(seal, { public_key_pem: wrongKeyPair.publicKey });
  assert.strictEqual(wrongKeyVerification.ok, false, "Seal should not verify with a different public key");
  assert.strictEqual(wrongKeyVerification.status, "invalid_signature");

  assert.throws(
    () => signSealPayload(sealPayload, {}),
    /private key is required/,
    "signSealPayload should fail closed when private key is missing"
  );

  assert.throws(
    () =>
      createSealPayload({
        seal_id: "seal_invalid_hash",
        payload_hash: "sha256:ABC",
        action_id: "act_demo_001",
        proof_level: "executed",
        sealed_at: "2026-06-17T08:30:00Z",
        public_key_id: "timeproofs-test-runtime-001",
      }),
    /payload_hash must match/,
    "createSealPayload should reject invalid payload_hash format"
  );

  assert.throws(
    () =>
      createSealPayload({
        seal_id: "seal_invalid_level",
        payload_hash: "sha256:231c6b5ca29078119421fcf4aedaee827917b1b6ffaad8b75c1076b98c5b51ea",
        action_id: "act_demo_001",
        proof_level: "certified",
        sealed_at: "2026-06-17T08:30:00Z",
        public_key_id: "timeproofs-test-runtime-001",
      }),
    /proof_level must be one of/,
    "createSealPayload should reject unsupported proof level"
  );

  const invalidSeal = verifySeal({ seal_payload: sealPayload, signature: "not valid base64url !" }, { public_key_pem: publicKey });
  assert.strictEqual(invalidSeal.ok, false, "invalid signature format should fail verification");

  console.log("Seal v1 local signing helper tests passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
