# Long-Term Product Roadmap

SUPERSEDED BY `AGENTREADY_MASTER_PLAN.md` and `EXECUTION_SEQUENCE.md` where this file conflicts with them.

This document is retained as long-term context. The active launch scope is Community + Pro; Team and Agency are post-revenue.

## Direction

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

Core promise:

```txt
Fail the build before unsafe agent-facing APIs or MCP tools are deployed.
```

## Product Thesis

AgentReady should become a portable readiness standard and self-service CI Gate for APIs and MCP tools before AI agents use them.

The durable assets are:

- `agentready.json` v0.1;
- rule codes AR001-AR010;
- commercial bad/fixed fixture evidence;
- CLI and GitHub Action workflows;
- human-readable reports;
- self-service pricing and entitlements;
- license activation that preserves local-first scanning;
- trust, privacy, and launch-readiness documentation.

## Phase 1 - CI Gate Foundation

Status: built and merged.

Includes:

- OpenAPI static scanner;
- MCP static scanner;
- CLI alpha;
- GitHub Action wrapper;
- commercial CI Gate validation;
- rule codes AR001-AR010;
- `agentready.json` v0.1 spec and export compatibility;
- `/agentready-ci` public page;
- homepage CI Gate positioning.

## Phase 2 - Self-Service Architecture

Status: current.

Work:

- define Community, Pro, Team, and Agency;
- document pricing and entitlement limits;
- document automated purchase and billing flow;
- document license and entitlement architecture;
- document legal, privacy, cookie, SEO, GEO, and AI-first requirements;
- create launch readiness matrix.

## Phase 3 - Community Stabilization

Work:

- keep CLI and GitHub Action reliable;
- keep local-first scanning clear;
- keep `agentready.json` compatible;
- keep bad/fixed examples reproducible;
- improve docs and examples without changing core scoring unless fixture evidence proves a bug.

## Phase 4 - Pro

Work:

- versioned policies;
- pull request annotations;
- branch / pull request comparison;
- new-risks-only behavior;
- SARIF export;
- documented expirable exceptions;
- premium reports;
- entitlement enforcement.

## Phase 5 - Licensing, Billing, and Customer Portal

Work:

- minimal privacy-first license service;
- Stripe Checkout in test mode;
- idempotent webhook handling;
- Customer Portal;
- transactional emails;
- invoices;
- renewal, upgrade, downgrade, cancellation, and payment-failure tests.

## Phase 6 - Team and Agency

Team:

- shared policies;
- organization members;
- history;
- centralized exceptions;
- dated evidence;
- team reports.

Agency:

- client workspaces;
- distinct policies;
- branded reports;
- read-only client access;
- consolidated overview.

## Phase 7 - Launch Readiness

Work:

- rebuild `pricing.html` only after paid features exist;
- finalize company, legal, privacy, cookie, refund, tax, and support requirements;
- complete SEO, structured data, and AI discovery;
- complete accessibility, mobile, performance, and launch QA;
- open Stripe in production only when the launch matrix has no blocking items.

## Boundaries

- no absolute safety claims;
- no manual consulting model as the primary business;
- no mandatory Contact Sales for launch plans;
- no Enterprise plan at launch;
- no runtime firewall unless explicitly scoped after CI Gate adoption;
- no public display of unavailable paid plans.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
