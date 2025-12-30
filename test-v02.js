// TimeProofs v0.2 — Test complet API + Bundle (.tproof.json)
// 1) hash local SHA-256
// 2) POST /api/timestamp
// 3) construit bundle v0.2 (inclut canonical)
// 4) écrit sample-v02.tproof.json

const fs = require("fs");
const crypto = require("crypto");

// URL de ton worker v0.2 (pour les appels réseau)
// IMPORTANT: même si BASE est workers.dev, ton API devrait renvoyer issuer = https://api.timeproofs.io (spec)
const BASE = "https://timeproofs-api-v02.jeason-bacoul.workers.dev";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

async function sha256HexNode(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function buildCanonical({ hash, issuedAt, issuer, nonce }) {
  // Canonical attendu par ton OpenAPI: <hash>|<issuedAt>|<issuer>|<nonce>
  return `${hash}|${issuedAt}|${issuer}|${nonce}`;
}

async function main() {
  console.log("=== TimeProofs v0.2 — Test complet ===\n");

  // Guard fetch
  assert(typeof fetch === "function", "fetch n'est pas disponible. Utilise Node 18+ ou installe undici/node-fetch.");

  // [1] HASH LOCAL
  console.log("[1] HASH LOCAL");
  const data = Buffer.from("Hello from TimeProofs v0.2");
  const hash = await sha256HexNode(data);
  console.log("SHA-256 =", hash, "\n");

  // [2] APPEL /api/timestamp
  console.log("[2] APPEL /api/timestamp …");
  const res = await fetch(`${BASE}/api/timestamp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hash }),
  });

  const event = await res.json().catch(() => null);

  if (!res.ok) {
    console.error("Erreur API v0.2:", event || { error: "invalid_json_response" });
    process.exit(1);
  }

  // Validations minimales
  assert(event && typeof event === "object", "Réponse API invalide (non-objet).");
  assert(event.timestamp && event.proof, "Réponse API invalide: champs timestamp/proof manquants.");
  assert(event.timestamp.issuedAt && event.timestamp.issuer, "timestamp.issuedAt / timestamp.issuer manquants.");
  assert(event.proof.algo && event.proof.keyId, "proof.algo / proof.keyId manquants.");

  console.log("Réponse API v0.2:");
  console.dir(event, { depth: null });
  console.log("");

  // [3] CONSTRUCTION DU .tproof.json
  console.log("[3] CONSTRUCTION DU .tproof.json …");

  const issuedAt = event.timestamp.issuedAt;
  const issuer = event.timestamp.issuer;
  const nonce = event.timestamp.nonce || "";

  // canonical: on préfère celui du serveur, sinon on reconstruit
  const canonical =
    (typeof event.canonical === "string" && event.canonical) ||
    buildCanonical({ hash, issuedAt, issuer, nonce });

  const bundle = {
    version: "timeproofs-0.2",
    canonical,
    hash: {
      algorithm: "SHA-256",
      value: hash,
    },
    timestamp: {
      issuedAt,
      issuer,
      nonce: nonce || undefined,
    },
    proof: {
      algo: event.proof.algo,
      hmac: event.proof.hmac ?? null,
      signature: event.proof.signature ?? null,
      publicKey: event.proof.publicKey ?? null,
      keyId: event.proof.keyId,
    },
    meta: {
      type: "log",              // ✅ dans ton enum
      purpose: "v0.2 demo",
      tool: "node-test-script",
      notes: "Hello from TimeProofs v0.2",
    },
  };

  // Nettoyage: retirer les undefined (optionnel)
  if (bundle.timestamp.nonce === undefined) delete bundle.timestamp.nonce;

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
  console.error("Erreur dans le test v0.2:", err.message || err);
  process.exit(1);
});
