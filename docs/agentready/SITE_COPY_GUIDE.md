# AgentReady Site Copy Guide

## Purpose

This guide defines how public AgentReady pages should sound before HTML copy is rewritten.

The copy should help TimeProofs AgentReady become understood as a pre-deployment CI gate and portable standard for agent-facing OpenAPI and MCP tools.

## Tone

The public tone should be:

- clear;
- technical;
- sober;
- credible;
- direct;
- evidence-led;
- calm about risk.

The site should sound like a serious developer tool, not a hype page.

## Core Positioning

Canonical product sentence:

```txt
TimeProofs AgentReady is a pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

Primary promise:

```txt
Fail the build before unsafe agent-facing APIs or MCP tools are deployed.
```

Short product explanation:

```txt
AgentReady scans OpenAPI and MCP tool contracts for structural risks that can cause AI agents to misuse tools before those contracts reach production.
```

Trust sentence:

```txt
Static scan only. No API calls. No MCP execution. No file upload by default.
```

Mandatory limitation:

```txt
TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
```

## Phrases Allowed

Use these phrases freely when accurate:

```txt
Pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
Fail the build before unsafe agent-facing APIs or MCP tools are deployed.
Check APIs and MCP tools before AI agents use them.
A valid OpenAPI spec can still be unsafe for agents.
A working MCP tool can still be too vague, broad, or dangerous for agent use.
Static readiness scan for agent-facing contracts.
Local-first scanner for OpenAPI and MCP tool definitions.
Generate an AgentReady Score, Markdown report, and agentready.json.
Track findings with stable rule codes AR001-AR010.
Use agentready.json as the machine-readable readiness contract.
Run AgentReady locally or in CI.
Block uncontrolled critical risk before deploy.
Keep controlled high-risk actions visible without hiding them.
```

## Phrases To Avoid

Avoid these phrases:

```txt
Safe enough.
Guaranteed safe for AI agents.
Make your agents safe.
AI-proof your API.
World's safest AI security platform.
Enterprise-grade AI security suite.
Complete MCP security scanner.
Runtime firewall for agents.
Autonomous agent protection platform.
Certified safe.
Zero-risk AI tool calling.
Never let agents fail.
One-click compliance.
Upload your API for analysis.
Proof that your API is secure.
```

If a claim sounds absolute, soften it or tie it to the actual static readiness scope.

## Scanner, CLI, CI Gate, And Standard

Use these distinctions consistently.

### Scanner

The scanner is the analysis engine and UI flow.

Say:

```txt
The scanner reads OpenAPI or MCP tool definitions and identifies structural readiness risks.
```

Do not say:

```txt
The scanner proves the API is safe.
```

### CLI

The CLI is how developers run AgentReady locally or inside automation.

Say:

```txt
The CLI runs the same static checks from a terminal or CI runner.
```

Do not say:

```txt
The CLI monitors live agent behavior.
```

### CI Gate

The CI Gate is the policy decision that can pass or fail a build.

Say:

```txt
The CI Gate applies a policy such as --min-score 75 --fail-on critical and exits with code 0 or 1.
```

Do not say:

```txt
The CI Gate guarantees production safety.
```

### Standard

The standard is the portable contract and rule-code layer.

Say:

```txt
agentready.json and AR rule codes make AgentReady findings portable across reports, CI systems, and pull requests.
```

Do not say:

```txt
The standard is a certification.
```

## Homepage Wording

Recommended hero headline:

```txt
Fail the build before unsafe agent-facing APIs or MCP tools are deployed.
```

Recommended supporting copy:

```txt
TimeProofs AgentReady checks OpenAPI and MCP tool contracts for missing confirmation, unsafe parameters, vague tool descriptions, weak schemas, and recovery gaps before AI agents use them.
```

Recommended proof strip:

```txt
CLI alpha merged. GitHub Action wrapper available. Rule codes AR001-AR010 stable. agentready.json v0.1 published.
```

Recommended local-first copy:

```txt
Static scan only. No API calls, no MCP execution, and no file upload by default.
```

Recommended risk examples:

```txt
Refund without confirmation.
Delete user without explicit approval.
Send invoice to the wrong recipient.
Expose a webhook as an agent-callable tool.
Leak customer data through a search endpoint.
```

## CTA Wording

Primary CTAs:

```txt
Add AgentReady to CI
Scan OpenAPI
Scan MCP tools
View sample report
```

Secondary CTAs:

```txt
Read the GitHub Action guide
View agentready.json spec
Browse rule codes
See bad/fixed examples
```

Avoid:

```txt
Get protected
Secure my AI
Start free trial
Book enterprise demo
Guarantee safety
```

Do not use trial or demo language unless the product surface exists.

## GitHub Action Wording

Recommended short block:

```txt
Use AgentReady in GitHub Actions to block pull requests when an OpenAPI or MCP tools file fails your readiness policy.
```

Recommended policy block:

```txt
Recommended V1 policy: --min-score 75 --fail-on critical.
```

Recommended output block:

```txt
The action exposes score, status, report path, and agentready.json path as workflow outputs.
```

Avoid:

```txt
Install our cloud security agent.
Connect your production APIs.
Let TimeProofs monitor your traffic.
```

## agentready.json Wording

Recommended definition:

```txt
agentready.json is the machine-readable readiness contract produced by AgentReady.
```

Recommended value statement:

```txt
It carries the score, status, risk counts, analyzed tools, detected risks, stable rule codes, and recommendations.
```

Recommended compatibility statement:

```txt
detected_risks remains supported for compatibility. rule_codes is the stable format recommended for CI policies, waivers, and reporting. detected_rules provides readable details.
```

Avoid:

```txt
agentready.json certifies a tool as safe.
```

## Rule Codes Wording

Recommended definition:

```txt
AgentReady rule codes are stable identifiers for findings that developers can discuss in pull requests and track across CI runs.
```

Recommended examples:

```txt
AR002_MISSING_CONFIRMATION_BOUNDARY flags dangerous actions without a documented human confirmation boundary.
AR007_OVERBROAD_TOOL_SCOPE flags tool permissions that are broader than an agent should receive.
```

Recommended value statement:

```txt
Rule codes turn scanner findings into durable CI signals.
```

Avoid:

```txt
Rule codes are compliance controls.
Rule codes prove a system is secure.
```

## Limitations Wording

Use the mandatory limitation exactly:

```txt
TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
```

Recommended supporting copy:

```txt
AgentReady does not execute endpoints, connect to MCP servers, run LLM calls, replace penetration testing, or enforce runtime authorization.
```

Recommended positioning against adjacent tools:

```txt
Runtime guardrails enforce controls while an agent runs. Observability explains what happened after execution. AgentReady checks the tool contract before deployment.
```

Avoid:

```txt
AgentReady replaces guardrails.
AgentReady replaces security review.
AgentReady prevents all unsafe agent behavior.
```

## Bad Copywriting To Ban

Bad:

```txt
Make every AI agent safe with one click.
```

Why:

```txt
Absolute safety claim; unsupported.
```

Bad:

```txt
The ultimate AI security dashboard for your company.
```

Why:

```txt
Wrong category; implies dashboard and broad security platform.
```

Bad:

```txt
Upload your API and let our cloud inspect it.
```

Why:

```txt
Contradicts local-first static scan positioning.
```

Bad:

```txt
AgentReady certifies your MCP server as safe for autonomous use.
```

Why:

```txt
Certification and safety guarantee are not supported.
```

Bad:

```txt
Detect every vulnerability before deploy.
```

Why:

```txt
AgentReady identifies structural agent-readiness risks, not every vulnerability.
```

## Good Short Blocks

### CI Gate Block

```txt
AgentReady turns OpenAPI and MCP tool definitions into a CI decision.
Set a minimum score, fail on critical risk, and block unsafe tool contracts before deploy.
```

### Local-First Block

```txt
Scans run against local files. AgentReady does not call your APIs, execute MCP tools, or upload files by default.
```

### Standard Block

```txt
Each scan can produce agentready.json: a portable readiness contract with score, status, risk counts, rule codes, and recommendations.
```

### Rule-Code Block

```txt
AR001-AR010 give teams stable names for recurring agent-readiness failures, from unbounded write actions to missing confirmation boundaries.
```

### Examples Block

```txt
Bad fixtures fail the same policy that fixed fixtures pass. Refund, email, and file-tool examples show how AgentReady distinguishes uncontrolled danger from controlled risk.
```

### Limitation Block

```txt
AgentReady is not a penetration test and does not guarantee absolute safety. It is a static readiness check for agent-facing contracts.
```

## Review Checklist For Future Copy Changes

Before changing public copy, verify:

- the page says CI Gate when the topic is CI;
- the page does not collapse AgentReady into "just a scanner";
- the copy explains OpenAPI and MCP, not generic AI safety;
- the local-first/static scan model is clear;
- no backend, dashboard, Stripe, or hosted scan is implied;
- rule codes and `agentready.json` are described as standards, not certifications;
- the mandatory limitation appears on trust, standard, and limitation pages;
- CTAs point to pages or flows that actually exist;
- examples use real product behavior, not vague scenarios;
- no legacy proof-of-existence wording returns.

