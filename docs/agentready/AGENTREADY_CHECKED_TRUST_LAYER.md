# TimeProofs AgentReady — AgentReady Checked Trust Layer

## Purpose

AgentReady Checked is a future trust layer for API and MCP tool surfaces that have been scanned against the AgentReady contract and static simulation scenarios.

It must stay careful, limited and factual.

It is not a safety guarantee.

## Core idea

AgentReady Checked means:

```txt
A specific API, MCP tool set or tool schema was checked against AgentReady structural risk rules and static simulation scenarios at a specific time, using specific input files, producing specific artifacts.
```

## What it checks

AgentReady Checked should be based on:

```txt
agentready.json
agentready-simulation.json
scan report
simulation scenario set
score threshold
critical risk policy
human confirmation policy
metadata about the checked input
```

## What it does not mean

AgentReady Checked must not mean:

```txt
The API is perfectly safe.
The MCP server is perfectly safe.
An AI agent will never fail.
No harmful action can happen.
Runtime authorization is solved.
Security testing is complete.
Human review is no longer needed.
```

## Candidate badge wording

Possible careful wording:

```txt
AgentReady Checked
Checked for AI-agent readiness risks
Static readiness scan completed
Agent tool surface reviewed with AgentReady
```

Avoid wording such as:

```txt
AI-safe
Agent-proof
Guaranteed safe
Certified safe
No agent failure possible
Fully protected
```

## Minimum required artifacts

An AgentReady Checked claim should require at least:

```txt
agentready.json
agentready-simulation.json
human-readable report
input source metadata
scan timestamp
AgentReady version
simulation version
risk summary
known limitations
```

## Suggested metadata

A future checked artifact may include:

```txt
checked_id
checked_at
agentready_version
simulation_version
source_type
source_name
source_hash
score
risk_counts
critical_risks
high_risks
scenario_count
simulation_pass_count
simulation_warning_count
simulation_fail_count
simulation_not_applicable_count
policy_result
valid_until
artifact_hash
```

## Score policy draft

Draft only:

```txt
PASS candidate: score >= 80 and no unresolved critical risk
REVIEW candidate: score 60-79 or unresolved high risks
FAIL candidate: score < 60 or unresolved critical risks
```

This policy should not be final until real-world examples are tested.

## Risk severity policy draft

```txt
Critical risks must be resolved or explicitly documented with a human confirmation rule.
High risks must be reviewed and documented.
Medium risks should have recommendations.
Low risks should be listed but should not block by default.
```

## Human confirmation policy draft

AgentReady Checked should pay special attention to actions that may require human confirmation.

Examples:

```txt
delete file
refund payment
send email
export customer data
modify account
cancel subscription
transfer funds
change permissions
```

A checked surface should clearly identify:

```txt
which tools require confirmation
why confirmation is required
what input fields matter
what action should be blocked without confirmation
```

## Scenario coverage policy draft

AgentReady Checked should require at least a minimal scenario set.

Possible categories:

```txt
wrong tool selection
wrong parameter
unsafe action without confirmation
unrecoverable error
sensitive data exposure
```

Minimum draft requirement:

```txt
At least one scenario for every high-risk or critical action category.
```

This requirement may be adjusted after real examples.

## Validity period draft

A checked result should not be permanent.

Draft options:

```txt
30 days for fast-changing tools
90 days for normal product surfaces
12 months only for stable, versioned public API specs
```

A checked result should become stale when:

```txt
OpenAPI spec changes
MCP tool definitions change
high-risk actions are added
confirmation behavior changes
AgentReady contract version changes significantly
```

## Verification concept

Future verification could check:

```txt
artifact hash
agentready.json hash
agentready-simulation.json hash
checked timestamp
validity status
score summary
risk summary
input source hash
```

This should remain a future trust layer, not the main product in the current phase.

## Public claim policy

Do not publicly display AgentReady Checked until:

```txt
Browser V1 QA is PASS.
The checked criteria are documented.
The checked artifact shape is stable.
The limitation text is visible.
The wording avoids safety guarantees.
```

## Relationship to old TimeProofs

AgentReady Checked can reuse the idea of proof, hash, verification, or timestamp later.

But it should not rebuild the old proof-of-existence product as the main product.

The trust layer exists to support AgentReady, not replace it.

## Future product paths

Possible later versions:

```txt
free local scan
paid AgentReady report
AgentReady Checked badge
hash-based verification page
team policy pack
CI badge
agency audit report
```

## Non-goals now

```txt
No public badge launch.
No certification claim.
No paid checked badge.
No verification backend.
No accounts.
No payments.
No dashboard.
No runtime firewall.
No safety guarantee.
```

## Acceptance criteria for this concept

This concept is ready when:

```txt
The meaning of AgentReady Checked is clear.
The required artifacts are clear.
The score and risk policies are drafted.
The wording avoids overclaiming.
The trust layer remains separate from runtime execution.
The mandatory limitation text is included.
```

## Mandatory limitation text

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.