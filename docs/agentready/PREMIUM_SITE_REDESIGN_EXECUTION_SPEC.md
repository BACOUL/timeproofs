# AgentReady Premium Site Redesign Execution Specification

Status: ACTIVE EXECUTION SPECIFICATION

## Decision

The public AgentReady product site is rebuilt before `ARB-COM-003`, public installation validation, onboarding promotion, external pilot outreach, or meaningful launch communication.

This insertion does not alter the AgentReady engine, CLI, npm package, immutable GitHub Action tag, Marketplace release, Community/Pro boundary, pricing target, or static-first positioning.

## Required Sequence

```txt
ARB-SITE-PREMIUM-001 - shared design system, navigation and footer
ARB-SITE-PREMIUM-002 - homepage and core product pages
ARB-SITE-PREMIUM-003 - premium QA, accessibility, performance and SEO
ARB-COM-003 - public installation validation
ARB-ONB-001 - onboarding implementation
```

No public acquisition campaign, maintainer outreach, pilot recruitment, or Marketplace promotion begins before `ARB-SITE-PREMIUM-003` is complete.

## Product And Visual Direction

The target is a best-in-class developer-security product site: precise, calm, technical and premium.

Required visual qualities:

- graphite and deep navy foundations;
- restrained blue and cyan accents;
- subtle gradients rather than bright color fields;
- strong typography and generous spacing;
- realistic code, CI and report surfaces;
- varied section composition rather than repeated identical cards;
- restrained borders, shadows and translucency;
- no decorative excess, generic AI imagery, emoji decoration, fake dashboards or fake customer logos;
- no excessive glassmorphism, neon glow, parallax or animation-heavy effects.

The site must feel like a serious developer tool and security product, not a generated landing-page template.

## Canonical Desktop Navigation

The shared desktop header must expose this hierarchy:

```txt
TimeProofs / AgentReady
Product
Resources
Pricing
Trust
GitHub
Scan a contract
```

Product menu targets:

- OpenAPI Scanner;
- MCP Scanner;
- GitHub CI Gate;
- Reports and `agentready.json`.

Resources menu targets:

- Documentation;
- Examples;
- AgentReady rules;
- Methodology;
- Changelog.

The implementation must map these labels to real existing destinations. It must not create broken links or imply that an unavailable page or product exists.

## Canonical Mobile Navigation

Mobile navigation must be a deliberate product surface, not a compressed desktop row.

It must provide:

- a clear menu trigger with `aria-expanded` and an accessible name;
- a full-height panel or drawer with grouped Product, Resources and Trust links;
- large touch targets;
- visible primary CTA;
- Escape-key close;
- click-outside close when applicable;
- focus containment and focus restoration;
- background scroll lock;
- current-page indication;
- progressive enhancement so critical links remain available without JavaScript;
- no horizontal overflow at 320 px and above.

## Canonical Footer

The shared footer must use four groups:

- Product;
- Standard;
- Developers;
- Trust.

It must surface the OpenAPI scanner, MCP scanner, CI Gate, sample report, `agentready.json`, rule codes, examples, limitations, CLI, GitHub Action, documentation, repository, security, privacy, terms and contact where real routes exist.

## Batch 1 - Premium Foundation

`ARB-SITE-PREMIUM-001` creates the shared shell only.

Scope:

- shared design tokens;
- shared typography, spacing, buttons, code blocks, focus states and layout primitives;
- desktop navigation and menus;
- mobile navigation;
- shared footer;
- active-route state;
- semantic and accessible shell markup;
- migration of active indexable AgentReady pages to the shared shell;
- automated navigation and link validation.

Batch 1 must preserve page-body content and page-specific product sections except where a conflicting header, navigation or footer implementation must be removed. It must not redesign the homepage body yet.

Preferred implementation:

- static HTML;
- shared CSS assets under `/assets`;
- minimal dependency-free JavaScript only where necessary;
- no frontend framework;
- no external font requirement;
- no tracking or telemetry;
- no backend dependency.

## Batch 2 - Homepage And Core Product Pages

`ARB-SITE-PREMIUM-002` redesigns:

- homepage;
- AgentReady CI page;
- OpenAPI scanner page;
- MCP scanner page;
- pricing page;
- primary documentation entry page.

Narrative order:

```txt
problem
product demonstration
OpenAPI and MCP paths
CI integration
agent-specific differentiation
proof and evidence
trust and limitations
primary CTA
```

The homepage must show a realistic finding, before/after guidance, score, CI result and machine-readable output rather than generic marketing cards.

## Batch 3 - Premium QA

`ARB-SITE-PREMIUM-003` performs independent QA across the public site:

- Android, iPhone-size, tablet and desktop viewports;
- keyboard navigation and focus order;
- screen-reader semantics;
- WCAG contrast and touch targets;
- reduced-motion support;
- no horizontal overflow;
- broken-link and CTA validation;
- HTML semantics and metadata;
- structured data;
- no-JS core content;
- performance and Core Web Vitals evidence;
- visual consistency;
- removal of stale commercial wording;
- preservation of mandatory limitations.

## Non-Negotiable Product Boundaries

The redesign must not:

- modify the AgentReady engine or CLI implementation;
- modify npm publication, package metadata, tags or dist-tags;
- move or recreate immutable Git or Action tags;
- change `action.yml` behavior;
- add Stripe, accounts, licenses, dashboards or hosted scanning;
- upload contracts;
- add silent telemetry;
- add live API, MCP or LLM execution;
- claim certification, absolute safety or GitHub endorsement;
- reintroduce proof-of-existence positioning;
- advertise Pro as available before it exists.

Mandatory limitation on key product pages:

> TimeProofs AgentReady does not guarantee that an AI agent will never fail. It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.

## Review Standard

A batch is not acceptable because it is merely cleaner than the current site. It must be reviewable against current premium developer-product standards and include factual evidence for desktop, mobile, accessibility, links and performance.
