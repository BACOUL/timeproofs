// sdk/test.js
// Test complet TimeProofs v0.2 — Hash → Timestamp → Bundle → Verify → Human Readable

const tpv2 = require("./timeproof");

async function main() {
  try {
    // Client v0.2
    const client = tpv2.createClient({
      baseUrl: "https://timeproofs-api-v02.jeason-bacoul.workers.dev"
      // apiKey: "tp_test_xxx" si besoin
    });

    // 1) Hash
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
      meta: { type: "test" }
    });

    console.log("BUNDLE:", bundle);

    // 4) Vérification locale
    const result = await client.verifyBundle(bundle);
    console.log("VERIFY RESULT:", result);

    // 5) Affichage lisible humain
    if (typeof client.formatBundle === "function") {
      console.log("\n========================");
      console.log(" HUMAN READABLE PROOF ");
      console.log("========================\n");
      console.log(client.formatBundle(bundle, result));
    }

  } catch (err) {
    console.error("ERROR:", err);
  }
}

main();
