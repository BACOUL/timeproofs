# TimeProofs AgentReady — Automated Product Strategy

## Purpose

This document defines how TimeProofs AgentReady can evolve into a zero-touch, automatable B2B micro-SaaS without adding heavy product layers too early.

The principle is:

```txt
Automate the product path, but do not build SaaS infrastructure before demand exists.
```

## Current foundation

Browser V1 is the adoption and trust foundation:

```txt
- local browser analysis;
- no backend;
- no account;
- no payment;
- no dashboard;
- no API execution;
- no MCP execution;
- no LLM call;
- agentready.json output;
- agentready-simulation.json output;
- human-readable reports.
```

This should remain the free trust-building layer.

## Target automation chain

Long-term target:

```txt
OpenAPI / MCP / tool schema
→ local scan
→ AgentReady Score
→ risk findings
→ recommended fixes
→ agentready.json
→ agentready-simulation.json
→ CLI / GitHub Action
→ CI/CD pass/fail
→ optional premium report
→ optional AgentReady Checked artifact
→ optional paid policy packs
```

## Product ladder

| Stage | Product | Revenue role | Automation level |
|---|---|---|---|
| 1 | Free browser scanner | Adoption | 100% local |
| 2 | Free CLI | Developer workflow adoption | 100% local |
| 3 | GitHub Action | CI/CD adoption | 100% local except dependency install |
| 4 | Policy packs | Paid value layer | Mostly local |
| 5 | Premium report export | Paid self-serve output | Automatable |
| 6 | AgentReady Checked | Trust artifact | Initially semi-automated, later automated |
| 7 | License check | Paid access control | One lightweight network call |
| 8 | Dashboard | Customer self-service | Only after demand |

## What not to build yet

Do not build now:

```txt
- GitHub OAuth;
- Stripe Checkout;
- billing webhooks;
- license API;
- dashboard;
- account system;
- database;
- team management;
- usage analytics;
- runtime gateway;
- hosted scan storage.
```

These are monetization infrastructure. They should come only after CLI and CI/CD demand is demonstrated.

## Why not too early

Adding SaaS infrastructure too early creates:

```txt
- support burden;
- billing complexity;
- security expectations;
- privacy concerns;
- deployment cost;
- distraction from scanner quality;
- pressure to maintain dashboards instead of improving core analysis.
```

TimeProofs should first win by being useful, local-first, and easy to adopt.

## Phase 1 — Free adoption layer

Goal:

```txt
Make TimeProofs easy to try and easy to trust.
```

Build:

```txt
- polished browser scanner;
- strong examples;
- public sample reports;
- clear docs;
- agentready.json specification;
- static simulation examples;
- public risk taxonomy;
- SEO/GEO technical content;
- CLI scope finalized.
```

No account. No payment. No backend.

## Phase 2 — Developer workflow layer

Goal:

```txt
Make TimeProofs useful in real developer workflows.
```

Build:

```txt
- npm CLI package;
- terminal summaries;
- output directory option;
- CI exit codes;
- GitHub Action wrapper;
- GitLab CI example;
- Bitbucket example;
- PR check examples;
- threshold options.
```

The core must remain local:

```txt
The customer's API or MCP definitions should not leave their machine or CI runner.
```

## Phase 3 — Paid value layer

Only after real usage, test paid packaging.

Possible paid features:

```txt
- strict policy packs;
- team policy templates;
- premium report formatting;
- branded reports for agencies;
- CI PR comments;
- baseline comparison;
- historical artifact comparison through CI artifacts;
- AgentReady Checked artifact;
- private readiness review.
```

## Phase 4 — License check

If paid CLI access becomes necessary, keep the license flow minimal.

Target behavior:

```txt
agentready CLI starts
→ sends license key only to TimeProofs license endpoint
→ receives pass/fail entitlement
→ scans locally
→ never uploads OpenAPI/MCP content
```

Example:

```txt
POST /verify-license
body: { "license_key": "tp_live_xxx" }
```

Allowed data sent:

```txt
- license key;
- package version;
- anonymous entitlement metadata if needed.
```

Forbidden data sent without explicit enterprise mode:

```txt
- OpenAPI files;
- MCP tool definitions;
- source code;
- business data;
- scan results;
- reports;
- agentready.json.
```

## Phase 5 — Stripe and dashboard

Build only when there is proven demand for paid self-serve.

Automated flow:

```txt
Plan selection
→ Stripe Checkout
→ webhook receives checkout.session.completed
→ license key created
→ customer sees key
→ CLI/GitHub Action uses key
→ subscription cancellation disables key
```

This is a future commercial layer, not the current build priority.

## Success metrics before monetization infrastructure

Before building Stripe or accounts, look for:

```txt
- developers using the browser scanner;
- developers asking for CLI;
- CLI installs;
- GitHub stars;
- issues opened by external users;
- MCP builders asking for checks;
- agencies asking for reports;
- teams asking for CI thresholds;
- at least one willingness-to-pay signal.
```

## Zero-touch support principle

Support should be reduced by making the product self-explanatory.

CLI errors should be actionable:

```txt
Bad:
Error: score failed.

Good:
Tool `refundOrder` performs a dangerous action without a confirmation requirement.
Add explicit confirmation guidance or configure a runtime approval guardrail.
Docs: /agentready-docs.html#dangerous-action-confirmation
```

## Strategic rule

```txt
The scanner quality, risk taxonomy, contract outputs, examples, CLI, and CI integration are the product.
Stripe, OAuth, licenses, and dashboards are only the monetization shell.
```

## Mandatory limitation text

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
