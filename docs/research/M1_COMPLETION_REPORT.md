# TimeProofs — M1 UCP ↔ AP2 Normative Audit Completion Report

Status: COMPLETE for transition to M2
Date: 2026-08-11
Branch: `relaunch/invariant-engine`

## Purpose

M1 exists to prevent TimeProofs from building a company around guarantees that UCP or AP2 already own, or around historical gaps that are actively being standardized away.

The company thesis is unchanged: TimeProofs targets cross-protocol composition consistency. The first UCP↔AP2 pack is an implementation wedge, not the permanent company boundary.

## Sources inspected

Primary/canonical sources used in M1 include:

- current UCP Checkout and Order specifications/reference;
- current UCP AP2 integration/mandate documentation;
- current AP2 SDK JSON schemas for `PaymentMandate`, `PaymentReceipt`, Merchant and related types;
- AP2 issue #211 on CartMandate↔PaymentMandate consistency;
- AP2 issue #150 on specification/implementation security inconsistencies;
- current AP2 open pull requests, especially #253, #300, #301, #324 and related fixes;
- AP2 discussions around receipt/order composed outcome and runtime state.

Protocol facts remain time-sensitive. Pack implementation MUST pin supported protocol/schema versions and must not infer current semantics from this report alone after protocol updates.

## Important absorption finding

AP2 is actively closing portions of the historical cart/payment binding gap.

Open PR #253 proposes explicit JCS/RFC8785 CartMandate→PaymentMandate hash binding and mandatory verifier rejection. Current AP2 v0.2 also already defines `PaymentMandate.transaction_id` as a base64url hash of the exact `checkout_jwt`.

Therefore TimeProofs MUST NOT depend on "AP2 does not bind payment to checkout" as its wedge.

Likewise current AP2 work is strengthening execution behavior around verified mandate amounts, instrument identity, payee matching and execution windows. These improvements are positive for TimeProofs: protocol-local guarantees become trusted inputs to a broader composition engine.

## Canonical field facts relevant to V1

### UCP Checkout

Relevant source fields include:

- `id`
- `status`
- `currency`
- `totals[]`, with the authoritative payable amount represented by the entry whose `type` is `total`
- `line_items[]`
- `expires_at` when supplied
- `order` confirmation after successful complete
- UCP/version metadata

UCP checkout status includes lifecycle states such as `ready_for_complete`, `complete_in_progress`, `completed`, and `canceled`.

### UCP Order

Relevant source fields include:

- `id`
- `checkout_id` — required for reconciliation with originating checkout
- `currency` — required to match originating checkout currency in current Order spec
- `line_items[]`
- `totals`
- `adjustments[]`
- fulfillment state/events

Order state is temporal. Later edits, exchanges, refunds and other adjustments can legitimately make current order state differ from the original checkout.

### AP2 PaymentMandate

Current canonical schema requires:

- `vct`
- `transaction_id`
- `payee`
- `payment_amount`
- `payment_instrument`

`transaction_id` is defined as a hash of the `checkout_jwt` value. `payment_amount` contains ISO-4217 currency plus integer minor-unit amount and is described as the final value confirmed by the user.

### AP2 PaymentReceipt

Current canonical schema includes:

- `status`
- `iss`
- `iat`
- `reference` — hash of the closed mandate the receipt binds to
- `payment_id`
- PSP/network confirmation IDs on Success
- error fields on Error

It does **not** contain executed amount or currency. A successful AP2 receipt therefore cannot by itself prove that external PSP/network execution amount/currency matched the approved mandate. Provider/network evidence is required for that stronger invariant.

## Classification outcome

M1 separates rules into five classes.

### CONFORMANCE

Useful for compatibility/defense-in-depth but not strategic moat:

- required merchant authorization/signature checks already owned by UCP/AP2;
- mandate presence/signature;
- mandate expiry;
- basic AP2 downgrade protection;
- basic checkout/mandate identity hash verification where normative/current;
- PaymentReceipt `reference` hash verification;
- UCP Order `checkout_id` presence and local schema requirements.

### CROSS_OBJECT

Composition rules comparing meaning across separately valid objects. This is the primary TimeProofs V1 class.

### EVIDENCE

Rules requiring proof from an external system or execution provider rather than protocol objects alone.

### LIFECYCLE

Rules whose truth depends on time/state transitions, cancellation, updates, or post-order events.

### RESEARCH

High-value candidates where current semantics are not safe enough for deterministic blocking without provider/marketplace-specific knowledge.

## Frozen M1 shortlist for M2/M3 design

This is the smallest defensible set to carry forward. It is a **design shortlist**, not yet a production pack. M3 must provide fixtures and exact version applicability before any rule becomes production BLOCK.

### TP-CX-001 — PAYMENT_TOTAL_PROJECTS_AUTHORIZED_CHECKOUT

Class: `CROSS_OBJECT`
Priority: V1 blocking candidate

Relation:

`AP2 PaymentMandate.payment_amount.amount` must equal the authoritative UCP Checkout `totals[type=total].amount` for the exact checkout state cryptographically referenced by the mandate, unless a future protocol version explicitly defines an allowed transformation.

Required evidence:

- exact UCP checkout artifact/JWT represented by the AP2 `transaction_id`;
- UCP authoritative `total` entry;
- AP2 `payment_amount.amount`;
- supported versions/canonicalization evidence.

Important: TimeProofs must not recompute total from a hard-coded list of subtotal/tax/shipping/discount components.

### TP-CX-002 — PAYMENT_CURRENCY_PROJECTS_AUTHORIZED_CHECKOUT

Class: `CROSS_OBJECT`
Priority: V1 blocking candidate

Relation:

`AP2 PaymentMandate.payment_amount.currency` must equal UCP Checkout `currency` for the referenced authorized checkout state.

Foreign-exchange flows must return `UNKNOWN` unless a future pack/provider profile explicitly models the authorized FX transformation.

### TP-CX-003 — PAYMENT_PROJECTION_REFERENCES_EXACT_AUTHORIZED_STATE

Class: `CROSS_OBJECT` + conformance-assisted
Priority: V1 structural candidate

Relation:

The PaymentMandate must be evaluated against the exact checkout artifact represented by its current normative binding (`transaction_id`/checkout JWT semantics), never an independently fetched or reconstructed checkout that merely shares a business identifier.

TimeProofs does not claim ownership of the cryptographic binding. Its role is to preserve the exact source object in the transaction graph and ensure all semantic projection invariants are evaluated against that object.

A protocol-native binding failure is labeled `CONFORMANCE`; a semantic mismatch on correctly bound objects is labeled `CROSS_OBJECT`.

### TP-EV-001 — EXECUTED_PAYMENT_MATCHES_APPROVED_MANDATE

Class: `EVIDENCE`
Priority: strategic, not artifact-only V1 blocking

Relation:

External execution amount, currency and destination must match the approved PaymentMandate.

AP2 PaymentReceipt alone is insufficient because it has no amount/currency fields. Missing PSP/network evidence yields `UNKNOWN`, never inferred PASS.

This rule motivates future TimeProofs Evidence Adapters.

### TP-LC-001 — COMMITTED_ORDER_BINDS_ORIGINATING_CHECKOUT

Class: `LIFECYCLE`
Priority: V1/V1.1 candidate

Relation:

At initial order creation, the resulting UCP Order must reconcile to the originating checkout via `checkout_id` and supported placement-time consistency rules.

Later order state must not be compared by naive full equality because UCP permits legitimate edits, exchanges, fulfillment evolution and adjustments.

### TP-LC-002 — INVALIDATED_OR_CANCELED_STATE_NOT_COMMITTED

Class: `LIFECYCLE`
Priority: strategic candidate

Relation:

A checkout/authorization state known to be canceled, invalidated, superseded or outside an allowed execution window must not subsequently be treated as a valid basis for a new irreversible commit.

Exact blocking semantics require state freshness/evidence source and therefore remain version/provider scoped.

### TP-EV-002 — COMPOSED_EVIDENCE_CHAIN_CLOSED

Class: `EVIDENCE`
Priority: product property

Relation:

A TimeProofs decision must explicitly state which transaction graph edges are proven, missing or ambiguous across checkout → mandate → receipt/execution → order.

This is not a claim that every transaction must contain every possible object. The pack defines required evidence for the evaluated mode. Missing required evidence produces `UNKNOWN` or an explicit incomplete-chain result according to pack policy.

## Candidates deliberately NOT frozen as V1 blocking rules

### Merchant/payee legal entity equality

Potentially valuable but marketplaces, processors, sub-merchants and payment facilitators make naive identity equality unsafe. AP2 itself is actively improving stable payee matching. Keep as `RESEARCH` until entity semantics are modeled.

### Line-item equality to PaymentMandate

Current PaymentMandate is primarily a payment projection and does not itself carry a complete UCP line-item representation. Do not invent an equality relation that cannot be evidenced from the actual objects.

### PaymentReceipt amount/currency equality

Impossible from current PaymentReceipt fields alone. Requires provider evidence.

### Current Order == original Checkout

Incorrect as a generic rule because UCP Order is explicitly mutable over its lifecycle through legitimate business events.

### Generic exactly-once / idempotence

Real adjacent problem, but AP2 ecosystem work such as reserve/commit/release runtimes already targets it. It is not TimeProofs' initial category.

## Legitimate transformation policy

The V1 core must follow these rules:

1. Do not guess transformations.
2. Exact same-currency amount projection is deterministic when supported by the selected protocol versions.
3. Extensible UCP totals are respected by reading the authoritative grand total rather than reconstructing it.
4. FX, tips, incremental authorization, partial capture, split settlement, marketplace payout and other payment-specific transformations are `UNKNOWN` until represented by a provider/version-aware pack.
5. Selective disclosure may make a comparison impossible; absence of disclosed evidence is `UNKNOWN`, not PASS.
6. Order comparisons must include an evaluation time/lifecycle position.

## Standard-evolution risk register at M1 exit

### High absorption risk

- raw cart/checkout hash binding;
- mandate signature/expiry verification;
- local payee/instrument constraint checks;
- AP2 execution-window enforcement.

These stay adapters/conformance features.

### Lower absorption risk / company-relevant

- semantic projection consistency across separately owned objects;
- evidence closure spanning protocol plus PSP/business-system artifacts;
- lifecycle consistency when responsibility crosses systems;
- future cross-protocol invariants involving A2A/MCP/UCP/AP2/business protocols.

No single protocol is assumed to own all of these end-to-end relationships.

## M1 exit criteria review

- 30+ meaningful relationships analyzed: **PASS** — 30 are documented in `UCP_AP2_GAP_MATRIX.md`, with deeper payment/order audit.
- V1 candidates classified: **PASS** — conformance, cross-object, evidence, lifecycle, research.
- Exact source objects/fields identified: **PASS for M2 transition** for the frozen shortlist; provider evidence fields remain deliberately abstract until Evidence Adapter design.
- No blocking invariant based only on historical issue text: **PASS** — current schemas and open PRs were checked; historical binding assumptions were demoted.
- Shortlist reduced to a small defensible set: **PASS** — 7 design candidates, of which only 2 are immediate artifact-only blocking candidates.

## M1 conclusion

M1 is complete enough to begin M2.

The audit also reveals an important product truth: the first UCP↔AP2 artifact-only pack is intentionally narrow. TimeProofs' long-term value must come from the generic transaction graph, multi-protocol packs, lifecycle checks and Evidence Adapters — not from accumulating duplicate UCP/AP2 conformance rules.

This does **not** change the TimeProofs company thesis. It prevents the first pack from pretending to solve more than current evidence supports.

## Next milestone

Proceed to **M2 — Canonical Transaction Model**.

M2 must define protocol-agnostic structures for:

- `ProtocolObject`
- `BindingEdge`
- `InvariantDefinition`
- `EvidenceItem`
- `EvaluationResult`
- `Decision`

The model must represent TP-CX-001/002/003 and the future evidence/lifecycle rules without embedding UCP/AP2-specific fields into core types.
