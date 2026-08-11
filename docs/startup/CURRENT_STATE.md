# TimeProofs — Current State

Last updated: 2026-08-12
Branch: `relaunch/invariant-engine`

## Where the project is

**Company:** Cross-Protocol Consistency Infrastructure for agentic transactions.

**Long-term product:** Cross-Protocol Consistency & Invariant Engine.

**Initial wedge:** UCP ↔ AP2 composition consistency focused on semantic/economic cross-object consistency and evidence closure rather than generic protocol conformance.

**Current milestone:** M6 — UCP/AP2 adapters + CLI/SDK.

## Completed milestones

- M0 — product constitution and operating system: COMPLETE
- M1 — UCP/AP2 normative composition audit: COMPLETE
- M2 — canonical transaction model: COMPLETE
- M2.1 — foundation hardening: COMPLETE
- M3 — UCP/AP2 Invariant Pack v0.1 specification: COMPLETE
- M4 — fixture corpus and regression contract: COMPLETE
- M5 — deterministic Verify Engine: COMPLETE
- M6 — UCP/AP2 adapters + CLI/SDK: ACTIVE

## M5 completion proof

Implemented:
- `timeproofs-core/index.js`
- `timeproofs-core/tests/run-fixture-regression.mjs`
- `timeproofs-core/README.md`
- `npm run test:timeproofs-core`
- `.github/workflows/timeproofs-core-regression.yml`

The regression runner checks aggregate verdicts, per-invariant statuses, declared reason codes, declared UNKNOWN reasons, and UNKNOWN/null consistency.

GitHub Actions validated the frozen M4 corpus successfully on Node 22:
- workflow: `TimeProofs Core Regression`
- successful run id: `31543423839`
- successful head: `28d1eaeae88628749c323e2b1d3c29be78e0e05f`

See `timeproofs-core/M5_COMPLETION_REPORT.md`.

## Frozen core

`ProtocolObject → BindingEdge → InvariantDefinition → EvidenceItem → EvaluationResult → Decision`

Primary verdicts remain PASS/WARN/BLOCK/UNKNOWN. UNKNOWN is explicit and structured. The first engine remains deterministic and does not use an LLM as decision authority.

## Frozen first executable pack

1. `TP-CX-003 PAYMENT_PROJECTION_REFERENCES_EXACT_AUTHORIZED_STATE`
2. `TP-CX-002 PAYMENT_CURRENCY_PROJECTS_AUTHORIZED_CHECKOUT`
3. `TP-CX-001 PAYMENT_TOTAL_PROJECTS_AUTHORIZED_CHECKOUT`

M5 satisfies the frozen M4 artifact corpus for these rules.

## M6 objective

Replace research-fixture assumptions with real developer-facing protocol ingestion while preserving the core boundary.

M6 must deliver:
1. real UCP Checkout adapter;
2. real AP2 PaymentMandate adapter;
3. exact profile/version recognition strategy;
4. raw artifact snapshot/digest generation;
5. raw→canonical provenance;
6. protocol-native exact-state/binding verification interface;
7. public local Verify input model;
8. CLI `timeproofs verify ...`;
9. initial JS/TS SDK surface;
10. JSON output suitable for future CI/runtime;
11. developer errors that distinguish invalid input, unsupported profile and UNKNOWN evaluation;
12. clean tests without coupling protocol parsing into `timeproofs-core`.

Research profile strings such as `ucp-current-m1` and `ap2-v0.2-m1` remain fixture-only and MUST NOT become production protocol version identifiers.

## Legacy boundary

AgentReady-era root package/site/docs remain temporarily and are non-canonical. Do not extend AgentReady while implementing M6. See `LEGACY_AGENTREADY.md`.

## Immediate next task

Design and implement M6 adapters before polishing CLI presentation:
- define adapter contracts;
- inspect current canonical UCP/AP2 machine schemas;
- pin supported source profiles;
- implement parsing/canonical extraction/provenance;
- feed canonical graph inputs into the already-green M5 engine;
- then expose the minimal CLI/SDK workflow.

## One-line status

> M0–M5 plus M2.1 hardening complete with green regression CI; M6 real UCP/AP2 adapters + CLI/SDK is active.
