# AgentReady Community Publication Blockers

Status: ACTIVE BLOCKER TRACKER

Resolve blockers now.
Publish nothing now.

Allowed statuses:

- `RESOLVED`
- `OWNER ACTION REQUIRED`
- `LEGAL REVIEW REQUIRED`
- `BLOCKED`
- `NOT APPLICABLE`

| Blocker | Status | Evidence | Owner action | Publication impact |
| --- | --- | --- | --- | --- |
| npm scope `@timeproofs` control | OWNER ACTION REQUIRED | `npm org ls timeproofs --json` returned `E404 Scope not found`; unauthenticated environment cannot verify ownership. | Owner must log in to npm and confirm/create/control the scope. | Publication blocked. |
| package `@timeproofs/agentready` availability | OWNER ACTION REQUIRED | `npm view @timeproofs/agentready version --json` returned `E404 Not Found`; package is not public, but publish rights are unverified. | Owner must confirm package can be published under the controlled scope. | Publication blocked. |
| npm account access list | OWNER ACTION REQUIRED | `npm whoami --json` returned `ENEEDAUTH`; no authenticated account was used. | Owner must document npm owner/maintainer accounts. | Publication blocked. |
| npm 2FA or trusted publishing | OWNER ACTION REQUIRED | No npm account or package settings are available from this environment. | Owner must enable 2FA or approve trusted publishing setup in a later PR. | Publication blocked. |
| AgentReady Community license | LEGAL REVIEW REQUIRED | `LICENSE` contains MIT text plus legacy ProofSpec/protocol/trademark terms; `package.json` says `SEE LICENSE IN LICENSE`. | Owner/legal must approve final Community license and update package docs if needed. | Publication blocked. |
| package-included ProofSpec references | LEGAL REVIEW REQUIRED | `LICENSE` includes ProofSpec and timestamp/proof language; `README.md` includes a historical proof-of-existence note. | Owner/legal must decide what remains in files shipped to npm. | Publication blocked. |
| publication policy | RESOLVED | `COMMUNITY_PUBLICATION_POLICY.md` defines source, auth, tests, tarball checks, tag/release rules, and publication bans. | Keep policy current. | Publication remains blocked by other items. |
| explicit approval gate | RESOLVED | `COMMUNITY_PUBLICATION_APPROVAL_CHECKLIST.md` exists and says `PUBLICATION APPROVED: NO`. | Owner must fill approval fields in a future approval PR. | Publication blocked until approval becomes YES in a dedicated approval flow. |
| provenance workflow | RESOLVED | Existing `AgentReady Community Release Candidate` workflow validates source commit, package, action, checksum, and artifact. | Use it on the final approved commit. | Publication blocked until other items resolve. |
| exact tarball public content | BLOCKED | Package whitelist is defined, but the final approved tarball must be inspected from the release candidate workflow after blockers close. | Owner/release operator must compare final artifact file list and SHA-256. | Publication blocked. |

## Current Publication Decision

```txt
PUBLICATION APPROVED: NO
```

## Next Authorized Action

The next authorized action is owner/legal resolution of open blockers, not publication.
