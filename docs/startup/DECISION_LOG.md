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
**Status:** DECISION, UPDATED THROUGH D-028
`docs/startup/EXECUTION_PLAN.md` is the canonical implementation sequence. M0–M6 and M2.1 are complete. Current active milestone is M7.

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

## D-026 — M4 fixture corpus is the executable regression contract
**Status:** DECISION
M4 is complete. The first source-of-truth corpus lives in `fixtures/ucp-ap2/v0.1/` and freezes expected PASS/BLOCK/UNKNOWN behavior before engine implementation.

Required cases include exact projection PASS, amount mismatch BLOCK, currency mismatch BLOCK, missing checkout UNKNOWN/MISSING_OBJECT, unsupported version UNKNOWN/UNSUPPORTED_VERSION, missing authoritative total UNKNOWN/MISSING_EVIDENCE and unsupported FX UNKNOWN/UNSUPPORTED_TRANSFORMATION.

M5 implementation must satisfy this corpus without silently weakening M3 semantics. Any expected-result change requires an explicit pack-spec/decision update.

## D-027 — M5 deterministic core is complete only with green executable regression
**Status:** DECISION
M5 is complete after executable validation, not code presence alone.

The release-validation process strengthened the regression runner to check aggregate status, per-invariant status, declared reason codes, declared UNKNOWN reasons, and UNKNOWN/null consistency. A mismatch in the initial amount-check UNKNOWN classification was fixed in implementation rather than weakening the frozen fixture contract.

Verified successful run:
- workflow: `TimeProofs Core Regression`
- run id: `31543423839`
- head commit: `28d1eaeae88628749c323e2b1d3c29be78e0e05f`
- Node 22
- conclusion: `success`

## D-028 — M6 production ingestion supports only explicit real profiles and explicit binding evidence
**Status:** DECISION
M6 is complete.

Initial production support is deliberately pinned to:
- UCP Checkout protocol version `2026-04-08`, capability `dev.ucp.shopping.checkout`;
- AP2 PaymentMandate VCT `mandate.payment.1`.

Research fixture labels such as `ucp-current-m1` and `ap2-v0.2-m1` remain test-only.

Production TP-CX-003 no longer treats a present `transaction_id` as proof. For the supported SHA-256 profile, the SDK requires the exact checkout JWT, computes its base64url SHA-256 hash and compares it with AP2 `transaction_id`. Missing binding evidence yields UNKNOWN/INTEGRITY_UNVERIFIED; mismatch yields BLOCK.

M6 does not claim SD-JWT signature/key-binding validation, merchant JWS verification, arbitrary AP2 hash algorithms, remote UCP schema composition or external payment execution proof.

Developer surfaces now exist through local SDK `verifyTransaction()` and CLI `timeproofs verify`, with JSON output and stable initial exit codes. Full M4+M6 GitHub Actions regression passed:
- run id `31571347893`
- head `96ddefe88e0486b8d2be25a4a6dcae0b5bf485e4`
- Node 22
- conclusion `success`.

M7 is now active and must freeze the customer-facing CI/package contract while preventing raw JWT/payment credential leakage.

---
Add new decisions sequentially. Never rewrite history to make it look cleaner; supersede/refine decisions explicitly.