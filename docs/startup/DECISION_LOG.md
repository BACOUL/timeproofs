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
**Status:** DECISION, REFINED BY D-039
Developer-led/self-serve distribution is preferred: GitHub, package registries, docs, fixtures, CI, protocol communities and integrations. Enterprise sales may expand value but must not be the only viable acquisition mechanism.

## D-012 — Current unresolved decisions
**Status:** OPEN
Not frozen yet: final package name, final published pricing, exact open-source boundary, evidence-bundle signing, exact first buyer segment, final website IA, dashboard need, external pack authoring, exact SLA/support model and final hosted/runtime topology beyond M8 local-first enforcement.

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
**Status:** DECISION, UPDATED THROUGH D-040
`docs/startup/EXECUTION_PLAN.md` is the canonical implementation sequence. M0–M7, M2.1, the pre-M8 World-Class Gate and the company-completeness/anti-omission design work are complete. M8 local-first runtime enforcement is the active milestone.

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
The first executable artifact profile is TP-CX-003 exact-authorized-state prerequisite, TP-CX-002 currency projection and TP-CX-001 authoritative grand-total projection. Unsupported FX, tips, incremental authorization, partial capture, split settlement and marketplace payout return UNKNOWN until explicit profiles exist.

## D-024 — M2.1 foundation hardening is part of the frozen core
**Status:** DECISION
Required core properties include non-empty evaluation envelope, core/evaluation identity, explicit pack/adapter versions, exact artifact snapshot identity/digest and structured UNKNOWN reasons.

## D-025 — AgentReady is explicitly legacy on the relaunch branch
**Status:** DECISION
AgentReady-era code/site/docs remain temporarily for safe migration, but they are non-canonical for the relaunch. Legacy surfaces are inventoried in `docs/legacy/AGENTREADY_INVENTORY.md`.

## D-026 — M4 fixture corpus is the executable regression contract
**Status:** DECISION
M4 is complete. Source-of-truth corpus: `fixtures/ucp-ap2/v0.1/`.

## D-027 — M5 deterministic core is complete only with green executable regression
**Status:** DECISION
Verified successful run `31543423839`, head `28d1eaeae88628749c323e2b1d3c29be78e0e05f`.

## D-028 — M6 production ingestion supports only explicit real profiles and explicit binding evidence
**Status:** DECISION
Initial production support is pinned to UCP Checkout `2026-04-08` and AP2 PaymentMandate `mandate.payment.1`. Production TP-CX-003 requires explicit checkout proof/JWT hash evidence. M6 does not claim full SD-JWT/JWS/key verification or external execution proof.

## D-029 — M7 customer-facing contract is complete only with PASS/BLOCK/UNKNOWN integration proof
**Status:** DECISION
M7 is COMPLETE. Verified customer Action run `31591960176`: success.

## D-030 — Customer CI artifacts are safe projections, not full local evidence graphs
**Status:** DECISION
Normal customer CI output MUST NOT export raw checkout proof/JWT, payment instrument, merchant authorization or raw protocol objects.

## D-031 — Public TimeProofs package is built by allowlist and tested in a clean consumer environment
**Status:** DECISION
The mixed historical repository is not itself the publishable package boundary. Verified package run `31592422020`: success.

## D-032 — Supported upstream schemas are locked and watched; upstream change is not automatic compatibility
**Status:** DECISION
A changed upstream schema triggers compatibility review and regression work; it does not silently expand supported profiles.

## D-033 — World-Class Gate separates pre-M8 readiness from release-time provenance
**Status:** DECISION
npm OIDC/provenance, exact-release SBOM/attestation, immutable release verification and registry-install proof become mandatory when cutting the first new TimeProofs release.

## D-034 — Generated property testing and measured performance guard are part of pre-M8 quality
**Status:** DECISION
Property run `31618680408`: success. 1,000-line-item p95 baseline 6.004 ms; provisional 100 ms regression ceiling. Threshold run `31618899028`: success. CLI/error matrix run `31619326027`: success.

## D-035 — Market audit says continue, but the moat must move beyond narrow UCP/AP2 checks
**Status:** DECISION / STRATEGIC DIRECTION
Priority expansion: approved PaymentMandate ↔ executed PSP/network outcome, then order lifecycle, cumulative constraints and refund/cancellation consistency. Current willingness-to-pay evidence remains the primary business risk.

## D-036 — Pre-M8 gate is GREEN; M8 is local-first decision enforcement, not transaction execution
**Status:** DECISION
Default financial policy: PASS→ALLOW, WARN→ALLOW with evidence, BLOCK→DENY, UNKNOWN→DENY, internal/runtime error→ERROR. Fail-open must be explicit/audit-visible. TimeProofs does not execute/custody the caller's external side effect.

## D-037 — Canonical product thesis is VERIFY → ENFORCE → RESOLVE across authorized vs executed reality
**Status:** DECISION / CONSTITUTION-LEVEL PRODUCT DIRECTION
Canonical product thesis: **TimeProofs is the transaction integrity layer between what autonomous agents were authorized to do and what external systems actually executed.**

Strategic primitives: VERIFY — Is it valid? ENFORCE — Can it run? RESOLVE — Did it happen?

Outcome-resolution rule: **Never retry an unknown side effect. Resolve it first.**

The moat hypothesis expands to accumulated invariant + evidence + resolver semantics and compatibility history across independent systems.

## D-038 — Business architecture is canonical; commercial proof remains a separate gate
**Status:** DECISION / COMPANY OPERATING MODEL
Canonical company design is maintained in `docs/startup/BUSINESS_ARCHITECTURE.md` and audited in `docs/startup/COMPANY_COMPLETENESS_AUDIT.md`.

TimeProofs should monetize transaction integrity rather than seats/reports. Technical readiness must never substitute for market or revenue proof. Significant M10/cloud spend is gated on meaningful commercial evidence.

## D-039 — Commercial baseline v0.1 is usage-led and distribution is code-first
**Status:** OPERATING BASELINE / HYPOTHESIS TO VALIDATE
Until superseded by market evidence:
- Community/local developer adoption: €0;
- Production: €99/month, modeling 10,000 protected VERIFY/ENFORCE transactions included, then approximately €0.01/protected transaction;
- RESOLVE: approximately €0.03–€0.10 per provider-specific resolution modeling envelope;
- Business: €499/month + usage baseline;
- Enterprise: €15k–€25k annual minimum + usage baseline.

Primary distribution: GitHub → npm → problem-led docs → CI/GitHub Action → protocol communities → PSP/platform/runtime integrations → B2B2Developer partnerships.

## D-040 — Company anti-omission register and lifecycle operating architecture are mandatory
**Status:** DECISION / COMPANY GOVERNANCE
TimeProofs now maintains `docs/startup/COMPANY_GAP_REGISTER.md` as a permanent anti-omission register. Company/product requirements may not disappear because a milestone or chat changes.

The following canonical operating documents define the current design baseline:
- `METERING_BILLING_ARCHITECTURE.md` — immutable billable-event identity, retry/dedupe, correction ledger, spend safety and charge semantics;
- `PACK_GOVERNANCE_AND_COMPATIBILITY.md` — EXPERIMENTAL/CANDIDATE/STABLE/DEPRECATED/RETIRED lifecycle, immutable versions/digests, rollback and third-party trust boundary;
- `INCIDENT_OBSERVABILITY_CONTINUITY.md` — severity model, false-block emergency, operational metrics and solo-founder recovery;
- `PRIVACY_TRUST_ENTERPRISE_BOUNDARY.md` — privacy lifecycle, trust package, abuse model, enterprise procurement and liability baseline;
- `PARTNERS_IP_MOAT_LOOP.md` — partner value, IP/licensing gate and privacy-safe moat telemetry loop;
- `M9_WEBSITE_DOCS_VISION.md` — world-class public developer experience principles.

Each item is assigned to a named lifecycle gate: NOW/M8/M9/PAID/ENTERPRISE/M10-SCALE/RELEASE. Design closure is not implementation proof: billing, contracts, hosted privacy controls, enterprise features and release attestations are implemented only when their named lifecycle gate becomes active.

A future contributor may close a gap only by implementation/evidence, explicit decision, named deferral, or deliberate unsupported/out-of-scope status. Silent omission is prohibited.

---
Add new decisions sequentially. Never rewrite history to make it look cleaner; supersede/refine decisions explicitly.