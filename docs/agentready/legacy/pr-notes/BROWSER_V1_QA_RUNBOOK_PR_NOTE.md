# PR Note — Browser V1 QA Runbook

## Goal

Add a practical QA runbook for completing Browser V1 validation later in a real browser, either locally or through a Vercel preview.

## Added

```txt
docs/agentready/BROWSER_V1_QA_RUNBOOK.md
```

## Updated

```txt
docs/agentready/TODO_NEXT.md
```

## Covered

```txt
Local browser QA mode
Vercel preview QA mode
Required pages to test
OpenAPI scanner QA
MCP scanner QA
Static simulation QA
Test harness QA
Network tab verification
Export verification
Mobile / narrow viewport smoke test
How to fill BROWSER_V1_QA_RESULT.md
What to do after PASS
Mandatory limitation text
```

## Important

This PR does not mark Browser V1 complete.

Browser V1 remains pending until:

```txt
1. QA is run in a real browser.
2. Exports are verified.
3. Network tab confirms no live API/MCP/LLM calls.
4. docs/agentready/BROWSER_V1_QA_RESULT.md is updated to PASS.
```

## Non-goals

```txt
No code changes
No manual QA pass claim
No release claim
No live API execution
No live MCP execution
No LLM calls
No backend
No accounts
No payments
No dashboard
No runtime firewall
No deployment
```
