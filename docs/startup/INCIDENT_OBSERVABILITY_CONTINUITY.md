# TimeProofs — Incident, Observability & Business Continuity

Status: CANONICAL OPERATING BASELINE

## Incident classes

- SEV0: security compromise, corrupted release/provenance, or broad unsafe ALLOW/DENY behavior affecting consequential production actions.
- SEV1: material false-block/false-allow pattern, widespread pack/provider failure, billing corruption or major managed-service outage.
- SEV2: degraded provider pack, elevated UNKNOWN/latency, isolated billing/support issue with production impact.
- SEV3: non-urgent defect/documentation/compatibility issue.

## Minimum incident workflow

Detect → classify → contain → preserve evidence → communicate → recover/rollback → reconcile affected decisions/usage → regression test → postmortem.

Never rewrite a released pack or erase incident evidence to make history appear clean.

## False-block emergency

A false DENY on legitimate transactions is a first-class reliability incident. Required actions:
- identify pack/policy/version blast radius;
- publish known-good pin or disable affected rule only through explicit new configuration/version;
- preserve underlying verification evidence;
- distinguish customer explicit fail-open from TimeProofs default policy;
- add fixture/regression before re-enabling.

## Observability contract

Track at minimum:
- evaluation/enforcement latency by pack/version;
- PASS/WARN/BLOCK/UNKNOWN rates;
- ALLOW/DENY/ERROR rates;
- explicit fail-open overrides;
- malformed/unsupported rates;
- provider/resolver error rate and duration when RESOLVE exists;
- pack/version distribution;
- customer-reported false-block/false-allow cases;
- billing event acceptance/dedupe/correction metrics;
- release/version health.

Raw sensitive protocol payloads are not required for basic operational metrics.

## Alert philosophy

Alerts must represent customer/reliability risk, not vanity volume. Avoid alerting on ordinary deterministic BLOCK outcomes unless rate/change indicates a systemic problem.

## Solo-founder continuity

Before paid inline production:
- recovery credentials must not exist only in one browser/session/device;
- repository, package registry, DNS/domain, billing provider and production infrastructure need documented recovery paths;
- rollback/release runbooks must be executable by a trusted emergency operator if required;
- critical secrets use managed storage and rotation/recovery procedures;
- backups/restores are tested for managed state that cannot be reconstructed;
- an emergency contact/escalation document exists without exposing secrets in the repository.

The business must not become impossible to recover merely because the founder is temporarily unavailable.
