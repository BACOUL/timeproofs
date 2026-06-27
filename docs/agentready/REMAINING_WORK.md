# TimeProofs AgentReady — Remaining Work Roadmap

## Purpose

This document lists what remains to build after the current OpenAPI + MCP static scanner foundation.

It should be used as the main execution checklist before starting new branches or PRs.

---

## Current completed base

```txt
✅ AgentReady positioning
✅ Legacy proof-of-existence surface removed
✅ Static OpenAPI JSON/YAML scanner
✅ Static MCP tools JSON scanner
✅ OpenAPI upload page: agentready.html
✅ MCP upload page: agentready-mcp.html
✅ Public landing page
✅ Public docs page
✅ Public examples page
✅ Static browser test harness
✅ OpenAPI fixtures
✅ MCP fixtures
✅ agentready.json export
✅ Markdown report export
✅ Browser print / Save as PDF for OpenAPI report
✅ Sitemap updated
```

---

## Priority 1 — Public navigation and product clarity

Goal: make the current site understandable in less than 10 seconds.

### Tasks

```txt
1. Standardize navigation across all public HTML pages.
2. Use the same labels everywhere: OpenAPI Scan, MCP Scan, Docs, Examples, Tests.
3. Add a clear OpenAPI vs MCP explanation section.
4. Add a homepage section showing the two scanner paths.
5. Update agentready-docs.html to include MCP scanner details.
6. Update agentready-examples.html to include MCP fixtures.
7. Add MCP scanner link to every relevant public page.
8. Keep agentready-test.html noindex.
```

### Acceptance criteria

```txt
A visitor can immediately understand:
- what OpenAPI scanning is for;
- what MCP scanning is for;
- that files are analyzed locally;
- that no endpoints or MCP tools are executed;
- what agentready.json is.
```

---

## Priority 2 — Test harness hardening

Goal: make the static test page more reliable before future features.

### Tasks

```txt
1. Split results into OpenAPI tests and MCP tests visually.
2. Add pass/fail grouping.
3. Add a final overall status banner.
4. Add clearer error output for failed tests.
5. Add tests for missing tools[] in MCP.
6. Add tests for empty tools[] in MCP.
7. Add tests for missing MCP tool name.
8. Add tests that exports contain expected fields.
9. Add a note explaining that browser fetch requires serving files over HTTP, not opening file:// directly.
```

### Acceptance criteria

```txt
The test page is useful for manual QA before merging or deploying.
```

---

## Priority 3 — MCP scanner polish

Goal: make MCP scanner output more useful and less generic.

### Tasks

```txt
1. Add MCP-specific risk wording in findings where possible.
2. Improve action classification for MCP tool names.
3. Detect missing inputSchema more explicitly.
4. Detect empty inputSchema properties.
5. Detect missing required fields.
6. Detect tools with vague names like run, execute, process, handle, do_task.
7. Detect dangerous tool names with weak descriptions.
8. Detect missing outputSchema / output contract.
9. Add a small MCP executive summary section.
10. Add browser print / Save as PDF to MCP report.
```

### Acceptance criteria

```txt
The MCP report feels purpose-built for MCP tools, not only reused from OpenAPI.
```

---

## Priority 4 — OpenAPI scanner polish

Goal: improve current V1 quality without changing the product scope.

### Tasks

```txt
1. Fix any remaining UI inconsistency in agentready.html navigation.
2. Improve executive summary language.
3. Add score interpretation text near the score.
4. Add clearer severity explanations.
5. Add sample before/after fixes for common risks.
6. Add better handling of large specs.
7. Add warning for unsupported YAML features.
8. Add version field to exported agentready.json if not already present.
9. Add source type visibility: OpenAPI vs MCP.
10. Add report timestamp.
```

### Acceptance criteria

```txt
The OpenAPI scan page is credible enough to show to early users.
```

---

## Priority 5 — agentready.json contract strengthening

Goal: make agentready.json the strategic asset, not just a scan artifact.

### Tasks

```txt
1. Review current agentready.json shape.
2. Define stable contract versioning.
3. Add source_type: openapi | mcp.
4. Add generated_at timestamp.
5. Add input filename/source metadata.
6. Add per-tool allowed_when / forbidden_when placeholders.
7. Add requires_human_confirmation consistently.
8. Add recommended_agent_policy field.
9. Add risk summary per operation/tool.
10. Document the full schema in AGENTREADY_JSON_SPEC.md.
```

### Acceptance criteria

```txt
agentready.json can be presented as a machine-readable readiness contract.
```

---

## Priority 6 — Agent simulation exploration

Goal: move beyond static scanning toward a stronger moat.

### Tasks

```txt
1. Create docs/agentready/AGENT_SIMULATION_EXPLORATION.md.
2. Define scenario format.
3. Define what a simulated agent task means.
4. Define success/failure criteria.
5. Define wrong_tool_selection metric.
6. Define wrong_parameter metric.
7. Define unsafe_action_without_confirmation metric.
8. Create simple scenarios for OpenAPI examples.
9. Create simple scenarios for MCP examples.
10. Keep it documentation-first before adding runtime code.
```

### Acceptance criteria

```txt
The repo has a clear plan for simulation before any complex implementation begins.
```

---

## Priority 7 — CLI / developer workflow

Goal: make AgentReady usable by technical users outside the browser.

### Tasks

```txt
1. Decide whether to keep zero-build static-only or add npm package structure.
2. If npm is accepted, add package.json.
3. Add CLI command: agentready scan openapi.yaml.
4. Add CLI command: agentready scan-mcp mcp-tools.json.
5. Output report.md and agentready.json.
6. Add examples in README.
7. Add local test script.
8. Add GitHub Action later only after CLI is stable.
```

### Acceptance criteria

```txt
A developer can run a scan locally without the browser.
```

---

## Priority 8 — SEO / public acquisition

Goal: start building search visibility around the new category.

### Tasks

```txt
1. Create SEO page: AI agent API readiness.
2. Create SEO page: MCP tool readiness.
3. Create SEO page: OpenAPI agent readiness.
4. Create SEO page: agentready.json contract.
5. Create SEO page: AI agent tool risk checklist.
6. Add internal links to scanner pages.
7. Add meta descriptions.
8. Add sitemap entries.
9. Keep claims careful and non-overpromising.
```

### Acceptance criteria

```txt
The site starts targeting precise low-competition search terms around agent tool readiness.
```

---

## Priority 9 — Trust layer / certification later

Goal: prepare the future proof/certification layer without rebuilding the old product.

### Tasks

```txt
1. Define what an AgentReady Checked badge means.
2. Define minimum score threshold.
3. Define validity duration.
4. Define report hash / proof hash concept.
5. Define verification page later.
6. Do not rebuild old TimeProofs proof-of-existence pages yet.
7. Keep proof as a trust layer, not the main product.
```

### Acceptance criteria

```txt
Certification is a future option, not a distraction from scanner usefulness.
```

---

## Priority 10 — Monetization / productization

Goal: avoid building payments too early, but prepare the path.

### Tasks

```txt
1. Define free scan limitations.
2. Define paid report value.
3. Define possible one-shot price.
4. Define agency/team plan later.
5. Define what users would pay for: PDF, history, CI, badge, team reports.
6. Add pricing only after user validation.
7. Do not add Stripe until the scanner is useful and tested.
```

### Acceptance criteria

```txt
Monetization path is clear but not implemented prematurely.
```

---

## Priority 11 — Deployment and Vercel recovery

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
3. Run static pages locally if possible.
4. Check OpenAPI scanner page.
5. Check MCP scanner page.
6. Check test harness.
7. Check sitemap.
8. Reconnect Vercel only when ready to deploy.
```

### Acceptance criteria

```txt
Reconnect/deploy only when the repo is in a state worth building.
```

---

## Recommended next execution order

```txt
1. polish public navigation and OpenAPI vs MCP explanation
2. harden test harness
3. polish MCP scanner report
4. strengthen agentready.json contract
5. document agent simulation exploration
6. start CLI only if the browser product is stable
7. create SEO pages
8. prepare certification/trust layer
9. prepare monetization
10. reconnect Vercel after July 9 when ready
```

---

## Do not do yet

```txt
Do not add accounts.
Do not add Stripe.
Do not add dashboard.
Do not add database.
Do not add runtime firewall positioning.
Do not rebuild the old proof-of-existence product.
Do not claim AgentReady guarantees safe agent behavior.
```

---

## One-line summary

> The scanners now exist. The next work is to make the product clearer, the reports stronger, the contract more strategic, and then build toward simulation, CLI, SEO, certification, and monetization.
