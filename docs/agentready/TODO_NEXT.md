# TODO Next — TimeProofs AgentReady

## Current completed base

```txt
✅ AgentReady positioning
✅ Legacy proof-of-existence surface removed
✅ Static OpenAPI JSON/YAML scanner
✅ Static MCP tools JSON scanner
✅ OpenAPI upload page: agentready.html
✅ MCP upload page: agentready-mcp.html
✅ Public landing page
✅ Public docs page with OpenAPI/MCP split
✅ Public examples page with OpenAPI/MCP fixtures
✅ Static browser test harness with OpenAPI/MCP/export groups
✅ OpenAPI fixtures
✅ MCP fixtures
✅ agentready.json export
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
✅ Sitemap updated
```

## Main remaining roadmap

Read this file first:

```txt
docs/agentready/REMAINING_WORK.md
```

## Immediate next PR

```txt
feat(agentready): add static simulation fixtures
```

## Build next

Requirements:

```txt
1. Keep simulation static and non-executing.
2. Add a shared simulation scenario examples index.
3. Add one additional OpenAPI risky scenario.
4. Add one additional MCP risky scenario.
5. Add expected simulation result examples.
6. Define result statuses: pass, warning, fail, not_applicable.
7. Decide where future simulation output would appear in agentready.json.
8. Do not call APIs.
9. Do not call MCP tools.
10. Keep mandatory limitation text.
```

## Then

```txt
1. feat(agentready): add CLI only after browser product is stable
2. docs/seo: add public acquisition pages
3. docs(agentready): define AgentReady Checked trust layer
4. docs(product): prepare monetization path
5. chore(deploy): prepare Vercel reconnect after 2026-07-09
```

## Do not build yet

```txt
accounts
payments
dashboard
database
runtime firewall
old proof-of-existence product
```

## Mandatory limitation text

```txt
TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
```
