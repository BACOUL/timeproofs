# TimeProofs — Current State

Last updated: 2026-08-12
Branch: `relaunch/invariant-engine`

## Where the project is

**Company:** Cross-Protocol Consistency Infrastructure for agentic transactions.

**Long-term product:** Cross-Protocol Consistency & Invariant Engine.

**Initial wedge:** UCP ↔ AP2 composition consistency focused on semantic/economic cross-object consistency and evidence closure rather than generic protocol conformance.

**Current milestone:** M7 — customer-facing CI integration and package contract.

## Completed milestones

- M0 — product constitution and operating system: COMPLETE
- M1 — UCP/AP2 normative composition audit: COMPLETE
- M2 — canonical transaction model: COMPLETE
- M2.1 — foundation hardening: COMPLETE
- M3 — UCP/AP2 Invariant Pack v0.1 specification: COMPLETE
- M4 — fixture corpus and regression contract: COMPLETE
- M5 — deterministic Verify Engine: COMPLETE
- M6 — real UCP/AP2 adapters + local SDK/CLI: COMPLETE
- M7 — CI integration/package contract: ACTIVE

## Current local product

Implemented production path:
- `adapters/ucp/checkout.js`
- `adapters/ap2/payment-mandate.js`
- `sdk/index.js`
- `cli/timeproofs.js`
- `bin/timeproofs.js`
- `timeproofs-core/canonical.js`
- `verifyTransactionGraph()` in core

Supported initial profiles:
- UCP `2026-04-08` Checkout (`dev.ucp.shopping.checkout`)
- AP2 PaymentMandate VCT `mandate.payment.1`

Developer flow:

`timeproofs verify --checkout checkout.json --payment-mandate payment.json --checkout-jwt '<exact-jwt>'`

Machine JSON is available with `--json`.

Exit codes currently frozen for M7 review:
- 0 PASS/WARN
- 2 BLOCK
- 3 UNKNOWN
- 4 unsupported protocol/profile
- 1 invalid input/runtime error

## Binding behavior

Production TP-CX-003 does not PASS from transaction_id presence alone.

For the supported SHA-256 binding profile, TimeProofs hashes the exact supplied checkout JWT and compares it with AP2 `transaction_id`.

- verified hash → PASS prerequisite
- mismatch → BLOCK
- no checkout JWT → UNKNOWN / INTEGRITY_UNVERIFIED
- unsupported binding algorithm → UNKNOWN

Full SD-JWT/key/signature verification is not yet claimed.

## Provenance

Real adapters create ProtocolObjects with:
- real protocol/profile identifier;
- canonical JSON SHA-256 artifact snapshot;
- raw artifact;
- canonical extraction;
- adapter ID/version;
- mapping provenance;
- optional source ref.

## M6 validation proof

GitHub Actions `TimeProofs Core Regression` runs the complete M4 + M6 suite on Node 22.

Successful run:
- run id `31571347893`
- head `96ddefe88e0486b8d2be25a4a6dcae0b5bf485e4`
- conclusion `success`

See `docs/product/M6_COMPLETION_REPORT.md`.

## Known non-claims

TimeProofs does not yet claim:
- SD-JWT signature/key-binding verification;
- merchant authorization JWS verification;
- arbitrary AP2 hash-algorithm support;
- remote UCP schema composition/validation;
- provider/network execution evidence;
- lifecycle Order verification;
- hosted enforcement.

Missing proof remains UNKNOWN.

## M7 objective

Turn the local CLI/SDK into a safe customer-facing CI contract without adding a dashboard or cloud dependency.

M7 must freeze and test:
1. public CLI interface and backward-compatibility policy;
2. customer-facing GitHub Action;
3. action inputs/outputs;
4. stable exit-code semantics;
5. machine JSON result schema/version;
6. evidence artifact policy without leaking credentials/JWTs;
7. redaction requirements;
8. package/release boundary separating TimeProofs from legacy AgentReady;
9. install/quickstart flow;
10. end-to-end CI examples and green integration tests.

## Legacy boundary

AgentReady-era assets remain temporarily non-canonical. M7 must begin separating public TimeProofs package/release surfaces from legacy package metadata without destructive removal before migration is safe.

## One-line status

> M0–M6 plus M2.1 complete with green real-format adapter/SDK/CLI CI; M7 customer-facing CI integration is active.
