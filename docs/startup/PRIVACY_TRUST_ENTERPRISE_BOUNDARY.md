# TimeProofs — Privacy, Trust & Enterprise Boundary

Status: CANONICAL PRE-PAID BASELINE

## Privacy lifecycle

Default is local-first and data-minimizing.

For any future managed surface document and enforce:
- data collected and purpose;
- transport protection;
- storage/encryption boundary;
- tenant isolation;
- retention period;
- log redaction;
- support-access controls;
- export/deletion process;
- backup retention/deletion behavior;
- subprocessors;
- residency options only when demanded.

Do not retain raw payment/order payloads merely to create a data moat.

## Trust package before paid production

Prepare one coherent customer-facing trust package containing:
- architecture/trust-boundary overview;
- security model and non-claims;
- data flow and retention summary;
- vulnerability disclosure/management process;
- release/supply-chain controls;
- incident communication policy;
- subprocessor list when applicable;
- DPA/privacy role position;
- standard security questionnaire answers where repeatable;
- pentest/audit posture when justified by customer/revenue stage.

Do not claim SOC 2/ISO certification unless actually obtained.

## Abuse/adversarial customer model

Protect against:
- oversized/deep/cyclic/malformed payloads;
- attempts to leak secrets via error/log fields;
- excessive RESOLVE polling/cost amplification;
- tenant/project identifier spoofing;
- metering/idempotency bypass;
- replay storms;
- hostile third-party packs;
- resource exhaustion and queue starvation;
- abuse of explicit fail-open configuration.

Managed service must have quotas/rate/cost controls before public untrusted usage.

## Enterprise procurement boundary

Potential enterprise capabilities: SSO/SAML, RBAC, audit logs, PO/invoice, private packs, deployment controls, private networking/on-prem only where repeatable economics support it.

Refuse by default:
- customer-specific forks with no reusable product path;
- unlimited bespoke integrations bundled into subscription;
- contractual guarantees beyond evidence actually checked;
- unsupported 24/7 SLA at low ACV;
- broad compliance consulting;
- taking custody of customer funds/side effects.

Enterprise features must increase reusable product value rather than create a services company.

## Liability baseline

Before paid production, legal terms must define:
- TimeProofs evaluates evidence/invariants; caller executes the side effect;
- evidence scope and known limitations;
- explicit customer responsibility for fail-open overrides;
- limitation of liability and warranty/disclaimer position;
- privacy/DPA roles;
- incident notification commitments actually supportable;
- no representation of legal/regulatory compliance unless separately scoped.
