# Changelog

All notable active-product changes are documented here.

Active direction:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

## Unreleased

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
