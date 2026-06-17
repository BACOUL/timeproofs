/* tests/local-verify-seal.test.js
 * Dependency-free smoke tests for examples/local-verify-seal.js.
 *
 * Run from repo root with:
 *   node tests/local-verify-seal.test.js
 *
 * Security note:
 * - This test generates ephemeral Ed25519 keys at runtime.
 * - No private key is committed to the repository.
 * - No production key material is used.
 */

const assert = require("assert");
const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const { createActionFile, hashActionFileCore } = require("../sdk/action-file-v1.js");
const { createSealPayload, createSeal } = require("../sdk/seal-v1.js");

const verifierPath = path.join(__dirname, "..", "examples", "local-verify-seal.js");

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

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function runVerifier(args) {
  const result = spawnSync(process.execPath, [verifierPath, ...args], {
    cwd: path.join(__dirname, ".."),
    encoding: "utf8",
  });

  const output = result.stdout || result.stderr;
  let parsed = null;
  try {
    parsed = JSON.parse(output);
  } catch (_) {
    parsed = null;
  }

  return { result, parsed, output };
}

async function main() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "timeproofs-seal-verify-"));

  const keys = createRuntimeTestKeys();
  const wrongKeys = createRuntimeTestKeys();

  const publicKeyPath = path.join(tmpDir, "public-key.pem");
  const wrongPublicKeyPath = path.join(tmpDir, "wrong-public-key.pem");
  const sealPath = path.join(tmpDir, "seal.json");
  const actionFilePath = path.join(tmpDir, "action.action.json");
  const mutatedActionFilePath = path.join(tmpDir, "mutated.action.json");

  fs.writeFileSync(publicKeyPath, keys.publicKey, "utf8");
  fs.writeFileSync(wrongPublicKeyPath, wrongKeys.publicKey, "utf8");

  const actionFile = createActionFile({
    action_id: "act_local_verify_001",
    created_at: "2026-06-17T09:00:00Z",
    actor: {
      type: "ai_agent",
      id: "agent_local_verify",
    },
    action: {
      type: "document.summary.created",
      status: "executed",
      summary: "Synthetic Action File for local Seal verification tests.",
    },
    proof_level: "executed",
    workflow: {
      id: "wf_local_verify",
      name: "Local verify test workflow",
      step: "summary",
    },
    target_system: {
      type: "local_file",
      name: "Local test fixture",
    },
    evidence: [
      {
        type: "local_reference",
        reference: "local-test-only",
        stored_by: "customer",
      },
    ],
    metadata: {
      environment: "test",
    },
  });

  const payloadHash = await hashActionFileCore(actionFile);
  actionFile.integrity.payload_hash = payloadHash;

  const sealPayload = createSealPayload({
    seal_id: "seal_local_verify_001",
    payload_hash: payloadHash,
    action_id: "act_local_verify_001",
    proof_level: "executed",
    sealed_at: "2026-06-17T09:00:01Z",
    public_key_id: "timeproofs-test-runtime-verify-001",
  });

  const seal = createSeal(sealPayload, { private_key_pem: keys.privateKey });

  writeJson(actionFilePath, actionFile);
  writeJson(sealPath, seal);

  const validSignatureOnly = runVerifier(["--seal", sealPath, "--public-key", publicKeyPath, "--json"]);
  assert.strictEqual(validSignatureOnly.result.status, 0, "signature-only valid Seal should exit 0");
  assert.strictEqual(validSignatureOnly.parsed.ok, true);
  assert.strictEqual(validSignatureOnly.parsed.status, "valid");
  assert.strictEqual(validSignatureOnly.parsed.payload_hash.matches, null);

  const validWithActionFile = runVerifier([
    "--seal",
    sealPath,
    "--public-key",
    publicKeyPath,
    "--action-file",
    actionFilePath,
    "--json",
  ]);
  assert.strictEqual(validWithActionFile.result.status, 0, "valid Seal + matching Action File should exit 0");
  assert.strictEqual(validWithActionFile.parsed.ok, true);
  assert.strictEqual(validWithActionFile.parsed.status, "valid");
  assert.strictEqual(validWithActionFile.parsed.payload_hash.matches, true);
  assert.strictEqual(validWithActionFile.parsed.payload_hash.expected, payloadHash);
  assert.strictEqual(validWithActionFile.parsed.payload_hash.actual, payloadHash);

  const mutatedActionFile = JSON.parse(JSON.stringify(actionFile));
  mutatedActionFile.action_core.action.summary = "Mutated summary should change payload hash.";
  writeJson(mutatedActionFilePath, mutatedActionFile);

  const modifiedPayload = runVerifier([
    "--seal",
    sealPath,
    "--public-key",
    publicKeyPath,
    "--action-file",
    mutatedActionFilePath,
    "--json",
  ]);
  assert.notStrictEqual(modifiedPayload.result.status, 0, "modified payload should exit non-zero");
  assert.strictEqual(modifiedPayload.parsed.ok, false);
  assert.strictEqual(modifiedPayload.parsed.status, "modified_payload");
  assert.strictEqual(modifiedPayload.parsed.payload_hash.matches, false);

  const wrongPublicKey = runVerifier(["--seal", sealPath, "--public-key", wrongPublicKeyPath, "--json"]);
  assert.notStrictEqual(wrongPublicKey.result.status, 0, "wrong public key should exit non-zero");
  assert.strictEqual(wrongPublicKey.parsed.ok, false);
  assert.strictEqual(wrongPublicKey.parsed.status, "invalid_signature");

  const missingPublicKey = runVerifier(["--seal", sealPath, "--json"]);
  assert.notStrictEqual(missingPublicKey.result.status, 0, "missing public key should exit non-zero");
  assert.match(missingPublicKey.output, /Missing required --public-key/);

  console.log("Local Seal verifier tests passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
