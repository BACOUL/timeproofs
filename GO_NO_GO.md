# TimeProofs V1 — Go / No-Go Market Validation Gate

Status: active validation gate  
Phase: G — market validation and pilot prospecting  
Scope: Action File V1 + Seal + Verify + Demo + pilot pages

## Purpose

This document prevents TimeProofs from moving too early into a full SaaS build.

TimeProofs V1 must be validated with the market before building accounts, dashboards, API keys, usage metering, Stripe billing, enterprise workflows or broad integrations.

The current sellable product is:

- TimeProofs Action File V1
- Seal
- Verify
- simulated AI action demo
- pilot offer
- agency / company / developer documentation
- privacy-first hash-only model

## Core positioning to preserve

TimeProofs is the black box for AI actions.

Every observable AI action can create a clear, signed and verifiable traceability file. The company keeps the file wherever it wants. TimeProofs seals fingerprints or canonical payload hashes, not sensitive action content by default.

TimeProofs complements technical logs. It does not replace logs. It does not prove that the AI was correct. It does not guarantee legal validity or full regulatory compliance.

## Validation target

Validate demand across the final market, not only AI integrators.

The minimum validation campaign contains 50 targeted contacts:

| Segment | Target contacts | Purpose |
|---|---:|---|
| AI agencies / no-code integrators | 20 | Fast channel for pilots and repeated deployments |
| Companies already using AI workflows | 15 | Direct buyer validation from teams exposed to operational risk |
| Developers / AI builders | 10 | Technical validation of Action File, Seal, Verify and integration flow |
| Risk / legal / compliance / operations profiles | 5 | Governance validation and objection discovery |
| **Total** | **50** | Multisegment validation before SaaS build |

## Success criteria

TimeProofs can move toward the next build phase only if the campaign produces clear market evidence.

Minimum success threshold:

- 10 serious replies
- 5 qualified calls
- 3 paid pilots or strong equivalent proof

Strong equivalent proof can include:

- written budget confirmation pending procurement
- signed pilot letter of intent
- confirmed internal sponsor with implementation date
- partner commitment to run a client pilot
- enterprise or agency request for paid scope, security review or invoice details

A simple compliment, generic interest, newsletter signup, vague “send more information” or unpaid curiosity does not count as strong equivalent proof.

## Definitions

### Serious reply

A serious reply is a response that includes at least one of the following:

- a concrete AI workflow use case
- a current traceability, audit, incident, compliance or client-demand problem
- a question about implementation, price, proof level, privacy or integration
- a request for a demo or call
- a named internal stakeholder or buyer role
- a clear objection that can improve the product or positioning

### Qualified call

A qualified call is a conversation with a person who can describe:

- an AI workflow that creates, sends, updates, decides, classifies, generates or records something
- the current way the action is logged or audited
- what happens when an AI action is disputed or fails
- whether the organization would pay for traceability
- who would approve or block a pilot

### Paid pilot

A paid pilot is a paid validation project for a narrow workflow. It can be delivered manually if needed. It does not require a full SaaS account system.

Suggested V1 pilot pricing:

- 299 EUR for a simple validation pilot
- 499 EUR for a deeper workflow pilot
- custom quote for enterprise, platform or self-host requirements

## Go decision

Proceed toward the next product build phase only if at least one of the following is true:

1. The minimum threshold is reached: 10 serious replies, 5 qualified calls and 3 paid pilots.
2. One segment shows strong willingness to pay with at least 3 qualified calls and 2 pilot commitments.
3. A strategic channel, such as an AI agency or platform, commits to several client workflow pilots.

Allowed next steps after a Go decision:

- paid pilot delivery workflow
- limited SaaS foundation only if required by real pilots
- API keys only if a paying pilot needs them
- usage tracking only if a paying pilot needs it
- Stripe payment only if it removes real payment friction
- integration templates based on the workflows that prospects actually requested

## No-Go decision

Do not continue into a full SaaS build if the validation campaign produces:

- fewer than 10 serious replies
- fewer than 5 qualified calls
- no paid pilot or strong equivalent proof
- interest only from one narrow segment with no willingness to pay
- objections showing that the problem is not urgent, not owned, or not budgeted

No-Go does not mean TimeProofs is dead. It means the product must be repositioned before more engineering.

Possible No-Go actions:

- change the primary buyer segment
- narrow the use case to one painful workflow
- simplify the offer
- improve the demo
- rewrite the pitch
- test a different price point
- validate through partners before building more code

## Segment-specific go signals

### AI agencies / no-code integrators

Go signals:

- agency sees TimeProofs as a paid add-on to client AI workflows
- agency wants a repeatable template for Make, n8n, Zapier or custom agents
- agency can name one client workflow where traceability matters
- agency asks about resale, implementation kit or pilot pricing

Weak signals:

- agency says it is “interesting” but cannot name a client use case
- agency wants only free content or partnership visibility
- agency sees it as a nice-to-have but not billable

### Companies using AI workflows

Go signals:

- company already uses AI to create tickets, leads, emails, documents, decisions, classifications or CRM updates
- company has concern about disputes, auditability, incident reconstruction or client trust
- company asks how to store Action Files internally
- company can identify a business owner for the workflow

Weak signals:

- company only uses AI for brainstorming or internal text drafts
- no operational action is created by AI
- no owner for AI traceability exists

### Developers / AI builders

Go signals:

- developer understands the Action File flow quickly
- developer asks about canonical payload hash, public keys, SDK, webhook or offline verification
- developer wants to integrate Seal after tool calls or workflow actions
- developer can name one project where a portable traceability file is useful

Weak signals:

- developer wants general logging or observability only
- developer asks for a full SaaS dashboard before validating the basic concept

### Risk / legal / compliance / operations

Go signals:

- stakeholder cares about reconstructing what an AI system did
- stakeholder wants portable evidence outside developer logs
- stakeholder sees value in proof levels and limitation notes
- stakeholder asks about policy, retention, incident review or audit trail

Weak signals:

- stakeholder requires formal legal certification before testing
- stakeholder cannot connect the concept to a real workflow or owner

## Objection tracking

Track objections separately by segment. Do not aggregate all objections into one generic list.

Mandatory objection categories:

- unclear buyer
- unclear urgency
- unclear budget
- too technical
- not technical enough
- privacy concern
- legal / compliance concern
- trust in signature / keys
- integration friction
- price objection
- already solved by logs or observability
- no current AI action workflow
- wants dashboard / SaaS before pilot
- wants self-host
- wants offline verifier
- wants official certification

For each objection, record:

- segment
- exact wording
- severity
- whether it blocks purchase
- possible response
- product or positioning implication

## Build freeze rule

Until the validation gate is passed, do not build:

- full SaaS accounts
- organization management
- API key dashboard
- usage metering
- Stripe subscriptions
- customer portal
- enterprise admin dashboard
- large integration marketplace
- complex SDK roadmap
- broad SEO expansion
- full observability platform features

Allowed work before validation:

- fixing broken links
- improving demo clarity
- writing outreach material
- preparing pilot delivery documents
- correcting critical documentation inconsistencies
- making tiny changes required to run a real paid pilot

## Final decision template

At the end of the 50-contact campaign, fill this section.

```text
Campaign period:
Total contacts:
AI agencies / integrators contacted:
Companies contacted:
Developers / builders contacted:
Risk / legal / ops contacted:

Serious replies:
Qualified calls:
Paid pilots:
Strong equivalent proof:

Best segment:
Worst segment:
Top 5 objections:
Top 5 requested workflows:
Most credible buyer:
Recommended decision: GO / PIVOT / STOP
Reason:
Next 3 actions:
```
