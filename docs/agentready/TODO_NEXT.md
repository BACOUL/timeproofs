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
✅ Sitemap updated
```

## Main remaining roadmap

Read this file first:

```txt
docs/agentready/REMAINING_WORK.md
```

## Immediate next PR

```txt
docs(agentready): strengthen agentready.json contract spec
```

## Build next

Requirements:

```txt
1. Document agentready.json fields and expected shape.
2. Document source_type values: openapi and mcp.
3. Document generated_at timestamp behavior.
4. Document summary.score_interpretation.
5. Document tools[] fields.
6. Document detected_risks values.
7. Document human confirmation semantics.
8. Add minimal valid OpenAPI agentready.json example.
9. Add minimal valid MCP agentready.json example.
10. Add explicit V1 limitation text.
```

## Then

```txt
1. docs(agentready): start agent simulation exploration
2. feat(agentready): add CLI only after browser product is stable
3. docs/seo: add public acquisition pages
4. docs(agentready): define AgentReady Checked trust layer
5. docs(product): prepare monetization path
6. chore(deploy): prepare Vercel reconnect after 2026-07-09
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
