# TimeProofs AgentReady — CI/CD Strategy

## Purpose

This document defines how TimeProofs AgentReady should move from a browser utility into developer workflows through a CLI and CI/CD checks.

The goal is to make AgentReady a pre-deployment gate for agent-facing APIs and MCP tools.

## Core CI/CD promise

```txt
Fail the build before an unsafe or unclear agent-facing tool surface is deployed.
```

## Target users

```txt
- API developers;
- MCP server builders;
- AI platform teams;
- internal tooling teams;
- agencies building agent tools for clients;
- security-minded engineering teams.
```

## Architecture

The correct architecture is:

```txt
agentready-core
→ CLI package
→ GitHub Action wrapper
→ other CI examples
```

The GitHub Action should call the CLI. It should not duplicate scanner logic.

## Why CLI first

The CLI is universal:

```txt
- local terminal;
- GitHub Actions;
- GitLab CI;
- Bitbucket Pipelines;
- Docker;
- private enterprise runners;
- internal release scripts.
```

## Why GitHub Action second

The GitHub Action is the fastest adoption layer for GitHub users.

It should be simple:

```yaml
- uses: BACOUL/timeproofs@agentready-action-v0.1.0-alpha.0
  with:
    file: openapi.yaml
    type: openapi
    min-score: '80'
    fail-on: critical
```

For maximum supply-chain pinning after the owner checkpoint, use the full verified Action release commit:

```yaml
uses: BACOUL/timeproofs@<FULL_ACTION_RELEASE_COMMIT_SHA>
```

The repository-local development reference remains:

```yaml
uses: ./
```

## CLI target commands

```bash
agentready scan openapi ./openapi.yaml
agentready scan mcp ./mcp-tools.json
agentready simulate ./agentready.json ./scenario.json
agentready report ./agentready.json
```

## CI threshold commands

```bash
agentready scan openapi ./openapi.yaml --min-score 80 --fail-on critical
agentready scan mcp ./mcp-tools.json --min-score 80 --fail-on critical
```

## Exit codes

```txt
0 = pass
1 = valid scan, policy failed
2 = invalid input or CLI usage error
3 = unexpected internal error
```

## Minimum CI policy v1

A CI check should be able to fail when:

```txt
- score is below a configured threshold;
- a critical risk exists;
- a dangerous action lacks confirmation guidance;
- a required schema is missing;
- a tool has no clear name or description;
- an irreversible action lacks warning or recovery guidance;
- a simulation scenario fails.
```

## Example GitHub Action workflow

```yaml
name: AgentReady Check

on:
  pull_request:
    paths:
      - "openapi.yaml"
      - "mcp-tools.json"
      - "api/**/*.yaml"
      - "mcp/**/*.json"

jobs:
  agentready:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@v4
      - uses: BACOUL/timeproofs@agentready-action-v0.1.0-alpha.0
        with:
          file: openapi.yaml
          type: openapi
          min-score: '80'
          fail-on: critical
```

## Example GitLab CI

```yaml
agentready:
  image: node:20
  script:
    - npm install -g agentready
    - agentready scan openapi ./openapi.yaml --min-score 80 --fail-on critical
```

## Output artifacts

The CLI should write:

```txt
agentready.json
agentready-report.md
agentready-simulation.json
```

Optional output directory:

```bash
agentready scan openapi ./openapi.yaml --out ./agentready-output
```

Expected:

```txt
./agentready-output/agentready.json
./agentready-output/agentready-report.md
```

## Pull request value

A future GitHub Action can comment on a PR:

```txt
AgentReady Score: 72/100
Status: Needs fixes
Critical risks: 1
Top issue: refundOrder performs a dangerous action without confirmation guidance.
Recommended action: add confirmation requirement and max amount guardrail.
```

This should be a later enhancement. The first version only needs pass/fail and artifacts.

## Privacy principle

The CI runner should execute analysis locally.

Default behavior:

```txt
No OpenAPI file upload.
No MCP tool upload.
No source code upload.
No hosted scan required.
```

If paid licensing is later added, the only default network call should be a license entitlement check.

## CI/CD acceptance criteria

A first CI/CD-ready version is acceptable when:

```txt
- CLI can scan OpenAPI files;
- CLI can scan MCP tool files;
- CLI produces agentready.json;
- CLI produces Markdown report;
- CLI supports min-score;
- CLI supports fail-on severity;
- CLI returns correct exit codes;
- GitHub Action wrapper can run the CLI;
- docs include one GitHub Actions example;
- outputs remain compatible with Browser V1.
```

## Do not build yet

Do not add in the first CI/CD version:

```txt
- accounts;
- payments;
- dashboard;
- hosted scan storage;
- team management;
- runtime gateway;
- live MCP execution;
- LLM evaluation.
```

## Strategic goal

```txt
No agent-facing API or MCP server should be merged without an AgentReady check.
```

## Mandatory limitation text

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
