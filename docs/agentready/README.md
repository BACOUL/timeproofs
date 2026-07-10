# TimeProofs AgentReady Documentation

This folder contains the active product, technical, commercial, and launch architecture for TimeProofs AgentReady.

## Active Direction

```txt
AgentReady is the shift-left CI gate for agent-facing contracts.
```

AgentReady analyzes OpenAPI specifications and MCP tools before deployment to identify ambiguous, unbounded or insufficiently controlled agent actions.

## Source Of Truth

| Priority | Document |
|---:|---|
| 1 | `AGENTREADY_MASTER_PLAN.md` |
| 2 | `EXECUTION_SEQUENCE.md` |
| 3 | `DECISION_LOG.md` |
| 4 | Specialized specifications |
| 5 | Historical documents |

If another document conflicts with `AGENTREADY_MASTER_PLAN.md`, the master plan prevails.

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
- Community + Pro strategy rebaseline.

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
- AgentReady Team: POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT.
- AgentReady Agency: POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT.

These prices are an initial product decision and may evolve before real Stripe activation. No paid plan should be displayed as available until its features, entitlements, billing flow, support model, legal pages, and launch QA are ready.

There is no manual review offer, mandatory contact-sales step, quote workflow, manual payment path, or Enterprise plan at launch.

## Reference Documents

| File | Role |
|---|---|
| `AGENTREADY_MASTER_PLAN.md` | Active source of truth |
| `EXECUTION_SEQUENCE.md` | Active execution order |
| `DECISION_LOG.md` | Active decision record |
| `PRODUCT_SCOPE_AND_NON_GOALS.md` | Scope and non-goals |
| `COMMUNITY_PRO_ENTITLEMENTS.md` | Community and Pro launch boundaries |
| `ENGINE_QUALITY_AND_BENCHMARK_PLAN.md` | Benchmark and quality gates |
| `DISTRIBUTION_ADOPTION_AND_STANDARDIZATION_STRATEGY.md` | Distribution and standardization |
| `THREE_MINUTE_ONBOARDING_SPEC.md` | Community onboarding target |
| `RULE_FORMAT_AND_GOVERNANCE.md` | Rule namespace and governance |
| `MCP_VERSION_COMPATIBILITY_POLICY.md` | Protocol compatibility policy |
| `LEGAL_IP_AND_LIABILITY_STRATEGY.md` | Legal/IP/liability strategy |
| `PRIVACY_TELEMETRY_SUPPORT_AND_TRUST_MODEL.md` | Privacy, telemetry, support, trust |
| `DUE_DILIGENCE_AND_TRANSFERABILITY.md` | Auditable and transferable operations |
| `SELF_SERVICE_BUSINESS_MODEL.md` | Official zero-touch commercial model |
| `PRICING_AND_ENTITLEMENTS_V0_1.md` | Plan matrix and proposed entitlement fields |
| `AUTOMATED_PURCHASE_AND_BILLING_FLOW.md` | Future Stripe Checkout and subscription flow |
| `LICENSE_AND_ENTITLEMENT_ARCHITECTURE.md` | Privacy-first license architecture |
| `LEGAL_PRIVACY_AND_COOKIE_REQUIREMENTS.md` | France-based B2B legal/privacy/cookie checklist |
| `SEO_GEO_AI_FIRST_REQUIREMENTS.md` | SEO, structured data, and AI discovery requirements |
| `GLOBAL_LAUNCH_READINESS_MATRIX.md` | Launch readiness matrix |
| `SELF_SERVICE_EXECUTION_PLAN.md` | Short execution pointer to the active source of truth |
| `COMMUNITY_NPM_SCOPE_AUDIT.md` | npm scope and package availability evidence |
| `COMMUNITY_LICENSE_DECISION.md` | Community license decision blocker |
| `COMMUNITY_PROOFSPEC_REFERENCE_AUDIT.md` | Legacy ProofSpec reference classification |
| `COMMUNITY_PUBLICATION_POLICY.md` | Publication policy and publication bans |
| `COMMUNITY_PUBLICATION_APPROVAL_CHECKLIST.md` | Explicit approval gate, currently NO |
| `COMMUNITY_PUBLICATION_BLOCKERS.md` | Active blocker tracker |
| `COMMUNITY_TARBALL_PUBLIC_CONTENT_AUDIT.md` | Planned public package content audit |
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

The active future PR order is defined in:

```txt
docs/agentready/EXECUTION_SEQUENCE.md
```

The current publication blocker PR is:

```txt
release(agentready): resolve Community publication blockers
```

Planned branch:

```txt
release-agentready-community-publication-blockers
```

This next PR resolves blockers only and must not publish without separate explicit authorization.

If every blocker is `RESOLVED`, the next release PR may be:

```txt
release(agentready): publish Community CLI and immutable release
```

If any blocker remains open, the next authorized action is the owner or legal action named in `COMMUNITY_PUBLICATION_BLOCKERS.md`.

Every new task must answer yes to these questions:

1. Does this directly support AgentReady as a pre-deployment CI Gate?
2. Does it improve agent-facing OpenAPI or MCP readiness?
3. Does it preserve local-first scanning and privacy-first outputs?
4. Does it strengthen the CLI, GitHub Action, `agentready.json`, AR rule codes, commercial self-service model, or launch readiness?

If the answer is no, the work should be deferred or rejected.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
