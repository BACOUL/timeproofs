# TimeProofs JavaScript SDK v0.2 – Specification (Draft)

This document defines the high-level API and behavior of the TimeProofs JavaScript SDK for API v0.2. The SDK is designed to work in Node.js and modern browsers, never send raw data to the TimeProofs API, only send hashes and protocol parameters, and generate and verify .tproof.json Proof Bundles according to the Proof Bundles spec and JSON Schema. The SDK must be simple enough to be adopted by developers and AI agents as a default pattern.

## 1. Top-level API

The SDK exposes:
- createClient(options)
- standalone helpers: hashText, hashBytes, hashFile, timestamp, createBundle, verifyBundle

### 1.1. createClient(options)

Example usage:
import { createClient } from "timeproofs";
const tp = createClient({
  apiBase: "https://api.timeproofs.io",
  apiKey: "tp_test_xxx"
});

Options:
apiBase?: string  (default: https://api.timeproofs.io)
apiKey?: string   (optional)

The returned client exposes:
- hashText(text)
- hashBytes(bytes)
- hashFile(file)  (browser only)
- timestamp(hash, options)
- createBundle({ hash, timestamp, proof, meta?, userSign? })
- verifyBundle(bundle, fileOrBytes?)

## 2. Hashing helpers

hashText(text)
- UTF-8 encode
- SHA-256
- return hex lowercase (64 chars)

hashBytes(bytes)
- SHA-256 over Uint8Array
- return hex lowercase

hashFile(file)
- browser only
- read as ArrayBuffer
- SHA-256
- return hex lowercase

## 3. Timestamping

timestamp(hash, options)

TimestampOptions:
apiBase?: string
apiKey?: string

Behavior:
1. Validate hash (64 hex chars)
2. POST to {apiBase}/api/timestamp
3. Never send file data or meta
4. Response contains:
   hash: { algorithm, value }
   timestamp: { issuedAt, issuer, nonce? }
   proof: { algo, hmac, signature, publicKey, keyId }

## 4. Proof Bundle helpers

Types:

HashObject:
algorithm: "SHA-256"
value: string

TimestampObject:
issuedAt: string
issuer: string
nonce?: string

ProofObject:
algo: "HMAC-SHA256+Ed25519"
hmac: string
signature: string
publicKey: string
keyId: string

MetaObject:
type?: string
mime?: string
domain?: string
purpose?: string
createdBy?: string
tool?: string
labels?: string[]
notes?: string
(any additional fields allowed)

UserSignObject:
publicKey: string
algorithm: "Ed25519"
signature: string

ProofBundle:
version: "timeproofs-0.2"
hash: HashObject
timestamp: TimestampObject
proof: ProofObject
meta?: MetaObject
userSign?: UserSignObject

### createBundle(bundleInput)

bundleInput:
- hash
- timestamp
- proof
- meta? (optional)
- userSign? (optional)

Behavior:
1. Validate mandatory fields
2. Construct:
   version = "timeproofs-0.2"
   hash
   timestamp
   proof
   meta?
   userSign?
3. Optionally validate against proof-bundle.schema.json
4. Return bundle

## 5. verifyBundle(bundle, fileOrBytes?)

VerifyResult:
valid: boolean
schemaValid: boolean
proofValid: boolean
hashMatches: boolean | null
userSignValid: boolean | null
errors: string[]

Behavior:
1. Validate JSON Schema
2. Verify Ed25519 signature over canonical payload
3. If fileOrBytes provided, recompute SHA-256 and compare to bundle.hash.value
4. If userSign present, verify signature over meta
5. valid = schemaValid AND proofValid AND (hashMatches not false) AND (userSignValid not false)

## 6. Privacy & Statelessness

The SDK must:
- never send file contents to server
- never send meta or userSign to server
- keep all contextual info local in the Proof Bundle
- only send hash and protocol parameters to TimeProofs API

This ensures compliance with TimeProofs privacy-first, stateless design, suitable for AI pipelines, enterprise systems, legal workflows, healthcare, finance, supply chain and public sector.
