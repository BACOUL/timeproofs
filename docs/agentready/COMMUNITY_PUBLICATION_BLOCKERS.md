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
| publication policy | RESOLVED | `COMMUNITY_PUBLICATION_POLICY.md` defines source, auth, tests, tarball checks, tag/release rules, and publication bans. | Keep policy current. | Publication may proceed only through the controlled publication task. |
| explicit approval gate | RESOLVED | JEASON approval dated 2026-07-12 authorizes publication of `@timeproofs/agentready` version `0.1.0-alpha.0` from source commit `150da23932c1fb9433cb3d546904f03c18c909e9` and tarball SHA-256 `602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe`, exclusively under npm dist-tag `alpha`; immutable Git tag `v0.1.0-alpha.0` and the corresponding GitHub Release are authorized. | Execute only the controlled publication task; do not change the artifact, version, or dist-tag. | Publication approval is recorded, but publication has not yet been executed. |
| provenance workflow | RESOLVED | Existing `AgentReady Community Release Candidate` workflow validates source commit, package, action, checksum, and artifact. | Use it on the final approved commit. | Publication blocked until approval items resolve. |
| exact tarball public content | RESOLVED | JEASON approval dated 2026-07-11 records corrected alpha tarball content approval for commit `150da23932c1fb9433cb3d546904f03c18c909e9`, version `0.1.0-alpha.0`, tarball SHA-256 `602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe`, ZIP SHA-256 `1a318eab6a7af3a313da820546b36c4392b58502a025e8bd0a8a06ba45a3c248`, npm dist-tag `alpha`, and 21 controlled files. | Keep approval tied to the exact source commit, tarball SHA-256 and npm dist-tag. | Publication remains blocked until explicit publication approval is granted. |

## Current Publication Decision

```txt
PUBLICATION APPROVED: YES
```

## Next Authorized Action

The next authorized action is controlled execution of:

`AR-COM-006 — Publish Community CLI and immutable release`

Publication approval is recorded, but publication has not yet been executed.
