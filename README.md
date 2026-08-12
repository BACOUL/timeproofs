# TimeProofs

**Cross-Protocol Consistency Infrastructure for agentic transactions.**

TimeProofs verifies that individually valid protocol objects still compose into one coherent transaction before consequential state is committed.

Initial executable wedge:

```text
UCP Checkout
    ↓
AP2 PaymentMandate
    ↓
TimeProofs
    ↓
PASS / WARN / BLOCK / UNKNOWN
```

The product is deterministic. No LLM is used as the authority for blocking decisions.

## Current status

The relaunch is developed on `relaunch/invariant-engine`.

Completed foundations include:
- frozen product constitution;
- UCP/AP2 normative audit;
- protocol-agnostic canonical model;
- hardened provenance/evidence model;
- versioned UCP↔AP2 invariant pack;
- regression fixtures;
- deterministic Verify engine;
- real UCP/AP2 adapters;
- local JS SDK and CLI;
- customer-facing GitHub Action under active release hardening.

Canonical current state: [`docs/startup/CURRENT_STATE.md`](docs/startup/CURRENT_STATE.md).
Canonical execution plan: [`docs/startup/EXECUTION_PLAN.md`](docs/startup/EXECUTION_PLAN.md).
Product constitution: [`TIMEPROOFS_PRODUCT_CONSTITUTION.md`](TIMEPROOFS_PRODUCT_CONSTITUTION.md).

## Local verification

```bash
node bin/timeproofs.js verify \
  --checkout checkout.json \
  --payment-mandate payment.json \
  --checkout-jwt-file checkout-jwt.txt
```

Machine output:

```bash
node bin/timeproofs.js verify ... --json
```

Initial exit-code contract:
- `0` PASS/WARN
- `2` BLOCK
- `3` UNKNOWN
- `4` unsupported protocol/profile
- `1` invalid input/runtime error

## Supported initial profile

- UCP Checkout protocol version `2026-04-08`
- AP2 PaymentMandate VCT `mandate.payment.1`

TimeProofs does **not** infer unsupported versions or missing evidence. Missing proof becomes `UNKNOWN`.

## Architecture

The frozen model is:

```text
ProtocolObject
  → Binding
  → Invariant
  → Evidence
  → EvaluationResult
  → Decision
```

The long-term moat hypothesis is the corpus of versioned **Invariant Packs** and evidence/adaptation knowledge across protocols and systems, not generic field comparison code.

## Tests

```bash
npm run test:timeproofs
```

GitHub Actions also runs the regression and customer-action integration gates.

## Security boundary

The current product verifies specific cross-object consistency properties. It does not yet claim complete SD-JWT/JWS/key-binding verification, PSP execution proof, or arbitrary protocol compatibility. Those boundaries are intentional and documented.

Security model: [`docs/security/THREAT_MODEL.md`](docs/security/THREAT_MODEL.md) once present in the active world-class gate.

## Legacy AgentReady

This repository previously hosted the AgentReady scanner/CI product. AgentReady assets remain for historical/migration purposes only and are not the active TimeProofs product direction. See [`LEGACY_AGENTREADY.md`](LEGACY_AGENTREADY.md).

## License

MIT. See [`LICENSE`](LICENSE).
