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
✅ V2 CLI scope
✅ README alignment note
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
docs(agentready): define AgentReady Checked trust layer
```

## Build next

Requirements:

```txt
1. Define what AgentReady Checked means.
2. Define minimum score policy.
3. Define risk severity policy.
4. Define confirmation requirement policy.
5. Define scenario coverage policy.
6. Define what artifact is checked.
7. Keep it as a trust layer draft.
8. Do not claim certification or safety guarantee.
9. Do not add backend, accounts, payments, dashboard or runtime firewall.
10. Keep mandatory limitation text.
```

## Parallel pending tasks

```txt
1. Run manual Browser V1 QA in a real browser using docs/agentready/BROWSER_V1_QA_RUNBOOK.md, then update docs/agentready/BROWSER_V1_QA_RESULT.md.
2. Update root README.md directly when tool execution allows it, then remove docs/agentready/README_ALIGNMENT_NOTE.md if redundant.
```

## Then

```txt
1. docs/seo: add public acquisition pages draft
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
```

## Mandatory limitation text

```txt
TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
```
