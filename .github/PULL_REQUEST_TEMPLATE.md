# Pull Request - TimeProofs AgentReady

## Summary

Describe the purpose of this PR and the problem it solves.

## Direction check

This repository direction is:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

Confirm the PR fits that direction:

- [ ] This PR is about AgentReady readiness for OpenAPI, MCP tools, reporting, fixtures, docs, QA, or future CI-gate outputs.
- [ ] This PR does not rebuild the legacy proof/timestamp/verify/ProofSpec product.

## Type of change

- [ ] `docs` - Documentation or metadata update
- [ ] `chore` - Maintenance
- [ ] `fix` - Bug fix
- [ ] `feat` - Product feature
- [ ] `test` - Test or fixture update
- [ ] `refactor` - Code structure change without intended behavior change

## Scope guard

Before submitting, confirm:

- [ ] No dashboard, Stripe, account system, database, or backend was added.
- [ ] No GitHub Action was created unless explicitly requested.
- [ ] No live API execution, live MCP execution, or LLM call was introduced.
- [ ] No runtime firewall claim was introduced.
- [ ] Scanner behavior is unchanged unless this is explicitly a scanner PR.
- [ ] `agentready-core/` changes include tests or clear fixture evidence if touched.

## Testing

List the checks run:

```txt
<commands, URLs, or manual checks>
```

For scanner-related changes, expected core check:

```bash
npm run test:agentready-core
```

Expected current result:

```txt
AgentReady core tests: 18/18 passed
```

## Mandatory limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.

## Additional notes

Anything else reviewers should know?

## Security disclosure reminder

Security issues must not be submitted via Pull Request.

Use:

```txt
security@timeproofs.io
https://timeproofs.io/.well-known/security.txt
```
