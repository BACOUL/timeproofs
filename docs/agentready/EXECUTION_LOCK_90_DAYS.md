# TimeProofs AgentReady Execution Lock

## Status

This lock replaces the earlier CLI-alpha execution lock. CLI alpha, CI Gate validation, rule codes, GitHub Action wrapper, `agentready.json` v0.1, `/agentready-ci`, homepage CI Gate positioning, and self-service commercial architecture are now merged or in the final review path.

The active lock after merge of #109 is Community public distribution.

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
Phase after merge of #109: Community public distribution
Next PR: feat(distribution): package AgentReady CLI for public installation
Base branch: timeproofs
```

## Next PR Objective

The next PR must only prepare public CLI distribution:

- prepare a public CLI installation path;
- define the package and public command;
- add version and help behavior;
- test installation in a clean environment;
- avoid actual package publication without separate validation.

Planned branch:

```txt
feat-agentready-cli-public-distribution
```

## Current Lock Acceptance Criteria

1. The self-service architecture PR is merged before #110 begins.
2. Community distribution work is limited to CLI packaging and installation readiness.
3. No public HTML page changes are included in #110.
4. No scanner scoring, rule-code, or hosted commercial behavior changes are included in #110.
5. No Stripe, backend, account, database, license, dashboard, or cookie implementation is included in #110.
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
