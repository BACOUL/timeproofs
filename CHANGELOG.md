# TimeProofs AgentReady Changelog

All notable active-product changes for TimeProofs AgentReady are documented here.

The previous proof-of-existence changelog is legacy historical material and is no longer the active product direction.

## 2026-07-10 - CLI and Repo Cleanup Alignment

### Added

```txt
CLI alpha for local AgentReady scans
CLI smoke tests
CLI alpha usage documentation
90-day execution lock documentation
A-to-Z AgentReady project plan
```

CLI capabilities:

```txt
agentready scan openapi <file>
agentready scan mcp <file>
--out report/contract generation
--min-score policy gate
--fail-on critical|high|medium|low|none policy gate
CI-oriented exit codes
```

### Changed

```txt
Project direction aligned around AgentReady as a pre-deployment CI gate.
Legacy proof notes moved under docs/agentready/legacy/.
Contributor and roadmap docs now prioritize CLI -> CI gate execution.
```

### Removed

```txt
selfhost/
sdk/timeproof.js
manifest.json
manifest.webmanifest
```

These were legacy proof-of-existence runtime artifacts and are not part of the AgentReady direction.

### Validation

```txt
AgentReady core tests: 18/18 passed
AgentReady CLI tests: PASS
```

## 2026-07-09 - AgentReady V1 Commercial Surface

### Added

```txt
Commercial homepage copy for AgentReady
Manual pricing path
Sample report page improvements
Commercial OpenAPI bad/fixed fixtures
Commercial MCP email bad/fixed fixtures
Commercial MCP files bad/fixed fixtures
```

### Changed

```txt
Scanner risk handling distinguishes uncontrolled dangerous actions from controlled dangerous actions.
Commercial pages describe static scanning, local/browser-first behavior, and manual review limits.
```

## 2026-07-09 - Browser Scanner Foundation

### Added

```txt
Static OpenAPI JSON/YAML scanner
Static MCP tools JSON scanner
Static scenario simulation
agentready.json export
agentready-simulation.json export
Markdown report export
Browser print / Save as PDF
Public docs and examples pages
Browser test harness
```

## Upcoming

Next official PR:

```txt
qa(agentready): validate commercial fixture CI gate behavior
```

Official execution sequence:

```txt
1. CLI alpha merged.
2. Validate commercial bad/fixed CI gate behavior.
3. Stabilize AgentReady rule codes.
4. Add GitHub Action wrapper.
5. Publish agentready.json spec v0.1.
6. Add /agentready-ci public page.
7. Then run public site QA/polish.
```

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
