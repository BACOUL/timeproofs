# AgentReady GitHub Action Publication Evidence

Status: PUBLISHED

## Immutable release

- Action: `AgentReady CI Gate by TimeProofs`
- Approved implementation SHA: `d6634d0fbbe1fced510fc49d8871d52a3dc7f348`
- Immutable tag: `agentready-action-v0.1.0-alpha.0`
- Verified tag target: `d6634d0fbbe1fced510fc49d8871d52a3dc7f348`
- GitHub prerelease: https://github.com/BACOUL/timeproofs/releases/tag/agentready-action-v0.1.0-alpha.0
- Marketplace listing: https://github.com/marketplace/actions/agentready-ci-gate-by-timeproofs
- Release state: public, non-draft, prerelease
- Marketplace categories: Continuous integration and Security
- Owner agreement: accepted privately
- Owner 2FA: completed privately; no credential material recorded

## Public validation

- Public immutable-tag workflow: https://github.com/BACOUL/timeproofs/actions/runs/29207232357
- OpenAPI tag smoke: PASS
- MCP tag smoke: PASS
- Full-SHA reference: `uses: BACOUL/timeproofs@d6634d0fbbe1fced510fc49d8871d52a3dc7f348`
- Tag reference: `uses: BACOUL/timeproofs@agentready-action-v0.1.0-alpha.0`
- Minimum workflow permission: `contents: read`
- TimeProofs account required: no
- TimeProofs backend required: no
- Contract upload or silent telemetry: none
- npm operation performed during Action publication: no

## Merge sequencing exception

PR #129 was merged at `3070e7827e8118ca62ad6cdb7c37deff9ef24b47` before the final Marketplace checkbox was available because GitHub exposed the Release Action flow only after root `action.yml` existed on the default branch. The owner then published the existing immutable tag through the Marketplace UI. The tag was not moved or recreated.

## Rollback

Never move or delete the immutable tag to conceal a defect. Preserve the audit trail, remove the affected listing if required, publish a notice, correct the issue in a reviewed commit, and create a new immutable Action tag.
