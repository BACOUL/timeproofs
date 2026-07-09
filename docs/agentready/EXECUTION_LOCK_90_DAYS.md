# TimeProofs AgentReady — 90-Day Execution Lock

## Purpose

This file prevents product drift.

For the next 90 days, TimeProofs AgentReady has one execution direction:

```txt
AgentReady CI Gate
```

Meaning:

```txt
Block unsafe or unclear agent-facing OpenAPI and MCP tool surfaces before merge or deployment.
```

## Locked product statement

```txt
TimeProofs AgentReady is a pre-deployment CI gate for agent-facing APIs and MCP tools.
```

The product is not a general AI security platform, not a runtime firewall, not an old proof-of-existence product, and not a dashboard SaaS.

## North Star

```txt
No agent-facing API or MCP server should be merged without an AgentReady check.
```

## Current execution phase

```txt
Phase: CLI alpha foundation
Active PR: feat(agentready): add CLI CI gate alpha
Active branch: feat-agentready-cli-ci
Base branch: timeproofs
```

## Current PR objective

The current PR must only establish a local-first CLI foundation:

```txt
agentready scan openapi <file>
agentready scan mcp <file>
--min-score
--fail-on
--out
CI exit codes
basic CLI tests
alpha usage docs
```

## Current PR acceptance criteria

```txt
1. npm run test:agentready-cli passes.
2. npm run test:agentready-core passes.
3. CLI scans an OpenAPI fixture locally.
4. CLI scans an MCP fixture locally.
5. --min-score can fail with exit code 1.
6. --fail-on critical can fail with exit code 1.
7. --out writes agentready.json or agentready-mcp.json plus Markdown report.
8. No backend, account, dashboard, payment, live API call, live MCP execution, or LLM call is introduced.
```

## Immediate next PR after CLI alpha

```txt
qa(agentready): validate commercial fixture score contrast
```

Goal:

```txt
Confirm that bad fixtures score meaningfully lower than fixed fixtures.
```

Required fixtures:

```txt
agentready-examples/commercial/openapi-refund-risk.bad.json
agentready-examples/commercial/openapi-refund-risk.fixed.json
agentready-examples/commercial/mcp-email-risk.bad.json
agentready-examples/commercial/mcp-email-risk.fixed.json
agentready-examples/commercial/mcp-files-risk.bad.json
agentready-examples/commercial/mcp-files-risk.fixed.json
```

Acceptance criteria:

```txt
1. Every bad fixture produces clearly visible findings.
2. Every fixed fixture reduces critical/high risk compared with its bad version.
3. Score contrast is strong enough for a public demo.
4. If contrast is weak, do not build GitHub Action yet; improve rules or fixtures first.
```

## Roadmap order

Do not reorder without an explicit recorded decision.

```txt
1. Merge CLI alpha after tests pass.
2. Validate commercial bad/fixed fixture contrast.
3. Stabilize AgentReady rule codes.
4. Add GitHub Action wrapper.
5. Publish agentready.json spec v0.1.
6. Add /agentready-ci public page.
7. Publish public bad/fixed examples and sample reports.
8. Run external feedback with MCP builders, API developers and AI agencies.
9. Test paid AgentReady Review / Agency Pack only after usage signals.
```

## Do not build during this lock

```txt
- new pivot
- old proof-of-existence product
- timestamp product
- public certification claim
- runtime firewall
- live MCP execution
- LLM evaluation product
- dashboard
- account system
- Stripe Checkout
- database
- hosted scan storage
- marketplace
- broad AI security platform
```

## Decision rule before any new task

Before starting any task, ask:

```txt
Does this directly move TimeProofs toward AgentReady CI Gate adoption?
```

If the answer is no:

```txt
Do not do it in the current 90-day lock.
```

## Standard assets to build

TimeProofs must become more than a scanner by owning these assets:

```txt
1. agentready.json
2. AgentReady Score
3. AgentReady rule codes
4. bad/fixed benchmark fixtures
5. GitHub Action workflow examples
6. public sample reports
7. AgentReady CI documentation
```

## Target users during this lock

```txt
1. MCP builders
2. API developers exposing OpenAPI to agents
3. AI agencies building agents for clients
4. startups building agent-facing tools
5. security-minded engineering teams
```

## Visibility strategy

```txt
GitHub first.
npm second.
GitHub Actions Marketplace third.
SEO pages only after CLI/GitHub Action behavior is stable.
```

## Mandatory limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
