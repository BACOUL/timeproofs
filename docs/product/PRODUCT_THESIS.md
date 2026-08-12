# TimeProofs — Product Thesis

Status: CANONICAL / CONSTITUTION-LEVEL PRODUCT THESIS
Date: 2026-08-12

> **TimeProofs is the transaction integrity layer between what autonomous agents were authorized to do and what external systems actually executed.**

This document freezes the strategic product thesis at a level above any individual protocol pack, adapter or milestone. Protocol details may evolve. The company thesis must not silently collapse into a narrow validator.

## The core problem

Autonomous-agent transactions cross multiple independently-owned systems and protocols:

`intent → agent → protocol → mandate → payment/provider → order → settlement/refund`

Each local object or step can be valid while the composed real-world transaction is globally inconsistent.

The strategic problem is therefore not merely schema validation or protocol conformance. It is **cross-boundary transaction integrity**.

TimeProofs exists to answer, with explicit evidence and deterministic semantics:

1. **VERIFY — Is it valid?**
2. **ENFORCE — Can it run?**
3. **RESOLVE — Did it actually happen?**

These three primitives are intended to converge into one transaction-integrity infrastructure.

## Product model

The frozen core model remains:

`ProtocolObject → Binding → Invariant → Evidence → Decision`

Primary verification decisions remain:

`PASS / WARN / BLOCK / UNKNOWN`

Runtime enforcement may map those decisions into:

`ALLOW / DENY / ERROR`

Outcome resolution may later map externally observed execution into states such as:

`COMMITTED / NOT_COMMITTED / UNKNOWN`

Missing evidence must never be silently converted into success.

## What TimeProofs is not

TimeProofs is not primarily:

- a UCP validator;
- an AP2 validator;
- an amount/currency checker;
- a generic scanner, score or dashboard;
- a generic MCP/A2A gateway;
- a replacement payment processor;
- a new universal transaction protocol;
- a claim of exactly-once execution without authoritative evidence.

The UCP↔AP2 pack is the beachhead, not the company boundary.

## The strategic boundary

The most important long-term boundary is:

`AUTHORIZED REALITY ↔ EXECUTED REALITY`

Examples:

- approved AP2 PaymentMandate ↔ PSP/network execution;
- checkout/payment authorization ↔ committed order;
- cumulative mandate constraints ↔ prior fulfilments;
- cancellation/refund authorization ↔ provider/order state;
- later: agent tool action ↔ authoritative business-system state.

This boundary is attractive because it crosses protocol owners, providers and systems of record. A single protocol owner cannot necessarily own the entire consistency matrix.

## The moat hypothesis

The generic engine is not the moat.

The moat is the accumulated, versioned corpus of:

- cross-protocol mappings;
- provider-specific evidence semantics;
- invariant definitions;
- allowed transformations;
- lifecycle rules;
- resolvers and authoritative-state lookup semantics;
- edge cases;
- regression fixtures;
- compatibility history;
- operational outcome knowledge.

Illustrative expansion matrix:

`UCP ↔ AP2`
`AP2 ↔ Stripe`
`AP2 ↔ Adyen`
`AP2 ↔ PayPal`
`Payment ↔ Order`
`Order ↔ Refund`
`Refund ↔ Settlement`
`Agent action ↔ business system state`

The company becomes stronger only if this knowledge accumulates faster than equivalent guarantees are absorbed into individual standards or providers.

## VERIFY

VERIFY determines whether available artifacts and evidence satisfy the relevant cross-boundary invariants.

Question:

> **Is the composed transaction consistent with what was authorized?**

VERIFY is deterministic and evidence-driven. It preserves UNKNOWN when proof is missing or ambiguous.

## ENFORCE

ENFORCE places the TimeProofs decision before an irreversible action.

Question:

> **May this transaction proceed now?**

For financially consequential flows, the default policy is fail-closed:

- PASS → ALLOW
- WARN → ALLOW with evidence
- BLOCK → DENY
- UNKNOWN → DENY
- runtime/internal error → ERROR, never silent ALLOW

TimeProofs returns the decision. The caller owns and executes the external side effect.

## RESOLVE

RESOLVE is the strategic next primitive after pre-commit verification and enforcement.

Question:

> **Did the external side effect actually happen?**

This matters after ambiguous outcomes such as timeout, process crash, lost response or agent retry/replan.

The governing rule is:

> **Never retry an unknown side effect. Resolve it first.**

A mature resolver should use authoritative provider/system state to determine whether the effect is:

- COMMITTED;
- NOT_COMMITTED;
- UNKNOWN.

Only a proven NOT_COMMITTED state should automatically authorize a retry where the operation semantics permit it.

TimeProofs must not pretend to resolve an outcome when the authoritative evidence does not exist.

## Why VERIFY, ENFORCE and RESOLVE belong together

The three primitives share the same transaction graph, provenance, bindings, invariant packs and evidence model.

A typical future flow is:

`authorized state → VERIFY → ENFORCE → caller executes → provider evidence → RESOLVE → reconcile`

This creates a coherent infrastructure layer rather than three unrelated products.

## Standards absorption rule

TimeProofs must assume that local protocol checks will improve over time.

If UCP, AP2, MCP, A2A or a provider standardizes a local guarantee, TimeProofs should consume that guarantee rather than compete with it.

The company remains valuable by owning cross-system composition, evidence and resolution semantics that are not fully controlled by one protocol owner.

Therefore:

> **Never build the company around a gap that disappears when one protocol adds one field or one signature check.**

## Product expansion rule

New packs/integrations should be prioritized when they improve at least one of:

1. irreversible-action safety;
2. authorized-vs-executed reconciliation;
3. evidence closure across independent systems;
4. outcome resolution after ambiguity;
5. cumulative transaction knowledge that becomes harder to reproduce with time.

Do not expand merely to claim more protocol logos.

## Commercial thesis

The ultimate buyer value is not “validation”. It is reducing the probability and operational cost of incorrect autonomous execution.

Potential economic harms include:

- over/under-charging;
- unauthorized payment execution;
- payment/order divergence;
- duplicated side effects after ambiguous outcomes;
- stale authorization use;
- refund/order/settlement inconsistency;
- costly manual reconciliation and incident investigation.

The business thesis remains unproven until real buyers demonstrate urgency and willingness to pay. Technical quality must not be confused with product-market fit.

## Distribution thesis

The initial distribution should remain developer-led and local-first where possible:

- SDK;
- CLI;
- CI/GitHub Action;
- protocol/provider examples;
- invariant/evidence packs;
- later managed enforcement/evidence services only where operational value justifies them.

Time-to-first-value should remain low and adoption should not require all ecosystem participants to adopt a new protocol.

## Strategic kill conditions

The thesis should be reconsidered if evidence shows that, at meaningful scale:

- cross-system inconsistencies are not economically important;
- protocol/provider owners fully absorb the relevant cross-boundary guarantees;
- buyers consistently prefer trivial in-house checks and no accumulating integration/evidence advantage emerges;
- TimeProofs requires bilateral ecosystem adoption before it creates value;
- resolver/invariant integration economics are too expensive for the business model;
- no credible buyer exhibits willingness to pay despite real agentic transaction volume.

Do not protect the thesis from contrary evidence.

## Non-negotiable interpretation

A future contributor or AI assistant must not redefine TimeProofs as “UCP/AP2 validation” merely because that is the first executable pack.

The canonical company direction is:

> **Transaction integrity for autonomous agents across authorization, execution and outcome.**

Short form:

> **VERIFY. ENFORCE. RESOLVE.**

Questions:

> **Is it valid? Can it run? Did it happen?**

This thesis may only be materially changed through an explicit decision recorded in `docs/startup/DECISION_LOG.md`.