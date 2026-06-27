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
✅ Sitemap updated
```

## Main remaining roadmap

Read this file first:

```txt
docs/agentready/REMAINING_WORK.md
```

## Immediate next PR

```txt
feat(agentready): polish MCP scanner report
```

## Build next

Requirements:

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

## Then

```txt
1. feat(agentready): polish OpenAPI scanner report
2. docs(agentready): strengthen agentready.json contract spec
3. docs(agentready): start agent simulation exploration
4. feat(agentready): add CLI only after browser product is stable
5. docs/seo: add public acquisition pages
6. docs(agentready): define AgentReady Checked trust layer
7. docs(product): prepare monetization path
8. chore(deploy): prepare Vercel reconnect after 2026-07-09
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
