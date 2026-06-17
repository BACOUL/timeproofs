/* tests/seal-api-worker.test.js
 * Dependency-free smoke tests for api-v02/worker.js /api/seal.
 *
 * Run from repo root with:
 *   node tests/seal-api-worker.test.js
 *
 * Security note:
 * - This test generates an ephemeral Ed25519 key pair at runtime.
 * - No private key is committed to the repository.
 * - No production key material is used.
 */

const assert = require("assert");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const workerPath = path.join(__dirname, "..", "api-v02", "worker.js");
const workerSource = fs.readFileSync(workerPath, "utf8");

function createRuntimeTestKeys() {
  return crypto.generateKeyPairSync("ed25519", {
    publicKeyEncoding: {
      type: "spki",
      format: "der",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "der",
    },
  });
}

function derToBase64(der) {
  return Buffer.from(der).toString("base64");
}

function base64urlDecode(value) {
  const normalized = String(value || "").replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
  return Buffer.from(`${normalized}${padding}`, "base64");
}

function compareByUnicodeCodePoint(a, b) {
  if (a === b) return 0;

  const aPoints = Array.from(a);
  const bPoints = Array.from(b);
  const length = Math.min(aPoints.length, bPoints.length);

  for (let i = 0; i < length; i += 1) {
    const aCode = aPoints[i].codePointAt(0);
    const bCode = bPoints[i].codePointAt(0);
    if (aCode !== bCode) return aCode - bCode;
  }

  return aPoints.length - bPoints.length;
}

function canonicalizeJsonValue(value) {
  if (value === null) return "null";

  const valueType = typeof value;

  if (valueType === "string") return JSON.stringify(value);
  if (valueType === "boolean") return value ? "true" : "false";

  if (valueType === "number") {
    if (!Number.isFinite(value)) throw new Error("Non-finite number is not allowed");
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => canonicalizeJsonValue(item)).join(",")}]`;
  }

  if (value && typeof value === "object" && !Array.isArray(value)) {
    const keys = Object.keys(value).sort(compareByUnicodeCodePoint);
    const entries = keys.map((key) => `${JSON.stringify(key)}:${canonicalizeJsonValue(value[key])}`);
    return `{${entries.join(",")}}`;
  }

  throw new Error("Unsupported non-JSON value");
}

function createWorkerHarness(bindings = {}) {
  let fetchHandler = null;

  const sandbox = {
    ...bindings,
    console,
    URL,
    Response,
    Request,
    Headers,
    TextEncoder,
    crypto: crypto.webcrypto,
    atob: (value) => Buffer.from(String(value), "base64").toString("binary"),
    btoa: (value) => Buffer.from(String(value), "binary").toString("base64"),
    addEventListener: (eventName, callback) => {
      if (eventName === "fetch") fetchHandler = callback;
    },
  };

  vm.createContext(sandbox);
  vm.runInContext(workerSource, sandbox, { filename: "api-v02/worker.js" });

  if (typeof fetchHandler !== "function") {
    throw new Error("Worker fetch handler was not registered");
  }

  async function requestSeal(body) {
    const request = new Request("https://api.timeproofs.io/api/seal", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    let responsePromise;
    fetchHandler({
      request,
      respondWith: (promise) => {
        responsePromise = Promise.resolve(promise);
      },
    });

    const response = await responsePromise;
    const json = await response.json();
    return { response, json };
  }

  return { requestSeal };
}

async function main() {
  const validRequest = {
    format: "timeproofs.action.v1",
    action_id: "act_demo_001",
    payload_hash: "sha256:231c6b5ca29078119421fcf4aedaee827917b1b6ffaad8b75c1076b98c5b51ea",
    proof_level: "executed",
    client_generated_at: "2026-06-17T08:00:00Z",
    metadata: {
      source: "local-test",
      environment: "test",
    },
  };

  const missingKeyHarness = createWorkerHarness();
  const missingKey = await missingKeyHarness.requestSeal(validRequest);
  assert.strictEqual(missingKey.response.status, 503, "missing signing key should return HTTP 503");
  assert.strictEqual(missingKey.json.ok, false);
  assert.strictEqual(missingKey.json.error.code, "signing_unavailable");

  const invalidHash = await missingKeyHarness.requestSeal({
    ...validRequest,
    payload_hash: "sha256:ABC",
  });
  assert.strictEqual(invalidHash.response.status, 400, "invalid payload_hash should return HTTP 400");
  assert.strictEqual(invalidHash.json.error.code, "invalid_payload_hash");

  const sensitivePrompt = await missingKeyHarness.requestSeal({
    ...validRequest,
    prompt: "Do not send prompts to the default Seal API.",
  });
  assert.strictEqual(sensitivePrompt.response.status, 400, "prompt should be rejected");
  assert.strictEqual(sensitivePrompt.json.error.code, "sensitive_content_rejected");
  assert.deepStrictEqual(sensitivePrompt.json.error.fields, ["$.prompt"]);

  const sensitiveNested = await missingKeyHarness.requestSeal({
    ...validRequest,
    metadata: {
      source: "local-test",
      action_core: {
        action_id: "should_not_be_sent_to_seal_api",
      },
    },
  });
  assert.strictEqual(sensitiveNested.response.status, 400, "nested action_core should be rejected");
  assert.strictEqual(sensitiveNested.json.error.code, "sensitive_content_rejected");
  assert.deepStrictEqual(sensitiveNested.json.error.fields, ["$.metadata.action_core"]);

  const unexpectedField = await missingKeyHarness.requestSeal({
    ...validRequest,
    extra: "unsupported",
  });
  assert.strictEqual(unexpectedField.response.status, 422, "unexpected top-level field should return HTTP 422");
  assert.strictEqual(unexpectedField.json.error.code, "validation_failed");

  const { publicKey, privateKey } = createRuntimeTestKeys();
  const privateKeyB64 = derToBase64(privateKey);
  const publicKeyObject = crypto.createPublicKey({ key: publicKey, format: "der", type: "spki" });
  const configuredHarness = createWorkerHarness({
    SEAL_ED25519_SECRET: privateKeyB64,
    SEAL_PUBLIC_KEY_ID: "timeproofs-test-runtime-001",
  });

  const validSeal = await configuredHarness.requestSeal(validRequest);
  assert.strictEqual(validSeal.response.status, 200, "valid Seal request should return HTTP 200");
  assert.strictEqual(validSeal.json.ok, true);
  assert.strictEqual(validSeal.json.seal.seal_payload.seal_version, "timeproofs.seal.v1");
  assert.strictEqual(validSeal.json.seal.seal_payload.payload_hash, validRequest.payload_hash);
  assert.strictEqual(validSeal.json.seal.seal_payload.format, "timeproofs.action.v1");
  assert.strictEqual(validSeal.json.seal.seal_payload.action_id, "act_demo_001");
  assert.strictEqual(validSeal.json.seal.seal_payload.proof_level, "executed");
  assert.strictEqual(validSeal.json.seal.seal_payload.public_key_id, "timeproofs-test-runtime-001");
  assert.strictEqual(validSeal.json.seal.seal_payload.signature_algorithm, "Ed25519");
  assert.match(validSeal.json.seal.signature, /^[A-Za-z0-9_-]+$/, "Seal signature should be base64url encoded");

  const canonicalSealPayload = canonicalizeJsonValue(validSeal.json.seal.seal_payload);
  const signatureBytes = base64urlDecode(validSeal.json.seal.signature);
  const signatureValid = crypto.verify(null, Buffer.from(canonicalSealPayload, "utf8"), publicKeyObject, signatureBytes);
  assert.strictEqual(signatureValid, true, "Seal signature should verify with the runtime public key");

  const mutatedSealPayload = {
    ...validSeal.json.seal.seal_payload,
    payload_hash: "sha256:0000000000000000000000000000000000000000000000000000000000000000",
  };
  const mutatedCanonical = canonicalizeJsonValue(mutatedSealPayload);
  const mutatedSignatureValid = crypto.verify(null, Buffer.from(mutatedCanonical, "utf8"), publicKeyObject, signatureBytes);
  assert.strictEqual(mutatedSignatureValid, false, "mutated Seal payload must not verify against original signature");

  console.log("Seal API worker smoke tests passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
