# GitHub Action Usage

TimeProofs AgentReady can run as a pre-deployment CI gate for agent-facing OpenAPI and MCP tools.

The action wraps the AgentReady CLI and fails the job when the configured policy fails. It is a static scan: it reads the contract file in the GitHub Actions workspace and does not call live APIs, MCP servers, LLMs, or a hosted TimeProofs backend.

## Action

Use the repository action after checking out your code and installing Node.js 20 or newer:

```yaml
- uses: actions/checkout@v4

- uses: actions/setup-node@v4
  with:
    node-version: '20'

- name: AgentReady OpenAPI CI gate
  id: agentready
  uses: BACOUL/timeproofs/.github/actions/agentready@timeproofs
  with:
    type: openapi
    file: ./openapi.json
    min-score: '75'
    fail-on: critical
    out: agentready-output
```

For a local vendored copy inside the same repository, use:

```yaml
uses: ./.github/actions/agentready
```

## Inputs

| Input | Required | Default | Description |
| --- | --- | --- | --- |
| `file` | yes | none | Path to the OpenAPI document or MCP tools JSON file. |
| `type` | yes | none | `openapi` or `mcp`. |
| `min-score` | no | `75` | Minimum score required for the gate to pass. |
| `fail-on` | no | `critical` | Fails when risks at or above this severity are detected. Use `critical`, `high`, `medium`, `low`, or `none`. |
| `out` | no | `agentready-output` | Directory for the generated report and contract files. |

## Outputs

| Output | Description |
| --- | --- |
| `score` | AgentReady score returned by the scan. |
| `status` | AgentReady status returned by the scan. |
| `report-path` | Path to the generated Markdown report. |
| `contract-path` | Path to the generated `agentready.json` contract. |

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

## MCP Example

```yaml
- name: AgentReady MCP CI gate
  id: agentready_mcp
  uses: BACOUL/timeproofs/.github/actions/agentready@timeproofs
  with:
    type: mcp
    file: ./mcp-tools.json
    min-score: '75'
    fail-on: critical
    out: agentready-output/mcp
```

## Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
