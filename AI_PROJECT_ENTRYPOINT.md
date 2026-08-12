# AI / Contributor Entry Point

Before doing any strategic or implementation work on the TimeProofs relaunch, read in this order:

1. `TIMEPROOFS_PRODUCT_CONSTITUTION.md`
2. `docs/startup/CURRENT_STATE.md`
3. `docs/startup/EXECUTION_PLAN.md`
4. `docs/startup/WORLD_CLASS_GATE.md`
5. `docs/startup/WORLD_CLASS_GATE_COMPLETION_REPORT.md`
6. `docs/startup/DECISION_LOG.md`
7. `docs/product/M8_RUNTIME_ENFORCEMENT_DESIGN.md`
8. `docs/research/MARKET_STRATEGIC_AUDIT_2026-08-12.md`
9. `docs/product/M7_COMPLETION_REPORT.md`
10. `TIMEPROOFS_MASTER_CONTEXT.md`
11. `docs/research/M1_COMPLETION_REPORT.md`
12. `docs/product/M2_1_FOUNDATION_HARDENING.md`
13. `packs/ucp-ap2/M3_COMPLETION_REPORT.md`
14. `packs/ucp-ap2/SPEC.md`
15. `packs/ucp-ap2/COMPATIBILITY.md`
16. `docs/product/M6_COMPLETION_REPORT.md`
17. `docs/product/RESULT_CONTRACT.md`
18. `docs/product/PERFORMANCE_AND_INPUT_PROFILE.md`
19. `docs/security/THREAT_MODEL.md`
20. `docs/security/SUPPLY_CHAIN.md`
21. `docs/legacy/AGENTREADY_INVENTORY.md`
22. `LEGACY_AGENTREADY.md`
23. `docs/startup/STARTUP_OPERATING_SYSTEM.md`
24. `docs/startup/HANDOFF.md`
25. `docs/startup/BENCHMARK_POLICY.md`

## Active direction

TimeProofs is **Cross-Protocol Consistency Infrastructure for agentic transactions**.

The long-term product is a **Cross-Protocol Consistency & Invariant Engine**.

The initial wedge is UCP ↔ AP2 composition consistency, focused on cross-object semantic/economic consistency and evidence closure rather than generic protocol conformance.

The strategic next evidence boundary is approved AP2 PaymentMandate ↔ executed PSP/network outcome; this complements rather than replaces the current UCP↔AP2 pre-commit wedge.

## Current status

M0–M7 plus M2.1 are complete. The pre-M8 World-Class Readiness Gate is GREEN.

**M8 local-first runtime enforcement is now ACTIVE; implementation has not yet started.**

The M8 design was frozen before code in `docs/product/M8_RUNTIME_ENFORCEMENT_DESIGN.md`.

The active executable path includes deterministic core, real UCP/AP2 adapters, JS SDK, CLI, customer GitHub Action, safe CI projection, clean-room package boundary, upstream protocol watch, CodeQL, generated property regression and measured performance guard.

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

## General contributor rules

- Do not redefine the company because a protocol detail changes.
- Always verify current protocol facts before protocol-dependent decisions.
- Do not infer the relaunch product from AgentReady-era files.
- Do not implement a BLOCK-capable invariant without its normative evidence, ambiguity fixtures and enforcement point.
- Preserve artifact provenance, versions and structured UNKNOWN reasons.
- Do not expose raw transaction credential material in safe CI/audit outputs.
- Keep market/ICP/willingness-to-pay evidence separate from technical readiness claims.
- Record material decisions in `docs/startup/DECISION_LOG.md`.

Conversation memory is not canonical. The repository is.
