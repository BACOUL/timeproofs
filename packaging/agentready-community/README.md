# AgentReady Community

AgentReady Community is a local-first CI gate for agent-facing OpenAPI
specifications and MCP tools. It analyzes contracts before deployment and
reports ambiguous, unbounded or insufficiently controlled agent actions.

The Community package includes:

- the `agentready` CLI;
- OpenAPI scans;
- MCP tool scans;
- score and PASS/FAIL status;
- `--min-score` and `--fail-on` policy controls;
- Markdown reports;
- `agentready.json` output for OpenAPI scans;
- MCP JSON output for MCP scans;
- AR001-AR010 Community rule codes.

## Publication Status

This package is prepared for a future npm publication, but it is not yet
published.

Planned public installation command - not yet available:

```sh
npm install @timeproofs/agentready
```

Planned one-off usage command - not yet available:

```sh
npx @timeproofs/agentready --help
```

Until publication is explicitly approved, AgentReady Community can be tested
only from the repository release-candidate tarball.

## Commands

```sh
agentready --help
agentready --version
agentready scan openapi ./openapi.json --min-score 75 --fail-on critical
agentready scan mcp ./mcp-tools.json --min-score 75 --fail-on critical
```

OpenAPI scans write:

- `agentready.json`;
- `agentready-report.md`.

MCP scans write:

- `agentready-mcp.json`;
- `agentready-mcp-report.md`.

## CI Gate Behavior

AgentReady returns:

- exit code `0` when the selected policy passes;
- exit code `1` when a valid scan fails the selected policy;
- exit code `2` for usage errors;
- exit code `3` for internal errors.

A PASS means only that no risk covered by the selected AgentReady engine
version, ruleset version and policy configuration was detected in the analyzed
input.

## Privacy And Local Execution

Community analysis runs locally or in the user's CI runner.

By default:

- no account is required;
- no payment is required;
- OpenAPI files are not uploaded to TimeProofs;
- MCP definitions are not uploaded to TimeProofs;
- full reports are not uploaded to TimeProofs.

## Limitations

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools
or MCP servers.

AgentReady is static analysis and decision support. It is not a runtime
firewall, API gateway, identity provider, production monitor or official
security certification.

## Links

- Repository: https://github.com/BACOUL/timeproofs
- Product page: https://timeproofs.io/agentready-ci.html
- Specification: https://github.com/BACOUL/timeproofs/blob/timeproofs/docs/agentready/AGENTREADY_JSON_SPEC.md
- Rule codes: https://github.com/BACOUL/timeproofs/blob/timeproofs/docs/agentready/AGENTREADY_RULE_CODES.md

## License

AgentReady Community package files are licensed under the Apache License,
Version 2.0. See `LICENSE`.

The names TimeProofs and AgentReady are product names. This software license
does not grant trademark rights, and no fork or third-party service should
claim to be official, approved, certified or affiliated with TimeProofs unless
that status has been separately granted.
