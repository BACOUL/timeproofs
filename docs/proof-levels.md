# TimeProofs Action File Proof Levels

Status: normative design note for future TimeProofs Action File v1 work  
Scope: documentation only; no API, SDK, schema validator, verifier, generator, billing, dashboard, or website behavior changes  
Related docs: `docs/objects-model.md`, `docs/hash-model.md`

## Purpose

This document defines the proof levels for future TimeProofs Action File v1 work.

Proof levels help a reader understand how much evidence exists around an observable AI action. They do not turn a TimeProofs Action File into legal proof, regulatory certification, or proof that the AI was correct.

The goal is to avoid vague claims. A future Action File should clearly state whether an action was only declared, reported as executed by a workflow, confirmed by a target system reference, or externally verifiable against another independent record.

## Core Principle

A proof level describes the strength and source of evidence attached to an Action File.

It does not certify truth, correctness, legality, fairness, completeness, compliance, or business validity.

TimeProofs can help verify that a canonical Action File core matches a sealed fingerprint. The proof level explains what evidence the Action File claims to contain about the action itself.

## Allowed Proof Levels

Future Action File v1 work should use these proof levels:

```text
declared
executed
target_confirmed
externally_verifiable
```

These levels are ordered from weakest to strongest evidence, but even the strongest level has limits.

## Required Common Fields

Every Action File using a proof level should include enough common information to understand the recorded action.

Recommended common fields:

```text
format
action_id
created_at
actor
action.type
action.summary
action.status
proof_level
traceability
integrity.payload_hash
```

Future schemas may rename or structure these fields, but the meaning should remain stable.

## Level 1 — `declared`

### Definition

`declared` means the Action File declares that an AI-related action was recorded, but the file does not contain evidence that the workflow executed the action or that a target system confirmed it.

This is the weakest level. It is useful when the customer wants to record an intended, proposed, drafted, or manually declared AI action.

### Required Evidence

A `declared` Action File should include:

- action ID
- created timestamp
- actor or workflow identifier
- action type
- action summary
- declared status
- traceability notes or internal reference
- limitation note explaining that execution is not confirmed

### Optional Evidence

It may include:

- draft ID
- internal request ID
- prompt fingerprint
- output fingerprint
- workflow run ID if available but not sufficient to prove execution
- redaction notes
- local evidence pointer

### What It Proves

If sealed and valid, it can help show that:

- a specific Action File core existed at the sealing time
- the file declared a specific AI-related action record
- the file has not changed since the sealed fingerprint, subject to verification rules

### What It Does Not Prove

It does not prove that:

- the action was executed
- the target system accepted the action
- the AI was correct
- the content was true
- the action was lawful or compliant
- a human approved the action unless separate evidence is present

### Example Action Types

- `document.generated` where the document was drafted but not sent
- `request.classified` where classification was recorded without target confirmation
- `decision.recorded` where the decision is only declared in a local record
- `email.drafted` where an email draft was created but not sent

## Level 2 — `executed`

### Definition

`executed` means the workflow, automation, AI agent, or application reports that the action was executed, but the Action File does not include a target-system confirmation reference.

This level is stronger than `declared` because the system reports execution. It is weaker than `target_confirmed` because the receiving system has not provided an exploitable reference in the Action File.

### Required Evidence

An `executed` Action File should include:

- all common fields
- workflow or automation identifier
- execution timestamp or recorded execution timestamp
- execution status
- local workflow run reference or execution event reference
- limitation note explaining that target-system confirmation is not present

### Optional Evidence

It may include:

- workflow run ID
- local log reference
- job ID
- agent step ID
- queue event ID
- input fingerprint
- output fingerprint
- local execution receipt
- redaction note

### What It Proves

If sealed and valid, it can help show that:

- the Action File core existed at the sealing time
- the file reports an execution event from a workflow or agent
- the local execution reference has not changed inside the sealed core
- the file can support incident reconstruction with internal evidence

### What It Does Not Prove

It does not prove that:

- the target system accepted the action
- a CRM lead, support ticket, email, file, or record actually exists in the target system
- the AI was correct
- the output was complete or lawful
- the action satisfies a legal or regulatory requirement

### Example Action Types

- `crm.lead_created` where the workflow reports a create request but no CRM lead ID is present
- `email.sent` where the workflow reports send execution but no message ID is present
- `file.delivered` where a delivery job reports completion but no target file ID is present
- `support.ticket_created` where the workflow reports execution but no ticket ID is present

## Level 3 — `target_confirmed`

### Definition

`target_confirmed` means the Action File includes an exploitable confirmation reference returned by the target system after the action.

Examples include:

- `lead_id`
- `ticket_id`
- `message_id`
- `file_id`
- `record_id`
- `case_id`
- `delivery_id`
- `transaction_id` if appropriate and non-sensitive

This level is stronger because the Action File links the AI action to a target-system object or confirmation reference.

### Required Evidence

A `target_confirmed` Action File should include:

- all common fields
- target system name or identifier
- target object type
- target confirmation reference
- target confirmation timestamp if available
- action status returned or accepted by the target system
- evidence reference or fingerprint when appropriate

### Optional Evidence

It may include:

- target object URL or internal pointer
- target API response fingerprint
- target response code
- target response timestamp
- CRM/contact/ticket/file/message metadata fingerprint
- human review reference
- local storage pointer
- redaction notes

### What It Proves

If sealed and valid, it can help show that:

- the Action File core existed at the sealing time
- the file records a target confirmation reference
- the recorded target reference has not changed inside the sealed core
- the action can be traced to a target-system object if the company has access to that system

### What It Does Not Prove

It does not prove that:

- the target object still exists
- the target object was not changed after creation
- the target system reference is independently accessible to every verifier
- the AI was correct
- the action was lawful, compliant, fair, complete, or approved
- TimeProofs has verified the target system content

### Example Action Types

- `crm.lead_created` with a `lead_id`
- `support.ticket_created` with a `ticket_id`
- `email.sent` with a `message_id`
- `document.generated` with a `file_id`
- `crm.record_updated` with a `record_id`

## Level 4 — `externally_verifiable`

### Definition

`externally_verifiable` means the Action File includes enough information for the action or target confirmation to be checked against an external system or independent record, subject to access rights.

This is the strongest V1 proof level, but it is still not a legal guarantee.

External verification can depend on:

- public or partner-accessible record
- independently stored receipt
- third-party API reference
- externally issued message ID or delivery ID
- customer-owned archive accessible to the reviewer
- independent system logs controlled outside the AI workflow

### Required Evidence

An `externally_verifiable` Action File should include:

- all common fields
- target system identifier
- external verification method
- external reference ID or pointer
- verification access conditions
- timestamp or time range for the external record
- limitation note explaining access and interpretation limits

### Optional Evidence

It may include:

- public URL if safe
- partner portal reference
- third-party receipt fingerprint
- external audit log fingerprint
- API endpoint description without credentials
- external system response fingerprint
- archived evidence pointer
- independent reviewer notes

### What It Proves

If sealed and valid, it can help show that:

- the Action File core existed at the sealing time
- the file contains a reference intended for independent or external verification
- the sealed core has not changed
- a reviewer may be able to compare the Action File reference with an independent system or record

### What It Does Not Prove

It does not prove that:

- every verifier has access to the external system
- the external system is correct
- the external record has not changed unless separately protected
- the AI was correct
- the action was lawful, compliant, fair, or complete
- legal acceptance is guaranteed

### Example Action Types

- `email.sent` with an externally checkable message or delivery reference
- `file.delivered` with a third-party delivery or storage confirmation
- `document.generated` with a public or partner-accessible file record
- `decision.recorded` with an independently archived decision register reference
- `crm.record_updated` with a third-party audit trail reference

## Summary Table

| Proof level | Evidence strength | Typical evidence | Main limit |
| --- | --- | --- | --- |
| `declared` | Low | Declaration, local note, draft, internal reference | Execution not confirmed |
| `executed` | Medium | Workflow run, execution log, job ID | Target system did not confirm |
| `target_confirmed` | High | Lead ID, ticket ID, message ID, file ID, record ID | Target content is not independently verified by TimeProofs |
| `externally_verifiable` | Highest V1 level | External reference, third-party receipt, independent record | Access and legal interpretation are still outside TimeProofs |

## Status Values And Proof Levels

Proof level and action status are related but different.

A future Action File may use statuses such as:

```text
declared
executed
target_confirmed
failed
partial
cancelled
```

The `proof_level` describes the evidence level. The `status` describes the reported action outcome.

Examples:

- `proof_level: declared`, `status: declared`
- `proof_level: executed`, `status: executed`
- `proof_level: target_confirmed`, `status: target_confirmed`
- `proof_level: executed`, `status: failed`
- `proof_level: target_confirmed`, `status: partial`

A failed or partial action can still have an Action File if the failure or partial execution is important for incident reconstruction.

## Recommended Evidence Object

Future schemas may use a structured evidence object. Example only:

```json
{
  "proof_level": "target_confirmed",
  "evidence": {
    "target_system": "example_crm",
    "target_object_type": "lead",
    "target_reference": "lead_123456",
    "target_confirmed_at": "2026-06-16T17:00:00Z",
    "response_fingerprint": "sha256:<hex>",
    "limitations": [
      "Target reference is controlled by the customer system.",
      "TimeProofs does not verify the CRM content."
    ]
  }
}
```

This example must remain synthetic. It must not contain real customer data.

## Privacy Rules

Proof levels must not encourage users to send sensitive content to TimeProofs.

For all proof levels:

- use fingerprints for prompts, outputs, documents, API responses, or message bodies when possible
- avoid raw personal data in public examples
- keep sensitive content in customer-owned storage
- send only the canonical payload hash to TimeProofs by default
- use redaction notes and evidence references instead of raw content when appropriate

## Verification Wording

A verifier or UI should avoid vague labels like `proven` or `legally verified`.

Preferred labels:

- `Action File integrity verified`
- `Seal valid`
- `Payload hash matches`
- `Target reference present`
- `External verification reference present`

Avoid labels:

- `AI action legally proven`
- `Compliant`
- `Court-ready`
- `Certified by TimeProofs`
- `Truth verified`

## Backward Compatibility

This document does not modify existing v0.2 behavior.

Existing `.tproof.json` Proof Bundles remain valid.

Existing routes remain unchanged:

- `POST /api/timestamp`
- `POST /api/verify`

Future `.action.json` support must be additive and must not break current proof-bundle verification.

## Non-Goals

This document does not:

- create the full `.action.json` schema
- implement validation
- implement proof-level enforcement
- implement `/api/seal`
- implement `/api/verify-seal`
- modify `verify.html`
- modify SDK helpers
- modify API behavior
- modify OpenAPI
- create a dashboard
- create billing
- create legal certification
- claim regulatory compliance

## Next Step

After proof levels are accepted, the next safe step is to create the Action File v1 specification and schema, using `docs/objects-model.md`, `docs/hash-model.md`, and this document as the foundation.
