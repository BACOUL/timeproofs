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
test(agentready): harden static test harness
```

## Build next

Requirements:

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

## Then

```txt
1. feat(agentready): polish MCP scanner report
2. feat(agentready): polish OpenAPI scanner report
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
