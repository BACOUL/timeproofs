# TimeProofs Sales — CRM Process for V1 Market Validation

Phase: G — market validation and pilot prospecting  
Campaign: 50 multisegment contacts  
Decision gate: do not build the full SaaS before the validation threshold is reached

## Purpose

This CRM process is designed to validate TimeProofs V1 with real buyers and users before building a larger SaaS platform.

The CRM must answer four questions:

1. Who cares about AI action traceability?
2. Which segment has the strongest pain?
3. Which workflow is urgent enough for a paid pilot?
4. Which objections block willingness to pay?

## CRM object model

Use one row per contact or opportunity.

Required columns:

| Field | Type | Required | Description |
|---|---|---|---|
| contact_id | text | yes | Unique ID such as TP-VAL-0001 |
| segment | enum | yes | agency_integrator, company_ai_workflow, developer_builder, risk_legal_ops |
| company | text | yes | Company or organization name |
| contact_name | text | optional | Person contacted |
| role | text | yes | Function or title |
| source | text | yes | LinkedIn, website, referral, community, directory, GitHub, existing network |
| country | text | optional | Country or market |
| website | url | optional | Company or profile URL |
| email | text | optional | Email if available |
| linkedin | url | optional | LinkedIn profile/company URL |
| first_contact_date | date | yes | Date first contacted |
| last_contact_date | date | optional | Last interaction |
| next_follow_up_date | date | optional | Next action date |
| channel | enum | yes | email, linkedin, form, call, referral, community, other |
| workflow_candidate | text | yes | AI workflow that may need Action Files |
| workflow_action_type | enum | yes | ticket_created, lead_created, email_sent, document_generated, crm_updated, classification, routing, other |
| pain_category | enum | yes | incident_reconstruction, auditability, client_trust, compliance_review, operations_control, developer_traceability, other |
| status | enum | yes | see CRM status pipeline below |
| score | number | yes | 0 to 5 qualification score |
| serious_reply | boolean | yes | True if response qualifies as serious |
| qualified_call | boolean | yes | True if call meets qualification criteria |
| pilot_status | enum | yes | none, proposed, negotiating, paid, strong_equivalent, refused |
| price_discussed | text | optional | 299, 499, custom, not discussed |
| objection_category | enum | optional | see objection taxonomy |
| objection_exact_words | text | optional | Exact wording if possible |
| next_action | text | yes | Clear next step |
| owner | text | yes | Person responsible for follow-up |
| notes | text | optional | Context and observations |

## CRM status pipeline

Use these statuses consistently.

| Status | Meaning | Next action |
|---|---|---|
| identified | Contact found but not contacted | Prepare message |
| contacted | First message sent | Wait or follow up |
| opened_or_viewed | Signal of attention if available | Follow up with concrete question |
| replied_weak | Vague or polite reply | Ask one qualifying question |
| replied_serious | Serious reply with use case, objection or question | Push for call |
| call_requested | Call proposed or requested | Schedule call |
| call_scheduled | Call scheduled | Prepare workflow questions |
| qualified_call_done | Call confirms real workflow and possible buyer | Propose pilot |
| pilot_proposed | Paid pilot offered | Follow up with scope and price |
| pilot_paid | Paid pilot obtained | Deliver manually or semi-manually |
| strong_equivalent | Strong non-paid proof such as budget confirmation or written pilot commitment | Treat as high priority |
| not_now | Relevant but not urgent | Nurture later |
| disqualified | Not relevant | Stop |
| do_not_contact | Asked not to be contacted | Stop permanently |

## Qualification score

| Score | Meaning | Criteria |
|---:|---|---|
| 0 | Not relevant | No AI workflow, wrong segment, no possible use case |
| 1 | Weak fit | Generic AI use but no business action |
| 2 | Possible fit | AI workflow exists but no urgent pain or owner |
| 3 | Serious fit | Concrete AI action and traceability question or objection |
| 4 | High fit | Qualified call, owner identified, pilot plausible |
| 5 | Validation proof | Paid pilot or strong equivalent proof |

Only scores 3, 4 and 5 count toward serious validation.

## Serious reply rules

A serious reply must include at least one of these:

- a concrete AI workflow
- a traceability, auditability, incident or client trust concern
- a question about privacy, hash-only sealing, proof level or verification
- a question about implementation or price
- an objection that reveals a real buying blocker
- a request for a call or demo

Generic curiosity does not count.

## Qualified call checklist

A call is qualified only if it answers at least five of these questions:

1. What AI workflow is currently used or planned?
2. What business action does the AI trigger?
3. Where is the action currently logged?
4. Who needs to understand what happened later?
5. What risk exists if the AI action is wrong or disputed?
6. Who owns the workflow?
7. Who would approve a pilot?
8. What price range is acceptable?
9. What would block a pilot?
10. What proof level is needed: declared, executed, target_confirmed or externally_verifiable?

## Pilot qualification

A pilot is worth proposing only when:

- one workflow is clearly identified
- the workflow creates, updates, sends, classifies, routes or generates something
- a business owner or technical owner exists
- the prospect understands that TimeProofs seals fingerprints, not sensitive raw content by default
- the prospect accepts that TimeProofs does not prove AI correctness or guarantee legal validity
- the expected pilot result is narrow and measurable

## Suggested pilot scopes

### Simple pilot — 299 EUR

Use when the prospect wants to validate the concept on one workflow.

Deliverables:

- one mapped AI action workflow
- one Action File example
- one sealed payload hash
- one verification walkthrough
- short limitation note
- recommendation for next step

### Deep pilot — 499 EUR

Use when the prospect wants more operational value.

Deliverables:

- workflow mapping
- Action File template
- proof level recommendation
- privacy and data-minimization checklist
- Seal and Verify walkthrough
- incident reconstruction example
- implementation notes for Make, n8n, OpenAI tool calls or custom API

### Custom pilot

Use for enterprise, platform, self-host, regulated or multi-workflow needs.

Do not promise full enterprise capability before scoping.

## Objection taxonomy

Track objections separately by segment.

| Category | Description | Example |
|---|---|---|
| unclear_buyer | No clear owner | “I do not know who would own this.” |
| unclear_urgency | Problem exists but is not urgent | “Maybe later.” |
| unclear_budget | No budget line | “We like it but cannot pay now.” |
| too_technical | Buyer cannot understand the product | “This sounds like developer infrastructure.” |
| not_technical_enough | Developer wants deeper implementation detail | “I need SDK and verification details.” |
| privacy | Concern about content exposure | “What data do you receive?” |
| legal_compliance | Concern about legal status | “Is this legally valid?” |
| signature_keys | Trust in signature or keys | “How do we verify the key?” |
| integration_friction | Too hard to add into workflow | “This adds another API step.” |
| price | Price resistance | “We cannot pay for this.” |
| logs_observability | They think logs already solve it | “LangSmith/logs are enough.” |
| no_ai_action | No real business action | “AI only drafts text.” |
| dashboard_dependency | Wants SaaS before pilot | “Call me when there is a dashboard.” |
| self_host | Wants private deployment | “We need self-host.” |
| offline_verifier | Wants verification without server | “Can we verify years later offline?” |
| certification | Wants formal certification | “Is this certified?” |

## Follow-up cadence

### First outreach

Goal: ask one concrete question, not explain everything.

Recommended structure:

1. One-line relevance to their activity.
2. One-line TimeProofs explanation.
3. One concrete workflow question.
4. Soft CTA.

### Follow-up 1 — after 3 to 5 business days

Goal: ask about one specific workflow.

### Follow-up 2 — after 7 to 10 business days

Goal: close the loop politely and ask whether the subject belongs to someone else.

### After serious reply

Respond within 24 hours. Ask for a 20-minute call or propose a pilot if the workflow is already clear.

## Segment-specific opening lines

### AI agency / no-code integrator

You build AI workflows for clients. TimeProofs adds a black box after important AI actions: one signed Action File per workflow action, with hash-only sealing by default. Would this be useful on one client workflow where AI creates a lead, ticket, email or document?

### Company using AI workflows

When AI creates or changes a business record, it can be hard to reconstruct what happened later. TimeProofs creates a signed Action File for important AI actions while keeping sensitive content in your environment. Do you already have AI workflows that create tickets, leads, emails, documents or CRM updates?

### Developer / AI builder

TimeProofs is a small traceability layer after AI tool calls: generate an Action File, hash the canonical payload, seal the hash, verify later. Would this be useful in one agent or workflow where AI calls an external API?

### Risk / legal / operations

Developer logs are useful, but they are not always readable as business evidence. TimeProofs creates a portable Action File showing what an AI action claimed to do, when it was sealed and how it can be verified. Is AI action traceability already a concern in your organization?

## Weekly review process

Every week, update:

- contacts sent by segment
- serious replies by segment
- qualified calls by segment
- paid pilots by segment
- top objections by segment
- top workflows requested
- pricing feedback
- product gaps
- decision risk

## Decision metrics dashboard

Use this simple dashboard during validation.

```text
Week:
Total contacts:
AI agencies / integrators:
Companies:
Developers / builders:
Risk / legal / ops:

Serious replies:
Qualified calls:
Paid pilots:
Strong equivalent proof:

Best segment:
Top workflow:
Top blocking objection:
Most repeated wording problem:
Next action:
```

## Stop rule

If after 50 contacts there are no paid pilots, no strong equivalent proof and no segment with clear willingness to pay, stop building product features and revisit:

- target segment
- problem framing
- demo clarity
- pilot offer
- pricing
- proof level language
- logs vs Action Files explanation

Do not continue into the full SaaS build without market evidence.
