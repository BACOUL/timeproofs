# AgentReady Self-Service Business Model

## Purpose

This document is the commercial source of truth for turning TimeProofs AgentReady into a premium, AI-first, global, 100% self-service software product.

Active product direction:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

Primary promise:

```txt
Fail the build before unsafe agent-facing APIs or MCP tools are deployed.
```

## Zero-Touch Objective

The target customer journey is:

```txt
discovery
-> plan selection
-> payment
-> automatic account or organization creation
-> automatic license activation
-> installation
-> usage
-> renewal
-> invoices
-> plan change
-> cancellation
```

Human intervention must be limited to:

- bugs;
- incidents;
- exceptional payment problems;
- real technical support cases.

The owner must not be required to manually sell reviews, issue quotes, process email requests, activate licenses by hand, or intervene in every sale.

## Target Customers

Initial launch target is B2B.

Priority segments:

- API developers exposing OpenAPI operations to agents;
- MCP builders publishing tools for agent use;
- platform and developer-experience teams adding CI checks;
- security-minded engineering teams;
- AI agencies managing multiple client tool surfaces.

Individual hobby usage can adopt Community, but paid purchases are B2B at launch.

## Free Standard vs Commercial Features

AgentReady Community exists to drive standard adoption.

Community should make these assets widely usable:

- CLI;
- GitHub Action;
- OpenAPI and MCP scans;
- AgentReady Score and status;
- `--min-score` and `--fail-on` policies;
- AR001-AR010;
- Markdown report;
- `agentready.json`;
- bad/fixed examples;
- local analysis.

Commercial plans should not sell the existence of the standard. They sell workflow depth:

- repository limits;
- versioned policies;
- pull request annotations;
- branch and pull request comparison;
- new-risk-only behavior;
- SARIF export;
- documented expiring exceptions;
- premium reports;
- team/agency organization features;
- history and evidence retention;
- client workspaces and read-only access.

## Official Plans

Prices are an initial product decision and may evolve before real Stripe activation.

All paid prices are excluding tax. Taxes must be calculated according to the applicable customer situation.

### AgentReady Community

Price:

```txt
0 EUR
```

Includes:

- CLI;
- GitHub Action;
- OpenAPI scans;
- MCP scans;
- score and status;
- `--min-score` and `--fail-on`;
- AR001-AR010;
- Markdown report;
- `agentready.json`;
- bad/fixed examples;
- local analysis;
- features required to adopt the AgentReady standard.

### AgentReady Pro

Price:

```txt
24 EUR HT / month
240 EUR HT / year
```

Target:

- individual developer;
- solo consultant;
- founder or maintainer running AgentReady across a small repository set.

Includes:

- up to 5 repositories;
- versioned policies;
- pull request annotations;
- branch / pull request comparison;
- new risks only;
- SARIF export;
- documented expiring exceptions;
- premium reports;
- advanced individual developer features.

### AgentReady Team

Price:

```txt
79 EUR HT / month
790 EUR HT / year
```

Target:

- engineering team;
- platform team;
- product/security team managing multiple repositories.

Includes:

- up to 25 repositories;
- multiple members;
- organization;
- shared policies;
- CI result history;
- centralized exception management;
- owners and justifications;
- comparison between versions;
- dated control evidence;
- team reports;
- automatic notifications.

### AgentReady Agency

Price:

```txt
199 EUR HT / month
1,990 EUR HT / year
```

Target:

- AI agency;
- consultancy;
- studio managing multiple client tool surfaces.

Includes:

- up to 100 repositories;
- multiple organizations or clients;
- separate client workspaces;
- distinct policies;
- customizable reports with agency identity;
- client read-only access;
- consolidated dashboard;
- history and exceptions per client.

## Commercial Constraints

The active self-service direction forbids:

- manual services at 299 EUR, 499 EUR, 990 EUR, or any other manual package price;
- "Request review by email" as the main purchase path;
- manual payment as the main purchase path;
- mandatory "Contact sales" for Community, Pro, Team, or Agency at launch;
- quotes for Community, Pro, Team, or Agency;
- Enterprise plan at launch;
- displaying a plan as available before its functions are actually implemented;
- claiming certification or guaranteed safety.

## Free-To-Paid Rules

Community remains free enough to make the standard adoptable.

Upgrade triggers:

- user needs more than local CLI/GitHub Action output;
- user wants pull request annotations;
- user wants SARIF export;
- user needs versioned policies;
- user needs repository limits above Community;
- user needs exception management;
- user needs history, organization, members, or client workspaces;
- user needs premium reports.

Downgrade rules:

- paid-only features become read-only or disabled after downgrade;
- generated historical artifacts remain available according to retention policy;
- license validation should reflect the new plan automatically;
- no manual intervention should be required for ordinary plan changes.

## Automated Support Principles

Support should be self-service by default:

- clear docs;
- actionable CLI errors;
- visible license status;
- payment and invoice access in customer portal;
- troubleshooting guide;
- status page;
- transactional emails;
- account deletion flow;
- documented refund policy.

Human support is reserved for:

- product bugs;
- billing exceptions that Stripe Customer Portal cannot handle;
- account access incidents;
- security reports;
- technical failures.

## Commercial Risks

Risks to manage before sales open:

- overpromising paid features not yet implemented;
- pricing too low for support burden;
- pricing too high before trust is earned;
- VAT and invoice complexity;
- weak refund terms;
- unclear legal identity;
- support overload from self-service onboarding failures;
- privacy concerns if users think API/MCP files are uploaded;
- abuse of Community as unlimited commercial automation;
- agency plan complexity before Team is stable.

## Criteria Before Opening Sales

Do not activate real paid checkout until these are true:

- Community feature set is stable enough for public use;
- paid feature list is implemented or hidden;
- entitlements exist in code and are tested;
- license service exists and is privacy-first;
- Stripe Checkout works in test mode;
- webhooks are handled idempotently;
- subscriptions, renewals, upgrades, downgrades, cancellations, and payment failures are tested;
- invoices and VAT behavior are validated;
- terms, privacy, cookies, refund policy, and legal notice are completed;
- company identity fields are complete;
- support/help/status pages exist;
- launch QA matrix has no blocking items.

## Non-Guarantee

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
