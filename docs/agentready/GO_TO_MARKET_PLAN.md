# TimeProofs AgentReady Go-To-Market Plan

## Status

This document has been updated for the self-service commercial direction.

Active direction:

```txt
TimeProofs AgentReady is a pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

Core promise:

```txt
Fail the build before unsafe agent-facing APIs or MCP tools are deployed.
```

## Purpose

The go-to-market goal is to make AgentReady a developer-trusted CI Gate and standard contract for agent-facing OpenAPI and MCP readiness.

The commercial motion must be zero-touch: visitors should discover the product, choose a plan, pay, receive an automatically activated license, install AgentReady, manage billing, and cancel without manual sales intervention.

## Positioning

Short version:

```txt
AgentReady blocks unsafe agent-facing OpenAPI and MCP tools before deployment.
```

Long version:

```txt
TimeProofs AgentReady is a pre-deployment CI gate for agent-facing OpenAPI and MCP tools. It scans contracts locally or in CI, reports structural risks, emits stable AR rule codes, and produces an agentready.json contract that teams can use in release gates.
```

## Problem To Own

```txt
A valid OpenAPI spec or MCP tool definition is not automatically agent-ready.
```

Common risks:

- destructive actions without confirmation boundaries;
- unbounded refund, payment, delete, export, or send operations;
- broad file, email, or customer-data access;
- missing dry-run or preview flow;
- vague tool names or unclear agent instructions;
- weak error recovery;
- sensitive data exposure;
- missing schemas or unclear outputs.

## Target Customers

### API and platform teams

They need a CI check before exposing existing OpenAPI surfaces to agents.

### MCP builders

They need a repeatable way to check whether MCP tools are clear, bounded, and safe enough to publish.

### AI product teams

They need release gates that catch structural tool risks before agents can call them.

### AI agencies

They need standardized reports, client workspaces, and evidence that agent-facing surfaces were checked before launch.

## Self-Service Plans

| Plan | Price | Main purpose |
|---|---:|---|
| Community | 0 EUR | Standard adoption and local CI usage |
| Pro | 24 EUR excl. VAT/month or 240 EUR excl. VAT/year | Advanced individual developer workflow |
| Team | 79 EUR excl. VAT/month or 790 EUR excl. VAT/year | Shared policies, members, history, and evidence |
| Agency | 199 EUR excl. VAT/month or 1,990 EUR excl. VAT/year | Multi-client workspaces and branded reporting |

Prices are an initial product decision and may evolve before real Stripe activation. Purchases are B2B at launch, with taxes calculated according to the applicable situation.

No paid plan should be displayed as available until its features are actually implemented.

## Acquisition Channels

### Developer documentation

Primary pages:

- AgentReady CI Gate;
- `agentready.json` spec;
- AR rule codes;
- GitHub Action usage;
- OpenAPI agent-readiness;
- MCP server readiness;
- bad/fixed examples;
- limitations and trust model.

### GitHub credibility

The repository should clearly show:

- CLI;
- GitHub Action;
- local-first scans;
- no live API execution;
- no live MCP execution;
- no LLM call requirement;
- stable `agentready.json`;
- stable AR rule codes;
- bad/fixed CI Gate proof;
- clear limitation text.

### SEO and AI discovery

Create factual, extractable, source-backed pages around:

- why valid OpenAPI specs can fail with agents;
- MCP readiness;
- dangerous agent-facing tool actions;
- confirmation boundaries;
- `agentready.json`;
- AR rule codes;
- CI policy examples;
- limitations.

### Product-led conversion

Community should make the standard easy to adopt. Paid conversion should happen when teams need Pro, Team, or Agency capabilities such as annotations, history, exceptions, branding, and multi-client management.

## Conversion Path

```txt
Community CLI / GitHub Action adoption
-> developer needs advanced workflow
-> Pro plan
-> shared team governance need
-> Team plan
-> multi-client / branded reporting need
-> Agency plan
```

There is no manual review package, quote workflow, request-by-email purchase path, manual payment process, or Enterprise plan at launch.

## Do Not Do

- Do not claim certification or guaranteed safety.
- Do not position AgentReady as a runtime firewall.
- Do not use manual services as the core model.
- Do not display unavailable paid features as purchasable.
- Do not require Contact Sales for Community, Pro, Team, or Agency.
- Do not build unrelated dashboards or proof-of-existence surfaces.

## Core Success Signal

The strongest signal is:

```txt
A developer or team wants AgentReady as a CI Gate before deploying agent-facing OpenAPI or MCP tools.
```

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
