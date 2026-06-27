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

## Main remaining roadmap

Read this file first:

```txt
docs/agentready/REMAINING_WORK.md
```

## Immediate next PR

```txt
feat(agentready): polish navigation and product clarity
```

## Build next

Requirements:

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

## Then

```txt
1. test(agentready): harden static test harness
2. feat(agentready): polish MCP scanner report
3. docs(agentready): strengthen agentready.json contract spec
4. docs(agentready): start agent simulation exploration
5. feat(agentready): add CLI only after browser product is stable
6. docs/seo: add public acquisition pages
7. docs(agentready): define AgentReady Checked trust layer
8. docs(product): prepare monetization path
9. chore(deploy): prepare Vercel reconnect after 2026-07-09
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
