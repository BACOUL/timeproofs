# TimeProofs — Company Gap Register

Status: CANONICAL ANTI-OMISSION REGISTER
Date: 2026-08-13

Purpose: ensure no critical company, product, operational or commercial layer disappears between chats, milestones or implementation work.

## Status model

- NOW — must be designed before the current dependent launch/runtime step.
- M8 — required for local runtime enforcement closure.
- M9 — required before public relaunch.
- PAID — required before paid production customers.
- ENTERPRISE — required before serious enterprise procurement/SLA.
- M10/SCALE — required only once managed/cloud volume justifies it.
- RELEASE — required when publishing a real production artifact.

## Canonical register

| Area | Stage | Current decision / required closure |
|---|---|---|
| Metering & billing semantics | PAID | Define one billable protected action, dedupe, retries, UNKNOWN/BLOCK charging, corrections, spend caps and auditable usage ledger. |
| Usage event identity | PAID | Every billable event needs immutable event ID + tenant/project + operation + timestamp + contract/version identity. |
| Taxes/invoicing | PAID | B2B invoicing, VAT/tax handling, credits/refunds and invoice disputes must be operational before charging. |
| Pack governance | NOW/M8 | Pack lifecycle, signatures/digests, promotion, rollback, deprecation and trust tier must be explicit. |
| Compatibility/deprecation | M9 | Public support window, breaking-change rules, migration notices and pinning behavior required. |
| Incident response | M8/PAID | Severity model, false-block procedure, bad-pack rollback, security incident path and postmortem discipline. |
| Runtime observability | M8/M10 | Latency, UNKNOWN, false-block reports, policy override, pack/provider error and resolver metrics. |
| Privacy lifecycle | PAID/M10 | Collection, transit, storage, retention, deletion, backups, support access and residency rules. |
| Trust package | PAID/ENTERPRISE | Security overview, data-flow, subprocessors, DPA posture, vuln management, questionnaires and pentest policy. |
| Abuse controls | M8/M10 | Input bombs, resolver abuse, secret exfiltration, rate/cost abuse, metering bypass and tenant abuse. |
| Partner economics | M9/PAID | Define partner benefit: reference integration, co-maintained pack, referral, bundling or revenue share only when evidence supports it. |
| Enterprise procurement | ENTERPRISE | SSO/RBAC/audit logs/invoice/PO/private deployment boundaries; refuse bespoke work that breaks solo-founder economics. |
| IP / trademark / licensing | M9/RELEASE | Verify TimeProofs name/package/domain position, third-party licenses, fixture rights, pack license and public/commercial split. |
| Business continuity | PAID/ENTERPRISE | Recovery credentials, release/rollback runbooks, backup ownership and founder-unavailability plan. |
| Moat telemetry loop | M9/M10 | Convert anonymous/sanitized edge cases into regression knowledge without depending on raw customer payload custody. |
| Open-source boundary | M9 | Freeze what is open, what is commercially maintained, and what compatibility knowledge remains proprietary. |
| Liability | PAID | Define evidence scope, caller-owned execution, explicit fail-open responsibility, limitation of liability and non-compliance claims. |
| Support/SLA | PAID/ENTERPRISE | Support targets must be priced; no hidden bespoke 24/7 burden. |
| Provider resolver economics | M10 | Cost of reads/polling/storage/support measured per provider/operation before final Resolve pricing. |
| Release provenance | RELEASE | OIDC/trusted publishing, provenance, SBOM/attestation, immutable version and registry install proof. |

## Anti-omission rule

A milestone may not be closed by deleting or silently reclassifying an open item. Items are closed only by:

1. implemented and tested proof;
2. explicit product/company decision;
3. lifecycle deferral with a named gate;
4. deliberate unsupported/out-of-scope decision.

Every major future audit must update this register.
