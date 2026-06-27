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
✅ Sitemap updated
```

## Main remaining roadmap

Read this file first:

```txt
docs/agentready/REMAINING_WORK.md
```

## Immediate next PR

```txt
feat(agentready): polish OpenAPI scanner report
```

## Build next

Requirements:

```txt
1. Fix any remaining UI inconsistency in agentready.html navigation.
2. Improve OpenAPI executive summary language.
3. Add score interpretation text near the score.
4. Add clearer severity explanations.
5. Add sample before/after fixes for common risks.
6. Add better handling of large specs.
7. Add warning for unsupported YAML features.
8. Add version field to exported agentready.json if not already present.
9. Add source type visibility: OpenAPI vs MCP.
10. Add report timestamp.
```

## Then

```txt
1. docs(agentready): strengthen agentready.json contract spec
2. docs(agentready): start agent simulation exploration
3. feat(agentready): add CLI only after browser product is stable
4. docs/seo: add public acquisition pages
5. docs(agentready): define AgentReady Checked trust layer
6. docs(product): prepare monetization path
7. chore(deploy): prepare Vercel reconnect after 2026-07-09
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
