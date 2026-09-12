# TimeProofs Reliance Decision Model

Status: **RESEARCH MODEL v0.1 / NOT YET PRODUCT VALIDATED**

Last reviewed: 2026-09-12

Authority: `PRIMARY_OBJECTIVE.md`, `CONSTITUTION.md`.

## 1. Core question

TimeProofs should not answer a vague question such as:

> Is this document good?

It should answer the machine-actionable question:

> **Can this exact object be relied on for this exact intended use under this explicit policy, and which properties are actually proven?**

The canonical research primitive is:

```txt
assessForUse(object, intended_use, policy, agent_context?)
```

## 2. Object scope

`object` may represent any external dependency an agent may rely on, including:

- document;
- file;
- webpage/resource;
- API response;
- database state;
- price/quote;
- policy;
- authorization/delegation;
- email/message;
- image/media artifact;
- software/package/release;
- credential/certificate;
- result emitted by another agent;
- structured claim;
- model/tool output that carries verifiable provenance;
- physical-world observation represented by an attested digital record.

TimeProofs evaluates the verifiable properties of the object/dependency, not the factual truth of all semantic claims contained inside it.

## 3. Intended use is mandatory

A reliance verdict is meaningless without use context.

Representative action classes:

```txt
READ_ONLY_SUMMARY
INTERNAL_ANALYSIS
PUBLICATION
LEGAL_RELIANCE
SIGN_CONTRACT
MAKE_PAYMENT
CHANGE_ACCESS
DELETE_RESOURCE
EXECUTE_CODE
SAFETY_CRITICAL_ACTION
CUSTOM_POLICY_ACTION
```

These are examples, not a frozen taxonomy.

## 4. Policy contract

A policy declares the minimum properties required for the intended use.

Example:

```yaml
policy_id: high_value_payment_v1
requires:
  integrity: VERIFIED
  source_identity: VERIFIED
  authenticity: VERIFIED
  freshness_max_age: 30s
  current_version: REQUIRED
  revocation_check: REQUIRED
  authorization: REQUIRED
  conflicts: NONE
  independent_time: REQUIRED
on_unknown: BLOCK
```

Policies must be versioned and inspectable.

## 5. Canonical evidence dimensions

Each dimension is independent unless an explicit composition rule says otherwise.

### Integrity

Candidate states:

```txt
VERIFIED
MISMATCH
NOT_CHECKED
UNVERIFIABLE
```

### Source identity

```txt
VERIFIED
CLAIMED_ONLY
MISMATCH
UNKNOWN
```

### Authenticity

```txt
VERIFIED
PARTIALLY_VERIFIED
UNVERIFIED
FAILED
```

### Provenance

```txt
COMPLETE_FOR_POLICY
PARTIAL
BROKEN
UNKNOWN
```

### Temporal evidence

```txt
INDEPENDENTLY_ANCHORED
SOURCE_ATTESTED
OBSERVER_RECORDED
CALLER_DECLARED
UNKNOWN
```

### Freshness/currentness

```txt
CURRENT_UNDER_POLICY
STALE
REVALIDATION_REQUIRED
UNKNOWN
```

### Version/supersession

```txt
CURRENT_VERSION_PROVEN
NO_NEWER_VERSION_OBSERVED
SUPERSEDED
SUPERSESSION_UNKNOWN
```

### Revocation

```txt
NOT_REVOKED_UNDER_CHECKED_DOMAIN
REVOKED
REVOCATION_UNKNOWN
CHECK_UNAVAILABLE
```

### Authorization

```txt
AUTHORIZED_FOR_USE
OUT_OF_SCOPE
EXPIRED
REVOKED
UNVERIFIED
NOT_APPLICABLE
```

### Conflict state

```txt
NONE_FOUND_UNDER_CHECKED_DOMAIN
CONFLICTING_PROOFS
SOURCE_CONFLICT
VERSION_CONFLICT
AUTHORITY_CONFLICT
UNKNOWN
```

## 6. Top-level reliance verdicts

The top-level verdict is policy-derived, never a free-form model opinion.

```txt
TRUSTED_FOR_USE
USE_WITH_CAUTION
REVALIDATION_REQUIRED
INSUFFICIENT_EVIDENCE
UNVERIFIED_SOURCE
SUPERSEDED
REVOKED
INTEGRITY_FAILED
CONFLICTING_PROOFS
UNAUTHORIZED_FOR_USE
DO_NOT_USE
```

### `TRUSTED_FOR_USE`

Means only:

> All blocking requirements of policy P for intended use U were satisfied at evaluation boundary T by the disclosed verification evidence.

It does **not** mean:

- content is factually true;
- source is generally trustworthy;
- use is legally/safely correct in every context;
- verdict remains valid indefinitely.

### `USE_WITH_CAUTION`

Permitted only where policy explicitly allows non-blocking uncertainty.

The response must expose exactly what remains uncertain.

### `REVALIDATION_REQUIRED`

A previously acceptable dependency can no longer be treated as current under the policy without another check.

### `DO_NOT_USE`

A policy-blocking condition is established or unresolved under a fail-closed policy.

The blocking reason must be machine-readable.

## 7. Decision algorithm

Conceptually:

```txt
1. Resolve exact object identity/commitment.
2. Resolve intended use and policy version.
3. Collect available proof material.
4. Verify each required dimension independently.
5. Detect conflicts and invalid proof paths.
6. Evaluate currentness/revocation/supersession at decision boundary.
7. Apply fail-open/fail-closed policy rules.
8. Emit verdict + dimension vector + proof refs + expiry/revalidation conditions.
```

No LLM-generated prose may override the canonical structured decision.

## 8. Canonical response shape

Research example:

```json
{
  "assessment_id": "tpa_...",
  "object_ref": "obj_...",
  "intended_use": "SIGN_CONTRACT",
  "policy": {
    "id": "contract_signing_high_assurance",
    "version": "1.0"
  },
  "evaluated_at": "2026-09-12T20:00:00Z",
  "verdict": "REVALIDATION_REQUIRED",
  "dimensions": {
    "integrity": "VERIFIED",
    "source_identity": "VERIFIED",
    "authenticity": "VERIFIED",
    "provenance": "COMPLETE_FOR_POLICY",
    "temporal_evidence": "INDEPENDENTLY_ANCHORED",
    "freshness": "STALE",
    "version": "NO_NEWER_VERSION_OBSERVED",
    "revocation": "REVOCATION_UNKNOWN",
    "authorization": "AUTHORIZED_FOR_USE",
    "conflicts": "NONE_FOUND_UNDER_CHECKED_DOMAIN"
  },
  "blocking_reasons": [
    "FRESHNESS_POLICY_EXCEEDED",
    "REVOCATION_STATUS_REQUIRED"
  ],
  "required_actions": [
    "REVALIDATE_SOURCE",
    "CHECK_REVOCATION"
  ],
  "proof_refs": ["..."],
  "limitations": ["..."],
  "valid_until": null
}
```

## 9. Anti-score rule

A single number such as `trust_score = 87` must never be the authoritative output.

If a convenience score is ever exposed, it must be secondary and may not mask blocking failures.

Example:

```txt
Integrity failed + score 92/100
```

must still yield a blocking verdict, not an average pass.

## 10. Truth boundary

Example:

A signed, current, non-revoked report issued by Company X can receive:

```txt
TRUSTED_FOR_USE
```

for the policy question "is this the authentic current report issued by Company X?"

That verdict does **not** establish that the report's claim "revenue grew 30%" is true.

That semantic question may be handed to SpiderEvidence.

## 11. Re-evaluation boundary

A reliance assessment is revision-like and time-scoped.

Any of the following may require a new assessment:

- freshness window expires;
- source state changes;
- new version appears;
- revocation status changes;
- key/certificate trust changes;
- authorization changes;
- policy changes;
- conflicting proof arrives;
- cryptographic mechanism is deprecated/compromised.

The original receipt/assessment remains auditable.

## 12. Success condition

This model succeeds only if it lets an agent make materially safer reliance decisions without pretending TimeProofs knows whether all content is true.

The decisive benchmark question is:

```txt
Does assessForUse() reduce materially unsafe reliance compared with
strong existing agent + standards + platform baselines?
```
