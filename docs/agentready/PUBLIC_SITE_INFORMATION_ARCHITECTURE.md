# AgentReady Public Site Information Architecture

## Purpose

This document defines the target public site structure for TimeProofs AgentReady.

It is a planning document only. It does not require public HTML changes in this PR.

## Active Product Direction

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

Every public page should support this direction directly or make its relationship to this direction explicit.

## Architecture Principles

The site should be organized around four visitor needs:

- understand the category;
- try the scanner or CI Gate;
- verify the standard;
- trust the limitations.

The site should work as:

- a product site for buyers and evaluators;
- a developer portal for implementation;
- a standard reference for `agentready.json` and AR rule codes;
- an SEO and LLM-readable documentation graph.

## Target Site Map

```txt
/
/agentready-ci
/docs
/agentready-json
/agentready-rule-codes
/examples
/security
/limitations
/openapi-ai-agent-readiness
/mcp-server-readiness
/agentready-standard
```

Static hosting may map these to `.html` files if the current site architecture requires it.

## Homepage

Role:

- define AgentReady in one screen;
- make CI Gate positioning unmistakable;
- route developers to scanner, CI, docs, examples, and standard references.

Primary message:

```txt
Fail the build before unsafe agent-facing APIs or MCP tools are deployed.
```

Required sections:

- hero with product name and CI Gate category;
- short explanation of structural agent-readiness risks;
- proof that CLI, GitHub Action, rule codes, and `agentready.json` exist;
- links to OpenAPI scan, MCP scan, CI page, sample report, docs, and examples;
- "What can go wrong?" examples;
- local-first/static scan trust block;
- limitation block.

Primary links:

- `/agentready-ci`;
- OpenAPI scanner page;
- MCP scanner page;
- sample report;
- docs hub;
- examples.

## `/agentready-ci`

Role:

- the main adoption page for CI usage;
- the next recommended public page to build.

Primary audience:

- API developers;
- MCP builders;
- platform engineers;
- security-minded engineering teams.

Required sections:

- what the CI Gate blocks;
- recommended policy: `--min-score 75 --fail-on critical`;
- CLI usage;
- GitHub Action usage;
- expected exit codes;
- outputs: score, status, Markdown report, `agentready.json`;
- bad/fixed fixture proof summary;
- local-first privacy model;
- limitations.

Primary CTA:

```txt
Add AgentReady to CI
```

Secondary CTA:

```txt
View bad/fixed examples
```

Key docs to link:

- `docs/agentready/GITHUB_ACTION_USAGE.md`;
- `docs/agentready/COMMERCIAL_FIXTURE_CI_GATE_BEHAVIOR.md`;
- `docs/agentready/AGENTREADY_JSON_SPEC.md`;
- `docs/agentready/AGENTREADY_RULE_CODES.md`.

## `/docs`

Role:

- public docs hub;
- route visitors to install, scan, CI, standard, examples, and limitations.

Required sections:

- Start here;
- CLI;
- GitHub Action;
- `agentready.json`;
- Rule codes;
- OpenAPI readiness;
- MCP readiness;
- Examples;
- Limitations.

The docs hub should avoid duplicating every technical page. It should make the correct next click obvious.

## `/agentready-json`

Role:

- public standard page for `agentready.json` v0.1.

Required sections:

- what `agentready.json` is;
- v0.1 version;
- required root fields;
- required tool fields;
- compatibility of `detected_risks`, `rule_codes`, and `detected_rules`;
- CI Gate relationship;
- minimal example;
- example with rule codes;
- limitations.

Primary source:

- `docs/agentready/AGENTREADY_JSON_SPEC.md`.

## `/agentready-rule-codes`

Role:

- public reference for AR001-AR010.

Required sections:

- why stable rule codes matter;
- table of AR001-AR010;
- relationship to legacy finding codes;
- how rule codes appear in `agentready.json`;
- how rule codes can be discussed in pull requests;
- future policy and waiver possibilities;
- limitations.

Primary source:

- `docs/agentready/AGENTREADY_RULE_CODES.md`.

## `/examples`

Role:

- show concrete bad/fixed examples and sample outputs.

Required sections:

- OpenAPI refund bad/fixed;
- MCP email bad/fixed;
- MCP files bad/fixed;
- score and policy result for each;
- why bad blocks the build;
- why fixed can pass;
- links to fixture files;
- links to sample reports and `agentready.json` outputs where available.

Primary source:

- `docs/agentready/COMMERCIAL_FIXTURE_CI_GATE_BEHAVIOR.md`.

## `/security`

Role:

- explain trust model, local-first design, privacy, and boundaries.

Required sections:

- static scan model;
- no API calls during scan;
- no MCP tool execution during scan;
- no file upload by default;
- no LLM calls during scan;
- what AgentReady checks structurally;
- what AgentReady does not check;
- relation to penetration tests, API security scanners, runtime guardrails, and observability.

This page should be calm and precise, not defensive.

## `/limitations`

Role:

- make the product boundary explicit.

Required mandatory text:

```txt
TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
```

Required sections:

- no absolute safety guarantee;
- not a penetration test;
- not a runtime firewall;
- not a full API security scanner;
- not a live MCP execution platform;
- not a compliance certification;
- human review remains required for high-risk tools.

This page should increase trust by being direct.

## `/openapi-ai-agent-readiness`

Role:

- SEO and developer education page for OpenAPI surfaces exposed to agents.

Primary search intent:

- "is my OpenAPI spec ready for AI agents";
- "OpenAPI AI agent safety";
- "OpenAPI tool calling risks";
- "AI agent API readiness checklist".

Required sections:

- valid OpenAPI does not mean agent-ready;
- common OpenAPI risks for agents;
- confirmation, limits, enums, output schemas, and error recovery;
- example CI command;
- links to scanner, CI page, examples, spec, and rule codes.

## `/mcp-server-readiness`

Role:

- SEO and developer education page for MCP tools.

Primary search intent:

- "MCP server readiness";
- "MCP tool safety";
- "MCP tools CI check";
- "MCP server agent readiness checklist".

Required sections:

- what makes an MCP tool risky for agents;
- input schema, output schema, descriptions, scoped paths, confirmation boundaries;
- dangerous examples: send email, delete file, export customer data;
- example CI command;
- links to MCP scanner, CI page, examples, spec, and rule codes.

## `/agentready-standard`

Role:

- describe AgentReady as a portable standard, not just a scanner.

Required sections:

- AgentReady Score;
- AR rule codes;
- `agentready.json`;
- CLI and GitHub Action;
- commercial bad/fixed fixture evidence;
- how a team can adopt it in CI;
- what remains non-goal or future work.

This page should be especially LLM-readable.

## Target Navigation

Recommended desktop navigation:

```txt
TimeProofs / AgentReady
Product ▼
Resources ▼
Pricing
Trust
GitHub
Scan a contract
```

Product menu:

```txt
OpenAPI Scanner
MCP Scanner
GitHub CI Gate
Reports and agentready.json
```

Resources menu:

```txt
Documentation
Examples
AgentReady Rules
Methodology
Changelog
```

Every label must map to a real destination. Do not create broken routes or imply unavailable product surfaces.

Mobile navigation must use a full-height panel or drawer with grouped Product, Resources and Trust areas, large touch targets, visible primary CTA, Escape and outside-click close behavior, focus containment, focus restoration, body scroll lock, current-page state and progressive enhancement.

Mobile navigation priority:

1. Scan a contract;
2. OpenAPI Scanner;
3. MCP Scanner;
4. GitHub CI Gate;
5. Documentation;
6. Examples;
7. Pricing;
8. Trust.

## Target Footer

Footer groups:

```txt
Product
- OpenAPI scanner
- MCP scanner
- AgentReady CI Gate
- Sample report

Standard
- agentready.json v0.1
- Rule codes AR001-AR010
- Bad/fixed examples
- Limitations

Developers
- CLI
- GitHub Action
- Docs
- GitHub repository

Trust
- Security model
- Privacy
- Terms
- Contact
```

The footer should make the standard assets discoverable from every page.

## Priority Internal Links

High-priority links:

- homepage to `/agentready-ci`;
- `/agentready-ci` to GitHub Action usage;
- `/agentready-ci` to `agentready.json` spec;
- `/agentready-ci` to rule codes;
- homepage to bad/fixed examples;
- examples to CLI and CI usage;
- rule codes to spec;
- spec to GitHub Action usage;
- limitations from every standard or trust page.

## Page Creation Order

Recommended order:

1. `/agentready-ci`
2. `/agentready-json`
3. `/agentready-rule-codes`
4. `/examples` or bad/fixed examples page
5. `/limitations`
6. `/security`
7. `/openapi-ai-agent-readiness`
8. `/mcp-server-readiness`
9. `/agentready-standard`
10. `/docs` hub cleanup after the specialized pages exist

Rationale:

- CI adoption is the active product goal.
- Standard pages make the CI promise credible.
- Examples prove behavior.
- Limitation and security pages prevent overclaiming.
- SEO pages should follow once core adoption pages are accurate.

## Acceptance Criteria For Future Site PRs

Each future public site PR should state:

- which page or navigation area changed;
- which AgentReady standard asset it links to;
- which existing doc is the source of truth;
- whether the mandatory limitation is needed on the page;
- whether any claims depend on behavior already merged in code.

No public site PR should introduce:

- backend behavior;
- hosted scan storage;
- dashboard;
- Stripe or payment flow;
- runtime firewall claims;
- legacy proof-of-existence positioning;
- unsupported safety guarantees.

