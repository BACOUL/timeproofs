// sdk/test.js
// Petit script de test pour TimeProofs v0.2 en Node

const fs = require("fs");
const TimeProofsV02 = require("./timeproof");

(async () => {
  // Client sans API key (ou mets-en une plus tard si besoin de quotas privés)
  const client = TimeProofsV02.createClient({
    baseUrl: "https://api.timeproofs.io",
    apiKey: null,
  });

  // 1) Hash d'un texte simple
  const hashHex = await client.hashText("hello");
  console.log("HASH:", hashHex);

  // 2) Timestamp v0.2 (stateless)
  const event = await client.timestamp(hashHex);
  console.log("EVENT v0.2:", event);

  // 3) Construction du bundle v0.2
  const bundle = client.createBundle({
    hash: event.hash,
    timestamp: event.timestamp,
    proof: event.proof,
    meta: { type: "test" },
  });
  console.log("BUNDLE:", bundle);

  // 4) Sauvegarde dans un fichier .tproof.json
  fs.writeFileSync(
    "proof.tproof.json",
    JSON.stringify(bundle, null, 2),
    "utf8"
  );
  console.log("Saved proof.tproof.json");

  // 5) Vérification locale du bundle
  const verifyResult = await client.verifyBundle(bundle, {
    expectedIssuer: "https://api.timeproofs.io",
  });
  console.log("VERIFY RESULT:", verifyResult);
})();
