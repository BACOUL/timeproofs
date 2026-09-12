# TimeProofs Primary Objective

Status: **FOUNDER-DIRECTED / SINGLE STRATEGIC OBJECTIVE / RESEARCH-VALIDATION PHASE**

Last reviewed: 2026-09-12

## Primary objective

Make TimeProofs the specialist **trust and evidence-integrity layer for AI systems and autonomous agents**: the infrastructure an agent can call before relying on a document, datum, message, API response, authorization, software state, external-agent output or other material dependency in order to determine **what can be independently verified about that object and whether it is acceptable to rely on for a specific intended use under an explicit policy**.

TimeProofs should answer the machine question:

> **Can I rely on this object for this action, and exactly why?**

The answer must be evidence-backed, machine-readable, policy-scoped and independently verifiable.

TimeProofs is not a universal truth engine, not a credibility score, not a generic timestamping SaaS, not an agent-log dashboard and not an investigation engine.

Its purpose is to put a verifiable security boundary between an AI agent and the external information, state and authority on which the agent relies.

## What "rely on" means

An object is never simply `good` or `bad` in the abstract.

Reliance is evaluated for a particular use, action and policy.

A resource may be acceptable for a low-risk summary and unacceptable for a high-value payment or contract signature.

Candidate dimensions include, where relevant:

- integrity — is this the exact object/content being evaluated?
- source identity — who or what produced/served it?
- authenticity — is the claimed issuer/source supported by verifiable evidence?
- provenance — can the acquisition/origin chain be reconstructed?
- temporal evidence — when was it observed, attested or proven to exist?
- freshness/currentness — is the state sufficiently current for this use?
- version/supersession — has a later valid version replaced it?
- revocation — has the object, permission, key or assertion been revoked?
- authorization — is the object/authority valid for this agent and action?
- proof assurance — which of the above are declared, signed, independently anchored or otherwise externally attested?
- conflicts — do incompatible proofs or states exist?

These dimensions must not be collapsed into a misleading universal trust score.

## Strategic proof target

The long-term product thesis is validated only if controlled evaluation can establish that:

```txt
same qualified AI agent + TimeProofs
>
same qualified AI agent without TimeProofs
```

on tasks where unreliable inputs, stale state, version drift, revoked authority, source ambiguity, provenance failure, tampering, replay, temporal ordering or action-context reconstruction materially affect correctness or safety.

The primary measurable advantage is **Reliance Safety Uplift**.

## Reliance Safety Uplift

The permanent metric family should include, where applicable:

- unsafe-reliance rate;
- stale-action rate;
- source/authenticity misclassification rate;
- integrity/tamper detection rate;
- revoked/superseded dependency detection rate;
- unsupported temporal-claim rate;
- wrong-order rate;
- correct abstention rate;
- action-context reproducibility;
- revalidation precision;
- revalidation waste;
- provenance verification coverage;
- cross-system proof composition success;
- verification portability and independence;
- latency and cost overhead.

Blocking integrity, authenticity, authorization or proof-validity failures may not be averaged away by aggregate scores.

## Canonical agent decision

The core agent-facing primitive should converge toward a policy-scoped decision such as:

```txt
assessForUse(object, intended_use, policy)
```

It must return a structured verdict plus the exact reasons and proof basis.

Candidate top-level verdicts:

```txt
TRUSTED_FOR_USE
USE_WITH_CAUTION
REVALIDATION_REQUIRED
INSUFFICIENT_EVIDENCE
UNVERIFIED_SOURCE
SUPERSEDED
REVOKED
INTEGRITY_FAILED
CONFLICTING_PROOFS
DO_NOT_USE
```

These labels are hypotheses until formally specified and benchmarked.

A verdict never means that every proposition contained in the object is factually true.

## Permanent semantic boundaries

TimeProofs must never silently transform:

- `AUTHENTIC` into `TRUE`;
- `SIGNED_BY_X` into `CONTENT_CORRECT`;
- `OBSERVED_AT` into `WAS_TRUE_AT`;
- `EXISTED_BEFORE` into `CREATED_AT`;
- `NO_PROOF_FOUND` into `DID_NOT_EXIST`;
- `NO_KNOWN_REVOCATION` into `PROVEN_NOT_REVOKED` unless the revocation domain is complete and checked;
- `NO_NEWER_VERSION_FOUND` into `CURRENT_VERSION` unless the version domain/policy justifies it;
- two equal checkpoints into proof that no intermediate change occurred;
- a self-declared observation into a source-attested observation;
- a timestamp chosen by a caller into independent proof of time;
- temporal order into causation;
- `TRUSTED_FOR_USE` under one policy into universal trust for all uses.

These distinctions are strategic product requirements, not implementation details.

## Agent-native capability target

Candidate primitives include:

```txt
inspect()
verifyIntegrity()
verifySource()
verifyProvenance()
observe()
anchor()
checkpoint()
proveExistence()
proveOrder()
checkRevocation()
checkSupersession()
revalidate()
assessForUse()
bindAction()
verify()
history()
```

The exact API is not constitutional and should be reduced to the smallest useful machine interface after benchmark evidence.

## External building blocks

TimeProofs should not reinvent cryptography, identity, signatures, provenance or standards when stronger interoperable primitives exist.

Candidate mechanisms may include, where justified:

- digital signatures and PKI;
- source-native signatures/receipts;
- RFC 3161 timestamp authorities;
- qualified electronic timestamps where legally relevant;
- SCITT transparency services and receipts;
- transparency logs;
- OpenTimestamps or equivalent public anchoring;
- Sigstore/Rekor-style inclusion proofs;
- content/provenance standards such as C2PA where applicable;
- source-attested API/system receipts;
- TLS/zk-style provenance attestations;
- verifiable credentials/identity attestations;
- authorization/delegation standards;
- future agent-receipt and agent-identity standards.

No provider, chain, log, model or protocol is privileged permanently.

## Replace-don't-defend rule

If an external standard, protocol, library, service or provider is better than a TimeProofs-owned component under fair testing, TimeProofs should adopt, adapt or compose it rather than defend an inferior implementation.

Differentiation should live above commodity primitives: reliance semantics, evidence composition, assurance modeling, adversarial correctness, currentness/revocation/supersession checks, agent integration, action-context binding and interoperability.

## Product relationship with SpiderEvidence

TimeProofs and SpiderEvidence remain separate specialist engines.

```txt
TimeProofs:
Can this object/dependency be relied on for this use, and which properties are actually proven?

SpiderEvidence:
What do the available pieces of evidence justify concluding about the underlying question?
```

Examples:

- TimeProofs may establish that a report is authentic, intact, current and non-revoked under a defined policy.
- SpiderEvidence may then assess whether the claims inside that report are supported, contradicted, independent or sufficient for a conclusion.

A TimeProofs receipt may be consumed by SpiderEvidence as verified provenance/integrity/temporal evidence, but SpiderEvidence must verify it rather than trust it by brand or ownership.

TimeProofs must not become a parallel investigation or truth engine.

## Research-before-build rule

The current phase remains opportunity validation and architecture research.

The earlier G0 temporal-evidence work remains useful but is **not sufficient to validate this broader trust-layer thesis**.

Before a major rebuild or public repositioning is authorized, the broader thesis must demonstrate that:

1. capable agents materially need a specialized reliance/security layer even as model intelligence improves;
2. the problem is not adequately solved by platform logs, signatures, provenance standards, authorization systems and receipt formats used separately;
3. TimeProofs can compose those mechanisms into materially safer machine decisions without creating a misleading trust oracle;
4. `same agent + TimeProofs` beats strong non-TimeProofs baselines on controlled tasks;
5. the architecture preserves strict separation between authenticity/integrity and factual truth.

## Commodity / kill rule

If strong agents plus standard platform features and open standards can achieve the same practical outcomes with equal or better correctness, portability, trust and economics, TimeProofs must not be rebuilt as a redundant wrapper.

In that case the project must move differentiation upward to a genuinely valuable reliance-control layer or be stopped.

## Current execution boundary

This document changes the research thesis only.

It does **not** authorize:

- replacing the current production site;
- deleting AgentReady assets;
- claiming TimeProofs already provides a universal AI trust layer;
- shipping unsupported `safe to use` guarantees;
- introducing a new blockchain or cryptographic primitive;
- presenting research targets as validated capabilities.

All implementation remains subject to explicit gates, adversarial tests and measured validation.
