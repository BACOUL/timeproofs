#!/usr/bin/env node
/* cli/timeproofs.js
 * TimeProofs CLI — v0.2
 *
 * Commands:
 *   timeproofs hash <file>
 *   timeproofs timestamp <file> [--api <url>] [--type <type>] [--domain <domain>] [--purpose <purpose>] [--mime <mime>] [--label <label> ...] [--notes <text>] [--out <path>]
 *   timeproofs verify <bundle> [--file <file>]
 *
 * Principles:
 * - Never send raw data to the API (only hashes).
 * - Server is stateless (v0.2).
 * - Bundles (.tproof.json) are built and verified locally.
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const TimeProofsV02 = require("../sdk/timeproof.js");

// -------- Helpers: logging & exit --------

function log(msg) {
  process.stdout.write(String(msg) + "\n");
}

function logErr(msg) {
  process.stderr.write(String(msg) + "\n");
}

function exitWithError(msg, code = 1) {
  if (msg) logErr(msg);
  process.exit(code);
}

// -------- Helpers: arg parsing --------

function parseArgs(argv) {
  const result = { positionals: [], flags: {} };
  let i = 0;
  while (i < argv.length) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const name = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        result.flags[name] = next;
        i += 2;
      } else {
        result.flags[name] = true;
        i += 1;
      }
    } else {
      result.positionals.push(arg);
      i += 1;
    }
  }
  return result;
}

function isValidSha256Hex(hex) {
  return typeof hex === "string" && /^[0-9a-fA-F]{64}$/.test(hex.trim());
}

// -------- Hash helper (Node-side, no network) --------

function hashFileSha256Hex(filePath) {
  const abs = path.resolve(filePath);
  const data = fs.readFileSync(abs);
  const h = crypto.createHash("sha256").update(data).digest("hex");
  return h.toLowerCase();
}

// -------- Command: hash --------

function cmdHash(args) {
  const parsed = parseArgs(args);
  const file = parsed.positionals[0];

  if (!file) {
    exitWithError("Usage: timeproofs hash <file>");
  }

  if (!fs.existsSync(file)) {
    exitWithError(`File not found: ${file}`);
  }

  const hashHex = hashFileSha256Hex(file);
  log("✔ Hash (SHA-256)");
  log(hashHex);
  process.exit(0);
}

// -------- Command: timestamp --------

async function cmdTimestamp(args) {
  const parsed = parseArgs(args);
  const file = parsed.positionals[0];

  if (!file) {
    exitWithError("Usage: timeproofs timestamp <file> [--api <url>] [--type <type>] [--domain <domain>] [--purpose <purpose>] [--mime <mime>] [--label <label> ...] [--notes <text>] [--out <path>]");
  }

  if (!fs.existsSync(file)) {
    exitWithError(`File not found: ${file}`);
  }

  const apiBase = parsed.flags.api || "https://api.timeproofs.io";

  const type = parsed.flags.type;
  const domain = parsed.flags.domain;
  const purpose = parsed.flags.purpose;
  const mime = parsed.flags.mime;
  const notes = parsed.flags.notes;
  const labelFlag = parsed.flags.label;
  const outPath = parsed.flags.out;

  const labels = [];
  if (Array.isArray(labelFlag)) {
    labels.push(...labelFlag);
  } else if (typeof labelFlag === "string") {
    labels.push(labelFlag);
  }

  // 1) Compute hash from file (local, no API)
  const hashHex = hashFileSha256Hex(file);

  log("✔ Hash computed (SHA-256)");
  log(hashHex);

  // 2) Call v0.2 /api/timestamp stateless endpoint
  let timestampResponse;
  try {
    timestampResponse = await TimeProofsV02.timestamp(hashHex, {
      baseUrl: apiBase,
    });
  } catch (e) {
    exitWithError("TimeProofs timestamp error: " + (e && e.message ? e.message : String(e)));
  }

  log("✔ Timestamp issued by " + (timestampResponse.timestamp && timestampResponse.timestamp.issuer ? timestampResponse.timestamp.issuer : apiBase));

  // 3) Build meta object (local-only)
  const meta = {};
  let hasMeta = false;

  if (type) {
    meta.type = type;
    hasMeta = true;
  }
  if (domain) {
    meta.domain = domain;
    hasMeta = true;
  }
  if (purpose) {
    meta.purpose = purpose;
    hasMeta = true;
  }
  if (mime) {
    meta.mime = mime;
    hasMeta = true;
  }
  if (labels.length > 0) {
    meta.labels = labels;
    hasMeta = true;
  }
  if (notes) {
    meta.notes = notes;
    hasMeta = true;
  }

  const bundleInput = {
    hash: timestampResponse.hash,
    timestamp: timestampResponse.timestamp,
    proof: timestampResponse.proof,
  };

  if (hasMeta) {
    bundleInput.meta = meta;
  }

  // 4) Build bundle (.tproof.json)
  let bundle;
  try {
    bundle = TimeProofsV02.createBundle(bundleInput);
  } catch (e) {
    exitWithError("Error while creating bundle: " + (e && e.message ? e.message : String(e)));
  }

  // 5) Determine output path
  const absFile = path.resolve(file);
  let targetOut;
  if (outPath) {
    targetOut = path.resolve(outPath);
  } else {
    const dir = path.dirname(absFile);
    const base = path.basename(absFile);
    targetOut = path.join(dir, base + ".tproof.json");
  }

  // 6) Save bundle
  try {
    fs.writeFileSync(targetOut, JSON.stringify(bundle, null, 2), { encoding: "utf8" });
  } catch (e) {
    exitWithError("Failed to write bundle file: " + (e && e.message ? e.message : String(e)));
  }

  log("✔ Bundle saved: " + targetOut);
  process.exit(0);
}

// -------- Command: verify --------

async function cmdVerify(args) {
  const parsed = parseArgs(args);
  const bundlePath = parsed.positionals[0];

  if (!bundlePath) {
    exitWithError("Usage: timeproofs verify <bundle> [--file <file>]");
  }

  if (!fs.existsSync(bundlePath)) {
    exitWithError(`Bundle file not found: ${bundlePath}`);
  }

  const filePath = parsed.flags.file;

  let bundleJson;
  try {
    const raw = fs.readFileSync(bundlePath, "utf8");
    bundleJson = JSON.parse(raw);
  } catch (e) {
    exitWithError("Failed to read or parse bundle JSON: " + (e && e.message ? e.message : String(e)));
  }

  let fileBytes = null;
  if (filePath) {
    if (!fs.existsSync(filePath)) {
      exitWithError(`File specified with --file not found: ${filePath}`);
    }
    try {
      const buf = fs.readFileSync(filePath);
      fileBytes = new Uint8Array(buf);
    } catch (e) {
      exitWithError("Failed to read file for --file: " + (e && e.message ? e.message : String(e)));
    }
  }

  let result;
  try {
    result = await TimeProofsV02.verifyBundle(bundleJson, fileBytes ? { file: fileBytes } : {});
  } catch (e) {
    exitWithError("Error during bundle verification: " + (e && e.message ? e.message : String(e)));
  }

  // Output summary
  log("✔ Bundle schema: " + (result.schemaValid ? "OK" : "INVALID"));
  if (result.hashMatches === true) {
    log("✔ File hash matches bundle.hash.value");
  } else if (result.hashMatches === false) {
    logErr("✖ File hash does not match bundle.hash.value");
  } else {
    log("ℹ No file provided (hash not checked)");
  }

  if (result.proofValid === null) {
    log("ℹ Server proof (Ed25519) not yet implemented in v0.2");
  } else if (result.proofValid) {
    log("✔ Server proof: OK");
  } else {
    logErr("✖ Server proof: INVALID");
  }

  if (result.userSignValid === null) {
    log("ℹ No local userSign validation in v0.2");
  } else if (result.userSignValid) {
    log("✔ Local userSign: OK");
  } else {
    logErr("✖ Local userSign: INVALID");
  }

  if (result.errors && result.errors.length > 0) {
    log("Errors:");
    for (const e of result.errors) {
      log(" - " + e);
    }
  }

  const ok =
    result.valid &&
    result.schemaValid &&
    result.hashMatches !== false &&
    result.proofValid !== false &&
    result.userSignValid !== false;

  if (!ok) {
    exitWithError("Bundle verification FAILED", 2);
  }

  log("✔ Bundle verification PASSED");
  process.exit(0);
}

// -------- Main dispatcher --------

async function main() {
  const argv = process.argv.slice(2);
  const cmd = argv[0];

  if (!cmd || cmd === "--help" || cmd === "-h") {
    log("TimeProofs CLI v0.2");
    log("");
    log("Usage:");
    log("  timeproofs hash <file>");
    log("  timeproofs timestamp <file> [--api <url>] [--type <type>] [--domain <domain>] [--purpose <purpose>] [--mime <mime>] [--label <label> ...] [--notes <text>] [--out <path>]");
    log("  timeproofs verify <bundle> [--file <file>]");
    process.exit(0);
  }

  const args = argv.slice(1);

  if (cmd === "hash") {
    return cmdHash(args);
  }
  if (cmd === "timestamp") {
    return cmdTimestamp(args);
  }
  if (cmd === "verify") {
    return cmdVerify(args);
  }

  exitWithError("Unknown command: " + cmd);
}

main().catch((e) => {
  exitWithError("Unexpected error: " + (e && e.message ? e.message : String(e)));
});
