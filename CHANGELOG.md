# Changelog

All notable active-product changes are documented here.

Active direction:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

## Unreleased

### Added

- Community release candidate workflow, manifest, checksum, and temporary CI artifact validation.

### Release Evidence

- Public npm publication of `@timeproofs/agentready@0.1.0-alpha.0` succeeded under `alpha`.
- npm also exposed `latest: 0.1.0-alpha.0` unexpectedly; JEASON accepted this temporarily until the first stable release.
- Immutable Git tag `v0.1.0-alpha.0` was created for commit `150da23932c1fb9433cb3d546904f03c18c909e9`.
- GitHub prerelease `v0.1.0-alpha.0` was created.
- No new npm operation is authorized after the documented `latest` exception.
- Marketplace listing remains outside this release step.

## 0.1.0-alpha.0 - alpha prerelease

### Added

- AgentReady CLI alpha for OpenAPI and MCP scans.
- CI policy support with `--min-score` and `--fail-on`.
- Commercial bad/fixed fixture CI Gate validation report.
- Stable rule codes AR001-AR010.
- `agentready.json` v0.1 export fields:
  - `detected_risks`
  - `rule_codes`
  - `detected_rules`
  - v0.1 root aliases such as `source_name`, `score`, `status`, and `risk_counts`
- GitHub Action wrapper for AgentReady CI Gate usage.
- `agentready.json` spec v0.1 documentation.
- Prepared CLI package tarball validation.
- Prepared versioned GitHub Action usage model.

### Changed

- Repository docs now treat AgentReady CI Gate as the sole active direction.
- Legacy proof-of-existence material is archived under `docs/agentready/legacy/`.

### Removed From Active Direction

- Legacy `selfhost/`.
- Legacy `sdk/`.
- Legacy manifest files.
- Old proof/timestamp/verify product surface as an active roadmap target.

## Historical Material

Older proof-of-existence changelog material is legacy context only. It does not define the active product direction.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
