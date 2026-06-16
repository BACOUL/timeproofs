/* sdk/action-file-v1.js
 * TimeProofs Action File v1 local helpers
 *
 * Scope:
 * - Local Action File construction, canonicalization, and hashing only.
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

  const ACTOR_TYPES = ["ai_agent", "automation", "human", "system", "hybrid"];
  const ACTION_STATUSES = ["declared", "executed", "target_confirmed", "failed", "partial", "cancelled"];
  const PROOF_LEVELS = ["declared", "executed", "target_confirmed", "externally_verifiable"];

  const OPTIONAL_ACTION_CORE_KEYS = [
    "workflow",
    "target_system",
    "evidence",
    "redaction",
    "limitations",
    "metadata",
  ];

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

  function cloneJson(value, path) {
    const currentPath = path || "$";
    assertJsonCompatible(value, currentPath);
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

  function validateActor(actor) {
    if (!isPlainObject(actor)) throw new Error("action_core.actor must be an object");
    assertEnum(actor.type, ACTOR_TYPES, "action_core.actor.type");
    assertNonEmptyString(actor.id, "action_core.actor.id");
    assertJsonCompatible(actor, "action_core.actor");
  }

  function validateAction(action) {
    if (!isPlainObject(action)) throw new Error("action_core.action must be an object");
    assertNonEmptyString(action.type, "action_core.action.type");
    assertEnum(action.status, ACTION_STATUSES, "action_core.action.status");
    assertNonEmptyString(action.summary, "action_core.action.summary");
    assertJsonCompatible(action, "action_core.action");
  }

  function validateActionCore(actionCore) {
    if (!isPlainObject(actionCore)) throw new Error("action_core must be an object");

    assertNonEmptyString(actionCore.action_id, "action_core.action_id");
    assertNonEmptyString(actionCore.created_at, "action_core.created_at");
    validateActor(actionCore.actor);
    validateAction(actionCore.action);
    assertEnum(actionCore.proof_level, PROOF_LEVELS, "action_core.proof_level");

    if (Object.prototype.hasOwnProperty.call(actionCore, "limitations") && !Array.isArray(actionCore.limitations)) {
      throw new Error("action_core.limitations must be an array when present");
    }

    assertJsonCompatible(actionCore, "action_core");
    return actionCore;
  }

  function buildActionCore(input) {
    if (isPlainObject(input.action_core)) {
      const clonedActionCore = cloneJson(input.action_core, "action_core");
      return validateActionCore(clonedActionCore);
    }

    const actionCore = {
      action_id: input.action_id,
      created_at: input.created_at,
      actor: input.actor,
      action: input.action,
      proof_level: input.proof_level,
    };

    for (const key of OPTIONAL_ACTION_CORE_KEYS) {
      if (typeof input[key] !== "undefined") {
        actionCore[key] = cloneJson(input[key], `action_core.${key}`);
      }
    }

    return validateActionCore(actionCore);
  }

  function createActionFile(input, options) {
    if (!isPlainObject(input)) {
      throw new Error("createActionFile expects an object");
    }

    const cfg = isPlainObject(options) ? options : {};
    const schemaVersion = input.schema_version || cfg.schema_version || DEFAULT_SCHEMA_VERSION;
    assertNonEmptyString(schemaVersion, "schema_version");

    const actionFile = {
      format: FORMAT,
      schema_version: schemaVersion,
      action_core: buildActionCore(input),
    };

    if (cfg.include_integrity !== false) {
      actionFile.integrity = Object.assign(
        {
          canonicalization_profile: CANONICALIZATION_PROFILE,
          hash_algorithm: HASH_ALGORITHM,
        },
        isPlainObject(input.integrity) ? cloneJson(input.integrity, "integrity") : {}
      );
    }

    if (typeof input.local_annotations !== "undefined") {
      if (!isPlainObject(input.local_annotations)) {
        throw new Error("local_annotations must be an object when present");
      }
      actionFile.local_annotations = cloneJson(input.local_annotations, "local_annotations");
    } else if (cfg.include_empty_non_hashable_containers === true) {
      actionFile.local_annotations = {};
    }

    if (typeof input.verification_result !== "undefined") {
      if (!isPlainObject(input.verification_result)) {
        throw new Error("verification_result must be an object when present");
      }
      actionFile.verification_result = cloneJson(input.verification_result, "verification_result");
    } else if (cfg.include_empty_non_hashable_containers === true) {
      actionFile.verification_result = {};
    }

    assertJsonCompatible(actionFile, "action_file");
    return actionFile;
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
    ACTOR_TYPES,
    ACTION_STATUSES,
    PROOF_LEVELS,
    createActionFile,
    validateActionCore,
    createHashableActionFilePayload,
    canonicalizeActionFileCore,
    canonicalizeJsonValue,
    hashActionFileCore,
    checkActionFilePayloadHash,
    isNonHashableTopLevelKey,
  };
});
