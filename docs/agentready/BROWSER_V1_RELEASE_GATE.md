# TimeProofs AgentReady — Browser V1 Release Gate

## Purpose

This document defines the gate for declaring the browser-first AgentReady V1 complete.

It must be used after the Browser Product QA Checklist and before moving into CLI, SEO, monetization, accounts, payments, dashboard, backend, or runtime firewall work.

## Release decision

Browser V1 can be marked complete only when all blocking criteria below are satisfied.

```txt
OpenAPI scanner works.
MCP scanner works.
Static simulation works.
Exports work.
No-execution constraints are verified.
Navigation is coherent.
Known blocking issues are fixed.
```

## Required pages

The following pages must load through a local or hosted HTTP server:

```txt
/
/agentready.html
/agentready-mcp.html
/agentready-simulation.html
/agentready-docs.html
/agentready-examples.html
/agentready-test.html
```

Recommended local command:

```bash
python3 -m http.server 8080
```

## Blocking criteria

A Browser V1 release is blocked if any of these are true.

### Product blocking issues

```txt
OpenAPI scanner cannot process valid JSON fixture.
OpenAPI scanner cannot process valid YAML fixture.
MCP scanner cannot process valid MCP fixture.
Static simulation cannot process agentready.json plus scenario JSON.
agentready.json cannot be exported.
agentready-simulation.json cannot be exported.
Markdown report cannot be exported.
Print / Save as PDF action is broken on scanner pages.
Core navigation links are broken.
A public page crashes on load.
```

### Safety blocking issues

```txt
Uploaded OpenAPI endpoints are called.
MCP tools are executed.
LLMs are called.
A backend is required to complete scanner or simulation flows.
Accounts are required.
Payments are required.
Dashboard state is required.
Runtime firewall behavior is introduced.
```

### Contract blocking issues

```txt
agentready.json misses agentready_version.
agentready.json misses generated_at.
agentready.json misses source_type.
agentready.json misses summary.
agentready.json misses tools[].
agentready-simulation.json misses simulation_version.
agentready-simulation.json misses scenarios_total.
agentready-simulation.json misses results[].
```

## Non-blocking issues

These issues should be documented but do not block Browser V1:

```txt
Small copywriting improvements.
Minor visual spacing issues.
Additional examples not yet added.
SEO pages not yet created.
CLI not yet available.
Pricing not yet defined.
AgentReady Checked trust layer not yet defined.
No hosted deployment reconnection yet.
```

## Required QA evidence

Before declaring Browser V1 complete, keep a short QA note with:

```txt
Date
Branch or commit tested
Browser used
Local URL used
OpenAPI fixture tested
MCP fixture tested
Simulation scenario tested
Export filenames confirmed
Known issues
Final decision: pass / fail
```

Recommended file name:

```txt
docs/agentready/BROWSER_V1_QA_RESULT.md
```

## Required exports

The following exports must be manually verified:

```txt
agentready.json
agentready-mcp.json
agentready-report.md
agentready-mcp-report.md
agentready-simulation.json
browser print / Save as PDF from OpenAPI scanner
browser print / Save as PDF from MCP scanner
```

## Required test harness state

The test harness should be run from:

```txt
/agentready-test.html
```

Expected groups:

```txt
OpenAPI tests
MCP tests
Export contract tests
Static simulation tests
```

A failure can be accepted only if:

```txt
1. The failure is understood.
2. It is documented in the QA result.
3. It does not violate blocking criteria.
```

## No-execution gate

The release cannot pass if any current browser flow performs live execution.

Must remain true:

```txt
OpenAPI scanner reads files only.
MCP scanner reads files only.
Static simulation reads files only.
No uploaded API endpoint is called.
No MCP server is contacted.
No MCP tool is executed.
No LLM is called.
No backend is required.
```

## Browser V1 release note contents

When Browser V1 is complete, release notes should include:

```txt
Product name: TimeProofs AgentReady Browser V1
Scope: static browser-first readiness scanner
Supported inputs: OpenAPI JSON/YAML, MCP tools JSON, simulation scenario JSON
Outputs: agentready.json, reports, agentready-simulation.json
Limitations: static analysis only, no execution guarantee
Non-goals: backend, accounts, payments, dashboard, runtime firewall
Next phase: CLI, SEO, AgentReady Checked, monetization exploration
```

## What remains after Browser V1

After Browser V1 is accepted, work can move to:

```txt
CLI for developers
SEO/public acquisition pages
AgentReady Checked trust layer
Monetization path
Deployment/reconnect work
Developer feedback collection
```

Still do not build by default:

```txt
accounts
payments
dashboard
database
runtime firewall
live API execution
live MCP execution
LLM evaluator
```

## Final Browser V1 acceptance statement

Browser V1 can be considered complete when this statement is true:

```txt
A developer can open TimeProofs AgentReady in the browser, scan OpenAPI or MCP tool definitions locally, export agentready.json, run a static simulation scenario, export agentready-simulation.json, and understand the main risks without any backend, account, payment, live API execution, MCP execution, or LLM call.
```

## Mandatory limitation text

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
