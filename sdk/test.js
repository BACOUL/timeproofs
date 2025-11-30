// sdk/test.js
// TimeProofs v0.2 — demo simple : hash → timestamp → bundle → preuve lisible

const tpv2 = require("./timeproof");

async function main() {
  try {
    // Client v0.2 (Worker de test)
    const client = tpv2.createClient({
      baseUrl: "https://timeproofs-api-v02.jeason-bacoul.workers.dev"
      // apiKey: "tp_test_xxx" // optionnel
    });

    // 1) Hash du message
    const hash = await client.hashText("hello");

    // 2) Appel /api/timestamp v0.2
    const ev = await client.timestamp(hash);

    // 3) Construction du bundle v0.2
    const bundle = client.createBundle({
      hash: ev.hash,
      timestamp: ev.timestamp,
      proof: ev.proof,
      meta: {
        type: "text",
        label: "Demo hello"
      }
    });

    // 4) Vérification locale (offline)
    const verifyResult = await client.verifyBundle(bundle);

    // 5) Affichage humain lisible
    const pretty = client.formatBundle(bundle, verifyResult);

    console.log("\n----- TIMEPROOFS PROOF -----\n");
    console.log(pretty);
    console.log("\n----------------------------\n");
  } catch (err) {
    console.error("ERROR:", err);
  }
}

main();
