# TimeProofs CLI v0.2 – Specification

This document defines the behavior of the `timeproofs` command-line interface (CLI) for TimeProofs API v0.2.

The CLI is a local tool. It:
- never sends raw data to the TimeProofs API
- only sends SHA-256 hashes to the API
- builds and verifies `.tproof.json` bundles locally

The CLI has three primary commands:
- timeproofs hash <file>
- timeproofs timestamp <file>
- timeproofs verify <bundle>

1. Common behavior

- Exit code 0 on success, non-zero on error.
- Errors must be printed to stderr.
- Human-readable output is sufficient.
- No raw file data must ever be sent to the API.

2. Command: timeproofs hash <file>

Purpose
Compute a SHA-256 hash of a file.

Usage
timeproofs hash <file>

Behavior
1) Read <file> as raw bytes.
2) Compute SHA-256 digest (no normalization).
3) Output lowercase hex hash.

Example output
✔ Hash (SHA-256)
4b227777d4dd1fc61c6f884f48641d02b8f8f8d...

3. Command: timeproofs timestamp <file>

Purpose
Compute a file hash, request a stateless timestamp from the API, and generate a `.tproof.json` bundle locally.

Minimal usage
timeproofs timestamp <file>

Usage with metadata
timeproofs timestamp <file> --type document --domain legal --purpose contract-draft --mime application/pdf --label confidential --label v1 --notes "First draft" --out ./contract.tproof.json

Supported flags
--api <base-url> (default https://api.timeproofs.io)
--type <type>
--domain <domain>
--purpose <purpose>
--mime <mime-type>
--label <label> (repeatable)
--notes <text>
--out <path>

Notes about flags
- All metadata flags are LOCAL ONLY. They are written into the bundle under meta and are never sent to the API.
- --label is repeatable. If provided multiple times, all values are included in meta.labels.

Behavior
1) Compute SHA-256 hash of <file> locally.
2) POST { "hash": "<sha256-hex>" } to {api}/api/timestamp.
3) Receive the stateless timestamp response containing:
   - hash: { algorithm, value }
   - timestamp: { issuedAt, issuer, nonce? }
   - proof: { algo, hmac, signature, publicKey, keyId }
4) Build a Proof Bundle locally:
   - version = "timeproofs-0.2"
   - hash, timestamp, proof from the API response
   - meta from flags (optional)
5) Write the bundle to disk:
   - If --out is provided: write to that path
   - Otherwise: write next to the file using <file>.tproof.json
6) Print a short summary.

Example output
✔ Hash computed (SHA-256)
✔ Timestamp issued by https://api.timeproofs.io
✔ Bundle saved: ./contract.tproof.json

4. Command: timeproofs verify <bundle>

Purpose
Verify a `.tproof.json` bundle offline (schema-like structural checks, optional file hash match).

Basic usage
timeproofs verify <bundle>

Usage with file
timeproofs verify <bundle> --file <file>

Supported flags
--file <file>

Behavior
1) Load and parse <bundle> as JSON.
2) Perform offline structural validation:
   - version must be "timeproofs-0.2"
   - hash.algorithm must be "SHA-256"
   - hash.value must be a 64-hex string
   - timestamp.issuedAt and timestamp.issuer must be present
   - proof.algo and proof.keyId must be present
3) If --file is provided:
   - compute SHA-256 hash of <file>
   - compare it to bundle.hash.value
4) Print a clear summary and exit:
   - exit code 0 if structural checks pass and (if --file is provided) the hash matches
   - non-zero exit code otherwise

Example outputs

Minimal (no file)
✔ Bundle schema: OK
ℹ No file provided (hash not checked)
ℹ Server proof (Ed25519) not verified in v0.2

With file
✔ Bundle schema: OK
✔ File hash matches bundle.hash.value
ℹ Server proof (Ed25519) not verified in v0.2

5. v0.2 cryptographic verification scope

v0.2 CLI verification is offline and focuses on:
- bundle structure checks
- optional file hash match

Cryptographic verification of the server proof (Ed25519) is not performed by the CLI in v0.2.

6. Privacy and statelessness guarantees

The CLI must:
- never send original file contents to the API
- never send meta or user context to the API
- only send SHA-256 hashes to the API
- keep all contextual information local inside `.tproof.json`

The TimeProofs API remains stateless: it does not store proofs and does not fetch any data for verification.
