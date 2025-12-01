// test.js – test SDK v0.2 en Node
const TimeProofsV02 = require("./timeproof.js");

(async () => {
  try {
    // 1) Hash d'un texte
    const tp = TimeProofsV02.createClient(); // baseUrl par défaut, sans API key
    const hash = await tp.hashText("hello world");
    console.log("HASH:", hash);

    // 2) Appel API /api/timestamp
    const event = await tp.timestamp(hash);
    console.log("EVENT v0.2:", event);

    // 3) Construction du bundle local .tproof
    const bundle = tp.createBundle({
      hash: event.hash,
      timestamp: event.timestamp,
      proof: event.proof,
      meta: { type: "test" },
    });
    console.log("BUNDLE:", bundle);

    // 4) Vérification offline du bundle
    const result = await tp.verifyBundle(bundle, {
      expectedIssuer: "https://api.timeproofs.io",
    });
    console.log("VERIFY RESULT:", result);
  } catch (err) {
    console.error("ERROR:", err);
  }
})();
