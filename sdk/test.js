// sdk/test.js
// TimeProofs v0.2 — Minimal end-to-end test
// Usage (Node 18+):
//   node sdk/test.js

const TimeProofsV02 = require("./timeproof.js");

async function main() {
  console.log("=== TimeProofs v0.2 — SDK E2E Test ===");

  // 1) Créer le client
  // Si tu as une URL spécifique pour le worker v0.2, mets-la ici.
  // Sinon, il utilisera DEFAULT_BASE = https://api.timeproofs.io
  const client = TimeProofsV02.createClient({
    // baseUrl: "https://timeproofs-api-v02.<ton-worker>.workers.dev",
    // apiKey: "tp_test_xxx", // si besoin plus tard
  });

  try {
    // 2) Hash d'un texte
    const text = "hello timeproofs v0.2";
    console.log("Text to hash:", text);
    const hashHex = await client.hashText(text);
    console.log("SHA-256 hash:", hashHex);

    // 3) Appel /api/timestamp v0.2
    const ts = await client.timestamp(hashHex);
    console.log("TimestampResponse:");
    console.log(JSON.stringify(ts, null, 2));

    // 4) Construction du bundle local
    const bundle = client.createBundle({
      hash: ts.hash,
      timestamp: ts.timestamp,
      proof: ts.proof,
      meta: {
        type: "ai-output",
        note: "test bundle v0.2",
      },
    });

    console.log("Bundle (.tproof.json candidate):");
    console.log(JSON.stringify(bundle, null, 2));

    // 5) Vérification offline minimale
    const verifyResult = await client.verifyBundle(bundle);
    console.log("verifyBundle result:");
    console.log(JSON.stringify(verifyResult, null, 2));

    console.log("\n✓ Test completed without uncaught errors.\n");
  } catch (err) {
    console.error("\n✗ Test failed:");
    console.error(err);
  }
}

main().catch((err) => {
  console.error("Unexpected error in test runner:", err);
});
