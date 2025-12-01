// test-v02.js
// Test complet v0.2 : hash → timestamp (worker v0.2) → bundle → verifyBundle

const fs = require("fs");
const path = require("path");

// Adapter le chemin si besoin, mais dans ton repo actuel : ./sdk/timeproofs-v02.js
const TimeProofsV02 = require("./sdk/timeproofs-v02.js");

// ⚠️ Remplace cette URL par l'URL exacte de ton worker v0.2 sur Cloudflare Workers
// Exemple typique : "https://timeproofs-api-v02.jeason-bacoul.workers.dev"
const BASE_URL_V02 = "https://timeproofs-api-v02.<TON-SOUS-DOMAINE>.workers.dev";

async function main() {
  try {
    const client = TimeProofsV02.createClient({
      baseUrl: BASE_URL_V02,
      // apiKey: "tp_test_xxx" // si un jour tu ajoutes des clés, pour l'instant null
    });

    // 1) Hash local (texte pour le test, plus simple que fichier)
    const message = "timeproofs v0.2 end-to-end test";
    const hash = await client.hashText(message);
    console.log("✔ Hash (SHA-256):", hash);

    // 2) Appel du worker v0.2 /api/timestamp
    const ts = await client.timestamp(hash);
    console.log("\n✔ Timestamp response (v0.2):");
    console.log(JSON.stringify(ts, null, 2));

    // 3) Construction du bundle local .tproof.json
    const bundle = client.createBundle({
      hash: ts.hash,
      timestamp: ts.timestamp,
      proof: ts.proof,
      meta: {
        type: "document",
        purpose: "v0.2-manual-test",
        tool: "node-test",
        notes: "First end-to-end test on Termux"
      }
      // userSign: ... (optionnel plus tard)
    });

    // 4) Vérification offline minimale
    const verifyResult = await client.verifyBundle(bundle, {
      expectedIssuer: ts.timestamp.issuer
      // file: ... // on testera avec un vrai fichier plus tard
    });

    console.log("\n✔ Bundle (timeproofs-0.2):");
    console.log(JSON.stringify(bundle, null, 2));

    console.log("\n✔ verifyBundle result:");
    console.log(JSON.stringify(verifyResult, null, 2));

    // 5) Sauvegarde du bundle pour inspection
    const outPath = path.join(process.cwd(), "test-v02.tproof.json");
    fs.writeFileSync(outPath, JSON.stringify(bundle, null, 2), "utf8");
    console.log("\n✔ Bundle sauvegardé dans:", outPath);
  } catch (err) {
    console.error("\n✖ Erreur pendant le test v0.2:");
    console.error(err);
    process.exit(1);
  }
}

main();
