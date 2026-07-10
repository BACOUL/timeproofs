# TimeProofs AgentReady Documentation

This folder contains the active product, technical, commercial, and launch architecture for TimeProofs AgentReady.

## Active Direction

```txt
TimeProofs AgentReady is a pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

Core promise:

```txt
Fail the build before unsafe agent-facing APIs or MCP tools are deployed.
```

TimeProofs AgentReady is not:

- a runtime firewall;
- a general AI security platform;
- a simple OpenAPI scanner;
- a certification or safety guarantee;
- a manual consulting service;
- a legacy proof-of-existence product.

## Current Foundation

The merged foundation now includes:

- CLI alpha;
- commercial bad/fixed CI Gate validation;
- stable rule codes AR001-AR010;
- GitHub Action wrapper;
- `agentready.json` spec v0.1;
- `/agentready-ci` public page;
- homepage positioning around AgentReady CI Gate.
- CLI public distribution preparation;
- versioned GitHub Action preparation;
- Community release workflow preparation.

Community public publication remains blocked and has not occurred.

## Self-Service Commercial Direction

AgentReady is planned as a zero-touch B2B software product:

```txt
discovery
-> plan choice
-> payment
-> automatic account or organization creation
-> automatic license activation
-> installation
-> usage
-> renewal
-> invoices
-> plan changes
-> cancellation
```

Active launch model:

- AgentReady Community: 0 EUR.
- AgentReady Pro: 24 EUR excl. VAT/month or 240 EUR excl. VAT/year.
- AgentReady Team: 79 EUR excl. VAT/month or 790 EUR excl. VAT/year.
- AgentReady Agency: 199 EUR excl. VAT/month or 1,990 EUR excl. VAT/year.

These prices are an initial product decision and may evolve before real Stripe activation. No paid plan should be displayed as available until its features, entitlements, billing flow, support model, legal pages, and launch QA are ready.

There is no manual review offer, mandatory contact-sales step, quote workflow, manual payment path, or Enterprise plan at launch.

## Reference Documents

| File | Role |
|---|---|
| `SELF_SERVICE_BUSINESS_MODEL.md` | Official zero-touch commercial model |
| `PRICING_AND_ENTITLEMENTS_V0_1.md` | Plan matrix and proposed entitlement fields |
| `AUTOMATED_PURCHASE_AND_BILLING_FLOW.md` | Future Stripe Checkout and subscription flow |
| `LICENSE_AND_ENTITLEMENT_ARCHITECTURE.md` | Privacy-first license architecture |
| `LEGAL_PRIVACY_AND_COOKIE_REQUIREMENTS.md` | France-based B2B legal/privacy/cookie checklist |
| `SEO_GEO_AI_FIRST_REQUIREMENTS.md` | SEO, structured data, and AI discovery requirements |
| `GLOBAL_LAUNCH_READINESS_MATRIX.md` | Launch readiness matrix |
| `SELF_SERVICE_EXECUTION_PLAN.md` | Locked operational PR order from Community distribution to launch |
| `CLI_PUBLIC_DISTRIBUTION.md` | Prepared CLI package distribution and publication blockers |
| `GITHUB_ACTION_VERSIONING.md` | Planned GitHub Action tag and versioning model |
| `COMMUNITY_RELEASE_WORKFLOW.md` | Community release candidate workflow |
| `COMMUNITY_RELEASE_CHECKLIST.md` | Community release readiness and publication blockers |
| `COMMUNITY_RELEASE_NOTES_0_1_0_ALPHA_0_DRAFT.md` | Draft notes for the unpublished Community candidate |
| `AGENTREADY_JSON_SPEC.md` | `agentready.json` v0.1 contract |
| `AGENTREADY_RULE_CODES.md` | Stable AR001-AR010 rule codes |
| `COMMERCIAL_FIXTURE_CI_GATE_BEHAVIOR.md` | Bad/fixed CI Gate validation |
| `GITHUB_ACTION_USAGE.md` | GitHub Action usage |
| `PREMIUM_SITE_REQUIREMENTS.md` | Premium public site requirements |
| `PUBLIC_SITE_INFORMATION_ARCHITECTURE.md` | Public site target architecture |
| `SITE_COPY_GUIDE.md` | Site wording and positioning guide |

## Legacy Archive

Historical notes and old proof/timestamp/verify/tproof references are kept under:

```txt
docs/agentready/legacy/
```

This content is historical only and does not define the active product direction.

## No-Drift Rule

The locked future PR order is defined in:

```txt
docs/agentready/SELF_SERVICE_EXECUTION_PLAN.md
```

After #112, the immediate next PR is:

```txt
feat(pro): add versioned AgentReady policy configuration
```

Every new task must answer yes to these questions:

1. Does this directly support AgentReady as a pre-deployment CI Gate?
2. Does it improve agent-facing OpenAPI or MCP readiness?
3. Does it preserve local-first scanning and privacy-first outputs?
4. Does it strengthen the CLI, GitHub Action, `agentready.json`, AR rule codes, commercial self-service model, or launch readiness?

If the answer is no, the work should be deferred or rejected.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
