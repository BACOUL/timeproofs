#!/usr/bin/env node
/* examples/local-verify-seal.js
 * TimeProofs local/offline Seal verifier.
 *
 * Scope:
 * - Verifies a TimeProofs Seal signature locally with a caller-provided public key.
 * - Optionally recomputes an Action File payload hash and compares it to the Seal payload hash.
 * - Makes no network calls.
 * - Requires no account, API key, or server.
 * - Does not verify AI correctness, legal validity, regulatory compliance, or third-party acceptance.
 *
 * Usage:
 *   node examples/local-verify-seal.js --seal path/to/seal.json --public-key path/to/public-key.pem
 *   node examples/local-verify-seal.js --seal path/to/seal.json --public-key path/to/public-key.pem --action-file path/to/file.action.json
 */

const fs = require("fs");
const path = require("path");

const { verifySeal } = require("../sdk/seal-v1.js");
const { hashActionFileCore } = require("../sdk/action-file-v1.js");

function usage(exitCode = 0) {
  const stream = exitCode === 0 ? process.stdout : process.stderr;
  stream.write(`Usage:\n`);
  stream.write(`  node examples/local-verify-seal.js --seal path/to/seal.json --public-key path/to/public-key.pem\n`);
  stream.write(`  node examples/local-verify-seal.js --seal path/to/seal.json --public-key path/to/public-key.pem --action-file path/to/file.action.json\n`);
  stream.write(`\nOptions:\n`);
  stream.write(`  --seal <file>        JSON file containing { seal_payload, signature }\n`);
  stream.write(`  --public-key <file>  Ed25519 public key in PEM/SPKI format\n`);
  stream.write(`  --action-file <file> Optional Action File v1 JSON to recompute payload_hash\n`);
  stream.write(`  --json               Print JSON only\n`);
  stream.write(`  --help               Show this help\n`);
  process.exit(exitCode);
}

function parseArgs(argv) {
  const args = {
    seal: null,
    publicKey: null,
    actionFile: null,
    json: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--help" || arg === "-h") usage(0);
    if (arg === "--json") {
      args.json = true;
      continue;
    }

    if (arg === "--seal") {
      args.seal = argv[++i] || null;
      continue;
    }

    if (arg === "--public-key") {
      args.publicKey = argv[++i] || null;
      continue;
    }

    if (arg === "--action-file") {
      args.actionFile = argv[++i] || null;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  if (!args.seal) throw new Error("Missing required --seal file");
  if (!args.publicKey) throw new Error("Missing required --public-key file");

  return args;
}

function readUtf8(filePath) {
  return fs.readFileSync(path.resolve(filePath), "utf8");
}

function readJson(filePath) {
  const absolutePath = path.resolve(filePath);
  try {
    return JSON.parse(fs.readFileSync(absolutePath, "utf8"));
  } catch (error) {
    throw new Error(`Failed to read JSON file ${absolutePath}: ${error.message}`);
  }
}

async function verifySealOffline(options) {
  const seal = readJson(options.seal);
  const publicKeyPem = readUtf8(options.publicKey);

  const signatureResult = verifySeal(seal, { public_key_pem: publicKeyPem });

  const result = {
    ok: false,
    status: signatureResult.status,
    signature: signatureResult,
    payload_hash: {
      expected: seal && seal.seal_payload ? seal.seal_payload.payload_hash : null,
      actual: null,
      matches: null,
    },
    limits: [
      "Seal verification checks payload hash integrity and issuer signature only.",
      "Seal verification does not prove AI correctness, legal validity, regulatory compliance, or third-party acceptance.",
    ],
  };

  if (!signatureResult.ok) {
    result.ok = false;
    return result;
  }

  if (!options.actionFile) {
    result.ok = true;
    result.status = "valid";
    return result;
  }

  const actionFile = readJson(options.actionFile);
  const actualPayloadHash = await hashActionFileCore(actionFile);
  const expectedPayloadHash = seal.seal_payload.payload_hash;
  const matches = actualPayloadHash === expectedPayloadHash;

  result.payload_hash.actual = actualPayloadHash;
  result.payload_hash.matches = matches;
  result.ok = matches;
  result.status = matches ? "valid" : "modified_payload";

  return result;
}

function printResult(result, jsonOnly) {
  if (jsonOnly) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return;
  }

  process.stdout.write(`TimeProofs local Seal verification\n`);
  process.stdout.write(`Status: ${result.status}\n`);
  process.stdout.write(`Signature: ${result.signature.status}\n`);

  if (result.payload_hash.matches !== null) {
    process.stdout.write(`Payload hash match: ${result.payload_hash.matches ? "yes" : "no"}\n`);
    process.stdout.write(`Expected: ${result.payload_hash.expected}\n`);
    process.stdout.write(`Actual:   ${result.payload_hash.actual}\n`);
  }

  process.stdout.write(`\nLimits:\n`);
  for (const limit of result.limits) {
    process.stdout.write(`- ${limit}\n`);
  }
}

async function main() {
  try {
    const args = parseArgs(process.argv.slice(2));
    const result = await verifySealOffline(args);
    printResult(result, args.json);
    process.exit(result.ok ? 0 : 1);
  } catch (error) {
    const result = {
      ok: false,
      status: "verification_error",
      error: error.message,
    };

    if (process.argv.includes("--json")) {
      process.stderr.write(`${JSON.stringify(result, null, 2)}\n`);
    } else {
      process.stderr.write(`Error: ${error.message}\n`);
      process.stderr.write(`Run with --help for usage.\n`);
    }

    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  verifySealOffline,
};
