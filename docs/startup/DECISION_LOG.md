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

---

Add new decisions sequentially. Never edit old decisions to make history look cleaner; mark superseded/refined decisions explicitly.