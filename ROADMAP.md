# TimeProofs Roadmap

Canonical execution order is maintained in `docs/startup/EXECUTION_PLAN.md`.
The readiness bar before runtime enforcement is maintained in `docs/startup/WORLD_CLASS_GATE.md`.

## Product direction

TimeProofs is cross-protocol consistency infrastructure for agentic transactions.

The product expands through versioned invariant/evidence packs across protocol and business-system boundaries; it does not pivot into a scanner-score-dashboard business.

## Completed foundation

- M0 — product constitution / startup operating system
- M1 — UCP/AP2 normative audit
- M2 — canonical transaction model
- M2.1 — provenance/evidence hardening
- M3 — first UCP↔AP2 Invariant Pack specification
- M4 — fixture-first regression contract
- M5 — deterministic Verify engine
- M6 — real UCP/AP2 adapters + local SDK/CLI

## Active

### M7 — Customer CI / package contract

Current goals:
- customer-facing GitHub Action;
- versioned result contract;
- safe/redacted CI output;
- PASS/BLOCK/UNKNOWN end-to-end behavior;
- stable exit-code semantics;
- release/package separation from legacy AgentReady;
- clean quickstart and release discipline.

### World-Class Readiness Gate

Before M8, TimeProofs must demonstrate:
- adversarial-input safety;
- threat-model coverage;
- deterministic multi-OS/runtime regression;
- supply-chain hardening;
- clean package/release provenance plan;
- repository/product-truth hygiene;
- developer quickstart from a clean consumer context;
- performance baseline;
- explicit remaining non-claims.

## Next only after gate

### M8 — Enforce runtime

Pre-commit control for consequential agentic transactions with explicit fail-open/fail-closed policy, latency budget, version pinning, rollback, runtime threat model and auditability.

### M9 — Relaunch website and documentation

The site must be designed from TimeProofs-native product primitives (objects, bindings, invariants, evidence, decisions), benchmarked against leading global infrastructure products rather than generated from a generic SaaS template.

### M10 — Managed TimeProofs Cloud

Only managed surfaces with real operational value: hosted enforcement, managed pack updates, evidence retention, private packs, organizational controls, connectors and enterprise deployment/SLA where justified.

## Rule

A milestone is not “world-class complete” because its happy path works. Feature completion and production-readiness evidence are separate gates.
