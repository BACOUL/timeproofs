# TimeProofs Roadmap

Status: safe execution path for TimeProofs V1
Product source of truth: `PRODUCT_STRATEGY.md`
Last updated: 2026-06-15

## North Star

**TimeProofs = la boîte noire des actions IA.**

TimeProofs V1 should become the privacy-first black box for observable AI actions. Each important AI action should produce a clear, signed and verifiable Action File. The company keeps that file wherever it wants. TimeProofs seals only the file fingerprint, not sensitive content.

## Roadmap Principles

- Strategy first, then technical foundations, then product implementation, then demo and sales validation.
- Preserve the hash-only privacy model by default.
- Do not send sensitive action content to TimeProofs by default.
- Do not replace technical logs; reference them when useful.
- Do not promise absolute legal proof or full compliance.
- Keep each PR focused on one objective.
- Avoid dashboard work until Action File V1 is validated.
- Avoid website repositioning until the product source of truth is accepted.
- Avoid API or SDK behavior changes until they are explicitly scoped and tested.

## Current Direction

The previous broad positioning around general proof of existence should now be narrowed for V1. The first sellable product is **TimeProofs Action File v1**: a customer-owned traceability file for one observable AI action, sealed through a TimeProofs fingerprint receipt.

This roadmap is intentionally conservative. It protects the privacy-first model, keeps the existing stack stable, and creates a path from positioning to a sellable product without rebuilding the product around a dashboard.

## P001 - Product Strategy

Status: this PR

Objective: lock the product source of truth before changing the website or product code.

Deliverables:

- Add `PRODUCT_STRATEGY.md`.
- Align `ROADMAP.md` with the new V1 positioning.
- Record what TimeProofs proves and what it does not prove.
- Record the privacy model and Action File V1 direction.

Out of scope:

- Website changes.
- API behavior changes.
- SDK behavior changes.
- Dashboard work.
- Stack rebuilds.
- Legal or compliance claims.

Exit criteria:

- The positioning is clear enough to guide future copy and product decisions.
- The roadmap makes the safe execution order explicit.
- The PR contains only strategy and roadmap documentation.

## P002 - Technical Foundations

Objective: map the current TimeProofs primitives to the Action File V1 product without breaking existing behavior.

Planned work:

- Audit the existing timestamp and verification flows.
- Document which existing primitives already support fingerprint sealing.
- Define the Action File V1 schema as a product and technical specification.
- Define local hashing guidance for Action Files.
- Define receipt fields and verification requirements.
- Define how customer-owned files reference technical logs without replacing them.
- Add focused tests before any behavior change.
- Confirm that sensitive action content is not sent to TimeProofs by default.

Out of scope:

- Dashboard.
- Billing.
- Broad compliance framework.
- Breaking API changes.
- Breaking SDK changes.

Exit criteria:

- The team knows whether Action File V1 can use existing endpoints as-is or needs additive changes.
- Any proposed API or SDK change has a narrow specification and test plan.
- The privacy boundary is explicit and testable.

## P003 - Action File V1

Objective: create the first sellable product surface.

Planned work:

- Publish the Action File V1 format.
- Provide safe example Action Files with redacted or synthetic content.
- Provide a generate, hash, seal, and verify workflow.
- Provide integration guidance for AI agents, workflows, and automation tools.
- Provide a verification recipe that works for a customer-owned file.
- Keep TimeProofs focused on sealing the fingerprint and returning a signed receipt.

Out of scope:

- Dashboard.
- Full customer portal.
- Legal certification.
- Compliance certification.
- Raw sensitive action storage by TimeProofs.

Exit criteria:

- A developer can create an Action File for one observable AI action.
- The developer can hash it locally.
- TimeProofs can seal the fingerprint.
- A third party with the file can verify that the file matches the sealed fingerprint.
- The flow is understandable to a non-engineering buyer.

## P004 - Demo And Sales Validation

Objective: validate that buyers understand and value TimeProofs Action File v1 before expanding the product.

Planned work:

- Build a narrow demo around one observable AI action.
- Show the sequence: AI action, Action File, local hash, TimeProofs seal, verification.
- Create sales discovery notes based on the product truth.
- Test the message with early buyers and integrators.
- Collect objections around privacy, logs, legal expectations, verification, and storage.
- Decide what must change before productizing further.

Out of scope:

- Full dashboard.
- Broad marketing site rewrite before validation.
- Compliance promises.
- Enterprise platform rebuild.

Exit criteria:

- The demo proves the core workflow.
- Sales conversations confirm or reject the Action File V1 value proposition.
- Next product work is based on buyer feedback, not assumptions.

## Later Candidates

These should only happen after the previous phases justify them:

- Website repositioning based on `PRODUCT_STRATEGY.md`.
- Additive API improvements for Action File workflows.
- Additive SDK helpers for local Action File generation, hashing, and verification.
- Optional PDF or human-readable export of an Action File.
- Customer evidence storage integrations.
- Dashboard or team workspace only if repeated customer demand proves it is necessary.
- Legal review of claims and language before any regulated-market messaging.

## Decision Log

- Narrow V1 from broad proof-of-existence messaging to AI action traceability.
- Make **TimeProofs Action File v1** the first sellable product.
- Preserve the privacy-first hash-only principle.
- Keep sensitive action content outside TimeProofs by default.
- Treat technical logs as complementary evidence, not something TimeProofs replaces.
- Avoid absolute legal proof claims and unsupported compliance claims.
- Keep strategy, technical foundations, product implementation, and demo validation in separate PRs.
