# TimeProofs AgentReady Execution Lock

## Status

This lock replaces the earlier CLI-alpha execution lock. CLI alpha, CI Gate validation, rule codes, GitHub Action wrapper, `agentready.json` v0.1, `/agentready-ci`, and homepage CI Gate positioning are now merged.

The active lock is self-service launch readiness.

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
Phase: self-service commercial and launch architecture
Active PR: docs(product): define AgentReady self-service commercial and launch architecture
Base branch: timeproofs
```

## Current PR Objective

The current PR must only create and align documentation for:

- zero-touch commercial model;
- Community, Pro, Team, and Agency plans;
- pricing and entitlement matrix;
- automated purchase and billing flow;
- license and entitlement architecture;
- legal, privacy, and cookie requirements;
- SEO, GEO, and AI-first requirements;
- global launch readiness matrix;
- roadmap sequence for self-service launch.

## Current PR Acceptance Criteria

1. The PR is docs-only.
2. No public HTML page changes.
3. No scanner, CLI, GitHub Action, scoring, or rule-code changes.
4. No Stripe, backend, account, database, license, dashboard, or cookie implementation.
5. No manual review, quote, request-by-email, manual payment, consulting-first, or Enterprise launch direction remains active.
6. The active roadmap contains the self-service build sequence.
7. Legal/privacy/cookie docs use `TO_BE_COMPLETED` for unknown real company data.
8. The mandatory limitation text appears in the core docs.

## Build Order

Do not reorder without an explicit recorded decision.

1. Finalize the self-service commercial architecture.
2. Stabilize Community features.
3. Build Pro features.
4. Define and implement entitlements.
5. Build the minimal license service.
6. Integrate Stripe Checkout in test mode.
7. Process webhooks.
8. Build the customer portal.
9. Create transactional emails.
10. Test renewal, upgrade, downgrade, cancellation, and failed payment.
11. Build Team.
12. Build Agency.
13. Rebuild `pricing.html`.
14. Finalize company, legal, privacy, and cookies.
15. Complete SEO, structured data, and AI discovery.
16. Execute the global launch audit.
17. Open Stripe in production.

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
