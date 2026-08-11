# TimeProofs — Current State

Last updated: 2026-08-11
Branch: `relaunch/invariant-engine`

## Where the project is

TimeProofs product direction is frozen at the constitutional level.

**Company:** Cross-Protocol Consistency Infrastructure for agentic transactions.

**Long-term product:** Cross-Protocol Consistency & Invariant Engine.

**Initial wedge:** UCP ↔ AP2 composition consistency, focused on cross-object semantic/economic consistency and evidence closure rather than generic protocol conformance.

**Current milestone:** M1 — UCP/AP2 normative composition audit.

No new TimeProofs engine code has been implemented yet. Legacy AgentReady code remains intact and isolated.

## Completed foundation

- branch `relaunch/invariant-engine` created;
- master relaunch context created;
- product constitution created;
- startup operating system created;
- decision log created and updated through D-018;
- handoff protocol created;
- benchmark policy created;
- canonical execution plan created;
- AI/contributor entrypoint created;
- first UCP/AP2 gap matrix created;
- payment/order audit M1.1 created.

## Key findings already locked

1. TimeProofs must not duplicate UCP/AP2 signature/expiry/basic scope conformance as its moat.
2. AP2 v0.2 already provides cryptographic checkout ↔ PaymentMandate identity binding through `transaction_id` derived from the signed checkout JWT.
3. The opportunity is semantic consistency across already-bound objects, not inventing the binding itself.
4. The first payment-total rule should use the authoritative UCP grand total rather than reconstructing totals from a fixed set of components.
5. AP2 PaymentReceipt alone is insufficient to prove executed amount/currency; external execution evidence may be required.
6. Order consistency is lifecycle-aware, not naive equality with the original checkout.
7. Blocking invariants require normative/version evidence plus PASS/BLOCK/UNKNOWN/unsupported fixtures.

## Work not started

- canonical model code;
- binding graph code;
- invariant engine;
- evidence engine;
- UCP adapter;
- AP2 adapter;
- invariant pack implementation;
- fixture corpus implementation;
- TimeProofs CLI/SDK;
- CI integration;
- enforcement runtime;
- website relaunch;
- managed cloud.

## Immediate next task

Finish M1.

Specifically:

1. inspect current canonical UCP/AP2 schemas/implementations for exact V1 fields;
2. resolve legitimate transformations and ambiguity cases;
3. classify the V1 shortlist;
4. identify exact evidence required for each candidate;
5. freeze the smallest defensible first invariant set;
6. then begin M2 canonical model.

Do not begin broad product implementation until M1 exit criteria in `docs/startup/EXECUTION_PLAN.md` are met.

## Mandatory reading order for a new contributor

1. `TIMEPROOFS_PRODUCT_CONSTITUTION.md`
2. `docs/startup/CURRENT_STATE.md`
3. `docs/startup/EXECUTION_PLAN.md`
4. `docs/startup/DECISION_LOG.md`
5. `TIMEPROOFS_MASTER_CONTEXT.md`
6. latest files in `docs/research/`
7. `docs/startup/STARTUP_OPERATING_SYSTEM.md`
8. `docs/startup/BENCHMARK_POLICY.md`

## One-line status

> Product thesis frozen; M1 protocol audit in progress; implementation has not started.
