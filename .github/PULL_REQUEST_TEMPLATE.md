# Pull Request - TimeProofs AgentReady

## Summary

Describe what this PR changes and why.

## Type

- [ ] `docs` - Documentation only
- [ ] `qa` - Validation or fixture checks
- [ ] `test` - Tests only
- [ ] `fix` - Bug fix
- [ ] `feat` - Feature
- [ ] `chore` - Maintenance

## Product Direction Check

Active direction:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

Current execution sequence:

```txt
1. CLI alpha merged.
2. Validate commercial bad/fixed CI gate behavior.
3. Stabilize AgentReady rule codes.
4. Add GitHub Action wrapper.
5. Publish agentready.json spec v0.1.
6. Add /agentready-ci public page.
7. Then run public site QA/polish.
```

## Scope Guard

- [ ] This PR does not reintroduce `selfhost/`.
- [ ] This PR does not reintroduce `sdk/timeproof.js`.
- [ ] This PR does not reintroduce `manifest.json` or `manifest.webmanifest`.
- [ ] This PR does not rebuild timestamp/verify/ProofSpec as active product direction.
- [ ] This PR does not add dashboard, Stripe, backend, or account system.
- [ ] This PR does not add a GitHub Action unless explicitly requested for this PR.

## Engine / Scanner Check

- [ ] `agentready-core/` unchanged, or changes are explained below.
- [ ] Scanner behavior unchanged, or changes are explained below.
- [ ] CLI behavior unchanged, or changes are explained below.

Notes:

```txt
<engine / scanner / CLI notes>
```

## Tests

Commands run:

```txt
<commands and exact results>
```

Expected core results when relevant:

```txt
AgentReady core tests: 18/18 passed
AgentReady CLI tests: PASS
```

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
