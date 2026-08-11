# UCP ↔ AP2 Pack Compatibility

Status: M3 specification

## Rule

TimeProofs evaluations must be reproducible. Production evaluation MUST NOT record `latest` as a protocol, adapter or pack version.

## M3 position

M1 verified the current semantic fields needed to design the pack, but M6 adapter implementation owns exact machine-recognizable schema/version identifiers.

Therefore M3 deliberately does not invent version strings that the adapters cannot yet prove from supplied artifacts.

## Required adapter behavior

An adapter must:

1. recognize the artifact family and supported schema/spec profile;
2. record its own adapter version;
3. expose the source protocol/schema version when determinable;
4. preserve raw evidence;
5. reject or mark unsupported an unknown profile;
6. never silently map an unknown future schema as a known one.

## Evaluation behavior

- supported exact profile → invariant may evaluate;
- recognized but unsupported profile → UNKNOWN/UNSUPPORTED;
- absent version metadata where profile cannot be proven safely → UNKNOWN;
- future profile with explicit backwards-compatible adapter proof → allowed only after compatibility matrix update and regression fixtures.

## Initial matrix

| Surface | M3 semantic support | Executable support |
|---|---|---|
| UCP Checkout authoritative total/currency | specified | pending M6 adapter |
| AP2 PaymentMandate payment amount/currency | specified | pending M6 adapter |
| AP2 exact checkout binding | specified as prerequisite | pending M6 adapter |
| AP2 PaymentReceipt | modeled for evidence closure | provider amount proof not available from receipt alone |
| UCP Order lifecycle | modeled | pending lifecycle profile |

Exact version identifiers will be added before a pack release can be called production-supported.