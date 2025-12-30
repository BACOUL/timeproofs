// examples/node-basic.js
// TimeProofs v0.2 — Node.js minimal example

const { createClient } = require("../sdk/timeproof");

const tp = createClient({
  baseUrl: "https://api.timeproofs.io"
});

async function main() {
  try {
    const text = "Hello from TimeProofs v0.2 example";

    // 1) Hash locally
    const hash = await tp.hashText(text);
    console.log("Hash:", hash);

    // 2) Request timestamp from API (stateless)
    const ts = await tp.timestamp(hash);
    console.log("Timestamp response:", ts);

    // 3) Build proof bundle locally
    const bundle = tp.createBundle({
      hash: ts.hash,
      timestamp: ts.timestamp,
      proof: ts.proof,
      meta: {
        env: "demo",
        sdk: "js-v0.2",
        note: "Node example"
      }
    });

    console.log("Bundle:");
    console.dir(bundle, { depth: null });

    // 4) Offline verification (no API)
    const result = await tp.verifyBundle(bundle);
    console.log("Verification result:");
    console.dir(result, { depth: null });

  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

main();
