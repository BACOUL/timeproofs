# AI / Contributor Entry Point

Before doing any strategic or implementation work on the TimeProofs relaunch, read in this order:

1. `TIMEPROOFS_PRODUCT_CONSTITUTION.md`
2. `docs/product/PRODUCT_THESIS.md`
3. `docs/startup/CURRENT_STATE.md`
4. `docs/startup/EXECUTION_PLAN.md`
5. `docs/startup/WORLD_CLASS_GATE.md`
6. `docs/startup/WORLD_CLASS_GATE_COMPLETION_REPORT.md`
7. `docs/startup/DECISION_LOG.md`
8. `docs/product/M8_RUNTIME_ENFORCEMENT_DESIGN.md`
9. `docs/research/MARKET_STRATEGIC_AUDIT_2026-08-12.md`
10. `docs/product/M7_COMPLETION_REPORT.md`
11. `TIMEPROOFS_MASTER_CONTEXT.md`
12. `docs/research/M1_COMPLETION_REPORT.md`
13. `docs/product/M2_1_FOUNDATION_HARDENING.md`
14. `packs/ucp-ap2/M3_COMPLETION_REPORT.md`
15. `packs/ucp-ap2/SPEC.md`
16. `packs/ucp-ap2/COMPATIBILITY.md`
17. `docs/product/M6_COMPLETION_REPORT.md`
18. `docs/product/RESULT_CONTRACT.md`
19. `docs/product/PERFORMANCE_AND_INPUT_PROFILE.md`
20. `docs/security/THREAT_MODEL.md`
21. `docs/security/SUPPLY_CHAIN.md`
22. `docs/legacy/AGENTREADY_INVENTORY.md`
23. `LEGACY_AGENTREADY.md`
24. `docs/startup/STARTUP_OPERATING_SYSTEM.md`
25. `docs/startup/HANDOFF.md`
26. `docs/startup/BENCHMARK_POLICY.md`

## Active direction

TimeProofs is **Cross-Protocol Consistency Infrastructure for agentic transactions**.

The constitution-level product thesis is frozen in `docs/product/PRODUCT_THESIS.md`:

> **TimeProofs is the transaction integrity layer between what autonomous agents were authorized to do and what external systems actually executed.**

The strategic product primitives are:

- VERIFY — Is it valid?
- ENFORCE — Can it run?
- RESOLVE — Did it happen?

The initial wedge is UCP ↔ AP2 composition consistency. It is a beachhead, not the company boundary.

The strategic next evidence boundary is approved AP2 PaymentMandate ↔ executed PSP/network outcome, followed by order/refund/settlement and other independent-system boundaries.

## Current status

M0–M7 plus M2.1 are complete. The pre-M8 World-Class Readiness Gate is GREEN.

**M8 local-first runtime enforcement is ACTIVE and implementation has begun.**

The M8 design was frozen before code in `docs/product/M8_RUNTIME_ENFORCEMENT_DESIGN.md`.

The executable path includes deterministic core, real UCP/AP2 adapters, JS SDK, CLI, customer GitHub Action, safe CI projection, clean-room package boundary, upstream protocol watch, CodeQL, generated property regression, measured performance guard and the first local `enforceTransaction()` implementation.

Legacy AgentReady assets are non-canonical and excluded from the TimeProofs package. Public legacy surfaces must be cleaned before M9/public relaunch, not before local M8 implementation.

## M8 rules

- Implement the frozen M8 design before widening scope.
- Default financially consequential enforcement is fail-closed for BLOCK and UNKNOWN.
- Internal/runtime error must never silently become ALLOW.
- Explicit fail-open behavior, if supported, must be configuration-visible and audit-visible.
- TimeProofs returns enforcement decisions; it does not execute/custody the caller's payment or external side effect in M8.
- Do not turn M8 into a generic MCP/A2A gateway.
- No `latest` pack/protocol semantics and no silent in-process remote pack mutation.
- Preserve local-first operation without mandatory TimeProofs cloud dependency.

## Strategic rules

- Do not redefine TimeProofs as a UCP/AP2 validator.
- Treat local protocol guarantees as inputs; the company value is cross-system integrity.
- Build toward `VERIFY → ENFORCE → RESOLVE`, not three unrelated products.
- Preserve the rule: **Never retry an unknown side effect. Resolve it first.**
- Expand through evidence/invariant/resolver knowledge that accumulates across protocols, providers and systems of record.
- Keep technical readiness separate from willingness-to-pay and product-market-fit evidence.

## General contributor rules

- Do not redefine the company because a protocol detail changes.
- Always verify current protocol facts before protocol-dependent decisions.
- Do not infer the relaunch product from AgentReady-era files.
- Do not implement a BLOCK-capable invariant without its normative evidence, ambiguity fixtures and enforcement point.
- Preserve artifact provenance, versions and structured UNKNOWN reasons.
- Do not expose raw transaction credential material in safe CI/audit outputs.
- Record material decisions in `docs/startup/DECISION_LOG.md`.

Conversation memory is not canonical. The repository is.
