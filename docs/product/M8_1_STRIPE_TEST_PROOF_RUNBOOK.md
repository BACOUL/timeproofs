# TimeProofs — M8.1 Stripe Test-Mode Proof Runbook

Status: READY TO EXECUTE WITH A STRIPE TEST KEY
Branch: `relaunch/invariant-engine`

## Goal

Prove the first real provider boundary without touching live money:

> approved AP2 PaymentMandate → Stripe test PaymentIntent → confirmation side effect → response outcome ignored → PaymentIntent retrieved by ID → TimeProofs provider-evidence evaluation

Expected final result for the included happy-path mandate:

- `decision: PASS`
- `execution_state: EXECUTED_CONSISTENT`
- `reason_code: EXECUTED_PAYMENT_MATCHES_APPROVED_MANDATE`
- `livemode: false`

This is a **response-loss simulation**, not a claim that a literal network timeout occurred. The proof deliberately ignores the confirmation result and reconstructs the outcome from a fresh provider retrieval.

## Safety contract

The proof helpers refuse to run unless the Stripe key begins with:

- `sk_test_`, or
- `rk_test_`.

The retrieval and write helpers also reject any returned PaymentIntent unless:

```text
livemode === false
```

No live Stripe key or live PaymentIntent is accepted by the proof path.

Never commit a Stripe key to Git.

## Included test mandate

`examples/m8-1/stripe/payment-mandate.test.json`

It authorizes:

- transaction: `tx_m81_stripe_test_001`
- amount: EUR 5.00 (`500` minor units)
- payment instrument family: card

The Stripe PaymentIntent is created with the same amount/currency and stores the AP2 transaction reference in:

`metadata.timeproofs_ap2_transaction_id`

## Execute

From the repository root:

```bash
export STRIPE_SECRET_KEY='sk_test_...'
export TIMEPROOFS_AP2_MANDATE_FILE='examples/m8-1/stripe/payment-mandate.test.json'
npm run proof:m8-1:stripe-response-loss
```

Optional test payment method override:

```bash
export TIMEPROOFS_STRIPE_TEST_PAYMENT_METHOD='pm_card_visa'
```

The default is `pm_card_visa`.

## What the proof does

1. Parses the AP2 PaymentMandate.
2. Creates a Stripe PaymentIntent in test mode only.
3. Uses a deterministic create idempotency key derived from the AP2 transaction id.
4. Stores `timeproofs_ap2_transaction_id` in Stripe metadata.
5. Confirms the known PaymentIntent with a Stripe test PaymentMethod.
6. Uses a separate deterministic confirmation idempotency key.
7. Deliberately does not use the confirmation response as outcome truth.
8. Retrieves the PaymentIntent again by its known ID.
9. Refuses the proof if Stripe returns `livemode=true`.
10. Passes the retrieved PaymentIntent to `verifyProviderExecution()`.
11. Emits only a redacted proof summary; no API key or client secret is printed.

## Expected output shape

```json
{
  "proof": "m8.1-stripe-response-loss-recovery",
  "simulation": "confirmation response deliberately ignored; outcome reconstructed from retrieved provider state",
  "provider": "stripe",
  "provider_version": "2026-02-25.clover",
  "livemode": false,
  "payment_intent_id": "pi_...",
  "provider_status": "succeeded",
  "capture_method": "automatic_async",
  "decision": "PASS",
  "execution_state": "EXECUTED_CONSISTENT",
  "invariant_id": "TP-EV-001",
  "reason_code": "EXECUTED_PAYMENT_MATCHES_APPROVED_MANDATE"
}
```

`capture_method` may reflect the pinned Stripe profile's actual returned semantics. TimeProofs currently supports `automatic` and `automatic_async` for this proof and leaves manual/partial capture semantics UNKNOWN.

## Why the flow is useful

The important property is that the consequential payment is represented by a known provider object before confirmation. If the business outcome of confirmation is unavailable or distrusted, TimeProofs does not infer success or failure from transport behavior. It retrieves provider state and evaluates evidence.

This establishes the practical shape required for the later RESOLVE primitive:

> Never retry an unknown side effect merely because the initiating request did not yield a trusted business outcome. Resolve provider state first.

## What this proof does NOT establish

It does not yet prove:

- a literal packet-level timeout after Stripe committed the payment;
- settlement finality;
- refund/chargeback finality;
- exactly-once execution;
- all Stripe payment methods;
- manual/partial capture;
- cross-provider support;
- willingness-to-pay or product-market fit.

## Next evidence after a successful run

After this proof is green:

1. add a webhook-trigger → retrieve → evaluate proof;
2. add an actual transport-failure/chaos test around confirmation while preserving a known PaymentIntent ID and idempotency key;
3. record the exact Stripe object/version behavior as a provider fixture;
4. obtain external implementer feedback on the integration value;
5. only then consider M8.1 complete and freeze the first RESOLVE state machine.
