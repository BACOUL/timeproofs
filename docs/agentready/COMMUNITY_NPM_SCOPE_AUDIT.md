# AgentReady Community npm Scope Audit

Status: OWNER VERIFIED ON 2026-07-11

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

Owner verification date: 2026-07-11

npm account: `bacoul`

npm organization: `timeproofs`

npm scope: `@timeproofs`

Selected plan: public packages on the free plan

Scope control: confirmed by the owner

Package publishability: owner confirms the organization and rights needed to publish a future public package under `@timeproofs`

Package publication status: no package published as of 2026-07-11

Sensitive data: no password, npm token, 2FA code, recovery code or screenshot is recorded in this repository

## Publication Impact

The npm scope ownership blocker is recorded as owner-verified. Publication remains blocked by the separate license, ProofSpec, tarball approval and explicit publication approval gates.

This audit does not authorize npm publication.
