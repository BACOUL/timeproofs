# TODO Next - TimeProofs AgentReady

## Current Completed Base

```txt
Done: AgentReady positioning
Done: static OpenAPI JSON/YAML scanner
Done: static MCP tools JSON scanner
Done: static simulation page
Done: agentready.json export
Done: agentready-simulation.json export
Done: Markdown report export
Done: browser print / Save as PDF reports
Done: public docs and examples pages
Done: browser test harness
Done: commercial bad/fixed fixtures added
Done: controlled-risk scanner improvements merged
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

## Immediate Next PR

```txt
qa(agentready): validate commercial fixture CI gate behavior
```

## CI Gate Validation Requirements

Run the scanners against:

```txt
agentready-examples/commercial/openapi-refund-risk.bad.json
agentready-examples/commercial/openapi-refund-risk.fixed.json
agentready-examples/commercial/mcp-email-risk.bad.json
agentready-examples/commercial/mcp-email-risk.fixed.json
agentready-examples/commercial/mcp-files-risk.bad.json
agentready-examples/commercial/mcp-files-risk.fixed.json
```

For each file, record:

```txt
score
status
finding count
critical/high count
top risk codes
requires_human_confirmation when present
```

Compare:

```txt
refund bad vs refund fixed
email bad vs email fixed
files bad vs files fixed
```

For each pair, write the report as a CI Gate validation:

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

Success criteria:

```txt
bad fixtures fail a realistic policy
fixed fixtures pass the same policy
or fixed fixtures at minimum clearly reduce high/critical risk
```

## Then

```txt
1. fix/docs(agentready): stabilize AgentReady rule codes
2. feat(agentready): add GitHub Action wrapper
3. docs(agentready): publish agentready.json spec v0.1
4. docs(product): add /agentready-ci public page
5. qa(agentready): run Browser V1 public-site QA/polish
```

## Deprioritized

```txt
qa(agentready): run Browser V1 public-site QA
```

This remains important, but it is no longer the immediate next PR. It should run after the CLI/CI gate narrative and spec are stable enough to present.

## Do Not Build Yet

```txt
dashboard
Stripe
backend scanner
database
account system
runtime firewall
new public commercial page
```

## Do Not Reintroduce

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
