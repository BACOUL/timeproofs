# TimeProofs CLI v0.2 – Specification (Draft)

This document defines the behavior of the `timeproofs` command-line interface (CLI) for API v0.2.

The CLI is a local tool. It:
- never sends raw data to the TimeProofs API,
- only sends hashes and protocol parameters,
- generates and verifies `.tproof.json` bundles according to the Proof Bundles spec and JSON Schema.

The CLI has three primary commands:

- `timeproofs hash <file>`
- `timeproofs timestamp <file>`
- `timeproofs verify <bundle>`

## 1. Common behavior

- Exit code 0 on success, non-zero on error.
- Errors must be printed to stderr.
- For v0.2, human-readable output is sufficient.
- No raw file data must ever be sent to the API.

## 2. Command: `timeproofs hash <file>`

Purpose: compute a SHA-256 hash of a file using canonical rules.

Usage:
timeproofs hash <file>

Behavior:
1. Read <file> as raw bytes.
2. Compute SHA-256 digest (no normalization).
3. Output lowercase hex hash.

Example output:
✔ Hash (SHA-256)
4b227777d4dd1fc61c6f884f48641d02b8f8f8d...

## 3. Command: `timeproofs timestamp <file>`

Purpose: compute hash, request timestamp from API, generate `.tproof.json` bundle.

Usage minimal:
timeproofs timestamp <file>

Usage with metadata:
timeproofs timestamp <file> \
  --type document \
  --domain legal \
  --purpose contract-draft \
  --mime application/pdf \
  --label confidential \
  --label v1 \
  --notes "First draft" \
  --user-key ./user-key.json \
  --out ./contract.tproof.json

Flags:
- --type <type>
  One of: document, image, video, code, dataset, model, log, contract, release, config, archive, financial-statement, medical-record, supply-record, product-info, ai-output, ai-training-set, ai-prompt, audit-proof, evidence.
- --domain <domain>
- --purpose <purpose>
- --mime <mime-type>
- --label <label> (repeatable)
- --notes <text>
- --user-key <path> (JSON file containing Ed25519 privateKey/publicKey)
- --out <path>
- --api <base-url> (default https://api.timeproofs.io)

Behavior:
1. Compute SHA-256 hash of file.
2. POST hash to {api}/api/timestamp (server never receives file).
3. Receive timestamp + proof (HMAC-SHA256 + Ed25519).
4. Build Proof Bundle:
   - version = "timeproofs-0.2"
   - hash, timestamp, proof
   - meta (from flags, optional)
   - userSign (if --user-key provided)
5. Validate with proof-bundle.schema.json.
6. Save bundle to output path.
7. Print summary.

Example output:
✔ Hash computed (SHA-256)
✔ Timestamp issued by https://api.timeproofs.io
✔ Proof verified (Ed25519)
✔ Bundle saved: ./contract.tproof.json

## 4. Command: `timeproofs verify <bundle>`

Purpose: verify a `.tproof.json` bundle (schema, signature, hash consistency, userSign).

Usage:
timeproofs verify <bundle>

Optional with file:
timeproofs verify <bundle> --file <file>

Flags:
- --file <file>
- --api <base-url> (optional online checks)

Behavior:
1. Load and parse bundle.
2. Validate against proof-bundle.schema.json.
3. Verify server proof (HMAC + Ed25519).
4. If --file provided: recompute hash and compare.
5. If userSign present: verify signature on meta.
6. Print summary and exit with code 0 if all OK.

Example outputs:

Minimal:
✔ Bundle schema: OK
✔ Server proof: OK
ℹ No file provided
ℹ No userSign present

With file and userSign:
✔ Bundle schema: OK
✔ Server proof: OK
✔ File hash matches
✔ Local userSign: OK

## 5. Privacy and statelessness guarantees

The CLI must:
- never send original file contents to the API,
- never send meta or userSign,
- keep all contextual information local in `.tproof.json`.

The TimeProofs API remains stateless, privacy-first, and universal across domains.
