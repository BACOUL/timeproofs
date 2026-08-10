# TimeProofs — World-Class Benchmark Policy

TimeProofs must not default to generic AI-generated product patterns. Every major product surface should be benchmarked against the strongest global references for that specific job.

## Benchmark method

Before a major decision:

1. Select at least three category-leading references relevant to the exact problem.
2. Study their current product/docs/pricing/interaction model from primary sources.
3. Extract principles, not styling.
4. Record what TimeProofs should adopt, adapt, or reject.
5. Design from the native TimeProofs workflow.

## Benchmark dimensions

### Developer onboarding

Study products that get developers from zero to first successful action quickly.

Evaluate:

- first-run path
- install steps
- sample data/fixtures
- local execution
- error messages
- copy-paste examples
- auth requirements
- signup timing

### Documentation

Evaluate:

- conceptual hierarchy
- quickstart quality
- reference discoverability
- runnable examples
- versioning
- changelog
- migration guidance
- LLM/code-agent friendliness

### CLI

Evaluate:

- install ergonomics
- command naming
- exit codes
- human vs JSON output
- CI behavior
- debug mode
- config discovery
- reproducibility

### API / SDK

Only add these when the workflow justifies them.

Evaluate:

- object model
- naming consistency
- idempotency
- versioning
- typed SDK ergonomics
- pagination/error model where relevant
- observability
- local testing

### Product UI

Do not assume a dashboard.

If UI is justified, evaluate:

- job-to-be-done per screen
- evidence inspection
- diff readability
- transaction graph clarity
- filtering/search
- progressive disclosure
- keyboard workflow
- collaboration

### Pricing

Evaluate:

- value metric
- free tier
- self-serve threshold
- usage-based vs platform pricing
- enterprise minimums
- overage behavior
- transparency
- margin alignment

### Reliability / trust

Evaluate:

- SLO communication
- status page
- incident transparency
- changelog
- rollback
- version pinning
- compatibility policy

### Brand

Evaluate:

- category clarity
- memorability
- technical credibility
- visual grammar derived from product
- differentiation from generic AI branding

## Reference principles already identified

Current high-quality primary-source observations to keep in mind:

- Stripe demonstrates API/CLI-first developer workflows and supports explicit usage-based billing models tied to meter events.
- Vercel emphasizes low-friction Git/CLI onboarding, automatic preview/production environments, and a clear developer-platform mental model.
- Cloudflare documents platform limits, testing harnesses, changelogs, and production infrastructure as first-class product surfaces.

These references are not visual templates for TimeProofs. They establish the quality bar for developer experience, operational clarity, and business-model alignment.

## TimeProofs-specific design grammar

The product's native visual and interaction primitives should be:

- protocol objects
- bindings
- field mappings
- invariant edges
- transaction graphs
- evidence
- version compatibility
- diffs
- PASS/WARN/BLOCK/UNKNOWN decisions

If a proposed interface could belong unchanged to any generic AI SaaS, it is not sufficiently TimeProofs-native.

## Review rule

Before shipping any major new surface, document:

- references studied
- principles extracted
- TimeProofs-specific design decision
- why a common SaaS default was accepted or rejected

This policy applies to site, CLI, docs, SDKs, UI, pricing, onboarding, emails, changelogs, status/reliability surfaces, and enterprise packaging.