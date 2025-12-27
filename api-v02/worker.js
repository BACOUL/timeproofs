// api-v02/worker.js
// TimeProofs API v0.2 — stateless timestamp + stateless verification (NO STORAGE)
// Ed25519-only, with KEY FREEZE (verify trusts ONLY server ED25519_PUBLIC)

const VERSION = "timeproofs-0.2";
const MODE = "stateless";
const PROOF_MODE = "ed25519-only";
const ISSUER = "https://api.timeproofs.io";
const KEY_ID = "tp-v0-2-main";

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
  const issuer = ISSUER;
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
    return j(
      {
        ok: false,
        error: "ed25519_sign_failed",
        code: 2104,
        message: "Failed to sign payload.",
      },
      500
    );
  }

  return j(
    {
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

  // Prefer canonical from bundle. Fallback for older bundles.
  const canonical =
    typeof bundle.canonical === "string" && bundle.canonical.trim()
      ? bundle.canonical.trim()
      : `${hashHex}|${issuedAt}|${issuer}|${nonce}`;

  const proof = bundle.proof || {};
  const providedSig =
    typeof proof.signature === "string" ? proof.signature.toLowerCase().trim() : null;

  if (!providedSig) {
    return j({ ok: false, error: "missing_signature", code: 2206 }, 400);
  }

  // ---- KEY FREEZE: ONLY trust server key (ED25519_PUBLIC), ignore bundle publicKey ----
  const trustedPubB64 =
    typeof ED25519_PUBLIC === "string" && ED25519_PUBLIC.trim() ? ED25519_PUBLIC.trim() : null;

  if (!trustedPubB64) {
    return j({ ok: false, error: "missing_ed25519_public", code: 2207 }, 500);
  }

  let edCheck = { available: true, valid: false };
  try {
    const ok = await ed25519VerifySpkiB64(trustedPubB64, canonical, providedSig);
    edCheck = { available: true, valid: ok };
  } catch {
    edCheck = { available: true, valid: false };
  }

  return j(
    {
      ok: true,
      valid: edCheck.valid === true,
      version: VERSION,
      hash: { algorithm: "SHA-256", value: hashHex },
      timestamp: { issuedAt, issuer, nonce },
      checks: { ed25519: edCheck },
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

// Ed25519 sign using PKCS8 DER (base64) → hex signature
async function ed25519SignPkcs8B64(privatePkcs8B64, msg) {
  const keyData = b64ToBytes(privatePkcs8B64);
  const key = await crypto.subtle.importKey("pkcs8", keyData, { name: "Ed25519" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("Ed25519", key, new TextEncoder().encode(msg));
  return toHex(new Uint8Array(sig));
}

// Ed25519 verify using SPKI DER (base64) + signature(hex)
async function ed25519VerifySpkiB64(publicSpkiB64, msg, signatureHex) {
  const pubBytes = b64ToBytes(publicSpkiB64);
  const sigBytes = hexToBytes(signatureHex);
  if (!sigBytes) return false;

  const key = await crypto.subtle.importKey("spki", pubBytes, { name: "Ed25519" }, false, ["verify"]);
  return crypto.subtle.verify("Ed25519", key, sigBytes, new TextEncoder().encode(msg));
}
