# AgentReady Self-Service Execution Plan

SUPERSEDED BY AGENTREADY_MASTER_PLAN.md where this file conflicts with the master plan.

Current execution authority:

```txt
docs/agentready/EXECUTION_SEQUENCE.md
```

## Purpose

This document is the operational source of truth for the future PR order after the self-service commercial architecture PR is merged.

Active direction:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

Core promise:

```txt
Fail the build before unsafe agent-facing APIs or MCP tools are deployed.
```

## Execution Rules

- The PR numbers below are expected numbers.
- If GitHub assigns another number, the title and order remain the authority.
- No phase may be advanced before the previous phase gate is satisfied.
- Every PR must stay limited to its stated objective.
- No paid function may be announced as available before it is implemented.
- No real payment may be enabled before the production billing PR.
- No manual plan, quote, request by email, or mandatory Contact Sales path is allowed.

## Community Distribution

Expected #110:

```txt
feat(distribution): package AgentReady CLI for public installation
```

Expected #111:

```txt
feat(distribution): prepare versioned AgentReady GitHub Action
```

Expected #112:

```txt
release(agentready): establish Community release workflow
```

Phase gate:

- CLI has a public installation path prepared and tested in a clean environment.
- GitHub Action versioning is prepared.
- Community release workflow is documented and reproducible.
- No package is published without separate validation.

## Mandatory Strategic Rebaseline Gate

Next PR:

```txt
docs(product): rebaseline AgentReady Community and Pro strategy
```

Planned branch:

```txt
docs-agentready-community-pro-rebaseline
```

No Pro implementation may begin until this docs-only rebaseline PR is merged.

The previous expected PR numbers from the Pro phase onward are provisional and will be reissued by the rebaseline PR.

## Current Next PR After Rebaseline

```txt
release(agentready): resolve Community publication blockers
```

Planned branch:

```txt
release-agentready-community-publication-blockers
```

This PR resolves blockers only and must not publish without separate explicit authorization.

## Pro

Expected #113:

```txt
feat(pro): add versioned AgentReady policy configuration
```

Expected #114:

```txt
feat(pro): add baseline and new-risk comparison
```

Expected #115:

```txt
feat(pro): add SARIF export and pull request annotations
```

Expected #116:

```txt
feat(pro): add documented and expiring policy exceptions
```

Expected #117:

```txt
feat(pro): add premium CI evidence reports
```

Phase gate:

- Pro features exist in code.
- Pro behavior is tested.
- Pro features are not publicly sold before entitlements, licensing, billing, and legal readiness are complete.

## Entitlements And Licensing

Expected #118:

```txt
feat(commercial): implement AgentReady plan entitlements
```

Expected #119:

```txt
feat(licensing): add privacy-first license activation
```

Expected #120:

```txt
feat(licensing): add minimal license and entitlement service
```

Phase gate:

- Entitlements enforce Community, Pro, Team, and Agency boundaries.
- License activation does not require uploading OpenAPI files, MCP definitions, full reports, or production secrets.
- Offline/cache behavior is defined and tested.

## Billing And Automation

Expected #121:

```txt
feat(billing): add Stripe Checkout test flow
```

Expected #122:

```txt
feat(billing): automate subscriptions and license provisioning
```

Expected #123:

```txt
feat(account): add self-service billing and license portal
```

Expected #124:

```txt
feat(automation): add transactional customer emails
```

Phase gate:

- Stripe Checkout works only in test mode.
- Webhooks are handled idempotently.
- License provisioning is automatic.
- The customer can manage billing and license access without routine human intervention.
- Real payments remain disabled.

## Team

Expected #125:

```txt
feat(team): add organizations and member management
```

Expected #126:

```txt
feat(team): add organization policy management
```

Expected #127:

```txt
feat(team): add CI history and evidence records
```

Expected #128:

```txt
feat(team): add centralized exception governance
```

Phase gate:

- Team features are tested across members, organization policies, history, evidence, and exception governance.
- Team features remain hidden or clearly unavailable until implemented.

## Agency

Expected #129:

```txt
feat(agency): add isolated client workspaces
```

Expected #130:

```txt
feat(agency): add branded client-ready reports
```

Expected #131:

```txt
feat(agency): add read-only client access
```

Phase gate:

- Client workspaces are isolated.
- Agency-branded reports are implemented.
- Read-only client access is implemented and tested.
- Agency features remain hidden or clearly unavailable until implemented.

## Commercial Site

Expected #132:

```txt
site(commercial): rebuild pricing for self-service plans
```

Expected #133:

```txt
site(commercial): add product, plan and purchase pages
```

Expected #134:

```txt
site(product): add self-service onboarding and help center
```

Phase gate:

- Pricing reflects only implemented and gated plan capabilities.
- Purchase pages do not enable real payments before production billing.
- Help content supports zero-touch onboarding.

## Company, Legal And Privacy

Expected #135:

```txt
site(trust): add company, contact and trust center
```

Expected #136:

```txt
site(legal): finalize legal and B2B commercial terms
```

Expected #137:

```txt
privacy(site): implement privacy-first cookie architecture
```

Phase gate:

- Company information is complete.
- B2B terms, privacy, refunds, responsible disclosure, and subprocessors are ready.
- Non-essential cookies remain blocked before consent if they exist.
- Cookie choices are equal-level: accept, refuse, and manage.

## SEO, Documentation And AI Discovery

Expected #138:

```txt
seo(site): complete technical search architecture
```

Expected #139:

```txt
docs(site): publish AgentReady developer documentation hub
```

Expected #140:

```txt
ai(site): add machine-readable AgentReady discovery layer
```

Phase gate:

- Technical SEO is complete.
- Developer docs are public, readable, and internally linked.
- AI discovery content is factual, machine-readable, and does not invent standards.

## Launch

Expected #141:

```txt
qa(launch): run AgentReady global launch readiness audit
```

Expected #142:

```txt
release(commercial): enable AgentReady self-service production billing
```

Expected #143:

```txt
release(agentready): launch self-service plans
```

Phase gate:

- Global launch readiness audit has no blocking launch items.
- Production billing is enabled only after legal, privacy, tax, support, observability, incident, refund, entitlement, license, and payment-failure checks are ready.
- Self-service plans launch only after production billing and plan availability checks pass.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
