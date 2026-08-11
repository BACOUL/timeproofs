# TimeProofs — Decision Model

Status: M2.1 hardened canonical model

## Purpose

TimeProofs decisions are deterministic conclusions over explicit objects, bindings, invariant definitions, and evidence.

Primary states remain exactly:

- `PASS`
- `WARN`
- `BLOCK`
- `UNKNOWN`

There is no primary numeric score and there is no fifth public verdict for compatibility.

## InvariantDefinition

Conceptual structure:

```json
{
  "invariant_id": "TP-CX-001",
  "name": "PAYMENT_TOTAL_PROJECTS_AUTHORIZED_CHECKOUT",
  "class": "CROSS_OBJECT",
  "pack": { "id": "ucp-ap2", "version": "0.1.0" },
  "applies_to": {},
  "inputs": [],
  "predicate": {},
  "evidence_requirements": [],
  "default_on_violation": "BLOCK",
  "default_on_missing_evidence": "UNKNOWN"
}
```

Invariant classes:

- `CONFORMANCE`
- `CROSS_OBJECT`
- `EVIDENCE`
- `LIFECYCLE`
- `BUSINESS_COMPLETION`
- `RESEARCH`

## EvaluationResult

Every evaluated invariant emits one result. When status is UNKNOWN, `unknown_reason` is mandatory.

```json
{
  "invariant_id": "TP-CX-001",
  "status": "UNKNOWN",
  "unknown_reason": "MISSING_EVIDENCE",
  "reason_code": "AUTHORIZED_CHECKOUT_NOT_AVAILABLE",
  "message": "The exact authorized checkout snapshot required for comparison is unavailable.",
  "evidence_ids": [],
  "evaluated_at": "2026-08-11T09:01:00Z",
  "details": {}
}
```

Initial structured UNKNOWN reasons:

- `MISSING_OBJECT`
- `MISSING_EVIDENCE`
- `UNSUPPORTED_VERSION`
- `UNSUPPORTED_TRANSFORMATION`
- `AMBIGUOUS_BINDING`
- `AMBIGUOUS_MAPPING`
- `STALE_EVIDENCE`
- `SELECTIVE_DISCLOSURE`
- `INSUFFICIENT_LIFECYCLE_CONTEXT`
- `INTEGRITY_UNVERIFIED`
- `OTHER`

For PASS/WARN/BLOCK, `unknown_reason` is null/absent according to the machine schema.

## PASS

Use only when all evidence required by the invariant is present, supported, and the deterministic predicate is satisfied. PASS never means merely "no issue observed".

## BLOCK

Use when the invariant applies to the supplied versions/flow, sufficient evidence exists, the deterministic violation predicate is satisfied, and the pack defines the violation as blocking.

## WARN

Use for a proven condition that is noteworthy but not a hard consistency violation. WARN is not semantic uncertainty.

## UNKNOWN

Use when TimeProofs cannot determine truth safely. UNKNOWN must explain why through `unknown_reason` plus a stable `reason_code`.

Protocol/version incompatibility resolves to `UNKNOWN + UNSUPPORTED_VERSION` in normal evaluation, not to a separate public verdict.

## Overall Decision

Default ordering:

`BLOCK > UNKNOWN > WARN > PASS`

- any BLOCK → overall BLOCK
- else any UNKNOWN → overall UNKNOWN
- else any WARN → overall WARN
- else PASS

A pack may define a narrower documented aggregation rule, but core must never hide UNKNOWN merely because other checks passed.

## Decision reproducibility metadata

Every evaluation bundle identifies:

- `core_schema_version`
- `evaluation_id`
- pack ID/version
- adapter IDs/versions
- evaluated invariant IDs
- result/evidence references
- exact artifact snapshots/digests
- protocol/provider versions
- evaluation timestamp
- policy configuration affecting behavior

## Idempotence / reproducibility

For the same exact artifact snapshots, evidence inputs, pack version, adapter versions, evaluation time/context and policy configuration, TimeProofs MUST return the same result.

If an invariant depends on wall-clock time, effective evaluation time is explicit input.

## Human explanation

Renderers may produce diffs, explanations or remediation hints. They derive from structured results and never determine status.

## Fail-open / fail-closed

This model defines truth status, not deployment policy. A later enforcement integration decides what to do with UNKNOWN at a commit boundary. Core never collapses UNKNOWN prematurely into allow/deny.
