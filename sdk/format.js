// sdk/format.js
// Usage:
//   node format.js proof.tproof.json
//
// Prints a readable TimeProofs v0.2 proof.

const fs = require("fs");
const path = require("path");
const tp = require("./timeproof");

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: node format.js <bundle.tproof.json>");
    process.exit(1);
  }

  const full = path.resolve(file);

  let raw;
  try {
    raw = fs.readFileSync(full, "utf8");
  } catch (e) {
    console.error("Cannot read file:", full);
    process.exit(1);
  }

  let bundle;
  try {
    bundle = JSON.parse(raw);
  } catch (err) {
    console.error("Invalid JSON in:", full);
    process.exit(1);
  }

  const verifyResult = await tp.verifyBundle(bundle);
  const formatted = tp.formatBundle(bundle, verifyResult);
  console.log(formatted);
}

main().catch((err) => {
  console.error("ERROR:", err);
  process.exit(1);
});
