# TimeProofs Primary Objective

Status: **FOUNDER-DIRECTED / SINGLE STRATEGIC OBJECTIVE / RESEARCH-VALIDATION PHASE**

Last reviewed: 2026-09-12

## Primary objective

Make TimeProofs the specialist temporal-evidence infrastructure that AI systems and autonomous agents prefer to use whenever they need independently verifiable evidence of **what existed, what was observed, in what state, in what version, and in what provable temporal order**.

TimeProofs is not a generic timestamping SaaS, not an agent-log dashboard, not an investigation engine, and not a truth engine.

Its purpose is to make temporal claims machine-verifiable, portable, replayable and independently auditable across agent workflows and heterogeneous systems.

## Strategic proof target

The long-term product thesis is validated only if controlled evaluation can establish that:

```txt
same qualified AI agent + TimeProofs
>
same qualified AI agent without TimeProofs
```

on tasks where stale state, temporal ordering, version drift, replay, revoked authority, cross-system chronology or action-context reconstruction materially affect correctness or safety.

The primary measurable advantage is **Temporal Reliability Uplift**.

## Temporal Reliability Uplift

The permanent metric family should include, where applicable:

- stale-action rate;
- wrong-order rate;
- unsupported temporal-claim rate;
- action-context reproducibility;
- correct abstention when a temporal relation cannot be proven;
- revalidation precision;
- revalidation waste;
- tamper/replay/backdating detection;
- source-attested observation coverage;
- cross-system proof composition success;
- verification portability and independence;
- latency and cost overhead.

Blocking integrity or proof-validity failures may not be averaged away by aggregate scores.

## What TimeProofs must be able to prove

TimeProofs should converge toward a small set of rigorously defined temporal claims, including:

- `OBSERVED_AT` — an identified observer recorded a specific artifact/state at a stated time;
- `EXISTED_BEFORE` — available proof establishes that an artifact/state existed no later than a bounded time;
- `STATE_AT` — a specific state was observed or otherwise validly attested at a stated time under an explicit assurance level;
- `PRECEDES` / `FOLLOWS` — available proof establishes a temporal ordering between two proof objects;
- `SUPERSEDES` — one version/state is linked as a successor to another;
- `ACTION_BOUND_TO_CONTEXT` — an action is cryptographically linked to the exact temporal evidence context on which it relied.

Every claim must expose its proof basis, assurance level, limitations and verification path.

## Permanent semantic boundaries

TimeProofs must never silently transform:

- `OBSERVED_AT` into `WAS_TRUE_AT`;
- `EXISTED_BEFORE` into `CREATED_AT`;
- `NO_PROOF_FOUND` into `DID_NOT_EXIST`;
- two equal checkpoints into proof that no intermediate change occurred;
- a self-declared observation into a source-attested observation;
- a timestamp chosen by a caller into independent proof of time;
- correlation or temporal order into causation.

These distinctions are strategic product requirements, not implementation details.

## Agent-native capability target

The intended machine interface should remain minimal and composable. Candidate primitives are:

```txt
observe()
anchor()
checkpoint()
proveExistence()
proveOrder()
revalidate()
bindAction()
verify()
history()
```

The exact API is not constitutional and may change through evidence-driven design.

## External building blocks

TimeProofs should not reinvent cryptography or standards when stronger interoperable primitives exist.

Candidate external mechanisms may include, where justified by evaluation:

- RFC 3161 timestamp authorities;
- qualified electronic timestamps where legally relevant;
- SCITT transparency services and receipts;
- transparency logs;
- OpenTimestamps or equivalent public anchoring;
- Sigstore/Rekor-like inclusion proofs;
- source signatures;
- source-attested API or system receipts;
- TLS/zk-style provenance attestations;
- future agent-receipt and identity standards.

No provider, chain, log, model or protocol is privileged permanently.

## Replace-don't-defend rule

If an external standard, protocol, library, service or provider is better than a TimeProofs-owned component under fair testing, TimeProofs should adopt, adapt or compose it rather than defend an inferior implementation.

The differentiation should live above commodity primitives: temporal semantics, proof composition, assurance modeling, adversarial correctness, agent integration, state revalidation, context binding and interoperability.

## Product relationship with SpiderEvidence

TimeProofs and SpiderEvidence are separate specialist engines.

```txt
TimeProofs:
What can be proven about existence, observation, state, version and order in time?

SpiderEvidence:
What do the available pieces of evidence justify concluding?
```

A TimeProofs `TemporalReceipt` may be consumed by SpiderEvidence as temporal evidence, but SpiderEvidence must verify it rather than trust it by brand or ownership.

TimeProofs must not become a parallel investigation or truth engine.

## Research-before-build rule

The current phase is opportunity validation and architecture research.

Before a major rebuild is authorized, TimeProofs must demonstrate that the target capability is materially useful to autonomous agents beyond ordinary logs, generic timestamping and existing receipt systems.

A successful research phase should produce:

1. a canonical temporal proof model;
2. a threat/failure model;
3. a competitive and standards map;
4. representative agent tasks;
5. a hidden benchmark design;
6. a fair baseline without TimeProofs;
7. explicit GO / NO-GO criteria;
8. an interoperability contract with SpiderEvidence.

## Commodity / kill rule

If strong agents plus standard platform logs, existing receipt formats and commodity temporal-proof services can achieve the same practical outcomes with equal or better correctness, portability, trust and economics, TimeProofs must not be rebuilt as a redundant wrapper.

In that case, the project must either move differentiation upward to a genuinely valuable temporal-control layer or be stopped.

## Current execution boundary

This document establishes strategic direction only.

It does **not** authorize:

- replacing the current production site;
- deleting AgentReady assets;
- claiming TimeProofs is already a temporal-evidence standard;
- shipping unsupported proof guarantees;
- introducing a new blockchain or cryptographic primitive;
- presenting research targets as validated capabilities.

All implementation remains subject to an explicit gated roadmap and measured validation.
