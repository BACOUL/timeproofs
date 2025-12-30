// sdk/format.js
// Usage:
//   TP_ED25519_PUBLIC_B64="..." node format.js proof.tproof.json
//
// Prints a readable TimeProofs v0.2 proof + offline verification result.

const fs = require("fs");
const path = require("path");
const { verifyOffline } = require("./verify-offline.js");

const CANONICAL_ISSUER = "https://api.timeproofs.io";

function readJsonFile(fp) {
  const raw = fs.readFileSync(fp, "utf8");
  return JSON.parse(raw);
}

function safe(s) {
  return typeof s === "string" ? s : "";
}

function printBundle(bundle, verification) {
  const hash = bundle?.hash?.value || "";
  const issuedAt = bundle?.timestamp?.issuedAt || "";
  const issuer = bundle?.timestamp?.issuer || "";
  const nonce = bundle?.timestamp?.nonce || "";
  const keyId = bundle?.proof?.keyId || "";
  const algo = bundle?.proof?.algo || "";
  const canonical = safe(bundle?.canonical);

  const lines = [];

  lines.push("TimeProofs v0.2 — Proof Bundle");
  lines.push("");
  lines.push(`valid: ${verification.valid === true ? "true" : "false"}`);
  lines.push(`reason: ${verification.reason || ""}`);
  lines.push("");

  lines.push("Bundle");
  lines.push(`- version:   ${safe(bundle?.version)}`);
  lines.push(`- hash:      ${safe(hash)}`);
  lines.push(`- issuedAt:  ${safe(issuedAt)}`);
  lines.push(`- issuer:    ${safe(issuer)}`);
  lines.push(`- nonce:     ${safe(nonce)}`);
  lines.push(`- proof:     ${safe(algo)} (keyId=${safe(keyId)})`);
  lines.push(`- canonical: ${canonical}`);

  if (bundle?.meta && typeof bundle.meta === "object") {
    lines.push("");
    lines.push("Meta (untrusted, local-only)");
    lines.push(JSON.stringify(bundle.meta, null, 2));
  }

  lines.push("");
  lines.push("Verification details");
  if (verification.details) {
    lines.push(JSON.stringify(verification.details, null, 2));
  } else if (verification.errors) {
    lines.push(JSON.stringify({ errors: verification.errors }, null, 2));
  } else {
    lines.push("{}");
  }

  return lines.join("\n");
}

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: node format.js <bundle.tproof.json>");
    process.exit(1);
  }

  const full = path.resolve(file);

  let bundle;
  try {
    bundle = readJsonFile(full);
  } catch (e) {
    console.error("Invalid JSON or cannot read file:", full);
    process.exit(1);
  }

  const trustedPublicKey = process.env.TP_ED25519_PUBLIC_B64;
  if (!trustedPublicKey) {
    console.error('Missing TP_ED25519_PUBLIC_B64 env var (SPKI base64 Ed25519 public key).');
    process.exit(1);
  }

  const verification = await verifyOffline(bundle, {
    expectedIssuer: CANONICAL_ISSUER,
    trustedPublicKey: trustedPublicKey.trim(),
  });

  console.log(printBundle(bundle, verification));
}

main().catch((err) => {
  console.error("ERROR:", err && err.message ? err.message : err);
  process.exit(1);
});
