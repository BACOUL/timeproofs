# Remaining Work - TimeProofs AgentReady

## Purpose

This checklist defines the remaining path after the CI Gate foundation has landed.

## Current Status

```txt
CLI alpha: merged
Commercial CI Gate validation: merged
Rule codes AR001-AR010: merged
GitHub Action wrapper: merged
agentready.json spec v0.1: merged and aligned with code
/agentready-ci public page: merged
Homepage CI Gate positioning: merged
Self-service commercial and launch architecture: documented
CLI public distribution package preparation: prepared
Versioned GitHub Action preparation: prepared
Community release workflow: prepared
```

Community public publication remains blocked and has not occurred.

## Priority 1 - Strategic Rebaseline

Next PR:

```txt
docs(product): rebaseline AgentReady Community and Pro strategy
```

Planned branch:

```txt
docs-agentready-community-pro-rebaseline
```

Work:

- rebaseline AgentReady Community and Pro strategy;
- keep the rebaseline docs-only;
- prevent Pro implementation from starting before strategy is locked;
- keep scan/scoring/rule-code behavior stable;
- do not publish npm packages, create tags, create releases, or list in Marketplace without separate validation.

The versioned policy configuration PR remains planned after the rebaseline PR is merged.

## Locked Execution Plan

The operational PR sequence is defined in:

```txt
docs/agentready/SELF_SERVICE_EXECUTION_PLAN.md
```

Expected PR numbers are guidance. If GitHub assigns another number, the title and order remain the authority.

## Priority 2 - Community Publication Blockers

Community is the free standard-adoption layer:

- CLI;
- GitHub Action;
- OpenAPI and MCP scans;
- score and status;
- `--min-score` and `--fail-on` policies;
- AR001-AR010 rule codes;
- Markdown report;
- `agentready.json`;
- bad/fixed examples;
- local analysis.

The goal is adoption of the AgentReady standard before paid features are exposed. Community local use is not measured and no repository is registered in a TimeProofs hosted service.

Community publication remains blocked until npm scope ownership, license decisions, publication security, immutable tag approval, release notes, and explicit release approval are complete.

## Priority 3 - Build Pro

Pro should add individual developer value:

- Pro functions on up to 5 registered repositories;
- versioned policies;
- pull request annotations;
- branch / pull request comparison;
- new-risks-only mode;
- SARIF export;
- documented expirable exceptions;
- premium reports.

Do not display Pro as available until these features and their entitlements are implemented and tested.

## Priority 4 - Entitlements, License, Billing, and Portal

Build in this order:

1. Define and implement entitlements.
2. Build the minimal license service.
3. Integrate Stripe Checkout in test mode.
4. Process webhooks.
5. Build the customer portal.
6. Create transactional emails.
7. Test renewal, upgrade, downgrade, cancellation, and failed payment.

Privacy-first rule: OpenAPI files, MCP definitions, full reports, and production secrets must not be sent to the license service by default.

## Priority 5 - Team and Agency

Team and Agency should be built only after Pro is stable.

Team target:

- Team functions on up to 25 registered repositories;
- several members;
- organization;
- shared policies;
- CI result history;
- centralized exceptions;
- owners and justifications;
- dated control evidence;
- team reports;
- notifications.

Agency target:

- Agency functions on up to 100 registered repositories;
- several organizations or clients;
- separated client workspaces;
- distinct policies;
- agency-branded reports;
- read-only client access;
- consolidated overview;
- client-specific history and exceptions.

## Priority 6 - Public Launch Readiness

Before opening real Stripe sales:

- rebuild `pricing.html` only when plans are implemented;
- finalize company, legal, privacy, and cookie pages;
- complete SEO, structured data, and AI discovery;
- complete mobile, accessibility, and performance QA;
- complete incident, support, refund, tax, and billing checks;
- execute the global launch audit.

## Keep Contracts Stable

Do not casually change:

- scoring;
- AR001-AR010 meanings;
- `agentready.json` v0.1 field names;
- CLI exit behavior;
- GitHub Action inputs and outputs.

Any change here needs fixture-backed evidence.

## Commercial Guardrails

Do not use manual reviews, quote requests, request-by-email purchases, manual payment, consulting packs, or Enterprise sales as the launch model.

Human intervention should be limited to bugs, incidents, exceptional payment cases, and real technical support.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
