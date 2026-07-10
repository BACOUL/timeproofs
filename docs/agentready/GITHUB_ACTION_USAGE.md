# GitHub Action Usage

TimeProofs AgentReady can run as a pre-deployment CI gate for agent-facing OpenAPI and MCP tools.

The action wraps the AgentReady CLI and fails the job when the configured policy fails. It is a static scan: it reads the contract file in the GitHub Actions workspace and does not call live APIs, MCP servers, LLMs, or a hosted TimeProofs backend.

The generated contract path points to an `agentready.json` file following the published v0.1 contract described in [AGENTREADY_JSON_SPEC.md](AGENTREADY_JSON_SPEC.md).

Versioning rules are described in [GITHUB_ACTION_VERSIONING.md](GITHUB_ACTION_VERSIONING.md).

## Current Local Usage

For a consumer repository that vendors or checks out the action locally:

```yaml
- uses: actions/checkout@v4

- uses: actions/setup-node@v4
  with:
    node-version: '20'

- name: AgentReady OpenAPI CI gate
  id: agentready
  uses: ./.github/actions/agentready
  with:
    type: openapi
    file: ./openapi.json
    min-score: '75'
    fail-on: critical
    out: agentready-output
```

This is the currently testable mode in this repository's integration workflow.

## Development Branch Reference - Not A Stable Release

This can be used only for temporary development testing:

```yaml
uses: BACOUL/timeproofs/.github/actions/agentready@timeproofs
```

Do not treat the `timeproofs` branch as a stable production reference.

## Planned Versioned Reference - Tag Not Created Yet

Future planned reference:

```yaml
uses: BACOUL/timeproofs/.github/actions/agentready@v0.1.0-alpha.0
```

This tag does not exist yet. It must not be documented as available until the Community release workflow creates it.

## Runner Support

Currently validated target:

- `ubuntu-latest`;
- Node.js 20.

Windows and macOS are not claimed as supported until those runners are executed successfully.

## Inputs

| Input | Required | Default | Description |
| --- | --- | --- | --- |
| `file` | yes | none | Path to the OpenAPI document or MCP tools JSON file. |
| `type` | yes | none | `openapi` or `mcp`. |
| `min-score` | no | `75` | Minimum score required for the gate to pass. Must be between 0 and 100. |
| `fail-on` | no | `critical` | Fails when risks at or above this severity are detected. Use `critical`, `high`, `medium`, `low`, or `none`. |
| `out` | no | `agentready-output` | Directory for the generated report and contract files. |

## Outputs

| Output | Description |
| --- | --- |
| `score` | AgentReady score returned by the scan when valid JSON output exists. |
| `status` | AgentReady status returned by the scan when valid JSON output exists. |
| `report-path` | Path to the generated Markdown report when it exists. |
| `contract-path` | Path to the generated `agentready.json` contract when it exists. |

## Gate Behavior

The recommended V1 policy is:

```yaml
min-score: '75'
fail-on: critical
```

With that policy, the job fails when the score is below 75 or any critical risk is detected. The CLI exit code is preserved:

- `0` means the policy passed.
- `1` means the scan was valid but the AgentReady policy failed.
- `2` means invalid input or CLI usage error.
- `3` means an unexpected internal error.

A valid policy failure still produces outputs, reports, and contracts when the CLI completed the scan.

## MCP Example

```yaml
- name: AgentReady MCP CI gate
  id: agentready_mcp
  uses: ./.github/actions/agentready
  with:
    type: mcp
    file: ./mcp-tools.json
    min-score: '75'
    fail-on: critical
    out: agentready-output/mcp
```

## What The Action Does Not Do

- It does not publish to GitHub Marketplace.
- It does not require a TimeProofs account.
- It does not call TimeProofs services.
- It does not upload OpenAPI files, MCP definitions, reports, or secrets.
- It does not install `@timeproofs/agentready` from npm while the package is unpublished.

## Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
