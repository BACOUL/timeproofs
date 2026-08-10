# TimeProofs — Startup Operating System

This document defines how TimeProofs is researched, designed, built, launched, sold, distributed, operated, and evolved as a global developer-infrastructure company.

The goal is not merely to ship software. The goal is to build a category-defining company with world-class product, engineering, developer experience, distribution, brand, economics, and strategic defensibility.

## 1. Operating principle

TimeProofs must never default to a generic SaaS recipe.

For every major decision, the team must answer:

- What is the best-in-class global reference for this exact problem?
- Why does that reference work?
- Which principle transfers to TimeProofs?
- Which pattern should NOT be copied because our workflow is different?
- What is the TimeProofs-native solution?

The benchmark is not “good enough for an indie SaaS”. The benchmark is category leaders in developer infrastructure, payments, reliability, security, and enterprise software.

## 2. Evidence hierarchy

Strategic decisions should prefer evidence in this order:

1. Current official protocol specifications and normative text
2. Open issues / discussions from protocol maintainers
3. Production incident reports and real implementation failures
4. Product documentation and behavior of category leaders
5. Customer usage data and product telemetry
6. Direct buyer/developer feedback
7. Academic/industry research
8. Market commentary and secondary analysis
9. Founder intuition

Founder intuition may start a hypothesis but cannot by itself close a major product decision.

## 3. Decision labels

Every material statement in strategy docs should be treated as one of:

- **FACT** — externally verifiable today
- **HYPOTHESIS** — plausible but unproven
- **DECISION** — chosen direction
- **OPEN QUESTION** — unresolved and tracked
- **KILL CONDITION** — evidence that would invalidate a direction

This prevents future chats or contributors from confusing speculation with commitment.

## 4. Company workstreams

### 4.1 Product strategy

Questions:

- What exact composition failure do we prevent?
- Who experiences it first?
- What is the first “must-have” moment?
- What is the smallest product that proves the category?
- Which adjacent use cases should explicitly be refused?
- How does the wedge expand into the platform?

Artifacts:

- master context
- product spec
- invariant pack specs
- use-case library
- kill criteria
- roadmap with dependencies

### 4.2 Protocol intelligence

Protocols to continuously track:

- MCP
- A2A
- UCP
- AP2
- x402 and adjacent payment/authorization protocols
- business/vertical protocols relevant to commerce, travel, procurement, insurance, finance, services, healthcare and future verticals

For each:

- current version
- normative guarantees
- extension mechanisms
- object model
- task/transaction lifecycle
- identity/auth model
- failure semantics
- open issues
- roadmap
- compatibility changes
- opportunities for composition failures

No TimeProofs rule may be based on stale protocol assumptions.

### 4.3 Engineering architecture

Engineering priorities:

1. deterministic correctness
2. evidence preservation
3. version-awareness
4. reproducibility
5. adapter isolation
6. invariant composability
7. explicit UNKNOWN state
8. testing before UI polish
9. minimal runtime dependencies
10. predictable performance

Core artifacts:

- canonical object model
- adapter contract
- invariant contract
- evidence contract
- decision contract
- pack manifest format
- compatibility matrix
- fixtures and regression suite

### 4.4 Reliability / runtime operations

Inline enforcement changes TimeProofs from a developer tool into infrastructure.

Before inline mode, define:

- latency budget
- availability target
- fail-open vs fail-closed behavior per invariant class
- retry policy
- cache semantics
- stale pack behavior
- regional failure behavior
- data plane / control plane separation if needed
- incident response
- rollback strategy for bad invariant pack releases
- protocol-version emergency pinning

A bad TimeProofs rule that blocks legitimate transactions can be as damaging as a missed violation.

### 4.5 Security

Required work:

- threat model
- malicious artifact handling
- signature/hash verification boundaries
- parser hardening
- secret-handling policy
- tenant isolation
- evidence integrity
- supply-chain security
- dependency policy
- vulnerability disclosure
- signed releases where justified
- audit trail integrity

The company must not market “proof” unless it clearly states what has actually been cryptographically or operationally proven.

### 4.6 Data strategy

The valuable long-term asset may be compatibility knowledge, not customer payloads.

Prefer collecting:

- protocol/version compatibility
- invariant outcomes
- anonymous failure classes
- pack regression data
- mapping edge cases
- latency/UNKNOWN rates

Minimize collection of sensitive transaction contents unless required.

Data strategy must answer:

- what must remain local
- what may be uploaded
- retention period
- redaction
- evidence hashing
- enterprise data residency
- whether raw payload storage is ever necessary

### 4.7 Developer experience

The activation target is not “created an account”.

The activation target is:

> a developer runs a real TimeProofs verification on real or fixture protocol objects and understands the result immediately.

Required surfaces may include:

- CLI
- JS/TS SDK
- GitHub Action
- JSON output
- deterministic exit codes
- fixtures
- examples
- local verification
- hosted verification where useful

Every error must tell the developer:

- what failed
- which objects/fields were involved
- why the relationship matters
- which versions were assumed
- what TimeProofs could not determine
- what action to take next

### 4.8 Product UX

Do not begin with a dashboard.

Begin with the workflow.

Possible product primitives:

- transaction composition graph
- object inspector
- invariant diff
- evidence bundle
- version compatibility view
- enforcement event timeline
- pack explorer

A UI exists only when it is a better tool for one of these jobs than CLI/code output.

### 4.9 Brand and visual identity

Brand: TimeProofs.

The brand should communicate:

- rigor
- deterministic verification
- infrastructure
- trust without compliance theater
- compositional reasoning
- protocol-native expertise

Avoid generic AI tropes:

- glowing brains
- robot mascots by default
- gradient blobs
- “AI-powered” as primary identity
- generic dashboard cards without workflow relevance

The visual system should emerge from the product’s native objects: protocol nodes, bindings, invariants, diffs, proofs/evidence, and commit decisions.

### 4.10 Website

The website must answer within seconds:

1. What can go wrong even when each protocol is valid?
2. What does TimeProofs verify?
3. What concrete protocols are supported today?
4. Can I run it now?
5. What output will I get?

Initial homepage proof should be a concrete UCP/AP2 inconsistency, not a generic feature list.

The website should include real runnable examples as soon as possible.

### 4.11 Documentation

Docs are a primary distribution channel.

Minimum structure:

- Quickstart
- Concepts
- UCP/AP2 pack
- Rule reference
- Evidence model
- CLI
- SDK
- CI
- Compatibility
- Security model
- Changelog
- Migration/versioning
- Examples

Docs must be optimized for both humans and coding agents/LLMs where practical, while preserving authoritative human-readable content.

### 4.12 Distribution

Primary distribution thesis:

- protocol communities
- GitHub
- npm / developer package ecosystems
- CI workflows
- reference fixtures
- standards/issues participation
- technical content that solves real implementation problems
- integrations with agent/commerce/payment platforms

Potential flywheel:

1. TimeProofs publishes invariant pack + fixtures
2. implementers use it to validate integrations
3. edge cases become regression fixtures
4. pack quality improves
5. protocol maintainers reference or discuss it
6. distribution grows
7. private/managed packs become commercial

Avoid a business that requires large-volume cold outbound to become viable.

### 4.13 Sales

Sales is allowed; dependence on founder-heavy enterprise consulting is not the strategy.

Potential buyers:

- agent commerce platforms
- merchants implementing UCP/AP2
- payment orchestrators / PSP-adjacent platforms
- agent infrastructure vendors
- protocol integration vendors
- enterprises operating multi-protocol agent flows

Distinguish:

- user: developer/platform engineer
- technical buyer: engineering/platform/security lead
- economic buyer: VP Eng / platform leader / commerce infrastructure owner / risk owner depending on use case

Enterprise sales should unlock high-value deployment modes, not substitute for missing product-market pull.

### 4.14 Pricing and packaging

Pricing must follow the value metric.

Candidate value metrics:

- verified transactions
- invariant checks
- managed private packs
- environments/projects
- enterprise control-plane capabilities

Avoid seat-heavy pricing if the product’s value is transaction infrastructure.

A hybrid model may eventually combine:

- free developer/local tier
- usage-based verification
- platform/enterprise minimum
- private pack/support/SLA add-ons

Benchmark global developer infrastructure pricing behavior rather than copying standard SaaS good/better/best without reason.

### 4.15 Partnerships

Potential strategic partners:

- UCP/AP2 implementers
- protocol maintainers
- payment infrastructure
- merchant platforms
- A2A/MCP agent runtimes
- system integrators building protocol adapters
- travel/procurement vertical protocol projects

Partnership goal:

TimeProofs becomes the neutral composition-verification layer, not a competitor to every rail.

### 4.16 Open source strategy

Open source is a distribution and trust decision, not ideology.

Possible split:

Open/public:

- core verifier
- public pack schemas
- public protocol packs
- fixtures
- CLI

Commercial:

- managed verified pack updates
- private packs
- hosted history
- inline enforcement
- enterprise governance
- SLA
- collaboration
- private deployment

Do not open-source proprietary compatibility knowledge automatically; decide based on distribution versus moat.

### 4.17 Legal and compliance

Study:

- open-source licenses
- protocol licenses
- trademark availability/defense for TimeProofs
- privacy/DPA
- liability if TimeProofs returns PASS or BLOCK incorrectly
- limitation-of-liability wording
- processor/controller roles
- retention/data residency
- security claims
- export/sanctions implications for global infrastructure if relevant

Avoid marketing TimeProofs as legal compliance unless legal scope is deliberately added.

### 4.18 International / global strategy

English-first product, docs and developer messaging.

Design for:

- multi-currency objects
- global identifiers/entities
- time zones
- regional payment/provider differences
- Unicode/international names
- configurable data residency later

Do not localize the product deeply before demand requires it.

### 4.19 Finance and unit economics

Track from the start:

- cost per 1,000 verifications
- hosted compute cost
- storage/evidence cost
- egress
- support load
- gross margin
- free-tier abuse
- enterprise deployment cost

The product should have infrastructure-grade gross margin potential, not services economics.

### 4.20 Metrics

North-star candidates should reflect product value, not vanity.

Possible key metrics:

- verified consequential transactions
- successful first verification rate
- time-to-first-verification
- active projects using packs
- pack adoption
- violations caught
- UNKNOWN rate
- false-positive/invalid-block rate
- protocol version coverage
- retention by project
- expansion from observe → enforce → inline

Do not celebrate raw website traffic unless it predicts activation.

### 4.21 Competitive intelligence

Continuously classify competitors as:

- direct composition verifier
- protocol-native verifier
- policy engine
- gateway
- auth/identity
- observability
- clearing/finality
- transaction runtime
- payment infrastructure
- integration platform

For each, track:

- what layer they own
- what standards they benefit from
- what they could absorb
- distribution strength
- funding
- pricing
- adoption
- switching cost

### 4.22 Standardization strategy

TimeProofs should not attempt to monetize a trivial proprietary schema that standards will copy.

Preferred position:

- support standards early
- contribute bugs/gaps where useful
- become implementation reference for composition invariants
- keep value in verified packs, compatibility knowledge, operational maintenance, evidence, and enforcement

If a standard adopts one of our invariant primitives, that should ideally make our engine more useful rather than obsolete it.

## 5. World-class benchmark policy

For each product area, benchmark at least 3 category leaders before a major redesign or launch decision.

Examples of benchmark classes:

- API/docs: Stripe, Cloudflare, Twilio-class developer infrastructure
- deployment/developer workflow: Vercel, Cloudflare
- runtime/reliability concepts: Temporal
- issue/evidence workflow: Sentry
- authentication developer ergonomics: Clerk/Auth0-class products
- enterprise policy/security UX: leading identity/security infrastructure
- product craft/navigation: Linear-class focused tools where applicable

Do not imitate visual appearance. Extract principles such as:

- first successful action in minutes
- copy-paste runnable docs
- explicit environments
- strong CLI parity
- versioned APIs
- clear changelogs
- deterministic errors
- visible limits/pricing
- progressive disclosure
- useful free tier
- self-serve before sales

## 6. Product gates

### Gate A — Structural validity

Before implementation:

- problem is cross-protocol by nature
- current specs confirmed
- not already guaranteed by one protocol
- direct competitor review complete

### Gate B — Engine validity

Before public alpha:

- canonical model stable enough
- deterministic decisions
- fixture suite
- version-aware rules
- no silent guessing
- documented UNKNOWN behavior

### Gate C — Developer quality

Before developer launch:

- <10 minute first verification target
- clear CLI output
- stable JSON output
- CI example
- docs quickstart
- real broken fixture + corrected fixture

### Gate D — Enforcement readiness

Before inline/blocking mode:

- SLOs
- latency budget
- rollback
- pack release safety
- false-block analysis
- fail-open/fail-closed policy
- signed/auditable evidence decision if required

### Gate E — Commercial scale

Before significant paid infrastructure spend:

- clear value metric
- real usage volume
- packaging tested
- gross margin model
- target buyer and expansion path

## 7. Anti-patterns

Stop and reconsider if the roadmap becomes dominated by:

- dashboards
- scores
- generic “AI safety” claims
- manual audits
- PDF reports
- generic MCP features
- arbitrary enterprise checklists
- custom consulting per customer
- dozens of shallow integrations without deep invariant packs
- AI-generated UI patterns that do not reflect actual developer workflow

## 8. Strategic expansion sequence

Ideal expansion follows protocol-boundary leverage, not random vertical features:

1. UCP ↔ AP2
2. A2A ↔ UCP/AP2 if real cross-object invariants emerge
3. MCP ↔ UCP/AP2 when tool-to-business-object bindings become meaningful
4. Travel invariant packs
5. Procurement invariant packs
6. Other vertical business protocols based on ecosystem maturity
7. marketplace/partner-authored packs only when verification and trust model are mature

## 9. Founder operating cadence

Weekly:

- protocol changes
- competitor moves
- issue/discussion review
- product usage
- UNKNOWN/violation patterns
- docs/activation friction

Monthly:

- pricing/economics
- pack coverage
- benchmark review
- strategic risks
- adjacent opportunities
- kill-condition check

Quarterly:

- category position
- moat strength
- protocol absorption risk
- distribution mix
- international/enterprise readiness
- whether current wedge still leads to the intended platform

## 10. Final standard

TimeProofs should be judged against this question:

> If a sophisticated platform team at a global technology company encounters a multi-protocol agentic transaction, would TimeProofs feel like a serious infrastructure primitive they trust, or like another AI-generated SaaS utility?

Only the first outcome is acceptable.