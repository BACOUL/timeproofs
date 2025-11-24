// examples/node-basic.js
// Minimal Node.js example using the TimeProofs v0.2 SDK (draft)

const { createClient } = require("../sdk/timeproof");

// Configure the client
const tp = createClient({
  apiKey: process.env.TIMEPROOFS_KEY || "tp_test_xxx",
  baseUrl: "https://api.timeproofs.io"
});

async function main() {
  try {
    const text = "Hello from TimeProofs v0.2 example";

    // 1) Hash the text locally
    const hash = await tp.hashText(text);
    console.log("Local SHA-256 hash:", hash);

    // 2) Create a proof via the API
    const proof = await tp.createProof({
      hash,
      label: "node-basic-example",
      metadata: {
        env: "demo",
        sdk: "js-v0.2"
      }
    });

    console.log("Proof response:");
    console.dir(proof, { depth: null });

    // 3) Verify via the API
    const verify = await tp.verify({ hash });
    console.log("Verify response:");
    console.dir(verify, { depth: null });

    // 4) (Optional) Offline verification for future .tproof.json bundles
    // const bundle = require("./demo.tproof.json");
    // const { verifyOffline } = require("../sdk/timeproof");
    // const res = await verifyOffline(bundle, {
    //   expectedIssuer: "https://timeproofs.io"
    // });
    // console.log("Offline bundle check:", res);

  } catch (err) {
    console.error("Error in node-basic example:");
    console.error(err);
    process.exitCode = 1;
  }
}

main();
