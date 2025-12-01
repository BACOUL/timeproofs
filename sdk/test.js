// sdk/test.js
// Simple test for TimeProofs v0.2 stateless API + SDK

const tpv2 = require("./timeproof");

async function main() {
  try {
    const client = tpv2.createClient({
      baseUrl: "https://timeproofs-api-v02.jeason-bacoul.workers.dev"
      // apiKey: "tp_test_xxx" // si besoin plus tard
    });

    // 1) Hash text
    const hash = await client.hashText("hello");
    console.log("HASH:", hash);

    // 2) Call v0.2 /api/timestamp
    const ev = await client.timestamp(hash);
    console.log("EVENT v0.2:", ev);

    // 3) Build v0.2 bundle from the response
    const bundle = client.createBundle({
      hash: ev.hash,
      timestamp: ev.timestamp,
      proof: ev.proof,
      meta: { type: "test" }
    });

    console.log("BUNDLE:", bundle);

    // 4) Offline verify (without file)
    const result = await client.verifyBundle(bundle);
    console.log("VERIFY RESULT:", result);
// 6) Save bundle to file
    const fs = require("fs");
    fs.writeFileSync(
      "proof.tproof.json",
      JSON.stringify(bundle, null, 2),
      "utf8"
    );
    console.log("Saved → proof.tproof.json");
  } catch (err) {
    console.error("ERROR:", err);
  }
}

main();
