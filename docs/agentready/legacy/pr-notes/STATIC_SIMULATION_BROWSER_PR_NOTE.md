# PR Note — Static Simulation Browser Page

## Goal

Expose the static simulation parser in a browser page while keeping the product fully static and local.

## Added

```txt
agentready-simulation.html
```

## Updated

```txt
agentready-docs.html
agentready-examples.html
sitemap.xml
docs/agentready/TODO_NEXT.md
```

## Capabilities

```txt
Upload agentready.json
Upload simulation scenario JSON
Load OpenAPI refund scenario example
Load MCP delete-file scenario example
Run runStaticSimulation in browser
Render pass/warning/fail/not_applicable counts
Render per-scenario results
Show raw agentready-simulation.json
Download agentready-simulation.json
Link page from Docs and Examples
Add page to sitemap
```

## Non-goals

```txt
No live API execution
No live MCP execution
No LLM calls
No autonomous agent runner
No backend
No accounts
No payments
No dashboard
No runtime firewall
No deployment
```

## Next recommended step

```txt
docs(agentready): prepare browser product QA checklist
```
