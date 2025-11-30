// sdk/test.js
// Simple test for TimeProofs v0.2 stateless API + human-readable proof

const tpv2 = require("./timeproof");

async function main() {
  try {
    const client = tpv2.createClient({
      baseUrl: "https://timeproofs-api-v02.jeason-bacoul.workers.dev"
      // apiKey: "tp_test_xxx" // optionnel plus tard
    });

    // 1) Hash du texte
    const hash = await client.hashText("hello");
    console.log("HASH:", hash);

    // 2) Timestamp v0.2
    const ev = await client.timestamp(hash);
    console.log("EVENT v0.2:", ev);

    // 3) Construire bundle v0.2
    const bundle = client.createBundle({
      hash: ev.hash,
      timestamp: ev.timestamp,
      proof: ev.proof,
      meta: {
        type: "test",
        note: "SDK demo"
      }
    });
    console.log("BUNDLE:", bundle);

    // 4) Vérification locale (offline)
    const verifyResult = await client.verifyBundle(bundle);
    console.log("VERIFY RESULT:", verifyResult);

    // 5) Affichage humain en 1 bloc lisible
    const pretty = client.formatBundle(bundle, verifyResult);
    console.log("\n----- TIMEPROOFS PROOF -----\n" + pretty + "\n----------------------------\n");
  } catch (err) {
    console.error("ERROR:", err);
  }
}

main();
