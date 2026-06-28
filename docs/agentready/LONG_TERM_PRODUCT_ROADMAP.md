# TimeProofs AgentReady — Long-Term Product Roadmap

## Purpose

This roadmap defines how TimeProofs AgentReady should evolve over the long term without rushing a public release.

The project should be built as a durable product category around AI agent readiness for APIs and MCP tools.

## Product principle

```txt
Build carefully.
Do not launch publicly before QA is passed.
Do not claim the product is complete before the release gate is satisfied.
Do not add heavy product layers before the core contract is stable.
```

## Current product direction

TimeProofs AgentReady is not a generic proof-of-existence tool.

It is an agent readiness scanner that helps detect where AI agents may misuse APIs, tools, or MCP servers before execution.

Core promise:

```txt
See where AI agents will fail before they use your API or MCP tools.
```

## Current Browser V1 scope

Browser V1 is the static, local-first product foundation.

It includes:

```txt
OpenAPI JSON/YAML scanner
MCP tools JSON scanner
AgentReady Score /100
Risk findings
Human-readable recommendations
Markdown reports
Browser print / Save as PDF
agentready.json
Static simulation scenarios
agentready-simulation.json
Browser test harness
Docs and examples
QA checklist
Release gate
QA runbook
Release notes draft
```

Browser V1 remains pending until manual browser QA is PASS.

## Release status rules

```txt
Technical progress does not equal release readiness.
A feature can be built but not released.
A version can be structurally complete but still pending QA.
Public launch requires QA PASS.
```

## Version roadmap

## V1 — Browser foundation

### Goal

Let a developer scan OpenAPI or MCP definitions locally in the browser and understand whether the surface is ready for AI agents.

### Included

```txt
OpenAPI scanner
MCP scanner
Static browser simulation
agentready.json
agentready-simulation.json
Reports
Docs
Examples
Test harness
```

### Status

```txt
Built structurally.
QA pending.
Not publicly released as complete.
```

### Exit criteria

```txt
Browser V1 QA result is PASS.
No blocking product issue remains.
No blocking safety issue remains.
No blocking contract issue remains.
```

## V1.1 — Browser hardening

### Goal

Improve the existing browser product after the first real QA pass.

### Possible work

```txt
Fix QA issues
Improve file upload errors
Improve invalid JSON/YAML messages
Improve empty state UX
Improve report readability
Improve mobile layout
Improve examples
Improve docs navigation
Improve score explanation
```

### Do not add yet

```txt
backend
accounts
payments
dashboard
runtime firewall
live MCP execution
live API execution
LLM evaluator
```

## V2 — Developer CLI

### Goal

Let developers run AgentReady from the terminal and CI.

### Target commands

```txt
agentready scan openapi ./openapi.yaml
agentready scan mcp ./mcp-tools.json
agentready simulate ./agentready.json ./scenario.json
agentready report ./agentready.json
```

### Expected outputs

```txt
agentready.json
agentready-simulation.json
agentready-report.md
terminal score summary
non-zero exit code for configurable blocking thresholds
```

### Why V2 matters

The CLI makes AgentReady useful inside developer workflows, pull requests, CI checks, internal API reviews, and MCP server release processes.

### Do not build before

```txt
Browser V1 QA is understood.
Core contract fields are stable enough.
Simulation output shape is stable enough.
```

## V3 — AgentReady Checked

### Goal

Create a trust layer that says a tool surface has been checked against the AgentReady contract and simulation scenarios.

### Possible outputs

```txt
AgentReady Checked badge
AgentReady Checked report
Minimum score policy
Critical risk policy
Confirmation requirement policy
Scenario coverage policy
Signed or hashable check artifact
```

### Important boundary

AgentReady Checked must not claim that agents will never fail.

It should claim only that:

```txt
A defined API or MCP surface was checked against AgentReady structural risk rules and static simulation scenarios at a specific time, with specific inputs and outputs.
```

## V4 — Public acquisition and education

### Goal

Build public pages that explain the problem and attract developers searching for agent readiness issues.

### Possible page clusters

```txt
AI agent API readiness checker
MCP tool safety checker
OpenAPI agent risk scanner
agentready.json contract
agentready-simulation.json examples
AI agent confirmation risks
MCP dangerous tools checklist
Agentic API safety checklist
AI tool schema risk scanner
```

### Rule

SEO pages can be drafted before public launch, but they should not trigger a public release claim before QA PASS.

## V5 — Monetization exploration

### Goal

Find a simple paid path without building unnecessary SaaS complexity too early.

### Possible models

```txt
Premium report export
CLI Pro
CI policy packs
AgentReady Checked badge
Team reports
Agency/API audit pack
Private readiness review
```

### Avoid too early

```txt
complex dashboard
multi-user account system
large database
runtime gateway
agent firewall
heavy subscription product before demand exists
```

## V6 — Runtime or monitoring only if validated

### Goal

Only after strong evidence, consider runtime or monitoring products.

### Possible future directions

```txt
runtime confirmation policy
MCP server monitoring
API agent misuse logs
agent action audit trail
pre-execution risk checks
```

### Warning

Runtime layers are much heavier and should not be built before the static contract, CLI, and trust layer have clear demand.

## Long-term moat

The strategic asset is not just the scanner UI.

The moat should become:

```txt
agentready.json contract
agentready-simulation.json contract
risk taxonomy
scenario fixtures
CLI workflow
AgentReady Checked trust layer
developer education around agent readiness
```

## What should stay true

```txt
Local-first by default.
Static analysis before execution.
Clear human confirmation boundaries.
No fake safety guarantees.
No public launch without QA.
No heavy SaaS before core demand.
```

## Mandatory limitation text

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
