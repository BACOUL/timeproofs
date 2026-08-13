# TimeProofs — External Value Evidence

Date: 2026-08-13
Status: CONDITIONAL GO
Branch: `relaunch/invariant-engine`

## Decision

**Proceed to a narrow M8.2 RESOLVE design, but do not build managed cloud, broad integrations, or a marketing site before direct buyer evidence.**

The technical problem is externally validated. The commercial product is not yet validated.

The strongest durable positioning is not generic idempotency and not a generic pre-execution gate. Provider-native systems already solve parts of those problems. TimeProofs should own the neutral cross-system question:

> **Did the consequential action that an agent was authorized to perform actually happen, and is the resulting provider/business state consistent with that authorization?**

This means composing authorization evidence, provider execution state, and eventually merchant/order state across protocol and provider boundaries.

---

## 1. Problem evidence — GREEN

### Stripe

Stripe documents idempotent requests specifically for connection errors so a caller can safely repeat a request without accidentally executing it twice. This validates the underlying ambiguity class: the caller can lose the response after the provider may have processed the operation.

Source: https://docs.stripe.com/api/errors/handling

### Adyen

Adyen explicitly documents timeout ambiguity, idempotent retries, asynchronous webhooks for missing responses, and transaction-status checking when no response is received. The provider warns that the merchant must reconcile its state with provider state.

Sources:
- https://docs.adyen.com/development-resources/api-idempotency
- https://docs.adyen.com/point-of-sale/error-scenarios/
- https://docs.adyen.com/development-resources/webhooks

### PayPal

PayPal gives the exact canonical example TimeProofs targets: a capture request times out while the server captures the payment. PayPal also documents duplicate transactions caused by network/server communication failures and recommends checking transaction status and using idempotency.

Sources:
- https://developer.paypal.com/reference/guidelines/idempotency/
- https://developer.paypal.com/api/rest/troubleshooting/rest_duplicate_transaction/

**Conclusion:** ambiguous side effects are not hypothetical or agent-specific. They are a known payments-integration problem across major PSPs.

---

## 2. Agentic / AP2 composition evidence — GREEN

### AP2 issue #211 — cross-object consistency gap

The AP2 community has documented a concrete gap where CartMandate and PaymentMandate can each be locally valid while remaining globally inconsistent. The issue explicitly asks for deterministic consistency checks before execution.

Source: https://github.com/google-agentic-commerce/AP2/issues/211

### AP2 discussion #258 — cumulative state / downstream truth

An implementer asks where cumulative state across multiple mandate fulfilments belongs, how systems reconcile partial views, and whether a separate downstream ledger/accounting layer is required. The response describes production use of `mandate_id` as a join key across settlement scanner, merchant webhook, refund handler and reconciliation job.

Source: https://github.com/google-agentic-commerce/AP2/discussions/258

### AP2 discussion #262 — runtime idempotency outside the protocol

An independent project wraps AP2 payment moments in a reserve/commit/release lifecycle because consume-once, concurrency and idempotency are runtime-state problems rather than cryptographic-verification problems.

Source: https://github.com/google-agentic-commerce/AP2/discussions/262

### Skyfire implementation feedback

Skyfire reported questions after implementing an actual AP2 credential provider and merchant. This is valuable because it shows real implementers encounter unresolved interoperability and execution questions beyond sample-code happy paths.

Source: https://github.com/google-agentic-commerce/AP2/discussions/126

**Conclusion:** there is evidence for an infrastructure layer outside the protocol specification itself. This is materially stronger than inventing a protocol gap in isolation.

---

## 3. Economic owner / budget evidence — GREEN-AMBER

Stripe currently has dedicated Agentic Commerce engineering and go-to-market roles. Its Staff Engineer, Agentic Commerce role describes building agentic commerce from close to zero with strategic users. Its Business Development Manager, Agentic Commerce role is explicitly responsible for engaging early adopters, discovering needs, developing sales plays and driving adoption. Stripe also has Integration Reliability Engineers whose responsibilities include tracing money movement, reconciling systems, automating breakage handling and ensuring financial data correctness.

Sources:
- https://stripe.com/careers/listing/staff-engineer-agentic-commerce/8047789
- https://stripe.com/careers/listing/business-development-manager-agentic-commerce/7524334
- https://stripe.com/jobs/listing/integration-reliability-engineer-payments/8054241

Mastercard is also building an Agent Suite at the intersection of agentic AI, commerce and payments for enterprise customers.

Source: https://careers.mastercard.com/us/en/job/R-276565/Manager-Solution-Operations-Agent-Suite

**Interpretation:** organizations are assigning expensive engineering, reliability and GTM headcount to this category. That proves budget ownership exists around the problem domain, but it does **not** prove they would buy TimeProofs rather than build internally.

---

## 4. Adjacent willingness-to-pay — AMBER

AlgoVoi publicly prices self-hosted agentic payment/evidence infrastructure at one-time perpetual licences from approximately $15k, while also selling smaller verification components. This is direct evidence that at least one market participant believes buyers will pay meaningful infrastructure prices for agentic payment rails and evidence.

Source: https://algovoi.co.uk/

Payment-orchestration vendors such as Spreedly and Gr4vy sell enterprise infrastructure that unifies PSPs and manages payment workflows across providers. These are adjacent-budget signals: enterprises already pay for neutral layers when multi-provider complexity is important enough.

Sources:
- https://www.spreedly.com/lp/payments-orchestration
- https://gr4vy.com/payment-orchestration/

**Important limitation:** published vendor pricing and enterprise categories are not proof that TimeProofs itself has willingness-to-pay.

---

## 5. Competition / absorption risk — AMBER-RED for a narrow product

### Provider-native idempotency

Stripe, Adyen and PayPal already provide provider-local idempotency/recovery semantics. Therefore TimeProofs cannot win as "safe Stripe retries".

### AlgoVoi

AlgoVoi is building a broad agentic payment/evidence stack including AP2, receipts, execution binding, orchestration, cancellation/refund and self-hosted rails.

### Meridian Verity

Meridian Verity positions around evaluating exact action parameters immediately before an economic effect and returning acceptance/refusal decisions.

Source: https://meridianverity.com/solutions/

**Implication:** generic gating, receipts, idempotency and single-provider verification are already crowded or absorbable.

TimeProofs must remain narrower and more neutral:

> **cross-protocol + cross-provider + business-state consistency and outcome resolution**

The moat must be the accumulated semantics required to resolve the same transaction across systems that do not share one state model.

---

## 6. Anti-hype evidence — IMPORTANT

Do not use raw x402 transaction counts as primary market proof. A July 2026 population-scale research paper reports that a large share of measured x402 settlements can be internal or manufactured, and argues transaction count is not equivalent to independent adoption.

Paper: `How Agentic Is Agentic Commerce? A Population-Scale Measurement of x402 Adoption and Authenticity`, arXiv:2607.12575.

**Operating rule:** TimeProofs market validation must be based on independent implementers, production workflows, integration intent and budget signals — not protocol transaction-count headlines.

---

## 7. Best initial ICP

### ICP A — Agentic commerce/payment platforms

Teams already implementing AP2/x402/agent payments and integrating one or more PSPs or settlement rails.

Pain owner: Head/Lead of Payments, Payments Engineering, Platform Engineering, Agentic Commerce engineering.

### ICP B — Payment orchestration / commerce infrastructure

Platforms that sit between merchants/agents and multiple PSPs. They already have a reason to maintain neutral provider semantics.

Pain owner: Payments Platform, Integration Reliability, Payment Operations Engineering.

### ICP C — Enterprise agent runtimes with consequential actions

Organizations allowing agents to spend, order, refund, reserve, cancel, or mutate external systems where an ambiguous outcome can create duplicate economic effects.

Pain owner: Agent Platform / AI Infrastructure + Payments / Security / Reliability.

Avoid as first ICP:
- small merchants;
- ordinary SaaS teams with a single Stripe integration;
- teams that only need provider-native idempotency;
- buyers looking for compliance reports or dashboards.

---

## 8. Design-partner target list

Priority is based on evidence of actually building, not brand size.

1. **Skyfire / AP2 implementers** — actual credential-provider + merchant implementation; unresolved implementation questions.
2. **Independent AP2 builders around discussion #258** — explicitly asking where downstream cumulative truth/reconciliation should live.
3. **cycles-ap2-python / runtime-idempotency builders** — adjacent runtime-state problem; useful for boundary validation.
4. **Agentic commerce platforms integrating more than one payment rail** — strongest fit for neutral RESOLVE.
5. **Payment orchestration vendors / integrators** — validate whether neutral authorized→executed consistency belongs inside their stack.
6. **Stripe Agentic Commerce / Payments reliability teams** — high-value expert validation; likely build-vs-buy risk is high.
7. **Adyen integration/reliability ecosystem** — validates portability beyond Stripe.
8. **Enterprise agent-platform teams** with real spend/cancel/refund operations.

Competitors such as AlgoVoi and Meridian are primarily boundary/competition intelligence, not ideal first customers.

---

## 9. What a buyer must say before major investment

Desk research is now sufficient to justify direct validation, not cloud build.

A qualified signal is one of:

- "We have had ambiguous/duplicate side-effect incidents and this is painful."
- "We already maintain provider-specific reconciliation/recovery logic and would prefer a neutral component."
- "We would integrate this in a test environment."
- "This belongs to my team's budget / I can name the budget owner."
- "If it supported provider X + system Y, I would pay for it / sponsor a pilot."

Weak signals that do not count:
- "interesting";
- stars/likes;
- protocol transaction counts;
- generic enthusiasm about agents;
- willingness to read a blog post;
- willingness to use only a free scanner/report.

---

## 10. Commercial falsification gate

Before M10 or broad provider expansion, collect at least **10 qualified external responses** from teams that operate consequential agent/payment flows.

Minimum GO threshold:
- at least 3 report the problem as material;
- at least 2 would integrate a test/pilot;
- at least 1 can identify a budget owner or paid-pilot path;
- at least 1 need cannot be solved cleanly by one provider's native idempotency alone.

Kill/pivot threshold:
- the majority say provider-native idempotency is sufficient;
- no one owns the cross-system problem economically;
- integrations require bespoke services work per customer;
- buyers want observability only rather than deterministic enforcement/resolution;
- platform/PSP vendors expose an end-to-end guarantee that collapses the neutral layer.

---

## 11. M8.2 authorization

**CONDITIONAL GO for a narrow M8.2 design/implementation foundation.**

Allowed scope:

`AMBIGUOUS → RESOLVE → COMMITTED | NOT_COMMITTED | UNKNOWN`

Rules:
- never retry an unknown side effect before resolution;
- provider-native evidence remains authoritative for provider state;
- TimeProofs must preserve authorization/protocol/provider provenance;
- RESOLVE must be provider-neutral at the contract level;
- first implementation may remain Stripe-specific;
- next strategic proof should compose provider execution with a second independent state source, ideally merchant/order state.

Not authorized yet:
- broad managed cloud;
- large website/rebrand effort;
- ten-provider expansion;
- enterprise sales infrastructure;
- claims of product-market fit;
- claims of validated willingness-to-pay.

## Final assessment

**Problem existence: GREEN**

**Agentic relevance: GREEN**

**Economic consequence: GREEN**

**Budget ownership in adjacent teams: GREEN-AMBER**

**Direct TimeProofs willingness-to-pay: RED / unproven**

**Provider-native absorption risk: AMBER-RED for narrow retry/idempotency**

**Neutral multi-system RESOLVE opportunity: GREEN-AMBER**

**Solo-founder technical feasibility for the next milestone: GREEN**

### Decision

> **Continue TimeProofs. Build M8.2 narrowly while running a hard external demand gate. Do not confuse evidence that the problem is real with evidence that TimeProofs is already a business.**
