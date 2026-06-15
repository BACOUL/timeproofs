# TimeProofs Product Strategy

Status: product source of truth for TimeProofs V1
Scope: positioning and commercial direction before website or product code changes
Last updated: 2026-06-15

## Core Positioning

**TimeProofs = the black box for AI actions.**

TimeProofs is the privacy-first traceability layer for observable actions performed by AI systems, agents, and automations. Each observable AI action creates a clear, signed and verifiable AI Action File. The company keeps that file wherever it wants. TimeProofs seals the file fingerprint, not sensitive content.

The V1 product is not a generic proof-of-existence platform for every possible digital object. It is focused on one urgent operational need: helping teams keep verifiable evidence of important AI actions without sending their sensitive action content to TimeProofs by default.

## The Problem

AI systems are starting to take actions that affect customers, internal operations, data workflows, support decisions, documents, and business processes. When a question appears later, teams need to answer simple questions:

- What action happened?
- Which AI system or workflow produced it?
- When was the action recorded?
- What local evidence explains the action?
- Can the AI Action File be checked for later modification?

Traditional technical logs are useful, but they are often fragmented, hard to share, hard to read outside engineering, and not designed as customer-owned traceability records. TimeProofs does not replace those logs. It creates a separate AI Action File that can reference technical evidence while remaining portable and verifiable.

## Product Truths To Preserve

- TimeProofs is the black box for AI actions.
- Each observable AI action should produce a clear, signed and verifiable AI Action File.
- The customer keeps the AI Action File in its own storage, systems, evidence repository, document vault, ticket, CRM, data lake, or legal archive.
- TimeProofs receives and seals only the cryptographic fingerprint of the file by default.
- TimeProofs must not receive sensitive action content by default.
- TimeProofs does not replace application logs, security logs, model logs, audit logs, or incident logs.
- TimeProofs does not promise absolute legal proof.
- TimeProofs does not promise full compliance with any regulation.
- The first sellable product is **TimeProofs Action File v1**.

## What TimeProofs Proves

TimeProofs can prove a narrow, useful fact:

- At a specific timestamp, TimeProofs received a cryptographic fingerprint for an AI Action File.
- TimeProofs signed a receipt for that fingerprint and timestamp.
- Later, anyone who has the file can recompute the fingerprint and verify that it matches the sealed fingerprint.
- If the file changes, the fingerprint changes, so the sealed proof no longer matches the modified file.

This creates evidence of file integrity and existence at a point in time. It helps a company show that an AI Action File existed in a given form when it was sealed.

## What TimeProofs Does Not Prove

TimeProofs must be precise about its limits. It does not prove that:

- The AI action was correct, fair, lawful, complete, or compliant.
- The file content is true.
- The file contains all relevant context.
- The underlying AI system behaved correctly.
- The person, company, or system named in the file is authenticated unless the customer adds its own identity and signature process.
- The full chain of custody is complete.
- A court, regulator, customer, insurer, auditor, or partner will accept the file as sufficient proof.
- Technical logs are unnecessary.

TimeProofs provides verifiable traceability evidence. It does not provide legal advice, regulatory certification, or a complete compliance system.

## Privacy Model

The privacy model is hash-only by default.

1. The customer creates the AI Action File in its own environment.
2. The customer stores the file wherever it chooses.
3. The customer computes the file fingerprint locally.
4. TimeProofs receives the fingerprint and minimal metadata required for sealing.
5. TimeProofs returns a signed receipt for the fingerprint and timestamp.
6. Verification only requires the original file, the sealed fingerprint, the timestamp, and the receipt.

Sensitive prompts, outputs, documents, user data, business data, personal data, customer names, internal notes, and decision details should stay outside TimeProofs by default. Customers can decide what their local AI Action File contains, but the service boundary remains the fingerprint.

## TimeProofs Action File v1

**TimeProofs Action File v1** is the first sellable product.

It is an AI Action File: a portable traceability file for one observable AI action. It should be human-readable enough for operations, support, risk, sales, and leadership teams, while structured enough for developers to generate and verify automatically.

A V1 AI Action File should answer:

- What action was recorded?
- When did the action occur or get recorded?
- Which AI system, agent, workflow, or automation was involved?
- What local evidence or technical logs can support the action record?
- What data was intentionally excluded or redacted?
- What fingerprint did TimeProofs seal?
- What receipt proves the fingerprint was sealed?

The AI Action File can include local customer signatures, internal IDs, references to logs, references to tickets, model or agent identifiers, redaction notes, and operational context. TimeProofs signs the sealing receipt for the fingerprint; it does not need to read the file content.

## V1 Product Boundaries

For V1, the product should stay deliberately small:

- Define the AI Action File format.
- Define the local hashing and verification workflow.
- Use the existing TimeProofs sealing and verification primitives where possible.
- Provide examples that contain no sensitive customer content.
- Provide integration guidance for AI agents and workflow tools.
- Validate sales interest before building a dashboard.

V1 should not introduce a dashboard, rebuild the stack, change existing API behavior, or change existing SDK behavior until the technical foundation work explicitly scopes and tests those changes.

## Commercial Direction

TimeProofs should be sold as operational traceability for AI actions, not as a broad legal-proof or compliance product.

Primary commercial messages:

- Create a verifiable black box for AI actions.
- Keep sensitive action content in your own systems.
- Seal only the fingerprint.
- Produce a portable AI Action File for customers, partners, support, risk review, and internal accountability.
- Reconstruct what happened without depending only on scattered technical logs.

Likely early buyers and users:

- AI product teams that need customer-trust evidence for important actions.
- Automation agencies deploying agents for clients.
- SaaS teams adding AI workflows to customer operations.
- Support, risk, and operations teams that need readable evidence without exposing sensitive content.
- Regulated-adjacent companies that need better internal traceability before seeking formal legal or compliance review.

The first sales validation should focus on whether buyers understand and value the AI Action File, not whether they want a full dashboard or a broad compliance platform.

## Messaging Rules

Use:

- Black box for AI actions.
- AI Action File.
- Signed and verifiable fingerprint receipt.
- Customer-owned evidence file.
- Hash-only by default.
- Helps reconstruct what happened.

Avoid:

- Absolute legal proof.
- Full compliance.
- Court-ready proof without qualification.
- Replaces logs.
- Stores your AI actions.
- Universal proof layer for everything.
- Certification claims not backed by review.

## Execution Rule

One PR should have one objective. This source-of-truth PR only locks positioning and roadmap direction. Website copy, API behavior, SDK behavior, dashboard work, and demo implementation should come in later PRs after this product truth is accepted.
