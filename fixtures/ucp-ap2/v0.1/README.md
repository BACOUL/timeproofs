# TimeProofs UCP ↔ AP2 Fixture Corpus v0.1

Status: M4 source-of-truth corpus

These fixtures define expected behavior for the first executable TimeProofs UCP↔AP2 artifact profile before the Verify engine is implemented.

## Principles

- human-inspectable and source-controlled;
- expected results are declared before engine code;
- source-like artifacts are preserved inside each case;
- every object carries a deterministic SHA-256 snapshot over the canonical JSON fixture payload;
- UNKNOWN must carry an explicit machine reason;
- implementation must satisfy fixtures and must not weaken M3 semantics to make tests pass.

## Fixture profile identifiers

Until M6 adapter work freezes exact machine-recognizable protocol revision IDs, fixtures use the semantic profile labels:

- `ucp-current-m1`
- `ap2-v0.2-m1`

These are fixture profile labels, not claims that the strings are official protocol version identifiers.

`ucp-future-unknown` and `ap2-future-unknown` deliberately model unsupported future versions.

## Cases

1. `pass_exact_projection.json`
2. `block_amount_mismatch.json`
3. `block_currency_mismatch.json`
4. `unknown_missing_checkout.json`
5. `unknown_unsupported_version.json`
6. `unknown_missing_authoritative_total.json`
7. `unknown_fx_transformation.json`

## Expected aggregation

Default decision precedence:

`BLOCK > UNKNOWN > WARN > PASS`

However, an invariant that is not applicable after a prior blocking currency mismatch may return UNKNOWN with `UNSUPPORTED_TRANSFORMATION`; the aggregate remains BLOCK because the proven currency violation dominates.

## Regression contract

M5 must reproduce the exact expected invariant statuses and aggregate decision for these cases. M6 adapters may refine artifact parsing/version recognition, but any fixture expectation change requires an explicit pack-spec decision.
