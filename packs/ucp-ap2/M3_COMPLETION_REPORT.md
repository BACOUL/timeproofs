# TimeProofs — M3 Completion Report

Status: COMPLETE
Date: 2026-08-11
Branch: `relaunch/invariant-engine`

## Outcome

The first TimeProofs pack has been specified without broadening the company thesis or pretending unsupported evidence exists.

Artifacts:
- `packs/ucp-ap2/SPEC.md`
- `packs/ucp-ap2/manifest.json`
- `packs/ucp-ap2/COMPATIBILITY.md`

## Frozen executable target for first implementation

The first artifact-only executable path is intentionally three-part:

1. TP-CX-003 establishes/preserves the exact authorized checkout state relation using protocol-native binding semantics.
2. TP-CX-002 verifies currency projection.
3. TP-CX-001 verifies authoritative grand-total projection.

Only TP-CX-001 and TP-CX-002 are TimeProofs cross-object BLOCK-capable rules in the initial artifact profile. TP-CX-003 is a prerequisite and may surface a separate CONFORMANCE failure/UNKNOWN depending on adapter evidence.

## Deferred but modeled

- TP-EV-001 execution-vs-approved payment requires provider/network evidence.
- TP-LC-001 order reconciliation requires placement-time/lifecycle semantics.
- TP-LC-002 cancellation/invalidation requires freshness/source-of-truth semantics.
- TP-EV-002 reports evidence-chain completeness according to selected mode/profile.

## Safety decisions

- no guessed FX handling;
- no naive merchant/payee name matching;
- no hard-coded checkout total reconstruction;
- no claim that PaymentReceipt proves executed amount/currency;
- no final Order==Checkout equality;
- no use of `latest` in reproducible production metadata.

## M3 exit criteria

- pack SPEC exists: PASS
- manifest exists: PASS
- invariant IDs/classes/policies frozen: PASS
- compatibility/version policy exists: PASS
- initial BLOCK-capable set is narrow and explicit: PASS
- limitations and transformations are explicit: PASS
- pack maps to M2 primitives without changing core model: PASS

## Next milestone

Proceed to M4 — Fixture corpus and regression harness design.

M4 must create human-inspectable fixtures before engine implementation. At minimum the executable target requires:

- exact-state + amount/currency PASS;
- amount mismatch BLOCK;
- currency mismatch BLOCK;
- missing exact referenced checkout UNKNOWN;
- unsupported/unknown profile UNKNOWN;
- missing authoritative total UNKNOWN;
- unsupported FX/transformation UNKNOWN;
- regression expectations declaring invariant results and aggregate decision.

No engine implementation should redefine M3 semantics to make fixtures pass.