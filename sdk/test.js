// sdk/test.js
// Full v0.2 test: hash → timestamp → bundle → verify → formatted proof

const tpv2 = require("./timeproof");

async function main() {
  try {
    const client = tpv2.createClient({
      baseUrl: "https://timeproofs-api-v02.jeason-bacoul.workers.dev"
      // apiKey: "tp_test_xxx" // optionnel
    });

    // 1) Hash
    const hash = await client.hashText("hello");
    console.log("HASH:", hash);

    // 2) Timestamp v0.2
    const ev = await client.timestamp(hash);
    console.log("EVENT v0.2:", ev);

    // 3) Build bundle
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

    // 4) Local verify
    const verifyResult = await client.verifyBundle(bundle);
    console.log("VERIFY RESULT:", verifyResult);

    // 5) Human-readable formatting (3 seconds)
    const pretty = client.formatBundle(bundle, verifyResult);

    console.log("\n----- TIMEPROOFS PROOF -----\n");
    console.log(pretty);
    console.log("\n----------------------------\n");

  } catch (err) {
    console.error("ERROR:", err);
  }
}

main();
