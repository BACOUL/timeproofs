// sdk/test.js
// Simple end-to-end test for TimeProofs v0.2
// 1) hash "hello"
// 2) call /api/timestamp on the v0.2 worker
// 3) build a .tproof bundle
// 4) verify it offline (schema + hash only)

const TimeProofsV02 = require("./timeproof");

async function main() {
  // 1. Client v0.2 pointant sur ton Worker
  const client = TimeProofsV02.createClient({
    baseUrl: "https://timeproofs-api-v02.jeason-bacoul.workers.dev",
    // apiKey: "tp_test_xxx" // si un jour on ajoute une clé, à décommenter
  });

  console.log("=== TimeProofs v0.2 test ===");

  // 2. Hash du texte "hello"
  const hashHex = await client.hashText("hello");
  console.log("hash(hello) =", hashHex);

  // 3. Appel /api/timestamp v0.2
  const ev = await client.timestamp(hashHex);
  console.log("timestamp event =", ev);

  // 4. Construction du bundle .tproof.json
  const bundle = client.createBundle({
    hash: ev.hash,
    timestamp: ev.timestamp,
    proof: ev.proof,
    meta: { type: "ai-output", note: "sdk test v0.2" },
  });

  console.log("bundle =", JSON.stringify(bundle, null, 2));

  // 5. Vérification offline (sans fichier attaché)
  const result = await client.verifyBundle(bundle, {
    expectedIssuer: "https://api.timeproofs.io",
  });

  console.log("verifyBundle result =", result);

  if (result.valid) {
    console.log("✅ v0.2 pipeline OK (schema + issuer).");
  } else {
    console.error("❌ v0.2 pipeline FAILED:", result.errors);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error("Fatal error in test:", err);
  process.exitCode = 1;
});
