# TimeProofs — M9 Website & Docs Vision

Status: PRODUCT / BRAND DIRECTION — FROZEN PRINCIPLES, FINAL DESIGN DEFERRED TO M9

## Purpose

The TimeProofs public experience must look and behave like serious global developer infrastructure, not a generic AI-generated SaaS template. The website is part of the developer product and distribution engine.

## Non-negotiable product story

TimeProofs is the transaction integrity layer between what autonomous agents were authorized to do and what external systems actually executed.

The public product architecture is:

- VERIFY — Is it valid?
- ENFORCE — Can it run?
- RESOLVE — Did it happen?

UCP↔AP2 is a beachhead, not the company definition.

## Homepage job

Within the first screen / first meaningful interaction, a technical visitor should understand:

1. what can fail even when individual protocols are valid;
2. what TimeProofs verifies or enforces across system boundaries;
3. which protocol/provider profiles are actually supported;
4. how to run the first verification quickly;
5. what concrete decision/evidence TimeProofs returns.

Do not lead with abstract AI marketing. Lead with a real transaction-integrity failure and its deterministic decision.

## Hero direction

The hero should show a real TimeProofs-native transaction graph, not a decorative dashboard.

Example conceptual flow:

AUTHORIZED
UCP Checkout €760
  ↓ binding
AP2 PaymentMandate €760
  ↓
TimeProofs
  ├─ TP-CX-003 PASS
  ├─ TP-CX-002 PASS
  └─ TP-CX-001 BLOCK
  ↓
DENY

The adjacent activation surface should show the smallest truthful install/run example and a real structured result.

The product itself is the visual language: protocol objects, bindings, invariants, evidence, decisions, execution states and later outcome resolution.

## Information architecture baseline

- Home
- Why TimeProofs
- VERIFY
- ENFORCE
- RESOLVE
- Protocol Packs
  - UCP ↔ AP2
  - future provider/cross-system packs
- Docs
  - Quickstart
  - Concepts
  - SDK
  - CLI
  - CI / GitHub Action
  - Invariants
  - Evidence
  - Compatibility
  - Error / UNKNOWN semantics
- Pricing
- Security / Trust
- GitHub

This is a baseline, not permission to create empty marketing pages. A page exists only when it has a clear developer or buyer job.

## Visual principles

- sober, precise, infrastructure-grade;
- strong information hierarchy;
- excellent typography and spacing;
- transaction graphs and evidence relationships as first-class visual elements;
- PASS / WARN / BLOCK / UNKNOWN / ALLOW / DENY states readable without becoming a noisy traffic-light UI;
- code and structured output must look like actual product surfaces, not decorative code screenshots;
- responsive/mobile behavior designed intentionally;
- accessibility and performance are release requirements, not cleanup tasks.

Do not default to:

- purple AI gradients;
- glowing orb/brain/robot imagery;
- generic three-card feature grids;
- fake dashboards;
- meaningless animated network backgrounds;
- “AI-powered” as the primary value proposition;
- stock illustrations;
- a design copied wholesale from Stripe, Cloudflare, Linear or any other reference.

## Benchmark principle

Before final M9 design, benchmark best-in-class global developer infrastructure and payments products for principles, not appearance. Study at minimum:

- information architecture;
- first-run activation;
- documentation navigation;
- code-example quality;
- pricing clarity;
- trust/security communication;
- status/error communication;
- performance/accessibility;
- how product proof is shown instead of asserted.

References should include category leaders in developer infrastructure, payments, reliability and security. Record what transfers to TimeProofs and what does not.

## Developer activation journey

Preferred path:

GitHub / docs / protocol search
  ↓
TimeProofs explanation of the exact failure
  ↓
install package
  ↓
run fixture or real protocol objects
  ↓
understand PASS/WARN/BLOCK/UNKNOWN immediately
  ↓
CI integration
  ↓
production ENFORCE
  ↓
managed/paid usage
  ↓
future RESOLVE / enterprise

The activation metric is not account creation. It is a successful meaningful TimeProofs evaluation whose result the developer understands.

## Documentation standard

Every important developer error/result should explain:

- what failed;
- which objects/fields were involved;
- why the relationship matters;
- which versions/profile assumptions were used;
- what is proven versus inferred;
- what TimeProofs could not determine;
- what the developer can do next.

Docs must be executable and version-aware where possible. Avoid marketing prose inside technical reference pages.

## Pricing page principle

Pricing should reflect the commercial baseline without pretending hypotheses are validated facts. The current business architecture is the source of truth for package/pricing hypotheses. Explain the unit of value — protected transaction/action and, later, resolution — rather than presenting arbitrary SaaS feature tiers.

## Trust / security principle

Do not market generic “enterprise-grade security.” Show verifiable facts: supported profiles, deterministic behavior, fail-closed semantics, evidence boundaries, release provenance/supply-chain posture when implemented, data handling, limitations and incident/status information when applicable.

Never claim that TimeProofs proves more than it actually proves.

## No-dashboard-first rule

A dashboard is not the default product or homepage metaphor. Add a hosted console only when it has a demonstrated operational job such as evidence investigation, policy management, incident resolution, usage/billing or fleet-level compatibility visibility.

## M9 design specification required before implementation

M9 must produce and approve, before substantial frontend implementation:

- final sitemap and page jobs;
- competitive/reference benchmark with transferable principles;
- homepage and docs wireframes;
- developer activation flow;
- design tokens and typography system;
- transaction graph visual grammar;
- reusable component system;
- copy/tone rules;
- real code/output examples;
- pricing and trust page content architecture;
- mobile/responsive specification;
- accessibility requirements;
- performance budgets;
- analytics/activation events with privacy constraints;
- SEO only for high-intent technical/problem queries, never content-farm SEO;
- launch acceptance checklist.

## Release bar

The website is not world-class because it looks expensive. It is world-class when a developer can rapidly understand the category, verify the claims, run TimeProofs, interpret the output and trust the product boundaries.

The intended reaction is:

> This looks like focused infrastructure built by people who understand transaction systems.

Not:

> This looks like another AI-generated SaaS landing page.
