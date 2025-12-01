// sdk/test.js
const fs = require("fs");
const tpv2 = require("./timeproof");

async function main() {
  try {
    console.log("→ Running TimeProofs v0.2 test…");

    // 1) Client
    const client = tpv2.createClient({
      baseUrl: "https://timeproofs-api-v02.jeason-bacoul.workers.dev"
    });

    // 2) Hash
    const hash = await client.hashText("hello");
    console.log("HASH:", hash);

    // 3) Timestamp
    const ev = await client.timestamp(hash);
    console.log("EVENT v0.2:", ev);

    // 4) Bundle
    const bundle = client.createBundle({
      hash: ev.hash,
      timestamp: ev.timestamp,
      proof: ev.proof,
      meta: { type: "test" }
    });

    console.log("BUNDLE:", bundle);

    // 5) Offline verify
    const result = await client.verifyBundle(bundle);
    console.log("VERIFY RESULT:", result);

    // 6) Save bundle
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
