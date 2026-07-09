# TimeProofs AgentReady

**TimeProofs AgentReady** is a pre-deployment CI gate for agent-facing OpenAPI and MCP tools.

It checks whether an API, MCP server, or tool schema is clear, bounded, and documented enough to be exposed to AI agents before those agents use it.

## Product Sentence

> See where AI agents will fail before they use your API or MCP tools.

## Current Direction

TimeProofs is now focused on AgentReady:

```txt
OpenAPI / MCP / tool schema
-> static AgentReady analysis
-> AgentReady Score
-> AgentReady Report
-> agentready.json
-> CLI / CI gate
```

The previous proof-of-existence product is legacy historical material. Do not rebuild timestamp, verify, ProofSpec, `.tproof.json`, `selfhost/`, or the old SDK unless explicitly requested.

## Current State

```txt
Done: static OpenAPI JSON/YAML browser scanner
Done: static MCP tools JSON browser scanner
Done: static scenario simulation
Done: agentready.json export
Done: Markdown report export
Done: browser print / Save as PDF
Done: public docs and examples pages
Done: browser test harness
Done: legacy proof notes archived
Done: legacy proof runtime artifacts removed
Done: CLI alpha merged
Done: AgentReady core tests: 18/18 passed
Done: AgentReady CLI tests: PASS
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

The previous next step, `qa(agentready): run Browser V1 public-site QA`, is deferred until after the CLI/CI gate story is stable enough to present.

This next PR must validate AgentReady as a CI gate, not as a simple scanner score comparison. For each commercial bad/fixed pair, the report should show:

```txt
score bad
policy result bad: PASS / FAIL
why bad should block a build
score fixed
policy result fixed: PASS / FAIL
why fixed can pass
findings critical/high/medium/low
delta score
verdict gate-ready: PASS / WEAK / FAIL
```

Success means the bad version fails a realistic policy while the fixed version passes the same policy, or at minimum the fixed version clearly reduces high/critical risk.

## Browser Product

Public static pages:

```txt
/                              AgentReady homepage
/agentready.html               OpenAPI scanner
/agentready-mcp.html           MCP tools scanner
/agentready-simulation.html    Static scenario simulation
/agentready-docs.html          Documentation
/agentready-examples.html      Examples
/agentready-test.html          Browser test harness, noindex
/pricing.html                  Manual commercial path
```

Browser scanning is local-first:

```txt
No backend scan submission
No file upload to TimeProofs
No live API execution
No live MCP execution
No LLM call
```

## CLI Alpha

The CLI alpha is merged for local and CI-oriented use.

Examples:

```bash
node bin/agentready.js --help
node bin/agentready.js scan openapi ./agentready-examples/valid-simple-openapi.json --out ./agentready-output
node bin/agentready.js scan mcp ./agentready-examples/mcp-tools-simple.json --out ./agentready-output
node bin/agentready.js scan openapi ./agentready-examples/dangerous-actions-openapi.json --min-score 80 --fail-on critical
```

The CLI is not yet a GitHub Action. Do not add a GitHub Action wrapper before the commercial CI gate validation and rule-code stabilization steps are complete.

## Main Files

```txt
index.html
agentready.html
agentready-mcp.html
agentready-simulation.html
agentready-docs.html
agentready-examples.html
agentready-test.html
agentready-core/
agentready-examples/
bin/agentready.js
cli/tests/
docs/agentready/
```

## Validation

Preferred commands:

```bash
npm run test:agentready-core
npm run test:agentready-cli
```

If `npm` is unavailable in the local terminal, run the direct Node equivalents:

```bash
node agentready-core/tests/run-agentready-core-tests.mjs
node cli/tests/run-agentready-cli-tests.mjs
```

Expected results:

```txt
AgentReady core tests: 18/18 passed
AgentReady CLI tests: PASS
```

## Boundaries

Do not add yet:

```txt
GitHub Action
dashboard
Stripe
backend scanner
database
account system
runtime firewall
public safety badge
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
```

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
