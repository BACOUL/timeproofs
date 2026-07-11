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
| npm scope `@timeproofs` control | RESOLVED | Owner attestation dated 2026-07-11 records npm account `bacoul`, organization `timeproofs`, scope `@timeproofs`, and public package rights. | Keep account ownership current. | Publication still blocked by tarball approval and explicit release approval. |
| package `@timeproofs/agentready` availability | RESOLVED | No package has been published yet; owner confirms rights to publish under controlled scope. | Recheck immediately before publication approval. | Publication still blocked by tarball approval and explicit release approval. |
| npm account access list | RESOLVED | Owner attestation records `bacoul` as the controlled npm account. | Keep maintainer list documented before publication. | Publication still blocked by tarball approval and explicit release approval. |
| npm 2FA or trusted publishing | RESOLVED | Owner attestation dated 2026-07-11 records npm 2FA enabled and no long-lived npm token stored. | Prefer trusted publishing in a future dedicated setup when technically configured. | Publication still blocked by tarball approval and explicit release approval. |
| AgentReady Community license | RESOLVED | `COMMUNITY_LICENSE_DECISION.md` records owner decision: AgentReady Community package files will be Apache-2.0 only within the staged npm package boundary. | Do not change root repository `LICENSE` in this gate. | Publication still blocked by tarball approval and explicit release approval. |
| package-included ProofSpec references | RESOLVED | `COMMUNITY_PROOFSPEC_REFERENCE_AUDIT.md` records dedicated package assets and staged package validation. Root `LICENSE` and root `README.md` are excluded from the tarball. | Maintain staging boundary. | Publication still blocked by tarball approval and explicit release approval. |
| publication policy | RESOLVED | `COMMUNITY_PUBLICATION_POLICY.md` defines source, auth, tests, tarball checks, tag/release rules, and publication bans. | Keep policy current. | Publication remains blocked by approval items. |
| explicit approval gate | RESOLVED | `COMMUNITY_PUBLICATION_APPROVAL_CHECKLIST.md` exists and says `PUBLICATION APPROVED: NO`. | Owner must fill approval fields in a future approval PR. | Publication blocked until approval becomes YES in a dedicated approval flow. |
| provenance workflow | RESOLVED | Existing `AgentReady Community Release Candidate` workflow validates source commit, package, action, checksum, and artifact. | Use it on the final approved commit. | Publication blocked until approval items resolve. |
| exact tarball public content | OWNER ACTION REQUIRED | Release candidate script now stages and validates the exact Community package boundary. Final artifact still requires owner approval by SHA-256. | Owner must approve final tarball file list, source commit and SHA-256. | Publication blocked. |

## Current Publication Decision

```txt
PUBLICATION APPROVED: NO
```

## Next Authorized Action

The next authorized action is owner approval of final Community tarball
content, not publication.
