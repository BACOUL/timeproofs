// sdk/test.js
// Petit script de test pour TimeProofs v0.2 (Node.js)

const fs = require("fs");
const TimeProofsV02 = require("./timeproof.js");

(async () => {
  try {
    // 1) Client v0.2
    const apiKey = process.env.TIMEPROOFS_API_KEY || null;
    const tp = TimeProofsV02.createClient({
      baseUrl: "https://api.timeproofs.io",
      apiKey: apiKey || undefined,
    });

    // 2) Hash d’un texte de test
    const hash = await tp.hashText("hello from timeproofs v0.2");
    console.log("HASH:", hash);

    // 3) Appel stateless /api/timestamp (v0.2)
    const event = await tp.timestamp(hash);
    console.log("EVENT v0.2:", event);

    // 4) Construction du bundle v0.2 (.tproof.json)
    const bundle = tp.createBundle({
      hash: event.hash,
      timestamp: event.timestamp,
      proof: event.proof,
      meta: { type: "test" },
    });
    console.log("BUNDLE:", bundle);

    // 5) Vérification offline du bundle
    const verifyResult = await tp.verifyBundle(bundle);
    console.log("VERIFY RESULT:", verifyResult);

    // 6) Écriture du bundle brut (.tproof.json)
    const bundlePath = "proof.tproof.json";
    fs.writeFileSync(bundlePath, JSON.stringify(bundle, null, 2));
    console.log("Written bundle file:", bundlePath);

    // 7) Écriture d’une version lisible (formatBundle)
    const formatted = tp.formatBundle(bundle, verifyResult);
    const formattedPath = "proof.txt";
    fs.writeFileSync(formattedPath, formatted + "\n");
    console.log("Written human-readable proof:", formattedPath);
  } catch (err) {
    console.error("ERROR in test.js:", err);
    process.exitCode = 1;
  }
})();
