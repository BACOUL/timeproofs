// TimeProofs v0.2 — Test complet API + SDK
// Ce script :
// 1) calcule un hash SHA-256 en local
// 2) appelle l’API v0.2 /api/timestamp
// 3) construit un bundle .tproof.json local
// 4) écrit sample-v02.tproof.json sur le disque

const fs = require("fs");
const crypto = require("crypto");

// ⚠️ IMPORTANT : remplace si besoin par l’URL exacte de ton worker v0.2
const BASE = "https://timeproofs-api-v02.jeason-bacoul.workers.dev";

// ---------------------------------------------------------
// Utilitaires
// ---------------------------------------------------------
async function sha256HexNode(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

// ---------------------------------------------------------
// Test principal
// ---------------------------------------------------------
async function main() {
  console.log("=== TimeProofs v0.2 — Test complet ===\n");

  // [1] HASH LOCAL
  console.log("[1] HASH LOCAL");
  const data = Buffer.from("Hello from TimeProofs v0.2");
  const hash = await sha256HexNode(data);
  console.log("SHA-256 =", hash, "\n");

  // [2] APPEL /api/timestamp …
  console.log("[2] APPEL /api/timestamp …");
  const res = await fetch(BASE + "/api/timestamp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hash }),
  });

  const event = await res.json();
  console.log("Réponse API v0.2:");
  console.dir(event, { depth: null });
  console.log("");

  if (!res.ok) {
    console.error("Erreur API v0.2:", event);
    process.exit(1);
  }

  // [3] CONSTRUCTION DU .tproof.json …
  console.log("[3] CONSTRUCTION DU .tproof.json …");

  const bundle = {
    version: "timeproofs-0.2",
    hash: {
      algorithm: "SHA-256",
      value: hash,
    },
    timestamp: {
      issuedAt: event.timestamp.issuedAt,
      issuer: event.timestamp.issuer,
      nonce: event.timestamp.nonce,
    },
    proof: {
      algo: event.proof.algo,
      hmac: event.proof.hmac || null,
      signature: event.proof.signature || null,
      publicKey: event.proof.publicKey || null,
      keyId: event.proof.keyId,
    },
    meta: {
      type: "test",
      purpose: "v0.2 demo",
    },
  };

  console.log("Bundle généré :");
  console.dir(bundle, { depth: null });
  console.log("");

  // [4] ÉCRITURE FICHIER
  const outPath = "sample-v02.tproof.json";
  fs.writeFileSync(outPath, JSON.stringify(bundle, null, 2), "utf8");
  console.log("[4] FICHIER BUNDLE ÉCRIT :", outPath, "\n");

  console.log("=== TEST TERMINÉ ===");
}

main().catch((err) => {
  console.error("Erreur dans le test v0.2:", err);
  process.exit(1);
});
