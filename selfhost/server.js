// selfhost/server.js
// TimeProofs v0.2 — Selfhost (STATeless)
// - No storage (no Redis, no KV, no memory Map)
// - POST /api/timestamp signs a timestamp bundle for a SHA-256 hash
// - POST /api/verify verifies a provided .tproof.json bundle (structure + HMAC)
//
// Env:
// - TP_SECRET   (required) HMAC secret
// - TP_ISSUER   (optional) issuer URL used in timestamp bundles (default: http://127.0.0.1:8787)
// - PORT        (optional) default 8787

import express from "express";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({ limit: "64kb" }));

const PORT = process.env.PORT || 8787;
const TP_SECRET = process.env.TP_SECRET;
const TP_ISSUER = process.env.TP_ISSUER || `http://127.0.0.1:${PORT}`;

if (!TP_SECRET) {
  console.error("Missing TP_SECRET");
  process.exit(1);
}

const VERSION = "timeproofs-0.2";
const KEY_ID = "tp-v0-2-main";
const PROOF_ALGO = "HMAC-SHA256+Ed25519";

function isHex64(x) {
  return typeof x === "string" && /^[a-f0-9]{64}$/i.test(x.trim());
}

function nonceHex(bytes = 16) {
  return crypto.randomBytes(bytes).toString("hex");
}

// v0.2 server proof (selfhost): HMAC-SHA256 over canonical string
// Canonical input: "<hashHex>|<issuedAtIso>|<nonce>"
function signHmac(hashHex, issuedAtIso, nonce) {
  const msg = `${hashHex}|${issuedAtIso}|${nonce}`;
  return crypto.createHmac("sha256", TP_SECRET).update(msg).digest("hex");
}

function badRequest(res, error, message) {
  return res.status(400).json({ ok: false, error, message });
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    now: new Date().toISOString(),
    version: VERSION,
    mode: "selfhost-stateless",
    issuer: TP_ISSUER,
  });
});

app.post("/api/timestamp", (req, res) => {
  try {
    const body = req.body || {};
    const hashHex = String(body.hash || "").trim().toLowerCase();

    if (!isHex64(hashHex)) {
      return badRequest(res, "invalid_hash", "hash must be a 64-char SHA-256 hex string");
    }

    const issuedAt = new Date().toISOString();
    const n = nonceHex(16);
    const hmac = signHmac(hashHex, issuedAt, n);

    return res.json({
      version: VERSION,
      hash: { algorithm: "SHA-256", value: hashHex },
      timestamp: { issuedAt, issuer: TP_ISSUER, nonce: n },
      proof: {
        algo: PROOF_ALGO,
        hmac,
        signature: null,
        publicKey: null,
        keyId: KEY_ID,
      },
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "server_error" });
  }
});

function normalizeBundleInput(body) {
  if (!body || typeof body !== "object") return null;
  if (body.bundle && typeof body.bundle === "object") return body.bundle;
  return body;
}

app.post("/api/verify", (req, res) => {
  try {
    const bundle = normalizeBundleInput(req.body);

    if (!bundle || typeof bundle !== "object") {
      return badRequest(res, "invalid_bundle", "bundle must be a JSON object (or {bundle: {...}})");
    }

    const errors = [];

    if (bundle.version !== VERSION) errors.push(`version must be "${VERSION}"`);

    const h = bundle.hash;
    if (!h || typeof h !== "object") {
      errors.push("hash object is required");
    } else {
      if (h.algorithm !== "SHA-256") errors.push('hash.algorithm must be "SHA-256"');
      const hv = String(h.value || "").trim().toLowerCase();
      if (!isHex64(hv)) errors.push("hash.value must be a 64-char hex string");
    }

    const t = bundle.timestamp;
    if (!t || typeof t !== "object") {
      errors.push("timestamp object is required");
    } else {
      if (typeof t.issuedAt !== "string" || !t.issuedAt.length) errors.push("timestamp.issuedAt is required");
      if (typeof t.issuer !== "string" || !t.issuer.length) errors.push("timestamp.issuer is required");
      if (typeof t.nonce !== "string" || !t.nonce.length) errors.push("timestamp.nonce is required");
    }

    const p = bundle.proof;
    if (!p || typeof p !== "object") {
      errors.push("proof object is required");
    } else {
      if (p.algo !== PROOF_ALGO) errors.push(`proof.algo must be "${PROOF_ALGO}"`);
      if (typeof p.keyId !== "string" || !p.keyId.length) errors.push("proof.keyId is required");
      if (p.hmac != null && typeof p.hmac !== "string") errors.push("proof.hmac must be a string or null");
    }

    const schemaValid = errors.length === 0;

    // HMAC verification (selfhost only; in public stateless v0.2, clients cannot verify HMAC)
    let proofValid = null;
    let valid = false;

    if (schemaValid) {
      const hashHex = bundle.hash.value.trim().toLowerCase();
      const issuedAt = bundle.timestamp.issuedAt;
      const n = bundle.timestamp.nonce;
      const expected = signHmac(hashHex, issuedAt, n);

      proofValid = typeof bundle.proof.hmac === "string" && bundle.proof.hmac.toLowerCase() === expected;
      valid = proofValid === true;
      if (!proofValid) errors.push("hmac_mismatch");
    }

    return res.json({
      ok: true,
      valid,
      schemaValid,
      proofValid, // true/false/null
      version: bundle.version || null,
      hash: bundle.hash || null,
      timestamp: bundle.timestamp || null,
      note: valid
        ? "bundle-verified-hmac"
        : schemaValid
          ? "bundle-structure-ok-but-hmac-invalid"
          : "bundle-structure-invalid",
      errors,
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "server_error" });
  }
});

app.listen(PORT, () => {
  console.log(`TimeProofs v0.2 selfhost (stateless) on :${PORT}`);
  console.log(`Issuer: ${TP_ISSUER}`);
});
