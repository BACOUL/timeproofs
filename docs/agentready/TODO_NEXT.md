# TODO Next — TimeProofs AgentReady

## Current completed base

```txt
✅ AgentReady positioning
✅ Legacy proof-of-existence surface removed
✅ Static OpenAPI JSON/YAML scanner
✅ Static MCP tools JSON scanner
✅ OpenAPI upload page: agentready.html
✅ MCP upload page: agentready-mcp.html
✅ Static simulation page: agentready-simulation.html
✅ Public landing page
✅ Homepage mobile menu foundation
✅ Homepage commercial 9/10 draft
✅ Sample report preview page
✅ Homepage links to sample report preview
✅ Public acquisition resources hub
✅ OpenAPI AI agent readiness SEO page
✅ MCP server readiness SEO page
✅ AI agent tool risk checklist SEO page
✅ agentready.json explainer SEO page
✅ Shared mobile navigation script
✅ Mobile navigation active on docs page
✅ Mobile navigation active on examples page
✅ Mobile navigation active on static simulation page
✅ Mobile navigation active on test page
✅ Mobile navigation active on OpenAPI scanner page
✅ Mobile navigation active on MCP scanner page
✅ Mobile navigation propagation completed on public V1 pages
✅ Legal notice page draft
✅ Privacy page draft
✅ Terms page draft
✅ Public docs page with OpenAPI/MCP/simulation split
✅ Public examples page with OpenAPI/MCP/simulation fixtures
✅ Static browser test harness with OpenAPI/MCP/export/simulation groups
✅ Browser product QA checklist
✅ Browser V1 release gate
✅ Browser V1 QA result template
✅ Browser V1 release notes draft
✅ Browser V1 QA attempt recorded as pending
✅ Browser V1 QA runbook
✅ Long-term product roadmap
✅ Release discipline
✅ V2 CLI scope
✅ README and remaining roadmap aligned with current V1
✅ OpenAPI fixtures
✅ MCP fixtures
✅ agentready.json export
✅ agentready-simulation.json export
✅ Markdown report export
✅ Browser print / Save as PDF for OpenAPI report
✅ MCP-specific report wording and scanner output polish
✅ Browser print / Save as PDF for MCP report
✅ OpenAPI-specific report wording and scanner output polish
✅ agentready.json metadata: generated_at, source_type, score_interpretation
✅ agentready.json contract spec strengthened
✅ Minimal OpenAPI agentready.json example
✅ Minimal MCP agentready.json example
✅ Agent simulation exploration document
✅ Minimal OpenAPI simulation scenario fixture
✅ Minimal MCP simulation scenario fixture
✅ Static simulation scenario examples index
✅ Additional OpenAPI simulation scenario fixture
✅ Additional MCP simulation scenario fixture
✅ Expected static simulation result examples
✅ Static simulation parser scope decision
✅ Static simulation parser core
✅ Static simulation parser test harness checks
✅ Sitemap updated
```

## Main remaining roadmap

Read this file first:

```txt
docs/agentready/REMAINING_WORK.md
docs/agentready/LONG_TERM_PRODUCT_ROADMAP.md
docs/agentready/RELEASE_DISCIPLINE.md
docs/agentready/V2_CLI_SCOPE.md
```

## Immediate next PR

```txt
qa(agentready): run Browser V1 public-site QA
```

## Build next

Requirements:

```txt
1. Run manual Browser V1 QA in a real browser using docs/agentready/BROWSER_V1_QA_RUNBOOK.md.
2. Update docs/agentready/BROWSER_V1_QA_RESULT.md with PASS/FAIL evidence.
3. Confirm the commercial homepage renders correctly on desktop and mobile.
4. Confirm the sample report preview renders correctly on desktop and mobile.
5. Confirm the public acquisition pages render correctly on desktop and mobile.
6. Confirm footer links to legal, privacy and terms appear where appropriate.
7. Confirm desktop navigation remains usable.
8. Confirm mobile navigation does not wrap into multiple rows.
9. Confirm OpenAPI scanner still scans JSON/YAML examples.
10. Confirm MCP scanner still scans MCP examples.
11. Confirm static simulation still exports agentready-simulation.json.
12. Do not continue V2 implementation before Browser V1 public-site polish is acceptable.
```

## Parallel pending tasks

```txt
1. Review legal/privacy/terms drafts before public production launch.
```

## Then

```txt
1. docs(agentready): define AgentReady Checked trust layer
2. docs(product): prepare monetization path
3. chore(deploy): prepare Vercel reconnect after 2026-07-09
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
