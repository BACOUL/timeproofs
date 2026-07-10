# AgentReady Premium Site Requirements

## Purpose

This document defines the standard for the public TimeProofs AgentReady site before any HTML changes are made.

The public site must not be treated as a simple landing page. It must become:

- a premium product site;
- a developer portal;
- a documentation entry point for the AgentReady standard;
- a trust and credibility surface;
- a search and LLM discovery machine for agent-facing OpenAPI and MCP readiness.

## Active Product Direction

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

The site must make this direction obvious within the first viewport and reinforce it across product, docs, examples, and limitation pages.

## Primary Promise

The primary public promise is:

```txt
Fail the build before unsafe agent-facing APIs or MCP tools are deployed.
```

This promise must be paired with the mandatory limitation:

```txt
TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
```

## Strategic Ambition

The ambition is a world-class product and standard site, not a simple landing page.

AgentReady should feel like the beginning of a category standard, not a one-off utility.

The site should make a serious developer believe:

- AgentReady has a clear reason to exist.
- AgentReady fits real CI workflows.
- AgentReady is local-first and static by default.
- AgentReady produces a portable `agentready.json` contract.
- AgentReady rule codes can be discussed in pull requests.
- AgentReady can become a standard check before exposing APIs or MCP tools to agents.

## Positioning Requirements

The site must position AgentReady as:

- a pre-deployment CI gate;
- a static readiness scanner for agent-facing contracts;
- a local-first developer toolchain;
- a producer of `agentready.json`;
- a rule-code standard for agent-facing API and MCP risk;
- complementary to runtime guardrails, API security scanners, MCP security scanners, and observability.

The site must not position AgentReady as:

- a guarantee of safety;
- a penetration test;
- a broad AI security platform;
- a runtime firewall;
- an agent observability platform;
- a hosted SaaS dashboard;
- an old proof-of-existence or timestamp product;
- a payment, account, or backend-first product.

## Premium Design Criteria

The site should feel precise, technical, calm, and premium.

Required design qualities:

- strong first-viewport clarity;
- product name and CI Gate positioning visible immediately;
- restrained typography with high readability;
- dense but scannable technical information;
- clear hierarchy between product, proof, docs, and examples;
- credible evidence blocks instead of generic claims;
- strong code and workflow presentation;
- visual consistency across homepage, docs, examples, and future CI pages;
- no decorative excess that competes with technical trust.

The site should communicate engineering seriousness before marketing polish.

## UX Criteria

### Desktop

Desktop pages must support fast evaluation by technical visitors:

- clear headline and one-sentence category definition;
- visible primary CTA for CI usage or scanner flow;
- visible secondary CTA for sample report or docs;
- direct links to CLI, GitHub Action, `agentready.json`, rule codes, and examples;
- code blocks that can be copied without surrounding marketing noise;
- comparison or proof blocks that explain why bad fixtures fail and fixed fixtures pass;
- no buried navigation for core developer assets.

### Mobile

Mobile pages must support quick understanding and action:

- short first viewport with the product category visible;
- primary CTA first, secondary CTA second;
- long technical material broken into compact sections;
- code blocks horizontally scrollable or simplified;
- sticky or easily reachable navigation;
- no overlapping text, oversized hero, or hidden critical links;
- touch targets large enough for scanner/docs navigation.

## Performance Criteria

The public site must stay fast and static.

Requirements:

- no backend dependency for core public pages;
- no file upload for scanner flows;
- no live API call, MCP execution, or LLM call during static scans;
- minimal JavaScript on marketing/docs pages;
- no heavyweight client framework unless a future need is explicit and approved;
- no third-party tracker required for core functionality;
- responsive images and assets if visual media is added;
- stable layout without large shifts;
- readable without JavaScript wherever practical for docs pages.

## Trust Criteria

The site must show proof rather than vague assurance.

Trust signals to include:

- CLI alpha is merged;
- commercial bad/fixed CI Gate behavior is validated;
- rule codes AR001-AR010 are stable;
- GitHub Action wrapper exists;
- `agentready.json` spec v0.1 is published and aligned with code;
- static scan only: no API calls, no MCP execution, no file upload by default;
- clear limitation language;
- clear distinction between static readiness checks and runtime enforcement;
- links to sample reports and machine-readable outputs.

Avoid fake trust signals:

- no unearned certification badge;
- no claim that a tool is safe in absolute terms;
- no "AI-safe" claim without context;
- no enterprise security promise without audited evidence;
- no implied hosted scan unless the product actually provides it.

## Developer Criteria

The site must help a developer move from interest to CI usage quickly.

Developer-facing pages must answer:

- What does AgentReady scan?
- What does it block?
- How do I run it locally?
- How do I add it to GitHub Actions?
- What policy should I start with?
- What files are produced?
- What is inside `agentready.json`?
- What do AR001-AR010 mean?
- What does AgentReady not guarantee?

Minimum developer assets to surface:

- CLI command examples;
- GitHub Action copy/paste example;
- recommended V1 policy: `--min-score 75 --fail-on critical`;
- output paths for Markdown report and `agentready.json`;
- rule-code reference;
- bad/fixed commercial examples;
- spec v0.1 reference.

## SEO Criteria

The site must be built for durable technical discovery.

Target topic clusters:

- agent-facing API readiness;
- OpenAPI AI agent readiness;
- MCP server readiness;
- AI agent tool safety checks;
- CI gate for AI agent tools;
- human confirmation for AI agent tools;
- dangerous tool calls in OpenAPI and MCP;
- `agentready.json` standard;
- AgentReady rule codes.

SEO requirements:

- one clear primary topic per page;
- descriptive page titles;
- direct headings that match developer search intent;
- concise definitions near the top of each page;
- examples with concrete OpenAPI and MCP terms;
- internal links between homepage, CI page, docs, spec, rule codes, and examples;
- no generic AI-security keyword stuffing;
- no pages that promise a product surface that does not exist.

## LLM-Readable Documentation Criteria

AgentReady docs should be easy for search engines, LLMs, and developer tools to quote correctly.

Requirements:

- stable page titles and headings;
- short canonical definitions;
- explicit "what it is" and "what it is not" sections;
- code examples in fenced blocks;
- field names and rule codes in plain text;
- tables for policies, outputs, and rule-code summaries;
- direct links to source docs;
- repeated mandatory limitation text on key standard pages;
- no critical information hidden only in images.

LLM-readable pages should make it hard to hallucinate AgentReady as a runtime firewall, hosted SaaS, or safety guarantee.

## Visual And Marketing Prohibitions

Do not use:

- vague "safe enough" claims;
- absolute safety language;
- fear-heavy AI apocalypse framing;
- generic shield imagery as proof;
- fake compliance badges;
- dashboard screenshots that do not exist;
- pricing or checkout flows that do not exist;
- old proof-of-existence language;
- dense hero copy that hides the CI Gate promise;
- oversized decorative sections that push developer proof below the fold;
- "world's safest" or "guaranteed secure" language;
- broad "AI security platform" positioning.

## Required Proof Blocks

The future public site should include proof blocks for:

- CI Gate behavior: bad fixtures fail, fixed fixtures pass;
- commercial examples: refund, email, files;
- rule codes: AR001-AR010;
- `agentready.json` v0.1;
- GitHub Action usage;
- local-first static scan behavior;
- limitations.

## Checklist Before Modifying HTML

Before any PR changes public HTML, verify:

- the page supports the AgentReady CI Gate direction;
- the primary promise is accurate and not absolute;
- the mandatory limitation appears where needed;
- the page links to `agentready.json` and rule codes when relevant;
- the page does not imply a hosted backend, dashboard, account, Stripe, or runtime firewall;
- the page does not reintroduce legacy proof-of-existence positioning;
- mobile CTA order is clear;
- desktop developer links are visible;
- examples are concrete, not decorative;
- code blocks are accurate against current CLI and GitHub Action docs;
- no scoring or rule-code behavior is described differently from the code;
- public claims are backed by merged docs or tests.

## Acceptance Standard

A premium AgentReady public page is acceptable only when a technical visitor can understand all of this within a few minutes:

- AgentReady is a CI Gate for agent-facing OpenAPI and MCP tools.
- It is static and local-first.
- It produces a score, findings, rule codes, Markdown report, and `agentready.json`.
- It can fail a build before unsafe or unclear tools are deployed.
- It does not guarantee absolute agent safety.
- It has enough examples and docs to be evaluated without a sales call.
