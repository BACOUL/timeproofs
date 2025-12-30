// sdk/test.js
// Simple test for TimeProofs v0.2 stateless API + SDK (Ed25519-only)

const tpv2 = require("./timeproof");
const fs = require("fs");

async function main() {
  try {
    const client = tpv2.createClient({
      baseUrl: "https://timeproofs-api-v02.jeason-bacoul.workers.dev",
      // apiKey: "tp_test_xxx" // optional later
    });

    // Required for offline verify (KEY FREEZE)
    // SPKI base64 Ed25519 public key (same as ED25519_PUBLIC in the worker)
    const trustedPublicKey = process.env.TP_ED25519_PUBLIC_B64;
    if (!trustedPublicKey) {
      throw new Error('Missing env var TP_ED25519_PUBLIC_B64 (base64 SPKI Ed25519 public key)');
    }

    // 1) Hash text
    const hash = await client.hashText("hello");
    console.log("HASH:", hash);

    // 2) Call v0.2 /api/timestamp
    const ev = await client.timestamp(hash);
    console.log("TIMESTAMP RESPONSE v0.2:", ev);

    // 3) Build v0.2 bundle from the response (canonical is required)
    const bundle = client.createBundle({
      canonical: ev.canonical,
      hash: ev.hash,
      timestamp: ev.timestamp,
      proof: ev.proof,
      meta: { type: "test" },
    });

    console.log("BUNDLE:", bundle);

    // 4) Offline verify (no file)
    const result = await client.verifyBundle(bundle, {
      trustedPublicKey: trustedPublicKey.trim(),
      expectedIssuer: "https://api.timeproofs.io",
    });
    console.log("VERIFY RESULT:", result);

    // 5) Save bundle to file
    fs.writeFileSync("proof.tproof.json", JSON.stringify(bundle, null, 2), "utf8");
    console.log("Saved → proof.tproof.json");
  } catch (err) {
    console.error("ERROR:", err && err.message ? err.message : err);
    if (err && err.body) console.error("BODY:", err.body);
  }
}

main();
