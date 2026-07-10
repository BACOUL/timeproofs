# MCP Version Compatibility Policy

Status: ACTIVE SPECIALIZED SPECIFICATION

Authority: `AGENTREADY_MASTER_PLAN.md`.

## Version Fields

AgentReady results should distinguish:

- `engine_version`;
- `ruleset_version`;
- `agentready_schema_version`;
- `source_protocol`;
- `source_protocol_version`.

Do not invent terminology such as `MCP v2`.

## Compatibility Watch

Track:

- MCP protocol versions;
- MCP SDK changes;
- security recommendations;
- deprecations;
- specification evolution;
- relevant proposal processes.

## Rule Applicability

A rule should be able to declare which source protocol versions it applies to.

If the source protocol version is unknown, the result must not imply version-specific coverage that was not established.
