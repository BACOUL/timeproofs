# AgentReady Self-Service Business Model

## Purpose

This document is the commercial source of truth for turning TimeProofs AgentReady into a premium, AI-first, global, 100% self-service software product.

Active product direction:

```txt
AgentReady is the shift-left CI gate for agent-facing contracts.
```

This document is specialized commercial guidance. If it conflicts with `AGENTREADY_MASTER_PLAN.md`, the master plan prevails.

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
-> automatic account creation for Pro
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

Commercial plans should not sell the existence of the standard or CI blocking. They sell workflow depth:

- versioned policies;
- pull request annotations;
- branch and pull request comparison;
- new-risk-only behavior;
- SARIF export;
- documented expiring exceptions;
`POST_MVP` commercial backlog:

- premium reports;
- hosted result history;
- notifications;
- collaboration;
- organizations;
- advanced individual developer features;
- client workspaces.

## Official Launch Plans

Prices are an initial product decision and may evolve before real Stripe activation.

All paid prices are excluding tax. Taxes must be calculated according to the applicable customer situation.

The initial launch includes only:

- AgentReady Community;
- AgentReady Pro.

Team and Agency are:

```txt
POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT
```

They remain long-term vision items, but they must not be presented as purchasable launch plans.

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

Repository scope:

- local use is not measured;
- no repository is registered in a TimeProofs hosted service;
- no Pro, Team, or Agency function is included;
- `repository_limit: null` means "no hosted service and no measurement", not unlimited access to paid hosted features.

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

- Pro functions on up to 5 registered repositories;
- versioned policy configuration;
- pull request annotations;
- branch / pull request comparison;
- new-risks-only mode;
- SARIF export;
- local structured and expiring exceptions;
- mandatory reason;
- exception owner;
- mandatory expiration.

Explicitly `POST_MVP`, not initial Pro entitlement:

- premium reports;
- hosted result history;
- notifications;
- collaboration;
- organizations;
- advanced individual developer features;
- client workspaces.

### AgentReady Team

Status:

```txt
POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT
```

Team is not part of the initial Community + Pro launch and is not an initial entitlement.

### AgentReady Agency

Status:

```txt
POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT
```

Agency is not part of the initial Community + Pro launch and is not an initial entitlement.

## Commercial Constraints

The active self-service direction forbids:

- manual services at 299 EUR, 499 EUR, 990 EUR, or any other manual package price;
- "Request review by email" as the main purchase path;
- manual payment as the main purchase path;
- mandatory "Contact sales" for Community or Pro at launch;
- quotes for Community or Pro;
- presenting Team or Agency as launch offers;
- Enterprise plan at launch;
- displaying a plan as available before its functions are actually implemented;
- claiming certification or guaranteed safety.

## Free-To-Paid Rules

Community remains free enough to make the standard adoptable.

Upgrade triggers:

- user needs versioned policies;
- user wants pull request annotations;
- user wants SARIF export;
- user needs baseline / pull request comparison;
- user needs new-risks-only behavior;
- user needs local structured and expiring exceptions with mandatory reason, owner, and expiration.

`POST_MVP` upgrade reasons must not be advertised as initial Pro availability.

Community local repository count alone is not an upgrade trigger. Community local and CI use remains unmetered.

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
- confusion that local unmetered Community usage means paid hosted features are unlimited;
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
