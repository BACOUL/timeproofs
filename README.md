# TimeProofs AgentReady

**TimeProofs AgentReady** is a pre-deployment CI gate for agent-facing OpenAPI and MCP tools.

Core promise:

```txt
Fail the build before unsafe agent-facing APIs or MCP tools are deployed.
```

AgentReady checks whether APIs and MCP tools are clear, bounded, and documented enough before AI agents can use them. It is local-first and designed for CI workflows.

## Product Direction

This repository is focused on:

```txt
OpenAPI / MCP contract
-> AgentReady CLI or GitHub Action
-> score + status + risk counts
-> AR001-AR010 rule codes
-> agentready.json
-> CI policy PASS / FAIL
```

The previous TimeProofs proof-of-existence website and timestamp/verify pages are historical only and no longer drive the active product surface.

## Current Foundation

Done:

- static OpenAPI scanner;
- static MCP tools scanner;
- AgentReady CLI alpha;
- commercial bad/fixed CI Gate validation;
- stable rule codes AR001-AR010;
- GitHub Action wrapper;
- `agentready.json` spec v0.1;
- `/agentready-ci` public page;
- homepage positioning around AgentReady CI Gate;
- Markdown report export;
- local `agentready.json` export;
- public docs and examples;
- legal, privacy, and terms draft pages;
- legacy proof runtime artifacts removed.

## Community Capabilities

Community is the free standard-adoption layer:

- CLI;
- GitHub Action;
- OpenAPI and MCP scans;
- score and status;
- `--min-score` and `--fail-on` policies;
- AR001-AR010;
- Markdown report;
- `agentready.json`;
- bad/fixed examples;
- local analysis.

## Self-Service Commercial Direction

AgentReady is planned as a zero-touch B2B software product.

Launch model:

- AgentReady Community: 0 EUR.
- AgentReady Pro: 24 EUR excl. VAT/month or 240 EUR excl. VAT/year.
- AgentReady Team: 79 EUR excl. VAT/month or 790 EUR excl. VAT/year.
- AgentReady Agency: 199 EUR excl. VAT/month or 1,990 EUR excl. VAT/year.

These prices are an initial product decision and may evolve before real Stripe activation. Paid plans must not be displayed as available until their features, entitlements, billing flow, support model, legal pages, and launch QA are ready.

There is no manual review offer, mandatory contact-sales step, quote workflow, manual payment path, or Enterprise plan at launch.

## Public Pages

```txt
/                              Homepage
/agentready-ci.html            AgentReady CI Gate page
/agentready.html               OpenAPI scanner
/agentready-mcp.html           MCP tools scanner
/agentready-simulation.html    Static scenario simulation
/agentready-docs.html          Public documentation
/agentready-examples.html      Public examples
/agentready-test.html          Static browser test harness, noindex
/legal.html                    Legal notice draft
/privacy.html                  Privacy draft
/terms.html                    Terms draft
```

## Local-First Trust Model

AgentReady should not require:

- backend for Community scans;
- account for Community scans;
- payment for Community scans;
- live API execution;
- live MCP execution;
- LLM calls;
- runtime firewall.

Future paid licensing must remain privacy-first: OpenAPI files, MCP definitions, full reports, and production secrets should not be sent to the license service by default.

## Important Files To Read First

```txt
AGENTREADY_PROJECT_CONTEXT.md
ROADMAP.md
docs/agentready/README.md
docs/agentready/TODO_NEXT.md
docs/agentready/REMAINING_WORK.md
docs/agentready/LONG_TERM_PRODUCT_ROADMAP.md
docs/agentready/SELF_SERVICE_EXECUTION_PLAN.md
docs/agentready/SELF_SERVICE_BUSINESS_MODEL.md
docs/agentready/PRICING_AND_ENTITLEMENTS_V0_1.md
docs/agentready/AUTOMATED_PURCHASE_AND_BILLING_FLOW.md
docs/agentready/LICENSE_AND_ENTITLEMENT_ARCHITECTURE.md
docs/agentready/LEGAL_PRIVACY_AND_COOKIE_REQUIREMENTS.md
docs/agentready/SEO_GEO_AI_FIRST_REQUIREMENTS.md
docs/agentready/GLOBAL_LAUNCH_READINESS_MATRIX.md
docs/agentready/AGENTREADY_JSON_SPEC.md
docs/agentready/GITHUB_ACTION_USAGE.md
docs/agentready/AGENTREADY_RULE_CODES.md
docs/agentready/COMMERCIAL_FIXTURE_CI_GATE_BEHAVIOR.md
```

## Immediate Next Step

```txt
feat(distribution): package AgentReady CLI for public installation
```

Planned branch:

```txt
feat-agentready-cli-public-distribution
```

This step prepares public CLI installation, package identity, public command, version/help behavior, and clean-environment installation testing. It must not publish the package without separate validation.

The locked execution order is documented in:

```txt
docs/agentready/SELF_SERVICE_EXECUTION_PLAN.md
```

## Validation Commands

```txt
node agentready-core/tests/run-agentready-core-tests.mjs
node cli/tests/run-agentready-cli-tests.mjs
node cli/tests/run-agentready-action-smoke-test.mjs
```

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
