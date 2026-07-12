# Changelog

All notable active-product changes are documented here.

Active direction:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

## Unreleased

### Added

- Community release candidate workflow, manifest, checksum, and temporary CI artifact validation.

### Blocked

- Public npm publication, immutable tag creation, and GitHub Release creation are approved only for the exact `0.1.0-alpha.0` alpha artifact, but have not been executed.
- npm publication is awaiting the owner checkpoint: JEASON must publish manually with owner 2FA and no npm token.
- Marketplace listing remains outside this release step.

## 0.1.0-alpha.0 - candidate, not released

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
