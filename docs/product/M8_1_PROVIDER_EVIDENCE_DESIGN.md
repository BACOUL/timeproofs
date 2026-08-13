# TimeProofs — M8.1 Market Proof Gate + Provider Evidence Design

Status: CONDITIONAL GO / IMPLEMENTATION FOUNDATION
Date: 2026-08-13
Branch: `relaunch/invariant-engine`

## 1. Decision

**Decision: GO to M8.1 only.**

This is not a product-market-fit decision and not approval for M10/cloud spend.

The evidence is strong enough to justify the next narrow technical boundary:

> **approved AP2 PaymentMandate ↔ durable PSP/provider execution evidence**

The evidence is not strong enough to claim validated willingness-to-pay, a proven buyer, or a durable company moat.

## 2. Contradictory Market Proof Gate

### 2.1 Real problem — GREEN / AMBER

Evidence supporting the problem:

- AP2 issue #211 documents a case where Cart/Checkout state and PaymentMandate can be locally valid while inconsistent as a composed transaction.
- AP2 community work such as `cycles-ap2-python` exists because consume-once/idempotency/concurrency are runtime-state concerns outside static mandate verification.
- Stripe recommends one PaymentIntent per order/session, retrieval of the same PaymentIntent after interruption, and idempotency keys to prevent duplicate creation.
- Stripe publicly describes production challenges in agentic commerce and recommends auditability/controls.
- Research published in 2026 independently analyzes runtime binding/replay failures in AP2 and cross-layer failures in x402.

Contradictory evidence:

- AP2/FIDO are actively strengthening authorization, delegation, binding and trusted execution semantics.
- A narrow field-comparison product can be absorbed by the standards.

Conclusion: the problem exists, but TimeProofs must operate at boundaries that no single protocol owner can fully close.

### 2.2 Economic consequence — GREEN

Potential failures touch money and irreversible state:

- executed amount/currency differs from approved state;
- duplicate action after timeout/retry;
- payment/order divergence;
- cancellation/refund divergence;
- cumulative authorization breach;
- inability to reconstruct authoritative state during dispute or recovery.

The consequence is materially stronger than generic developer convenience.

### 2.3 Existing budget / willingness-to-pay — AMBER / RED

Positive signals:

- Stripe, Visa, Mastercard/FIDO and payment infrastructure vendors are investing heavily in agentic-commerce trust, orchestration and controls.
- Visa Intelligent Commerce Connect and Stripe Agentic Commerce Suite show that companies buy/build infrastructure around agentic payment complexity.

Negative signal:

- no customer has paid TimeProofs;
- no direct price sensitivity or procurement evidence exists for cross-provider invariant verification;
- current TimeProofs pricing remains a modeling hypothesis.

Conclusion: adjacent budgets exist. **Direct TimeProofs willingness-to-pay remains RED.**

### 2.4 Buy vs build — AMBER

Reasons a third-party layer can exist:

- AP2 explicitly allows verification responsibilities to be delegated to a technology provider.
- maintaining protocol/provider/version compatibility is continuous work;
- provider-neutral reconciliation spans owners that cannot individually attest the entire composed transaction.

Reasons teams may build internally:

- first invariants are simple;
- large PSP/platform teams already own payment reliability infrastructure;
- adding a blocking dependency requires high trust.

Conclusion: TimeProofs must accumulate reusable provider/version/evidence knowledge. The generic engine alone is not buy-worthy.

### 2.5 Competition / absorption — AMBER / RED

Direct/adjacent pressure includes:

- protocol-native AP2/FIDO verification;
- Stripe Agentic Commerce / MPP and payment lifecycle infrastructure;
- Visa Intelligent Commerce Connect;
- independent agentic-payment infrastructure such as AlgoVoi;
- internal payment orchestration/reconciliation systems.

The defensible boundary is not “secure agent payments.” It is:

> **neutral, deterministic consistency and evidence semantics across independent protocol/provider/business-system owners.**

### 2.6 Distribution — AMBER

Plausible path:

`GitHub/docs → npm → CI/SDK → production ENFORCE → provider evidence → RESOLVE`

Potential leverage:

- protocol issues/discussions;
- reproducible fixtures;
- provider integration documentation;
- platform/PSP/runtime partnerships.

Still unproven:

- organic developer pull;
- conversion to production;
- partner distribution.

## 3. Market Gate verdict

| Criterion | Verdict |
|---|---|
| Market direction | GREEN |
| Problem existence | GREEN / AMBER |
| Economic consequence | GREEN |
| Frequency today | AMBER |
| Standards tailwind | GREEN |
| Standards absorption risk | AMBER / RED |
| Competition | AMBER |
| Buy-vs-build | AMBER |
| Direct willingness-to-pay | RED |
| Solo-founder implementation | GREEN / AMBER |
| Potential cumulative moat | GREEN potential |

**Founder action: continue M8.1, but do not interpret technical completion as commercial validation.**

## 4. First provider choice — Stripe PaymentIntent

Selected provider profile:

- provider: `stripe`
- evidence object: `PaymentIntent`
- pinned API profile: `2026-02-25.clover`
- adapter: `timeproofs.stripe.payment-intent@0.1.0`

Why Stripe first:

1. durable PaymentIntent state can be retrieved by ID after interruption;
2. the object exposes intended amount, received amount, currency and lifecycle status;
3. Stripe recommends reusing the same PaymentIntent for an order/session and using idempotency keys;
4. integration is sufficiently small for a solo founder;
5. Stripe is commercially relevant to agentic commerce;
6. the core can normalize Stripe without becoming Stripe-specific.

Stripe is a reference provider, not the company boundary.

## 5. Evidence hierarchy

M8.1 v0.1 treats evidence in this order:

1. **retrieved durable PaymentIntent snapshot** — evaluation input;
2. webhook event — useful as a notification/trigger, but not sufficient by itself for PASS;
3. request/response attempt — not sufficient after timeout or ambiguous transport failure.

A caller that receives a timeout must retrieve known provider state rather than infer that the payment failed.

## 6. Provider binding

A PASS requires the provider snapshot to carry an explicit reference to the approved AP2 transaction.

Default Stripe profile:

`PaymentIntent.metadata.timeproofs_ap2_transaction_id`

Semantics:

- missing reference → `UNKNOWN`;
- reference to another AP2 transaction → `BLOCK`;
- matching reference → amount/currency/provider-state evaluation may continue.

This metadata binding is provider-stored evidence, **not a cryptographic replacement for AP2 authorization**. Future provider profiles may use stronger native references.

## 7. TP-EV-001

Invariant:

`TP-EV-001 EXECUTED_PAYMENT_MATCHES_APPROVED_MANDATE`

Initial Stripe semantics:

| Stripe state/evidence | TimeProofs decision | execution_state |
|---|---|---|
| `succeeded`, bound, amount+currency exact | PASS | EXECUTED_CONSISTENT |
| `succeeded`, bound, amount mismatch | BLOCK | EXECUTED_INCONSISTENT |
| `succeeded`, bound, currency mismatch | BLOCK | EXECUTED_INCONSISTENT |
| `canceled`, bound, `amount_received=0` | PASS | NOT_EXECUTED |
| binding mismatch | BLOCK | UNKNOWN |
| binding missing | UNKNOWN | UNKNOWN |
| `processing` / `requires_*` | UNKNOWN | UNKNOWN |
| manual capture / partial semantics | UNKNOWN | UNKNOWN |
| unsupported provider/API profile | UNKNOWN/error at adapter boundary | UNKNOWN |

## 8. Conservative non-claims

M8.1 v0.1 does not prove:

- settlement finality;
- refund or chargeback state;
- network-level clearing;
- Connect destination/payee identity;
- partial capture;
- incremental authorization;
- tips;
- FX transformations;
- split settlement;
- asynchronous payment-method edge cases beyond the pinned evidence semantics;
- exactly-once execution.

A Stripe PaymentIntent remaining `succeeded` after a later refund is one reason this profile must not be marketed as settlement truth.

## 9. Implementation contract

Public SDK primitive:

```js
verifyProviderExecution({
  paymentMandate,
  providerEvidence,
  provider: 'stripe',
  providerVersion: '2026-02-25.clover'
})
```

Contract:

- `decision`: PASS / BLOCK / UNKNOWN
- `execution_state`: EXECUTED_CONSISTENT / EXECUTED_INCONSISTENT / NOT_EXECUTED / UNKNOWN
- stable invariant/reason code;
- provider/version provenance;
- normalized evidence object;
- exact source snapshot digest.

No network call is required by the deterministic core. Retrieval/authentication remains caller/integration-owned in M8.1.

## 10. Fixture proof

The first corpus contains:

- exact succeeded PASS;
- amount mismatch BLOCK;
- currency mismatch BLOCK;
- provider/AP2 binding mismatch BLOCK;
- processing UNKNOWN;
- canceled with zero received PASS / NOT_EXECUTED;
- missing binding UNKNOWN;
- manual capture UNKNOWN.

## 11. What remains before M8.1 can be called complete

1. exercise the profile against real Stripe test-mode retrieval, not only fixtures;
2. verify webhook-trigger → retrieve PaymentIntent → evaluate flow;
3. test transport timeout/retry sequence with known PaymentIntent ID/idempotency strategy;
4. confirm version behavior on the pinned Stripe profile;
5. add security/adversarial cases for hostile/malformed provider payloads;
6. obtain external evidence that at least one real implementer recognizes the problem/integration value.

Until those are done, status is **implementation foundation**, not completed provider proof.

## 12. Commercial kill condition

Do not proceed into heavy managed-cloud work merely because M8.1 works technically.

Reconsider/narrow if external validation shows that:

- provider/platform teams already close the boundary completely;
- teams consistently prefer trivial internal code;
- provider integration effort is bespoke and non-reusable;
- no economic owner values cross-provider evidence;
- no developer/partner distribution pull emerges.

## 13. Primary references reviewed

- AP2 v0.2 specification and verification responsibilities.
- AP2 issue #211, Cart/Checkout ↔ PaymentMandate binding/verification gap.
- AP2 discussion #262, runtime idempotency wrapper.
- FIDO Alliance, agentic payment / AP2 / Verifiable Intent work (April–May 2026).
- Stripe PaymentIntents documentation, lifecycle/retrieval/idempotency guidance.
- Stripe Machine Payments Protocol and Agentic Commerce material (2026).
- Visa Intelligent Commerce Connect (April 2026) and agentic-commerce expansion.
- 2026 research on runtime verification for AP2 and cross-layer payment failure modes.

