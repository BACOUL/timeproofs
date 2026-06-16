# TimeProofs

**TimeProofs = the black box for AI actions.**

TimeProofs is a privacy-first traceability layer for observable AI actions. For each observable AI action, TimeProofs helps create a clear, signed and verifiable AI Action File. The company keeps that file wherever it wants. TimeProofs seals the file fingerprint, not sensitive action content.

Website: https://timeproofs.io  
API: https://api.timeproofs.io  
Status: V1 positioning in progress on top of the existing v0.2 proof-bundle primitives

The first sellable product is **TimeProofs Action File v1**.

## What TimeProofs is

TimeProofs is the black box for AI actions.

It gives companies a way to keep traceability evidence for important AI actions without sending the underlying action content to TimeProofs by default. The core idea is simple:

1. An observable AI action happens.
2. The company creates an AI Action File describing that action in its own environment.
3. The company hashes that file locally.
4. TimeProofs seals the file fingerprint.
5. Later, anyone with the file can verify whether the file still matches the sealed fingerprint.

TimeProofs is not a generic promise that every digital object is legally proven or compliant. It is a narrow, privacy-first proof layer for file integrity, timestamped traceability, and reconstruction of what happened around AI actions.

## What an AI Action File is

An AI Action File is a customer-owned traceability file for one observable AI action.

It should be:

- Clear enough for business, support, risk, legal, operations, and product teams to understand.
- Structured enough for software, agents, and internal tools to generate and verify.
- Portable enough to store in the company's own systems.
- Signed or sealed in a way that makes later modification detectable.
- Verifiable without sending sensitive action content to TimeProofs by default.

An AI Action File may reference an AI system, agent, workflow, action type, timestamp, customer-owned evidence, technical logs, redaction notes, and internal IDs. The company decides what it stores in its own file. TimeProofs only needs the file fingerprint by default.

## How it differs from logs

Technical logs are still important. They help developers debug systems, monitor infrastructure, inspect errors, trace requests, and understand runtime behavior.

TimeProofs does not replace technical logs.

TimeProofs complements logs by creating a business-readable traceability file for an observable AI action. Logs can remain technical and system-specific. An AI Action File can summarize the action, point to supporting logs or internal evidence, and produce a portable record that non-engineering teams can understand and keep.

The intended split is:

- Logs: detailed technical observability and debugging.
- AI Action File: customer-owned traceability record for one observable AI action.
- TimeProofs Seal or proof: signed verification that a specific file fingerprint existed at a specific time.

## Privacy model

TimeProofs is privacy-first and hash-only by default.

The expected V1 privacy flow is:

1. The company creates the AI Action File locally in its own environment.
2. The company stores the AI Action File wherever it wants: its evidence repository, ticketing system, document vault, data lake, CRM, legal archive, or internal storage.
3. The company hashes the AI Action File locally.
4. TimeProofs receives only the fingerprint by default.
5. TimeProofs returns a signed receipt or proof for that fingerprint.
6. Verification compares the local file fingerprint with the sealed fingerprint.

Sensitive prompts, outputs, customer data, internal reasoning, personal data, business details, and action content should not be sent to TimeProofs by default. The company controls what it stores in its own AI Action Files.

## Existing proof bundle compatibility

The repository already contains useful proof-of-existence primitives. They remain important and must stay backward-compatible.

Current v0.2 concepts:

- Hash data locally with SHA-256.
- Send only the hash to the TimeProofs API.
- Receive a timestamped proof response.
- Build or verify a `.tproof.json` proof bundle.
- Verify a proof bundle cryptographically and, when needed, compare a local file hash against the proof hash.

Existing `.tproof.json` proof bundles are not the same thing as future `.action.json` AI Action Files. They are compatible lower-level proof objects that can help seal or verify file fingerprints.

### Current quick usage for proof bundles

1. Compute a SHA-256 hash locally.
2. POST it to `/api/timestamp`.
3. Receive a stateless timestamp response.
4. Build a `.tproof.json` bundle client-side.
5. Verify the bundle with the SDK, CLI, browser verifier, or API route depending on the environment.

Example timestamp response shape:

```json
{
  "version": "timeproofs-0.2",
  "hash": { "algorithm": "SHA-256", "value": "<hex>" },
  "timestamp": {
    "issuedAt": "2025-11-26T20:00:00.000Z",
    "issuer": "https://api.timeproofs.io",
    "nonce": "<random-id>"
  },
  "proof": {
    "algo": "Ed25519",
    "signature": "<hex>",
    "publicKey": "<base64-or-omitted>",
    "keyId": "tp-v0-2-main"
  }
}
```

### Current API notes

`POST /api/timestamp`

Body:

```json
{ "hash": "<sha256-hex>" }
```

Rules:

- `hash` must be a 64-character SHA-256 hex string.
- The server should never receive files or sensitive content, only the hash.

`POST /api/verify`

Current v0.2 verification is proof-bundle based. A hash alone is not enough in the stateless model. Verification needs the proof bundle fields such as hash, timestamp, canonical payload, issuer, nonce, and proof signature.

The existing hash-only and proof-bundle primitives remain useful for future AI Action File work because an AI Action File can be hashed locally and its fingerprint can be sealed with the same privacy-first principle.

### Current SDK notes

JavaScript SDK helpers currently include:

- `hashText`
- `hashBytes`
- `hashFile`
- `timestamp`
- `createBundle`
- `verifyBundle`

Typical existing proof-bundle flow:

1. Hash data locally.
2. Call `timestamp(hash)`.
3. Build a `.tproof.json` bundle with `createBundle`.
4. Store the bundle.
5. Verify later with `verifyBundle`.

Useful files:

- `api-v02/worker.js`
- `selfhost/server.js`
- `sdk/timeproof.js`
- `sdk/timeproofs-v02.js`
- `sdk/hash.js`
- `sdk/bundle.js`
- `sdk/verify.js`
- `sdk/verify-offline.js`
- `openapi.yaml`
- `proof-bundle.schema.json`
- `spec/proof-bundle-v0.2.schema.json`
- `examples/browser-basic.html`
- `examples/demo.tproof.json`
- `examples/sample-v0.2.tproof.json`

These files should not be deleted or broken during the V1 repositioning.

## Object model

The V1 object boundaries are defined in [docs/objects-model.md](docs/objects-model.md). In short: AI Action File = business traceability file describing one observable AI action; Seal = cryptographic record proving that a canonical fingerprint was sealed at a specific time; Proof Bundle / `.tproof.json` = the existing lower-level technical proof format. `.action.json` is future product-level Action File work, while `.tproof.json` remains backward-compatible.

## V1 roadmap

The safe execution path is intentionally staged:

1. Strategy: lock the product truth and positioning.
2. Repository audit: map existing pages, verification flow, SDK, API routes, specs, and migration risks.
3. README repositioning: make GitHub present the new TimeProofs V1 direction clearly.
4. Homepage repositioning: update the public homepage around AI action traceability.
5. Navigation, footer, and metadata alignment: align site-wide labels and SEO/social metadata.
6. AI Action File / Seal / Proof Bundle object model: define each object before implementation.
7. Action File specification: define the `.action.json` format, hashing rules, and canonicalization.
8. Generator, seal, and verify flow: add focused tools only after the object model is accepted.
9. Demo: show one observable AI action producing an AI Action File, local hash, seal, and verification.
10. Pilot validation: validate the product with early users before full SaaS, dashboard, billing, or broad platform work.

One PR should have one objective. Website changes, API behavior changes, SDK behavior changes, and dashboard work should stay in their own later PRs.

## Proof limitations

TimeProofs proves a narrow and useful fact: a specific file fingerprint was sealed at a specific time by a specific TimeProofs proof or receipt.

TimeProofs does not prove that:

- The AI was correct.
- The content is true.
- The action was complete, fair, lawful, or compliant.
- The file contains all relevant context.
- The full chain of custody is complete.
- A court, regulator, insurer, auditor, customer, or partner will accept the file as sufficient proof.

TimeProofs does not guarantee legal validity. TimeProofs does not provide full compliance certification. TimeProofs does not replace legal review, regulated audit, or technical logs.

## Project structure

Current repository areas:

```text
api-v02/worker.js
selfhost/server.js
sdk/
spec/
schemas/
examples/
v02/spec/
index.html
verify.html
docs.html
proofspec.html
security.html
privacy.html
legal.html
regulations.html
use-cases.html
about.html
PRODUCT_STRATEGY.md
ROADMAP.md
AUDIT_CURRENT_REPO.md
```

## License

See `LICENSE`.

## Maintainer

TimeProofs is developed and maintained by Jeason Bacoul.

GitHub: https://github.com/BACOUL/timeproofs
