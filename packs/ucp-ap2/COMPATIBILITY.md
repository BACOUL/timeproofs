# UCP ↔ AP2 Pack Compatibility

Status: executable through M7
Last reviewed: 2026-08-12

## Rule

TimeProofs evaluations must be reproducible. Production evaluation MUST NOT record `latest` as a protocol, adapter or pack version.

A supported profile is a deliberate compatibility claim backed by:

- a recognized machine profile/version;
- adapter mappings;
- invariant semantics;
- regression fixtures;
- an audited upstream snapshot or equivalent immutable reference;
- explicit behavior for missing/unsupported evidence.

An unknown future profile is never silently treated as compatible.

## Current supported executable matrix

| Surface | Supported profile | Executable status | Notes |
|---|---|---|---|
| UCP Checkout | protocol version `2026-04-08`, capability `dev.ucp.shopping.checkout` | SUPPORTED | authoritative `totals[type=total]` and checkout currency consumed by current adapter |
| AP2 PaymentMandate | VCT `mandate.payment.1` | SUPPORTED | payment amount/currency consumed by current adapter |
| AP2 exact checkout binding | SHA-256/base64url transaction binding used by current M6/M7 profile | SUPPORTED WITH EXPLICIT EVIDENCE | exact checkout proof/JWT must be supplied; identifier presence alone is insufficient |
| AP2 PaymentReceipt | current research model only | NOT BLOCK-CAPABLE | receipt alone is not treated as proof of executed amount |
| UCP Order lifecycle | modeled conceptually | NOT EXECUTABLE | deferred to lifecycle profile work |
| FX/tips/incremental authorization/partial capture/split settlement/marketplace payout | no frozen compatibility profile | UNKNOWN | unsupported transformation must not be coerced into PASS/BLOCK projection equality |

## Audited upstream snapshots

The repository records upstream schema locks in `protocols/upstream-lock.json` and checks them with `scripts/check-upstream-protocol-lock.mjs` plus `.github/workflows/timeproofs-upstream-watch.yml`.

Current audited source snapshots were captured from:

- UCP Checkout schema blob `e9093b0c9c6294638e3e51ce3c38ef95ea428102`;
- AP2 PaymentMandate schema blob `fa93b0dfd4cb50a00ecff22daa9033aa9fa6fab9`.

A change to an upstream watched schema is a review trigger, not automatic compatibility.

## Required adapter behavior

An adapter must:

1. recognize the artifact family and supported schema/spec profile;
2. record its own adapter version;
3. expose the source protocol/schema version when determinable;
4. preserve local provenance;
5. reject or mark unsupported an unknown profile;
6. never silently map an unknown future schema as a known one;
7. require explicit evidence for claims such as exact-state cryptographic binding.

## Evaluation behavior

- supported exact profile + sufficient evidence → invariant may evaluate PASS/BLOCK/WARN;
- recognized but unsupported profile → explicit unsupported/UNKNOWN behavior;
- missing evidence → UNKNOWN with structured reason;
- unsupported transformation → UNKNOWN;
- future profile → requires compatibility review, updated matrix and regression fixtures before support is claimed.

## Change rule

An upstream schema change, adapter semantic change, new transformation profile or new BLOCK-capable invariant requires a compatibility review. No compatibility line becomes green because a parser happens to accept the JSON shape.
