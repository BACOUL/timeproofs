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
| Team | POST_REVENUE | POST_REVENUE | Future shared team policies and history |
| Agency | POST_REVENUE | POST_REVENUE | Future multi-client agency operations |

Initial launch v0.1 includes only Community and Pro. Team and Agency are post-revenue vision items, not purchasable launch plans. No Enterprise plan is part of launch v0.1.

## Feature Matrix

| Feature | Community | Pro | Team | Agency |
| --- | --- | --- | --- | --- |
| CLI | yes | yes | yes | yes |
| GitHub Action | yes | yes | yes | yes |
| OpenAPI scans | yes | yes | yes | yes |
| MCP scans | yes | yes | yes | yes |
| AgentReady Score and status | yes | yes | yes | yes |
| `--min-score` / `--fail-on` policies | yes | yes | yes | yes |
| AR001-AR010 | yes | yes | yes | yes |
| Markdown report | yes | yes | yes | yes |
| `agentready.json` | yes | yes | yes | yes |
| Bad/fixed examples | yes | yes | yes | yes |
| Local analysis | yes | yes | yes | yes |
| Repository limit | local use unmetered; no hosted repositories | 5 registered repositories | 25 registered repositories | 100 registered repositories |
| Member limit | 1 local user | 1 | multiple | multiple |
| Organizations | no hosted organization | 1 personal org | 1 team org | multiple client orgs/workspaces |
| Versioned policies | no | yes | yes | yes |
| Pull request annotations | no | yes | yes | yes |
| Branch / PR comparison | no | yes | yes | yes |
| New risks only | no | yes | yes | yes |
| SARIF export | no | yes | yes | yes |
| Documented exceptions | no | yes | yes | yes |
| Expiring exceptions | no | yes | yes | yes |
| Exception owners and justifications | no | basic | yes | per client |
| Result history | local artifacts only | limited | team history | client-separated history |
| Premium reports | no | yes | yes | yes |
| Team reports | no | no | post-revenue | post-revenue |
| Agency branding | no | no | no | post-revenue |
| Client read-only access | no | no | no | post-revenue |
| Consolidated agency view | no | no | no | post-revenue |
| Notifications | no | basic | post-revenue | post-revenue |
| Support | public docs / issues | self-service help | self-service help + technical support | self-service help + technical support |

## Proposed Technical Entitlements

The entitlement object should be simple, explicit, and safe to cache.

Proposed fields:

| Entitlement | Type | Community | Pro | Team | Agency |
| --- | --- | --- | --- | --- | --- |
| `plan` | string | `community` | `pro` | `team` | `agency` |
| `repository_limit` | number/null | null | 5 | 25 | 100 |
| `member_limit` | number/null | 1 | 1 | null | null |
| `organization_limit` | number/null | 0 | 1 | 1 | null |
| `client_workspace_limit` | number/null | 0 | 0 | 0 | 100 |
| `pull_request_annotations` | boolean | false | true | true | true |
| `sarif_export` | boolean | false | true | true | true |
| `policy_management` | string | `local` | `versioned_personal` | `shared_team` | `client_workspace` |
| `exception_management` | string | `none` | `personal_expiring` | `centralized` | `client_scoped` |
| `history_retention` | string | `local_only` | `limited` | `team_retention` | `client_retention` |
| `report_branding` | string | `none` | `premium` | `team` | `agency_custom` |
| `read_only_client_access` | boolean | false | false | false | true |

## Repository Limit Semantics

Community:

- local use is not measured;
- no repository is registered in a TimeProofs hosted service;
- no Pro, Team, or Agency function is included;
- `repository_limit: null` means "no hosted service and no measurement", not unlimited access to paid hosted features.

Pro:

- Pro functions apply to up to 5 registered repositories.

Team:

- Team is post-revenue and not a launch plan.
- If built later, Team functions may apply to up to 25 registered repositories.

Agency:

- Agency is post-revenue and not a launch plan.
- If built later, Agency functions may apply to up to 100 registered repositories.

## Entitlement Principles

- Community must remain useful enough to grow the standard.
- Paid plans should unlock workflow, collaboration, history, and reporting depth.
- Upgrade reasons are versioned policies, pull request annotations, SARIF, baseline / pull request comparison, new-risks-only behavior, exceptions, premium reports, history, collaboration, and client workspaces.
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
- account or organization creation works;
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
