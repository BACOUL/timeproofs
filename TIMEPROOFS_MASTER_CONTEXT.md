# TimeProofs — Master Context

> Canonical source of truth for the TimeProofs relaunch.
> Branch: `relaunch/invariant-engine`
> Status: product direction approved; implementation not yet started.
> Any AI assistant, developer, contractor, advisor, or future contributor MUST read this file before proposing or implementing product changes.

## 1. Company thesis

TimeProofs is being relaunched as consistency infrastructure for agentic transactions.

The core thesis is:

> Every protocol can be locally valid while the composed transaction is still globally wrong.

As autonomous workflows cross MCP, A2A, UCP, AP2, payment rails, merchant systems, and future business protocols, the number of independently valid objects and state transitions increases. The structural gap TimeProofs targets is cross-protocol composition safety: verifying that those objects still represent the same intended transaction and that cross-object business invariants remain true.

TimeProofs must not become another generic scanner, observability dashboard, MCP gateway, authorization layer, agent identity product, or policy engine.

## 2. Long-term category

Working category:

**Cross-Protocol Consistency Infrastructure**

Working product description:

**TimeProofs verifies that agentic transactions remain consistent across protocols before they commit.**

Long-term platform:

**Cross-Protocol Consistency & Invariant Engine**

The company should own the layer that validates composition rather than competing with the individual protocols themselves.

## 3. Why this position exists

Expected evolution of the ecosystem:

- MCP becomes excellent at agent-to-tool access, tool execution, task primitives, auth hooks, annotations, and runtime interoperability.
- A2A becomes excellent at agent-to-agent tasks, collaboration, delegation, task/context identity, and related authority flows.
- UCP becomes a transport-agnostic business capability layer for commerce and additional verticals.
- AP2 becomes strong at mandates, payment authorization, receipts, constraints, and cryptographic binding.
- Future business protocols define richer vertical semantics for travel, procurement, insurance, services, finance, healthcare, and other domains.

TimeProofs must benefit as these protocols mature. If one protocol can naturally absorb a TimeProofs feature, that feature is not a defensible company layer and should be demoted to an adapter or compatibility feature.

The durable problem is composition: objects can be individually valid but inconsistent across protocol boundaries.

## 4. Canonical example

A transaction may involve:

1. A2A task
2. MCP tool call
3. UCP checkout
4. AP2 mandate
5. PSP/payment object
6. merchant order
7. business-system confirmation

Example:

- A2A task authorizes a maximum budget of 800 EUR.
- UCP checkout totals 760 EUR.
- AP2 payment mandate authorizes 810 EUR.

All objects may be valid according to their own local schema/signature/state rules, while the composition violates the original transaction invariant.

TimeProofs must be able to return a deterministic result such as:

- `PASS`
- `WARN`
- `BLOCK`
- `UNKNOWN`

with machine-readable evidence explaining exactly which cross-object invariant failed.

## 5. Initial wedge

The approved first wedge is:

**UCP ↔ AP2 Consistency Validator**

This wedge is intentionally narrow. It is not the final company boundary.

The objective is to establish the engine architecture and the first verified invariant pack around two protocols already designed to interoperate.

The first release should validate a small, specification-grounded set of cross-object invariants. Candidate families include:

- checkout binding
- merchant identity consistency
- checkout/version binding
- currency consistency
- amount consistency
- line-item consistency
- quantity consistency
- expiration validity
- authorization scope consistency
- payment projection consistency
- resulting order binding
- supported AP2 constraint preservation

IMPORTANT: this list is provisional until each invariant has been checked against the current UCP and AP2 specifications and their actual normative guarantees. We must never build an invariant merely because it sounds useful. Every invariant needs a documented reason why it is cross-object, cross-protocol, or not already fully guaranteed by the underlying standard.

## 6. Core product model

TimeProofs should be designed around five durable abstractions:

### 6.1 Adapter

Parses a protocol/provider object into a version-aware canonical representation without erasing source evidence.

### 6.2 Object

An immutable or versioned source artifact from a protocol/provider, including provenance, schema version, timestamps, identifiers, signatures/hashes when available, and canonicalized fields.

### 6.3 Invariant

A deterministic relation that should remain true across two or more objects.

Initial primitive families should remain deliberately small and composable, e.g.:

- `EQUAL`
- `SAME_ENTITY`
- `LTE`
- `GTE`
- `PRESERVE`
- `VALID_AT`
- `REQUIRE_ALL`

### 6.4 Evidence

The exact source fields, values, versions, hashes, timestamps, and normalization steps used to reach a decision.

### 6.5 Decision

A deterministic output with severity and reason:

- PASS
- WARN
- BLOCK
- UNKNOWN

No opaque numeric safety score should be the primary decision primitive for this product.

## 7. Invariant Packs

The likely long-term moat is not the comparison engine itself. `EQUAL(a,b)` is commodity logic.

The strategic asset is a maintained and versioned library of verified **Invariant Packs**:

- protocol A × protocol B
- protocol version × provider version
- object mapping
- canonicalization rules
- cross-object bindings
- business invariants
- tolerated differences
- temporal rules
- evidence requirements
- violation severity
- recovery guidance
- regression fixtures

Potential future packs:

- UCP ↔ AP2
- A2A ↔ UCP
- MCP ↔ UCP
- UCP Travel ↔ AP2
- procurement ↔ payment
- SAP/Coupa/Oracle ↔ payment/mandate rails
- merchant backend ↔ UCP/AP2

Every pack must be version-aware and regression-tested against protocol evolution.

## 8. Product modes

TimeProofs should evolve through three operating modes:

### Observe

Verify objects and report inconsistencies without affecting the transaction.

### Enforce

Return a machine decision that can block commit or require intervention.

### Inline

Sit directly on the commit path for supported flows and enforce consistency before irreversible state changes.

The product must not be designed as a passive report generator only. The strategic destination is runtime enforcement.

## 9. Distribution philosophy

TimeProofs is a developer-infrastructure company, not a consulting-led compliance product.

Distribution should be designed around low-friction developer adoption:

- CLI
- open-source or source-visible local verifier where strategically useful
- npm/JS package first, with other SDKs only when justified by adoption
- GitHub Action / CI integration
- reproducible fixtures
- copy-paste quickstarts
- machine-readable output
- protocol-specific examples
- participation in UCP/AP2/A2A/MCP discussions based on real reproducible inconsistencies
- docs that are useful even before signup

The company must avoid relying on cold outbound as the primary growth engine.

## 10. Commercial model hypothesis

Do not freeze pricing before product usage is understood.

Likely structure:

- free local validation / public packs to maximize adoption
- paid hosted verification, history, enforcement, collaboration, managed pack updates, private packs, and SLA
- usage-based component for verified transactions at scale
- enterprise pricing for private schemas, internal systems, on-prem/private deployment, compliance, support, and custom invariant packs

The billing model should align with the value event: verified consequential transactions, not arbitrary seats wherever possible.

## 11. Product design principles

TimeProofs must not look or feel like a generic AI-generated SaaS.

Design decisions must be benchmarked against world-class developer infrastructure products rather than generated from generic SaaS conventions.

Principles:

1. Developer-first: terminal, code, diffs, evidence, protocol objects, and reproducibility are first-class.
2. One core job per screen. Avoid dashboard bloat.
3. Show real object relationships and violations, not decorative AI graphics.
4. Deterministic outputs must look deterministic.
5. Evidence should be inspectable and copyable.
6. Docs are part of the product, not marketing support.
7. Fast path from landing page to first real verification.
8. The CLI and API/SDK behavior define the product; the website explains and demonstrates it.
9. No fake enterprise logos, fake metrics, fake testimonials, or invented proof.
10. Default UI should be restrained, technical, and differentiated by the transaction-consistency model rather than a fashionable template.

Reference classes to study before major UX/brand decisions include Stripe for API/docs ergonomics and usage-based product modeling, Vercel for low-friction developer onboarding and preview/production mental models, Cloudflare for infrastructure documentation/testing/operational depth, Temporal for durable execution concepts, Sentry for issue/evidence workflows, and other category leaders relevant to the exact feature being designed. References are inspirations for principles, not templates to copy.

## 12. Website direction

Brand remains **TimeProofs**.

Do not use `TimeProofs AgentReady` as the primary product identity after relaunch.

Working messaging:

**TimeProofs**

**Consistency infrastructure for agentic transactions.**

Core statement:

> Every protocol can be valid. The transaction can still be wrong.

Supporting statement:

> TimeProofs verifies the composition before commit.

The website should initially center on one concrete proof: a UCP/AP2 mismatch that both individual objects can locally validate while the composed transaction must be blocked.

The site should make the platform trajectory visible without claiming unsupported future integrations.

## 13. Existing repository assets

The current repository contains an older AgentReady product, including:

- Node CLI
- GitHub Action
- OpenAPI/MCP parsing
- deterministic rule codes
- reports
- tests
- static marketing site
- legal pages
- docs and examples

These are implementation assets, not product constraints.

Reuse only what improves the new product. Do not preserve old AgentReady concepts solely because code exists.

Current AgentReady code should remain isolated during the relaunch until the new path is functional. Avoid destructive migration early.

## 14. Proposed code architecture

Target direction:

```text
core/
  canonicalize/
  invariants/
  engine/
  evidence/
  decisions/

adapters/
  ucp/
  ap2/
  a2a/
  mcp/

packs/
  ucp-ap2/
    manifest.*
    invariants/
    fixtures/
    tests/

cli/
examples/
tests/
docs/
site/
```

Architecture rules:

- protocol-specific parsing stays in adapters
- invariant logic stays independent of transport where possible
- evidence is never discarded during canonicalization
- all decisions are reproducible
- no LLM should be required to determine PASS/BLOCK for core invariants
- AI may assist mapping/research/tooling later, but deterministic verification owns enforcement
- protocol versions are explicit inputs to compatibility logic
- unsupported or ambiguous mappings should return UNKNOWN rather than silently guessing

## 15. Definition of Done for an invariant

An invariant is not complete unless it has:

1. a stable rule ID
2. a human-readable name
3. protocol/version applicability
4. normative source references or explicit product rationale
5. exact source objects and fields
6. canonicalization rules
7. deterministic predicate
8. severity/default decision
9. PASS fixture
10. BLOCK fixture
11. UNKNOWN/unsupported fixture when relevant
12. unit tests
13. integration test against the pack
14. machine-readable evidence output
15. human-readable explanation
16. compatibility notes for protocol evolution
17. changelog entry when semantics change

## 16. Definition of Done for a pack

A pack is not production-ready unless it has:

- manifest and semantic version
- supported protocol versions
- all included invariant IDs
- complete fixtures
- regression suite
- compatibility matrix
- deterministic output contract
- provenance/source references
- documented limitations
- changelog
- upgrade behavior

## 17. Global startup workstreams

TimeProofs must be developed as a company, not only as code. The following workstreams are mandatory and should each have explicit research, decisions, metrics, and owners (even if the owner is initially the founder):

### Product
Problem definition, ICP, use cases, product surface, wedge, roadmap, adjacent opportunities, kill criteria.

### Protocol intelligence
MCP, A2A, UCP, AP2, x402, business protocol evolution, open issues, drafts, compatibility risks, specification changes.

### Engineering
Architecture, adapters, canonical model, invariant DSL/model, evidence, runtime, performance, tests, release process, security.

### Developer experience
CLI, SDKs, quickstarts, examples, fixtures, CI, local-first workflows, debugging, error ergonomics, upgrade paths.

### Design and brand
Category language, brand system, visual grammar, interaction design, docs design, website, product UI, diagrams, accessibility.

### Distribution
Open source strategy, package registries, GitHub, communities, standards discussions, content, integrations, marketplaces, partnerships.

### Sales
ICP segmentation, self-serve versus enterprise motion, technical buyer, economic buyer, procurement path, sales collateral, POCs only when strategically justified.

### Pricing and packaging
Value metric, free boundary, usage pricing, enterprise packaging, margin model, billing, expansion revenue.

### Partnerships
Protocol maintainers, payment providers, agent platforms, merchant platforms, integrators, vertical protocol builders.

### Security
Threat model, supply-chain risk, data handling, signing, tamper evidence, secret handling, multi-tenancy, incident response.

### Legal and compliance
Terms, privacy, DPA, liability boundaries, open-source licensing, trademark, protocol license compatibility, export/data residency where relevant.

### Reliability and operations
SLOs, latency budget if inline, fail-open/fail-closed policy, degradation behavior, incident management, observability, compatibility rollbacks.

### Data strategy
What telemetry is necessary, what evidence may be retained, privacy boundaries, proprietary compatibility corpus, pack-quality data, feedback loops.

### Internationalization
Global developer audience, English-first product/docs, regional compliance/pricing only when justified, global availability constraints.

### Finance
Infrastructure cost, gross margin, pricing sensitivity, runway assumptions, founder budget, break-even thresholds, scenario planning.

### Metrics
Activation, first successful verification, verified transaction volume, pack adoption, violation detection, false-positive/UNKNOWN rate, retention, expansion, integration time, protocol coverage.

### Competitive intelligence
Direct competitors, adjacent runtimes/gateways, standards absorption risk, protocol roadmaps, build-versus-buy trends.

### Strategic evolution
Travel, procurement, commerce, finance, insurance and other vertical packs; marketplace; managed private packs; inline enforcement; ecosystem standard contributions.

## 18. Decision framework

Before building a major feature, ask:

1. Is the problem created by composition, or can one underlying protocol solve it cleanly?
2. Will protocol maturity make this feature more valuable or obsolete it?
3. Is the value deterministic and measurable?
4. Can the customer adopt it unilaterally?
5. Does usage create a cumulative moat (packs, compatibility knowledge, evidence corpus, integrations, reputation, switching cost)?
6. Is there a clear payer eventually?
7. Can the first useful version be built by a small team/solo founder?
8. Is there a credible distribution channel that does not require a large outbound sales force?
9. Are we creating another scanner/dashboard/wrapper? If yes, stop and reconsider.
10. Is the proposed design copied from a generic SaaS pattern rather than derived from the workflow? If yes, redesign.

## 19. Explicit non-goals

Do NOT turn TimeProofs into:

- a generic AI readiness scanner
- a score/audit product
- a generic MCP gateway
- a generic agent observability dashboard
- an identity provider
- an OAuth replacement
- a generic policy engine
- an agent authorization ledger as the primary category
- a generic workflow engine
- a payments company
- a protocol invented mainly for visibility
- a passive PDF/reporting product
- a wrapper whose value disappears when standards add one field

## 20. Open critical questions

These must be researched before or during implementation:

- Exact UCP/AP2 normative guarantees for every candidate invariant
- Which invariants remain truly cross-protocol after latest spec changes
- How much of verification can happen from supplied artifacts versus live system reads
- The correct fail-open/fail-closed semantics for UNKNOWN
- Whether evidence bundles need signing in V1 or later
- Hosted versus fully local execution boundary
- Data retention defaults
- Which first buyer segment emerges around UCP/AP2 implementations
- Best protocol-maintainer/community distribution path
- When to add A2A/MCP packs
- How to prevent the UCP/AP2 wedge from becoming the perceived product ceiling
- Whether pack authorship should ever be opened to third parties and under what verification model

## 21. Relaunch sequence

1. Freeze this master context.
2. Research latest UCP/AP2 specs and open issues.
3. Create an invariant research matrix with normative evidence.
4. Freeze canonical object/evidence model.
5. Freeze first pack semantics.
6. Implement deterministic core engine.
7. Implement UCP/AP2 adapters.
8. Build fixtures and regression suite before polishing UI.
9. Implement CLI and machine-readable output.
10. Add CI integration.
11. Redesign website around the new category and real example.
12. Publish docs and examples.
13. Add hosted enforcement/history only after the core local verifier is trustworthy.
14. Expand to the next protocol boundary only when the first pack architecture proves reusable.

## 22. Handoff rule

A new chat/AI assistant joining the project should:

1. Read this file first.
2. Read `docs/startup/STARTUP_OPERATING_SYSTEM.md` and the latest decision log.
3. Inspect current branch status and recent commits.
4. Verify current external protocol facts on the web before relying on historical assumptions.
5. Never silently change the company thesis, category, wedge, or invariant semantics.
6. Record material strategic changes in the decision log.
7. Distinguish facts, hypotheses, decisions, and open questions.
8. Prefer updating the canonical documents over relying on conversation memory.

## 23. Current approved decisions

- Keep the **TimeProofs** brand.
- Reuse the existing `BACOUL/timeproofs` repository.
- Work on branch `relaunch/invariant-engine` until relaunch is ready.
- Retire AgentReady as the primary positioning; preserve legacy code during migration.
- Company category target: cross-protocol consistency infrastructure.
- Initial wedge: UCP ↔ AP2 consistency validation.
- Long-term moat hypothesis: verified, versioned Invariant Packs and compatibility knowledge.
- Core decisions must be deterministic and evidence-backed.
- Runtime enforcement is the strategic destination; scanning/reporting is not.
- Build and design decisions must be benchmarked against category-leading global products rather than generic AI-generated SaaS defaults.

---

This document is intentionally conservative: when a fact about an external protocol changes, update the relevant research document and decision log rather than rewriting history silently.