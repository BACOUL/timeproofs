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
```

## Immediate next PR

```txt
feat(agentready): expose static simulation in browser
```

## Build next

Requirements:

```txt
1. Keep simulation browser-only and static.
2. Add a local upload page for agentready.json plus scenario JSON.
3. Run runStaticSimulation in the browser.
4. Render pass/warning/fail/not_applicable counts.
5. Render per-scenario results.
6. Allow export of agentready-simulation.json.
7. Link the page from docs/examples only after it is usable.
8. Do not call APIs, MCP tools or LLMs.
9. Do not add backend, accounts, payments or dashboard.
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
