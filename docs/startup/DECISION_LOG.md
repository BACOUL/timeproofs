# TimeProofs — Decision Log

This file records material product/company decisions so future contributors and AI assistants can distinguish settled choices from open hypotheses.

## D-001 — Keep TimeProofs as the company/product brand

**Status:** DECISION

TimeProofs remains the primary brand. `AgentReady` is not the relaunch category or primary product name.

Reason: TimeProofs is broad enough to support evidence, temporal validity, cross-object consistency and protocol composition without locking the company to the old readiness-scanner product.

## D-002 — Reuse the existing repository

**Status:** DECISION

Repository: `BACOUL/timeproofs`.

Relaunch work happens on `relaunch/invariant-engine` until ready.

Existing AgentReady assets may be reused selectively, but old architecture/product assumptions are not constraints.

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

LLMs may assist research, mapping, authoring or explanation, but deterministic rules/evidence own core enforcement.

## D-007 — Invariant Packs are the moat hypothesis

**Status:** HYPOTHESIS / STRATEGIC DIRECTION

The generic comparison engine is not expected to be defensible.

The moat hypothesis is a versioned, verified corpus of mappings, invariants, canonicalization rules, edge cases, fixtures and compatibility knowledge across protocol/provider pairs.

This hypothesis must be continuously tested against standardization and competitors.

## D-008 — Do not become a scanner/dashboard business

**Status:** DECISION

TimeProofs must not repeat the previous scanner/score/report pattern as its core business.

Observation and CI are acceptable adoption modes; inline enforcement is the strategic destination.

## D-009 — Global product-quality standard

**Status:** DECISION

Product, website, docs, API/SDK, pricing, onboarding, UX and operations must be benchmarked against category-leading global infrastructure companies before major decisions.

Do not use generic SaaS or generic AI-generated product patterns by default.

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
- exact first blocking invariant set
- exact first buyer segment
- final website information architecture
- whether a product dashboard is needed at all in V1
- whether external pack authors are ever supported

These require evidence before becoming decisions.

## D-013 — Do not duplicate UCP/AP2 conformance as the company wedge

**Status:** DECISION

The first normative audit confirmed that current UCP AP2 Mandates already owns several local guarantees: merchant authorization/signature, checkout mandate presence/signature, mandate expiry, basic checkout-scope binding, and AP2 security-lock/downgrade prevention.

TimeProofs may test these for compatibility or defense-in-depth, but MUST NOT present them as the strategic cross-protocol gap.

The UCP↔AP2 wedge is therefore refined to **cross-object consistency and evidence closure around the composed transaction**, especially payment projection, execution binding, receipt closure, lifecycle propagation and downstream business-result preservation.

See `docs/research/UCP_AP2_GAP_MATRIX.md`.

## D-014 — Blocking invariants require normative evidence and ambiguity fixtures

**Status:** DECISION

No invariant may become a BLOCK rule until it has exact protocol/version scope, source fields/derivation, normative references, allowed transformations, canonicalization semantics, PASS/BLOCK/UNKNOWN/version-unsupported fixtures, and a known enforcement point.

If semantics are uncertain, classify the candidate as RESEARCH rather than guessing.

## D-015 — Treat AP2 cryptographic checkout binding as existing infrastructure

**Status:** DECISION

Current AP2 v0.2 closed PaymentMandates contain a `transaction_id` derived from the exact signed checkout JWT. TimeProofs MUST NOT claim that AP2 lacks checkout↔PaymentMandate identity binding.

The remaining opportunity is semantic projection consistency across already-bound objects: for example, whether `payment_amount` is a valid projection of the merchant-authorized checkout.

## D-016 — UCP authoritative grand total drives the first payment projection rule

**Status:** DECISION

The first amount invariant must compare AP2 `payment_amount.amount` with the authoritative UCP checkout `totals[type=total].amount`, after currency validation.

TimeProofs MUST NOT reconstruct the payable amount by summing only known subtotal/tax/shipping/discount components because UCP supports extensible totals and treats the grand-total entry as authoritative.

## D-017 — AP2 PaymentReceipt is not proof of executed amount by itself

**Status:** DECISION

Current AP2 PaymentReceipt binds to a closed PaymentMandate through `reference` and exposes payment/PSP/network identifiers, but does not contain executed amount or currency.

Therefore a future `EXECUTED_PAYMENT_MATCHES_APPROVED_MANDATE` invariant requires provider/network evidence in addition to AP2 receipt evidence. TimeProofs must return UNKNOWN when the required execution evidence is unavailable rather than infer success from the receipt alone.

## D-018 — Order consistency is temporal, not strict final-state equality

**Status:** DECISION

UCP Orders can legitimately evolve after placement through edits, exchanges, fulfillment events and monetary adjustments. TimeProofs MUST NOT enforce `current order == original checkout` as a generic invariant.

Order invariants must be lifecycle-aware. Initial order creation may be compared against authorized checkout state, while later divergence must be evaluated against valid events/adjustments and evaluation time.

See `docs/research/M1_1_PAYMENT_ORDER_AUDIT.md`.

---

Add new decisions sequentially. Never edit old decisions to make history look cleaner; mark superseded/refined decisions explicitly.