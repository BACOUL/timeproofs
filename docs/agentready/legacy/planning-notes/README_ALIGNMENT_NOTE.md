# TimeProofs AgentReady — README Alignment Note

## Purpose

This note records that the root README still needs to be aligned with the current AgentReady state.

## Why

The README still contains older wording in some places.

It should reflect that the current product direction is:

```txt
OpenAPI / MCP / tool schema
→ AgentReady analysis
→ AgentReady Score
→ AgentReady Report
→ agentready.json
→ static simulation scenario
→ agentready-simulation.json
```

## README updates needed

```txt
1. Mark static simulation as present instead of pending.
2. Mention agentready-simulation.json.
3. Mention agentready-simulation.html in public pages.
4. Replace older MCP Scanner V2 draft wording with Browser V1 MCP scanner wording.
5. Mention Browser V1 QA pending.
6. Mention Browser V1 release gate and QA runbook.
7. Mention long-term roadmap and release discipline.
8. Mention V2 CLI as the next scoped phase.
```

## Current source-of-truth docs

```txt
docs/agentready/TODO_NEXT.md
docs/agentready/LONG_TERM_PRODUCT_ROADMAP.md
docs/agentready/RELEASE_DISCIPLINE.md
docs/agentready/V2_CLI_SCOPE.md
docs/agentready/BROWSER_V1_QA_RUNBOOK.md
docs/agentready/BROWSER_V1_QA_RESULT.md
```

## Important

This note exists because the README update could not be applied in the current tool execution.

The next successful documentation pass should update README.md directly and then remove this note if it becomes redundant.
