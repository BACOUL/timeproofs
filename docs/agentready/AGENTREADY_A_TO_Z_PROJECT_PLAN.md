# TimeProofs AgentReady — A to Z Project Plan

## Purpose

This document defines the complete coherent project path for TimeProofs AgentReady.

It exists to keep execution focused from product idea to usable, visible and monetizable developer tool.

## One-line project

```txt
TimeProofs AgentReady is a pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

## Core promise

```txt
Block unsafe or unclear agent-facing APIs and MCP tools before merge or deployment.
```

## Why this project exists

AI agents increasingly call tools, APIs and MCP servers.

A valid OpenAPI file or working MCP server can still be unsafe or unclear for an autonomous agent:

```txt
- dangerous action without human confirmation;
- vague operation or tool name;
- unbounded refund/payment/delete parameters;
- missing MCP input or output schema;
- weak error recovery;
- sensitive data exposure;
- ambiguous tool-selection risk;
- unclear success verification.
```

TimeProofs checks the tool surface before it reaches production.

## What we are building

A local-first developer toolchain:

```txt
Browser scanner
→ CLI
→ CI policy gate
→ GitHub Action
→ agentready.json standard
→ bad/fixed benchmark examples
→ public reports
→ paid policy/review layer later
```

## What we are not building

```txt
- general AI security platform;
- runtime firewall;
- old proof-of-existence product;
- timestamp product;
- dashboard-first SaaS;
- certification claim;
- live MCP execution;
- LLM evaluation product;
- account system;
- Stripe/payment flow before usage signals;
- marketplace before adoption.
```

## Primary target users

### 1. MCP builders

They publish tools that agents can call.

Pain:

```txt
Will agents misuse this tool because the definition is vague, broad or dangerous?
```

### 2. API developers exposing OpenAPI to agents

They expose APIs to tool-calling systems.

Pain:

```txt
My OpenAPI is valid, but is it safe and clear enough for an AI agent?
```

### 3. AI agencies and freelancers

They connect agents to client systems.

Pain:

```txt
I need to prove to clients that I checked the tools before connecting an agent.
```

### 4. Security-minded engineering teams

They want a CI gate before risky tools reach production.

Pain:

```txt
How do we prevent dangerous agent-facing tools from being merged?
```

## Positioning against competitors

### TimeProofs is before runtime

```txt
TimeProofs: before merge / before deploy.
Runtime guardrails: during action execution.
Observability: after execution.
```

### Complementarity

```txt
OpenAPI linters validate API shape.
TimeProofs validates agent-readiness.

Snyk/Semgrep/Sonar validate code/security issues.
TimeProofs validates agent-facing tool surfaces.

Runtime guardrails authorize/block live actions.
TimeProofs prevents unclear/dangerous tools from being shipped.
```

## Defensible wedge

TimeProofs must own this category:

```txt
Agent-facing API/MCP readiness gate
```

Not:

```txt
AI security
MCP security scanner
OpenAPI linter
Runtime protection
```

## Standard assets to own

### 1. agentready.json

Core contract output.

Must be stable, documented and easy to parse.

### 2. AgentReady Score

Simple score from 0 to 100.

Must explain whether a surface is ready, needs fixes or should not be exposed.

### 3. AgentReady rule codes

Example future naming:

```txt
AR001 — Missing human confirmation
AR002 — Unbounded risky parameter
AR003 — Ambiguous operation/tool name
AR004 — Missing error recovery
AR005 — Sensitive data exposure
AR006 — Missing MCP input schema
AR007 — Missing success verification
AR008 — Overbroad permission boundary
```

### 4. Bad/fixed benchmark fixtures

Public examples that show the value quickly.

### 5. GitHub Action examples

Developers must be able to copy/paste installation.

### 6. Sample reports

Human-readable reports for agencies and clients.

## Product phases

## Phase 0 — Current foundation

Already exists:

```txt
- Browser scanner;
- OpenAPI scan;
- MCP scan;
- static simulation;
- agentready.json export;
- Markdown report export;
- public docs/examples;
- commercial fixtures drafted;
- CI/CD strategy docs;
- CLI scope docs.
```

Constraint:

```txt
Browser V1 strict QA is not fully complete until desktop/export/network checks are verified.
```

## Phase 1 — CLI alpha

Goal:

```txt
Make AgentReady usable from terminal and CI runners.
```

Build:

```txt
agentready scan openapi <file>
agentready scan mcp <file>
--out
--min-score
--fail-on
exit codes 0/1/2/3
basic CLI tests
CLI usage docs
```

Acceptance criteria:

```txt
1. CLI runs locally.
2. OpenAPI fixture scans.
3. MCP fixture scans.
4. --out writes contract/report.
5. --min-score can fail CI.
6. --fail-on can fail CI.
7. No hosted service or live execution is introduced.
```

## Phase 2 — Commercial fixture validation

Goal:

```txt
Prove the scanner clearly distinguishes bad from fixed examples.
```

Required fixture pairs:

```txt
OpenAPI refund bad/fixed
MCP email bad/fixed
MCP files bad/fixed
```

Acceptance criteria:

```txt
1. Bad examples produce strong findings.
2. Fixed examples reduce risk and improve score.
3. Differences are clear enough for public demo.
4. Weak contrast blocks the next phase until rules improve.
```

## Phase 3 — Rule-code standardization

Goal:

```txt
Make AgentReady findings easy to quote in PRs, docs and reports.
```

Build:

```txt
AgentReady rule-code taxonomy
stable codes in reports
CLI summary with rule codes
sample PR failure output
```

Acceptance criteria:

```txt
A developer can understand why a PR failed in less than 60 seconds.
```

## Phase 4 — GitHub Action

Goal:

```txt
Make AgentReady installable in GitHub CI.
```

Target usage:

```yaml
- uses: timeproofs/agentready-action@v1
  with:
    source: openapi.yaml
    source_type: openapi
    min_score: 80
    fail_on: critical
```

Acceptance criteria:

```txt
1. Action runs CLI.
2. Action can scan OpenAPI.
3. Action can scan MCP tools.
4. Action fails a PR on low score or critical risk.
5. Action uploads or stores report artifacts when possible.
6. No hosted backend is required.
```

## Phase 5 — agentready.json spec v0.1

Goal:

```txt
Turn AgentReady from a tool into a contract format.
```

Spec must define:

```txt
agentready_version
source_type
summary
tools[]
risk_level
action_type
requires_human_confirmation
detected_risks
recommendations
known limitations
```

Acceptance criteria:

```txt
A third party can read or generate agentready.json without using the browser UI.
```

## Phase 6 — Public CI page and examples

Goal:

```txt
Make the product understandable and installable.
```

Build:

```txt
/agentready-ci
copy/paste GitHub Action example
bad/fixed example pages
sample reports
README CI section
```

Acceptance criteria:

```txt
A developer can install the check in 2 minutes.
```

## Phase 7 — Visibility and external feedback

Goal:

```txt
Get real usage signals before building monetization infrastructure.
```

Actions:

```txt
1. Identify MCP repos and agent-facing API projects.
2. Run AgentReady on public examples where appropriate.
3. Share useful reports without spam.
4. Contact MCP builders, API developers and AI agencies.
5. Ask for one scan, one bug, one missing rule, one CI use case.
```

Success signals:

```txt
5 useful developer replies
3 real scans outside our own fixtures
1 serious request for CLI/GitHub Action usage
1 willingness-to-pay signal
```

## Phase 8 — Monetization test

Do not build payment infrastructure first.

Test simple offers:

```txt
AgentReady Review — one-time readiness report
Agency Pack — branded client reports
CI Policy Pack — stricter rules for teams
Premium report export — polished delivery artifact
```

Suggested first offer:

```txt
AgentReady Launch Check
Price: 299–499 EUR
Input: OpenAPI or MCP tools file
Output: AgentReady score, risk report, agentready.json, recommended CI policy
```

Acceptance criteria:

```txt
At least one serious paid or near-paid signal before building Stripe/dashboard.
```

## Operating method

### One PR at a time

Every PR must have:

```txt
objective
files changed
acceptance criteria
what is explicitly out of scope
next PR
```

### No drift rule

Before any task, ask:

```txt
Does this directly move TimeProofs toward AgentReady CI Gate adoption?
```

If no, do not do it during the current execution lock.

### Codex role

Codex should execute bounded implementation tasks:

```txt
- run tests;
- fix failing test;
- implement one scoped feature;
- verify outputs;
- report exact files changed;
- avoid pivots and unrelated improvements.
```

### ChatGPT role

ChatGPT should:

```txt
- keep strategy coherent;
- define acceptance criteria;
- review repo direction;
- write scoped Codex prompts;
- prevent drift;
- decide next PR order.
```

### User role

Jeason decides:

```txt
- whether to merge;
- whether to spend time/credits;
- whether external feedback or paid tests justify next monetization step.
```

## 90-day success definition

At the end of 90 days, success is not a finished enterprise SaaS.

Success means:

```txt
1. AgentReady CLI works.
2. GitHub Action works.
3. agentready.json spec v0.1 exists.
4. Rule codes exist.
5. Public bad/fixed demos exist.
6. At least 5 external users/builders have tested or reacted.
7. At least 1 monetization signal exists.
8. We know whether to continue, narrow or stop.
```

## Failure definition

The project is drifting if we start building:

```txt
- dashboard before usage;
- Stripe before demand;
- runtime firewall before CI adoption;
- broad AI security content;
- old proof/timestamp product;
- features not needed for CLI/GitHub Action adoption.
```

## Final decision

For this execution cycle, TimeProofs is:

```txt
AgentReady CI Gate.
```

Everything else waits.
