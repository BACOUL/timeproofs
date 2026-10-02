# Architecture — V2 reference alpha

## Decision boundary

A ProofProfile is a versioned declarative set of ProofRequirements. Each requirement states an accepted artifact format, trusted issuer role, deterministic claim comparisons, dependencies and acquisition hints. Only the purchase profile currently has executable semantics. Draft profiles fail closed to UNSUPPORTED.

An IntendedAction is an exact bounded purchase, including agent, principal, merchant, currency, integer minor units and offer id. Its deterministic SHA-256 fingerprint is referenced inside issuer-signed claims. JWS signatures cover the original compact bytes; no proprietary receipt or seal is introduced. The internal JSON fingerprint uses sorted keys and JSON serialization over a strictly validated string-only action. It is not a claim of general-purpose RFC 8785 conformance.

An Evidence is a local reference `{id, format, token}` around an original external-format artifact. It is not a new wire receipt format. The JWT adapter verifies compact Ed25519 JWS; the VC-JWT adapter also checks its narrowly declared VC 1.1 single-subject subset. Each explicitly maps application claims to requirements. A JWT alone is not an AP2 mandate.

EvidenceResolver checks:

1. Profile implementation and action validity.
2. Original signatures, independently configured issuer keys, role constraints, audience, subject, temporal claims, key activation/retirement and revocation.
3. Exact action fingerprint and unique evidence identifiers within the dossier.
4. Per-requirement identity, principal, scope, amount, merchant and offer checks.
5. Dependency satisfaction and processor-to-merchant transaction binding.
6. Conflicting claims without arbitrary selection or AI judgment.

Missing requirements produce typed acquisition requests. Registered collector callbacks receive these requests. Collectors are called only when prerequisite requirements pass; results are verified through the same resolver. No dynamic code, URL or untrusted credential lookup is executed.

A ProofCase stores action, profile id, original evidence, fingerprints and explainable resolution. It records the trust-policy digest, not a self-authorizing policy. ProofCaseVerifier recomputes from original evidence using the verifier's separately supplied policy and current time. Claimed statuses and counts are not trusted.

## Status precedence

INVALID artifact → UNSUPPORTED artifact/profile → CONFLICT requirement → SATISFIED if all requirements pass → INCOMPLETE otherwise. An invalid irrelevant artifact is not silently discarded. Requirement statuses are SATISFIED, MISSING, BLOCKED and CONFLICT. A blocked requirement has evidence but an unsatisfied dependency.

## Core and API

The SDK includes a local resolver and verifier, plus a thin fetch-based API client with TypeScript declarations. The CLI supports profiles, demo, resolve and offline verification. The HTTP server exposes the same engine. No LLM is required.

Public preview operations are stateless fixture demo, profile browsing, adapter metadata and sandbox verification. The public verifier's trust roots are pinned in the server fixture file. Uploaded trust keys are never used.

Self-host private API is one process and one tenant with a configured API secret, pinned public-key policy and atomic file storage. Concurrent evidence writes are serialized per case. This is a reference storage implementation, not a distributed database or an enterprise retention service.

## Versioning

Engine: 2.0.0-alpha.1. Case envelope: timeproofs.case/2. Purchase profile: authorized_purchase/v1, version 1.0.0. Adapter versions: 1.0.0. Changing normative checks must change the profile version and conformance vectors. Unsupported profiles and algorithms must not fall back to a permissive checker.

## Completeness limitations

The selected profile defines sufficiency for the artifacts supplied. A malicious exporter can omit a conflicting artifact and construct a different case. TimeProofs does not know the universe of external evidence without a separately committed source manifest. Future acquisition and action registries must address this before claiming global completeness or cross-case replay prevention.

The profile does not enforce aggregate spending, payment-network finality, actual fulfillment, legal authority, real-world identity correctness, physical deletion or production merchant reconciliation. All those require narrower profiles and appropriate independently trusted sources.
