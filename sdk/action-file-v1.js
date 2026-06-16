/* sdk/action-file-v1.js
 * TimeProofs Action File v1 local helpers
 *
 * Scope:
 * - Local canonicalization and hashing only.
 * - No API calls.
 * - No seal creation.
 * - No verification of legal/compliance claims.
 * - No sensitive content leaves the caller environment.
 *
 * Profile: timeproofs-json-canonical-v1
 */

(function (root, factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define([], factory);
  } else {
    root.TimeProofsActionFileV1 = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  const FORMAT = "timeproofs.action.v1";
  const DEFAULT_SCHEMA_VERSION = "1.0.0-design";
  const CANONICALIZATION_PROFILE = "timeproofs-json-canonical-v1";
  const HASH_ALGORITHM = "sha256";

  const HASHABLE_TOP_LEVEL_KEYS = ["format", "schema_version", "action_core"];
  const NON_HASHABLE_TOP_LEVEL_KEYS = ["integrity", "local_annotations", "verification_result"];

  const hasWebCrypto =
    typeof crypto !== "undefined" &&
    crypto &&
    typeof crypto.subtle !== "undefined" &&
    typeof crypto.subtle.digest === "function";

  const textEncoder = typeof TextEncoder !== "undefined" ? new TextEncoder() : null;

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
    assertJsonCompatible(value, "$");

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

    if (isPlainObject(value)) {
      const keys = Object.keys(value).sort(compareByUnicodeCodePoint);
      const entries = keys.map((key) => `${JSON.stringify(key)}:${canonicalizeJsonValue(value[key])}`);
      return `{${entries.join(",")}}`;
    }

    throw new Error("Unsupported non-JSON value");
  }

  function createHashableActionFilePayload(actionFile) {
    if (!isPlainObject(actionFile)) {
      throw new Error("Action File must be a JSON object");
    }

    if (actionFile.format !== FORMAT) {
      throw new Error(`Action File format must be ${FORMAT}`);
    }

    if (typeof actionFile.schema_version !== "string" || !actionFile.schema_version) {
      throw new Error("Action File schema_version must be a non-empty string");
    }

    if (!isPlainObject(actionFile.action_core)) {
      throw new Error("Action File action_core must be an object");
    }

    const payload = {
      format: actionFile.format,
      schema_version: actionFile.schema_version,
      action_core: actionFile.action_core,
    };

    assertJsonCompatible(payload, "$hashable_payload");
    return payload;
  }

  function canonicalizeActionFileCore(actionFile) {
    const payload = createHashableActionFilePayload(actionFile);
    return canonicalizeJsonValue(payload);
  }

  function toHex(uint8) {
    return Array.from(uint8)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  async function sha256HexUtf8(text) {
    if (typeof text !== "string") throw new Error("sha256HexUtf8 expects a string");
    if (!textEncoder) throw new Error("TextEncoder not available");

    const bytes = textEncoder.encode(text);

    if (hasWebCrypto) {
      const digest = await crypto.subtle.digest("SHA-256", bytes);
      return toHex(new Uint8Array(digest));
    }

    if (typeof require === "function") {
      const nodeCrypto = require("crypto");
      return nodeCrypto.createHash("sha256").update(Buffer.from(bytes)).digest("hex");
    }

    throw new Error("No SHA-256 implementation available");
  }

  async function hashActionFileCore(actionFile) {
    const canonicalPayload = canonicalizeActionFileCore(actionFile);
    const hex = await sha256HexUtf8(canonicalPayload);
    return `${HASH_ALGORITHM}:${hex}`;
  }

  async function checkActionFilePayloadHash(actionFile) {
    if (!isPlainObject(actionFile)) {
      throw new Error("Action File must be a JSON object");
    }

    const expected =
      actionFile.integrity && typeof actionFile.integrity.payload_hash === "string"
        ? actionFile.integrity.payload_hash
        : null;

    if (!expected) {
      throw new Error("Action File integrity.payload_hash is required for local hash check");
    }

    const actual = await hashActionFileCore(actionFile);

    return {
      ok: actual === expected,
      expected,
      actual,
      profile: CANONICALIZATION_PROFILE,
      hash_algorithm: HASH_ALGORITHM,
    };
  }

  function isNonHashableTopLevelKey(key) {
    return NON_HASHABLE_TOP_LEVEL_KEYS.includes(key);
  }

  return {
    FORMAT,
    DEFAULT_SCHEMA_VERSION,
    CANONICALIZATION_PROFILE,
    HASH_ALGORITHM,
    HASHABLE_TOP_LEVEL_KEYS,
    NON_HASHABLE_TOP_LEVEL_KEYS,
    createHashableActionFilePayload,
    canonicalizeActionFileCore,
    canonicalizeJsonValue,
    hashActionFileCore,
    checkActionFilePayloadHash,
    isNonHashableTopLevelKey,
  };
});
