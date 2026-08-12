# TimeProofs — Metering & Billing Architecture

Status: COMMERCIAL BASELINE — REQUIRED BEFORE PAID PRODUCTION

## Principle

TimeProofs bills consequential protected operations, not seats or opaque compute units.

## Billable event model

Each potential billable event must have:
- `billable_event_id` — immutable unique ID;
- tenant/account ID;
- project/environment ID;
- operation class: VERIFY / ENFORCE / RESOLVE;
- provider/pack/profile identity where applicable;
- result state;
- event timestamp and ingestion timestamp;
- quantity = 1 unless an explicit future metric says otherwise;
- pricing-contract/version ID;
- source execution/evaluation ID for audit.

## Deduplication

Retries of the same protected operation MUST NOT create duplicate billable usage. Dedupe must use immutable event identity and an auditable ledger, not best-effort log aggregation.

## Baseline charge semantics — hypothesis to validate

- local/community execution: not billable;
- managed VERIFY/ENFORCE: bill once when a managed evaluation is accepted for processing;
- repeated fetch/replay of the same result: not billable;
- customer retry with the same idempotent billable event ID: not billable twice;
- BLOCK: billable if the managed service performed the protection work;
- UNKNOWN: billable by default for managed verification/enforcement because evidence analysis occurred, but pricing UX must make this explicit;
- provider RESOLVE: billable according to resolution attempt/operation class, with a future option for success/value-based pricing only if economically justified;
- TimeProofs internal/runtime error before meaningful evaluation: not billable.

These semantics are not public price promises until validated.

## Ledger requirements

Billing usage ledger must be append-only logically, support corrective entries rather than destructive edits, and reconcile to invoices. Operational telemetry is not the invoice source of truth.

## Spend safety

Paid managed service should support configurable alerts and hard/soft spend caps before high-volume public usage. A retry storm must not create an uncontrolled customer bill.

## Invoice lifecycle

Before charging real customers define:
- billing period/time zone;
- tax/VAT handling via merchant-of-record/payment/billing provider where practical;
- overage timing;
- credits/refunds;
- disputed usage workflow;
- enterprise PO/invoice support only when economically justified;
- currency policy.

## Solo-founder constraint

Prefer established billing/tax infrastructure over building custom accounting. TimeProofs owns the usage semantics and ledger correctness; it should not reinvent payment collection or tax calculation.
