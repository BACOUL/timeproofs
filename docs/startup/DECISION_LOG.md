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
**Status:** DECISION, REFINED BY D-013 AND D-037
Initial wedge: UCP ↔ AP2 composition. This is a wedge, not the permanent company boundary.

## D-005 — Strategic destination
**Status:** DECISION, REFINED BY D-037
Long-term product: **Cross-Protocol Consistency & Invariant Engine** with versioned invariant packs across protocols and business systems, evolving into a transaction-integrity layer spanning authorization, enforcement and outcome resolution.

## D-006 — Deterministic decisions
**Status:** DECISION
Core invariant enforcement does not depend on an LLM. Primary states: PASS, WARN, BLOCK, UNKNOWN.

## D-007 — Invariant Packs are the moat hypothesis
**Status:** HYPOTHESIS / STRATEGIC DIRECTION, EXPANDED BY D-037
The generic comparison engine is not defensible. The moat hypothesis is a versioned, verified corpus of mappings, invariants, canonicalization rules, evidence/resolver semantics, edge cases, fixtures and compatibility knowledge across protocol/provider/system boundaries.

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
Not frozen yet: final package name, final pricing, exact open-source boundary, evidence-bundle signing, exact first buyer segment, final website IA, dashboard need, external pack authoring, exact SLA/support model and final hosted/runtime topology beyond M8 local-first enforcement.

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
**Status:** DECISION, EXPANDED BY D-037
`TIMEPROOFS_PRODUCT_CONSTITUTION.md` is canonical for company category/constitution and `docs/product/PRODUCT_THESIS.md` is canonical for the product-level transaction-integrity thesis. Protocol research may refine adapters, mappings, evidence and pack contents but cannot silently redefine the company. Frozen product model: `ProtocolObject → Binding → Invariant → Evidence → Decision`.

## D-020 — Execute milestones in canonical order
**Status:** DECISION, UPDATED THROUGH D-038
`docs/startup/EXECUTION_PLAN.md` is the canonical implementation sequence. M0–M7, M2.1, the pre-M8 World-Class Gate and the company-completeness audit are complete. M8 local-first runtime enforcement is the active milestone.

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

TP-EV-001, TP-LC-001, TP-LC-002 and TP-EV-002 remain modeled but are not oversold as artifact-only blocking rules. Unsupported FX, tips, incremental authorization, partial capture, split settlement and marketplace payout return UNKNOWN until explicit profiles exist.

## D-024 — M2.1 foundation hardening is part of the frozen core
**Status:** DECISION
Required core properties include:
- non-empty required evaluation envelope;
- `core_schema_version` and `evaluation_id`;
- explicit pack and adapter versions;
- exact artifact snapshot identity/digest with explicit digest scope;
- structured `UNKNOWN` reasons while preserving PASS/WARN/BLOCK/UNKNOWN as the only primary verdicts.

## D-025 — AgentReady is explicitly legacy on the relaunch branch
**Status:** DECISION
AgentReady-era code/site/docs remain temporarily for safe migration, but they are non-canonical for the relaunch. Current product truth comes from the TimeProofs constitution/current-state/execution/decision documents. Legacy surfaces are inventoried in `docs/legacy/AGENTREADY_INVENTORY.md`.

## D-026 — M4 fixture corpus is the executable regression contract
**Status:** DECISION
M4 is complete. The first source-of-truth corpus lives in `fixtures/ucp-ap2/v0.1/` and freezes expected PASS/BLOCK/UNKNOWN behavior before engine implementation.

## D-027 — M5 deterministic core is complete only with green executable regression
**Status:** DECISION
M5 is complete after executable validation, not code presence alone.

Verified successful run:
- workflow: `TimeProofs Core Regression`
- run id: `31543423839`
- head commit: `28d1eaeae88628749c323e2b1d3c29be78e0e05f`
- conclusion: `success`.

## D-028 — M6 production ingestion supports only explicit real profiles and explicit binding evidence
**Status:** DECISION
Initial production support is deliberately pinned to:
- UCP Checkout protocol version `2026-04-08`, capability `dev.ucp.shopping.checkout`;
- AP2 PaymentMandate VCT `mandate.payment.1`.

Production TP-CX-003 does not treat a present `transaction_id` as proof. For the supported SHA-256 profile, the SDK requires the exact checkout proof/JWT, computes its base64url SHA-256 hash and compares it with AP2 `transaction_id`. Missing binding evidence yields UNKNOWN/INTEGRITY_UNVERIFIED; mismatch yields BLOCK.

M6 does not claim SD-JWT signature/key-binding validation, merchant JWS verification, arbitrary AP2 hash algorithms, remote UCP schema composition or external payment execution proof.

## D-029 — M7 customer-facing contract is complete only with PASS/BLOCK/UNKNOWN integration proof
**Status:** DECISION
M7 is COMPLETE.

The public/local semantics are frozen through a customer-facing GitHub Action, versioned result contract, redacted CI-safe result and stable exit behavior.

Verified customer Action run `31591960176`: success.

## D-030 — Customer CI artifacts are safe projections, not full local evidence graphs
**Status:** DECISION
The local SDK/core may retain rich provenance and raw artifacts for local processing, but the normal customer GitHub Action result MUST NOT export raw checkout proof/JWT, payment instrument, merchant authorization or raw protocol objects.

CI-safe output uses an explicit projection/allowlist rather than generic recursive redaction.

## D-031 — Public TimeProofs package is built by allowlist and tested in a clean consumer environment
**Status:** DECISION
The mixed historical repository is not itself the publishable package boundary.

The TimeProofs package is assembled from an explicit allowlist under `packaging/timeproofs/`, preventing accidental AgentReady inclusion. A clean-room pack/install/SDK/CLI test is required.

Verified package run `31592422020`: success.

## D-032 — Supported upstream schemas are locked and watched; upstream change is not automatic compatibility
**Status:** DECISION
Current audited schema snapshots are recorded in `protocols/upstream-lock.json` and monitored by the upstream watch workflow.

A changed upstream schema triggers compatibility review and regression work. It does not silently expand supported profiles.

## D-033 — World-Class Gate separates pre-M8 readiness from release-time provenance
**Status:** DECISION
Release controls that can only be proven against a real published artifact are not falsely marked complete during pre-release development. npm OIDC/provenance, exact-release SBOM/attestation, immutable release verification and registry-install proof become mandatory when cutting the first new TimeProofs release.

## D-034 — Generated property testing and measured performance guard are part of pre-M8 quality
**Status:** DECISION
`run-property-regression.mjs` exercises 250 generated transaction families per run and checks projection equality, amount/currency/binding perturbations, absent-proof UNKNOWN behavior and fixed-input determinism. Verified full run `31618680408`: success.

The 1,000-line-item benchmark measured p95 6.004 ms. A 100 ms p95 regression ceiling is enforced as an algorithmic guard, not a user-facing SLA. Threshold run `31618899028`: success.

The CLI malformed/unsupported/BLOCK/UNKNOWN contract is also executable across the full suite. Run `31619326027`: success.

## D-035 — Market audit says continue, but the moat must move beyond narrow UCP/AP2 checks
**Status:** DECISION / STRATEGIC DIRECTION
The 2026 market audit finds sufficient evidence to continue TimeProofs, but narrow amount/currency checks have high standards-absorption risk and are not a durable moat.

Priority strategic expansion:
1. approved PaymentMandate ↔ executed PSP/network outcome;
2. checkout/payment ↔ committed order lifecycle;
3. cumulative mandate constraints ↔ prior fulfilment state;
4. cancellation/refund ↔ order/payment/provider state.

The moat target is maintained cross-protocol/provider evidence and invariant knowledge, not generic verification logic. Current willingness-to-pay evidence remains the primary business risk.

Canonical audit: `docs/research/MARKET_STRATEGIC_AUDIT_2026-08-12.md`.

## D-036 — Pre-M8 gate is GREEN; M8 is local-first decision enforcement, not transaction execution
**Status:** DECISION
The pre-M8 World-Class Readiness Gate is complete. M8 may begin.

M8 design is frozen before implementation in `docs/product/M8_RUNTIME_ENFORCEMENT_DESIGN.md`.

Default financially consequential policy:
- PASS → ALLOW;
- WARN → ALLOW with evidence;
- BLOCK → DENY;
- UNKNOWN → DENY;
- internal/runtime error → ERROR and never silent ALLOW.

Any fail-open override must be explicit and audit-visible.

TimeProofs M8 returns an enforcement decision but MUST NOT execute or custody the caller's payment/external side effect. This preserves a narrow trust/liability boundary and avoids unsupported exactly-once claims.

M8 remains local-first with pinned versions, no `latest` semantics, no silent remote pack mutation and no mandatory TimeProofs cloud dependency.

Public AgentReady cleanup is reclassified as pre-M9/public-relaunch work; real-release provenance controls remain release-time gates.

## D-037 — Canonical product thesis is VERIFY → ENFORCE → RESOLVE across authorized vs executed reality
**Status:** DECISION / CONSTITUTION-LEVEL PRODUCT DIRECTION
Canonical product thesis is frozen in `docs/product/PRODUCT_THESIS.md`:

> **TimeProofs is the transaction integrity layer between what autonomous agents were authorized to do and what external systems actually executed.**

TimeProofs must not be redefined as a UCP/AP2 validator simply because UCP↔AP2 is the first pack.

The strategic primitives are:
- VERIFY — Is it valid?
- ENFORCE — Can it run?
- RESOLVE — Did it happen?

VERIFY, ENFORCE and RESOLVE share the same transaction graph, provenance, bindings, invariants and evidence model; they are intended as one infrastructure, not unrelated products.

The priority long-term boundary is `AUTHORIZED REALITY ↔ EXECUTED REALITY`, including PaymentMandate↔PSP/network execution, payment↔order, refund↔settlement and agent action↔authoritative business-system state.

Outcome-resolution rule:

> **Never retry an unknown side effect. Resolve it first.**

A mature resolver should distinguish COMMITTED, NOT_COMMITTED and UNKNOWN from authoritative evidence. TimeProofs must not infer an outcome without evidence.

The moat hypothesis expands from Invariant Packs alone to accumulated invariant + evidence + resolver semantics and compatibility history across independent systems.

The thesis has explicit kill conditions: rethink it if cross-system inconsistency is not economically meaningful, individual protocol/provider owners absorb the whole relevant boundary, integration economics prevent accumulation, or willingness-to-pay remains absent despite meaningful transaction volume.

## D-038 — Business architecture is canonical; commercial proof remains a separate gate
**Status:** DECISION / COMPANY OPERATING MODEL
Canonical company design is now maintained in `docs/startup/BUSINESS_ARCHITECTURE.md` and audited in `docs/startup/COMPANY_COMPLETENESS_AUDIT.md`.

TimeProofs should monetize transaction integrity rather than seats/reports. Preferred long-term economic architecture is:
- free/local developer adoption where it improves distribution/trust;
- usage-based production VERIFY/ENFORCE on consequential protected transactions/actions;
- potentially higher-value RESOLVE operations for provider-specific authoritative outcome checks;
- managed/private packs, evidence/history, governance, connectors and SLA as enterprise expansion.

Candidate usage pricing (including the current €0.005–€0.03 modeling envelope) is a HYPOTHESIS, not a market fact. Revenue scenarios are arithmetic, not forecasts.

The largest company risk remains willingness-to-pay and economic-buyer proof. Other material open gaps include provider-execution evidence, exact open-source/commercial split, paid-production liability posture, distribution proof, Resolve unit economics and first meaningful PSP/platform partnership.

Technical readiness must never be used as a substitute for market or revenue proof. Significant M10/cloud spend is gated on meaningful commercial evidence.

This company audit does not interrupt or pivot M8. M8 resumes from its active enforcement implementation state.

---
Add new decisions sequentially. Never rewrite history to make it look cleaner; supersede/refine decisions explicitly.