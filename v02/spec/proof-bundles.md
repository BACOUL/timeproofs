# TimeProofs Proof Bundles v0.2 – Specification (Draft)

This document defines the official structure, rules, and verification model for TimeProofs Proof Bundles (.tproof.json) introduced in API v0.2. A Proof Bundle is a self-contained, privacy-first, stateless cryptographic record proving that a specific piece of data existed at a specific time and has not changed. Bundles contain no raw data: only hashes, signatures, metadata and optional user-side signatures. They are fully verifiable offline and compatible with AI pipelines, enterprise systems, compliance workflows, legal archives, and all data domains.

## 1. Overview

A TimeProofs Proof Bundle is a JSON object with:
- a fixed version
- a SHA-256 hash of the data
- a server-issued timestamp (signed)
- the server’s dual proof (HMAC + Ed25519)
- optional metadata describing the data
- optional user signatures over metadata
- no raw data, no identifiers, no PII, no tracking fields

Bundles are designed to be durable, portable, offline-verifiable, and compatible with regulatory frameworks (AI Act, Data Act, GDPR, eIDAS2).

## 2. File format

Bundles are stored in UTF-8 JSON, recommended extension:
.tproof.json

The top-level object:

version: "timeproofs-0.2"
hash: HashObject
timestamp: TimestampObject
proof: ProofObject
meta?: MetaObject
userSign?: UserSignObject

All unknown fields must be ignored but preserved.

## 3. Hash object

hash:
  algorithm: "SHA-256"
  value: lowercase hex string, 64 characters
Rules:
- Always computed over raw bytes
- No normalization (no trimming, no newline conversions)
- For files: hash bytes exactly as-is
- For text: UTF-8 encode first

## 4. Timestamp object

timestamp:
  issuedAt: ISO8601 string, UTC
  issuer: string, typically "https://timeproofs.io"
  nonce?: string (optional server randomness)

Rules:
- issuedAt is immutable, server-generated
- issuer identifies the signing authority
- nonce, if present, must be included in the signature

## 5. Proof object

proof:
  algo: "HMAC-SHA256+Ed25519"
  hmac: string (hex or base64)
  signature: string (base64)
  publicKey: string (base64, Ed25519 public key)
  keyId: string (server key identifier “kid”)

Meaning:
- HMAC-SHA256 proves server-side issuance
- Ed25519 proves authenticity and public auditability
- keyId maps to the public key published in /.well-known/jwks.json

Rules:
- verification uses Ed25519 over canonical signed payload
- publicKey must match keyId advertised by the server at issuance time
- hmac must match the server-side shared secret (never exposed)

## 6. Metadata object (optional)

meta:
  type?: string
  mime?: string
  domain?: string
  purpose?: string
  createdBy?: string
  tool?: string
  labels?: list of strings
  notes?: string
  additional properties allowed

Recommended normalized categories for type:
document
image
video
audio
code
dataset
model
log
contract
release
config
archive
financial-statement
medical-record
product-info
supply-record
ai-output
ai-training-set
ai-prompt
audit-proof
evidence

Rules:
- metadata is optional
- metadata is never sent to the server
- metadata must remain local to the bundle
- metadata must be excluded from server signature

## 7. User signature (optional)

userSign:
  publicKey: string (base64, Ed25519 public key)
  algorithm: "Ed25519"
  signature: string (base64)

Rules:
- The user signature covers ONLY metadata
- If metadata is modified, userSign becomes invalid
- The server does not validate or store user signatures
- Allows compliance, legal, enterprise or ownership proofs

## 8. Canonical signed payload

The signed payload for server Ed25519 signatures is a canonical JSON string containing:
- version
- hash.algorithm
- hash.value
- timestamp.issuedAt
- timestamp.issuer
- timestamp.nonce?
- proof.algo
- proof.keyId

Rules:
- exclude metadata
- exclude userSign
- exclude proof.hmac
- exclude proof.signature itself
- payload must be strictly deterministic to prevent malleability

## 9. Offline verification model

Offline verification requires:
1. JSON Schema validation
2. Canonical signed payload reconstruction
3. Ed25519 signature verification using proof.publicKey
4. Hash recomputation (if file or bytes provided)
5. userSign verification (if present)

Verification results:
- schemaValid: JSON structure valid
- proofValid: Ed25519 signature valid
- hashMatches: null (no file provided) or boolean
- userSignValid: null (not provided) or boolean
- valid: schemaValid AND proofValid AND (hashMatches not false) AND (userSignValid not false)

## 10. Privacy & statelessness

Bundles must:
- contain no raw file contents
- contain no personal data
- contain no identifiers, device IDs, user IDs, or tracking information
- contain no server-stored metadata
- be verifiable offline with no network calls
- be transportable across storage, clouds, CI, and AI agents

The server must:
- never store metadata
- never store userSign
- never store files
- only process hash + timestamp parameters

## 11. Durability & compatibility

Bundles must remain valid as long as:
- SHA-256 remains cryptographically safe
- Ed25519 remains secure
- The public keys corresponding to keyId are published

Future versions may introduce:
- new algorithms (v0.3+)
- new metadata categories
- new compliance modes
- compatibility layers for TimeProofs v1.x and v2.x

Backward compatibility:
- all v0.2 bundles must remain verifiable in v1.x and v2.x unless explicitly deprecated in ProofSpec.
