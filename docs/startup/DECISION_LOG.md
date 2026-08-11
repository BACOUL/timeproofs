# TimeProofs — Decision Log

This file records material product/company decisions so future contributors and AI assistants can distinguish settled choices from open hypotheses.

## D-001 — Keep TimeProofs as the company/product brand

**Status:** DECISION

TimeProofs remains the primary brand. `AgentReady` is not the relaunch category or primary product name.

## D-002 — Reuse the existing repository

**Status:** DECISION

Repository: `BACOUL/timeproofs`.

Relaunch work happens on `relaunch/invariant-engine` until ready.

## D-003 — Company category target

**Status:** DECISION

Target category: **Cross-Protocol Consistency Infrastructure for agentic transactions**.

Core thesis: individually valid protocol objects can compose into a globally inconsistent transaction.

## D-004 — Initial wedge

**Status:** DECISION, REFINED BY D-013

Initial wedge: UCP ↔ AP2 composition.

This is a wedge, not the permanent company boundary.

## D-005 — Strategic destination

**Status:** DECISION

Long-term product: **Cross-Protocol Consistency & Invariant Engine** with versioned invariant packs across protocols and business systems.

## D-006 — Deterministic decisions

**Status:** DECISION

Core invariant enforcement must not depend on an LLM deciding whether a transaction is consistent.

Primary states:

- PASS
- WARN
- BLOCK
- UNKNOWN

## D-007 — Invariant Packs are the moat hypothesis

**Status:** HYPOTHESIS / STRATEGIC DIRECTION

The generic comparison engine is not expected to be defensible.

The moat hypothesis is a versioned, verified corpus of mappings, invariants, canonicalization rules, edge cases, fixtures and compatibility knowledge across protocol/provider pairs.

## D-008 — Do not become a scanner/dashboard business

**Status:** DECISION

TimeProofs must not repeat the previous scanner/score/report pattern as its core business.

Observation and CI are acceptable adoption modes; inline enforcement is the strategic destination.

## D-009 — Global product-quality standard

**Status:** DECISION

Product, website, docs, API/SDK, pricing, onboarding, UX and operations must be benchmarked against category-leading global infrastructure companies before major decisions.

## D-010 — English-first developer product

**Status:** DECISION

The core product, docs, CLI, errors, package ecosystem and technical marketing should be English-first for global adoption.

## D-011 — Distribution preference

**Status:** DECISION

Developer-led/self-serve distribution is preferred: GitHub, package registries, docs, fixtures, CI, protocol communities and integrations.

Enterprise sales may expand value but must not be the only viable acquisition mechanism.

## D-012 — Current unresolved decisions

**Status:** OPEN

The following are deliberately not frozen yet:

- final package names
- final API shape
- final pricing
- open-source boundary
- hosted vs local verification boundary
- signing requirements for evidence bundles
- data retention defaults
- exact first production blocking invariant set (M3 owns final freeze)
- exact first buyer segment
- final website information architecture
- whether a product dashboard is needed at all in V1
- whether external pack authors are ever supported

## D-013 — Do not duplicate UCP/AP2 conformance as the company wedge

**Status:** DECISION

Current UCP/AP2 owns several local guarantees such as merchant authorization/signature, checkout mandate presence/signature, expiry, basic checkout-scope binding and downgrade prevention.

TimeProofs may test these for compatibility or defense-in-depth, but MUST NOT present them as the strategic cross-protocol gap.

## D-014 — Blocking invariants require normative evidence and ambiguity fixtures

**Status:** DECISION

No invariant may become a BLOCK rule until it has exact protocol/version scope, source fields/derivation, normative references, allowed transformations, canonicalization semantics, PASS/BLOCK/UNKNOWN/version-unsupported fixtures, and a known enforcement point.

## D-015 — Treat AP2 cryptographic checkout binding as existing infrastructure

**Status:** DECISION

Current AP2 v0.2 closed PaymentMandates contain a `transaction_id` derived from the exact signed checkout JWT. TimeProofs MUST NOT claim that AP2 lacks checkout↔PaymentMandate identity binding.

## D-016 — UCP authoritative grand total drives the first payment projection rule

**Status:** DECISION

The first amount invariant must compare AP2 `payment_amount.amount` with the authoritative UCP checkout `totals[type=total].amount`, after currency validation.

## D-017 — AP2 PaymentReceipt is not proof of executed amount by itself

**Status:** DECISION

Current AP2 PaymentReceipt binds to a closed PaymentMandate through `reference` and exposes payment/PSP/network identifiers, but does not contain executed amount or currency.

A future executed-payment invariant therefore requires provider/network evidence; missing execution evidence yields UNKNOWN.

## D-018 — Order consistency is temporal, not strict final-state equality

**Status:** DECISION

UCP Orders can legitimately evolve after placement. TimeProofs MUST NOT enforce `current order == original checkout` as a generic invariant.

Order invariants must be lifecycle-aware.

## D-019 — Freeze company thesis separately from evolving pack research

**Status:** DECISION

`TIMEPROOFS_PRODUCT_CONSTITUTION.md` is the canonical product-thesis document.

Protocol research may refine adapters, mappings, evidence requirements and Invariant Pack contents, but MUST NOT silently redefine the company category or strategic product destination.

Frozen product model:

`ProtocolObject → Binding → Invariant → Evidence → Decision`.

## D-020 — Execute milestones in canonical order

**Status:** DECISION, UPDATED BY D-021 AND D-022

`docs/startup/EXECUTION_PLAN.md` is the canonical implementation sequence.

M1 and M2 are complete. Current active milestone is M3.

## D-021 — M1 complete; carry a conservative seven-rule design shortlist into M2/M3

**Status:** DECISION

M1 shortlist:

- `TP-CX-001 PAYMENT_TOTAL_PROJECTS_AUTHORIZED_CHECKOUT`
- `TP-CX-002 PAYMENT_CURRENCY_PROJECTS_AUTHORIZED_CHECKOUT`
- `TP-CX-003 PAYMENT_PROJECTION_REFERENCES_EXACT_AUTHORIZED_STATE`
- `TP-EV-001 EXECUTED_PAYMENT_MATCHES_APPROVED_MANDATE`
- `TP-LC-001 COMMITTED_ORDER_BINDS_ORIGINATING_CHECKOUT`
- `TP-LC-002 INVALIDATED_OR_CANCELED_STATE_NOT_COMMITTED`
- `TP-EV-002 COMPOSED_EVIDENCE_CHAIN_CLOSED`

Only TP-CX-001 and TP-CX-002 are immediate artifact-only blocking candidates. M3 must still freeze exact production semantics/versions/fixtures before they become production rules.

## D-022 — M2 canonical transaction model is frozen

**Status:** DECISION

M2 is complete and the canonical core model is now frozen for M3 implementation design.

Core primitives:

- `ProtocolObject`
- `BindingEdge`
- `InvariantDefinition`
- `EvidenceItem`
- `EvaluationResult`
- `Decision`
- `TransactionGraph`

Architectural rules:

1. A composed transaction is represented as an evidence-backed object graph, not a universal economic transaction ID.
2. Raw source artifacts/provenance are preserved; canonical values are derived overlays.
3. Protocol/provider versions and effective evaluation time are explicit.
4. Binding confidence is explicit (`DETERMINISTIC`, `DECLARED`, `DERIVED`, `AMBIGUOUS`).
5. Unsupported or ambiguous mappings produce `UNKNOWN`; TimeProofs never guesses a deterministic relation.
6. External provider evidence is structurally distinct from protocol-native evidence.
7. Core contains no UCP/AP2-specific business fields; packs own protocol semantics.
8. Overall default decision ordering is `BLOCK > UNKNOWN > WARN > PASS` so incomplete evidence cannot be hidden by passing sibling checks.
9. LLM-generated explanations may summarize structured results but cannot determine or upgrade PASS/BLOCK.
10. M3 may define UCP/AP2 pack semantics but MUST NOT modify the M2 core model unless a structural defect is explicitly documented and M2 is reopened through this Decision Log.

Canonical artifacts:

- `docs/product/CANONICAL_MODEL.md`
- `docs/product/BINDING_MODEL.md`
- `docs/product/EVIDENCE_MODEL.md`
- `docs/product/DECISION_MODEL.md`
- `docs/product/M2_COMPLETION_REPORT.md`
- `schemas/timeproofs-core.schema.json`

---

Add new decisions sequentially. Never edit old decisions to make history look cleaner; mark superseded/refined decisions explicitly.
