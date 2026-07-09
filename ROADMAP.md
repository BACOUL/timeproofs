# TimeProofs AgentReady Roadmap

## Direction

TimeProofs AgentReady is a pre-deployment CI gate for agent-facing OpenAPI and MCP tools.

The active product is not the legacy proof-of-existence system. The old timestamp/verify runtime, SDK, and manifests have been removed from the active repo.

## Product Flow

```txt
OpenAPI / MCP / tool schema
-> AgentReady analysis
-> AgentReady Score
-> AgentReady Report
-> agentready.json
-> CLI / CI gate
```

## Current Status

```txt
Done: static browser OpenAPI scanner
Done: static browser MCP scanner
Done: static scenario simulation
Done: agentready.json and Markdown report exports
Done: commercial bad/fixed fixtures added
Done: legacy notes archived
Done: legacy runtime artifacts removed
Done: CLI alpha merged
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

## Next PR

```txt
qa(agentready): validate commercial fixture CI gate behavior
```

Goal:

```txt
Run the commercial bad/fixed OpenAPI and MCP fixtures through the CLI/scanner with a realistic CI policy.
Confirm bad fixtures fail the gate and explain why they should block a build.
Confirm fixed fixtures pass the same gate, or at minimum clearly reduce high/critical risks.
Confirm fixed fixtures demonstrate controlled-risk improvements.
```

## Phase 1 - Commercial CI Gate Validation

Inputs:

```txt
agentready-examples/commercial/openapi-refund-risk.bad.json
agentready-examples/commercial/openapi-refund-risk.fixed.json
agentready-examples/commercial/mcp-email-risk.bad.json
agentready-examples/commercial/mcp-email-risk.fixed.json
agentready-examples/commercial/mcp-files-risk.bad.json
agentready-examples/commercial/mcp-files-risk.fixed.json
```

Per-pair report requirements:

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

## Phase 2 - Rule-Code Stabilization

Goal:

```txt
Make AgentReady rule codes stable enough for CLI, CI, reports, and customer-facing documentation.
```

Constraints:

```txt
Do not hide dangerous actions.
Distinguish uncontrolled dangerous actions from controlled dangerous actions.
Keep existing scanner behavior stable unless a rule-code inconsistency is found.
```

## Phase 3 - GitHub Action Wrapper

Goal:

```txt
Wrap the merged CLI alpha for repository checks.
```

Do not start this before commercial CI gate validation and rule-code stabilization.

## Phase 4 - agentready.json Spec v0.1

Goal:

```txt
Publish a stable machine-readable contract for AgentReady results.
```

The spec should support:

```txt
browser scanner
CLI scanner
CI policy checks
commercial review reports
future GitHub Action wrapper
```

## Phase 5 - /agentready-ci Page

Goal:

```txt
Explain the CI gate workflow publicly after the CLI and spec are coherent.
```

Do not create this page in documentation-only roadmap PRs.

## Phase 6 - Public Site QA / Polish

The earlier task:

```txt
qa(agentready): run Browser V1 public-site QA
```

is still important, but it is no longer the immediate next step. It should run after the CLI/CI gate narrative is aligned and documented.

## Later Product Ideas

Allowed later only after the static scanner, CLI, CI gate, and spec are useful:

```txt
AgentReady Checked report
private readiness review
commercial report packaging
benchmark datasets
education around agent-facing tool risks
```

Do not build yet:

```txt
dashboard
Stripe
account system
database
backend scanner
runtime firewall
live MCP execution
LLM evaluator
```

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
