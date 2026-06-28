# TimeProofs AgentReady — Release Discipline

## Purpose

This document defines how TimeProofs AgentReady should avoid premature public launch claims.

The project can continue progressing across V1, V2, V3, V4 and beyond, but public release status must remain strict.

## Core rule

```txt
Do not put AgentReady forward as publicly complete until the relevant release gate is satisfied.
```

## What this means

The team may continue building:

```txt
V1.1 hardening
V2 CLI scope
V3 AgentReady Checked concept
V4 SEO drafts
V5 monetization exploration
```

But the team must not claim:

```txt
Browser V1 is complete
Browser V1 is released
AgentReady is production-ready
AgentReady guarantees agent safety
AgentReady prevents all agent failures
```

until the release criteria are met.

## Browser V1 release criteria

Browser V1 can be called complete only when:

```txt
Browser V1 QA Result is PASS.
All blocking issues are resolved.
OpenAPI scanner was tested.
MCP scanner was tested.
Static simulation was tested.
Exports were tested.
Network tab was checked.
No live API/MCP/LLM calls were observed.
```

Reference files:

```txt
docs/agentready/BROWSER_PRODUCT_QA_CHECKLIST.md
docs/agentready/BROWSER_V1_RELEASE_GATE.md
docs/agentready/BROWSER_V1_QA_RUNBOOK.md
docs/agentready/BROWSER_V1_QA_RESULT.md
```

## Status labels

Use these labels consistently.

### Draft

```txt
Concept or documentation exists.
No release claim.
```

### Built

```txt
Implementation exists.
May not be manually validated yet.
No public release claim.
```

### QA Pending

```txt
Implementation exists but release gate is not passed.
No public release claim.
```

### QA Pass

```txt
The release gate was executed and passed.
Release candidate can be considered.
```

### Release Candidate

```txt
A version is nearly ready for public use but may still need final review.
```

### Released

```txt
The version is publicly documented as available and its release gate is satisfied.
```

## Allowed before Browser V1 QA PASS

```txt
Documentation
Roadmap
Architecture decisions
CLI scope documents
AgentReady Checked concept documents
SEO draft documents
Monetization exploration documents
Internal examples
Test fixtures
Non-public QA preparation
```

## Not allowed before Browser V1 QA PASS

```txt
Public claim that Browser V1 is complete
Public claim that AgentReady is production-ready
Paid launch
Public badge claim
Production API
Dashboard launch
Runtime firewall claim
Safety guarantee claim
```

## V2 / V3 work before V1 QA

It is acceptable to define V2 and V3 while V1 QA is pending, as long as the work remains scoped and does not depend on false V1 claims.

Allowed:

```txt
V2 CLI scope
V2 CLI command design
V2 output contract mapping
V3 AgentReady Checked definition
V3 badge criteria draft
V4 SEO draft strategy
```

Not allowed:

```txt
Publishing V2 as available
Selling AgentReady Checked
Deploying public claims before Browser V1 QA
Building dashboard/payments before validated demand
```

## Public launch policy

Before a public launch:

```txt
1. Browser V1 QA Result must be PASS.
2. Release notes must be updated from draft to release candidate or final.
3. Known blocking issues must be empty.
4. Mandatory limitation text must be present.
5. No misleading safety guarantee may appear.
```

## Mandatory limitation text

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
