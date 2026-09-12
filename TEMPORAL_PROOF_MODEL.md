# TimeProofs Canonical Temporal Proof Model

Status: **G0 FROZEN SEMANTIC MODEL v0.1 / IMPLEMENTATION NOT YET AUTHORIZED**

Last reviewed: 2026-09-12

Authority: `CONSTITUTION.md`.

## 1. Purpose

Define the canonical semantics that TimeProofs must preserve independently of cryptographic provider, timestamp service, transparency log, agent framework or storage engine.

TimeProofs models **temporal evidence**, not truth.

## 2. Core objects

### `Subject`

A stable logical thing whose states/artifacts/observations may change over time.

Examples:

- document identity;
- URL/resource;
- API object;
- database record;
- account;
- policy;
- authorization;
- agent action target;
- software release;
- investigation artifact.

A Subject is not itself proof.

### `Artifact`

An immutable byte-level or canonicalized content object identified by a cryptographic digest and canonicalization profile.

Minimum fields:

```txt
artifact_id
subject_id?
content_digest
digest_algorithm
canonicalization_profile
media_type?
size?
locator?
```

Changing the canonical bytes creates a new Artifact.

### `Observation`

A record that an identified observer obtained or received a particular artifact/state through a particular acquisition path.

Minimum concepts:

```txt
observation_id
subject_id
artifact_id or state_commitment
observer_identity
observation_time
observation_time_kind
source_identity / locator
acquisition_method
component/version
source_attestation_ref?
previous_observation_ref?
```

An Observation does not by itself prove that the observed content was true.

### `StateCheckpoint`

A commitment to a canonical state representation of a Subject at an observation/attestation boundary.

```txt
checkpoint_id
subject_id
state_commitment
state_schema
observed_or_attested_at
basis_refs[]
previous_checkpoint_ref?
```

A checkpoint does not imply continuity between checkpoints.

### `Transition`

A proof-linked relation between two checkpoints/versions.

```txt
transition_id
subject_id
from_checkpoint
to_checkpoint
transition_time_or_bounds
basis_refs[]
```

A Transition may establish succession/order without establishing cause.

### `TemporalAnchor`

An independently verifiable external proof or attestation constraining time/order.

Examples:

- RFC 3161 token;
- qualified electronic timestamp;
- SCITT receipt / transparency inclusion;
- public timestamp anchor;
- signed source receipt;
- append-only-log inclusion proof;
- trusted monotonic sequence;
- other versioned mechanism.

Minimum concepts:

```txt
anchor_id
anchor_type
commitment
issuer/service identity
claimed_time_or_order
verification_material
policy/profile
algorithm/version
```

### `TemporalClaim`

The exact proposition TimeProofs is attempting to establish.

Initial claim types:

```txt
OBSERVED_AT
EXISTED_BEFORE
STATE_AT
PRECEDES
FOLLOWS
SUPERSEDES
ACTION_BOUND_TO_CONTEXT
```

Every claim references its subject/object(s), time/bounds, proof basis and limitations.

### `ActionContext`

The exact material temporal dependencies on which an agent action relied.

```txt
action_context_id
action_ref
agent_identity
material_dependency_refs[]
policy_refs[]
revalidation_requirements[]
context_commitment
bound_at
```

A dependency may be an Artifact, Observation, StateCheckpoint, authorization, source-attested value or another verified receipt.

### `RevalidationAssessment`

A policy-scoped assessment of whether a prior dependency can still be relied on at a later action boundary.

Canonical states:

```txt
CURRENT_UNDER_POLICY
REVALIDATION_REQUIRED
STALE
SUPERSEDED
REVOKED
UNVERIFIABLE
POLICY_UNDEFINED
```

Freshness is not intrinsic to the data. It is evaluated against an explicit resource/action policy.

### `TemporalReceipt`

Portable signed evidence object binding one or more TemporalClaims to exact proof material.

Required concepts:

```txt
receipt_id
receipt_version
issuer_identity
subject_refs[]
claim_refs[]
proof_basis_refs[]
assurance_vector
limitations[]
issued_at
signature/material
verification_profile
supersedes_receipt_ref?
```

A TemporalReceipt must remain independently verifiable to the extent claimed by its verification profile.

### `VerificationRecord`

A versioned result of verifying a receipt/anchor under a particular verifier policy and software version.

```txt
verification_id
receipt_or_anchor_ref
verifier_identity/software
verified_at
policy_version
result
failure_reasons[]
```

Verification status can change when keys, certificates, algorithms or trust policies change without mutating the original receipt.

## 3. Time representations

TimeProofs must distinguish at least:

```txt
CALLER_DECLARED_TIME
OBSERVER_CLOCK_TIME
SOURCE_ATTESTED_TIME
TRUSTED_TIMESTAMP_TIME
TRANSPARENCY_LOG_ORDER
MONOTONIC_SEQUENCE
BOUNDED_INTERVAL
UNKNOWN
```

A wall-clock timestamp and a logical order are different proof types.

Where clock comparability is not justified, TimeProofs must not infer total ordering solely from displayed timestamp values.

## 4. Assurance is multidimensional

TimeProofs must not collapse all evidence into one misleading scalar confidence score.

The canonical `assurance_vector` should preserve at minimum:

### Integrity assurance

```txt
NONE
DIGEST_ONLY
SIGNED
SIGNED_AND_ANCHORED
```

### Source assurance

```txt
SELF_DECLARED
OBSERVER_IDENTIFIED
SOURCE_SIGNED
SOURCE_ATTESTED_SESSION
MULTI_SOURCE_ATTESTED
```

### Time assurance

```txt
DECLARED
OBSERVER_CLOCK
SIGNED_SOURCE_TIME
INDEPENDENTLY_ANCHORED
MULTI_ANCHORED
```

### Ordering assurance

```txt
NONE
CLOCK_DERIVED
SEQUENCE_DERIVED
CHAIN_DERIVED
TRANSPARENCY_DERIVED
COMPOSED_PROOF
```

These are descriptive categories, not a universal ranking. Different applications may require different dimensions.

## 5. Claim semantics

### `OBSERVED_AT(O, X, T)`

Means: observer `O` recorded artifact/state `X` with an observation-time claim `T` under the disclosed time provenance.

Does not mean `X` was objectively true at T.

### `EXISTED_BEFORE(X, T)`

Means: the proof graph contains an independently justified upper temporal bound establishing that `X` existed no later than `T`.

Does not identify creation time.

### `STATE_AT(S, X, T)`

Means: the specified state `X` of subject `S` was observed/attested at T under the disclosed assurance vector.

Does not imply continuous validity before/after T.

### `PRECEDES(A, B)`

Means: the proof graph establishes an order relation A before B under a disclosed mechanism.

If the graph only shows overlapping intervals or incomparable clocks, result is `ORDER_UNDETERMINED`.

### `SUPERSEDES(B, A)`

Means: B is validly linked as a later version/state succeeding A under the relevant version/state model.

Does not imply every consumer learned about B immediately.

### `ACTION_BOUND_TO_CONTEXT(A, C)`

Means: action A is cryptographically/structurally bound to exact context C, containing the material dependencies the agent reports or is required to record.

It does not prove that C was complete unless a separate completeness policy is satisfied.

## 6. Proof graph

Canonical reasoning should operate over a graph:

```txt
Subject
  -> Artifact / StateCheckpoint
  -> Observation
  -> TemporalAnchor
  -> TemporalClaim
  -> TemporalReceipt
  -> VerificationRecord
```

Additional edges include:

```txt
observed
attested_by
anchored_by
precedes
supersedes
bound_to_action
verified_by
derived_from
revoked_by
invalidated_by
```

Derived claim edges must always retain their complete proof path.

## 7. Proof composition rules

Composition may strengthen a claim only when the semantics of the component proofs actually compose.

Examples:

- source provenance + independent timestamp may establish stronger `OBSERVED_AT` / `EXISTED_BEFORE` semantics than either alone;
- two independent anchors may improve resilience but do not automatically prove source authenticity;
- a signed sequence may prove order without proving wall-clock time;
- two wall-clock timestamps from unrelated untrusted clocks do not necessarily prove order;
- an action receipt plus a state receipt may establish action-context binding only if the binding commitment is explicit.

## 8. Negative evidence boundary

By default TimeProofs does not prove non-occurrence.

A claim such as `DID_NOT_OCCUR_WITHIN [T1,T2]` is permitted only if all of the following are explicit:

- observation domain is finite/bounded;
- coverage is complete under a defined mechanism;
- omission/failure detection is sufficient for the claim;
- the verifier can check the coverage basis.

This is outside the initial v0.1 claim set.

## 9. Freshness model

Freshness requires:

```txt
resource class
observation/attestation time
validity/revocation information
freshness policy
current action time/boundary
known supersession/change evidence
```

No global TTL is valid for all resources.

A freshness policy may be:

- fixed maximum age;
- valid-until field;
- event-driven invalidation;
- source-specific revalidation;
- authorization validity interval;
- monotonic version expectation;
- policy combination.

## 10. Minimal verification outcomes

```txt
PROVEN
NOT_PROVEN
CONFLICTING_PROOFS
VERIFICATION_UNAVAILABLE
INSUFFICIENT_ASSURANCE
ORDER_UNDETERMINED
STATE_UNDERDETERMINED
INVALID_PROOF
```

Freshness/action-context assessments add:

```txt
CURRENT_UNDER_POLICY
REVALIDATION_REQUIRED
STALE
SUPERSEDED
REVOKED
UNVERIFIABLE
```

## 11. Privacy model

Canonical receipts should prefer commitments and selective disclosure over raw sensitive content.

The receipt must make clear whether verification requires:

- raw artifact;
- disclosed fields;
- Merkle/proof openings;
- source-session proof;
- external service query;
- public transparency lookup.

## 12. Interoperability rule

External evidence must be wrapped/adapted without losing original semantics.

TimeProofs must retain:

- original proof format/profile;
- issuer/service identity;
- verification material;
- algorithm/version;
- original temporal semantics;
- conversion/adaptation provenance.

Normalization must never pretend that all external proof mechanisms provide the same guarantees.

## 13. Model success condition

This model is successful only if it can represent the strongest practical external mechanisms while preventing semantic overclaiming and enabling TARB evaluation.

It is a canonical semantics layer, not a new cryptographic protocol.
