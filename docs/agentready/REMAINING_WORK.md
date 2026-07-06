# TimeProofs AgentReady — Remaining Work Roadmap

## Purpose

This document lists what remains after the current Browser V1 foundation.

It should be used as the main execution checklist before starting new branches or PRs.

## Product principle

```txt
Browser V1 is structurally built.
Browser V1 is not complete until real browser QA is PASS.
Do not start V2 implementation before Browser V1 public-site polish is acceptable.
Do not claim production readiness before the release gate is satisfied.
```

## Current completed base

```txt
✅ AgentReady positioning
✅ Legacy proof-of-existence surface removed
✅ Commercial homepage draft
✅ Shared mobile navigation across public V1 pages
✅ Static OpenAPI JSON/YAML scanner
✅ Static MCP tools JSON scanner
✅ Static simulation page
✅ OpenAPI upload page: agentready.html
✅ MCP upload page: agentready-mcp.html
✅ Static simulation page: agentready-simulation.html
✅ Public docs page
✅ Public examples page
✅ Static browser test harness
✅ Legal notice page draft
✅ Privacy page draft
✅ Terms page draft
✅ OpenAPI fixtures
✅ MCP fixtures
✅ Simulation scenario fixtures
✅ agentready.json export
✅ agentready-simulation.json export
✅ Markdown report export
✅ Browser print / Save as PDF for OpenAPI report
✅ Browser print / Save as PDF for MCP report
✅ OpenAPI-specific report wording and scanner output polish
✅ MCP-specific report wording and scanner output polish
✅ agentready.json contract spec strengthened
✅ Static simulation parser core
✅ Static simulation parser test harness checks
✅ Browser V1 QA runbook
✅ Browser V1 QA result file
✅ Browser V1 release discipline
✅ AgentReady Checked trust layer draft
✅ Long-term roadmap
✅ V2 CLI scope document
✅ Sitemap updated
```

## Current release status

```txt
Browser V1 structural status: BUILT
Browser V1 release status: QA PENDING
Public completion claim: NOT ALLOWED
```

Blocking release gate:

```txt
Manual browser QA has not been completed.
Browser test harness has not been run in a real browser.
Exports have not been manually verified in a real browser.
Network tab no-execution checks have not been completed.
Mobile/narrow viewport has not been manually verified.
```

## Priority 1 — Browser V1 public-site QA

Goal: verify the current product in a real browser before claiming V1 completion.

### Tasks

```txt
1. Run docs/agentready/BROWSER_V1_QA_RUNBOOK.md.
2. Start local static server with python3 -m http.server 8080, or use a controlled preview.
3. Open and verify all public pages.
4. Confirm the commercial homepage renders correctly on desktop and mobile.
5. Confirm desktop navigation remains usable.
6. Confirm mobile menu works and does not wrap into multiple rows.
7. Confirm legal/privacy/terms links appear where appropriate.
8. Run /agentready-test.html and record PASS/FAIL.
9. Scan OpenAPI JSON fixture.
10. Scan OpenAPI YAML fixture.
11. Scan dangerous OpenAPI fixture.
12. Scan simple MCP fixture.
13. Scan dangerous MCP fixture.
14. Export agentready.json.
15. Export agentready-mcp.json.
16. Export Markdown reports.
17. Test Print / Save as PDF.
18. Run static simulation with OpenAPI scenario.
19. Run static simulation with MCP scenario.
20. Export agentready-simulation.json.
21. Use browser Network tab to confirm no live API, MCP, backend or LLM calls are made during scanner/simulation flows.
22. Update docs/agentready/BROWSER_V1_QA_RESULT.md with PASS/FAIL evidence.
```

### Acceptance criteria

```txt
Browser V1 QA Result is PASS.
No blocking issue remains.
The product can be used locally in a browser from upload to export.
No misleading public release claim is made before QA PASS.
```

## Priority 2 — Browser V1 hardening after QA

Goal: fix only issues discovered by real browser QA.

### Possible tasks

```txt
1. Fix homepage desktop/mobile layout issues.
2. Fix mobile navigation issues.
3. Fix file upload usability issues.
4. Fix scanner rendering issues.
5. Fix export/download issues.
6. Fix print / Save as PDF issues.
7. Fix console errors.
8. Fix Network tab surprises.
9. Fix unclear empty/error states.
10. Re-run QA after fixes.
```

### Acceptance criteria

```txt
The QA result remains PASS after fixes.
The product feels stable enough to show to early technical users.
```

## Priority 3 — Documentation alignment

Goal: keep docs consistent with the product state.

### Tasks

```txt
1. Keep README.md aligned with current product state.
2. Keep TODO_NEXT.md aligned with the immediate next PR.
3. Keep BROWSER_V1_QA_RESULT.md strict and truthful.
4. Update release notes only after QA evidence exists.
5. Remove or retire redundant alignment notes if no longer useful.
6. Ensure all docs use the same product sentence.
7. Ensure all docs include the mandatory limitation where needed.
```

### Acceptance criteria

```txt
A developer can read README.md, TODO_NEXT.md and this roadmap without seeing contradictory status information.
```

## Priority 4 — Trust layer concept: AgentReady Checked

Goal: refine the future trust layer without rebuilding the old proof-of-existence product.

Source document:

```txt
docs/agentready/AGENTREADY_CHECKED_TRUST_LAYER.md
```

### Remaining tasks

```txt
1. Validate the score threshold against real Browser V1 examples.
2. Validate the critical risk policy against real OpenAPI and MCP fixtures.
3. Validate scenario coverage after Browser V1 QA is PASS.
4. Decide whether report hashes and artifact hashes belong in Browser V1 or a later paid layer.
5. Keep AgentReady Checked private/draft until the criteria are stable.
6. Keep proof as a trust layer, not the main product.
7. Do not create public badge claims before Browser V1 QA PASS.
```

### Acceptance criteria

```txt
AgentReady Checked is a careful trust concept, not a safety guarantee.
```

## Priority 5 — SEO / public acquisition draft pages

Goal: prepare search visibility around precise agent readiness problems.

### Draft page clusters

```txt
AI agent API readiness checker
MCP tool safety checker
OpenAPI agent readiness scanner
agentready.json contract
agentready-simulation.json examples
AI agent confirmation risks
MCP dangerous tools checklist
Agentic API safety checklist
AI tool schema risk scanner
```

### Rules

```txt
SEO pages may be drafted before public launch.
Do not claim Browser V1 is complete before QA PASS.
Do not overpromise agent safety.
Add internal links to scanner pages.
Add sitemap entries when pages exist.
```

### Acceptance criteria

```txt
The site starts targeting precise search terms without making false release claims.
```

## Priority 6 — Monetization exploration

Goal: prepare a simple paid path without building unnecessary SaaS complexity too early.

### Possible paid values

```txt
Premium PDF/report export
CLI Pro
CI policy packs
AgentReady Checked report
Private readiness review
Agency/API audit pack
Team reports later
```

### Avoid too early

```txt
account system
dashboard
database
Stripe/payment flow
runtime gateway
agent firewall
heavy subscription product before demand exists
```

### Acceptance criteria

```txt
The monetization path is clear, but not implemented before product usefulness is validated.
```

## Priority 7 — V2 CLI after Browser V1 QA

Goal: make AgentReady usable from terminal and CI.

### Do not start before

```txt
Browser V1 QA is understood.
Core contract fields are stable enough.
Simulation output shape is stable enough.
```

### Target commands

```bash
agentready scan openapi ./openapi.yaml
agentready scan mcp ./mcp-tools.json
agentready simulate ./agentready.json ./scenario.json
agentready report ./agentready.json
```

### Expected outputs

```txt
agentready.json
agentready-mcp.json
agentready-simulation.json
agentready-report.md
terminal score summary
CI exit codes
```

### Acceptance criteria

```txt
A developer can run AgentReady locally without the browser.
The CLI output remains compatible with Browser V1 outputs.
```

## Priority 8 — Deployment and Vercel recovery

Goal: avoid accidental deployment costs and prepare for controlled redeploy.

### Current context

```txt
Vercel was disconnected from GitHub to avoid build credit usage.
Credits are expected to return on 2026-07-09.
```

### Tasks before reconnecting Vercel

```txt
1. Ensure timeproofs branch is clean.
2. Review merged PRs since Vercel disconnection.
3. Run Browser V1 QA locally if possible.
4. Check homepage.
5. Check OpenAPI scanner page.
6. Check MCP scanner page.
7. Check static simulation page.
8. Check test harness.
9. Check sitemap.
10. Reconnect Vercel only when ready to deploy.
```

## Do not build yet

```txt
accounts
payments
dashboard
database
runtime firewall
old proof-of-existence product
public release claim before QA PASS
V2 implementation before Browser V1 public-site polish
```

## Mandatory limitation text

```txt
TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
```