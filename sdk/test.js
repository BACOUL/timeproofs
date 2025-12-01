// sdk/test.js
// TimeProofs v0.2 — end-to-end example
// Hash "hello" -> timestamp v0.2 -> bundle -> verify -> write proof.tproof.json

const fs = require("fs");
const path = require("path");
const tpv2 = require("./timeproof");

async function main() {
  const client = tpv2.createClient({
    baseUrl: "https://timeproofs-api-v02.jeason-bacoul.workers.dev",
    // apiKey: "tp_test_xxx" // si un jour tu ajoutes une clé
  });

  try {
    console.log("=== TimeProofs v0.2 SDK test ===");

    // 1) Hash du texte
    const text = "hello";
    console.log("TEXT:", JSON.stringify(text));

    const hash = await client.hashText(text);
    console.log("HASH:", hash);

    // 2) Timestamp v0.2
    const ev = await client.timestamp(hash);
    console.log("EVENT v0.2:", ev);

    // 3) Construire bundle v0.2
    const bundle = client.createBundle({
      hash: ev.hash,
      timestamp: ev.timestamp,
      proof: ev.proof,
      meta: {
        type: "test",
        source: "sdk/test.js",
        note: "Example TimeProofs v0.2 bundle",
      },
    });

    console.log("BUNDLE OBJECT:", bundle);

    // 4) Vérification locale (sans fichier)
    const verifyResult = await client.verifyBundle(bundle);
    console.log("VERIFY RESULT:", verifyResult);

    // 5) Écrire le bundle dans un fichier .tproof.json
    const outPath = path.join(__dirname, "proof.tproof.json");
    fs.writeFileSync(outPath, JSON.stringify(bundle, null, 2), "utf8");
    console.log("WROTE FILE:", outPath);

    // 6) Afficher la preuve lisible
    const printable = client.formatBundle(bundle, verifyResult);
    console.log("\n=== HUMAN-READABLE PROOF ===\n");
    console.log(printable);
    console.log("\n=== END PROOF ===");
  } catch (err) {
    console.error("ERROR:", err);
    process.exitCode = 1;
  }
}

main();
