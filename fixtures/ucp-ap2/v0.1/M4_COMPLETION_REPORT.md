# TimeProofs — M4 Completion Report

Status: COMPLETE
Date: 2026-08-11
Branch: `relaunch/invariant-engine`

## Outcome

The first UCP↔AP2 fixture corpus is now source-controlled before Verify engine implementation.

Artifacts:
- `fixtures/ucp-ap2/v0.1/README.md`
- `fixtures/ucp-ap2/v0.1/manifest.json`
- seven human-inspectable case files covering PASS/BLOCK/UNKNOWN behavior

## Frozen cases

1. `pass_exact_projection.json` → aggregate PASS
2. `block_amount_mismatch.json` → TP-CX-001 BLOCK
3. `block_currency_mismatch.json` → TP-CX-002 BLOCK; amount comparison UNKNOWN because cross-currency transformation is unsupported
4. `unknown_missing_checkout.json` → MISSING_OBJECT
5. `unknown_unsupported_version.json` → UNSUPPORTED_VERSION
6. `unknown_missing_authoritative_total.json` → MISSING_EVIDENCE
7. `unknown_fx_transformation.json` → UNSUPPORTED_TRANSFORMATION

## Reproducibility

Each supplied ProtocolObject fixture carries a SHA-256 snapshot over its canonical JSON fixture payload. The fixture profile labels are deliberately internal test labels until M6 freezes exact machine-recognizable protocol version identifiers.

## Important semantics locked by fixtures

- PASS is not allowed when required evidence is absent.
- A proven BLOCK dominates sibling UNKNOWN results in aggregate decision ordering.
- Currency mismatch is evaluated before same-currency amount equality is treated as meaningful.
- Explicitly declared but unsupported FX does not become a false mismatch; it remains UNKNOWN.
- Missing authoritative UCP grand total is UNKNOWN rather than a recomputed guess.
- Unsupported future versions are UNKNOWN rather than implicitly treated as backwards compatible.

## M4 exit criteria

- fixtures are source-controlled and human-inspectable: PASS
- expected per-invariant outcomes declared: PASS
- aggregate decisions declared: PASS
- UNKNOWN reasons declared: PASS
- BLOCK cases exist for both initial BLOCK-capable invariants: PASS
- unsupported-version fixture exists: PASS
- unsupported-transformation fixture exists: PASS
- corpus can become M5 regression contract: PASS

## Next milestone

Proceed to M5 — Deterministic Verify Engine.

M5 must satisfy the M4 corpus without changing expected semantics. Initial implementation should remain intentionally small:
- fixture/object ingestion;
- profile/version gate;
- exact-state prerequisite interface;
- UCP/AP2 canonical extraction needed only for TP-CX-001/002/003;
- deterministic invariant evaluator;
- UNKNOWN reason propagation;
- aggregate decision;
- machine-readable output.

No auth, billing, hosted database, dashboard or cloud control plane belongs in M5.