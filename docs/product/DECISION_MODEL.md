# TimeProofs — Decision Model

Status: M2 canonical model

## Purpose

TimeProofs decisions are deterministic conclusions over explicit objects, bindings, invariant definitions, and evidence.

Primary states:

- `PASS`
- `WARN`
- `BLOCK`
- `UNKNOWN`

There is no primary numeric score.

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
- `RESEARCH` (not executable as a production blocking rule)

## EvaluationResult

Every evaluated invariant emits one result:

```json
{
  "invariant_id": "TP-CX-001",
  "status": "BLOCK",
  "reason_code": "PAYMENT_TOTAL_MISMATCH",
  "message": "Projected payment total differs from authorized checkout total.",
  "evidence_ids": ["ev_1", "ev_2", "ev_3"],
  "evaluated_at": "2026-08-11T09:01:00Z",
  "details": {}
}
```

## PASS

Use only when all evidence required by the invariant is present, supported, and the deterministic predicate is satisfied.

PASS MUST NOT mean "no problem was observed" when evidence was incomplete.

## BLOCK

Use when:

1. the invariant is applicable to the supplied versions/flow;
2. sufficient evidence exists;
3. the deterministic violation predicate is satisfied;
4. the pack defines the violation as blocking by default.

A caller may configure policy around WARN/BLOCK only where the pack explicitly permits it. A production pack must not silently downgrade hard invariants.

## WARN

Use for a proven condition that is noteworthy but not a hard consistency violation for the pack/flow.

WARN is not a substitute for semantic uncertainty. Semantic uncertainty belongs in UNKNOWN.

## UNKNOWN

Use when TimeProofs cannot determine truth safely.

Typical reasons:

- required object missing
- required provider evidence unavailable
- ambiguous binding
- unsupported protocol/provider version
- canonical mapping unavailable
- evidence too stale for invariant requirements
- selective disclosure prevents comparison
- lifecycle context insufficient

UNKNOWN is first-class and must be surfaced prominently.

## Compatibility outcome

Protocol/version incompatibility may be represented internally as a compatibility reason, but public evaluation still resolves to UNKNOWN unless a separate compatibility/conformance command is explicitly used.

## Overall Decision

An evaluation over multiple invariant results computes an overall decision deterministically.

Default ordering:

`BLOCK > UNKNOWN > WARN > PASS`

Meaning:

- any BLOCK → overall BLOCK
- else any UNKNOWN → overall UNKNOWN
- else any WARN → overall WARN
- else PASS

A pack may define a narrower aggregation rule only if versioned and documented. Core must never hide UNKNOWN merely because other checks passed.

## Decision evidence

Overall decision must include:

- pack ID/version
- evaluated invariant IDs
- result for each
- evidence references
- protocol/provider versions
- evaluation timestamp
- configuration affecting policy

## Idempotence / reproducibility

For the same:

- exact raw objects
- evidence inputs
- pack version
- adapter versions
- evaluation time/context where relevant
- policy configuration

TimeProofs MUST return the same result.

If an invariant depends on wall-clock time, the effective evaluation time is an explicit input to reproducibility.

## Human explanation

A renderer may produce concise human explanations, diffs, or remediation hints. They derive from the structured result and evidence. They never determine status.

## Fail-open / fail-closed

M2 defines decision semantics, not deployment policy.

At M8, an enforcement integration will decide how `UNKNOWN` behaves at a specific commit boundary. The core engine MUST preserve UNKNOWN rather than collapsing it into allow/deny prematurely.
