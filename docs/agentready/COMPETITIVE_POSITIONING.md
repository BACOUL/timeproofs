# TimeProofs AgentReady — Competitive Positioning

## Purpose

This document defines how TimeProofs AgentReady should be positioned against adjacent AI-agent, API, MCP, security, guardrail, and observability products.

The goal is to keep TimeProofs focused, complementary, and hard to confuse with heavier runtime or monitoring platforms.

## Core category

```txt
Pre-deployment readiness for agent-facing APIs and MCP tools.
```

TimeProofs AgentReady checks whether an API, MCP server, or tool schema is ready to be clearly and safely exposed to AI agents before those agents use it.

## Product sentence

```txt
See where AI agents will fail before they use your API or MCP tools.
```

## Market sentence

```txt
A valid OpenAPI spec or MCP tool definition is not always agent-ready.
```

## Internal compass

```txt
Before runtime: TimeProofs detects structural risks.
During runtime: guardrails enforce controls.
After runtime: observability tools explain what happened.
```

## What TimeProofs is

TimeProofs is:

```txt
- a static readiness scanner;
- a local-first browser scanner;
- a future CLI and CI/CD check;
- a producer of agentready.json;
- a producer of agentready-simulation.json;
- a way to identify structural risks before deployment;
- a way to recommend runtime controls, observability tags, and simulation scenarios later.
```

## What TimeProofs is not

TimeProofs is not:

```txt
- an AI runtime firewall;
- an agent observability platform;
- a replacement for LangSmith, Langfuse, Phoenix, Laminar, or tracing tools;
- a replacement for guardrails;
- a broad AI security platform;
- a pentest product;
- a generic OpenAPI linter;
- a live MCP execution platform;
- a compliance certification product;
- a guarantee that an agent will never fail.
```

## Competitive map

| Category | Typical role | TimeProofs position |
|---|---|---|
| Agent observability | Trace prompts, tool calls, cost, latency, failures during or after execution | Complementary. TimeProofs gives risk context before execution. |
| Runtime guardrails | Block or modify risky calls while an agent runs | Complementary. TimeProofs identifies where guardrails should be required. |
| API security scanners | Detect security vulnerabilities, auth issues, exposure risks | Adjacent. TimeProofs focuses on agent-readiness and misuse risk, not full API security. |
| MCP security scanners | Detect MCP security vulnerabilities or malicious servers | Adjacent. TimeProofs focuses on structure, ambiguity, side effects, and readiness. |
| OpenAPI linters | Validate syntax and API style | Adjacent. A syntactically valid OpenAPI file can still be unsafe or unclear for an AI agent. |
| OpenAPI-to-MCP generators | Convert specs into MCP tools | Complementary. TimeProofs checks whether the resulting tools are agent-ready. |
| Manual AI audits | Human review of agent/tool risk | TimeProofs should automate the first pass and make human review more structured. |

## Main differentiation

```txt
Most adjacent products observe, secure, or execute agents.
TimeProofs prepares the tool surface before the agent can use it.
```

## Risk types to own

TimeProofs should become the reference for these structural agent-readiness risks:

```txt
- ambiguous operation names;
- vague tool descriptions;
- missing when-to-use guidance;
- missing when-not-to-use guidance;
- dangerous actions without confirmation;
- irreversible actions;
- unbounded parameters;
- missing enums;
- overbroad permissions;
- sensitive data exposure;
- missing success verification;
- weak error recovery;
- large unstructured responses;
- agent context confusion;
- unclear output schemas;
- MCP tools without required fields;
- MCP dangerous tools with weak descriptions.
```

## Messaging against observability tools

Do not say:

```txt
TimeProofs replaces observability.
```

Say:

```txt
Observability shows what happened after an agent ran.
TimeProofs highlights structural risks before the agent runs.
```

## Messaging against guardrails

Do not say:

```txt
TimeProofs replaces guardrails.
```

Say:

```txt
Guardrails enforce controls at runtime.
TimeProofs tells you which tools need those controls before deployment.
```

## Messaging against security scanners

Do not say:

```txt
TimeProofs is a complete MCP or API security scanner.
```

Say:

```txt
TimeProofs focuses on agent-readiness: whether an AI agent can safely understand, select, parameterize, execute, and recover from a tool call.
```

## Strategic wedge

The narrow wedge is:

```txt
Agent-facing API readiness.
MCP tool readiness.
Static pre-deployment checks.
agentready.json as the machine-readable contract.
```

## Long-term position

The long-term goal is to make AgentReady a default pre-flight check:

```txt
No agent-facing API or MCP server should be published without an AgentReady check.
```

## Mandatory limitation text

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
