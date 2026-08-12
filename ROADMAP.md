# TimeProofs Roadmap

Canonical execution order is maintained in `docs/startup/EXECUTION_PLAN.md`.
The completed pre-M8 readiness evidence is maintained in `docs/startup/WORLD_CLASS_GATE.md` and `WORLD_CLASS_GATE_COMPLETION_REPORT.md`.

## Product direction

TimeProofs is cross-protocol consistency infrastructure for agentic transactions.

The product expands through versioned invariant/evidence packs across protocol, provider and business-system boundaries; it does not pivot into a scanner-score-dashboard business.

## Completed foundation

- M0 — product constitution / startup operating system
- M1 — UCP/AP2 normative audit
- M2 — canonical transaction model
- M2.1 — provenance/evidence hardening
- M3 — first UCP↔AP2 Invariant Pack specification
- M4 — fixture-first regression contract
- M5 — deterministic Verify engine
- M6 — real UCP/AP2 adapters + local SDK/CLI
- M7 — customer GitHub Action + safe result/package contract
- pre-M8 World-Class Readiness Gate — GREEN

The gate now includes generated property regression, cross-platform/runtime tests, customer PASS/BLOCK/UNKNOWN integration, clean-room packaging, CodeQL, upstream schema watch, explicit error contract, measured 1,000-line-item benchmark and an enforced performance-regression guard.

## Active — M8 local-first runtime enforcement

Canonical design: `docs/product/M8_RUNTIME_ENFORCEMENT_DESIGN.md`.

M8 moves TimeProofs into the pre-commit decision path while retaining a narrow trust boundary:
- return ALLOW/DENY/ERROR from underlying PASS/WARN/BLOCK/UNKNOWN evidence;
- fail closed by default for BLOCK/UNKNOWN on financially consequential flows;
- never silently allow on internal error;
- make any fail-open override explicit and auditable;
- pin package/pack/adapter/protocol versions;
- keep external payment/side-effect execution owned by the caller;
- remain local-first with no mandatory TimeProofs cloud dependency.

Implementation order is schema → pure policy evaluator → SDK `enforceTransaction()` → fixtures/tests → optional CLI/Action surfaces → benchmark/adversarial/cross-platform proof.

## Strategic pack expansion in parallel

The current UCP↔AP2 pack remains the beachhead, not the company boundary.

Highest-priority next evidence boundary:

**approved AP2 PaymentMandate ↔ executed PSP/network outcome.**

Then:
- checkout/payment ↔ committed order lifecycle;
- cumulative mandate constraints ↔ prior fulfilment state;
- cancellation/refund ↔ order/payment/provider state.

The objective is to accumulate cross-system evidence semantics and compatibility knowledge that a single protocol owner cannot completely own.

Canonical strategic audit: `docs/research/MARKET_STRATEGIC_AUDIT_2026-08-12.md`.

## M9 — Relaunch website and documentation

Before public relaunch:
- remove/archive/redirect legacy AgentReady public surfaces;
- freeze actual registry package name and canonical install path;
- execute release provenance controls for any real publication;
- design site/docs from TimeProofs-native objects, bindings, invariants, evidence and decisions rather than a generic SaaS template.

## M10 — Managed TimeProofs Cloud

Only managed surfaces with genuine operational value: managed pack updates, evidence retention, private packs, organizational controls, connectors and enterprise deployment/SLA where justified.

## Parallel company validation

Technical maturity is not market proof. Continue validating first ICP/economic buyer, willingness-to-pay, cost of composed-transaction failures, protocol adoption, competitor/standard absorption risk and distribution through protocol/developer ecosystems.

Current largest business uncertainty: willingness-to-pay evidence.

## Rule

A milestone is not “world-class complete” because its happy path works. Feature completion, runtime readiness, release provenance, public relaunch and market validation remain separate gates.
