# TimeProofs AgentReady - Project Context

## Read This First

This file is the operating compass for the repository.

Active direction:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

## Product Vision

TimeProofs AgentReady checks whether an API, MCP server, or tool schema is ready to be exposed to AI agents before those agents use it.

Product sentence:

```txt
See where AI agents will fail before they use your API or MCP tools.
```

Internal compass:

```txt
Other companies secure the agent while it acts.
TimeProofs prepares the tool before the agent can use it.
```

## Active Product Flow

```txt
OpenAPI / MCP / tool schema
-> AgentReady analysis
-> AgentReady Score
-> AgentReady Report
-> agentready.json
-> CLI / CI gate
```

## Current Repo Status

```txt
Done: static OpenAPI JSON/YAML scanner
Done: static MCP tools JSON scanner
Done: static scenario simulation
Done: agentready.json export
Done: agentready-simulation.json export
Done: Markdown report export
Done: browser print / Save as PDF
Done: public docs and examples pages
Done: browser test harness
Done: commercial bad/fixed fixtures added
Done: controlled-risk scanner improvements merged
Done: legacy proof notes archived under docs/agentready/legacy/
Done: legacy proof runtime artifacts removed
Done: CLI alpha merged
Done: AgentReady core tests: 18/18 passed
Done: AgentReady CLI tests: PASS
```

Removed legacy artifacts:

```txt
selfhost/
sdk/timeproof.js
manifest.json
manifest.webmanifest
```

## Official Execution Sequence

```txt
1. CLI alpha merged.
2. Validate commercial bad/fixed CI gate behavior.
3. Stabilize AgentReady rule codes.
4. Add GitHub Action wrapper.
5. Publish agentready.json spec v0.1.
6. Add /agentready-ci public page.
7. Then run public site QA/polish.
```

Current next PR:

```txt
qa(agentready): validate commercial fixture CI gate behavior
```

The older next step:

```txt
qa(agentready): run Browser V1 public-site QA
```

is deferred until after the CLI/CI gate story is aligned.

## Current Technical Surface

Core scanner:

```txt
agentready-core/
```

CLI:

```txt
bin/agentready.js
cli/tests/run-agentready-cli-tests.mjs
```

Fixtures:

```txt
agentready-examples/
agentready-examples/commercial/
```

Public static pages:

```txt
index.html
agentready.html
agentready-mcp.html
agentready-simulation.html
agentready-docs.html
agentready-examples.html
agentready-test.html
agentready-sample-report.html
pricing.html
```

## Non-Goals

Do not add unless explicitly requested:

```txt
GitHub Action
dashboard
Stripe
backend scanner
database
account system
runtime firewall
live API execution
live MCP execution
LLM evaluator
```

Do not reintroduce:

```txt
selfhost/
sdk/timeproof.js
manifest.json
manifest.webmanifest
timestamp API
verify API
ProofSpec as active product direction
.tproof.json as active product direction
```

## Tests

Preferred:

```bash
npm run test:agentready-core
npm run test:agentready-cli
```

If `npm` is unavailable:

```bash
node agentready-core/tests/run-agentready-core-tests.mjs
node cli/tests/run-agentready-cli-tests.mjs
```

Expected:

```txt
AgentReady core tests: 18/18 passed
AgentReady CLI tests: PASS
```

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
