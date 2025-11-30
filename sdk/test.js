// sdk/test.js
// Minimal test script for TimeProofs SDK v0.2
// Usage (Node 18+):
//   node sdk/test.js

const TimeProofsV02 = require("./timeproof.js");

async function run() {
  console.log("=== TimeProofs v0.2 SDK Test ===");

  const client = TimeProofsV02.createClient({
    // optional: apiKey: "tp_test_xxx"
  });

  try {
    // --- 1. Hash a string ---
    const text = "hello timeproofs";
    const hash = await client.hashText(text);
    console.log("Hash:", hash);

    // --- 2. Request timestamp from stateless API ---
    const ts = await client.timestamp(hash);
    console.log("TimestampResponse:", ts);

    // --- 3. Build a bundle (local only) ---
    const bundle = client.createBundle({
      hash: ts.hash,
      timestamp: ts.timestamp,
      proof: ts.proof,
      meta: { type: "test" }
    });
    console.log("Bundle:", bundle);

    // --- 4. Offline verify (schema only) ---
    const result = await client.verifyBundle(bundle);
    console.log("Verify (offline minimal):", result);

    console.log("\n✓ Test completed\n");
  } catch (err) {
    console.error("Test failed:", err.message);
    console.error(err);
  }
}

run();
