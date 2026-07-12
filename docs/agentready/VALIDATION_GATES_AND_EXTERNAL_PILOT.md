# AgentReady Validation Gates And External Pilot

Status: ACTIVE SPECIALIZED SPECIFICATION

Authority: `AGENTREADY_MASTER_PLAN.md`.

Decision: `DL-2026-07-12-VALIDATION-GATES`.

## Purpose

This specification increases the probability of product success without changing the approved product direction.

AgentReady remains a static, shift-left CI gate for agent-facing OpenAPI and MCP contracts. This document strengthens evidence, distribution, differentiation and decision gates. It does not authorize a runtime firewall, live API execution, live MCP execution, a hosted contract scanner, silent telemetry or a new proof-of-existence product.

## Non-Negotiable Sequence

```txt
Community distribution
-> public installation validation
-> three-minute onboarding
-> external pilot preparation
-> external pilot and measured benchmark
-> explicit continue/correct/pause/pivot/reject decision
-> Pro technical implementation
-> ten-user and payment-signal gate
-> licensing, Stripe and account infrastructure
-> first external Pro sale
-> global launch
```

The existing next action remains `ARB-COM-002`.

## Community Distribution Strengthening

### Public GitHub Action

The public Action distribution work must include:

- a copyable workflow using a public distribution path;
- immutable version pinning documentation using a release tag and full commit SHA;
- minimum GitHub permissions;
- Action input and output documentation;
- supply-chain and provenance documentation;
- dependency, secret and code-scanning checks where supported;
- a revocation and replacement procedure for a compromised release;
- factual Marketplace wording that does not imply GitHub security validation.

### Immediate Public-Site Alignment

The Community distribution batch must also remove contradictory commercial messaging from the current public site.

Before broad Community promotion, public pages must:

- stop presenting manual review or Fix Pack offers as the active model;
- stop presenting email payment or mandatory contact as the Community/Pro purchase path;
- state that Community is available free of charge;
- state that Pro is in preparation until its functions are implemented;
- expose the official npm installation command;
- expose the GitHub Action installation path when public;
- retain the static-analysis and non-guarantee limitations.

This is a small alignment correction inside the distribution boundary, not the later complete commercial-site build.

## Public Installation Validation

Validation must use clean external-style environments and record evidence for:

- Linux, macOS and Windows;
- every officially supported Node.js major version;
- public and private repositories where practical;
- paths containing spaces;
- monorepositories;
- one and multiple OpenAPI or MCP inputs;
- invalid input;
- large input within documented limits;
- PASS and FAIL behavior;
- exit codes and generated report paths;
- operation without a TimeProofs backend;
- Action installation from outside the TimeProofs repository.

Failures must be recorded honestly. Unsupported cases must be documented instead of hidden.

## Three-Minute Onboarding Validation

The official onboarding flow is:

```txt
discover
-> run locally
-> initialize CI
-> commit
-> first successful GitHub run
```

The flow must be timed from a clean environment. It must not require signup, a card, a token, contract upload or a global installation.

The tutorial must use one canonical path, a working demo fixture, actionable errors and a visible rollback or cleanup instruction.

## External Community Pilot

### Codex Preparation Batch

One additional Codex batch prepares:

- a tester guide;
- an evidence registry;
- a false-positive and false-negative register;
- an abandonment-reason register;
- a feature-request register;
- a reusable before/fix/after case template;
- a consent and confidentiality checklist;
- an outreach candidate worksheet;
- a voluntary feedback path with preview, redaction and explicit consent.

Codex does not invent users, testimonials, findings or payment signals and does not contact projects automatically.

### Human Pilot Threshold

Before Pro implementation is authorized, the pilot must establish at least:

- five distinct external Community users;
- three real external repositories or contract surfaces;
- one real OpenAPI use;
- one real MCP use;
- two measurable return or reuse signals within 30 days where the observation window permits;
- one useful real issue detected and corrected;
- recorded false positives, false negatives, abandonment reasons and feature requests;
- one explicit signal describing a function for which an external user may pay.

Project-owned accounts, fixtures, automated installs and TimeProofs repository runs do not count.

If the 30-day observation window has not elapsed, the decision must remain pending rather than treating missing evidence as reuse.

## Benchmark And Differentiation

The benchmark must measure scientific engine quality and product differentiation.

The reproducible report must include:

- precision and recall by rule;
- false-positive and false-negative rates;
- performance and reproducibility;
- ambiguous-case behavior;
- comparison against schema validation and representative general OpenAPI linting baselines;
- a factual explanation of agent-specific risks detected by AgentReady;
- an MCP coverage matrix with detected, partially detectable and statically non-detectable risks;
- explicit limitations and complementary runtime-control categories;
- relevant external-pilot findings without confidential data.

Public competitor claims require current external verification and legal review. Absence of a finding by another tool must never be claimed without reproducible evidence.

## Gate Before Pro Technical Implementation

After pilot evidence and the benchmark report, the owner records exactly one outcome:

- `CONTINUE`;
- `CORRECT`;
- `PAUSE`;
- `PIVOT`;
- `REJECT`.

`CONTINUE` is required before the first Pro implementation batch. A `CORRECT` outcome creates bounded correction work through change control. The other outcomes stop automatic execution of Pro batches.

## Gate Before Licensing Stripe And Accounts

Licensing, billing, Stripe, account and transactional-email implementation must not begin until all of the following are evidenced:

- ten external Community users on real contracts or repositories;
- three explicit Pro payment signals after the real price and implemented scope are presented;
- one credible external value case based on a real issue and fix;
- benchmark and differentiation evidence accepted;
- an owner decision authorizing commercial infrastructure work.

This gate does not require the first Pro sale, because the controlled purchase system is needed to complete that sale.

## Dynamic Analysis Boundary

Dynamic execution is not an immediate success requirement and is not part of Community or Pro V0.1.

A dynamic scanner, runtime guardrail or live tool execution may be evaluated only after real revenue and repeated external demand. The first preference is integration with complementary runtime products. Any dynamic expansion requires a dedicated decision, threat model, legal review, isolation design and separate execution plan.

## Acquisition Execution

After Community is usable, the owner-led pilot should:

- identify approximately thirty relevant public OpenAPI or MCP projects;
- select a small number for careful manual outreach;
- provide useful project-specific evidence rather than bulk promotional messages;
- target five thoughtful contacts per week when suitable projects exist;
- record installation, first scan, reuse, findings, false positives and abandonment;
- request publication permission before using any quote or case.

Bulk automated pull requests, spam and invented social proof remain forbidden.

## Safety And Anti-Drift

This specification must not:

- change completed publication evidence;
- move or replace `v0.1.0-alpha.0`;
- authorize a new npm operation;
- change the Community/Pro feature boundary;
- place CI blocking behind Pro;
- authorize Stripe production payments;
- present Pro as available before implementation;
- create certification or guaranteed-safety claims.
