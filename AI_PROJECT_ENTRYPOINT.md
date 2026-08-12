# AI / Contributor Entry Point

Before doing any strategic or implementation work on the TimeProofs relaunch, read in this order:

1. `TIMEPROOFS_PRODUCT_CONSTITUTION.md`
2. `docs/product/PRODUCT_THESIS.md`
3. `docs/startup/CURRENT_STATE.md`
4. `docs/startup/BUSINESS_ARCHITECTURE.md`
5. `docs/startup/COMPANY_COMPLETENESS_AUDIT.md`
6. `docs/startup/EXECUTION_PLAN.md`
7. `docs/startup/WORLD_CLASS_GATE.md`
8. `docs/startup/WORLD_CLASS_GATE_COMPLETION_REPORT.md`
9. `docs/startup/DECISION_LOG.md`
10. `docs/product/M8_RUNTIME_ENFORCEMENT_DESIGN.md`
11. `docs/research/MARKET_STRATEGIC_AUDIT_2026-08-12.md`
12. `docs/product/M7_COMPLETION_REPORT.md`
13. `TIMEPROOFS_MASTER_CONTEXT.md`
14. `docs/research/M1_COMPLETION_REPORT.md`
15. `docs/product/M2_1_FOUNDATION_HARDENING.md`
16. `packs/ucp-ap2/M3_COMPLETION_REPORT.md`
17. `packs/ucp-ap2/SPEC.md`
18. `packs/ucp-ap2/COMPATIBILITY.md`
19. `docs/product/M6_COMPLETION_REPORT.md`
20. `docs/product/RESULT_CONTRACT.md`
21. `docs/product/PERFORMANCE_AND_INPUT_PROFILE.md`
22. `docs/security/THREAT_MODEL.md`
23. `docs/security/SUPPLY_CHAIN.md`
24. `docs/legacy/AGENTREADY_INVENTORY.md`
25. `LEGACY_AGENTREADY.md`
26. `docs/startup/STARTUP_OPERATING_SYSTEM.md`
27. `docs/startup/HANDOFF.md`
28. `docs/startup/BENCHMARK_POLICY.md`

## Active direction

TimeProofs is **Cross-Protocol Consistency Infrastructure for agentic transactions**.

Constitution-level thesis:

> **TimeProofs is the transaction integrity layer between what autonomous agents were authorized to do and what external systems actually executed.**

Strategic primitives:

**VERIFY → ENFORCE → RESOLVE**

The initial wedge is UCP ↔ AP2 composition consistency. It is a beachhead, not the company boundary.

The strategic next evidence boundary is approved AP2 PaymentMandate ↔ executed PSP/network outcome.

## Company architecture

The company is designed around transaction integrity rather than seats/reports.

Expected economic path:
- local/free developer adoption where it improves distribution/trust;
- usage-based production VERIFY/ENFORCE;
- higher-value provider-specific RESOLVE where justified;
- managed/private packs, evidence history, governance, connectors and SLA as enterprise expansion.

Pricing, first ICP and willingness-to-pay remain hypotheses until validated. Do not convert revenue arithmetic or candidate price envelopes into market facts.

Largest company risks currently:
1. willingness-to-pay/economic buyer proof;
2. first authorized↔executed provider evidence boundary;
3. exact open-source/commercial split;
4. paid-production liability posture;
5. distribution proof;
6. Resolve unit economics;
7. first meaningful platform/PSP partnership.

## Current status

M0–M7 plus M2.1 are complete. The pre-M8 World-Class Readiness Gate and the full company-completeness audit are complete.

**M8 local-first runtime enforcement is ACTIVE and implementation is underway.**

The active executable path includes deterministic core, real UCP/AP2 adapters, JS SDK, CLI, customer GitHub Action, safe CI projection, clean-room package boundary, upstream protocol watch, CodeQL, generated property regression, measured performance guard and initial `enforceTransaction()` implementation.

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
- Significant M10/cloud spend is gated on real commercial evidence, not architecture enthusiasm.
- Record material decisions in `docs/startup/DECISION_LOG.md`.

Conversation memory is not canonical. The repository is.