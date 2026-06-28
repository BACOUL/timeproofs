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
```

## Immediate next PR

```txt
docs(agentready): define V2 CLI scope
```

## Build next

Requirements:

```txt
1. Define CLI purpose.
2. Define CLI commands.
3. Define CLI inputs and outputs.
4. Define exit code behavior.
5. Define CI usage.
6. Define reuse of existing browser scanner core.
7. Keep V2 as scope only unless implementation is explicitly requested.
8. Do not claim Browser V1 is complete until QA result is PASS.
9. Do not add backend, accounts, payments, dashboard or runtime firewall.
10. Keep mandatory limitation text.
```

## Parallel pending task

```txt
Run manual Browser V1 QA in a real browser using docs/agentready/BROWSER_V1_QA_RUNBOOK.md, then update docs/agentready/BROWSER_V1_QA_RESULT.md
```

## Then

```txt
1. docs(agentready): define AgentReady Checked trust layer
2. docs/seo: add public acquisition pages draft
3. docs(product): prepare monetization path
4. chore(deploy): prepare Vercel reconnect after 2026-07-09
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
```

## Mandatory limitation text

```txt
TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
```
