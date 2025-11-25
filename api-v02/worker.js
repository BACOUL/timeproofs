// api-v02/worker.js
// TimeProofs API v0.2 - Worker with KV persistence (separate from v0.1)

addEventListener("fetch", (event) => {
  event.respondWith(handle(event.request, event));
});

async function handle(req, event) {
  const url = new URL(req.url);
  const path = url.pathname;

  // CORS preflight
  if (req.method === "OPTIONS") return preflight();

  // Healthcheck
  if (req.method === "GET" && path === "/api/health") {
    return j({
      ok: true,
      now: new Date().toISOString(),
      version: "tp-0.2",
    });
  }

  // Create proof (v0.2 bundle)
  if (req.method === "POST" && path === "/api/timestamp") {
    return handleTimestamp(req, event);
  }

  // Verify proof
  if (req.method === "GET" && path === "/api/verify") {
    return handleVerify(req, event);
  }

  return j({ ok: false, error: "not_found", path }, 404);
}

// -------- /api/timestamp (store bundle in KV) --------

async function handleTimestamp(req, event) {
  let body;
  try {
    body = await req.json();
  } catch {
    return j({ ok: false, error: "invalid_json", code: 2101 }, 400);
  }

  const hash = (body?.hash || "").toLowerCase().trim();
  if (!/^[a-f0-9]{64}$/.test(hash)) {
    return j({ ok: false, error: "invalid_hash", code: 2102 }, 400);
  }

  const nowSec = Math.floor(Date.now() / 1000);
  const iso = new Date(nowSec * 1000).toISOString();

  // Simple proof id for v0.2 (random hex)
  const proofId = randomId();

  // HMAC signature (same spirit as v0.1)
  let sigHmac = null;
  try {
    if (HMAC_SECRET) {
      sigHmac = await hmac(HMAC_SECRET, `${hash}|${iso}`);
    }
  } catch (_) {}

  const bundle = {
    version: "tp-0.2",
    id: proofId,
    hash,
    alg: "SHA-256",
    timestamp: nowSec,
    datetime: iso,
    issuer: "https://timeproofs.io",
    sig_hmac: sigHmac,
    sig_ed25519: null, // reserved for future Ed25519
    kid: "tp-v0-2-main",
    meta: body?.metadata || null,
  };

  const keyByHash = `v02:hash:${hash}`;
  const keyById = `v02:id:${proofId}`;

  event.waitUntil(
    Promise.all([
      TIMEPROOFS_V02_KV.put(keyByHash, JSON.stringify(bundle)),
      TIMEPROOFS_V02_KV.put(keyById, JSON.stringify(bundle)),
    ])
  );

  return j(bundle, 200);
}

// -------- /api/verify (read bundle from KV) --------

async function handleVerify(req, event) {
  const url = new URL(req.url);
  const rawHash = (url.searchParams.get("hash") || "").toLowerCase().trim();
  const rawId = (url.searchParams.get("id") || "").trim();

  if (!rawHash && !rawId) {
    return j(
      {
        ok: false,
        error: "missing_query",
        message: 'Expected "hash" or "id" query parameter',
        code: 2201,
      },
      400
    );
  }

  // If id is provided, it takes priority
  if (rawId) {
    const keyById = `v02:id:${rawId}`;
    const storedById = await TIMEPROOFS_V02_KV.get(keyById);

    if (!storedById) {
      return j(
        {
          ok: false,
          found: false,
          id: rawId,
          version: "tp-0.2",
        },
        404
      );
    }

    const bundle = JSON.parse(storedById);
    return j({
      ok: true,
      found: true,
      bundle,
      version: "tp-0.2",
    });
  }

  // Otherwise, fallback to hash
  if (!/^[a-f0-9]{64}$/.test(rawHash)) {
    return j({ ok: false, error: "invalid_hash", code: 2202 }, 400);
  }

  const keyByHash = `v02:hash:${rawHash}`;
  const storedByHash = await TIMEPROOFS_V02_KV.get(keyByHash);

  if (!storedByHash) {
    return j(
      {
        ok: false,
        found: false,
        hash: rawHash,
        version: "tp-0.2",
      },
      404
    );
  }

  const bundle = JSON.parse(storedByHash);

  return j({
    ok: true,
    found: true,
    bundle,
    version: "tp-0.2",
  });
}

// -------- Helpers (same as v0.1 style) --------

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

// Random id helper (simple hex string)
function randomId() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// HMAC helper
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

  return [...new Uint8Array(sig)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
    }
