# TimeProofs Sales — Outreach Message Pack

Phase: G — market validation  
Campaign: 50 multisegment contacts  
Goal: serious replies, qualified calls and paid pilots before building the full SaaS

## Core rule

Do not sell TimeProofs as broad compliance software.

Sell one concrete idea:

> When AI performs an important business action, TimeProofs creates a portable, signed and verifiable Action File. The company keeps the file. TimeProofs seals the fingerprint.

Every message must preserve these limits:

- TimeProofs does not prove that the AI was correct.
- TimeProofs does not guarantee legal validity.
- TimeProofs does not replace logs.
- TimeProofs does not require uploading sensitive content by default.
- The first step is a narrow pilot, not a full SaaS rollout.

## Universal short pitch

TimeProofs is a black box for AI actions.

When an AI workflow creates a lead, ticket, email, document, CRM update or other business record, TimeProofs can generate a clear Action File, seal its fingerprint, and make it verifiable later.

The company keeps the Action File and original evidence. TimeProofs seals only hashes by default.

## Universal one-line explanation

TimeProofs creates a signed, verifiable Action File after important AI actions, so teams can reconstruct what happened without relying only on developer logs.

## Segment 1 — AI agencies / no-code integrators

### LinkedIn connection note

Hi {{first_name}}, I saw that you build AI automations for clients. I am validating TimeProofs, a black box for AI workflows: one signed Action File after important AI actions. Curious if this could fit one Make/n8n/Zapier client workflow.

### First message — direct

Hi {{first_name}},

You build AI workflows for clients, so I wanted your honest view.

TimeProofs adds a black box after important AI actions: when an AI workflow creates a lead, opens a ticket, sends an email or generates a document, it can create a signed Action File that the client keeps and can verify later.

The default model is privacy-first: TimeProofs seals the fingerprint, not the raw client content.

Would this be useful as a small paid add-on for one of your client AI workflows?

### First message — softer

Hi {{first_name}},

I am validating a product for AI agencies and automation builders.

The idea is simple: when an AI workflow performs a visible business action, TimeProofs creates a portable Action File that explains what happened and seals its fingerprint for later verification.

It does not replace logs and it does not claim the AI was correct. It gives the client a clearer traceability artifact.

Do you currently have client workflows where AI creates tickets, leads, emails, documents or CRM updates?

### Follow-up 1

Hi {{first_name}}, quick follow-up.

The most obvious use case seems to be: AI creates a CRM lead or support ticket → TimeProofs creates one Action File → the client can verify later what was recorded.

Do you see this as something an agency could sell as part of an AI workflow delivery, or would it feel too early for clients?

### Follow-up 2

Hi {{first_name}}, I will close the loop after this.

I am trying to understand if AI traceability is already a real client need for agencies, or still too early.

Your answer can be very short: useful now / maybe later / not useful.

### Call CTA

Would you be open to a 20-minute call? I would like to test the idea against one real client workflow and see if a paid pilot around an Action File makes sense.

### Pilot CTA

The simplest pilot would be one workflow only:

- map one AI action
- generate one Action File example
- seal the payload hash
- verify the Seal
- give you a client-facing explanation

Would you test that as a small paid pilot?

## Segment 2 — Companies using AI workflows

### LinkedIn connection note

Hi {{first_name}}, I am validating TimeProofs, a black box for AI actions. It creates a signed Action File when AI creates or changes a business record. I would be interested in your view if your team already uses AI workflows.

### First message — direct

Hi {{first_name}},

I am validating TimeProofs for companies already using AI in operations.

The problem: when an AI workflow creates a ticket, lead, email, document or CRM update, it can be hard to reconstruct later what happened in business-readable terms.

TimeProofs creates a signed Action File for the action. Your company keeps the file and original evidence. TimeProofs seals only the fingerprint by default.

Do you already have AI workflows that create, send, update, classify or route business records?

### First message — operational risk angle

Hi {{first_name}},

Quick question: if an AI workflow in your company creates or changes a business record and someone later disputes it, who can reconstruct what happened?

TimeProofs is a black box for AI actions. It creates a portable Action File after important AI actions, then seals the fingerprint so the file can be verified later.

It does not replace technical logs. It gives operations, management or risk teams a clearer artifact.

Is this already a concern for your team, or still too early?

### Follow-up 1

Hi {{first_name}}, quick follow-up.

The use case I am testing is very narrow: one AI action, one Action File, one Seal, one verification.

Examples: support ticket created, CRM lead created, customer email sent, document generated.

Is there one AI workflow in your company where this kind of traceability would be useful?

### Follow-up 2

Hi {{first_name}}, I will not insist after this.

I am trying to learn whether AI action traceability is already a buying need for companies or only a future concern.

Is your answer closer to: useful now / interesting later / not relevant?

### Call CTA

Would a 20-minute call make sense? I only want to map one workflow and understand if an Action File would solve a real traceability problem.

### Pilot CTA

A narrow pilot could be done on one workflow only, without a full SaaS deployment:

- one AI action mapped
- one Action File template
- one sealed fingerprint
- one verification walkthrough
- one incident reconstruction example

Would that be worth testing?

## Segment 3 — Developers / AI builders

### LinkedIn / community note

Hi {{first_name}}, I am validating TimeProofs for AI builders. It is a small traceability layer after AI tool calls: build Action File → hash canonical payload → seal hash → verify later. Curious if this would fit one of your agent/workflow projects.

### First message — technical

Hi {{first_name}},

I am validating a developer-facing idea called TimeProofs.

It is a traceability layer after AI tool calls:

1. AI calls a tool or external API.
2. The target system confirms the action.
3. Your app builds a business-readable Action File.
4. You hash the canonical payload locally.
5. TimeProofs seals the hash.
6. The Action File can be verified later.

The goal is not observability or debugging. It is a portable record of what an AI action claimed to do.

Would this be useful in one of your AI workflows?

### First message — builder pain angle

Hi {{first_name}},

When your AI agent calls tools or writes to external systems, do you currently keep a portable proof of what happened?

TimeProofs lets you create a small Action File after the action, hash the canonical payload, seal the hash, and verify it later.

No raw prompts or outputs need to be uploaded by default.

Does this solve a real problem for builders, or would regular logs be enough for you?

### Follow-up 1

Quick follow-up, {{first_name}}.

The strongest developer use case seems to be after a tool call: ticket created, lead created, document generated, CRM record updated.

The API flow is intentionally small: `POST /api/seal`, then `GET/POST /api/verify-seal`.

Would you want this as a small API/SDK, or is the need not strong enough?

### Follow-up 2

Last follow-up from me.

I am trying to learn whether developers would integrate an Action File + Seal step after AI tool calls, or whether this only becomes useful when buyers ask for it.

Which is closer: useful now / only if a client asks / not useful?

### Call CTA

Would you be open to a short technical call? I want to test if the canonical payload hash and Seal flow are clear enough for builders.

### Pilot CTA

A technical pilot could be one tool call only:

- choose one AI action
- create one `.action.json`
- hash canonical payload
- call `/api/seal`
- verify with `/api/verify-seal`

Would you test that?

## Segment 4 — Risk / legal / compliance / operations

### LinkedIn note

Hi {{first_name}}, I am validating TimeProofs, a black box for AI actions. It creates a signed, verifiable Action File for important AI actions, so teams can reconstruct what happened beyond developer logs.

### First message — governance

Hi {{first_name}},

I am validating TimeProofs for AI governance and operational traceability.

Developer logs are useful, but they are often not readable as business evidence by operations, risk, legal or management teams.

TimeProofs creates a portable Action File after important AI actions, then seals the fingerprint so the file can be verified later. The company keeps the Action File and original evidence.

This does not prove the AI was correct and does not guarantee legal validity. It helps reconstruct what happened.

Is AI action traceability already a concern in your organization?

### First message — incident reconstruction

Hi {{first_name}},

Quick question: if an AI workflow creates a ticket, sends an email, updates a CRM record or generates a document, what does your organization keep to reconstruct that action later?

TimeProofs creates a signed Action File after the action and seals its fingerprint. It is designed to complement logs with a business-readable artifact.

Would this be relevant for risk, legal, compliance or operations teams?

### Follow-up 1

Hi {{first_name}}, quick follow-up.

I am not positioning this as legal certification. The narrower question is: would a signed Action File help teams reconstruct important AI actions without relying only on developer logs?

Is that a real governance need yet?

### Follow-up 2

Hi {{first_name}}, I will close the loop.

For AI governance, is the priority today more about policies and model risk, or do you already see a need to trace individual AI actions?

A one-line answer would be very useful.

### Call CTA

Would a 20-minute call make sense? I would like to understand whether a portable Action File is useful for incident review, internal audit or operational traceability.

### Pilot CTA

A pilot would stay narrow:

- one AI action workflow
- one Action File template
- proof level language
- verification walkthrough
- limitation note for non-technical stakeholders

Would that be worth testing internally?

## Replies to common objections

### “Logs already solve this.”

Technical logs are useful and TimeProofs does not replace them.

The difference is that TimeProofs creates a portable business artifact: an Action File that can be kept, shared internally and verified later. It is meant for operations, management, legal, clients or auditors who may not read developer logs.

### “This sounds like legal proof.”

That is not the claim.

TimeProofs can help show that a specific Action File fingerprint was sealed at a specific time. It does not prove the AI was correct, does not certify the underlying action, and does not guarantee legal validity.

### “We do not want to upload sensitive data.”

That is the default design.

TimeProofs seals hashes and fingerprints. The company keeps the Action File and the original evidence in its own environment. Raw prompts, outputs, files, credentials and sensitive client data should not be sent by default.

### “We need a dashboard first.”

A dashboard may come later, but the current validation is narrower.

The first pilot only needs one workflow, one Action File, one Seal and one verification. The goal is to prove value before building a full SaaS platform.

### “AI does not take real actions for us.”

Then TimeProofs may not be urgent yet.

It becomes more useful when AI creates, updates, sends, classifies, routes or generates business records that someone may need to reconstruct later.

### “Who is the buyer?”

That is part of the validation.

Possible buyers are AI agencies selling workflow reliability, companies using AI in operations, developers building agentic workflows, or risk/ops/legal teams responsible for incident reconstruction.

### “Can we verify offline?”

The intended direction is independent verification through public keys and portable Action Files. For the current pilot, the important point is to validate the workflow value first, then define the exact verification requirement for the segment that shows willingness to pay.

## Positive reply response templates

### If prospect says “interesting”

Thanks. To make this concrete: which AI workflow would be the best test?

Examples:

- AI creates a CRM lead
- AI opens a support ticket
- AI sends or drafts a client email
- AI generates a document
- AI updates a record

The goal would be one Action File for one action, not a full platform rollout.

### If prospect asks for price

For validation, I am keeping the pilot narrow.

Simple pilot: 299 EUR  
Deeper workflow pilot: 499 EUR  
Custom if the workflow is more complex or enterprise-specific.

The pilot covers one workflow, one Action File pattern, one sealed fingerprint and one verification walkthrough.

### If prospect asks for demo

Yes. The demo shows an AI action being simulated, an Action File being created, a hash being sealed, and the verification logic.

The useful next step is to compare it with one real workflow you already deliver or use.

### If prospect asks for technical details

The V1 technical flow is:

1. Build `.action.json` after the AI action.
2. Remove Seal/hash fields before hashing.
3. Canonicalize the payload.
4. Compute SHA-256 locally.
5. Send only the hash to `/api/seal`.
6. Verify later with `/api/verify-seal`.

Docs are in `docs.html` and `openapi.yaml`.

### If prospect says “not now”

Understood. Before I close the loop, is it because:

1. AI does not take operational actions yet,
2. logs are enough,
3. the buyer is unclear,
4. budget is not available,
5. or the product needs to be more mature?

This helps me avoid building the wrong thing.

## Short email subject lines

- Black box for AI workflows
- Traceability for AI actions
- One Action File after each AI action
- Question about AI workflow traceability
- Can your AI workflows prove what happened?
- For your Make/n8n AI automations
- After AI creates a lead or ticket
- Portable evidence for AI actions

## Follow-up close line

I will close the loop here. I am validating whether this is a real paid need now or a future nice-to-have. A simple “useful now / later / not relevant” is enough.
