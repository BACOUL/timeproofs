# TimeProofs — Business Architecture

Status: CANONICAL COMPANY DESIGN
Date: 2026-08-12

This document defines how TimeProofs can become a durable, high-margin developer-infrastructure company. It complements the Product Thesis and technical architecture. It does not claim product-market fit where none has been proven.

## 1. Economic thesis

TimeProofs should monetize the integrity of consequential autonomous transactions, not seats, reports or generic dashboards.

Long-term value chain:

`VERIFY → ENFORCE → RESOLVE → EVIDENCE`

Customer value increases as TimeProofs moves closer to preventing or resolving costly real-world side effects.

## 2. Users, buyers and beneficiaries

### Primary user
Developer / platform engineer integrating agentic commerce or other autonomous transaction flows.

### Technical buyer
Platform engineering lead, commerce infrastructure lead, payments engineering lead, security/reliability lead.

### Economic buyer hypothesis
VP Engineering / Head of Platform / Head of Commerce Infrastructure / payments or risk owner depending on deployment context.

### Beneficiary
The business whose money, orders, inventory, bookings or other real-world state is protected from cross-system inconsistency.

These roles are hypotheses until validated with real buyers.

## 3. First commercial problem

The first commercially meaningful problem is not "validate UCP/AP2".

The target problem is:

> Ensure that what an autonomous agent was authorized to do remains consistent with what external systems actually execute.

The first wedge is UCP↔AP2 because it is concrete and implementable. The first high-value expansion is approved AP2 PaymentMandate ↔ PSP/network execution outcome.

## 4. Monetizable failure classes

Potentially valuable failures include:

- authorized amount ≠ executed amount;
- authorized currency ≠ executed currency;
- execution bound to the wrong authorized state;
- duplicate/ambiguous side effect after retry or timeout;
- committed order inconsistent with approved checkout/payment state;
- refund/cancellation inconsistent across order/payment/provider systems;
- cumulative mandate limits exceeded across multiple fulfilments;
- missing or stale evidence where a consequential action would otherwise proceed.

TimeProofs must not manufacture urgency. Commercial priority should follow measured incident frequency × cost × ownership clarity.

## 5. Revenue architecture

### Layer A — Community / local developer adoption
Purpose: distribution, trust and integration habit.

Likely free/open surfaces:
- local deterministic verifier;
- CLI;
- basic SDK;
- public schemas;
- selected public protocol packs and fixtures;
- GitHub Action for development/CI.

### Layer B — Production usage
Primary value metric hypothesis: protected consequential transactions / enforced actions.

Candidate commercial unit:
- per verified/enforced transaction;
- optionally per resolved outcome where resolution requires provider-specific work.

Avoid seat-heavy pricing as the primary economic model.

### Layer C — Managed platform
Potential paid capabilities:
- managed pack updates;
- evidence retention/history;
- private packs;
- provider connectors;
- organization/policy controls;
- signed evidence bundles;
- deployment controls;
- support/SLA;
- regional/data-residency options where justified.

### Layer D — Enterprise commitments
Potential annual minimums for customers requiring guaranteed availability, private deployment, custom provider packs, governance or contractual support.

## 6. Pricing hypotheses — not yet market-validated

These are design envelopes, not published prices.

Possible long-term structure:

- Community: free local usage.
- Developer/Team: low fixed monthly fee only if hosted/team value exists.
- Production: usage-based price per protected transaction/action.
- Resolve: higher usage price for provider-specific outcome resolution where materially valuable.
- Enterprise: platform minimum + usage + premium capabilities.

Candidate usage envelope for modeling only: approximately €0.005–€0.03 per protected transaction depending on depth of protection. This MUST be validated before publication.

## 7. Revenue scenarios — arithmetic, not forecasts

At €0.01 per protected transaction:
- 1M transactions/month → €10k MRR;
- 10M/month → €100k MRR;
- 100M/month → €1M MRR.

At €0.005:
- 2M/month → €10k MRR;
- 20M/month → €100k MRR.

Alternative enterprise path:
- 50 customers × €2k MRR average = €100k MRR.

These scenarios show economic leverage only. They do not imply attainable volume or willingness-to-pay.

## 8. Gross-margin model

Target economics must resemble software infrastructure, not consulting.

Track:
- compute per 1,000 verifications/enforcements;
- provider API lookup cost for Resolve;
- storage/evidence retention cost;
- egress;
- support cost per account;
- incident/on-call cost;
- enterprise deployment burden.

Core deterministic verification should remain extremely low-cost. Provider-specific resolution may be materially more expensive and should be priced separately if needed.

Target strategic outcome: high gross margin with revenue growing faster than founder time.

## 9. Distribution architecture

Primary distribution should be embedded in developer workflow:

- GitHub;
- npm/package ecosystem;
- protocol communities;
- reference fixtures;
- CI integration;
- technical documentation;
- issues/standards participation;
- integrations with PSPs, agent platforms and commerce infrastructure.

Desired flywheel:

1. developer installs TimeProofs to solve a real integration problem;
2. new edge cases become fixtures/invariants;
3. packs become more valuable and reliable;
4. protocol/provider coverage increases;
5. TimeProofs becomes a default integration primitive;
6. production enforcement/resolve usage grows;
7. operational evidence improves future packs.

Cold outbound may be used selectively for discovery or enterprise deals, but the business must not depend on high-volume founder-led prospecting.

## 10. Expansion and retention

Natural expansion path inside one customer:

`VERIFY in development → CI → ENFORCE in production → RESOLVE external outcomes → more providers/protocols → private packs → evidence retention/governance`

Retention should come from:
- integration into transaction path;
- accumulated policy/history;
- provider/pack coverage;
- trusted compatibility updates;
- operational evidence;
- migration cost from removing a transaction-safety dependency.

## 11. Moat architecture

Current moat is weak. Future moat hypothesis is cumulative operational knowledge.

Defensible assets may include:
- provider × operation × recovery semantics;
- versioned invariant packs;
- compatibility history;
- evidence mappings;
- provider-specific resolvers;
- regression fixtures from real edge cases;
- historical false-positive/UNKNOWN behavior;
- distribution/reference status in developer ecosystems;
- trust/reputation from not causing false blocks.

The generic engine and simple equality checks are not a moat.

## 12. Open-source boundary

Decision principle: open enough to maximize adoption and trust; commercialize operational maintenance, proprietary compatibility knowledge and managed production value.

Likely open/public:
- core model and verifier;
- CLI/SDK basics;
- public fixtures;
- public protocol-pack schemas;
- selected public invariant packs.

Potentially commercial/proprietary:
- deeply maintained provider packs/resolvers;
- private packs;
- managed evidence/history;
- operational control plane;
- enterprise deployment/governance;
- SLA/support.

Exact license/split remains open until distribution and moat evidence improves.

## 13. Support model

Support must not turn TimeProofs into bespoke consulting.

Community:
- docs/issues/examples.

Paid production:
- documented support response targets;
- pack/provider compatibility support;
- incident escalation for blocking regressions.

Enterprise:
- negotiated SLA/support only if pricing covers operational burden.

Custom invariant work must become reusable pack capability whenever possible.

## 14. Liability and trust model

TimeProofs may influence financially consequential actions. Contract and product language must distinguish:

- observed evidence;
- deterministic invariant result;
- enforcement policy;
- external side-effect execution owned by the caller.

Do not claim legal compliance or guaranteed transaction correctness beyond the evidence actually checked.

Before paid production launch, define:
- limitation of liability;
- warranties/disclaimers;
- DPA/privacy roles;
- security claims;
- incident communication;
- customer responsibility for explicit fail-open policies.

## 15. Data/evidence ownership

Default principle: minimize raw transaction custody.

Prefer:
- local processing;
- hashes/digests;
- structured outcomes;
- anonymized failure classes;
- compatibility telemetry with opt-in/contractual controls.

Raw payment/order payload retention should exist only when required for a paid evidence feature and with explicit retention/security controls.

Customer data should not be the moat if equivalent compatibility knowledge can be learned without storing sensitive payloads.

## 16. Partnerships

Strategic partner classes:
- PSPs/payment orchestration platforms;
- UCP/AP2 implementers;
- agent runtimes/platforms;
- merchant commerce platforms;
- protocol maintainers;
- vertical transaction platforms.

Partner thesis:
TimeProofs should complement rails rather than compete to become every rail.

Strong partnership outcome:
- partner exposes authoritative execution evidence;
- TimeProofs supplies maintained cross-system invariants/resolution;
- integration becomes a recommended/reference path.

## 17. Metrics architecture

### Activation
- time to first successful verification;
- % installs reaching a real decision;
- % users running non-fixture transaction artifacts.

### Product value
- consequential transactions protected;
- violations caught;
- UNKNOWN rate;
- false-block rate;
- resolution success rate;
- mean time to resolve ambiguous outcome.

### Commercial
- production projects;
- protected transactions/month;
- conversion local→production;
- expansion VERIFY→ENFORCE→RESOLVE;
- net revenue retention when meaningful;
- revenue per production account;
- gross margin.

### Moat
- supported protocol/provider operation pairs;
- maintained invariant/resolver count;
- regression fixtures from real edge cases;
- compatibility update lead time;
- protocol/provider references/partnerships.

## 18. International architecture

Global-first assumptions:
- English-first developer experience;
- currency semantics explicit;
- no locale-sensitive comparisons for economic identity;
- UTC/time-source discipline;
- provider/regional behavior modeled by profile, not hidden assumptions;
- future data residency only where demand justifies it.

Regulatory requirements should be modeled as separate jurisdiction-aware policy/evidence layers if they become a paid need; they must not contaminate deterministic protocol semantics.

## 19. Solo-founder operating constraint

The company architecture should preserve solo-founder leverage for as long as possible:

Good:
- deterministic local code;
- self-serve developer adoption;
- automated packaging/CI;
- usage-based revenue;
- reusable packs;
- low-touch onboarding.

Danger:
- custom enterprise integration for every customer;
- 24/7 bespoke support before revenue warrants it;
- hundreds of shallow adapters;
- heavy cloud infrastructure before usage;
- legal/compliance promises requiring a large services team.

Hiring/funding becomes justified when demand exceeds what automation and reusable packs can support, not merely because enterprise software normally has a team.

## 20. Funding optionality

TimeProofs should be designed to work bootstrapped through developer alpha and early production pilots.

Funding becomes strategically attractive if it accelerates an already demonstrated opportunity such as:
- multiple PSP/provider integrations requested by users;
- high transaction volume requiring reliability investment;
- standards/partner opportunity with a short window;
- enterprise demand requiring support/security certification.

Do not raise merely to manufacture demand.

## 21. Commercial kill conditions

Reconsider or narrow the company if, after meaningful ecosystem maturation and direct validation:

- consequential cross-system inconsistencies are rare or cheaply solved inside each platform;
- protocol/provider owners expose complete end-to-end guarantees eliminating the independent layer;
- teams consistently prefer to implement the needed invariants internally and switching cost remains trivial;
- no buyer owns the economic pain;
- paid production usage cannot support infrastructure-grade margins;
- provider integrations require services-heavy work that does not become reusable;
- TimeProofs cannot gain distribution without expensive founder-led sales.

## 22. Commercial validation gate

Before significant M10/cloud spend, require evidence for at least:

1. one clearly defined ICP with active agentic transaction flows;
2. multiple real incidents or credible failure-cost cases;
3. one economic buyer role that owns the risk;
4. willingness to integrate TimeProofs in development/CI or runtime;
5. pricing/value-metric feedback from real prospects/users;
6. a plausible path to positive gross margin at expected volume;
7. evidence that at least one pack/provider integration has repeatable demand.

## 23. Company architecture rule

Technical readiness, market proof and revenue proof are separate.

TimeProofs may be technically world-class before it has product-market fit. The repository must never convert a pricing hypothesis or revenue scenario into a claimed market fact without evidence.