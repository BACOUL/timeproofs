// sdk/test.js
const tpv2 = require("./timeproof");

async function main() {
  try {
    const client = tpv2.createClient({
      baseUrl: "https://timeproofs-api-v02.jeason-bacoul.workers.dev"
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

  } catch (err) {
    console.error("ERROR:", err);
  }
}

main();
