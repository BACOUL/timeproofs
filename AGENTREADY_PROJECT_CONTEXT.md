# TimeProofs AgentReady Project Context

Read this file before changing the repository.

## Active Direction

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

AgentReady checks whether OpenAPI operations and MCP tools are clear, bounded, and documented enough before AI agents can use them.

## Current Baseline On `timeproofs`

Built and merged:

- static OpenAPI scanner;
- static MCP tools scanner;
- AgentReady CLI alpha;
- commercial bad/fixed fixture CI Gate validation;
- stable rule codes AR001-AR010;
- GitHub Action wrapper;
- `agentready.json` spec v0.1;
- `agentready.json` export with `detected_risks`, `rule_codes`, and `detected_rules`;
- docs/examples for CLI, GitHub Action, rule codes, and v0.1 spec;
- `/agentready-ci` public page;
- homepage repositioned around AgentReady CI Gate;
- CLI public distribution package preparation;
- versioned GitHub Action preparation;
- Community release workflow preparation;
- legacy proof runtime artifacts removed.

Community public publication remains blocked and has not occurred.

## Current Execution Sequence

Completed:

1. CLI alpha merged.
2. Commercial bad/fixed fixture CI Gate behavior validated.
3. AgentReady rule codes stabilized.
4. GitHub Action wrapper added.
5. `agentready.json` spec v0.1 published and aligned with code.
6. `/agentready-ci` public page added.
7. Homepage repositioned around CI Gate.
8. Self-service commercial and launch architecture documented.
9. CLI public distribution package preparation validated.
10. Versioned GitHub Action preparation validated.
11. Community release workflow prepared.

Next:

1. `feat(pro): add versioned AgentReady policy configuration`
2. Pro features.
3. Entitlements and licensing.
4. Billing and automation.
5. Team.
6. Agency.
7. Commercial site.
8. Company, legal, privacy.
9. SEO, documentation, AI discovery.
10. Launch.

Locked operational sequence:

```txt
docs/agentready/SELF_SERVICE_EXECUTION_PLAN.md
```

## Important Files

```txt
agentready-core/
bin/agentready.js
.github/actions/agentready/action.yml
docs/agentready/COMMERCIAL_FIXTURE_CI_GATE_BEHAVIOR.md
docs/agentready/AGENTREADY_RULE_CODES.md
docs/agentready/AGENTREADY_JSON_SPEC.md
docs/agentready/GITHUB_ACTION_USAGE.md
docs/agentready/GITHUB_ACTION_VERSIONING.md
docs/agentready/COMMUNITY_RELEASE_WORKFLOW.md
docs/agentready/COMMUNITY_RELEASE_CHECKLIST.md
docs/agentready/COMMUNITY_RELEASE_NOTES_0_1_0_ALPHA_0_DRAFT.md
docs/agentready/SELF_SERVICE_BUSINESS_MODEL.md
docs/agentready/PRICING_AND_ENTITLEMENTS_V0_1.md
docs/agentready/AUTOMATED_PURCHASE_AND_BILLING_FLOW.md
docs/agentready/LICENSE_AND_ENTITLEMENT_ARCHITECTURE.md
docs/agentready/LEGAL_PRIVACY_AND_COOKIE_REQUIREMENTS.md
docs/agentready/SEO_GEO_AI_FIRST_REQUIREMENTS.md
docs/agentready/GLOBAL_LAUNCH_READINESS_MATRIX.md
docs/agentready/SELF_SERVICE_EXECUTION_PLAN.md
docs/agentready/CLI_PUBLIC_DISTRIBUTION.md
docs/agentready/TODO_NEXT.md
docs/agentready/REMAINING_WORK.md
```

## Guardrails

Do not create in implementation PRs without explicit approval and a dedicated scope:

- dashboard
- Stripe/payment flow
- backend
- account system
- runtime firewall
- live API execution during scans
- live MCP execution during scans
- LLM calls during scans
- new proof-of-existence product surface

Commercial direction:

- Community, Pro, Team, and Agency are intended to be self-service.
- No manual review package, manual quote, or request-by-email sales motion is the active model.
- No plan should be shown as available until its features are implemented.
- Real Stripe production payments remain blocked until legal, privacy, tax, entitlement, license, support, and launch QA requirements are ready.

Do not reintroduce:

- `selfhost/`
- `sdk/timeproof.js`
- `manifest.json`
- `manifest.webmanifest`

## Validation Commands

```txt
node agentready-core/tests/run-agentready-core-tests.mjs
node cli/tests/run-agentready-cli-tests.mjs
node cli/tests/run-agentready-action-smoke-test.mjs
node cli/tests/run-agentready-package-smoke-test.mjs
node cli/tests/run-agentready-community-release-workflow-test.mjs
```

Commercial policy:

```txt
--min-score 75
--fail-on critical
```

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
