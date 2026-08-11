# TimeProofs — M2.1 Foundation Hardening

Status: COMPLETE
Date: 2026-08-11

## Why this mini-milestone exists

Before M4 fixtures and M5 engine code, the canonical model was reviewed for structural weaknesses that would become expensive after a public SDK/API existed.

M2.1 does not change the company thesis or M3 pack semantics. It hardens reproducibility, provenance and handoff safety.

## Changes

1. Root evaluation envelope is now required; `{}` is not a valid TimeProofs evaluation.
2. Added required `core_schema_version` and `evaluation_id`.
3. Added required evaluation metadata with pack version, adapter versions and evaluation time.
4. Added immutable-ish `ArtifactSnapshot` identity to every ProtocolObject using digest + explicit digest scope.
5. Added structured UNKNOWN reasons while keeping the public decision set exactly PASS/WARN/BLOCK/UNKNOWN.
6. Strengthened evidence documentation so every canonical value and decision can be traced to exact artifact snapshots and versions.
7. Clarified AgentReady as legacy on the relaunch branch; legacy package/site metadata must not be treated as relaunch product truth.

## Unknown reasons frozen for initial core

- MISSING_OBJECT
- MISSING_EVIDENCE
- UNSUPPORTED_VERSION
- UNSUPPORTED_TRANSFORMATION
- AMBIGUOUS_BINDING
- AMBIGUOUS_MAPPING
- STALE_EVIDENCE
- SELECTIVE_DISCLOSURE
- INSUFFICIENT_LIFECYCLE_CONTEXT
- INTEGRITY_UNVERIFIED
- OTHER

These are reasons under the `UNKNOWN` verdict, not new verdicts.

## M3 compatibility review

The UCP↔AP2 pack remains compatible:

- TP-CX-003 benefits from exact artifact snapshot identity;
- TP-CX-001/002 keep the same predicates and blocking semantics;
- unsupported FX/transformation now maps explicitly to `UNKNOWN + UNSUPPORTED_TRANSFORMATION`;
- unsupported protocol versions map to `UNKNOWN + UNSUPPORTED_VERSION`;
- missing exact checkout/provider evidence can be explained without changing invariant truth semantics.

No M3 invariant needed semantic redefinition.

## Exit criteria

- exact artifact evaluated is identifiable: PASS
- pack/adapter/core versions are carried by evaluation: PASS
- empty root evaluation rejected by schema: PASS
- UNKNOWN reason is machine-readable: PASS
- M3 remains compatible: PASS
- legacy product boundary documented: PASS

## Next

Proceed with M4 fixture corpus using the hardened core schema.