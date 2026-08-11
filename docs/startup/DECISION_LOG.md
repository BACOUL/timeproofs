# TimeProofs — Decision Log

This file records material product/company decisions so future contributors and AI assistants can distinguish settled choices from open hypotheses.

## D-001 — Keep TimeProofs as the company/product brand
**Status:** DECISION
TimeProofs remains the primary brand. `AgentReady` is not the relaunch category or primary product name.

## D-002 — Reuse the existing repository
**Status:** DECISION
Repository: `BACOUL/timeproofs`. Relaunch work happens on `relaunch/invariant-engine` until ready.

## D-003 — Company category target
**Status:** DECISION
Target category: **Cross-Protocol Consistency Infrastructure for agentic transactions**. Core thesis: individually valid protocol objects can compose into a globally inconsistent transaction.

## D-004 — Initial wedge
**Status:** DECISION, REFINED BY D-013
Initial wedge: UCP ↔ AP2 composition. This is a wedge, not the permanent company boundary.

## D-005 — Strategic destination
**Status:** DECISION
Long-term product: **Cross-Protocol Consistency & Invariant Engine** with versioned invariant packs across protocols and business systems.

## D-006 — Deterministic decisions
**Status:** DECISION
Core invariant enforcement does not depend on an LLM. Primary states: PASS, WARN, BLOCK, UNKNOWN.

## D-007 — Invariant Packs are the moat hypothesis
**Status:** HYPOTHESIS / STRATEGIC DIRECTION
The generic comparison engine is not defensible. The moat hypothesis is a versioned, verified corpus of mappings, invariants, canonicalization rules, edge cases, fixtures and compatibility knowledge across protocol/provider pairs.

## D-008 — Do not become a scanner/dashboard business
**Status:** DECISION
TimeProofs must not repeat the previous scanner/score/report pattern as its core business. Observation and CI are acceptable adoption modes; inline enforcement is the strategic destination.

## D-009 — Global product-quality standard
**Status:** DECISION
Product, website, docs, API/SDK, pricing, onboarding, UX and operations must be benchmarked against category-leading global infrastructure companies before major decisions.

## D-010 — English-first developer product
**Status:** DECISION
The core product, docs, CLI, errors, package ecosystem and technical marketing are English-first for global adoption.

## D-011 — Distribution preference
**Status:** DECISION
Developer-led/self-serve distribution is preferred: GitHub, package registries, docs, fixtures, CI, protocol communities and integrations. Enterprise sales may expand value but must not be the only viable acquisition mechanism.

## D-012 — Current unresolved decisions
**Status:** OPEN
Not frozen yet: final package names, final API shape, final pricing, open-source boundary, hosted vs local verification boundary, evidence-bundle signing, data retention defaults, exact first buyer segment, final website IA, dashboard need, external pack authoring.

## D-013 — Do not duplicate UCP/AP2 conformance as the company wedge
**Status:** DECISION
Current UCP/AP2 owns several local guarantees such as merchant authorization/signature, checkout mandate presence/signature, expiry, basic checkout-scope binding and downgrade prevention. TimeProofs may consume/test these but does not present them as the strategic gap.

## D-014 — Blocking invariants require normative evidence and ambiguity fixtures
**Status:** DECISION
No invariant becomes BLOCK-capable until exact protocol/version scope, source fields/derivation, normative references, allowed transformations, canonicalization semantics, PASS/BLOCK/UNKNOWN/unsupported fixtures and enforcement point are defined.

## D-015 — Treat AP2 cryptographic checkout binding as existing infrastructure
**Status:** DECISION
Current AP2 provides strong checkout↔PaymentMandate identity binding. TimeProofs does not claim that raw binding as its moat.

## D-016 — UCP authoritative grand total drives first payment projection rule
**Status:** DECISION
Compare AP2 `payment_amount.amount` with authoritative UCP checkout `totals[type=total].amount`, after currency validation. Do not reconstruct total from a hard-coded component list.

## D-017 — AP2 PaymentReceipt is not proof of executed amount by itself
**Status:** DECISION
A future executed-payment invariant requires provider/network evidence; missing execution evidence yields UNKNOWN.

## D-018 — Order consistency is temporal, not strict final-state equality
**Status:** DECISION
UCP Orders can legitimately evolve. Order invariants are lifecycle-aware; `current order == original checkout` is not a generic invariant.

## D-019 — Freeze company thesis separately from evolving pack research
**Status:** DECISION
`TIMEPROOFS_PRODUCT_CONSTITUTION.md` is canonical for company thesis. Protocol research may refine adapters, mappings, evidence and pack contents but cannot silently redefine the company. Frozen product model: `ProtocolObject → Binding → Invariant → Evidence → Decision`.

## D-020 — Execute milestones in canonical order
**Status:** DECISION, UPDATED BY D-021/D-022/D-023/D-024
`docs/startup/EXECUTION_PLAN.md` is the canonical implementation sequence. M0–M3 and M2.1 are complete. Current active milestone is M4.

## D-021 — M1 complete; conservative seven-rule shortlist
**Status:** DECISION
Carried forward:
- `TP-CX-001 PAYMENT_TOTAL_PROJECTS_AUTHORIZED_CHECKOUT`
- `TP-CX-002 PAYMENT_CURRENCY_PROJECTS_AUTHORIZED_CHECKOUT`
- `TP-CX-003 PAYMENT_PROJECTION_REFERENCES_EXACT_AUTHORIZED_STATE`
- `TP-EV-001 EXECUTED_PAYMENT_MATCHES_APPROVED_MANDATE`
- `TP-LC-001 COMMITTED_ORDER_BINDS_ORIGINATING_CHECKOUT`
- `TP-LC-002 INVALIDATED_OR_CANCELED_STATE_NOT_COMMITTED`
- `TP-EV-002 COMPOSED_EVIDENCE_CHAIN_CLOSED`

## D-022 — M2 canonical transaction model is frozen
**Status:** DECISION, HARDENED BY D-024
Core primitives: ProtocolObject, BindingEdge, InvariantDefinition, EvidenceItem, EvaluationResult, Decision, TransactionGraph. Core is protocol-agnostic, provenance-preserving, graph-based and deterministic. Default aggregation: `BLOCK > UNKNOWN > WARN > PASS`.

## D-023 — M3 UCP↔AP2 Pack v0.1 specification is frozen
**Status:** DECISION
The first executable artifact profile is:
1. `TP-CX-003` as exact-authorized-state prerequisite using protocol-native binding semantics;
2. `TP-CX-002` as BLOCK-capable currency projection check;
3. `TP-CX-001` as BLOCK-capable authoritative grand-total projection check.

TP-EV-001, TP-LC-001, TP-LC-002 and TP-EV-002 remain modeled but are not oversold as artifact-only blocking rules. Unsupported FX, tips, incremental authorization, partial capture, split settlement and marketplace payout return UNKNOWN until explicit profiles exist. Canonical artifacts: `packs/ucp-ap2/SPEC.md`, `manifest.json`, `COMPATIBILITY.md`, `M3_COMPLETION_REPORT.md`.

## D-024 — M2.1 foundation hardening is part of the frozen core
**Status:** DECISION
Before fixtures/engine implementation, structural weaknesses in M2 were corrected without changing company thesis or M3 invariant semantics.

Required core properties now include:
- non-empty required evaluation envelope;
- `core_schema_version` and `evaluation_id`;
- explicit pack and adapter versions;
- exact artifact snapshot identity/digest with explicit digest scope;
- structured `UNKNOWN` reasons while preserving PASS/WARN/BLOCK/UNKNOWN as the only primary verdicts.

Initial UNKNOWN reasons: `MISSING_OBJECT`, `MISSING_EVIDENCE`, `UNSUPPORTED_VERSION`, `UNSUPPORTED_TRANSFORMATION`, `AMBIGUOUS_BINDING`, `AMBIGUOUS_MAPPING`, `STALE_EVIDENCE`, `SELECTIVE_DISCLOSURE`, `INSUFFICIENT_LIFECYCLE_CONTEXT`, `INTEGRITY_UNVERIFIED`, `OTHER`.

M3 compatibility was reviewed and no invariant semantics changed. See `docs/product/M2_1_FOUNDATION_HARDENING.md`.

## D-025 — AgentReady is explicitly legacy on the relaunch branch
**Status:** DECISION
AgentReady-era code, README/package/site metadata remain temporarily to avoid destructive migration before the new core is executable. They are non-canonical for the relaunch. Current product truth comes from the TimeProofs constitution/current-state/execution/decision documents. See `LEGACY_AGENTREADY.md`.

---
Add new decisions sequentially. Never rewrite history to make it look cleaner; supersede/refine decisions explicitly.
