# AgentReady Developer Documentation Foundation Evidence

Status: IN_REVIEW

Batch: ARB-SITE-GLOBAL-005

Pull request: #137

Branch: site-agentready-global-docs-adoption

Base branch: site-agentready-global-trust

Actual implementation base: 50415ac768194a1448cc1081b1b9a60b3b299b96

Preview URL: https://timeproofs-git-site-agentready-global-docs-adoption-jeason1.vercel.app/

## Scope

This evidence records the developer documentation, adoption, examples and contribution foundation for AgentReady Community.

Implemented or aligned public routes:

- agentready-docs.html
- agentready.html
- agentready-mcp.html
- agentready-ci.html
- agentready-json.html
- agentready-examples.html
- agentready-resources.html
- agentready-sample-report.html
- agentready-cli.html
- agentready-action.html
- agentready-adoption.html
- agentready-contributing.html
- agentready-troubleshooting.html

No engine, CLI behavior, package metadata, Action metadata, npm state, Git tag, GitHub Release, Marketplace state, billing, account, backend, telemetry, upload system or hosted scanner was changed.

## Source Inventory

Detailed inventory:

docs/agentready/evidence/site-global-developer-docs-foundation/source-inventory.json

Primary sources used:

- docs/agentready/NEXT_CODEX_PROMPT.md
- docs/agentready/GITHUB_ACTION_USAGE.md
- docs/agentready/CLI_PUBLIC_DISTRIBUTION.md
- docs/agentready/AGENTREADY_JSON_SPEC.md
- docs/agentready/COMMERCIAL_FIXTURE_CI_GATE_BEHAVIOR.md
- docs/agentready/AGENTREADY_ACTION_PUBLICATION_EVIDENCE.md
- docs/agentready/COMMUNITY_RELEASE_NOTES_0_1_0_ALPHA_0.md
- action.yml
- package.json
- bin/agentready.js
- agentready-examples/commercial/openapi-refund-risk.bad.json
- agentready-examples/commercial/openapi-refund-risk.fixed.json
- agentready-examples/commercial/mcp-email-risk.bad.json
- agentready-examples/commercial/mcp-email-risk.fixed.json

## Example Provenance

Detailed provenance:

docs/agentready/evidence/site-global-developer-docs-foundation/example-provenance.json

Displayed examples are reproducible from repository fixtures and current CLI behavior:

- OpenAPI bad fixture: agentready-examples/commercial/openapi-refund-risk.bad.json
  - Command: node bin/agentready.js scan openapi agentready-examples/commercial/openapi-refund-risk.bad.json --out <tmp>/openapi-bad --min-score 75 --fail-on critical --json
  - Score: 54
  - Status: Needs fixes
  - Exit code: 1
- OpenAPI fixed fixture: agentready-examples/commercial/openapi-refund-risk.fixed.json
  - Command: node bin/agentready.js scan openapi agentready-examples/commercial/openapi-refund-risk.fixed.json --out <tmp>/openapi-fixed --min-score 75 --fail-on critical --json
  - Score: 84
  - Status: Minor fixes
  - Exit code: 0
- MCP bad fixture: agentready-examples/commercial/mcp-email-risk.bad.json
  - Command: node bin/agentready.js scan mcp agentready-examples/commercial/mcp-email-risk.bad.json --out <tmp>/mcp-bad --min-score 75 --fail-on critical --json
  - Score: 63
  - Status: Needs fixes
  - Exit code: 1
- MCP fixed fixture: agentready-examples/commercial/mcp-email-risk.fixed.json
  - Command: node bin/agentready.js scan mcp agentready-examples/commercial/mcp-email-risk.fixed.json --out <tmp>/mcp-fixed --min-score 75 --fail-on critical --json
  - Score: 90
  - Status: AgentReady
  - Exit code: 0

## Documentation Audits

CLI command reference:

- Documents only current Community commands: scan openapi, scan mcp, simulate and report.
- Uses @timeproofs/agentready@alpha.
- Does not document account, login, upload, hosted scanner or Pro commands.

GitHub Action usage:

- Uses Marketplace Action: https://github.com/marketplace/actions/agentready-ci-gate-by-timeproofs
- Uses immutable tag: BACOUL/timeproofs@agentready-action-v0.1.0-alpha.0
- Uses full SHA pinning: BACOUL/timeproofs@d6634d0fbbe1fced510fc49d8871d52a3dc7f348
- Canonical consumer workflow declares only permissions: contents: read.

agentready.json and Markdown reports:

- Report interpretation is mapped to docs/agentready/AGENTREADY_JSON_SPEC.md.
- Pages explain score, status, findings, AR rule codes, PASS/FAIL, min-score and fail-on.

Contribution and support:

- Contribution guidance is limited to real public repository capabilities.
- No response time, SLA, support commitment, partnership, bounty, certification route or maintainer-acceptance promise is made.

Community and Pro:

- Community is presented as free and available.
- Pro is presented as planned and not purchasable.
- Team, Agency and Enterprise are not presented as available.

## Reports And Evidence Files

- CTA and internal-link report: docs/agentready/evidence/site-global-developer-docs-foundation/cta-link-report.json
- Keyboard focus report: docs/agentready/evidence/site-global-developer-docs-foundation/keyboard-focus-report.json
- No-JavaScript report: docs/agentready/evidence/site-global-developer-docs-foundation/no-javascript-report.json
- 320 px overflow report: docs/agentready/evidence/site-global-developer-docs-foundation/overflow-320-report.json

Screenshot directories:

- Desktop: docs/agentready/evidence/site-global-developer-docs-foundation/desktop/
- Mobile: docs/agentready/evidence/site-global-developer-docs-foundation/mobile/
- No JavaScript: docs/agentready/evidence/site-global-developer-docs-foundation/nojs/

## Results

- CTA/internal-link report: PASS
- Keyboard focus evidence: PASS
- No-JavaScript core content evidence: PASS
- 320 px overflow evidence: PASS
- Developer documentation validator: PASS
- Navigation validator: PASS
- Strategy docs validator: PASS
- Execution-system validator: PASS
- Community release workflow guard test: PASS
- CLI regression tests: PASS
- GitHub Action smoke test: PASS
- Core engine regression tests: PASS
- Deterministic governance regeneration: PASS
- git diff --check: PASS

## Owner Review Boundary

ARB-SITE-GLOBAL-005 remains IN_REVIEW and is not DONE. PR #137 remains draft and must not be merged before JEASON review.

ARB-SITE-GLOBAL-006 remains planned and is not started by this batch.
