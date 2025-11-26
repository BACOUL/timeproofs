# TimeProofs ProofSpec v0.2 – Protocol Specification (Draft)

This document defines the TimeProofs protocol in version 0.2, covering hashing rules, timestamp issuance, dual cryptographic proofs, JSON Proof Bundles (.tproof.json), offline verification, and compliance guarantees. The protocol is stateless, privacy-first, and designed to serve as a universal layer of integrity and existence proof across all data domains: AI, datasets, code, logs, models, documents, releases, finance, supply chain, public sector, and more.

The goal of TimeProofs is to provide a universal, open, and verifiable timestamp protocol that guarantees:
- when data existed,
- that it has not changed,
- without ever revealing the data itself,
- without storing, collecting, or tracking anything.

This document is the normative reference for TimeProofs API v0.2, SDK v0.2, CLI v0.2, and Proof Bundles v0.2.

## 1. Protocol overview

TimeProofs is intentionally minimal:
- Hash locally.
- Send the hash to the API.
- Receive a timestamp and a signed proof.
- Store everything in a self-contained Proof Bundle (.tproof.json).
- Verify offline, anytime, without network access.

The server:
- never receives data,
- never sees metadata,
- never stores hashes,
- is fully stateless.

The client:
- hashes the data,
- builds the bundle,
- may attach local metadata,
- may attach a user signature,
- verifies everything offline.

## 2. Data hashing rules

Hashing is deterministic and canonical.

### 2.1 Algorithm
SHA-256 only.

### 2.2 Rules
- Hash raw bytes exactly as they exist.
- No normalization, no trimming, no change of newlines.
- For text inputs, UTF-8 encoding must be applied before hashing.
- For files, read bytes exactly as-is.
- Output must be lowercase hex, 64 characters.

This produces the canonical digest used by the server and embedded in the bundle.

## 3. Timestamp issuance

A timestamp is issued by POST /api/timestamp with payload:
{
  "hash": "<sha256-hex>"
}

The server:
- verifies input format,
- records no state,
- generates issuedAt (UTC),
- signs the canonical timestamp payload with HMAC-SHA256,
- signs again with Ed25519,
- returns the timestamp + dual proof.

### 3.1 No data ever sent
Only hashes are transmitted. No files, no metadata, no user identifiers.

### 3.2 Timestamp fields
timestamp:
  issuedAt: RFC3339 UTC
  issuer: string (base URL)
  nonce?: string (optional)

Rules:
- issuedAt is immutable.
- issuer identifies the authority.
- nonce prevents replay ambiguity.

## 4. Cryptographic proof model

Each timestamp carries two independent proofs:

### 4.1 HMAC-SHA256
- Guarantees internal integrity.
- Issued using a server secret not exposed publicly.

### 4.2 Ed25519 signature
- Guarantees public verifiability.
- Uses a publicKey + keyId published in /.well-known/jwks.json.
- Enables long-term verification and archival use.
- Makes TimeProofs usable in audits, legal compliance, chain-of-custody, AI provenance, etc.

### 4.3 Canonical signed payload
The Ed25519 signature is computed over a canonical JSON object containing:
- version
- hash.algorithm
- hash.value
- timestamp.issuedAt
- timestamp.issuer
- timestamp.nonce? (if present)
- proof.algo
- proof.keyId

Excluded:
- metadata
- userSign
- proof.hmac
- proof.signature itself

## 5. Proof Bundles (.tproof.json)

A Proof Bundle is a self-contained JSON file containing:
version: "timeproofs-0.2"
hash: HashObject
timestamp: TimestampObject
proof: ProofObject
meta?: MetaObject
userSign?: UserSignObject

### 5.1 Goals of bundles
- Long-term durability
- Offline verification
- Universal interoperability across tools, AI agents, CI/CD pipelines, legal archives, etc.
- No server dependency after creation
- Zero tracking, zero personal data, zero storage

### 5.2 Metadata (optional)
Metadata is fully local and never sent to the server.

Common fields:
type
mime
domain
purpose
createdBy
tool
labels[]
notes

Allowed domains:
legal, finance, ml-training, healthcare, supply-chain, audit, public-sector, engineering, datasets, and any extension.

Allowed types include:
document, image, video, audio, code, dataset, model, log, contract, release, config, archive, financial-statement, medical-record, supply-record, product-info, ai-output, ai-training-set, ai-prompt, audit-proof, evidence

### 5.3 UserSign (optional)
A user or organization may attach their own Ed25519 signature over metadata.

This does not involve the server and does not affect timestamp validity.

## 6. Verification rules (offline-first)

Verification must work with no network access.

Steps:
1. Validate JSON Schema.
2. Rebuild canonical payload.
3. Verify Ed25519 signature using proof.publicKey.
4. Optionally check HMAC (only if local copy of server secret exists; normally unused).
5. If a file is provided, recompute SHA-256 and compare to bundle.hash.value.
6. If userSign exists, verify signature over metadata.

### 6.1 Valid definition
valid = schemaValid AND proofValid AND (hashMatches != false) AND (userSignValid != false)

### 6.2 Weak verification allowed
If no file is provided:
- hashMatches = null
- verification still possible (timestamp + signature)

## 7. Privacy and statelessness guarantees

TimeProofs is designed so that:
- no server logs need to be stored,
- no metadata or user information is ever transmitted,
- no centralized storage exists,
- proofs are universally portable,
- verification can be performed without contacting TimeProofs.

This design makes the protocol GDPR-friendly, AI-Act compliant, and appropriate for sensitive contexts (legal, finance, medical, government).

## 8. Compliance and governance

### 8.1 Versioning
- ProofSpec v0.2 is forward-compatible with v1.0.
- Bundles issued now will remain valid in future versions.
- Fields may be added but not removed without deprecation.

### 8.2 JWKS key management
- Public keys rotate via JWKS standard.
- keyId identifies the current verification key.
- Past keys remain published for long-term auditability.

### 8.3 Domains of use
The protocol must support:
AI pipelines
datasets
logs
source code
models
documents
contracts
financial statements
supply chain records
medical and regulatory archives
audit logs
public-sector digital records
general-purpose data integrity

### 8.4 No lock-in
The protocol explicitly avoids:
- proprietary formats,
- server-side storage,
- opaque vendor systems,
- trapped metadata.

TimeProofs must remain portable across clouds, hosts, CI pipelines, and offline systems.

## 9. Operational guarantees

### 9.1 Deterministic hashing
Identical input bytes must always lead to the same hash.

### 9.2 Deterministic canonical payload
Signature verification must not depend on JSON formatting or whitespace.

### 9.3 Universal verification
Any open-source validator must be able to verify a bundle with no vendor tooling.

### 9.4 No personal data
The protocol forbids embedding:
- identifiers,
- names,
- emails,
- device IDs,
- tracking tokens.

## 10. Future evolution (informative)

This v0.2 spec prepares the foundation for:
- ProofSpec v1.0 (stable)
- multi-algorithm support
- distributed ProofChain (v2.0)
- W3C Community Group alignment
- compliance extensions for AI Act / Data Act
- legally admissible timestamping bundles
- integrations with AI agents and automated systems
- native support in SDKs and CI/CD tools

TimeProofs aims to become a global, open, privacy-first standard for proving when data existed and ensuring it has not changed.
