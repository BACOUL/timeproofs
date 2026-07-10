# AgentReady Community ProofSpec Reference Audit

Status: LEGAL REVIEW REQUIRED

This audit classifies legacy ProofSpec, proof-of-existence, timestamp, verification, protocol, and certification references before any Community publication.

## Package-Included Files

These files are included or automatically included in the npm tarball.

| File | Reference | Classification | Required action before publication |
| --- | --- | --- | --- |
| `LICENSE` | ProofSpec, TimeProofs protocol, timestamp proofs, attribution requirement | LEGAL REVIEW REQUIRED | Decide whether to replace, rewrite, or explicitly retain these terms for AgentReady Community. |
| `README.md` | Previous proof-of-existence website and timestamp/verify pages described as historical | PUBLIC PACKAGE REFERENCE | Confirm whether this historical note should remain in the package README or move to docs outside the tarball. |
| `package.json` | No ProofSpec reference | KEEP | No ProofSpec action required. |
| `bin/agentready.js` | No ProofSpec reference found | KEEP | No ProofSpec action required. |
| `agentready-core/*.js` | No ProofSpec reference found | KEEP | No ProofSpec action required. |
| `agentready-core/simulation/*.js` | No ProofSpec reference found | KEEP | No ProofSpec action required. |

## Repository References Outside The npm Package

These references are outside the planned package whitelist and do not ship in the Community npm tarball.

| Area | Classification | Notes |
| --- | --- | --- |
| `docs/agentready/legacy/` | HISTORICAL ONLY | Legacy notes are intentionally retained outside the active package. |
| older active planning docs marked `SUPERSEDED BY AGENTREADY_MASTER_PLAN.md` | HISTORICAL ONLY | These must not drive active scope. |
| `.github/ISSUE_TEMPLATE/` ProofSpec references | OUTSIDE PACKAGE NPM | Should be cleaned later if still visible to contributors, but not a tarball blocker. |
| active AgentReady docs mentioning certification as forbidden wording | KEEP | These references define prohibited claims. |
| runtime references to `verify` meaning action success | KEEP | These are not ProofSpec/proof-of-existence references. |

## Required Decision

The key publication blocker is the package-included `LICENSE` file. It contains legacy ProofSpec and proof-of-existence terms that may confuse AgentReady Community users or create license ambiguity.

OWNER ACTION REQUIRED:

1. Decide whether the package README should mention legacy proof-of-existence history.
2. Decide whether `LICENSE` should be replaced or split before publication.
3. Obtain legal approval before changing license terms.

## Publication Impact

Publication is blocked until package-included ProofSpec references are resolved or legally approved for retention.
