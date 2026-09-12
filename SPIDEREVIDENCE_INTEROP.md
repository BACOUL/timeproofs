# SpiderEvidence ↔ TimeProofs Interoperability Contract

Status: **G0 PLANNING CONTRACT v0.1 / NO RUNTIME INTEGRATION AUTHORIZED**

Last reviewed: 2026-09-12

## 1. Purpose

Define how SpiderEvidence and TimeProofs may interoperate while preserving strict separation of concerns.

```txt
TimeProofs:
What temporal properties can be independently proven?

SpiderEvidence:
What do the available pieces of evidence justify concluding?
```

Neither engine is trusted merely because both are operated by the same owner.

## 2. Core rule

SpiderEvidence may consume a TimeProofs `TemporalReceipt` only after verifying the receipt according to its declared verification profile.

A TimeProofs receipt is **temporal evidence**, not an epistemic conclusion.

TimeProofs may not import a SpiderEvidence Finding as a temporal fact unless an independently valid temporal proof basis exists.

## 3. Initial SpiderEvidence use cases

### U1 — Existence before event

SpiderEvidence asks whether artifact A can be proven to have existed before event/time boundary B.

Candidate call:

```txt
proveExistence(artifact=A, before=B)
```

Possible TimeProofs response:

```txt
PROVEN
NOT_PROVEN
INSUFFICIENT_ASSURANCE
VERIFICATION_UNAVAILABLE
```

SpiderEvidence must preserve the distinction between `NOT_PROVEN` and `DID_NOT_EXIST`.

### U2 — Temporal ordering

SpiderEvidence asks whether A precedes B.

Candidate call:

```txt
proveOrder(A, B)
```

Possible response:

```txt
PROVEN: A_PRECEDES_B
PROVEN: B_PRECEDES_A
ORDER_UNDETERMINED
CONFLICTING_PROOFS
```

SpiderEvidence may use proven order as evidence but must not convert order into causation.

### U3 — Version/state history

SpiderEvidence asks which version/state receipts exist for a resource across a relevant interval.

Candidate call:

```txt
history(subject, interval)
```

The result must expose observation gaps and must not imply continuous unchanged state between checkpoints.

### U4 — Verify receipt submitted as evidence

A user/source provides a TimeProofs receipt to SpiderEvidence.

SpiderEvidence calls:

```txt
verify(receipt)
```

or uses an independent conforming verifier directly.

Verification output is recorded as provenance for the evidence item.

### U5 — Evidence-gap escalation

SpiderEvidence identifies a temporal Evidence Gap such as:

```txt
Need proof that contract V17 existed before approval A4.
```

It may route this to TimeProofs as a specialized acquisition/verification action.

The TimeProofs result returns to the normal SpiderEvidence evidence-admission path; it does not bypass provenance, source-independence, falsification or Finding review.

## 4. Minimum `TemporalReceipt` handoff envelope

The handoff must expose at least:

```txt
receipt_id
receipt_version
issuer
subject_refs[]
claims[]
proof_basis_refs[]
assurance_vector
limitations[]
verification_profile
signature / verification material
issued_at
supersedes_receipt_ref?
```

SpiderEvidence should retain the original receipt bytes/commitment and verification result rather than only a prose summary.

## 5. Claim mapping

TimeProofs claim | SpiderEvidence interpretation boundary
---|---
`OBSERVED_AT` | evidence that an observer recorded X at T under stated assurance; not truth of X
`EXISTED_BEFORE` | evidence of temporal existence bound; not creation time or truth
`STATE_AT` | evidence of observed/attested state; not continuous validity
`PRECEDES` | evidence of order; not causation or knowledge
`SUPERSEDES` | evidence of version succession; not proof every actor knew the new version
`ACTION_BOUND_TO_CONTEXT` | evidence of recorded action dependencies; not proof action was substantively justified

## 6. Provenance requirements

When SpiderEvidence ingests a TimeProofs receipt, it must preserve:

- original receipt digest;
- receipt issuer;
- external anchor/provider identities;
- verification profile/version;
- verification software/version;
- verification time;
- exact TemporalClaims consumed;
- failure/degraded states;
- conversion/adaptation history;
- limitations relevant to the investigation.

## 7. No privileged trust

Forbidden:

```txt
if issuer == TimeProofs then trusted = true
```

Required:

```txt
receipt -> verifier -> structured verification state -> SpiderEvidence evidence reasoning
```

A valid TimeProofs signature is only one verification step; external anchors/source attestations must be verified when the claim depends on them.

## 8. Failure handling

SpiderEvidence must preserve TimeProofs failure states such as:

```txt
NOT_PROVEN
CONFLICTING_PROOFS
VERIFICATION_UNAVAILABLE
INSUFFICIENT_ASSURANCE
ORDER_UNDETERMINED
STATE_UNDERDETERMINED
INVALID_PROOF
```

These states may open or preserve SpiderEvidence Evidence Gaps.

They must never be normalized into a false binary `false`.

## 9. Privacy boundary

SpiderEvidence should request only the proof material needed for the investigation.

TimeProofs should support commitments/selective disclosure so that temporal proof does not require unnecessary publication of sensitive evidence.

Neither engine may leak private content through public transparency anchors.

## 10. Future agent orchestration

A general-purpose agent may independently call both engines:

```txt
Agent
  -> SpiderEvidence: investigate claim
  -> TimeProofs: prove temporal dependency
  -> SpiderEvidence: consume verified TemporalReceipt
  -> Agent: receive governed investigation result
```

Or SpiderEvidence may call TimeProofs as a specialist temporal-proof provider when routing permits.

Both paths must preserve the same canonical semantics.

## 11. Joint benchmark

After TimeProofs passes its bounded temporal benchmark and SpiderEvidence reaches the appropriate real-case stage, a joint test should compare:

```txt
same investigation agent + SpiderEvidence
vs
same investigation agent + SpiderEvidence + TimeProofs
```

on investigations where temporal proof is genuinely material.

The joint system should only claim value if TimeProofs measurably improves temporal evidence quality, avoids false chronology, or reduces unresolved temporal gaps without degrading SpiderEvidence's evidence/provenance safeguards.

## 12. Current execution boundary

This document authorizes no runtime coupling today.

No TimeProofs dependency should be introduced into SpiderEvidence's active scientific engine merely because this interop contract exists.

Integration belongs after both sides reach the relevant validated gate.
