// sdk/test.js
// Petit script de test TimeProofs v0.2 (Node)

const fs = require("fs");
const TimeProofsV02 = require("./timeproof");

(async () => {
  try {
    // Client v0.2 (API key optionnelle pour l’instant)
    const client = TimeProofsV02.createClient({
      baseUrl: "https://api.timeproofs.io",
      apiKey: process.env.TIMEPROOFS_API_KEY || null,
    });

    // 1) Hash d’un texte
    const hash = await client.hashText("hello world");
    console.log("HASH:", hash);

    // 2) Appel /api/timestamp (v0.2 stateless)
    const ev = await client.timestamp(hash);
    console.log("EVENT v0.2:", ev);

    // 3) Construction du bundle local (.tproof.json)
    const bundle = client.createBundle({
      hash: ev.hash,
      timestamp: ev.timestamp,
      proof: ev.proof,
      meta: { type: "test" },
    });
    console.log("BUNDLE:", bundle);

    // 4) Vérification offline minimale
    const verifyResult = await client.verifyBundle(bundle, {
      expectedIssuer: "https://api.timeproofs.io",
    });
    console.log("VERIFY RESULT:", verifyResult);

    // 5) Sauvegarde du bundle sur disque
    fs.writeFileSync(
      "proof.tproof.json",
      JSON.stringify(bundle, null, 2),
      "utf8"
    );
    console.log("Saved → proof.tproof.json");
  } catch (err) {
    console.error("ERROR:", err);
    process.exitCode = 1;
  }
})();
