# TimeProofs AgentReady Execution Lock

## Status

This lock replaces the earlier CLI-alpha execution lock. CLI alpha, CI Gate validation, rule codes, GitHub Action wrapper, `agentready.json` v0.1, `/agentready-ci`, homepage CI Gate positioning, self-service commercial architecture, CLI public distribution preparation, and versioned GitHub Action preparation are now merged or in the final review path.

The active lock after merge of #111 is Community release workflow preparation.

## Locked Product Statement

```txt
TimeProofs AgentReady is a pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

Core promise:

```txt
Fail the build before unsafe agent-facing APIs or MCP tools are deployed.
```

## Current Execution Phase

```txt
Phase after merge of #111: Community release workflow
Next PR: release(agentready): establish Community release workflow
Base branch: timeproofs
```

## Next PR Objective

The next PR must only define the Community release workflow:

- define release validation gates;
- define when tags may be created;
- define package and Action provenance expectations;
- keep scan, scoring, rule codes, and `agentready.json` behavior unchanged;
- avoid npm publication, release creation, or tag creation without separate validation.

Planned branch:

```txt
release-agentready-community-workflow
```

## Current Lock Acceptance Criteria

1. The versioned GitHub Action preparation PR is merged before #112 begins.
2. Community release workflow work is limited to release process and release gates.
3. No public HTML page changes are included in #112.
4. No scanner scoring, rule-code, or hosted commercial behavior changes are included in #112.
5. No Stripe, backend, account, database, license, dashboard, or cookie implementation is included in #112.
6. No manual review, quote, request-by-email, manual payment, consulting-first, or Enterprise launch direction is reintroduced.
7. The mandatory limitation text remains present in core docs.

## Locked Execution Plan

The operational source of truth for future PR order is:

```txt
docs/agentready/SELF_SERVICE_EXECUTION_PLAN.md
```

The PR numbers in that document are expected numbers. If GitHub assigns a different number, the title and order remain the authority.

## Build Order

Do not reorder without an explicit recorded decision.

1. Community distribution.
2. Pro.
3. Entitlements and licensing.
4. Billing and automation.
5. Team.
6. Agency.
7. Commercial site.
8. Company, legal, and privacy.
9. SEO, documentation, and AI discovery.
10. Launch.

## Do Not Build During This Lock

- new product pivot;
- old proof-of-existence product;
- timestamp product;
- public certification claim;
- runtime firewall;
- live MCP execution;
- LLM evaluation product;
- dashboard;
- account system;
- Stripe Checkout implementation;
- database;
- hosted scan storage;
- marketplace;
- broad AI security platform.

These can only move forward in the documented sequence and in dedicated implementation PRs.

## Commercial Guardrails

Launch plans:

- Community: 0 EUR.
- Pro: 24 EUR excl. VAT/month or 240 EUR excl. VAT/year.
- Team: 79 EUR excl. VAT/month or 790 EUR excl. VAT/year.
- Agency: 199 EUR excl. VAT/month or 1,990 EUR excl. VAT/year.

No paid plan should be displayed as available until its features are implemented and entitlements are enforceable.

There is no manual review offer, mandatory contact-sales step, quote workflow, manual payment path, or Enterprise plan at launch.

## Decision Rule Before Any New Task

Before starting any task, ask:

```txt
Does this directly move TimeProofs toward AgentReady CI Gate adoption or self-service launch readiness?
```

If the answer is no, do not do it in this execution lock.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
