# TimeProofs — Market & Strategic Audit

Date: 2026-08-12
Status: founder decision input
Scope: market maturity, problem evidence, protocol absorption risk, competition, buyer, distribution and moat trajectory.

## Executive conclusion

TimeProofs should continue, but NOT as a narrow `UCP ↔ AP2 amount checker`.

The market evidence supports a broader category thesis:

> agentic transactions increasingly span protocols and systems whose local guarantees do not close the composed transaction outcome.

The strongest opening is not generic conformance, logging, identity, policy or gateway security. It is deterministic cross-boundary verification of economic/lifecycle invariants using authoritative evidence, expanding from UCP↔AP2 into execution and lifecycle systems.

Current strategic verdict: **CONTINUE / BUILD**, with a strict condition: M8 must strengthen the cross-boundary evidence/enforcement moat rather than merely place the existing three checks inline.

## 1. Market maturity is no longer purely speculative

Signals observed in 2026:

- Google launched UCP publicly in January 2026 and describes it as an open standard across the shopping journey.
- UCP was co-developed with Shopify and industry participants including Etsy, Wayfair, Target and Walmart, with 20+ additional endorsements announced at launch.
- By April 2026 the UCP Tech Council expanded to include Amazon, Meta, Microsoft, Stripe and Salesforce alongside Google, Shopify, Etsy, Target and Wayfair.
- Google announced UCP-powered Universal Cart rollout and expansion into hotels and food delivery in May 2026.
- Google stated that Commerce Inc, Salesforce and Stripe intend to implement UCP on their platforms.
- AP2 remains an active open protocol with substantial issue/discussion/PR activity.

Interpretation: adoption is early and partially gated, but the ecosystem is moving from protocol design toward real platform integration. This is the correct phase for infrastructure that solves composition problems before conventions fully harden.

## 2. The core problem is evidenced in the standards community

Relevant AP2 evidence includes:

- Issue #211 describes a Cart/Checkout and PaymentMandate that may each be valid while the approved payment amount is inconsistent with the cart state; the executing path may continue unless the referenced state is fetched and compared.
- Discussion "Payment Receipt vs merchant order state: which layer owns the composed outcome?" remains an explicit composition-boundary question.
- Discussion "Task-level identity across multiple mandate chains" exposes cross-chain linkage questions.
- Discussion "Cumulative state across mandate fulfilments — where does it live?" describes a case where each individual fulfilment is locally valid while cumulative spend breaches the user's original constraint.
- A runtime idempotency project (`cycles-ap2-python`) exists specifically because consume-once/concurrency semantics are downstream runtime-state concerns rather than only cryptographic mandate validation.
- AP2 issue #150 reports mismatches between specification security expectations and implementation samples.

These are not proof that customers will pay TimeProofs, but they are strong evidence that "locally valid, globally wrong" is a real engineering category rather than an invented problem statement.

## 3. Standards are simultaneously our tailwind and our biggest absorption risk

UCP/AP2 already own or are strengthening:

- cryptographic authorization;
- mandate binding;
- signatures/key verification responsibilities;
- capability negotiation;
- local schema/version semantics;
- downgrade protections;
- parts of payment lifecycle semantics.

Therefore TimeProofs must not anchor its defensibility to any single missing field or verification step.

High absorption risk:
- checkout↔payment amount comparison;
- simple currency comparison;
- local mandate signature validation;
- basic idempotency fields;
- generic protocol conformance.

Lower absorption risk:
- consistency across independent protocol owners;
- protocol↔provider execution reconciliation;
- cumulative constraints spanning transactions/merchants/rails;
- order/payment/settlement lifecycle consistency;
- provider-specific evidence resolution;
- versioned compatibility knowledge across many protocol/provider pairs;
- authoritative evidence selection when multiple systems disagree.

## 4. Direct and adjacent competition

### AlgoVoi

Most important adjacent competitor identified.

It publicly demonstrates a broad agentic-payment substrate around AP2/x402 and related concerns: mandate/policy/action binding, execution references, compliance receipts, cancellation/refund attestations, chain-state verification and multi-chain execution.

Implication: TimeProofs cannot credibly claim to be the only project binding execution/evidence across agentic payments.

Difference we should own: protocol/provider-neutral invariant and evidence packs whose job is not to become the payment substrate itself.

### Cycles AP2 wrapper

Addresses reserve/commit/release and consume-once/idempotency semantics around AP2.

Implication: exactly-once/hold alone is not our wedge.

### Emerging verification/clearing research

2026 papers propose runtime verification, protocol-layer defenses and verification-native clearing for agentic commerce.

Implication: the category is forming. This validates the importance of the layer but also means generic "agent transaction verification" will become crowded quickly.

### Protocol-native verification

UCP/AP2 themselves continue to add guarantees.

Implication: TimeProofs must complement standards, not compete with their native conformance/security responsibilities.

## 5. Strongest product wedge after this audit

The initial UCP↔AP2 pack remains useful as a beachhead and executable proof.

But the next strategically valuable capability should cross a boundary that neither UCP nor AP2 can close alone.

Priority order:

1. **Approved payment ↔ executed provider outcome**
   - AP2 PaymentMandate establishes authorized payment semantics.
   - PSP/network evidence establishes what actually executed.
   - TimeProofs verifies the projection across those systems.

2. **Checkout/payment ↔ committed order lifecycle**
   - verify causation and allowed transformations, not naive final equality.

3. **Cumulative mandate constraints ↔ prior fulfilment ledger**
   - per-transaction validity is insufficient when authorization is cumulative.

4. **Cancellation/refund ↔ payment/order/provider state**
   - high economic consequence and naturally multi-system.

These create a better moat than simply adding more UCP fields.

## 6. First probable buyers

The likely early user is not a small merchant.

Most plausible ICPs:

- agentic-commerce platform teams composing commerce + payment protocols;
- payment orchestration/PSP infrastructure teams supporting agent-originated transactions;
- large commerce platforms implementing UCP/AP2 adapters;
- agent platforms that need deterministic enforcement before consequential tool/payment execution;
- commerce infrastructure vendors building multi-merchant or multi-rail agent flows.

Economic buyer is likely platform/security/payments engineering leadership rather than a marketing/compliance persona.

## 7. Cost-of-inaction hypothesis

TimeProofs becomes valuable when a mismatch can cause:

- wrong amount/currency execution;
- unauthorized cumulative spend;
- duplicate/incorrect settlement;
- order/payment divergence;
- refund/cancellation divergence;
- dispute evidence that cannot reconstruct the composed state;
- liability ambiguity between agent platform, merchant and payment layer.

This is potentially high-value infrastructure because the downside is tied to money and irreversible state, not developer convenience alone.

However, quantified customer loss data is still weak. This remains the largest business evidence gap.

## 8. Distribution assessment

Best distribution surfaces:

- GitHub Action / npm SDK for evaluation and adoption;
- official protocol communities/issues/discussions;
- reference fixtures demonstrating real composition failures;
- integration guides for UCP/AP2/provider stacks;
- upstream contributions that make TimeProofs look complementary rather than proprietary protocol replacement;
- later, inline runtime SDK/proxy integrations.

Weak distribution strategy:
- paid ads to generic merchants;
- generic AI-security SEO;
- dashboards requiring account creation before value;
- broad enterprise cold outreach as the only channel.

## 9. Moat assessment

### Moat today: weak-to-moderate

Current engine and three invariants are reproducible by competent teams.

### Moat accumulation mechanism: credible

A defensible TimeProofs can accumulate:

- adapters by protocol/provider/version;
- authoritative-field mappings;
- transformations and exceptions;
- lifecycle rules;
- evidence-source priority and freshness semantics;
- provider resolution behavior;
- fixtures from real incidents;
- historical compatibility matrices;
- invariant governance history;
- private enterprise packs later.

The moat is the maintained verification knowledge graph/corpus, not the if-statements.

## 10. Solo-founder fit

Positive:
- local-first deterministic core has low infrastructure cost;
- developer-led distribution is possible;
- packs/adapters can grow incrementally;
- no sales team is required to ship the open/developer layer;
- high-value infrastructure can support usage/enterprise pricing later.

Negative:
- protocol research burden is high;
- enterprise integrations can become expensive;
- liability expectations rise once TimeProofs blocks financial actions;
- broad provider coverage cannot be built all at once by one person.

Solo-founder strategy therefore requires a narrow execution sequence and aggressive reuse of canonical schemas/SDKs, not universal integration from day one.

## 11. Strategic scorecard

| Criterion | Current assessment |
|---|---|
| Market direction | GREEN |
| Problem evidence | GREEN/AMBER |
| Frequency today | AMBER |
| Economic consequence | GREEN |
| Standards tailwind | GREEN |
| Standards absorption risk | AMBER/RED for narrow checks |
| Direct competition | AMBER |
| Differentiation of current wedge | AMBER |
| Differentiation of multi-system invariant platform | GREEN potential |
| Developer-led distribution | GREEN potential |
| Current willingness-to-pay evidence | RED |
| Solo-founder feasibility | GREEN/AMBER |
| Long-term data/integration moat | GREEN potential |

## 12. Founder decision recommendation

**Do not pivot away from TimeProofs.**

Also **do not proceed by merely polishing UCP↔AP2 forever.**

M8 should be designed as the first bridge from static verification to consequential enforcement, while the next pack research moves toward **authorized payment ↔ executed provider outcome**.

That boundary is strategically superior because:

- it involves real money;
- it crosses independent systems;
- AP2 alone cannot attest what an external PSP/network actually executed;
- provider-specific evidence semantics can accumulate into a defensible corpus;
- the same architecture generalizes to refunds, captures, cancellations, orders and settlements.

## 13. Kill/continue trigger

Continue while at least one of these becomes stronger over the next product phase:

- external teams reproduce the same composition failure;
- protocol discussions continue leaving cross-system outcome ownership downstream;
- an integration partner wants provider/order evidence closure;
- real agentic transaction volume increases across UCP/AP2 or equivalent stacks;
- TimeProofs packs begin solving cases not reasonably absorbed by one protocol owner.

Reconsider the company thesis if protocol ecosystems converge into a single end-to-end authoritative transaction system that natively closes commerce, payment, execution and lifecycle state across providers. Current evidence points in the opposite direction: the ecosystem is becoming more compositional and multi-party.

## Source set reviewed

Primary/current sources reviewed include:
- UCP official specification and UCP↔AP2 documentation;
- Google UCP launch and 2026 UCP rollout announcements;
- Shopify engineering UCP architecture article;
- UCP Tech Council announcement;
- AP2 specification, issues and discussions (#211, #150, cumulative-state and idempotency discussions);
- AP2 community projects including AlgoVoi and cycles-ap2-python.

Secondary/research signals reviewed include 2026 work on runtime AP2 verification, protocol-level agentic-commerce attacks and verification-native clearing.
