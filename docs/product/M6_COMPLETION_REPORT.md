# TimeProofs — M6 Completion Report

Status: COMPLETE
Date: 2026-08-12
Branch: `relaunch/invariant-engine`

## Outcome

TimeProofs now has a first local developer product path using real current protocol shapes rather than M1/M4 placeholder profile labels.

Implemented:
- `adapters/ucp/checkout.js`
- `adapters/ap2/payment-mandate.js`
- `sdk/index.js`
- `cli/timeproofs.js`
- `bin/timeproofs.js`
- `timeproofs-core/canonical.js`
- production verification entry point in `timeproofs-core/index.js`
- M6 end-to-end tests in `timeproofs-core/tests/run-m6-adapter-cli-tests.mjs`

## Supported profile v0.1

### UCP
- protocol version: `2026-04-08`
- capability: `dev.ucp.shopping.checkout`
- canonical schema URI: `https://ucp.dev/2026-04-08/schemas/shopping/checkout.json`
- source shape verified against official UCP checkout schema and metadata documentation.

### AP2
- PaymentMandate VCT: `mandate.payment.1`
- canonical schema URI: `https://ap2-protocol.org/schemas/payment_mandate.json`
- required transaction fields match the official AP2 schema: `transaction_id`, `payee`, `payment_amount`, `payment_instrument`.

The adapter metadata records upstream source snapshots used during M6 design so future changes can be audited.

## Exact-state binding

Production verification no longer treats presence of `transaction_id` as proof.

The SDK requires explicit checkout JWT evidence to prove TP-CX-003. For the currently supported SHA-256 profile it computes the base64url SHA-256 digest of the exact checkout JWT string and compares it with AP2 `transaction_id`.

- match → TP-CX-003 PASS
- mismatch → TP-CX-003 BLOCK
- no checkout JWT → TP-CX-003 UNKNOWN / `INTEGRITY_UNVERIFIED`
- unsupported binding hash algorithm → UNKNOWN

This is intentionally separate from full SD-JWT signature validation, which is not claimed by M6.

## Developer interface

CLI:

```bash
timeproofs verify \
  --checkout checkout.json \
  --payment-mandate payment.json \
  --checkout-jwt '<exact-checkout-jwt>'
```

Machine output:

```bash
timeproofs verify ... --json
```

Exit codes:
- `0` PASS/WARN
- `2` BLOCK
- `3` UNKNOWN
- `4` unsupported protocol version/profile
- `1` input/runtime error

SDK:

```js
import { verifyTransaction } from './sdk/index.js';
```

## Provenance

Adapters produce ProtocolObjects carrying:
- protocol/profile version;
- exact canonical JSON SHA-256 snapshot digest;
- source reference;
- raw object;
- canonical extraction;
- adapter ID/version;
- mapping provenance.

## Validation

GitHub Actions workflow: `TimeProofs Core Regression`

Successful full M4 + M6 run:
- run id: `31571347893`
- head: `96ddefe88e0486b8d2be25a4a6dcae0b5bf485e4`
- conclusion: SUCCESS
- runtime: Node 22

The suite checks:
- frozen M4 fixture contract;
- real-shaped UCP/AP2 adapter PASS;
- amount mismatch BLOCK;
- exact binding mismatch BLOCK;
- missing checkout JWT UNKNOWN;
- unsupported UCP version rejection;
- CLI JSON output and exit codes.

## Known boundaries

M6 is not yet a complete protocol security verifier.

Not claimed yet:
- SD-JWT signature/key-binding validation;
- merchant authorization JWS verification;
- arbitrary AP2 `sd_hash` algorithm discovery;
- remote UCP schema composition/validation;
- UCP extension schema resolution;
- provider/network execution evidence;
- lifecycle Order evidence;
- hosted service.

These boundaries must remain explicit. Missing proof becomes UNKNOWN rather than inferred PASS.

## Exit criteria

- real current UCP/AP2 shapes used: PASS
- placeholder M1 protocol labels removed from production path: PASS
- adapter provenance/version metadata: PASS
- deterministic artifact hashes: PASS
- exact-state binding has explicit evidence gate: PASS
- SDK path: PASS
- CLI path: PASS
- JSON output: PASS
- stable documented exit codes: PASS
- end-to-end tests: PASS
- GitHub Actions green: PASS

## Next milestone

Proceed to M7 — production CI integration and developer packaging discipline.

M7 must make TimeProofs safe to consume in CI without turning the project into a generic dashboard. It should freeze public CLI behavior, exit-code policy, machine output contract, GitHub Action integration, artifact/report retention boundaries and package/release readiness.