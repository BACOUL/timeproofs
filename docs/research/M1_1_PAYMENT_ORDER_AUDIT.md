# TimeProofs — M1.1 Payment / Receipt / Order Audit

Status: normative research
Date: 2026-08-11
Branch: `relaunch/invariant-engine`

## Purpose

Deepen the initial UCP ↔ AP2 gap matrix by auditing the current AP2 v0.2 PaymentMandate / PaymentReceipt model and the current UCP checkout / order lifecycle.

This document exists to prevent TimeProofs from building blocking rules around obsolete assumptions or around behavior already guaranteed by current protocol versions.

## Primary conclusion

The current AP2 specification is stronger than some older issue reports imply:

- A closed `PaymentMandate` contains a `transaction_id` that is the digest of the exact `checkout_jwt`.
- The `PaymentMandate` also carries a `payee` and `payment_amount` (amount + ISO 4217 currency).
- The `PaymentReceipt.reference` binds the receipt to the closed PaymentMandate.
- A successful CheckoutReceipt can carry an `order_id`.
- UCP Order carries `checkout_id`, providing a merchant-side reconciliation edge back to the originating checkout.

Therefore TimeProofs MUST distinguish cryptographic/object binding from semantic/economic consistency.

The strategic gap is not: “Can we tell which checkout this payment mandate references?”

The stronger gap is: “Given objects that are correctly bound, do their business projections and downstream outcomes remain mutually consistent?”

## Current canonical object chain

A useful initial graph is:

```text
UCP Checkout state
    ↓ merchant-signed Checkout JWT
AP2 CheckoutMandate
    ↓ checkout hash / transaction binding
AP2 PaymentMandate
    ↓ receipt.reference
AP2 PaymentReceipt

UCP Complete Checkout
    ↓
AP2 CheckoutReceipt.order_id
    ↓
UCP Order.id
    ↓
UCP Order.checkout_id
    ↺ originating UCP Checkout.id
```

TimeProofs should model this as a graph of protocol objects and typed binding edges, not as a single universal transaction ID.

## Findings by difficult case

### 1. Grand total, taxes, shipping, discounts and fees

UCP defines `totals` with an authoritative entry where `type = total`.

Current UCP explicitly says that if the computed component sum does not match the authoritative `total`, the platform must not silently alter the display and must not autonomously complete the checkout. UCP supports well-known total types such as subtotal, discount, fulfillment, tax and fee, plus extensible/custom total types.

TimeProofs consequence:

- Do NOT reconstruct the payable amount by summing only known UCP components and compare that reconstructed value to AP2.
- For the first payment-projection invariant, compare AP2 `payment_amount.amount` against the authoritative UCP checkout `totals[type=total].amount`.
- Compare AP2 `payment_amount.currency` against UCP checkout `currency`.
- Component-level tax/shipping/discount consistency belongs in a later business pack, not the first blocking rule.

Candidate invariant:

`TP-UCP-AP2-PAY-001 PAYMENT_TOTAL_MATCHES_AUTHORIZED_CHECKOUT_TOTAL`

Initial semantics:

```text
left  = authoritative UCP checkout total
right = AP2 closed PaymentMandate.payment_amount.amount
rule  = exact equality in minor units
```

Currency must be verified first.

### 2. Cart/checkout → PaymentMandate semantic projection

AP2 v0.2 binds the closed PaymentMandate to a checkout JWT using `transaction_id = hash(checkout_jwt)`.

This is a strong cryptographic relationship and TimeProofs must NOT market it as missing.

However, current verification rules do not define a complete normative equality/projection set covering which chargeable checkout fields must correspond to the PaymentMandate beyond the mandate's own constraints. AP2 issue #211 specifically calls out this distinction: binding can exist while semantically inconsistent payment fields still need deterministic reject-on-mismatch rules.

TimeProofs opportunity:

- semantic projection rules over correctly bound objects;
- explicit protocol-versioned field sets;
- deterministic `BLOCK` when a mandatory projection differs.

This remains a credible V1 gap.

### 3. Currency

UCP Order requires its currency to match the originating checkout currency.
AP2 PaymentMandate explicitly carries `payment_amount.currency`.

The cross-object payment projection should therefore compare checkout currency to PaymentMandate currency.

Candidate:

`TP-UCP-AP2-PAY-002 PAYMENT_CURRENCY_MATCHES_CHECKOUT`

This is suitable for a blocking invariant when the exact relevant object versions are supported.

### 4. Merchant / payee / beneficiary identity

AP2 closed PaymentMandate includes a `payee` Merchant object.

UCP does not provide a single universal field that can safely be treated as an AP2 payee-equivalent legal entity in every commerce topology. Marketplaces, payment facilitators, sub-merchants and processors can make naive string equality incorrect.

TimeProofs consequence:

- no V1 `BLOCK` based on raw merchant name/domain equality;
- model `EntityBinding` separately;
- require explicit adapter semantics or trusted entity mapping before merchant/payee equality can be blocking.

Status: RESEARCH / later invariant pack.

### 5. Checkout mutation and stale authorization

UCP checkouts are mutable before completion through full resource replacement.
AP2 PaymentMandate transaction binding is to a specific signed checkout JWT.

Therefore a new checkout state must not be treated as equivalent to a mandate bound to an older checkout JWT.

TimeProofs can deterministically detect this when both the execution-time checkout JWT and the closed PaymentMandate are available.

Candidate:

`TP-UCP-AP2-STATE-001 PAYMENT_MANDATE_BOUND_TO_CURRENT_CHECKOUT_STATE`

This must be carefully separated from UCP's own `mandate_scope_mismatch` conformance rule. The strategic value exists only where TimeProofs checks a composed execution chain or historical/current objects beyond the local UCP verification already performed.

### 6. PaymentReceipt

Current AP2 PaymentReceipt contains:

- status;
- issuer;
- timestamp;
- `reference` to the closed PaymentMandate;
- `payment_id`;
- optional PSP/network confirmation IDs.

It does NOT carry the executed amount or currency.

Therefore:

- `PaymentReceipt.reference` can prove which PaymentMandate the receipt acknowledges;
- the receipt alone cannot independently prove that the PSP/network actually executed exactly the mandate amount/currency;
- proving settlement/capture amount requires an additional payment-system evidence object or provider-specific adapter.

This is an important TimeProofs architectural boundary.

Candidate core binding check:

`TP-AP2-EVID-001 PAYMENT_RECEIPT_REFERENCES_APPROVED_PAYMENT_MANDATE`

This is largely AP2 conformance/closure, not moat by itself.

Candidate strategic later invariant:

`TP-PAY-EVID-001 EXECUTED_PAYMENT_MATCHES_APPROVED_MANDATE`

Requires external PSP/network evidence; cannot be implemented correctly from AP2 Receipt alone.

### 7. CheckoutReceipt → UCP Order

AP2 CheckoutReceipt can contain `order_id` on success.
UCP Order contains both `id` and mandatory `checkout_id`.

This gives a strong composed chain that TimeProofs can verify when the relevant objects are present:

```text
CheckoutReceipt.order_id == UCP Order.id
UCP Order.checkout_id == originating UCP Checkout.id
```

Candidate:

`TP-UCP-AP2-ORDER-001 ORDER_CHAIN_BINDS_TO_ORIGINATING_CHECKOUT`

This is one of the cleanest first cross-object consistency invariants because it spans AP2 receipt state and UCP order state.

### 8. Final order content vs authorized checkout

Do NOT require strict immutable equality between the current UCP Order and the original authorized Checkout.

Current UCP Order semantics explicitly allow post-order changes/edits/exchanges and use event/adjustment state. Order line items can represent current state while preserving historical items, and monetary adjustments can occur after placement.

Therefore a naive rule:

`final_order == authorized_checkout`

would create false positives.

The correct model is temporal:

- INITIAL_ORDER_SNAPSHOT may need consistency with the authorized checkout;
- CURRENT_ORDER may legitimately diverge if the divergence is explained by valid post-order events/adjustments.

This is a major design requirement for the TimeProofs canonical model: invariants need lifecycle phase and evaluation timestamp.

### 9. Partial authorization / capture / settlement

The AP2 PaymentReceipt schema does not expose capture amount, settlement amount or a detailed payment lifecycle.

Therefore TimeProofs MUST NOT define a generic V1 invariant that assumes:

```text
authorized amount == captured amount == settled amount
```

Partial capture, delayed capture, tips, incremental authorization or PSP-specific behavior may be legitimate depending on the payment system.

Status: provider-specific / later payment evidence pack.

### 10. Selective disclosure

AP2 autonomous flows use SD-JWT selective disclosure and instruct Shopping Agents to disclose only the open-mandate claims needed to evaluate the closed mandate.

TimeProofs MUST NOT treat an undisclosed open-mandate field as equivalent to `false`, `null` or “constraint absent”.

Canonical evaluation needs at least these states:

- VALUE_PRESENT
- NOT_DISCLOSED
- NOT_APPLICABLE
- MISSING_REQUIRED
- UNSUPPORTED

If an invariant requires a claim that the verifier is not entitled to or has not received, the safe decision is generally `UNKNOWN`, not `PASS` or `BLOCK`, unless the relevant protocol rules define otherwise.

This is a first-class requirement for the Evidence Model.

## Revised first-pack candidate set

After M1.1, the strongest near-term candidates are:

1. `PAYMENT_TOTAL_MATCHES_AUTHORIZED_CHECKOUT_TOTAL`
2. `PAYMENT_CURRENCY_MATCHES_CHECKOUT`
3. `PAYMENT_PROJECTION_MATCHES_AUTHORIZED_CHECKOUT` (initially amount/currency, later extensible)
4. `ORDER_CHAIN_BINDS_TO_ORIGINATING_CHECKOUT`
5. `CURRENT_EXECUTION_REFERENCES_CURRENT_AUTHORIZED_CHECKOUT_STATE` (only where not duplicating local UCP conformance)
6. `EVIDENCE_CHAIN_IS_CLOSED` (object references present and cryptographically linkable)

Deferred until additional evidence/adapters exist:

- merchant/payee legal-entity equality;
- executed/captured/settled payment amount;
- final-order strict equality;
- tax/shipping/discount component equality;
- buyer identity equality;
- marketplace beneficiary equality.

## New canonical-model requirements discovered

The future TimeProofs model MUST support:

1. `ProtocolObject` with protocol + schema version + observed_at + raw evidence.
2. `BindingEdge` with cryptographic / identifier / semantic binding type.
3. `Invariant` with lifecycle phase (`PRE_COMMIT`, `COMMIT`, `POST_COMMIT`, `DISPUTE`).
4. `EvidenceValue` with disclosure state, not only value/null.
5. `EntityBinding` separated from raw identity equality.
6. Temporal evaluation: an invariant can be valid at authorization and invalid at execution.
7. Provider evidence adapters for claims AP2/UCP receipts do not themselves prove.

## Product implication

M1.1 strengthens the company thesis but narrows the V1.

TimeProofs should NOT claim to replace UCP/AP2 verification.

The first product should be framed as:

> Cross-object semantic consistency and evidence closure for composed agentic transactions.

The most defensible early value is in relationships that remain meaningful even after local signature, hash, mandate and schema validation have succeeded.

## Sources / normative baseline

Research completed against current sources on 2026-08-11:

- UCP current Checkout specification.
- UCP current Order specification/reference.
- UCP AP2 Mandates extension.
- AP2 v0.2 core specification.
- AP2 Payment Mandate / Payment Receipt specification.
- AP2 Checkout Mandate / Checkout Receipt specification.
- AP2 issue #211 (Cart/Payment semantic binding gap), treated as issue evidence rather than current normative truth.
- AP2 issue #150 (spec/implementation drift), treated as historical/implementation evidence.

## M1.2 next research

Before freezing the first invariant pack:

1. inspect current canonical JSON schemas / reference implementation for the exact field names and version behavior;
2. determine exact UCP authoritative checkout total extraction algorithm for current supported versions;
3. define transaction graph edges and evidence states formally;
4. build the first PASS/BLOCK/UNKNOWN fixture table on paper before code;
5. audit whether AP2/UCP pending PRs are about to close any candidate gap;
6. decide which checks are `CONFORMANCE` vs `COMPOSITION` so the product never confuses the two.
