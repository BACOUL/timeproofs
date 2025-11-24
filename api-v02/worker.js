// api-v02/worker.js
// TimeProofs API v0.2 - draft worker
// Separate from v0.1. Do not modify the v0.1 production worker.

addEventListener("fetch", (event) => {
  event.respondWith(handle(event.request));
});

async function handle(req) {
  const url = new URL(req.url);
  const path = url.pathname;

  // CORS preflight
  if (req.method === "OPTIONS") {
    return preflight();
  }

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
    return handleTimestamp(req);
  }

  // Verify (stub)
  if (req.method === "GET" && path === "/api/verify") {
    return handleVerify(req);
  }

  return j(
    {
      ok: false,
      error: "not_found",
      path,
    },
    404
  );
}

// -------- /api/timestamp (v0.2 bundle) --------

async function handleTimestamp(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return j(
      {
        ok: false,
        error: "invalid_json",
        code: 2101,
      },
      400
    );
  }

  const hash = (body && body.hash ? String(body.hash) : "")
    .toLowerCase()
    .trim();

  if (!/^[a-f0-9]{64}$/.test(hash)) {
    return j(
      {
        ok: false,
        error: "invalid_hash",
        code: 2102,
      },
      400
    );
  }

  const nowSec = Math.floor(Date.now() / 1000);
  const iso = new Date(nowSec * 1000).toISOString();

  // HMAC signature (same spirit as v0.1, but on hash|datetime)
  let sigHmac = null;
  try {
    if (typeof HMAC_SECRET === "string" && HMAC_SECRET) {
      sigHmac = await hmac(HMAC_SECRET, `${hash}|${iso}`);
    }
  } catch (e) {
    // If HMAC fails, we still return a bundle with null sig_hmac.
    // v0.2 will later tighten this once infra is ready.
  }

  const bundle = {
    // Draft v0.2 bundle shape. This will become the .tproof.json reference.
    version: "tp-0.2",
    hash,
    alg: "SHA-256",
    timestamp: nowSec,
    datetime: iso,
    issuer: "https://timeproofs.io",
    sig_hmac: sigHmac,
    sig_ed25519: null, // reserved for future Ed25519 signing
    kid: "tp-v0-2-main",
    meta: body && body.metadata ? body.metadata : null,
  };

  return j(bundle, 200);
}

// -------- /api/verify (stub v0.2) --------

async function handleVerify(req) {
  const url = new URL(req.url);
  const hash = url.searchParams.get("hash");
  const id = url.searchParams.get("id");

  if (!hash && !id) {
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

  // v0.2: later we will look up stored bundles and perform real checks.
  return j(
    {
      ok: false,
      status: "not-found",
      hash: hash || null,
      id: id || null,
      version: "tp-0.2",
    },
    200
  );
}

// -------- Helpers (alignés sur v0.1) --------

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

// HMAC helper (copied from v0.1 style)
async function hmac(secret, msg) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(msg));
  return [...new Uint8Array(sig)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
