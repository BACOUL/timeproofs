# TimeProofs — Current State

Last updated: 2026-08-11
Branch: `relaunch/invariant-engine`

## Where the project is

**Company:** Cross-Protocol Consistency Infrastructure for agentic transactions.

**Long-term product:** Cross-Protocol Consistency & Invariant Engine.

**Initial wedge:** UCP ↔ AP2 composition consistency focused on semantic/economic cross-object consistency and evidence closure rather than generic protocol conformance.

**Current milestone:** M5 — Deterministic Verify Engine.

## Completed milestones

- M0 — product constitution and operating system: COMPLETE
- M1 — UCP/AP2 normative composition audit: COMPLETE
- M2 — canonical transaction model: COMPLETE
- M2.1 — foundation hardening: COMPLETE
- M3 — UCP/AP2 Invariant Pack v0.1 specification: COMPLETE
- M4 — fixture corpus and regression contract: COMPLETE
- M5 — deterministic Verify Engine: IMPLEMENTATION PRESENT, EXECUTION VALIDATION PENDING

## M5 implementation now present

New product code:
- `timeproofs-core/index.js`
- `timeproofs-core/tests/run-fixture-regression.mjs`
- `timeproofs-core/README.md`

Root package now exposes `npm run test:timeproofs-core` while retaining AgentReady metadata as explicitly legacy.

Implemented behavior:
- deterministic TP-CX-003 prerequisite evaluation interface;
- deterministic TP-CX-002 currency projection;
- deterministic TP-CX-001 authoritative total projection;
- structured UNKNOWN propagation;
- unsupported transformation handling;
- deterministic aggregate ordering `BLOCK > UNKNOWN > WARN > PASS`;
- regression runner reading the frozen M4 manifest and checking per-rule status, UNKNOWN reason and aggregate decision.

Important boundary: M5 does not pretend that a raw `transaction_id` alone performs AP2 cryptographic verification. Real protocol parsing/native binding verification and exact supported version recognition belong to M6 adapters.

## M5 completion gate

M5 must NOT be marked COMPLETE until the regression command has actually executed successfully against all frozen M4 fixtures in a Node >=20 environment:

`npm run test:timeproofs-core`

If execution exposes a mismatch, fix implementation unless the fixture itself demonstrably contradicts the frozen M3 specification; do not weaken semantics merely to make tests green.

## Frozen core

`ProtocolObject → BindingEdge → InvariantDefinition → EvidenceItem → EvaluationResult → Decision`

Required properties include artifact digests, explicit pack/adapter/schema versions, evaluation time, provenance and structured UNKNOWN reasons. Primary verdicts remain PASS/WARN/BLOCK/UNKNOWN.

## Legacy boundary

AgentReady-era root package/site/docs remain temporarily. They are not product truth. See `LEGACY_AGENTREADY.md`.

## Immediate next task

Execute and validate the M5 regression suite. Only after green execution: write M5 completion report, mark M5 complete, activate M6 adapters + CLI/SDK.

## One-line status

> M0–M4 and M2.1 complete; first TimeProofs engine code exists; M5 awaits actual regression execution before completion.
