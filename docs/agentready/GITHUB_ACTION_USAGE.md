# GitHub Action Usage

Status: ACTIVE DISTRIBUTION DOCUMENTATION

TimeProofs AgentReady runs as a pre-deployment CI gate for agent-facing OpenAPI and MCP contracts.

The Action wraps the AgentReady CLI and fails the job when the configured policy fails. It performs static analysis in the GitHub Actions workspace. It does not call live APIs, MCP servers, LLMs, or a hosted TimeProofs backend.

The generated contract path points to an `agentready.json` v0.1 file described in `AGENTREADY_JSON_SPEC.md`.

Versioning and Marketplace execution rules are defined in:

- `GITHUB_ACTION_VERSIONING.md`;
- `GITHUB_ACTION_MARKETPLACE_EXECUTION_SPEC.md`.

## Current Immutable Historical Alpha Reference

The existing immutable repository release exposes the previous nested Action layout:

```yaml
- uses: actions/checkout@v4

- uses: actions/setup-node@v4
  with:
    node-version: '20'

- name: AgentReady OpenAPI CI gate
  id: agentready
  uses: BACOUL/timeproofs/.github/actions/agentready@v0.1.0-alpha.0
  with:
    type: openapi
    file: ./openapi.json
    min-score: '75'
    fail-on: critical
    out: agentready-output
```

This is an immutable historical alpha source reference. It is not the root Marketplace Action.

External installation and runner support are validated separately in `ARB-COM-003`.

## Root Marketplace Reference Reserved By ARB-COM-002

After the owner completes Marketplace publication, the readable immutable reference will be:

```yaml
uses: BACOUL/timeproofs@agentready-action-v0.1.0-alpha.0
```

The security-hardened form will use the exact Action release commit:

```yaml
uses: BACOUL/timeproofs@<FULL_ACTION_RELEASE_COMMIT_SHA>
```

These root references must not be presented as publicly available until the Action tag and Marketplace listing are verified.

## Canonical Public Workflow After Publication

```yaml
name: AgentReady

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  agentready:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: AgentReady OpenAPI CI gate
        id: agentready
        uses: BACOUL/timeproofs@agentready-action-v0.1.0-alpha.0
        with:
          type: openapi
          file: ./openapi.json
          min-score: '75'
          fail-on: critical
          out: agentready-output
```

A hardened example must replace third-party Action tags and the AgentReady tag with full commit SHAs.

The Community Action requires only:

```yaml
permissions:
  contents: read
```

It does not require repository write access, pull-request write access, deployment access, identity-token access, package access, or secrets.

## Development Reference

The default branch may be used only for clearly labeled temporary development testing:

```yaml
uses: BACOUL/timeproofs@timeproofs
```

Do not use the default branch as a stable production reference.

## Inputs

| Input | Required | Default | Description |
| --- | --- | --- | --- |
| `file` | yes | none | Path to the OpenAPI document or MCP tools JSON file. |
| `type` | yes | none | `openapi` or `mcp`. |
| `min-score` | no | `75` | Minimum score required for the gate to pass. Must be between 0 and 100. |
| `fail-on` | no | `critical` | Fails when risks at or above this severity are detected. Use `critical`, `high`, `medium`, `low`, or `none`. |
| `out` | no | `agentready-output` | Directory for generated report and contract files. |

## Outputs

| Output | Description |
| --- | --- |
| `score` | AgentReady score returned when valid JSON output exists. |
| `status` | AgentReady status returned when valid JSON output exists. |
| `report-path` | Path to the generated Markdown report when it exists. |
| `contract-path` | Path to the generated `agentready.json` contract when it exists. |

## Gate Behavior

The recommended Community policy is:

```yaml
min-score: '75'
fail-on: critical
```

With this policy, the job fails when the score is below 75 or a critical risk is detected.

Exit codes:

- `0`: scan and policy passed;
- `1`: scan succeeded but policy failed;
- `2`: invalid input or CLI usage error;
- `3`: unexpected internal error.

A valid policy failure must preserve outputs, reports, and contracts when the CLI completed the scan.

## MCP Example After Publication

```yaml
- name: AgentReady MCP CI gate
  id: agentready_mcp
  uses: BACOUL/timeproofs@agentready-action-v0.1.0-alpha.0
  with:
    type: mcp
    file: ./mcp-tools.json
    min-score: '75'
    fail-on: critical
    out: agentready-output/mcp
```

Replace the tag with the full Action release commit SHA when maximum supply-chain pinning is required.

## Root Action Migration

`ARB-COM-002` must make `/action.yml` the single canonical Action metadata file used by Marketplace.

Repository workflows must migrate from:

```yaml
uses: ./.github/actions/agentready
```

to:

```yaml
uses: ./
```

The nested metadata file must be removed after all references and tests are migrated.

## What The Action Does Not Do

- It does not require a TimeProofs account.
- It does not require payment.
- It does not call TimeProofs services.
- It does not upload OpenAPI files, MCP definitions, reports, or secrets.
- It does not call live APIs, live MCP servers, or LLMs.
- It does not provide runtime protection.
- It does not certify or guarantee agent safety.

## Marketplace Status

At the start of `ARB-COM-002`:

- the repository is public;
- npm Community alpha is published;
- the historical nested Action source exists at `v0.1.0-alpha.0`;
- root `/action.yml` is not yet published;
- `agentready-action-v0.1.0-alpha.0` is reserved but not created;
- no Marketplace listing exists.

After the owner checkpoint, real Release and Marketplace references must replace all placeholders.

## Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools, or MCP servers.
