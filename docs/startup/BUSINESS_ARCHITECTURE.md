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

Commercial priority follows measured incident frequency × cost × ownership clarity.

## 5. Commercial baseline v0.1 — HYPOTHESIS TO VALIDATE

This is the current operating baseline for product and revenue design. It is deliberately concrete so engineering, packaging and distribution optimize toward one model. It is NOT a published price promise and may change with real evidence.

### Community / Developer — €0
Purpose: remove adoption friction and create trust/integration habit.

Baseline free surfaces:
- local deterministic core;
- CLI and basic SDK;
- public schemas and fixtures;
- selected public protocol packs;
- development/CI integration.

The local core must not require a TimeProofs account or mandatory cloud call.

### Production — baseline €99/month
Modeling baseline:
- €99/month platform minimum;
- 10,000 protected VERIFY/ENFORCE transactions included;
- then approximately €0.01 per protected transaction.

The protected consequential transaction/action is the primary value metric, not seats.

### Resolve — premium usage
Provider-specific outcome resolution is expected to cost and deliver more value than deterministic local verification.

Modeling envelope: approximately €0.03–€0.10 per resolution where authoritative provider/system lookup and resolution semantics are involved. Final metric may distinguish simple authoritative lookup from multi-system resolution.

### Business — baseline €499/month + usage
Candidate capabilities:
- organization/policy controls;
- managed provider packs;
- evidence/history;
- higher included volume;
- private packs/connectors where repeatable;
- production support.

### Enterprise — baseline €15k–€25k annual minimum + usage
For customers requiring contractual support, SLA, private deployment, governance, custom/restricted provider packs, security review or material committed volume.

Enterprise pricing must cover operational/support burden and must not turn the company into bespoke consulting.

## 6. Revenue scenarios — arithmetic, not forecasts

At €0.01 per protected transaction:
- 1M transactions/month → €10k usage revenue/month;
- 10M/month → €100k/month;
- 100M/month → €1M/month.

At €0.005:
- 2M/month → €10k/month;
- 20M/month → €100k/month.

Alternative account path:
- 50 accounts × €2k MRR average = €100k MRR.

These scenarios show economic leverage only. They do not imply attainable volume or willingness-to-pay.

## 7. Gross-margin model

Target economics must resemble software infrastructure, not consulting.

Track:
- compute per 1,000 verifications/enforcements;
- provider API lookup cost for Resolve;
- storage/evidence retention cost;
- egress;
- support cost per account;
- incident/on-call cost;
- enterprise deployment burden.

Core deterministic verification should remain extremely low-cost. Provider-specific resolution may be materially more expensive and is priced separately if needed.

Target strategic outcome: high gross margin with revenue growing faster than founder time.

## 8. Distribution baseline v0.1 — code-first, developer-led

Primary acquisition is embedded in developer workflow, not paid advertising or high-volume founder prospecting.

Priority order:

1. **GitHub** — canonical repository, executable fixtures, edge cases, issues, reference implementation and trust surface.
2. **npm/package ecosystem** — near-zero-friction install and repeatable local adoption.
3. **Technical documentation** — problem-led pages answering concrete UCP/AP2/transaction-integrity questions with executable code.
4. **CI / GitHub Action** — persistent integration habit and path from development verification to production enforcement.
5. **Protocol communities** — UCP, AP2, MCP, A2A, x402 and adjacent ecosystems through useful fixtures, reproductions, issues and standards contributions rather than promotion spam.
6. **Provider/platform integrations** — PSPs, payment orchestrators, commerce platforms and agent runtimes; each maintained integration should become both product capability and distribution surface.
7. **B2B2Developer partnerships** — strategic target: one platform/PSP/runtime distributes TimeProofs to many downstream developers and transaction flows.

Paid ads are not a baseline acquisition channel. Selective outbound is permitted for discovery, strategic partnerships or high-value enterprise opportunities, but the company must not require continuous founder-led cold prospecting to grow.

### Desired adoption funnel

`GitHub/docs/problem search → npm install → first local VERIFY → fixture/real artifact → CI → production ENFORCE → paid usage → RESOLVE/provider expansion → enterprise controls`

### Content/discovery themes
Examples of problem-led developer acquisition surfaces:
- verifying an AP2 PaymentMandate;
- UCP + AP2 end-to-end examples;
- preventing authorized/executed amount mismatch;
- handling UNKNOWN transaction outcomes;
- retry safety for consequential agent actions;
- PaymentMandate → PSP execution verification.

Content exists to solve integration problems and drive executable adoption, not to manufacture generic SEO traffic.

## 9. Distribution flywheel

Desired flywheel:
1. protocol/provider change or real edge case appears;
2. TimeProofs publishes/maintains a fixture, invariant or resolver;
3. developer discovers the solution through code/docs/community;
4. developer installs locally;
5. TimeProofs enters CI or runtime;
6. production ENFORCE/RESOLVE creates paid usage;
7. new operational edge cases improve packs/resolvers;
8. compatibility knowledge and trust increase;
9. more platforms/developers adopt TimeProofs.

The distribution engine and moat engine should reinforce one another.

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

Community: docs/issues/examples.
Paid production: documented support response targets, pack/provider compatibility support, incident escalation for blocking regressions.
Enterprise: negotiated SLA/support only if pricing covers operational burden.

Custom invariant work should become reusable pack capability whenever possible.

## 14. Liability and trust model

TimeProofs may influence financially consequential actions. Contract and product language must distinguish observed evidence, deterministic invariant result, enforcement policy and caller-owned external execution.

Do not claim legal compliance or guaranteed transaction correctness beyond evidence actually checked.

Before paid production launch define limitation of liability, warranties/disclaimers, DPA/privacy roles, security claims, incident communication and customer responsibility for explicit fail-open policies.

## 15. Data/evidence ownership

Default principle: minimize raw transaction custody.

Prefer local processing, hashes/digests, structured outcomes and opt-in/contractual compatibility telemetry. Raw payment/order payload retention should exist only when required for a paid evidence feature and with explicit retention/security controls.

Customer data should not be the moat if equivalent compatibility knowledge can be learned without storing sensitive payloads.

## 16. Partnerships

Strategic partner classes:
- PSPs/payment orchestration platforms;
- UCP/AP2 implementers;
- agent runtimes/platforms;
- merchant commerce platforms;
- protocol maintainers;
- vertical transaction platforms.

Partner thesis: TimeProofs complements rails rather than competing to become every rail.

Strong partnership outcome: partner exposes authoritative execution evidence; TimeProofs supplies maintained cross-system invariants/resolution; integration becomes a recommended/reference path.

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
- revenue per production account;
- gross margin;
- partner-sourced transaction volume.

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

Regulatory requirements should be separate jurisdiction-aware policy/evidence layers if they become a paid need; they must not contaminate deterministic protocol semantics.

## 19. Solo-founder operating constraint

Good: deterministic local code, self-serve developer adoption, automated packaging/CI, usage-based revenue, reusable packs and low-touch onboarding.

Danger: custom enterprise integration for every customer, premature 24/7 bespoke support, hundreds of shallow adapters, heavy cloud infrastructure before usage, or legal/compliance promises requiring a services organization.

Hiring/funding becomes justified when demonstrated demand exceeds what automation and reusable packs can support.

## 20. Funding optionality

TimeProofs should be designed to work bootstrapped through developer alpha and early production pilots.

Funding becomes strategically attractive if it accelerates demonstrated demand such as multiple requested provider integrations, high transaction volume, a standards/partner window or enterprise demand requiring reliability/security investment.

Do not raise merely to manufacture demand.

## 21. Commercial kill conditions

Reconsider or narrow the company if, after meaningful ecosystem maturation and direct validation:
- consequential cross-system inconsistencies are rare or cheaply solved inside each platform;
- protocol/provider owners expose complete end-to-end guarantees eliminating the independent layer;
- teams consistently prefer internal implementation and switching cost remains trivial;
- no buyer owns the economic pain;
- paid production usage cannot support infrastructure-grade margins;
- provider integrations require services-heavy work that does not become reusable;
- TimeProofs cannot gain distribution without expensive founder-led sales.

## 22. Commercial validation gate

Before significant M10/cloud spend require evidence for at least:
1. one clearly defined ICP with active agentic transaction flows;
2. multiple real incidents or credible failure-cost cases;
3. one economic buyer role that owns the risk;
4. willingness to integrate TimeProofs in development/CI or runtime;
5. pricing/value-metric feedback from real prospects/users;
6. a plausible path to positive gross margin at expected volume;
7. evidence that at least one pack/provider integration has repeatable demand.

## 23. Company architecture rule

Technical readiness, market proof and revenue proof are separate.

TimeProofs may be technically world-class before it has product-market fit. The repository must never convert a pricing hypothesis, distribution hypothesis or revenue scenario into a claimed market fact without evidence.