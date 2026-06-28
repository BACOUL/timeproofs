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
✅ Sitemap updated
```

## Main remaining roadmap

Read this file first:

```txt
docs/agentready/REMAINING_WORK.md
```

## Immediate next PR

```txt
feat(agentready): add static simulation parser core
```

## Build next

Requirements:

```txt
1. Keep the parser static and browser/local only.
2. Add parse-simulation-scenario.js.
3. Add run-static-simulation.js.
4. Add simulation-result.js if useful.
5. Read agentready.json plus scenario JSON.
6. Return agentready-simulation.json separately from agentready.json.
7. Add deterministic matching rules.
8. Add acceptance tests in the static browser test harness.
9. Do not call APIs, MCP tools or LLMs.
10. Keep mandatory limitation text.
```

## Then

```txt
1. feat(agentready): expose static simulation in browser only after parser core works
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
