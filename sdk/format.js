// sdk/format.js
// TimeProofs v0.2 — CLI de formatage et vérification d'un bundle (.tproof.json)

const fs = require("fs");
const path = require("path");
const TimeProofsV02 = require("./timeproof");

async function main() {
  const file = process.argv[2];

  if (!file) {
    console.error("Usage: node format.js <bundle.tproof.json>");
    process.exit(1);
  }

  const fullPath = path.resolve(file);

  let raw;
  try {
    raw = fs.readFileSync(fullPath, "utf8");
  } catch (e) {
    console.error("Cannot read file:", fullPath);
    console.error(e.message);
    process.exit(1);
  }

  let bundle;
  try {
    bundle = JSON.parse(raw);
  } catch (e) {
    console.error("File is not valid JSON");
    console.error(e.message);
    process.exit(1);
  }

  try {
    const verifyResult = await TimeProofsV02.verifyBundle(bundle, {
      expectedIssuer: "https://api.timeproofs.io",
    });

    const formatted = TimeProofsV02.formatBundle(bundle, verifyResult);
    console.log(formatted);
  } catch (e) {
    console.error("Error while verifying/formatting bundle:");
    console.error(e.message);
    process.exit(1);
  }
}

main();
