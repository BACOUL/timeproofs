# TimeProofs AgentReady Changelog

This changelog tracks the active AgentReady direction.

Current direction:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

## Unreleased

### Documentation

- Repositioned public repo metadata around AgentReady CI Gate.
- Marked the old proof/timestamp/verify/ProofSpec direction as legacy.
- Kept cleanup documentation separate from scanner behavior.

## 2026-07-09 - Commercial AgentReady pages

### Changed

- Improved the AgentReady homepage messaging around concrete agent-facing risks.
- Updated pricing to keep the paid path manual and static.
- Improved the sample report page around customer deliverables.

### Tests

```txt
AgentReady core tests: 18/18 passed
```

## 2026-07-09 - AgentReady release flow

### Added

- Root `package.json` script for AgentReady core tests.
- Core regression fixtures for OpenAPI classification and MCP scanning.
- Browser engine gate page.

### Tests

```txt
AgentReady core tests: 18/18 passed
Static page check passed for 8 pages
```

## 2026-07-09 - Controlled risk detection

### Changed

- Improved AgentReady core handling of controlled dangerous actions.
- Distinguished uncontrolled dangerous actions from dangerous actions with confirmation, limits, schemas, blocked reasons, manual review, or guardrails.
- Kept real dangerous actions risky instead of hiding them.

### Tests

```txt
AgentReady core tests: 18/18 passed
```

## Legacy history

Older TimeProofs proof-of-existence, timestamp, verify, ProofSpec, and `.tproof.json` release notes are legacy context. They are not the active product roadmap for this repository.

Do not use old changelog entries to reintroduce a timestamp API, verify UI, proof bundle, dashboard, Stripe billing, or backend into the current AgentReady direction.

## Mandatory limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
