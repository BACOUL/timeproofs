# TimeProofs — Handoff Protocol

Use this file when a new AI assistant, developer, advisor, or collaborator takes over the project.

## Current status

- branch: `relaunch/invariant-engine`;
- M0–M7 plus M2.1: COMPLETE;
- current active work: World-Class Gate pre-M8 closure;
- M8 runtime enforcement: NOT STARTED.

Do not begin M8 until `docs/startup/WORLD_CLASS_GATE.md` and `docs/startup/WORLD_CLASS_GATE_COMPLETION_REPORT.md` have been reviewed and remaining pre-M8 blockers are green or explicitly founder-waived.

## Mandatory reading order

1. `/TIMEPROOFS_MASTER_CONTEXT.md`
2. `/TIMEPROOFS_PRODUCT_CONSTITUTION.md`
3. `/docs/startup/CURRENT_STATE.md`
4. `/docs/startup/EXECUTION_PLAN.md`
5. `/docs/startup/DECISION_LOG.md`
6. `/docs/startup/WORLD_CLASS_GATE.md`
7. `/docs/startup/WORLD_CLASS_GATE_COMPLETION_REPORT.md`
8. `/docs/product/M7_COMPLETION_REPORT.md`
9. current branch history and latest commits
10. current protocol research and pack specs

## First actions for a new AI assistant

Before proposing changes:

- confirm the active branch and current head;
- inspect recent commits and current CI state;
- identify which decisions are settled vs open;
- verify current MCP/A2A/UCP/AP2 facts online if an answer depends on protocol state;
- inspect `protocols/upstream-lock.json` and upstream-watch state before changing supported-profile claims;
- check whether competitor or standard changes invalidate assumptions;
- do not revive AgentReady positioning by default;
- treat `docs/legacy/AGENTREADY_INVENTORY.md` as the legacy boundary map;
- do not propose a generic dashboard/API/landing-page bundle unless the actual workflow requires it;
- preserve UNKNOWN rather than inventing proof;
- do not silently widen supported protocol profiles.

## Project summary in one paragraph

TimeProofs is being relaunched from an older AgentReady scanner/CI product into cross-protocol consistency infrastructure for agentic transactions. The initial wedge is deterministic UCP ↔ AP2 consistency verification; the long-term platform is a Cross-Protocol Consistency & Invariant Engine. The strategic thesis is that protocol objects can each be locally valid while their composition is globally inconsistent. The expected moat is not basic comparison logic but versioned, verified Invariant Packs containing mappings, canonicalization, compatibility knowledge, evidence rules and regression fixtures. The first developer product now exists as local SDK/CLI plus customer GitHub Action with safe result projection, clean-room package boundary, cross-platform CI, upstream protocol watch, CodeQL and performance baseline.

## Current executable boundary

Supported today:
- UCP Checkout protocol version `2026-04-08` / `dev.ucp.shopping.checkout`;
- AP2 PaymentMandate VCT `mandate.payment.1`;
- exact-state SHA-256/base64url binding profile when explicit checkout proof/JWT evidence is supplied;
- TP-CX-003, TP-CX-002 and TP-CX-001 current executable pack path.

Not claimed today:
- full SD-JWT/key/signature verification;
- merchant authorization JWS verification;
- arbitrary AP2 hash/binding algorithms;
- future UCP/AP2 schema compatibility without review;
- provider/network proof of executed payment amount;
- lifecycle Order enforcement;
- modeled FX/tips/incremental authorization/partial capture/split settlement/marketplace payout;
- hosted/runtime enforcement.

## Remaining pre-M8 blockers

Unless founder-waived with rationale:

- expand property/fuzz testing beyond hand-written adversarial cases;
- review human malformed/unsupported/UNKNOWN errors as a coherent UX set;
- freeze one canonical public install path and one canonical CI path after package naming is final;
- document measured supported input/performance profile and decide whether a performance regression threshold is justified;
- safely archive/remove remaining public AgentReady surfaces before public relaunch.

Release-only provenance controls are not pre-M8 failures; they become mandatory when a real new TimeProofs package is published.

## Things not to assume

Do not assume:

- the seven candidate cross/evidence/lifecycle invariants are all executable;
- pricing is final;
- package naming is final;
- open-source strategy is final;
- a web dashboard is required;
- an API must exist before local/CI use proves useful;
- every previous AgentReady component should be reused;
- every protocol claim from an old conversation is still current;
- a parser accepting a future JSON shape means the profile is supported.

## Required standard for new proposals

Any major proposal should state:

- problem;
- evidence;
- affected protocol boundary;
- why one protocol cannot solve it alone;
- current competitors;
- absorption risk;
- user and payer;
- distribution path;
- moat contribution;
- implementation cost;
- reliability/security implications;
- whether it strengthens or distracts from the platform trajectory.

## Handoff completion rule

Before ending substantial work, update the canonical docs if any of these changed:

- company thesis;
- wedge;
- protocol assumptions;
- invariant semantics;
- architecture;
- pricing/packaging;
- distribution thesis;
- open-source boundary;
- major risks;
- roadmap priority;
- world-class gate state;
- release readiness.

Conversation memory is never the canonical project state. The repository is.
