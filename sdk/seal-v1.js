/* sdk/seal-v1.js
 * TimeProofs Seal v1 local signing helpers
 *
 * Scope:
 * - Build, canonicalize, sign, and verify TimeProofs Seal payloads locally.
 * - No API calls.
 * - No key generation.
 * - No key storage.
 * - No committed private keys.
 * - No legal/compliance claim verification.
 * - No sensitive Action File content is required.
 *
 * Profile: timeproofs-json-canonical-v1 for Seal payload canonicalization.
 */

(function (root, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory(require("./action-file-v1.js"));
  } else if (typeof define === "function" && define.amd) {
    define(["./action-file-v1"], factory);
  } else {
    root.TimeProofsSealV1 = factory(root.TimeProofsActionFileV1);
  }
})(typeof self !== "undefined" ? self : this, function (actionFileV1) {
  "use strict";

  const SEAL_VERSION = "timeproofs.seal.v1";
  const ACTION_FILE_FORMAT = "timeproofs.action.v1";
  const SIGNATURE_ALGORITHM = "Ed25519";
  const CANONICALIZATION_PROFILE = "timeproofs-json-canonical-v1";
  const PAYLOAD_HASH_PATTERN = /^sha256:[a-f0-9]{64}$/;
  const PROOF_LEVELS = ["declared", "executed", "target_confirmed", "externally_verifiable"];

  const REQUIRED_SEAL_PAYLOAD_KEYS = [
    "seal_version",
    "seal_id",
    "payload_hash",
    "format",
    "action_id",
    "proof_level",
    "sealed_at",
    "public_key_id",
    "signature_algorithm",
  ];

  function getNodeCrypto() {
    if (typeof require !== "function") {
      throw new Error("Node.js crypto is required for local Seal signing helpers");
    }
    return require("crypto");
  }

  function isPlainObject(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
  }

  function assertJsonCompatible(value, path) {
    const currentPath = path || "$";

    if (value === null) return;

    const valueType = typeof value;
    if (valueType === "string" || valueType === "boolean") return;

    if (valueType === "number") {
      if (!Number.isFinite(value)) {
        throw new Error(`Non-finite number is not allowed at ${currentPath}`);
      }
      return;
    }

    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i += 1) {
        assertJsonCompatible(value[i], `${currentPath}[${i}]`);
      }
      return;
    }

    if (isPlainObject(value)) {
      for (const key of Object.keys(value)) {
        const child = value[key];
        if (typeof child === "undefined") {
          throw new Error(`undefined is not valid JSON at ${currentPath}.${key}`);
        }
        assertJsonCompatible(child, `${currentPath}.${key}`);
      }
      return;
    }

    throw new Error(`Unsupported non-JSON value at ${currentPath}`);
  }

  function cloneJson(value, path) {
    assertJsonCompatible(value, path || "$ ".trim());
    return JSON.parse(JSON.stringify(value));
  }

  function assertNonEmptyString(value, path) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(`${path} must be a non-empty string`);
    }
  }

  function assertEnum(value, allowed, path) {
    assertNonEmptyString(value, path);
    if (!allowed.includes(value)) {
      throw new Error(`${path} must be one of: ${allowed.join(", ")}`);
    }
  }

  function base64urlEncode(buffer) {
    return Buffer.from(buffer)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
  }

  function base64urlDecode(value) {
    assertNonEmptyString(value, "signature");
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
    return Buffer.from(`${normalized}${padding}`, "base64");
  }

  function validatePayloadHash(payloadHash) {
    assertNonEmptyString(payloadHash, "payload_hash");
    if (!PAYLOAD_HASH_PATTERN.test(payloadHash)) {
      throw new Error("payload_hash must match sha256:<64 lowercase hex>");
    }
  }

  function validateSealPayload(sealPayload) {
    if (!isPlainObject(sealPayload)) {
      throw new Error("Seal payload must be a JSON object");
    }

    for (const key of REQUIRED_SEAL_PAYLOAD_KEYS) {
      if (!Object.prototype.hasOwnProperty.call(sealPayload, key)) {
        throw new Error(`Seal payload missing required field: ${key}`);
      }
    }

    assertEnum(sealPayload.seal_version, [SEAL_VERSION], "seal_version");
    assertNonEmptyString(sealPayload.seal_id, "seal_id");
    validatePayloadHash(sealPayload.payload_hash);
    assertEnum(sealPayload.format, [ACTION_FILE_FORMAT], "format");
    assertNonEmptyString(sealPayload.action_id, "action_id");
    assertEnum(sealPayload.proof_level, PROOF_LEVELS, "proof_level");
    assertNonEmptyString(sealPayload.sealed_at, "sealed_at");
    assertNonEmptyString(sealPayload.public_key_id, "public_key_id");
    assertEnum(sealPayload.signature_algorithm, [SIGNATURE_ALGORITHM], "signature_algorithm");

    assertJsonCompatible(sealPayload, "seal_payload");
    return sealPayload;
  }

  function createSealPayload(input) {
    if (!isPlainObject(input)) {
      throw new Error("createSealPayload expects an object");
    }

    const sealPayload = {
      seal_version: input.seal_version || SEAL_VERSION,
      seal_id: input.seal_id,
      payload_hash: input.payload_hash,
      format: input.format || ACTION_FILE_FORMAT,
      action_id: input.action_id,
      proof_level: input.proof_level,
      sealed_at: input.sealed_at,
      public_key_id: input.public_key_id,
      signature_algorithm: input.signature_algorithm || SIGNATURE_ALGORITHM,
    };

    validateSealPayload(sealPayload);
    return cloneJson(sealPayload, "seal_payload");
  }

  function canonicalizeSealPayload(sealPayload) {
    validateSealPayload(sealPayload);

    if (!actionFileV1 || typeof actionFileV1.canonicalizeJsonValue !== "function") {
      throw new Error("TimeProofs Action File canonicalization helper is required");
    }

    return actionFileV1.canonicalizeJsonValue(sealPayload);
  }

  function resolvePrivateKey(options) {
    const cfg = isPlainObject(options) ? options : {};
    const privateKey = cfg.private_key || cfg.privateKey || cfg.private_key_pem || cfg.privateKeyPem;

    if (!privateKey) {
      throw new Error("Ed25519 private key is required and must be provided at runtime");
    }

    return privateKey;
  }

  function resolvePublicKey(options) {
    const cfg = isPlainObject(options) ? options : {};
    const publicKey = cfg.public_key || cfg.publicKey || cfg.public_key_pem || cfg.publicKeyPem;

    if (!publicKey) {
      throw new Error("Ed25519 public key is required for Seal verification");
    }

    return publicKey;
  }

  function signSealPayload(sealPayload, options) {
    const crypto = getNodeCrypto();
    const canonicalPayload = canonicalizeSealPayload(sealPayload);
    const privateKey = resolvePrivateKey(options);
    const signature = crypto.sign(null, Buffer.from(canonicalPayload, "utf8"), privateKey);

    return {
      signature: base64urlEncode(signature),
      signature_algorithm: SIGNATURE_ALGORITHM,
      canonicalization_profile: CANONICALIZATION_PROFILE,
    };
  }

  function createSeal(sealPayload, options) {
    const payload = createSealPayload(sealPayload);
    const signed = signSealPayload(payload, options);

    return {
      seal_payload: payload,
      signature: signed.signature,
    };
  }

  function verifySeal(seal, options) {
    if (!isPlainObject(seal)) {
      return {
        ok: false,
        status: "invalid_seal",
        error: "Seal must be a JSON object",
      };
    }

    if (!isPlainObject(seal.seal_payload)) {
      return {
        ok: false,
        status: "invalid_seal_payload",
        error: "seal.seal_payload must be a JSON object",
      };
    }

    try {
      const crypto = getNodeCrypto();
      const canonicalPayload = canonicalizeSealPayload(seal.seal_payload);
      const publicKey = resolvePublicKey(options);
      const signature = base64urlDecode(seal.signature);
      const ok = crypto.verify(null, Buffer.from(canonicalPayload, "utf8"), publicKey, signature);

      return {
        ok,
        status: ok ? "valid" : "invalid_signature",
        public_key_id: seal.seal_payload.public_key_id,
        signature_algorithm: SIGNATURE_ALGORITHM,
        canonicalization_profile: CANONICALIZATION_PROFILE,
      };
    } catch (error) {
      return {
        ok: false,
        status: "verification_error",
        error: error.message,
      };
    }
  }

  return {
    SEAL_VERSION,
    ACTION_FILE_FORMAT,
    SIGNATURE_ALGORITHM,
    CANONICALIZATION_PROFILE,
    REQUIRED_SEAL_PAYLOAD_KEYS,
    createSealPayload,
    validateSealPayload,
    canonicalizeSealPayload,
    signSealPayload,
    createSeal,
    verifySeal,
  };
});
