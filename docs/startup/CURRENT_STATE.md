# TimeProofs — Current State

Last updated: 2026-08-11
Branch: `relaunch/invariant-engine`

## Where the project is

TimeProofs product direction is frozen at the constitutional level.

**Company:** Cross-Protocol Consistency Infrastructure for agentic transactions.

**Long-term product:** Cross-Protocol Consistency & Invariant Engine.

**Initial wedge:** UCP ↔ AP2 composition consistency, focused on cross-object semantic/economic consistency and evidence closure rather than generic protocol conformance.

**Current milestone:** M2 — Canonical Transaction Model.

No new TimeProofs engine code has been implemented yet. Legacy AgentReady code remains intact and isolated.

## Completed foundation

- branch `relaunch/invariant-engine` created;
- master relaunch context created;
- product constitution created;
- startup operating system created;
- decision log created;
- handoff protocol created;
- benchmark policy created;
- canonical execution plan created;
- AI/contributor entrypoint created;
- UCP/AP2 gap matrix with 30 relationships created;
- payment/order audit M1.1 created;
- M1 completion report created;
- M1 exit criteria passed sufficiently to begin M2.

## M1 result now locked

1. TimeProofs must not duplicate UCP/AP2 signature/expiry/basic scope conformance as its moat.
2. Current AP2 already provides strong checkout↔PaymentMandate cryptographic identity binding; open AP2 work is strengthening this further. TimeProofs does not own raw binding.
3. The company-relevant opportunity is semantic projection consistency and evidence closure across already valid/bound objects.
4. The first deterministic amount rule uses the authoritative UCP checkout `totals[type=total].amount` and AP2 `payment_amount.amount`.
5. Currency projection compares UCP checkout `currency` with AP2 `payment_amount.currency`.
6. AP2 PaymentReceipt alone cannot prove executed amount/currency; stronger execution verification requires provider/network evidence.
7. UCP Order reconciliation is lifecycle-aware; `checkout_id` is a key binding, but current order state may legitimately evolve after placement.
8. Marketplace/payee entity equivalence, FX, split settlement, partial capture and similar transformations remain RESEARCH/UNKNOWN until explicitly modeled.
9. Missing or selectively undisclosed evidence must produce `UNKNOWN`, never guessed PASS.
10. Standard-local improvements are treated as inputs/adapters, not as reasons to change the TimeProofs company thesis.

See `docs/research/M1_COMPLETION_REPORT.md`.

## Frozen M1 design shortlist carried into M2/M3

- `TP-CX-001 PAYMENT_TOTAL_PROJECTS_AUTHORIZED_CHECKOUT`
- `TP-CX-002 PAYMENT_CURRENCY_PROJECTS_AUTHORIZED_CHECKOUT`
- `TP-CX-003 PAYMENT_PROJECTION_REFERENCES_EXACT_AUTHORIZED_STATE`
- `TP-EV-001 EXECUTED_PAYMENT_MATCHES_APPROVED_MANDATE`
- `TP-LC-001 COMMITTED_ORDER_BINDS_ORIGINATING_CHECKOUT`
- `TP-LC-002 INVALIDATED_OR_CANCELED_STATE_NOT_COMMITTED`
- `TP-EV-002 COMPOSED_EVIDENCE_CHAIN_CLOSED`

Only TP-CX-001 and TP-CX-002 are immediate artifact-only blocking candidates. The rest require structural, lifecycle or external evidence modeling and must not be oversold in V1.

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

Execute M2.

Specifically create and freeze:

1. `docs/product/CANONICAL_MODEL.md`;
2. `docs/product/BINDING_MODEL.md`;
3. `docs/product/EVIDENCE_MODEL.md`;
4. `docs/product/DECISION_MODEL.md`;
5. protocol-agnostic schemas for `ProtocolObject`, `BindingEdge`, `InvariantDefinition`, `EvidenceItem`, `EvaluationResult`, and `Decision`;
6. example transaction graphs for PASS, BLOCK, and UNKNOWN;
7. proof that the same model can later represent A2A/MCP/business-protocol objects without redesign.

Do not implement the full Verify engine before the M2 model is reviewed against the M1 shortlist.

## Mandatory reading order for a new contributor

1. `TIMEPROOFS_PRODUCT_CONSTITUTION.md`
2. `docs/startup/CURRENT_STATE.md`
3. `docs/startup/EXECUTION_PLAN.md`
4. `docs/startup/DECISION_LOG.md`
5. `TIMEPROOFS_MASTER_CONTEXT.md`
6. `docs/research/M1_COMPLETION_REPORT.md`
7. `docs/research/UCP_AP2_GAP_MATRIX.md`
8. `docs/research/M1_1_PAYMENT_ORDER_AUDIT.md`
9. `docs/startup/STARTUP_OPERATING_SYSTEM.md`
10. `docs/startup/BENCHMARK_POLICY.md`

## One-line status

> Product thesis frozen; M1 normative audit complete enough to proceed; M2 canonical transaction model is now active; implementation has not started.
