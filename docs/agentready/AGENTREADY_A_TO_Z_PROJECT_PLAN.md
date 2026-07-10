# TimeProofs AgentReady A to Z Project Plan

## Purpose

This document defines the coherent project path for TimeProofs AgentReady from CI Gate foundation to self-service B2B software product.

## One-Line Project

```txt
TimeProofs AgentReady is a pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

## Core Promise

```txt
Fail the build before unsafe agent-facing APIs or MCP tools are deployed.
```

## Why This Project Exists

AI agents increasingly call APIs and MCP tools. A valid OpenAPI file or working MCP server can still expose a tool surface that is dangerous, vague, too broad, or hard for an agent to recover from.

AgentReady checks the contract before deployment and turns the result into a CI decision, stable rule codes, and an `agentready.json` output.

## What We Are Building

```txt
CLI
-> GitHub Action
-> CI policy gate
-> stable AR rule codes
-> agentready.json v0.1
-> bad/fixed benchmark examples
-> self-service commercial plans
-> entitlements
-> minimal license service
-> Stripe Checkout
-> customer portal
-> Team and Agency workflows
```

## What We Are Not Building

- a general AI security platform;
- a runtime firewall;
- a legacy proof-of-existence product;
- a timestamp product;
- a dashboard-first SaaS;
- a certification claim;
- live API or MCP execution;
- an LLM evaluation product;
- manual consulting as the main business model;
- mandatory Contact Sales for launch plans;
- Enterprise at launch.

## Current Foundation

Completed:

- CLI alpha;
- OpenAPI and MCP scans;
- CI exit behavior;
- commercial bad/fixed CI Gate validation;
- AR001-AR010 rule codes;
- GitHub Action wrapper;
- `agentready.json` spec v0.1;
- `/agentready-ci` public page;
- homepage repositioning around CI Gate;
- premium site standard docs.

## Standard Assets To Own

1. `agentready.json`.
2. AgentReady Score.
3. AgentReady status and CI policy result.
4. AR001-AR010 rule codes.
5. Bad/fixed benchmark fixtures.
6. GitHub Action examples.
7. Public CI Gate documentation.
8. Pricing and entitlement contract.
9. License and billing architecture.
10. Privacy-first trust model.

## Self-Service Commercial Model

| Plan | Price | Scope |
|---|---:|---|
| Community | 0 EUR | CLI, GitHub Action, local scans, score/status, policy flags, rule codes, Markdown report, `agentready.json`, examples |
| Pro | 24 EUR excl. VAT/month or 240 EUR excl. VAT/year | Up to 5 repositories, versioned policies, PR annotations, branch/PR comparison, new risks only, SARIF, expirable exceptions, premium reports |
| Team | 79 EUR excl. VAT/month or 790 EUR excl. VAT/year | Up to 25 repositories, members, organization, shared policies, CI history, centralized exceptions, dated evidence, team reports, notifications |
| Agency | 199 EUR excl. VAT/month or 1,990 EUR excl. VAT/year | Up to 100 repositories, client workspaces, distinct policies, agency branding, read-only client access, consolidated overview |

Prices are an initial product decision and may evolve before real Stripe activation. Purchases are B2B at launch, with taxes calculated according to the applicable situation.

No paid plan should be shown as available until its functionality and entitlements are implemented.

## Build Sequence

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

## Acceptance Criteria For Commercial Launch

- Community remains useful without payment.
- Pro, Team, and Agency entitlements are enforced.
- Stripe Checkout, webhooks, invoices, cancellation, and Customer Portal are tested.
- Licenses activate automatically after payment.
- GitHub Actions and CLI can consume license data without uploading OpenAPI or MCP files.
- Legal, privacy, cookie, tax, refund, support, and incident requirements are complete.
- Paid pages do not claim unavailable features.
- Public content includes limitation text and avoids safety guarantees.

## Operating Method

Every PR must state:

- objective;
- files changed;
- acceptance criteria;
- explicit out-of-scope items;
- next recommended PR.

Before any task, ask:

```txt
Does this directly move TimeProofs toward AgentReady CI Gate adoption or self-service launch readiness?
```

If no, do not do it during the current execution path.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
