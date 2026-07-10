# AgentReady Community npm Scope Audit

Status: OWNER ACTION REQUIRED

This document records the current evidence for the planned Community npm package.

Planned package:

```txt
@timeproofs/agentready
```

Current package version:

```txt
0.1.0-alpha.0
```

## Evidence Collected

Commands were run without storing npm tokens or secrets in the repository.

| Check | Command | Result | Interpretation |
| --- | --- | --- | --- |
| Public package lookup | `npm view @timeproofs/agentready version --json` | `E404 Not Found` | The package is not currently published in the public npm registry. This suggests the package name is not already occupied, but it does not prove publish rights. |
| Local npm identity | `npm whoami --json` | `ENEEDAUTH` | This environment is not logged in to npm. No npm account or token was used. |
| Package owner lookup | `npm owner ls @timeproofs/agentready --json` | `E404 Not Found` | No owner list exists because the package is not published. |
| npm org lookup | `npm org ls timeproofs --json` | `E404 Scope not found` | The `timeproofs` npm organization/scope is not publicly visible from this unauthenticated environment. This does not prove the owner lacks control; it means control is unverified. |

## Current Findings

Scope control: OWNER ACTION REQUIRED

Package publishability: OWNER ACTION REQUIRED

Organization required: OWNER ACTION REQUIRED

2FA status: OWNER ACTION REQUIRED

Trusted publishing status: OWNER ACTION REQUIRED

Current account access list: OWNER ACTION REQUIRED

## Required Owner Actions

Before any publication:

1. Log in to npm with the project owner account.
2. Confirm whether the `@timeproofs` scope is controlled by the project owner.
3. If the scope does not exist, create the npm user or organization required to control `@timeproofs`.
4. Confirm that `@timeproofs/agentready` can be published under that scope.
5. Record which npm accounts have owner or maintainer access.
6. Enable required 2FA or configure trusted publishing.
7. Document whether trusted publishing is available and appropriate for this package.
8. Do not create or store long-lived npm tokens in the repository.

## Publication Impact

Publication is blocked until scope ownership, package publishability, account access, and npm security requirements are verified by the owner.
