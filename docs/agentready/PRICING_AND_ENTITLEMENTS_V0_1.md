# Pricing And Entitlements v0.1

## Purpose

This document defines the proposed commercial plan matrix and entitlement model for AgentReady self-service plans.

It is documentation only. It does not implement licensing, billing, accounts, Stripe, backend, or entitlement checks.

If this document conflicts with `AGENTREADY_MASTER_PLAN.md`, the master plan prevails.

## Pricing

Prices are initial product decisions and may evolve before real Stripe activation.

All paid prices are excluding tax. Taxes must be calculated according to the applicable B2B customer situation.

| Plan | Monthly | Annual | Primary use |
| --- | ---: | ---: | --- |
| Community | 0 EUR | 0 EUR | Standard adoption and local CI usage |
| Pro | 24 EUR HT | 240 EUR HT | Individual advanced developer workflow |
| Team | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | Future shared team policies and history |
| Agency | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | Future multi-client agency operations |

Initial launch v0.1 includes only Community and Pro. Team and Agency are `POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT`, not purchasable launch plans. No Enterprise plan is part of launch v0.1.

## Feature Matrix

| Feature | Community | Pro | Team | Agency |
| --- | --- | --- | --- | --- |
| CLI | yes | yes | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| GitHub Action | yes | yes | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| OpenAPI scans | yes | yes | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| MCP scans | yes | yes | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| AgentReady Score and status | yes | yes | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| `--min-score` / `--fail-on` policies | yes | yes | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| AR001-AR010 | yes | yes | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| Markdown report | yes | yes | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| `agentready.json` | yes | yes | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| Bad/fixed examples | yes | yes | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| Local analysis | yes | yes | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| Repository limit | local use unmetered; no hosted repositories | 5 registered repositories | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| Member limit | 1 local user | 1 | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| Organizations | no hosted organization | no organization | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| Versioned policies | no | yes | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| Pull request annotations | no | yes | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| Branch / PR comparison | no | yes | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| New risks only | no | yes | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| SARIF export | no | yes | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| Documented exceptions | no | yes | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| Expiring exceptions | no | yes | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| Exception owners and justifications | no | basic | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| Result history | local artifacts only | POST_MVP hosted history | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| Premium reports | no | POST_MVP | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| Team reports | no | no | post-revenue | post-revenue |
| Agency branding | no | no | no | post-revenue |
| Client read-only access | no | no | no | post-revenue |
| Consolidated agency view | no | no | no | post-revenue |
| Notifications | no | POST_MVP | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| Support | public docs / issues | self-service help | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |

## Proposed Technical Entitlements

The entitlement object should be simple, explicit, and safe to cache.

Proposed fields:

| Entitlement | Type | Community | Pro | Team | Agency |
| --- | --- | --- | --- | --- | --- |
| `plan` | string | `community` | `pro` | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| `repository_limit` | number/null | null | 5 | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| `member_limit` | number/null | 1 | 1 | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| `organization_limit` | number/null | 0 | 0 | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| `client_workspace_limit` | number/null | 0 | 0 | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| `pull_request_annotations` | boolean | false | true | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| `sarif_export` | boolean | false | true | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| `policy_management` | string | `local` | `versioned_personal` | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| `exception_management` | string | `none` | `personal_expiring` | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| `history_retention` | string | `local_only` | `POST_MVP` | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| `report_branding` | string | `none` | `POST_MVP` | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |
| `read_only_client_access` | boolean | false | false | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT | POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT |

## Repository Limit Semantics

Community:

- local use is not measured;
- no repository is registered in a TimeProofs hosted service;
- no Pro, Team, or Agency function is included;
- `repository_limit: null` means "no hosted service and no measurement", not unlimited access to paid hosted features.

Pro:

- Pro functions apply to up to 5 registered repositories.

Team:

- Team is `POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT`.

Agency:

- Agency is `POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT`.

## Entitlement Principles

- Community must remain useful enough to grow the standard.
- Pro unlocks versioned policy configuration, pull request annotations, SARIF export, baseline / pull request comparison, new-risks-only mode, and local structured expiring exceptions.
- Premium reports, hosted history, notifications, collaboration, organizations, advanced individual developer features, and client workspaces are `POST_MVP` or `POST_REVENUE`, not initial Pro entitlements.
- Community local repository count alone is not an upgrade reason.
- Entitlements must not require OpenAPI files or MCP definitions to be uploaded.
- Entitlements should be validated with minimal metadata.
- A cached entitlement should allow reasonable offline behavior.
- Expired or downgraded plans should degrade predictably.
- Features must not be shown as available until implemented.

## Plan Availability Rule

Public pricing may show future plan direction only if clearly labelled as planned or not yet available.

A plan can be displayed as available only when:

- payment works;
- account creation works;
- license activation works;
- entitlement checks exist;
- the advertised features are implemented;
- cancellation, renewal, upgrade, downgrade, invoices, and failed payment flows are tested.

## Non-Goals For This PR

This PR does not implement:

- entitlement storage;
- entitlement validation;
- license keys;
- account creation;
- hosted organizations;
- Stripe Checkout;
- billing portal;
- backend;
- database.

## Non-Guarantee

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
