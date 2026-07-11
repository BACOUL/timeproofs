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
| staged package publishability | RESOLVED | Staged Community package `package.json` omits `private: true` and sets `publishConfig.access` to `public`, registry `https://registry.npmjs.org/`, and tag `alpha`. Root repository `package.json` remains `private: true`. | Recheck the final artifact before approval. | Publication still blocked by tarball approval and explicit release approval. |
| publication policy | RESOLVED | `COMMUNITY_PUBLICATION_POLICY.md` defines source, auth, tests, tarball checks, tag/release rules, and publication bans. | Keep policy current. | Publication remains blocked by approval items. |
| explicit approval gate | RESOLVED | `COMMUNITY_PUBLICATION_APPROVAL_CHECKLIST.md` exists and says `PUBLICATION APPROVED: NO`. | Owner must fill approval fields in a future approval PR. | Publication blocked until approval becomes YES in a dedicated approval flow. |
| provenance workflow | RESOLVED | Existing `AgentReady Community Release Candidate` workflow validates source commit, package, action, checksum, and artifact. | Use it on the final approved commit. | Publication blocked until approval items resolve. |
| exact tarball public content | OWNER ACTION REQUIRED | Previous JEASON approval dated 2026-07-11 for commit `61a5dab90afe6363f7ea386712bb8cdc48e9f665` and tarball SHA-256 `f1381d16277707cfc5d1005ed5e865139aa5a1ed0fcc1fb7de35c2f1a5eab77d` is retained as historical evidence but superseded because the release channel was corrected to `alpha`, changing the package README and `package.json`. | JEASON must approve the corrected `alpha` tarball content, source commit and SHA-256. | Publication remains blocked until new tarball content approval and explicit publication approval are granted. |

## Current Publication Decision

```txt
PUBLICATION APPROVED: NO
```

## Next Authorized Action

The next authorized action is owner approval of the corrected `alpha`
Community tarball content, not publication itself.
