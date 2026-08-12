---
name: "Bug report"
about: "Report a reproducible TimeProofs core, adapter, SDK, CLI or Action problem"
title: "[BUG] "
labels: bug
assignees: BACOUL
---

# TimeProofs bug report

## Problem
Describe the observed behavior and why it is incorrect.

## Minimal reproduction
Provide the smallest safe reproduction. Do **not** attach real checkout JWTs, payment credentials or merchant authorization secrets.

```text
command / SDK call / Action inputs
```

## Expected vs actual
- Expected decision/status:
- Actual decision/status:
- Relevant invariant/reason code:

## Versions
- TimeProofs commit/package version:
- result contract version:
- pack version:
- adapter versions:
- UCP/AP2 profile versions:
- Node version:
- OS:

## Artifacts
If protocol artifacts are needed, sanitize them and replace credentials/secrets with synthetic values. Include artifact digests when useful.

## Regression impact
Does this affect PASS/BLOCK/UNKNOWN semantics, compatibility, security, or only presentation?

## Security
For security/privacy/integrity vulnerabilities, do not open a public issue. Follow `SECURITY.md` and contact `security@timeproofs.io`.
