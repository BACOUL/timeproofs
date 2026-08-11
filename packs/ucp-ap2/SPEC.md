# TimeProofs UCP ↔ AP2 Invariant Pack

Pack: `ucp-ap2`
Version: `0.1.0-spec`
Milestone: M3
Status: FROZEN SPECIFICATION — implementation not started

## Purpose

This is the first TimeProofs Invariant Pack. It verifies cross-object consistency across an authorized UCP checkout state and AP2 payment artifacts without duplicating protocol-local signature/conformance guarantees as TimeProofs' product moat.

The pack operates on the M2 canonical graph model. Protocol-specific extraction belongs to adapters; the TimeProofs core remains protocol-agnostic.

## Pack modes

### `artifact`
Inputs are supplied protocol artifacts only. No external provider/network query is assumed.

Production blocking scope in v0.1 is deliberately narrow:
- TP-CX-001
- TP-CX-002

### `evidence`
May include external PSP/network evidence. Rules requiring such evidence return UNKNOWN when it is unavailable.

### `lifecycle`
May include UCP Order/current-state artifacts and evaluation time. Lifecycle rules are not naive equality rules.

## Compatibility policy

The implementation MUST pin exact UCP/AP2 schema/spec revisions after adapters are built. `latest` is forbidden in reproducible evaluation metadata.

Until exact adapter version identifiers are frozen, unsupported/unrecognized versions MUST produce UNKNOWN/UNSUPPORTED rather than PASS.

## Canonical inputs

The pack expects adapters to expose canonical values with raw provenance. At minimum:

- authorized checkout grand total money value;
- checkout currency;
- exact authorized checkout artifact identity/hash material needed by the applicable AP2 binding semantics;
- AP2 approved payment amount money value;
- AP2 transaction/binding reference;
- optional AP2 receipt reference/status;
- optional provider execution evidence;
- optional UCP Order checkout binding/lifecycle state.

No invariant may read protocol-specific raw paths directly from the generic core evaluator.

---

## TP-CX-001 — PAYMENT_TOTAL_PROJECTS_AUTHORIZED_CHECKOUT

Class: CROSS_OBJECT
v0.1 policy: BLOCK-capable in artifact mode

### Meaning
The AP2 approved payment amount must project the authoritative payable amount of the exact UCP checkout state that the mandate references.

### Required inputs
- exact referenced UCP checkout artifact;
- canonical UCP authoritative grand total;
- AP2 approved `payment_amount.amount`;
- currency comparison must be evaluable;
- supported adapter/pack versions.

### Predicate
For same-currency flows with no pack-authorized transformation:

`ap2.payment.amount_minor == ucp.checkout.grand_total.amount_minor`

### Outcomes
- PASS: values equal and evidence/version support complete.
- BLOCK: exact authorized state is established, same-currency comparison is supported, and amounts differ.
- UNKNOWN: required value/evidence is missing, mapping is ambiguous, FX or another unsupported transformation is present, or version support is unavailable.

### Forbidden implementation
Do not reconstruct the checkout grand total by summing a hard-coded list of subtotal/tax/shipping/discount fields. Use the authoritative UCP total extraction defined by the adapter/version profile.

---

## TP-CX-002 — PAYMENT_CURRENCY_PROJECTS_AUTHORIZED_CHECKOUT

Class: CROSS_OBJECT
v0.1 policy: BLOCK-capable in artifact mode

### Meaning
The approved payment currency must preserve the authorized UCP checkout currency unless an explicit future pack profile models an authorized currency transformation.

### Predicate
`ap2.payment.currency == ucp.checkout.currency`

### Outcomes
- PASS: currencies match and mappings are supported.
- BLOCK: exact authorized state is established and currencies differ with no authorized transformation profile.
- UNKNOWN: currency evidence is absent/ambiguous, version unsupported, or an FX/transformation flow is declared but not modeled.

---

## TP-CX-003 — PAYMENT_PROJECTION_REFERENCES_EXACT_AUTHORIZED_STATE

Class: CROSS_OBJECT / CONFORMANCE-ASSISTED
v0.1 policy: structural prerequisite; not marketed as a TimeProofs-owned cryptographic guarantee

### Meaning
TP-CX-001/002 must be evaluated against the exact checkout artifact represented by current AP2 binding semantics, not a later/reconstructed checkout sharing only a business ID.

### Outcomes
- PASS: exact source artifact relation is established using the applicable protocol-native binding semantics.
- BLOCK/CONFORMANCE: native binding verification proves mismatch when the selected profile defines this as deterministic.
- UNKNOWN: exact referenced source artifact is unavailable or semantics/version cannot be verified.

TimeProofs preserves and consumes the native binding; it does not claim to invent it.

---

## TP-EV-001 — EXECUTED_PAYMENT_MATCHES_APPROVED_MANDATE

Class: EVIDENCE
v0.1 policy: NON-BLOCKING unless an explicit provider evidence profile exists

### Meaning
Actual external payment execution should match approved amount, currency and destination semantics.

### Required evidence
Provider/network evidence containing the execution facts being asserted. AP2 PaymentReceipt alone is insufficient for amount/currency equality.

### Outcomes
- PASS: supported provider evidence proves execution matches mandate.
- BLOCK: a future provider profile has deterministic complete evidence and proves mismatch.
- UNKNOWN: provider evidence is absent, incomplete or unsupported. This is the default for artifact-only v0.1.

---

## TP-LC-001 — COMMITTED_ORDER_BINDS_ORIGINATING_CHECKOUT

Class: LIFECYCLE
v0.1 policy: evaluation/documentation candidate, not generic final-state equality

### Meaning
At initial placement, a resulting UCP Order should reconcile to its originating checkout using the applicable order/checkout binding and placement-time semantics.

Later legitimate edits, refunds, exchanges, fulfillment changes and adjustments MUST NOT be treated as automatic violations.

### Outcomes
- PASS/BLOCK only when evaluation time and supported lifecycle profile make the predicate deterministic.
- UNKNOWN otherwise.

---

## TP-LC-002 — INVALIDATED_OR_CANCELED_STATE_NOT_COMMITTED

Class: LIFECYCLE
v0.1 policy: research/evaluation candidate

### Meaning
A state known, with sufficiently fresh evidence, to be canceled/invalidated/superseded/outside its allowed execution window must not be treated as valid authority for a new irreversible commit.

Freshness and source-of-truth semantics are mandatory. Missing freshness evidence yields UNKNOWN.

---

## TP-EV-002 — COMPOSED_EVIDENCE_CHAIN_CLOSED

Class: EVIDENCE
v0.1 policy: product-level completeness result

### Meaning
For the selected evaluation mode, TimeProofs reports which required graph relations/evidence are proven, missing or ambiguous across the composed transaction.

This rule does not require every possible artifact. Required evidence is mode/profile-specific.

### Outcomes
- PASS: all evidence required by selected mode/profile is present and verified.
- UNKNOWN/INCOMPLETE: required evidence is missing or ambiguous.
- BLOCK only where a future explicit enforcement profile defines missing mandatory evidence as a policy violation; generic v0.1 does not guess this.

---

## Explicitly excluded from v0.1 blocking

- naive merchant display-name == payee legal-entity comparison;
- line-item equality against PaymentMandate when the object does not evidence full line items;
- PaymentReceipt amount/currency equality without provider evidence;
- current Order == original Checkout full equality;
- generic exactly-once/idempotence;
- FX, tips, incremental authorization, split settlement, marketplace payout, partial capture or other transformations without an explicit profile.

## Decision aggregation

The pack delegates aggregation to the M2 Decision Model. In production-enforcement semantics:

1. any valid BLOCK-capable invariant returning BLOCK may produce aggregate BLOCK;
2. missing required evidence for a claim produces UNKNOWN, never inferred PASS;
3. WARN does not silently become PASS;
4. conformance findings are labeled separately from TimeProofs CROSS_OBJECT findings;
5. evaluation records pack version, adapter versions, evaluation time and evidence references.

## v0.1 implementation target

The first executable pack should implement TP-CX-003 as the exact-state prerequisite plus TP-CX-001 and TP-CX-002 as deterministic cross-object checks. TP-EV-001, TP-LC-001, TP-LC-002 and TP-EV-002 remain represented in the pack contract so the architecture does not need redesign, but they must not be oversold before their evidence/lifecycle profiles exist.

## M3 freeze rule

M4 fixtures may expose an error in this specification. Any semantic change to a BLOCK-capable rule must update this SPEC, increment the pack spec revision, and record the decision. Implementation must not silently redefine an invariant.