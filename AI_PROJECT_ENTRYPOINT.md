# AI / Contributor Entry Point

Before doing any strategic or implementation work on the TimeProofs relaunch, read in this order:

1. `TIMEPROOFS_PRODUCT_CONSTITUTION.md`
2. `docs/startup/CURRENT_STATE.md`
3. `docs/startup/EXECUTION_PLAN.md`
4. `docs/startup/WORLD_CLASS_GATE.md`
5. `docs/startup/WORLD_CLASS_GATE_COMPLETION_REPORT.md`
6. `docs/startup/DECISION_LOG.md`
7. `docs/product/M7_COMPLETION_REPORT.md`
8. `TIMEPROOFS_MASTER_CONTEXT.md`
9. `docs/research/M1_COMPLETION_REPORT.md`
10. `docs/product/M2_1_FOUNDATION_HARDENING.md`
11. `packs/ucp-ap2/M3_COMPLETION_REPORT.md`
12. `packs/ucp-ap2/SPEC.md`
13. `packs/ucp-ap2/COMPATIBILITY.md`
14. `docs/product/M6_COMPLETION_REPORT.md`
15. `docs/product/RESULT_CONTRACT.md`
16. `docs/security/THREAT_MODEL.md`
17. `docs/security/SUPPLY_CHAIN.md`
18. `docs/legacy/AGENTREADY_INVENTORY.md`
19. `LEGACY_AGENTREADY.md`
20. `docs/startup/STARTUP_OPERATING_SYSTEM.md`
21. `docs/startup/HANDOFF.md`
22. `docs/startup/BENCHMARK_POLICY.md`

## Active direction

TimeProofs is **Cross-Protocol Consistency Infrastructure for agentic transactions**.

The long-term product is a **Cross-Protocol Consistency & Invariant Engine**.

The initial wedge is UCP ↔ AP2 composition consistency, focused on cross-object semantic/economic consistency and evidence closure rather than generic protocol conformance.

## Current status

Product thesis is frozen at the constitutional level.

M0–M7 plus M2.1 are complete. The active work is **World-Class Gate pre-M8 closure**. M8 runtime enforcement has NOT started.

The active code path includes the deterministic core, real UCP/AP2 adapters, JS SDK, CLI, TimeProofs GitHub Action, safe CI result projection, clean-room package boundary, upstream protocol watch, CodeQL and performance baseline. Legacy AgentReady assets are non-canonical and excluded from the dedicated TimeProofs package; remaining public legacy surfaces still require safe archive/removal before relaunch.

## Remaining pre-M8 blockers

Unless founder-waived with rationale:

- broaden property/fuzz testing beyond hand-written adversarial cases;
- review malformed/unsupported/UNKNOWN human errors as a coherent UX set;
- freeze the final public package name and one canonical install/CI path;
- document measured supported input/performance limits and decide whether to enforce a performance regression threshold;
- safely archive/remove remaining public AgentReady site/code surfaces.

Release-time npm OIDC/provenance, exact-artifact SBOM/attestations and registry-install proof are mandatory when a real new TimeProofs release is cut; they are not falsely treated as already complete.

## Rules for contributors and AI assistants

- Do not redefine the company because a protocol detail changes.
- Protocol research may refine pack contents, mappings and invariant semantics.
- Any change to company thesis/category requires explicit founder approval and Decision Log entry.
- Always verify current protocol facts before protocol-dependent decisions.
- Check `protocols/upstream-lock.json` before widening compatibility claims.
- Do not infer the relaunch product from AgentReady-era files.
- Do not default to a generic dashboard/API/landing-page pattern.
- Do not implement a blocking invariant without the evidence/fixture requirements defined in the Decision Log, pack SPEC and Execution Plan.
- Preserve exact artifact snapshot provenance, pack/adapter/core versions, and structured UNKNOWN reasons.
- Do not mark a world-class gate item complete without repository or externally verifiable evidence.
- Do not expose raw transaction credential material in CI-safe results.
- Do not begin M8 while pre-M8 blockers remain unless a founder waiver is recorded.
- Record material decisions in `docs/startup/DECISION_LOG.md`.

Conversation memory is not canonical. The repository is.
