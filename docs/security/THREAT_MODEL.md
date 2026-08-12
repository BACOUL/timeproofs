# TimeProofs Threat Model

Status: ACTIVE SECURITY BASELINE
Scope: M0–M7 local/CI product surfaces

## Security objective

TimeProofs must not convert ambiguous or attacker-controlled protocol artifacts into unjustified PASS/BLOCK decisions, leak transaction secrets, or allow malformed inputs to destabilize CI/runtime execution.

## Trust boundaries

1. **Untrusted protocol artifacts** — UCP/AP2 JSON is attacker-controlled input until validated by an adapter.
2. **Binding evidence** — checkout JWT/proof material may be sensitive and must not be persisted or logged by default.
3. **Adapters** — protocol-specific parsing and version recognition are trusted code but must fail closed to UNKNOWN/unsupported rather than guess.
4. **Core evaluator** — deterministic decision authority. It must not fetch remote content or use an LLM.
5. **GitHub Action / CLI** — orchestration layer. It must not broaden permissions or leak secrets.
6. **Generated result** — safe machine artifact intended for CI consumption; must omit raw secret evidence.

## Primary threats and required controls

### T1 — Malformed or oversized JSON
Risk: memory/CPU exhaustion, parser abuse, misleading partial parsing.
Controls:
- bounded input size in customer CI path;
- strict JSON parse failure;
- structural validation in adapters;
- no recursive remote resolution in M7.

### T2 — Unsupported future protocol silently accepted
Risk: semantic drift creates false PASS.
Controls:
- exact supported profile identifiers;
- unsupported versions fail explicitly;
- no `latest` production semantics;
- adapter version recorded in result metadata.

### T3 — Ambiguous binding treated as proof
Risk: comparing a payment mandate with the wrong checkout.
Controls:
- TP-CX-003 requires explicit exact-state evidence;
- missing evidence → UNKNOWN;
- mismatch → BLOCK;
- raw identifier presence alone is insufficient.

### T4 — Secret leakage
Risk: checkout JWT/payment credentials appear in logs, outputs, artifacts, or summaries.
Controls:
- GitHub mask command for supplied proof value;
- raw proof is not added to graph/result;
- safe-output self-check rejects serialization containing the supplied proof;
- CI fixture verifies non-leakage;
- output files are written mode 0600 on supported POSIX runners.

### T5 — Path and file abuse in CI
Risk: arbitrary huge/special files, unexpected directories, output overwrite.
Controls:
- regular-file checks;
- size limits;
- explicit output path supplied by caller;
- no shell interpolation of artifact content;
- Node file APIs rather than eval/source execution.

### T6 — Invariant bypass through type coercion
Risk: strings/floats/NaN accepted as minor-unit amounts or malformed currency accepted.
Controls:
- integer minor-unit checks;
- ISO alpha-3 uppercase currency shape checks;
- deterministic comparison only after currency comparability is established.

### T7 — Supply-chain compromise
Risk: mutable third-party Actions or dependencies change behavior.
Controls:
- pin third-party Actions by commit SHA in release workflows;
- root workspace currently has no runtime npm dependencies;
- lockfile committed;
- future release must emit SBOM/provenance and use trusted publishing before public package release.

### T8 — False confidence from incomplete cryptographic validation
Risk: product marketing implies complete AP2/SD-JWT verification when only hash binding is checked.
Controls:
- explicit non-claims in README/docs;
- missing signature/key validation does not get relabeled as cryptographic verification;
- future cryptographic profiles must add fixtures and normative evidence before blocking claims.

## Decision safety invariant

A missing, unsupported, stale, or ambiguous prerequisite must never be converted to PASS for convenience.

## Data retention

The M0–M7 product is local-first. TimeProofs does not require a hosted account or send transaction artifacts to a TimeProofs backend.

## Security review gate

Before M8 runtime enforcement, this threat model must be expanded to include network transport, availability/SLO, replay, concurrency, policy authority, fail-open/fail-closed behavior, rollback, audit log integrity, and compromise of a hosted control plane.
