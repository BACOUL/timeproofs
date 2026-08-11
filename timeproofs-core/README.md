# TimeProofs Core — M5 Verify Engine

Status: first deterministic engine implementation.

## Responsibility

`timeproofs-core/index.js` evaluates the frozen M4 UCP↔AP2 artifact fixtures against the M3 semantics.

Implemented invariant path:
- TP-CX-003 exact-authorized-state prerequisite;
- TP-CX-002 currency projection;
- TP-CX-001 authoritative total projection.

Aggregation is deterministic: `BLOCK > UNKNOWN > WARN > PASS`.

## Deliberate boundary

This is the protocol-agnostic evaluation step, not the final UCP/AP2 adapter implementation. M6 owns parsing/normalizing real protocol artifacts, exact supported version identifiers, cryptographic/native binding verification, and CLI/SDK ingestion.

M5 therefore does not claim that the presence of an AP2 `transaction_id` cryptographically proves a checkout hash. The fixture corpus supplies the already-selected artifacts/profile needed to exercise the invariant engine. Real native binding verification must be supplied by M6 adapters/evidence.

## Regression

Run:

`npm run test:timeproofs-core`

The test runner loads `fixtures/ucp-ap2/v0.1/manifest.json` and checks aggregate decisions, per-invariant statuses and structured UNKNOWN reasons.

## Non-goals

No auth, billing, database, dashboard, cloud service, network calls, LLM, generic MCP gateway, or AgentReady scanning behavior belongs in this core.
