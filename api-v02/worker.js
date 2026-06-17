// api-v02/worker.js
// TimeProofs API v0.2 — stateless timestamp + stateless verification (NO STORAGE)
// Ed25519-only, with KEY FREEZE (verify trusts ONLY server ED25519_PUBLIC)

const VERSION = "timeproofs-0.2";
const MODE = "stateless";
const PROOF_MODE = "ed25519-only";

// Canonical issuer (authority), independent from hosting domain
const ISSUER = "https://api.timeproofs.io";
const KEY_ID = "tp-v0-2-main";

// Action File / Seal v1 constants. These do not change v0.2 proof bundle behavior.
const ACTION_FILE_FORMAT = "timeproofs.action.v1";
const SEAL_VERSION = "timeproofs.seal.v1";
const SEAL_SIGNATURE_ALGORITHM = "Ed25519";
const SEAL_CANONICALIZATION_PROFILE = "timeproofs-json-canonical-v1";
const SEAL_DEFAULT_PUBLIC_KEY_ID = "timeproofs-main-2026-01";
const SEAL_PROOF_LEVELS = ["declared", "executed", "target_confirmed", "externally_verifiable"];
const SEAL_REQUEST_KEYS = ["format", "action_id", "payload_hash", "proof_level", "client_generated_at", "metadata"];
const SEAL_FORBIDDEN_KEYS = [
  "prompt",
  "completion",
  "messages",
  "raw_content",
  "rawcontent",
  "document",
  "file",
  "files",
  "attachment",
  "attachments",
  "secret",
  "token",
  "api_key",
  "apikey",
  "password",
  "private_key",
  "privatekey",
  "credential",
  "credentials",
  "action_core",
  "actioncore",
  "full_action_file",
  "fullactionfile",
];

addEventListener("fetch", (event) => {
  event.respondWith(handle(event.request));
});

async function handle(req) {
  const url = new URL(req.url);
  const path = url.pathname;

  // CORS preflight
  if (req.method === "OPTIONS") return preflight();

  // Healthcheck
  if (req.method === "GET" && path === "/api/health") {
    return j({
      ok: true,
      now: new Date().toISOString(),
      version: VERSION,
      mode: MODE,
      proof: PROOF_MODE,
      issuer: ISSUER,
      keyId: KEY_ID,
    });
  }

  // v0.2 timestamp endpoint (stateless)
  if (req.method === "POST" && path === "/api/timestamp") {
    return handleTimestamp(req);
  }

  // Action File Seal v1 endpoint (stateless, hash-only request by default)
  if (path === "/api/seal") {
    if (req.method === "POST") return handleSeal(req);
    return j({ ok: false, error: { code: "method_not_allowed", message: "Use POST with a Seal request." } }, 405);
  }

  // v0.2 verify (stateless): verifies cryptographic integrity of a bundle (signature)
  if (path === "/api/verify") {
    if (req.method === "POST") return handleVerify(req);

    if (req.method === "GET") {
      const hash = (url.searchParams.get("hash") || "").toLowerCase().trim();
      if (/^[a-f0-9]{64}$/.test(hash)) {
        return j(
          {
            ok: false,
            valid: false,
            error: "stateless_requires_bundle",
            message:
              "In v0.2 stateless mode, /api/verify needs the .tproof.json bundle (POST). A hash alone cannot be verified without server-side storage.",
            version: VERSION,
            hint: {
              method: "POST",
              endpoint: `${ISSUER}/api/verify`,
              body: "{ bundle: <.tproof.json> } OR send the bundle JSON as-is",
            },
          },
          400
        );
      }
      return j({ ok: false, error: "bad_request", message: "Use POST with a bundle." }, 400);
    }
  }

  return j({ ok: false, error: "not_found", path }, 404);
}

// -------- /api/timestamp (stateless v0.2) --------

async function handleTimestamp(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return j({ ok: false, error: "invalid_json", code: 2101 }, 400);
  }

  const hash = (body && body.hash ? String(body.hash) : "").toLowerCase().trim();
  if (!/^[a-f0-9]{64}$/.test(hash)) {
    return j({ ok: false, error: "invalid_hash", code: 2102 }, 400);
  }

  const issuedAt = new Date().toISOString();
  const issuer = ISSUER; // frozen issuer authority
  const nonce = randomId();

  // Canonical payload (MUST be verified as-is)
  const canonical = `${hash}|${issuedAt}|${issuer}|${nonce}`;

  // Ed25519 (required): ED25519_SECRET=PKCS8 DER base64, ED25519_PUBLIC=SPKI DER base64
  const privB64 =
    typeof ED25519_SECRET === "string" && ED25519_SECRET.trim() ? ED25519_SECRET.trim() : null;
  const pubB64 =
    typeof ED25519_PUBLIC === "string" && ED25519_PUBLIC.trim() ? ED25519_PUBLIC.trim() : null;

  if (!privB64) return j({ ok: false, error: "missing_ed25519_secret", code: 2103 }, 500);
  if (!pubB64) return j({ ok: false, error: "missing_ed25519_public", code: 2105 }, 500);

  let signatureHex;
  try {
    signatureHex = await ed25519SignPkcs8B64(privB64, canonical);
  } catch (_) {
    // Most common: invalid key format or import failure
    return j(
      {
        ok: false,
        error: "ed25519_sign_failed",
        code: 2104,
        message: "Failed to sign payload (check ED25519_SECRET PKCS8 base64).",
        version: VERSION,
        keyId: KEY_ID,
      },
      500
    );
  }

  return j(
    {
      ok: true,
      version: VERSION,
      canonical, // verify can use this exact string
      hash: { algorithm: "SHA-256", value: hash },
      timestamp: { issuedAt, issuer, nonce },
      proof: {
        algo: "Ed25519",
        signature: signatureHex,
        publicKey: pubB64, // included for portability; verify ignores it (key freeze)
        keyId: KEY_ID,
      },
      meta: { type: body && body.type ? String(body.type) : "event" },
    },
    200
  );
}

// -------- /api/seal (Action File Seal v1, hash-only by default) --------

async function handleSeal(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return sealError("invalid_json", "Body must be valid JSON.", 400);
  }

  if (!isPlainObject(body)) {
    return sealError("validation_failed", "Seal request must be a JSON object.", 422);
  }

  const forbidden = findForbiddenSealKeys(body);
  if (forbidden.length > 0) {
    return j(
      {
        ok: false,
        error: {
          code: "sensitive_content_rejected",
          message: "Seal request contains fields that are not allowed in the default hash-only API.",
          fields: forbidden.slice(0, 20),
        },
      },
      400
    );
  }

  const unexpected = Object.keys(body).filter((key) => !SEAL_REQUEST_KEYS.includes(key));
  if (unexpected.length > 0) {
    return j(
      {
        ok: false,
        error: {
          code: "validation_failed",
          message: "Seal request contains unsupported top-level fields.",
          fields: unexpected,
        },
      },
      422
    );
  }

  const format = typeof body.format === "string" ? body.format.trim() : "";
  if (format !== ACTION_FILE_FORMAT) {
    return sealError("invalid_format", `format must be ${ACTION_FILE_FORMAT}.`, 400);
  }

  const actionId = typeof body.action_id === "string" ? body.action_id.trim() : "";
  if (!actionId) {
    return sealError("invalid_action_id", "action_id must be a non-empty string.", 400);
  }

  const payloadHash = typeof body.payload_hash === "string" ? body.payload_hash.trim() : "";
  if (!/^sha256:[a-f0-9]{64}$/.test(payloadHash)) {
    return sealError("invalid_payload_hash", "payload_hash must match sha256:<64 lowercase hex>.", 400);
  }

  const proofLevel = typeof body.proof_level === "string" ? body.proof_level.trim() : "";
  if (!SEAL_PROOF_LEVELS.includes(proofLevel)) {
    return sealError("unsupported_proof_level", `proof_level must be one of: ${SEAL_PROOF_LEVELS.join(", ")}.`, 400);
  }

  if (typeof body.metadata !== "undefined" && !isPlainObject(body.metadata)) {
    return sealError("validation_failed", "metadata must be a non-sensitive JSON object when present.", 422);
  }

  const sealSecretB64 = readOptionalGlobalString("SEAL_ED25519_SECRET");

  if (!sealSecretB64) {
    return j(
      {
        ok: false,
        error: {
          code: "signing_unavailable",
          message: "Seal signing is not configured.",
        },
        limits: sealLimits(),
      },
      503
    );
  }

  const publicKeyId = readOptionalGlobalString("SEAL_PUBLIC_KEY_ID") || SEAL_DEFAULT_PUBLIC_KEY_ID;

  const sealPayload = {
    seal_version: SEAL_VERSION,
    seal_id: `seal_${randomId()}`,
    payload_hash: payloadHash,
    format,
    action_id: actionId,
    proof_level: proofLevel,
    sealed_at: new Date().toISOString(),
    public_key_id: publicKeyId,
    signature_algorithm: SEAL_SIGNATURE_ALGORITHM,
  };

  let signature;
  try {
    const canonicalSealPayload = canonicalizeJsonValue(sealPayload);
    signature = await ed25519SignPkcs8B64Url(sealSecretB64, canonicalSealPayload);
  } catch (_) {
    return j(
      {
        ok: false,
        error: {
          code: "seal_failed",
          message: "Failed to sign Seal payload.",
        },
        limits: sealLimits(),
      },
      500
    );
  }

  return j(
    {
      ok: true,
      seal: {
        seal_payload: sealPayload,
        signature,
      },
      verification: {
        public_keys_url: "https://timeproofs.io/.well-known/timeproofs-keys.json",
        verification_model: "offline-capable-public-key-verification",
      },
      limits: sealLimits(),
    },
    200
  );
}

// -------- /api/verify (stateless v0.2) --------
// Accepts POST with either:
// 1) { "bundle": <tproof json> }  OR
// 2) <tproof json> directly
async function handleVerify(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return j({ ok: false, error: "invalid_json", code: 2201 }, 400);
  }

  // allow bundle to arrive as a JSON string (common with curl/shell quoting)
  let bundle = body?.bundle ?? body;

  if (typeof bundle === "string") {
    try {
      bundle = JSON.parse(bundle);
    } catch {
      return j({ ok: false, error: "invalid_bundle_json", code: 2200 }, 400);
    }
  }

  if (!bundle || typeof bundle !== "object") {
    return j({ ok: false, error: "missing_bundle", code: 2202 }, 400);
  }

  const hashVal =
    (bundle.hash && typeof bundle.hash === "object" ? bundle.hash.value : bundle.hash) || "";
  const hashHex = String(hashVal).toLowerCase().trim();
  if (!/^[a-f0-9]{64}$/.test(hashHex)) {
    return j({ ok: false, error: "invalid_hash", code: 2203 }, 400);
  }

  const ts = bundle.timestamp || {};
  const issuedAt = typeof ts.issuedAt === "string" ? ts.issuedAt : "";
  const issuer = typeof ts.issuer === "string" ? ts.issuer : "";
  const nonce = typeof ts.nonce === "string" ? ts.nonce : "";

  if (!issuedAt || !issuer || !nonce) {
    return j(
      {
        ok: false,
        error: "missing_timestamp_fields",
        code: 2204,
        message:
          "Bundle must include timestamp.issuedAt (ISO), timestamp.issuer and timestamp.nonce.",
      },
      400
    );
  }

  // Enforce frozen issuer authority (prevents multi-issuer confusion)
  if (issuer !== ISSUER) {
    return j(
      {
        ok: false,
        valid: false,
        error: "invalid_issuer",
        code: 2205,
        message: `Untrusted issuer. Expected ${ISSUER}.`,
        version: VERSION,
        keyId: KEY_ID,
      },
      400
    );
  }

  // Canonical expected from declared fields
  const expectedCanonical = `${hashHex}|${issuedAt}|${issuer}|${nonce}`;

  // Prefer canonical from bundle but enforce consistency
  const canonical =
    typeof bundle.canonical === "string" && bundle.canonical.trim()
      ? bundle.canonical.trim()
      : expectedCanonical;

  if (canonical !== expectedCanonical) {
    return j(
      {
        ok: false,
        valid: false,
        error: "canonical_mismatch",
        code: 2208,
        message: "Bundle canonical does not match declared fields (hash/issuedAt/issuer/nonce).",
        version: VERSION,
        keyId: KEY_ID,
        expected: expectedCanonical,
      },
      400
    );
  }

  const proof = bundle.proof || {};
  const providedSig =
    typeof proof.signature === "string" ? proof.signature.toLowerCase().trim() : null;

  if (!providedSig) {
    return j({ ok: false, valid: false, error: "missing_signature", code: 2206 }, 400);
  }

  // ---- KEY FREEZE: ONLY trust server key (ED25519_PUBLIC), ignore bundle publicKey ----
  const trustedPubB64 =
    typeof ED25519_PUBLIC === "string" && ED25519_PUBLIC.trim() ? ED25519_PUBLIC.trim() : null;

  if (!trustedPubB64) {
    return j({ ok: false, valid: false, error: "missing_ed25519_public", code: 2207 }, 500);
  }

  let verified = false;
  try {
    verified = await ed25519VerifySpkiB64(trustedPubB64, canonical, providedSig);
  } catch {
    verified = false;
  }

  if (!verified) {
    return j(
      {
        ok: false,
        valid: false,
        error: "invalid_signature",
        code: 2209,
        version: VERSION,
        keyId: KEY_ID,
        hash: { algorithm: "SHA-256", value: hashHex },
        timestamp: { issuedAt, issuer, nonce },
        checks: { ed25519: { available: true, valid: false } },
        note: "Stateless cryptographic verification (no storage).",
      },
      200
    );
  }

  return j(
    {
      ok: true,
      valid: true,
      version: VERSION,
      keyId: KEY_ID,
      hash: { algorithm: "SHA-256", value: hashHex },
      timestamp: { issuedAt, issuer, nonce },
      checks: { ed25519: { available: true, valid: true } },
      note: "Stateless cryptographic verification (no storage).",
    },
    200
  );
}

// -------- Helpers --------

function j(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,OPTIONS",
      // v0.2 does not require auth; keep headers minimal
      "access-control-allow-headers": "content-type",
    },
  });
}

function preflight() {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,OPTIONS",
      "access-control-allow-headers": "content-type",
      "access-control-max-age": "86400",
    },
  });
}

function randomId() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return toHex(bytes);
}

function toHex(bytes) {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBytes(hex) {
  const h = String(hex || "").toLowerCase().trim();
  if (!/^[a-f0-9]+$/.test(h) || h.length % 2 !== 0) return null;
  const out = new Uint8Array(h.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(h.slice(i * 2, i * 2 + 2), 16);
  return out;
}

function b64ToBytes(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function bytesToBase64url(bytes) {
  let bin = "";
  for (const byte of bytes) bin += String.fromCharCode(byte);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

// Ed25519 sign using PKCS8 DER (base64) → hex signature
async function ed25519SignPkcs8B64(privatePkcs8B64, msg) {
  const keyData = b64ToBytes(privatePkcs8B64);
  const key = await crypto.subtle.importKey("pkcs8", keyData, { name: "Ed25519" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("Ed25519", key, new TextEncoder().encode(msg));
  return toHex(new Uint8Array(sig));
}

// Ed25519 sign using PKCS8 DER (base64) → base64url signature
async function ed25519SignPkcs8B64Url(privatePkcs8B64, msg) {
  const keyData = b64ToBytes(privatePkcs8B64);
  const key = await crypto.subtle.importKey("pkcs8", keyData, { name: "Ed25519" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("Ed25519", key, new TextEncoder().encode(msg));
  return bytesToBase64url(new Uint8Array(sig));
}

// Ed25519 verify using SPKI DER (base64) + signature(hex)
async function ed25519VerifySpkiB64(publicSpkiB64, msg, signatureHex) {
  const pubBytes = b64ToBytes(publicSpkiB64);
  const sigBytes = hexToBytes(signatureHex);
  if (!sigBytes) return false;

  const key = await crypto.subtle.importKey("spki", pubBytes, { name: "Ed25519" }, false, ["verify"]);
  return crypto.subtle.verify("Ed25519", key, sigBytes, new TextEncoder().encode(msg));
}

function sealError(code, message, status) {
  return j({ ok: false, error: { code, message } }, status);
}

function sealLimits() {
  return [
    "Seal verifies payload hash integrity and issuer signature only.",
    "Seal does not prove AI correctness, legal validity, regulatory compliance, or third-party acceptance.",
  ];
}

function isPlainObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function findForbiddenSealKeys(value, path = "$") {
  const found = [];

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      found.push(...findForbiddenSealKeys(item, `${path}[${index}]`));
    });
    return found;
  }

  if (!isPlainObject(value)) return found;

  for (const key of Object.keys(value)) {
    const normalized = normalizeKey(key);
    const currentPath = `${path}.${key}`;

    if (SEAL_FORBIDDEN_KEYS.includes(normalized)) {
      found.push(currentPath);
      continue;
    }

    found.push(...findForbiddenSealKeys(value[key], currentPath));
  }

  return found;
}

function normalizeKey(key) {
  return String(key || "")
    .trim()
    .replace(/[\s.-]+/g, "_")
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .toLowerCase();
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

  if (isPlainObject(value)) {
    const keys = Object.keys(value).sort(compareByUnicodeCodePoint);
    const entries = keys.map((key) => `${JSON.stringify(key)}:${canonicalizeJsonValue(value[key])}`);
    return `{${entries.join(",")}}`;
  }

  throw new Error("Unsupported non-JSON value");
}

function readOptionalGlobalString(name) {
  try {
    const value = globalThis[name];
    return typeof value === "string" && value.trim() ? value.trim() : null;
  } catch (_) {
    return null;
  }
}
