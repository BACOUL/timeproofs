# PR Note — agentready.json Contract Spec

## Goal

Strengthen the V1 `agentready.json` contract documentation so it matches the current OpenAPI and MCP scanner outputs.

## Scope

```txt
docs/agentready/AGENTREADY_JSON_SPEC.md
docs/agentready/examples/agentready-openapi-minimal.json
docs/agentready/examples/agentready-mcp-minimal.json
docs/agentready/TODO_NEXT.md
```

## Added / updated

```txt
Root shape
agentready_version
generated_at
source_type
source metadata for OpenAPI
source metadata for MCP
summary.score_interpretation
tools[] fields
detected risk codes
human confirmation semantics
minimal OpenAPI example
minimal MCP example
explicit V1 limitations
```

## Non-goals

```txt
No backend
No accounts
No payments
No dashboard
No runtime firewall
No deployment
No agent simulation
```

## Next recommended step

```txt
docs(agentready): start agent simulation exploration
```
