// api-v02/worker.js
// TimeProofs API v0.2 - draft worker
// This is a separate worker from v0.1. Do not modify v0.1.

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (request.method === 'POST' && pathname === '/api/timestamp') {
      return handleTimestamp(request, env);
    }

    if (request.method === 'GET' && pathname === '/api/verify') {
      return handleVerify(request, env);
    }

    return new Response(
      JSON.stringify({ error: 'Not found', path: pathname }),
      {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  },
};

async function handleTimestamp(request, env) {
  const body = await request.json().catch(() => null);

  if (!body || !body.hash) {
    return jsonError('Missing "hash" field', 400);
  }

  // v0.2: here we will later:
  // - persist proof (KV/Redis/D1)
  // - compute timestamps
  // - generate .tproof bundle
  // For now, return a simple stub.

  const now = Math.floor(Date.now() / 1000);

  const result = {
    version: 'tp-0.2',
    hash: body.hash,
    alg: 'SHA-256',
    timestamp: now,
    datetime: new Date(now * 1000).toISOString(),
    issuer: 'https://timeproofs.io',
    // placeholders for signatures
    sig_hmac: null,
    sig_ed25519: null,
    kid: 'tp-v0-2-main',
    meta: body.metadata || null,
  };

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function handleVerify(request, env) {
  const url = new URL(request.url);
  const hash = url.searchParams.get('hash');
  const id = url.searchParams.get('id');

  if (!hash && !id) {
    return jsonError('Expected "hash" or "id" query parameter', 400);
  }

  // v0.2: later we will:
  // - look up stored proof
  // - return full bundle / status
  // For now, return a very simple “not found” stub.

  const res = {
    ok: false,
    status: 'not-found',
    hash: hash || null,
    id: id || null,
    version: 'tp-0.2',
  };

  return new Response(JSON.stringify(res), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

function jsonError(message, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
    }
