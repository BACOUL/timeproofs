# TimeProofs — M5 Deterministic Verify Engine Completion Report

Status: COMPLETE
Date: 2026-08-12
Branch: `relaunch/invariant-engine`

## Outcome

The first executable TimeProofs core is implemented and validated against the frozen M4 regression corpus.

Implemented files:
- `timeproofs-core/index.js`
- `timeproofs-core/tests/run-fixture-regression.mjs`
- `timeproofs-core/README.md`
- root npm command `npm run test:timeproofs-core`
- `.github/workflows/timeproofs-core-regression.yml`

## Implemented deterministic behavior

The initial evaluator handles:
- TP-CX-003 exact-authorized-state prerequisite interface;
- TP-CX-002 currency projection;
- TP-CX-001 authoritative grand-total projection;
- supported-profile/version gating;
- structured UNKNOWN propagation;
- unsupported transformation handling;
- deterministic aggregate ordering `BLOCK > UNKNOWN > WARN > PASS`;
- stable reason codes and UNKNOWN reasons;
- machine-readable result output.

M5 deliberately does not claim to perform full AP2 cryptographic binding verification. That belongs to the real protocol adapter layer in M6.

## Regression hardening

The regression runner verifies:
- aggregate decision;
- per-invariant status;
- explicit `unknown_reasons` declared by fixtures;
- explicit `reason_codes` declared by fixtures;
- every UNKNOWN carries an UNKNOWN reason;
- non-UNKNOWN results do not carry an UNKNOWN reason.

During release validation, the stricter runner exposed one semantic mismatch in the initial implementation: when currencies differ, TP-CX-001 must remain UNKNOWN with `UNSUPPORTED_TRANSFORMATION` according to the frozen M4 contract rather than use a generic ambiguity reason. The engine was corrected; the fixture contract was not weakened.

## CI proof

GitHub Actions workflow: `TimeProofs Core Regression`

Validated run:
- run id: `31543423839`
- head commit: `28d1eaeae88628749c323e2b1d3c29be78e0e05f`
- environment: GitHub-hosted Ubuntu runner, Node 22
- conclusion: `success`

The first CI attempt failed before tests because npm caching was configured without a lockfile. The workflow was corrected by removing the invalid cache requirement. The subsequent run completed successfully.

## M5 exit criteria

- frozen M4 corpus executes successfully: PASS
- PASS/BLOCK/UNKNOWN expectations satisfied: PASS
- UNKNOWN reasons checked: PASS
- reason codes checked: PASS
- deterministic aggregation implemented: PASS
- no LLM authority in evaluation: PASS
- engine remains small and local: PASS
- no auth/billing/database/dashboard/cloud work added: PASS
- CI regression guard exists and is green: PASS

## Known boundary entering M6

The M4 fixtures use temporary research profile identifiers such as `ucp-current-m1` and `ap2-v0.2-m1`. These are not production protocol-version identifiers.

M6 must replace research-profile assumptions with real, machine-recognizable UCP/AP2 adapters, exact version/profile detection, raw artifact parsing, canonical extraction, integrity/binding verification where protocol-native, artifact snapshots, and developer-facing CLI/SDK input handling.

## Next milestone

Proceed to M6 — UCP/AP2 adapters + CLI/SDK.

M6 must not move protocol parsing into the generic core. Adapters own source recognition/canonicalization; the core owns deterministic graph/invariant evaluation.
