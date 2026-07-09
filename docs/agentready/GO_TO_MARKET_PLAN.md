# TimeProofs AgentReady — Go-To-Market Plan

## Purpose

This document defines the initial go-to-market strategy for TimeProofs AgentReady.

The goal is not to launch a heavy SaaS immediately. The goal is to become the reference for agent-facing API and MCP readiness.

## Positioning

```txt
TimeProofs AgentReady is a pre-deployment readiness scanner for APIs and MCP tools exposed to AI agents.
```

Short version:

```txt
Check APIs and MCP tools before AI agents use them.
```

## Problem to own

```txt
A valid OpenAPI spec or MCP tool definition is not always agent-ready.
```

Why:

```txt
- operation names can be ambiguous;
- tool descriptions can be vague;
- critical actions may lack human confirmation;
- parameters may be unbounded;
- error messages may not help the agent recover;
- responses may expose sensitive data;
- MCP tools may have missing schemas or broad permissions.
```

## Target users

### Primary target 1 — MCP builders

People building MCP servers and tools need a way to check whether their tools are clear, bounded, and safe enough for agent use.

Message:

```txt
Before publishing your MCP tools, check whether agents can understand and safely use them.
```

### Primary target 2 — API developers exposing tools to agents

Teams are turning existing OpenAPI specs into agent tools.

Message:

```txt
Your OpenAPI spec can be valid and still fail with AI agents. TimeProofs checks agent-readiness before deployment.
```

### Primary target 3 — AI agencies and freelancers

Agencies building agents for clients need a quick readiness report to show risk and professionalism.

Message:

```txt
Give clients a concrete AgentReady report before connecting agents to their APIs or MCP tools.
```

### Secondary target — security-minded engineering teams

They care about dangerous actions, confirmation, and release gates.

Message:

```txt
Add pre-deployment readiness checks before agent-facing tools go live.
```

## Acquisition channels

## 1. SEO / GEO technical pages

Create factual, technical, markdown-friendly pages around:

```txt
- why AI agents fail with valid OpenAPI specs;
- OpenAPI mistakes that break tool calling;
- MCP tool readiness checklist;
- dangerous agent tool actions;
- human confirmation for AI agent tools;
- what is agentready.json;
- agent-facing API checklist;
- agent-ready MCP server checklist.
```

Goal:

```txt
Become a source that search engines and generative engines can use when developers ask why agents fail with APIs/tools.
```

## 2. GitHub credibility

The repo should clearly show:

```txt
- local-first browser scanner;
- agentready-core;
- examples;
- test harness;
- agentready.json spec;
- future CLI scope;
- no fake safety claims;
- clear roadmap.
```

Goal:

```txt
Earn developer trust before asking for payment.
```

## 3. Commercial demos

The first demos should be:

```txt
1. OpenAPI refund/payment risk;
2. MCP email send risk;
3. MCP file delete/export risk.
```

Goal:

```txt
Make the risk obvious in less than 60 seconds.
```

## 4. Direct community testing

After Browser V1 strict QA is acceptable, share the tool carefully with:

```txt
- MCP builders;
- AI builders;
- devtool communities;
- small AI agencies;
- GitHub open-source MCP repos;
- technical founders building agents.
```

Ask for:

```txt
- one scan;
- one bug report;
- one missing risk;
- one CLI use case;
- one willingness-to-pay signal.
```

## 30-day goals

```txt
1. Browser V1 strict QA understood or completed.
2. Production mobile QA documented.
3. Competitive positioning documented.
4. Automated product strategy documented.
5. CI/CD strategy documented.
6. Commercial demos plan documented.
7. Three commercial fixtures created.
8. Sample report improved around real demos.
9. At least 5 external developers or builders asked for feedback.
10. At least 1 concrete CLI/CI/CD demand signal collected.
```

## 60-day goals

```txt
1. CLI alpha scoped and started.
2. CLI can scan OpenAPI locally.
3. CLI can scan MCP tools locally.
4. CLI can generate agentready.json.
5. CLI can return CI exit codes.
6. GitHub Action wrapper planned.
7. Public content pages improved with commercial demos.
8. First external feedback integrated into risk taxonomy.
```

## 90-day goals

```txt
1. CLI beta usable.
2. GitHub Action beta usable.
3. AgentReady policy thresholds usable.
4. At least 10 real scans from external users.
5. At least 3 serious dev/agency conversations.
6. At least 1 paid-readiness or willingness-to-pay signal.
7. Decision: continue CLI Pro / policy packs / AgentReady Checked, or narrow positioning further.
```

## Monetization path

Do not start with a complex SaaS.

Potential path:

```txt
Free browser scan
→ free CLI
→ GitHub Action
→ policy packs
→ premium report export
→ AgentReady Checked
→ license key / Stripe / dashboard only after demand
```

## First paid offers to test

Only after usage signals:

```txt
- AgentReady Review: manual/semi-automated report for an API or MCP tool surface;
- Agency Pack: branded reports for agencies;
- CI Policy Pack: stricter rules and PR reporting;
- AgentReady Checked: check artifact and badge.
```

## Do not do yet

```txt
Do not run paid ads.
Do not build accounts.
Do not build Stripe first.
Do not build a dashboard first.
Do not claim safety certification.
Do not become a runtime monitoring product.
Do not pivot away from agent-facing API/MCP readiness for 90 days.
```

## Core success signal

The strongest signal is not traffic alone.

The strongest signal is:

```txt
A developer wants AgentReady in their CI/CD pipeline before exposing APIs or MCP tools to agents.
```

## Mandatory limitation text

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
