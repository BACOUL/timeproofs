# TimeProofs — UCP ↔ AP2 Normative Gap Matrix

Status: M1 research, initial normative pass
Date: 2026-08-11
Purpose: identify only composition guarantees that remain valuable for TimeProofs after accounting for guarantees already provided by UCP/AP2.

## Rule

TimeProofs MUST NOT sell a check as a novel invariant when UCP or AP2 already normatively guarantees it. Such checks may exist as compatibility/conformance checks, but they are not the strategic moat.

Classification:
- GUARANTEED_UCP_AP2 — already normative; useful only for conformance/defense-in-depth.
- PARTIAL — protocol expresses intent or a local guarantee, but composition semantics/verifier responsibility are incomplete.
- IMPLEMENTATION_DEPENDENT — expected behavior depends on implementation or external system.
- CROSS_PROTOCOL_GAP — no single protocol can fully establish the end-to-end relation.
- RESEARCH — insufficient evidence; do not implement as a blocking invariant yet.

## Normative baseline confirmed

Current UCP AP2 Mandates extension already provides important guarantees:
- negotiated AP2 sessions are security locked;
- merchant authorization signs the checkout payload (excluding the `ap2` extension) using JCS canonicalization;
- a checkout mandate contains the full checkout including merchant authorization;
- completion without required mandate must fail;
- invalid mandate signature must fail;
- expired mandate must fail;
- mandate bound to another checkout must fail (`mandate_scope_mismatch`);
- invalid/missing merchant authorization has explicit failure codes.

Therefore TimeProofs MUST NOT position itself as merely checking signature presence, mandate expiry, or basic checkout-scope binding.

## Matrix

| ID | Relationship | Existing guarantee | Classification | TimeProofs role | Initial decision |
|---|---|---|---|---|---|
| TP-R-001 | AP2 negotiated → checkout response contains merchant authorization | UCP AP2 extension requires merchant authorization in protected flow | GUARANTEED_UCP_AP2 | Conformance only | Do not count as moat |
| TP-R-002 | Merchant authorization signature is valid | Explicit UCP verification/error semantics | GUARANTEED_UCP_AP2 | Optional defense-in-depth adapter | Not core invariant |
| TP-R-003 | Merchant authorization covers the exact checkout business payload | UCP defines detached JWS over JCS-canonicalized checkout excluding `ap2` | GUARANTEED_UCP_AP2 | Conformance/version compatibility | Not core invariant |
| TP-R-004 | Checkout mandate exists at complete | Required in negotiated AP2 flow | GUARANTEED_UCP_AP2 | Conformance | Not core invariant |
| TP-R-005 | Checkout mandate signature valid | Explicit verification/error semantics | GUARANTEED_UCP_AP2 | Conformance | Not core invariant |
| TP-R-006 | Checkout mandate not expired | Explicit `mandate_expired` | GUARANTEED_UCP_AP2 | Conformance | Not core invariant |
| TP-R-007 | Checkout mandate belongs to the current checkout | Explicit `mandate_scope_mismatch`; mandate contains full checkout | GUARANTEED_UCP_AP2 | Conformance | Not strategic gap |
| TP-R-008 | AP2 cannot silently downgrade to unprotected checkout after negotiation | Security Locked behavior | GUARANTEED_UCP_AP2 | Conformance | Not strategic gap |
| TP-R-009 | User-authorized checkout state equals merchant-authorized checkout state | Checkout mandate contains checkout + merchant authorization, providing strong local binding when correctly verified | GUARANTEED_UCP_AP2 / PARTIAL across implementations | Verify implementation/version behavior | Secondary |
| TP-R-010 | Cart/checkout chargeable amount equals PaymentMandate amount | AP2 design says payment is bound/projected from cart, but public issue #211 identifies insufficient normative equality set and reject-on-mismatch responsibility in human-present flow | CROSS_PROTOCOL_GAP / active standard gap | Deterministic amount projection invariant | CORE CANDIDATE |
| TP-R-011 | Currency in merchant-authorized checkout equals payment execution currency | Cryptographic checkout integrity alone does not establish downstream payment projection equality | PARTIAL | Cross-object equality invariant | CORE CANDIDATE |
| TP-R-012 | Merchant identity in checkout equals merchant/beneficiary represented in payment objects | Local signatures establish object authenticity, not necessarily legal/entity equivalence across payment rail objects | PARTIAL / IMPLEMENTATION_DEPENDENT | Canonical entity binding | CORE CANDIDATE, requires semantics research |
| TP-R-013 | Line-item economic projection is consistent with payment total | Checkout signs line items; downstream payment may carry aggregate amount. AP2 issue #211 asks for minimum payment subset/equality rules | PARTIAL | Projection verifier | CORE CANDIDATE |
| TP-R-014 | Quantity/price changes after authorization require renewed authorization | Signed checkout protects authorized state, but exact downstream mutation/reconfirmation obligations vary by flow/system | PARTIAL | Temporal/state transition invariant | CANDIDATE |
| TP-R-015 | Payment actually executed corresponds to the PaymentMandate the user approved | AP2 issue #211 notes incomplete closure between user-confirmed pair and executed payment in current sample/public rules | CROSS_PROTOCOL_GAP | Execution evidence binding | CORE CANDIDATE |
| TP-R-016 | Payment receipt corresponds to the executed payment and authorized checkout | Receipt is local payment evidence; full checkout→mandate→execution→receipt closure spans objects/systems | CROSS_PROTOCOL_GAP | Evidence-chain invariant | CORE CANDIDATE |
| TP-R-017 | Successful payment corresponds to a successfully created merchant order | Payment protocol success does not alone establish business order success | CROSS_PROTOCOL_GAP | Completion invariant | CORE CANDIDATE for later pack |
| TP-R-018 | Final order preserves authorized line items/quantity/price | Checkout authorization and final order are different lifecycle objects; requires cross-object comparison | CROSS_PROTOCOL_GAP / depends on UCP order semantics | Postcondition invariant | CORE CANDIDATE after order audit |
| TP-R-019 | Final order preserves non-price business constraints (fulfillment option, delivery promise, refundability, etc.) | Depends on negotiated capabilities/extensions and merchant order semantics | CROSS_PROTOCOL_GAP / RESEARCH | Business invariant preservation | STRATEGIC CANDIDATE, not V1 until fields are proven |
| TP-R-020 | Buyer identity consistency across checkout, mandate and payment credential | Multiple identity representations and privacy/selective disclosure complicate equality | RESEARCH | Identity relation, not raw string equality | Do not block yet |
| TP-R-021 | Payment beneficiary is the same legal entity the user/agent authorized | Payment rails may use processors/sub-merchants/marketplaces | RESEARCH | Entity-resolution invariant | High value but unsafe until semantics modeled |
| TP-R-022 | Authorized total vs final captured/settled amount remains within allowed semantics | Authorization/capture/tip/tax/shipping adjustments may be legitimate | RESEARCH | Bounded/projection invariant | Later payment pack |
| TP-R-023 | A mandate remains valid after checkout update/version transition | Depends on whether signed payload changed and exact lifecycle rules | PARTIAL | Stale-state invariant | CANDIDATE |
| TP-R-024 | Same transaction identity survives checkout → mandate → payment → receipt → order | Each layer has identifiers; no universal economic root necessarily exists | CROSS_PROTOCOL_GAP | Binding graph, not universal ID standard | CORE DATA MODEL |
| TP-R-025 | Every verifier used the same canonical object/version | Specs define canonicalization locally, but distributed participants can process versions differently | IMPLEMENTATION_DEPENDENT | Version/canonicalization evidence | CANDIDATE |
| TP-R-026 | Constraint evaluation result remains valid at execution time | Constraint may depend on mutable external state | CROSS_PROTOCOL_GAP | Revalidation/evidence timestamp | STRATEGIC CANDIDATE |
| TP-R-027 | Constraint satisfied in mandate remains satisfied in final business result | AP2 authorization does not own all downstream business semantics | CROSS_PROTOCOL_GAP | Business invariant closure | STRATEGIC CORE |
| TP-R-028 | Canceled/invalidated checkout cannot still yield downstream payment/order side effects | Requires lifecycle propagation across systems | CROSS_PROTOCOL_GAP | State propagation invariant | CORE CANDIDATE |
| TP-R-029 | Retry/replay cannot create a second economic result under a new local object identity | Idempotence can be local; end-to-end economic equivalence is broader | CROSS_PROTOCOL_GAP / adjacent market | Observe initially; avoid making this primary wedge | Secondary |
| TP-R-030 | Evidence bundle is sufficient to explain why transaction was allowed/blocked | No single protocol owns combined evidence across all layers | CROSS_PROTOCOL_GAP | First-class TimeProofs output | CORE PRODUCT PROPERTY |

## Initial V1 invariant shortlist

These are candidates, not yet frozen:

1. PAYMENT_AMOUNT_PROJECTS_CHECKOUT
2. PAYMENT_CURRENCY_MATCHES_CHECKOUT
3. PAYMENT_MERCHANT_BINDING
4. PAYMENT_PROJECTION_MATCHES_AUTHORIZED_CART
5. EXECUTED_PAYMENT_MATCHES_APPROVED_MANDATE
6. RECEIPT_MATCHES_EXECUTED_PAYMENT
7. TRANSACTION_OBJECT_CHAIN_COMPLETE
8. STALE_AUTHORIZED_STATE_NOT_EXECUTED
9. CANCELED_STATE_NOT_COMMITTED
10. EVIDENCE_CHAIN_COMPLETE

The following are explicitly excluded from the strategic V1 because UCP/AP2 already owns them normatively:
- merchant authorization present;
- merchant signature validity;
- checkout mandate presence;
- checkout mandate signature validity;
- mandate expiration;
- basic mandate→checkout scope mismatch;
- AP2 downgrade prevention.

They may be implemented as conformance checks but MUST be labeled separately from cross-protocol invariants.

## Product consequence

The initial product should not be described as a generic `UCP ↔ AP2 validator`. That wording risks duplicating protocol conformance.

Preferred technical framing:

> TimeProofs verifies cross-object consistency and evidence closure across the objects that compose an agentic transaction.

The UCP/AP2 pack is the first implementation because it gives us a concrete composition surface and a documented binding gap. The strategic product remains protocol-agnostic.

## Evidence required before freezing each invariant

Every blocking invariant must have:
1. exact protocol/version inputs;
2. exact source fields or derivation algorithm;
3. normative references;
4. allowed transformations/differences;
5. canonicalization rules;
6. PASS fixture;
7. BLOCK fixture;
8. UNKNOWN fixture;
9. version-unsupported fixture;
10. statement of which party can actually enforce the decision.

## Open research items for M1.1

- Audit current AP2 PaymentMandate and PaymentReceipt schemas directly from canonical repo/spec, not only issue reports.
- Audit UCP Order lifecycle and checkout→order binding.
- Determine legitimate amount transformations: tax, shipping, discounts, tips, partial capture, FX.
- Model merchant identity vs payment beneficiary without false positives in marketplaces/processors.
- Determine how selective disclosure affects cross-object comparison.
- Determine protocol-version negotiation and schema compatibility behavior.
- Separate `consistency`, `authorization`, `conformance`, and `business completion` invariant classes.

## Sources used for this initial pass

- UCP AP2 Mandates Extension, current and versioned specification.
- UCP Reference, AP2 extension schema and canonicalization requirements.
- AP2 GitHub issue #211, CartMandate ↔ PaymentMandate binding and verification gap.
- AP2 GitHub issue #150, specification/implementation inconsistencies in mandate design.

This matrix is deliberately conservative. A candidate remains `RESEARCH` rather than becoming a TimeProofs invariant when semantics are uncertain.