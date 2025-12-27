// api-v02/worker.js
// TimeProofs API v0.2 — stateless timestamp + stateless verification (NO STORAGE)

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
      version: "timeproofs-0.2",
      mode: "stateless",
      proof: (typeof ED25519_SECRET === "string" && ED25519_SECRET.length > 0) ? "ed25519-only" : "none",
    });
  }

  // v0.2 timestamp endpoint (stateless)
  if (req.method === "POST" && path === "/api/timestamp") {
    return handleTimestamp(req);
  }

  // v0.2 verify (stateless): verifies cryptographic integrity of a bundle (signature/HMAC)
  if (path === "/api/verify") {
    if (req.method === "POST") return handleVerify(req);

    // GET without bundle cannot prove anything in stateless mode (no lookup possible)
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
            version: "timeproofs-0.2",
            hint: {
              method: "POST",
              endpoint: "https://api.timeproofs.io/api/verify",
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

  const issuedAt = new Date(Date.now()).toISOString();
  const issuer = "https://api.timeproofs.io";
  const nonce = randomId();

  // Canonical payload
  const canonical = `${hash}|${issuedAt}|${issuer}|${nonce}`;

  // HMAC-SHA256 (optional, via secret HMAC_SECRET)
  let hmacHex = null;
  try {
    if (typeof HMAC_SECRET === "string" && HMAC_SECRET.length > 0) {
      hmacHex = await hmac(HMAC_SECRET, canonical);
    }
  } catch (_) {
    hmacHex = null;
  }

  // Ed25519 (optional, via secrets ED25519_SECRET / ED25519_PUBLIC in base64 DER)
  let edSignatureHex = null;
  let edPublicB64 = null;
  try {
    if (typeof ED25519_SECRET === "string" && ED25519_SECRET.length > 0) {
      edSignatureHex = await ed25519SignPkcs8B64(ED25519_SECRET, canonical);
      if (typeof ED25519_PUBLIC === "string" && ED25519_PUBLIC.length > 0) {
        edPublicB64 = ED25519_PUBLIC;
      }
    }
  } catch (_) {
    edSignatureHex = null;
    edPublicB64 = null;
  }

  const response = {
    version: "timeproofs-0.2",
    hash: { algorithm: "SHA-256", value: hash },
    timestamp: { issuedAt, issuer, nonce },
    proof: {
      algo: "HMAC-SHA256+Ed25519",
      hmac: hmacHex,
      signature: edSignatureHex,
      publicKey: edPublicB64,
      keyId: "tp-v0-2-main",
    },
    meta: { type: (body && body.type ? String(body.type) : "event") },
  };

  return j(response, 200);
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

  const bundle = body && typeof body === "object" && body.bundle ? body.bundle : body;
  if (!bundle || typeof bundle !== "object") {
    return j({ ok: false, error: "missing_bundle", code: 2202 }, 400);
  }

  const hash =
    (bundle.hash && typeof bundle.hash === "object" ? bundle.hash.value : bundle.hash) || "";
  const hashHex = String(hash).toLowerCase().trim();
  if (!/^[a-f0-9]{64}$/.test(hashHex)) {
    return j({ ok: false, error: "invalid_hash", code: 2203 }, 400);
  }

  const ts = bundle.timestamp || {};
  const issuedAt = typeof ts.issuedAt === "string" ? ts.issuedAt : "";
  const issuer = typeof ts.issuer === "string" ? ts.issuer : "https://api.timeproofs.io";
  const nonce = typeof ts.nonce === "string" ? ts.nonce : "";

  if (!issuedAt || !nonce) {
    return j(
      {
        ok: false,
        error: "missing_timestamp_fields",
        code: 2204,
        message: "Bundle must include timestamp.issuedAt (ISO) and timestamp.nonce.",
      },
      400
    );
  }

  // Canonical must match timestamp() exactly
  const canonical = `${hashHex}|${issuedAt}|${issuer}|${nonce}`;

  const proof = bundle.proof || {};
  const providedHmac = typeof proof.hmac === "string" ? proof.hmac.toLowerCase().trim() : null;
  const providedSig = typeof proof.signature === "string" ? proof.signature.toLowerCase().trim() : null;

  // For Ed25519 verify: prefer bundle.proof.publicKey, else fallback to env ED25519_PUBLIC
  const pubB64 =
    (typeof proof.publicKey === "string" && proof.publicKey.trim()) ||
    (typeof ED25519_PUBLIC === "string" && ED25519_PUBLIC.trim()) ||
    null;

  // ---- Check HMAC (server can recompute if it has HMAC_SECRET) ----
  let hmacCheck = { available: false, valid: null };
  try {
    if (typeof HMAC_SECRET === "string" && HMAC_SECRET.length > 0 && providedHmac) {
      const expected = await hmac(HMAC_SECRET, canonical);
      hmacCheck = { available: true, valid: timingSafeEqHex(expected, providedHmac) };
    }
  } catch (_) {
    hmacCheck = { available: true, valid: false };
  }

  // ---- Check Ed25519 signature (server can verify with public key) ----
  let edCheck = { available: false, valid: null };
  try {
    if (providedSig && pubB64) {
      const ok = await ed25519VerifySpkiB64(pubB64, canonical, providedSig);
      edCheck = { available: true, valid: ok };
    }
  } catch (_) {
    edCheck = { available: true, valid: false };
  }

  // Decide overall validity:
  // - If at least one check is available, valid = all available checks must be true.
  // - If none available, cannot validate.
  const availableChecks = [hmacCheck, edCheck].filter((c) => c.available);
  const anyAvailable = availableChecks.length > 0;
  const allPass = anyAvailable ? availableChecks.every((c) => c.valid === true) : false;

  return j(
    {
      ok: true,
      valid: allPass,
      version: "timeproofs-0.2",
      hash: { algorithm: "SHA-256", value: hashHex },
      timestamp: { issuedAt, issuer, nonce },
      checks: {
        hmac: hmacCheck,
        ed25519: edCheck,
      },
      note: anyAvailable
        ? "Stateless cryptographic verification (no storage)."
        : "No verifiable proof fields available (missing HMAC secret and/or public key/signature).",
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
      "access-control-allow-headers": "content-type,authorization",
    },
  });
}

function preflight() {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,OPTIONS",
      "access-control-allow-headers": "content-type,authorization",
      "access-control-max-age": "86400",
    },
  });
}

// Random id helper (simple hex string, 128 bits)
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

function timingSafeEqHex(a, b) {
  const aa = String(a || "").toLowerCase();
  const bb = String(b || "").toLowerCase();
  if (aa.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < aa.length; i++) diff |= aa.charCodeAt(i) ^ bb.charCodeAt(i);
  return diff === 0;
}

// HMAC-SHA256 helper → hex
async function hmac(secret, msg) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(msg));
  return toHex(new Uint8Array(sig));
}

// Base64 (standard) -> Uint8Array
function b64ToBytes(b64) {
  const bin = atob(String(b64 || "").trim());
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

// --- Ed25519 (DER keys) ---
// ED25519_SECRET = PKCS8 DER base64
// ED25519_PUBLIC = SPKI DER base64

async function importEd25519PrivatePkcs8(pkcs8B64) {
  const keyData = b64ToBytes(pkcs8B64);
  return crypto.subtle.importKey(
    "pkcs8",
    keyData,
    { name: "Ed25519" },
    false,
    ["sign"]
  );
}

async function importEd25519PublicSpki(spkiB64) {
  const keyData = b64ToBytes(spkiB64);
  return crypto.subtle.importKey(
    "spki",
    keyData,
    { name: "Ed25519" },
    false,
    ["verify"]
  );
}

async function ed25519SignPkcs8B64(secretPkcs8B64, msg) {
  const enc = new TextEncoder();
  const key = await importEd25519PrivatePkcs8(secretPkcs8B64);
  const sig = await crypto.subtle.sign({ name: "Ed25519" }, key, enc.encode(msg));
  return toHex(new Uint8Array(sig));
}

async function ed25519VerifySpkiB64(publicSpkiB64, msg, signatureHex) {
  const enc = new TextEncoder();
  const sigBytes = hexToBytes(signatureHex);
  if (!sigBytes) return false;
  const key = await importEd25519PublicSpki(publicSpkiB64);
  return crypto.subtle.verify({ name: "Ed25519" }, key, sigBytes, enc.encode(msg));
    }
