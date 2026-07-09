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
✅ Legal notice page strengthened as pre-release draft
✅ Privacy page strengthened as local-first pre-release draft
✅ Terms page strengthened as pre-release draft
✅ Browser V1 release candidate notes prepared as draft
✅ Public docs page with OpenAPI/MCP/simulation split
✅ Public examples page with OpenAPI/MCP/simulation fixtures
✅ Static browser test harness with OpenAPI/MCP/export/simulation groups
✅ Browser product QA checklist
✅ Browser V1 release gate
✅ Browser V1 QA result template
✅ Browser V1 QA attempt recorded as pending
✅ Browser V1 production mobile QA evidence recorded
✅ Production test harness observed PASS — 31/31 checks passed
✅ Browser V1 QA runbook
✅ Long-term product roadmap
✅ Release discipline
✅ V2 CLI scope
✅ AgentReady Checked trust layer draft
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
✅ Competitive positioning documented
✅ Automated product strategy documented
✅ CI/CD strategy documented
✅ Commercial demos plan documented
✅ Go-to-market plan documented
```

## Main remaining roadmap

Read these files first:

```txt
docs/agentready/BROWSER_V1_QA_RESULT.md
docs/agentready/BROWSER_V1_QA_RUNBOOK.md
docs/agentready/REMAINING_WORK.md
docs/agentready/LONG_TERM_PRODUCT_ROADMAP.md
docs/agentready/RELEASE_DISCIPLINE.md
docs/agentready/V2_CLI_SCOPE.md
docs/agentready/AGENTREADY_CHECKED_TRUST_LAYER.md
docs/agentready/COMPETITIVE_POSITIONING.md
docs/agentready/AUTOMATED_PRODUCT_STRATEGY.md
docs/agentready/CI_CD_STRATEGY.md
docs/agentready/COMMERCIAL_DEMOS_PLAN.md
docs/agentready/GO_TO_MARKET_PLAN.md
```

## Immediate next PR

```txt
examples(agentready): add commercial demo fixtures
```

## Build next

Requirements:

```txt
1. Create three commercial demo fixture pairs:
   - OpenAPI refund/payment risk;
   - MCP email sending risk;
   - MCP file deletion/export risk.
2. Each demo should include a risky version and a corrected version.
3. Each demo should support before/after score contrast.
4. Each demo should support sample report and acquisition pages later.
5. Keep all demos static; do not call live APIs, MCP servers, or LLMs.
6. Do not reconnect Vercel until a public page/release batch is ready.
```

## Browser V1 strict QA still pending

```txt
Production mobile QA: PASS
Production test harness: PASS — 31/31 checks passed
Strict Browser V1 release gate: PENDING
Missing strict checks: desktop Network tab, manual export downloads, desktop Print / Save as PDF.
```

## Parallel pending tasks

```txt
1. Complete strict desktop Browser V1 QA when a desktop browser is available.
2. Prepare commercial demo fixtures without triggering Vercel deployment.
```

## Then

```txt
1. examples(agentready): add commercial demo fixtures
2. docs/product: improve sample report around commercial demos
3. docs(product): prepare monetization path after usage signals
4. chore(deploy): reconnect Vercel only for a public release batch
```

## Do not build yet

```txt
accounts
payments
dashboard
database
runtime firewall
old proof-of-existence product
public release claim before strict QA PASS
V2 implementation before Browser V1 strict QA is understood or explicitly waived
```

## Mandatory limitation text

```txt
TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
```
