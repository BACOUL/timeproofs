# TimeProofs — Canonical Execution Plan

Status: ACTIVE
Branch: `relaunch/invariant-engine`

This file defines the implementation order. Do not skip ahead unless the previous milestone exit criteria are met or a founder decision explicitly changes the sequence.

## Current state

Legacy AgentReady code remains intact and is not yet migrated. New TimeProofs evaluation engine code has not started.

Completed/advanced work:

- product thesis and relaunch context documented;
- startup operating system and handoff documented;
- M1 UCP/AP2 normative audit completed;
- M2 canonical transaction model completed;
- machine-readable core model schema created;
- key protocol/model assumptions recorded in Decision Log.

Current active milestone: **M3 — UCP/AP2 Invariant Pack v0.1 specification**.

---

## M0 — Product constitution and operating system

### Goal
Freeze the company thesis, product boundaries, decision process and handoff model before implementation.

### Deliverables
- `TIMEPROOFS_PRODUCT_CONSTITUTION.md`
- `TIMEPROOFS_MASTER_CONTEXT.md`
- `AI_PROJECT_ENTRYPOINT.md`
- startup operating system
- decision log
- handoff protocol
- benchmark policy
- execution plan

### Status
**COMPLETE.**

---

## M1 — UCP/AP2 normative composition audit

### Goal
Identify only the cross-object guarantees that remain valuable after accounting for current UCP/AP2 guarantees.

### Primary artifacts
- `docs/research/UCP_AP2_GAP_MATRIX.md`
- `docs/research/M1_1_PAYMENT_ORDER_AUDIT.md`
- `docs/research/M1_COMPLETION_REPORT.md`

### Status
**COMPLETE.**

M1 produced the conservative seven-rule design shortlist carried into M3.

---

## M2 — Canonical transaction model

### Goal
Freeze the data model used by every future pack.

### Deliverables completed
- `docs/product/CANONICAL_MODEL.md`
- `docs/product/BINDING_MODEL.md`
- `docs/product/EVIDENCE_MODEL.md`
- `docs/product/DECISION_MODEL.md`
- `docs/product/M2_COMPLETION_REPORT.md`
- `schemas/timeproofs-core.schema.json`

### Frozen primitives
- `ProtocolObject`
- `BindingEdge`
- `InvariantDefinition`
- `EvidenceItem`
- `EvaluationResult`
- `Decision`
- `TransactionGraph`

### Rules locked
- source evidence is immutable/preserved;
- canonical values never erase raw source provenance;
- versions are explicit;
- unsupported/ambiguous mappings produce `UNKNOWN`;
- one economic transaction is represented as an object graph rather than a forced universal ID;
- core structures contain no UCP/AP2-specific business fields;
- lifecycle/evaluation time is representable;
- externally sourced evidence is distinguishable from protocol-native evidence;
- conformance failure is distinguishable from cross-object invariant failure.

### Exit proof
M2 documents and represents PASS, BLOCK, UNKNOWN, lifecycle evolution and a future A2A/MCP ProtocolObject without schema redesign.

### Status
**COMPLETE.**

---

## M3 — UCP/AP2 Invariant Pack v0.1 specification

### Goal
Freeze the first pack before implementation.

### Deliverables
- `packs/ucp-ap2/SPEC.md`
- pack manifest schema
- exact invariant IDs and semantics
- compatibility matrix

### M1 design shortlist carried into M3
- `TP-CX-001 PAYMENT_TOTAL_PROJECTS_AUTHORIZED_CHECKOUT`
- `TP-CX-002 PAYMENT_CURRENCY_PROJECTS_AUTHORIZED_CHECKOUT`
- `TP-CX-003 PAYMENT_PROJECTION_REFERENCES_EXACT_AUTHORIZED_STATE`
- `TP-EV-001 EXECUTED_PAYMENT_MATCHES_APPROVED_MANDATE`
- `TP-LC-001 COMMITTED_ORDER_BINDS_ORIGINATING_CHECKOUT`
- `TP-LC-002 INVALIDATED_OR_CANCELED_STATE_NOT_COMMITTED`
- `TP-EV-002 COMPOSED_EVIDENCE_CHAIN_CLOSED`

Only TP-CX-001 and TP-CX-002 are immediate artifact-only blocking candidates. The rest require structural, external-evidence or lifecycle semantics before production blocking.

### Required per invariant
- stable ID;
- protocol versions;
- exact inputs;
- normative/product rationale;
- canonicalization;
- allowed transformations;
- deterministic predicate;
- PASS/BLOCK/UNKNOWN behavior;
- enforcement point;
- limitations.

### Exit criteria
- pack manifest and compatibility matrix are explicit;
- v0.1 production invariant set is clearly separated from deferred/research rules;
- every production invariant can be represented solely through M2 primitives;
- no invariant is marked production/blocking unless it satisfies the Definition of Done from Master Context and Decision Log;
- M4 can build fixtures without inventing semantics.

### Status
**ACTIVE.**

---

## M4 — Fixture corpus and regression harness

### Goal
Build evidence before engine polish.

### Structure
For every invariant:
- PASS fixture;
- BLOCK fixture;
- UNKNOWN fixture;
- unsupported-version fixture;
- edge-case fixtures where legitimate transformations exist.

### Exit criteria
- fixtures are source-controlled and human-inspectable;
- expected decision/evidence is declared for every fixture;
- regression suite can later be run against engine changes and protocol-pack updates.

---

## M5 — Deterministic Verify engine

### Goal
Implement the smallest protocol-agnostic core that evaluates an object graph against a pack.

### Initial modules
- object ingestion;
- canonicalization interface;
- binding graph;
- invariant evaluator;
- evidence collector;
- decision aggregator;
- machine-readable result.

### Explicit exclusions
No auth, billing, hosted database, dashboard or unrelated SaaS infrastructure.

### Exit criteria
- all M4 fixtures evaluate deterministically;
- same input always yields same output;
- `UNKNOWN` is first-class;
- evidence explains every decision;
- core does not import protocol-specific business logic directly.

---

## M6 — UCP/AP2 adapters + CLI/SDK

### Goal
Give developers a world-class local verification path.

### Deliverables
- UCP adapter;
- AP2 adapter;
- initial JS/TS SDK surface;
- CLI command;
- JSON output mode;
- clear error/evidence UX.

### Desired workflow
`timeproofs verify <transaction-artifacts>`

### Exit criteria
- first useful verification in under 10 minutes from docs;
- local execution requires no TimeProofs account;
- copy-paste quickstart works on clean environment;
- error output points to exact source evidence.

---

## M7 — CI integration

### Goal
Make consistency regression part of development/release pipelines.

### Deliverables
- GitHub Action or equivalent integration;
- stable exit codes;
- artifact output;
- fixture/pack regression support.

### Exit criteria
- BLOCK fails CI when configured;
- WARN/UNKNOWN behavior is configurable but explicit;
- results remain reproducible locally.

---

## M8 — Enforce runtime

### Goal
Move from validation to transaction-control infrastructure.

### Deliverables
- runtime decision API/library;
- latency budget;
- fail-open/fail-closed semantics;
- version pinning;
- pack rollback;
- evidence persistence option;
- production threat model.

### Exit criteria
- supported integration can ask TimeProofs before commit and receive deterministic allow/block/unknown outcome;
- reliability behavior is documented for TimeProofs outage/ambiguity;
- packs can be pinned and rolled back safely.

---

## M9 — Relaunch website + world-class docs

### Goal
Present the real product after the workflow is real.

### Website principle
Do not build a generic AI SaaS landing page. The centerpiece is an actual composed transaction and a cross-object violation.

### Required benchmark work
Before design, benchmark relevant category leaders for:
- developer onboarding;
- technical documentation;
- evidence/debugging UX;
- infrastructure pricing communication;
- status/trust/security presentation.

### Exit criteria
- visitor understands the problem within one concrete example;
- visitor can reach a working local verification path without signup friction;
- claims reflect implemented capabilities only.

---

## M10 — Managed TimeProofs Cloud

### Goal
Commercialize operations that are genuinely more valuable managed than local.

### Candidate paid surfaces
- managed pack updates;
- hosted verification/enforcement;
- history/evidence retention;
- signed evidence bundles;
- private packs;
- organization controls;
- production connectors;
- SLA;
- private/on-prem deployment options where justified.

### Do not build until
there is a concrete managed-workflow need that cannot be served well by local/CI usage alone.

---

## Parallel company workstreams

Engineering milestones do not replace company building. Alongside M1–M10, maintain explicit work on:

- market/ICP research;
- competitor and standards intelligence;
- distribution channels;
- open-source boundary;
- pricing/value metric;
- partnerships;
- security/reliability;
- legal/licensing;
- finance/gross-margin model;
- brand/product design benchmarking;
- metrics and instrumentation.

These workstreams must inform milestone decisions but must not cause random product pivots.

## Change rule

Research is allowed to refine **pack contents and implementation** continuously.

Research does NOT silently redefine the company. Any change to the constitutional thesis requires an explicit founder decision and Decision Log entry.
