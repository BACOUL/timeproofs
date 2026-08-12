# TimeProofs Roadmap

Canonical execution order is maintained in `docs/startup/EXECUTION_PLAN.md`.
The completed pre-M8 readiness evidence is maintained in `docs/startup/WORLD_CLASS_GATE.md` and `WORLD_CLASS_GATE_COMPLETION_REPORT.md`.
The constitution-level product thesis is maintained in `docs/product/PRODUCT_THESIS.md`.

## Product direction

TimeProofs is cross-protocol transaction integrity infrastructure for autonomous-agent transactions.

Canonical thesis:

> **TimeProofs is the transaction integrity layer between what autonomous agents were authorized to do and what external systems actually executed.**

The long-term product is organized around three connected primitives:

- **VERIFY** — Is it valid?
- **ENFORCE** — Can it run?
- **RESOLVE** — Did it happen?

The product expands through versioned invariant/evidence/resolver knowledge across protocol, provider and business-system boundaries. It does not pivot into a scanner-score-dashboard business.

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

The gate includes generated property regression, cross-platform/runtime tests, customer PASS/BLOCK/UNKNOWN integration, clean-room packaging, CodeQL, upstream schema watch, explicit error contract, measured 1,000-line-item benchmark and an enforced performance-regression guard.

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

Implementation now includes the enforcement schema, pure policy evaluator, SDK `enforceTransaction()`, fail-closed regression tests and package inclusion. M8 remains open until the strengthened matrix/package/runtime proof is fully green.

## Strategic expansion after the initial wedge

The current UCP↔AP2 pack remains the beachhead, not the company boundary.

Highest-priority next evidence boundary:

**approved AP2 PaymentMandate ↔ executed PSP/network outcome.**

This is the beginning of the RESOLVE side of the thesis: compare authorized reality with authoritative executed reality and determine whether an ambiguous side effect is COMMITTED, NOT_COMMITTED or UNKNOWN.

Governing rule:

> **Never retry an unknown side effect. Resolve it first.**

Then expand through:
- checkout/payment ↔ committed order lifecycle;
- cumulative mandate constraints ↔ prior fulfilment state;
- cancellation/refund ↔ order/payment/provider state;
- refund ↔ settlement;
- later agent actions ↔ authoritative business-system state.

The objective is to accumulate cross-system evidence semantics, resolver behavior and compatibility knowledge that no single protocol owner completely owns.

Canonical strategic audit: `docs/research/MARKET_STRATEGIC_AUDIT_2026-08-12.md`.

## M9 — Relaunch website and documentation

Before public relaunch:
- remove/archive/redirect legacy AgentReady public surfaces;
- freeze actual registry package name and canonical install path;
- execute release provenance controls for any real publication;
- design site/docs from TimeProofs-native objects, bindings, invariants, evidence, decisions and VERIFY/ENFORCE/RESOLVE rather than a generic SaaS template.

## M10 — Managed TimeProofs Cloud

Only managed surfaces with genuine operational value: managed pack/resolver updates, evidence retention, private packs, organizational controls, connectors and enterprise deployment/SLA where justified.

Cloud is not allowed to become mandatory merely to make the architecture look like a SaaS.

## Parallel company validation

Technical maturity is not market proof. Continue validating first ICP/economic buyer, willingness-to-pay, cost of composed-transaction failures, protocol adoption, competitor/standard absorption risk and distribution through protocol/developer ecosystems.

Current largest business uncertainty: willingness-to-pay evidence.

## Strategic kill conditions

Reconsider the thesis if evidence shows that cross-system transaction inconsistencies are not economically meaningful, providers/protocols fully absorb the relevant boundaries, buyers universally solve the problem trivially in-house without accumulating integration advantage, or no willingness-to-pay appears despite meaningful agentic transaction volume.

## Rule

A milestone is not “world-class complete” because its happy path works. Feature completion, runtime readiness, release provenance, public relaunch and market validation remain separate gates.

The first executable pack must never be mistaken for the permanent definition of the company.
