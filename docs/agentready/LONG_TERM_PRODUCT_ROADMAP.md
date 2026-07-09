# TimeProofs AgentReady - Long-Term Product Roadmap

## Direction

TimeProofs AgentReady is a pre-deployment CI gate for agent-facing OpenAPI and MCP tools.

The long-term product should be built around static readiness contracts, not runtime enforcement.

## Strategic Asset

The durable asset is:

```txt
AgentReady Score
agentready.json
risk taxonomy
stable rule codes
commercial CI gate fixture benchmark
CLI and CI workflow
AgentReady Checked report criteria
developer education around agent-facing tool risks
```

## Current Base

```txt
Browser scanner foundation built
MCP scanner built
Static simulation built
CLI alpha merged
Legacy proof runtime removed
Commercial fixtures available
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

## V1 - Static Browser and CLI Foundation

Included:

```txt
OpenAPI browser scanner
MCP browser scanner
Static simulation
agentready.json
Markdown reports
CLI alpha
CLI tests
commercial fixtures
```

Status:

```txt
Built.
Needs commercial CI gate validation.
Needs rule-code stabilization.
```

## V1.1 - CI Gate Foundation

Goal:

```txt
Turn the CLI alpha into a stable CI gate story.
```

Sequence:

```txt
commercial CI gate validation
rule-code stabilization
GitHub Action wrapper
agentready.json spec v0.1
/agentready-ci public page
```

## V1.2 - Public Site QA / Polish

Goal:

```txt
Validate the full public static site after the CLI/CI story is aligned.
```

This includes browser QA, mobile navigation, export checks, and Network tab no-execution checks.

## V2 - AgentReady Checked

Goal:

```txt
Offer a careful report or badge-style trust layer for surfaces checked against AgentReady criteria.
```

Boundary:

```txt
This is not a safety guarantee.
This must not claim agents will never fail.
This should be based on stable rule codes and reproducible scanner output.
```

## V3 - Benchmarks and Education

Goal:

```txt
Publish useful patterns about why agent-facing APIs and MCP tools fail.
```

Possible outputs:

```txt
commercial CI gate fixture benchmark
agent-facing API risk examples
MCP tool readiness checklist
rule-code reference
agentready.json examples
```

## Later Only If Demand Is Clear

```txt
private readiness review workflow
team reports
commercial report templates
paid policy packs
advanced fixture suites
```

Avoid too early:

```txt
dashboard
Stripe
backend scanner
large database
account system
runtime firewall
agent observability platform
```

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
