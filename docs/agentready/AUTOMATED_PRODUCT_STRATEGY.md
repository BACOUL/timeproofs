# TimeProofs AgentReady Automated Product Strategy

SUPERSEDED BY `AGENTREADY_MASTER_PLAN.md` where this file conflicts with the master plan.

This document is retained as historical planning context. The active launch scope is Community + Pro; Team and Agency are post-revenue.

## Purpose

This document defines how TimeProofs AgentReady becomes a zero-touch B2B software product without turning into a manual service business.

## Principle

```txt
AgentReady should be bought, activated, installed, used, renewed, changed, invoiced, and cancelled without routine human intervention.
```

Human intervention should be limited to bugs, incidents, exceptional payment cases, and real technical support.

## Current Foundation

The Community foundation is local-first:

- CLI;
- GitHub Action;
- OpenAPI and MCP scans;
- score and status;
- `--min-score` and `--fail-on`;
- AR001-AR010 rule codes;
- Markdown report;
- `agentready.json`;
- bad/fixed examples;
- local analysis;
- no live API execution;
- no live MCP execution;
- no LLM call required.

## Target Automation Chain

```txt
pricing page
-> Stripe Checkout
-> business information and VAT handling
-> terms acceptance
-> payment
-> webhook
-> customer creation
-> organization creation
-> subscription creation
-> license generation
-> transactional email
-> success page
-> CLI or GitHub Action activation
-> renewal
-> plan change
-> cancellation
-> invoices through customer portal
```

## Product Ladder

| Stage | Product | Automation level |
|---|---|---|
| 1 | Community CLI and GitHub Action | Free, local-first |
| 2 | Pro | Paid, individual developer automation |
| 3 | Team | Paid, organization and shared policy automation |
| 4 | Agency | Paid, multi-client automation |
| 5 | Customer portal | Self-service billing and subscription management |
| 6 | Support automation | Docs, error messages, status page, and transactional emails |

## Paid Capabilities

Pro:

- versioned policies;
- pull request annotations;
- branch / pull request comparison;
- new-risks-only mode;
- SARIF export;
- expirable exceptions;
- premium reports.

Team:

- members;
- organization;
- shared policies;
- CI result history;
- centralized exceptions;
- dated control evidence;
- team reports;
- notifications.

Agency:

- client workspaces;
- distinct policies;
- agency report branding;
- read-only client access;
- consolidated overview;
- client-specific history and exceptions.

## Licensing Strategy

Paid features should be unlocked by a license and entitlement layer, not by uploading scan inputs.

Allowed minimal data for license validation:

- license or installation token;
- plan;
- package/action version;
- pseudonymized repository identifier;
- entitlement metadata;
- timestamp;
- coarse validation status.

Forbidden by default:

- OpenAPI files;
- MCP tool definitions;
- source code;
- production secrets;
- full scan reports;
- full `agentready.json` outputs.

## Billing Strategy

Stripe Checkout and Stripe Customer Portal are the planned first billing surfaces.

Expected events:

- `checkout.session.completed`;
- `customer.subscription.created`;
- `customer.subscription.updated`;
- `customer.subscription.deleted`;
- `invoice.paid`;
- `invoice.payment_failed`.

Real production payments must wait until legal, privacy, tax, refund, support, license, entitlement, and launch QA requirements are ready.

## Do Not Build In Docs-Only PRs

- Stripe integration;
- webhook handler;
- database;
- account system;
- license service;
- customer portal;
- dashboard;
- cookies;
- public pricing changes.

## Strategic Rule

```txt
The scanner quality, CI behavior, AR rule codes, agentready.json contract, examples, CLI, GitHub Action, and self-service activation path are the product.
```

Manual reports, consulting packs, request-by-email sales, and quote-based launch flows are not the active business model.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
