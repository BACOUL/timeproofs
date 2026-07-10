# SEO, GEO, And AI-First Requirements

## Purpose

This document defines the public discovery requirements for making TimeProofs AgentReady understandable to search engines, developers, AI systems, and LLM-assisted workflows.

Active product direction:

```txt
AgentReady is the shift-left CI gate for agent-facing contracts.
```

If this document conflicts with `AGENTREADY_MASTER_PLAN.md`, the master plan prevails.

## SEO Technical Requirements

Public pages should implement:

- clean URLs;
- canonical URLs;
- sitemap;
- robots.txt;
- redirects for renamed pages;
- useful 404 page;
- unique titles;
- unique meta descriptions;
- semantic HTML;
- internal links between product, CI, docs, examples, pricing, legal, and standard pages;
- breadcrumbs where useful;
- Open Graph tags;
- Twitter cards;
- fast performance;
- mobile-first layout;
- accessibility;
- Core Web Vitals discipline;
- Search Console setup.

## URL Strategy

Priority future pages:

- `/agentready-ci.html`
- `/agentready-json.html`
- `/agentready-rule-codes.html`
- `/openapi-ai-agent-readiness.html`
- `/mcp-server-readiness.html`
- `/agentready-standard.html`
- `/examples.html` or existing equivalent;
- `/pricing.html`
- `/legal.html`
- `/privacy.html`
- `/terms.html`
- `/cookies.html` if non-essential cookies are introduced.

Do not create new pages in this PR.

## Structured Data

Use structured data only when accurate.

Potential schema types:

- `Organization`
- `WebSite`
- `SoftwareApplication`
- `TechArticle`
- `BreadcrumbList`
- `FAQPage` only when the FAQ is visibly present on the page.

Do not add fake review, rating, certification, or customer trust structured data.

## Open Graph And Social Metadata

Each important public page should have:

- `og:title`;
- `og:description`;
- `og:type`;
- `og:url`;
- `og:image` when an appropriate real image exists;
- Twitter card metadata.

Images should not imply certification, safety guarantee, or enterprise adoption that does not exist.

## GEO / AI Discovery Requirements

Generative engine optimization should be factual and source-driven.

Required assets:

- public HTML documentation;
- public rule codes page;
- public `agentready.json` spec page;
- methodology page;
- limitations page;
- glossary;
- bad/fixed examples;
- dated changelog;
- versioning;
- identified author/editor/publisher;
- short extractible answers;
- factual comparison tables;
- primary sources;
- consistent TimeProofs / AgentReady entity naming;
- content accessible without mandatory JavaScript execution.

## LLM-Readable Content Rules

Pages should include:

- clear definition near the top;
- "what it is" and "what it is not";
- stable headings;
- direct examples;
- code blocks;
- concise tables;
- exact rule code names;
- exact `agentready.json` field names;
- limitation text;
- canonical links to primary docs.

Avoid:

- vague AI security claims;
- hidden copy in images;
- marketing-only language;
- unsupported "industry standard" claims;
- fake customer trust statements;
- absolute safety guarantees.

## Optional Experimental Files

Potential future files:

- `llms.txt` as an experimental discovery aid, without presenting it as an official standard;
- `AGENTS.md` for development tools and agent-assisted contribution workflows.

These files should be introduced only when content is stable and useful.

## Content Clusters

Priority topic clusters:

- AgentReady CI Gate;
- OpenAPI readiness for AI agents;
- MCP server readiness;
- dangerous agent-facing tool actions;
- human confirmation boundaries;
- `agentready.json`;
- AR001-AR010 rule codes;
- CI policy and release gates;
- static analysis vs runtime guardrails;
- limitations and trust model.

## Accessibility And Performance

Public pages should:

- use semantic headings;
- keep contrast high;
- avoid text overlap;
- support keyboard navigation;
- provide useful link text;
- fit mobile widths;
- avoid unnecessary JavaScript;
- avoid layout shifts;
- avoid heavy third-party scripts;
- keep code blocks readable on mobile.

## Search Console And Monitoring

Before launch:

- verify domain in Search Console;
- submit sitemap;
- monitor indexing;
- monitor 404s;
- review Core Web Vitals;
- verify canonical URLs;
- track branded and non-branded discovery queries.

No advertising tracker is required for this strategy.

## Non-Guarantee

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
