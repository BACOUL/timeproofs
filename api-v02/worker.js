// api-v02/worker.js
// TimeProofs API v0.2 — stateless timestamp API (aucun stockage, aucun bundle côté serveur)

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
    });
  }

  // v0.2 timestamp endpoint (stateless)
  if (req.method === "POST" && path === "/api/timestamp") {
    return handleTimestamp(req);
  }

  // v0.2 verify: vérification offline → ici on ne stocke rien
  if (req.method === "GET" && path === "/api/verify") {
    return j(
      {
        ok: false,
        error: "not_implemented_v02",
        message:
          "TimeProofs v0.2 is stateless. Use the SDK/CLI to verify .tproof.json bundles offline.",
        version: "timeproofs-0.2",
      },
      501
    );
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

  const nowMs = Date.now();
  const issuedAt = new Date(nowMs).toISOString();
  const issuer = "https://api.timeproofs.io"; // aligné avec v0.1
  const nonce = randomId(); // dérive temporelle + anti-rejeu simple

  // Canonical payload pour HMAC + Ed25519
  const canonical = `${hash}|${issuedAt}|${issuer}|${nonce}`;

  // HMAC-SHA256 (optionnel, via secret HMAC_SECRET)
  let hmacHex = null;
  try {
    if (typeof HMAC_SECRET === "string" && HMAC_SECRET.length > 0) {
      hmacHex = await hmac(HMAC_SECRET, canonical);
    }
  } catch (_) {
    // On reste stateless : si HMAC échoue, on continue avec hmac = null
  }

  // Ed25519 (optionnel, via secrets ED25519_SECRET / ED25519_PUBLIC en base64)
  let edSignature = null;
  let edPublic = null;
  try {
    if (typeof ED25519_SECRET === "string" && ED25519_SECRET.length > 0) {
      edSignature = await ed25519Sign(ED25519_SECRET, canonical);
      if (typeof ED25519_PUBLIC === "string" && ED25519_PUBLIC.length > 0) {
        edPublic = ED25519_PUBLIC;
      }
    }
  } catch (_) {
    // Si Ed25519 n'est pas dispo ou mal configuré, on continue avec signature = null
  }

  const proof = {
    algo: "HMAC-SHA256+Ed25519",
    hmac: hmacHex,       // peut être null si secret non configuré
    signature: edSignature, // peut être null si clé non configurée
    publicKey: edPublic,    // peut être null si non fournie
    keyId: "tp-v0-2-main",  // identifiant logique de clé
  };

  const response = {
    version: "timeproofs-0.2",
    hash: {
      algorithm: "SHA-256",
      value: hash,
    },
    timestamp: {
      issuedAt,
      issuer,
      nonce,
    },
    proof,
  };

  // IMPORTANT : on ne stocke rien, on renvoie juste timestamp + proof
  return j(response, 200);
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

// Base64 → Uint8Array (pour clé Ed25519)
function b64ToBytes(b64) {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    out[i] = bin.charCodeAt(i);
  }
  return out;
}

// Ed25519 helper (Cloudflare Workers: "NODE-ED25519") → hex
async function ed25519Sign(secretBase64, msg) {
  const enc = new TextEncoder();
  const keyData = b64ToBytes(secretBase64);
  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    "NODE-ED25519",
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("NODE-ED25519", key, enc.encode(msg));
  return toHex(new Uint8Array(sig));
}
