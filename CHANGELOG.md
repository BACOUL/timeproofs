# Changelog

All notable **active TimeProofs** changes are documented here.

Versioning policy: `docs/release/VERSIONING.md`.

## Unreleased — TimeProofs relaunch

### Added

- Cross-Protocol Consistency product constitution and startup operating system.
- UCP/AP2 normative composition audit and gap matrix.
- Protocol-agnostic canonical model: ProtocolObject → Binding → Invariant → Evidence → Decision.
- Structured PASS / WARN / BLOCK / UNKNOWN decision model.
- UCP↔AP2 Invariant Pack v0.1 specification and regression fixtures.
- Deterministic Verify engine.
- Real UCP Checkout `2026-04-08` adapter.
- Real AP2 PaymentMandate `mandate.payment.1` adapter.
- Local JS SDK and `timeproofs verify` CLI.
- Exact-state checkout-proof hash verification for the initial AP2 binding profile.
- Customer-facing TimeProofs GitHub Action.
- Public result contract `timeproofs.result.v0.1`.
- CI-safe redaction profile `timeproofs.ci.safe.v0.1`.
- Threat model, supply-chain policy and World-Class Readiness Gate.
- Adversarial input/security regression suite.
- Linux/macOS/Windows × Node 22/24 CI matrix.

### Security

- CI-safe output excludes raw protocol objects, checkout proof material, payment-instrument payloads and merchant-authorization credential material.
- Customer CI input files are bounded and must be regular files.
- Output/input path aliasing is rejected.
- Canonicalization rejects cycles, non-finite numbers, non-JSON values and excessive depth/node count.
- Hardened workflows pin third-party Actions by immutable commit SHA and disable persisted checkout credentials.

### Changed

- Repository root README, roadmap, package metadata and security policy now describe TimeProofs rather than AgentReady.
- Root `action.yml` is now the TimeProofs Verify Action.
- Legacy AgentReady Actions/release workflows were removed from the relaunch branch.

### Current non-claims

The relaunch does not yet claim complete AP2 SD-JWT/JWS/key-binding verification, PSP execution proof, hosted runtime enforcement, or arbitrary protocol compatibility.

---

## Legacy AgentReady history

The repository previously shipped an AgentReady scanner/CI product, including the `@timeproofs/agentready@0.1.0-alpha.0` prerelease. Those entries remain historical facts but do not define the active TimeProofs product direction.

See `LEGACY_AGENTREADY.md` and Git history for the former AgentReady changelog/release evidence.
