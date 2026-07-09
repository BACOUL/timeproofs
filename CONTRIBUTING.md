# Contributing to TimeProofs AgentReady

Thank you for contributing to TimeProofs AgentReady.

The active project direction is:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

## Product Scope

AgentReady checks API and MCP tool contracts before agents use them.

Current active surfaces:

```txt
static browser OpenAPI scanner
static browser MCP scanner
static scenario simulation
agentready.json export
Markdown reports
CLI alpha
commercial bad/fixed fixtures
```

## Official Execution Sequence

```txt
1. CLI alpha merged.
2. Validate commercial bad/fixed CI gate behavior.
3. Stabilize AgentReady rule codes.
4. Add GitHub Action wrapper.
5. Publish agentready.json spec v0.1.
6. Add /agentready-ci public page.
7. Then run public site QA/polish.
```

Current next PR:

```txt
qa(agentready): validate commercial fixture CI gate behavior
```

## Repository Structure

```txt
agentready-core/          Scanner engine and tests
agentready-examples/      OpenAPI, MCP, and commercial fixtures
bin/agentready.js         CLI alpha entrypoint
cli/tests/                CLI smoke tests
docs/agentready/          Product, roadmap, spec, and execution docs
docs/agentready/legacy/   Historical material only
assets/                   Shared static assets
*.html                    Static public pages
```

## Contribution Rules

Do:

```txt
Keep changes scoped to the requested PR.
Prefer existing AgentReady core APIs and report formats.
Keep browser and CLI outputs compatible where possible.
Keep docs aligned with the official sequence.
Run relevant tests before pushing.
```

Do not add unless explicitly requested:

```txt
GitHub Action
dashboard
Stripe
backend scanner
database
account system
runtime firewall
new public commercial page
```

Do not reintroduce:

```txt
selfhost/
sdk/timeproof.js
manifest.json
manifest.webmanifest
timestamp API
verify API
ProofSpec as active product direction
.tproof.json as active product direction
```

## Testing

Preferred commands:

```bash
npm run test:agentready-core
npm run test:agentready-cli
```

If `npm` is unavailable, run direct Node equivalents:

```bash
node agentready-core/tests/run-agentready-core-tests.mjs
node cli/tests/run-agentready-cli-tests.mjs
```

Expected results:

```txt
AgentReady core tests: 18/18 passed
AgentReady CLI tests: PASS
```

## Pull Requests

PRs should state:

```txt
what changed
why it changed
which files were modified
which tests were run
whether agentready-core changed
whether CLI behavior changed
```

PRs must target `timeproofs` unless instructed otherwise.

## Security Disclosure

Do not open a public issue or PR for vulnerabilities.

Use:

```txt
security@timeproofs.io
https://timeproofs.io/.well-known/security.txt
```

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
