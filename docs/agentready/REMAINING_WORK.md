# TimeProofs AgentReady - Remaining Work

## Product Principle

TimeProofs AgentReady is a pre-deployment CI gate for agent-facing OpenAPI and MCP tools.

The project should move from browser scanner to CLI to CI gate without adding SaaS complexity too early.

## Current Status

```txt
Browser OpenAPI scanner: built
Browser MCP scanner: built
Static simulation: built
Commercial fixtures: added
Legacy proof notes: archived
Legacy proof runtime artifacts: removed
CLI alpha: merged
Core tests: 18/18 passed
CLI tests: PASS
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

## Priority 1 - Commercial CI Gate Validation

Next PR:

```txt
qa(agentready): validate commercial fixture CI gate behavior
```

Goal:

```txt
Prove that AgentReady can act as a CI gate by blocking unsafe commercial bad fixtures and allowing controlled fixed fixtures under a realistic policy.
```

Acceptance:

```txt
each bad/fixed pair reports score, policy result, risk counts, delta score, and gate-ready verdict
bad fixtures fail a realistic policy and explain why they should block a build
fixed fixtures pass the same policy, or clearly reduce high/critical risk
fixed fixtures explain confirmation, bounds, schemas, errors, or output better
results are documented as CI Gate validation without changing the public product
```

## Priority 2 - Rule-Code Stabilization

Goal:

```txt
Make risk codes stable enough for CLI output, reports, CI policy checks, and customer-facing documentation.
```

Acceptance:

```txt
rule codes are documented
commercial fixtures map to predictable codes
dangerous actions are not hidden
controlled dangerous actions are not treated as uncontrolled danger
```

## Priority 3 - GitHub Action Wrapper

Goal:

```txt
Wrap the merged CLI alpha for CI checks.
```

Do not start before fixture contrast and rule-code stabilization.

## Priority 4 - agentready.json Spec v0.1

Goal:

```txt
Publish a stable v0.1 contract for scanner output.
```

It should support:

```txt
browser scanner
CLI scanner
CI wrapper
commercial review reports
future public documentation
```

## Priority 5 - /agentready-ci Public Page

Goal:

```txt
Explain the CLI/CI gate story publicly after it is coherent.
```

Do not create this page in roadmap-only PRs.

## Priority 6 - Public Site QA / Polish

The earlier next step:

```txt
qa(agentready): run Browser V1 public-site QA
```

is deferred until after the CLI/CI gate sequence is stable.

When resumed, QA should verify:

```txt
homepage
OpenAPI scanner
MCP scanner
static simulation
export downloads
print / Save as PDF
Network tab no-execution checks
mobile navigation
public docs/examples
```

## Do Not Build Yet

```txt
dashboard
Stripe
backend scanner
database
account system
runtime firewall
live MCP execution
LLM evaluator
new public commercial page before fixture contrast is validated
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
