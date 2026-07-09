# TimeProofs AgentReady - Repo cleanup audit

Date: 2026-07-09

## Goal

This audit prepares a cleanup pass for the current repository without changing scanner behavior.

Project direction:

```txt
TimeProofs AgentReady = pre-deployment CI gate for agent-facing OpenAPI and MCP tools.
```

Non-goals for this audit:

```txt
No scanner behavior changes.
No agentready-core changes.
No tests changed.
No GitHub Action created.
No dashboard.
No Stripe.
No deletion in this first step.
```

## Source documents read

| File | Status | Audit note |
|---|---|---|
| `README.md` | Read | Mostly AgentReady-aligned, but some next-step status is stale. |
| `AGENTREADY_PROJECT_CONTEXT.md` | Read | Useful guardrail, but outdated: it still says MCP parser and simulation are not built. |
| `docs/agentready/EXECUTION_LOCK_90_DAYS.md` | Not present | No file to read in this clone. |
| `docs/agentready/AGENTREADY_A_TO_Z_PROJECT_PLAN.md` | Not present | No file to read in this clone. |

## Executive summary

The active product surface is now AgentReady and should stay focused on a static, pre-deployment scanner/gate for OpenAPI and MCP tool contracts.

The repo still contains a second product layer from the old TimeProofs proof-of-existence system:

```txt
timestamp API
verify API
ProofSpec
.tproof.json
hash-only proof SDK
self-hosted timestamp server
legacy legal/DPA wording
legacy GitHub templates
legacy root roadmap/changelog/security/contributing docs
```

Those legacy items are the main cleanup target. The next cleanup PR should first update or archive public/docs/config files, then remove or archive unused legacy code only after confirming nothing deploys it.

## Classification legend

| Class | Meaning |
|---|---|
| KEEP | Keep active as part of the AgentReady product. |
| UPDATE | Keep, but align wording/status/config with AgentReady. |
| ARCHIVE | Move to a historical/archive location or mark as historical. |
| DELETE | Remove in a later cleanup PR after final confirmation. |

## Root files and public pages

| Item | Class | Reason |
|---|---|---|
| `index.html` | KEEP | Current public homepage is AgentReady and matches the deployed direction. |
| `agentready.html` | KEEP | Primary OpenAPI scanner page. |
| `agentready-mcp.html` | KEEP | Primary MCP scanner page. |
| `agentready-simulation.html` | KEEP | Static simulation is part of the readiness contract flow. |
| `agentready-docs.html` | KEEP | Public AgentReady docs page. |
| `agentready-examples.html` | KEEP | Public fixture/examples page. |
| `agentready-test.html` | KEEP | Browser test harness; keep noindex/internal. |
| `agentready-engine-gate.html` | KEEP | Useful internal gate page; keep noindex/internal. |
| `agentready-sample-report.html` | KEEP | Commercial proof of value for the report output. |
| `agentready-resources.html` | KEEP | Acquisition/resources hub aligned with AgentReady. |
| `openapi-ai-agent-readiness.html` | KEEP | SEO page aligned with AgentReady. |
| `mcp-server-readiness.html` | KEEP | SEO page aligned with AgentReady. |
| `ai-agent-tool-risk-checklist.html` | KEEP | SEO/checklist page aligned with AgentReady. |
| `agentready-json.html` | KEEP | Explains the main machine-readable contract. The word `timestamp` is about `generated_at`, not legacy proof. |
| `pricing.html` | KEEP | Static/manual pricing path, no Stripe/backend. |
| `legal.html` | UPDATE | Aligned with AgentReady but still says production details must be confirmed even though public deployment exists. |
| `privacy.html` | UPDATE | Mostly aligned; update hosting/contact details after public deployment validation. |
| `terms.html` | UPDATE | Mostly aligned; update pre-release wording once strict release status is decided. |
| `404.html` | UPDATE | Still links to ProofSpec, Verify, API Docs, Use Cases, and old proof CTA. Public 404 must point to AgentReady pages. |
| `dpa.html` | ARCHIVE | Legal text is for the old hash/timestamp proof service, not the current static scanner. |
| `sitemap.xml` | KEEP | Lists AgentReady public pages and excludes old proof pages. |
| `robots.txt` | KEEP | Generic and safe. |
| `.nojekyll` | KEEP | Harmless static hosting marker. |
| `package.json` | KEEP | Minimal test script for AgentReady core. |
| `AGENTS.md` | KEEP | Repo operating guidance. |
| `AGENTREADY_PROJECT_CONTEXT.md` | UPDATE | Important guardrail, but stale on MCP/simulation implementation and next-step status. |
| `README.md` | UPDATE | Keep as root source of truth, but align immediate next step with current deployed/commercial state. |
| `CHANGELOG.md` | ARCHIVE | Entirely legacy proof/timestamp roadmap and release history. Create a new AgentReady changelog. |
| `ROADMAP.md` | ARCHIVE | Entirely legacy proof/timestamp roadmap. AgentReady roadmap now lives under `docs/agentready/`. |
| `CONTRIBUTING.md` | UPDATE | Still describes ProofSpec, Cloudflare Worker, `/timestamp`, `/verify`, and old branches. |
| `SECURITY.md` | UPDATE | Still scopes `/api/timestamp`, `/api/verify`, Worker/KV, and old proof service. |
| `CODE_OF_CONDUCT.md` | UPDATE | Mostly reusable, but footer still says old proof-of-existence tagline. |
| `LICENSE` | UPDATE | Mentions ProofSpec marks and old protocol purpose; needs legal/product review before changing. |
| `humans.txt` | UPDATE | Still presents TimeProofs as proof-of-existence and points to ProofSpec. |
| `pgp.txt` | KEEP | Security contact material; confirm key ownership/expiry later. |
| `.well-known/security.txt` | UPDATE | Points to `/security.html`, which is not present; align policy URL with current site. |

## Manifests, icons, images, and assets

| Item | Class | Reason |
|---|---|---|
| `assets/site-nav.css` | KEEP | Shared AgentReady navigation styling. |
| `assets/site-nav.js` | KEEP | Shared AgentReady navigation behavior. |
| `assets/logo.png`, `assets/logo.svg`, `assets/favicon*`, `assets/android*`, `assets/apple-touch-icon.png` | KEEP | Active asset paths used by AgentReady pages and `site.webmanifest`. |
| `site.webmanifest` | KEEP | AgentReady-aligned PWA manifest. |
| `manifest.json` | DELETE | Old proof-of-existence description and not the active manifest. Remove after confirming no pages link it. |
| `manifest.webmanifest` | DELETE | Old proof-of-existence description and root icon paths. Remove after confirming no pages link it. |
| Root `android-chrome-*.png`, `apple-touch-icon.png`, `favicon*.png`, `favicon.ico` | DELETE | Duplicate legacy root assets once old manifests/pages are cleaned. Active pages use `/assets/...`. |
| Root `logo.png` | DELETE | Duplicate of `assets/logo.png`; remove once no root reference remains. |
| `og.png` | UPDATE | Likely old social preview. Replace or rename to an AgentReady OG image if used. |
| `file_000000007b9c61f5a4750692b2debdff.png` | DELETE | Large unreferenced image; remove after visual/asset confirmation. |

## AgentReady core and tests

| Item | Class | Reason |
|---|---|---|
| `agentready-core/` | KEEP | Current scanner engine for OpenAPI, MCP, export contract, scoring, report, and simulation. Do not change during cleanup. |
| `agentready-core/tests/` | KEEP | Current Node regression suite. Do not change during cleanup. |
| `agentready-core/tests/fixtures/` | KEEP | Current regression fixtures. |
| `agentready-core/simulation/` | KEEP | Static simulation is part of the AgentReady contract flow. |
| `agentready-core/README.md` | UPDATE | Mostly correct, but still labels MCP as `V2a`; MCP is now part of current V1 surface. |

## AgentReady examples and fixtures

| Item | Class | Reason |
|---|---|---|
| `agentready-examples/valid-simple-openapi.json` | KEEP | Baseline OpenAPI fixture. |
| `agentready-examples/valid-simple-openapi.yaml` | KEEP | YAML parsing fixture. |
| `agentready-examples/dangerous-actions-openapi.json` | KEEP | Negative OpenAPI fixture. |
| `agentready-examples/mcp-tools-simple.json` | KEEP | Baseline MCP fixture. |
| `agentready-examples/mcp-tools-dangerous.json` | KEEP | Negative MCP fixture. |
| `agentready-examples/openapi-engine-regression.json` | KEEP | Engine regression fixture. |
| `agentready-examples/commercial/*.json` | KEEP | Commercial bad/fixed fixtures are useful for demonstrating controlled vs uncontrolled risk. |
| `agentready-examples/README.md` | UPDATE | Only lists the original OpenAPI fixtures; add MCP, commercial, and engine regression fixture groups. |
| `docs/agentready/examples/*.json` | KEEP | Static simulation and `agentready.json` examples. |
| `docs/agentready/examples/simulation-scenarios-index.md` | KEEP | Useful index for the static simulation examples. |

## Legacy proof/timestamp code

| Item | Class | Reason |
|---|---|---|
| `selfhost/` | DELETE | Implements old `/api/timestamp` and `/api/verify` proof server; contradicts current no-backend AgentReady direction. |
| `docs/run-local.md` | DELETE | Describes the old self-hosted timestamp/verify service. |
| `sdk/timeproof.js` | DELETE | Old proof SDK for `createFromHash`, `createFromText`, and `verify`; not AgentReady. |

## GitHub and repository templates

| Item | Class | Reason |
|---|---|---|
| `.github/PULL_REQUEST_TEMPLATE.md` | UPDATE | Still asks for ProofSpec/API compatibility and hash-only proof checks. |
| `.github/ISSUE_TEMPLATE/bug_report.md` | UPDATE | Still frames the repo as API/Worker/UI/Docs. |
| `.github/ISSUE_TEMPLATE/feature_request.md` | UPDATE | Still asks for ProofSpec impact and old roadmap links. |
| `.github/ISSUE_TEMPLATE/config.yml` | UPDATE | Website contact text still says Verify UI and protocol overview. |

## Docs: active source of truth

| Item | Class | Reason |
|---|---|---|
| `docs/agentready/README.md` | UPDATE | Good direction, but V1 formula still says only OpenAPI upload; add MCP and CI gate direction. |
| `docs/agentready/TIMEPROOFS_AGENTREADY_MASTER_PLAN.md` | UPDATE | Keep as strategy source; align with current Browser V1 + CI gate direction. |
| `docs/agentready/AGENTREADY_ROADMAP.md` | UPDATE | Keep, but ensure GitHub Action remains future/CLI-wrapper only. |
| `docs/agentready/AGENTREADY_SCORE_MODEL.md` | KEEP | Core score documentation; do not change thresholds in cleanup. |
| `docs/agentready/AGENTREADY_RISK_TAXONOMY.md` | KEEP | Core taxonomy documentation. |
| `docs/agentready/AGENTREADY_JSON_SPEC.md` | KEEP | Main contract spec; central to CI gate direction. |
| `docs/agentready/AGENTREADY_REPORT_TEMPLATE.md` | KEEP | Human report template still useful. |
| `docs/agentready/AGENTREADY_IMPLEMENTATION_CHECKLIST.md` | UPDATE | Some implementation state is historical; align with current completed MCP/simulation work. |
| `docs/agentready/RELEASE_DISCIPLINE.md` | KEEP | Useful guardrail against premature release claims. |
| `docs/agentready/BROWSER_V1_QA_RUNBOOK.md` | KEEP | Current strict QA runbook. |
| `docs/agentready/BROWSER_V1_QA_RESULT.md` | UPDATE | Production commit is stale (`d2adc71`); public deployment now observed at `9cd268c...`. |
| `docs/agentready/BROWSER_V1_RELEASE_GATE.md` | KEEP | Current release gate doc. |
| `docs/agentready/BROWSER_PRODUCT_QA_CHECKLIST.md` | KEEP | Useful QA checklist. |
| `docs/agentready/TODO_NEXT.md` | UPDATE | Immediate next PR is stale: commercial fixture scan/improvement already happened. |
| `docs/agentready/REMAINING_WORK.md` | UPDATE | QA/Vercel/commercial fixture sections need current status. |
| `docs/agentready/LONG_TERM_PRODUCT_ROADMAP.md` | KEEP | Good long-term framing; keep future dashboard/payment clearly delayed. |
| `docs/agentready/V2_CLI_SCOPE.md` | KEEP | Relevant to the CI gate direction, but do not implement CLI in cleanup. |
| `docs/agentready/CI_CD_STRATEGY.md` | KEEP | Relevant strategy for future CI gate; ensure it says GitHub Action comes after CLI and is not built now. |
| `docs/agentready/COMPETITIVE_POSITIONING.md` | KEEP | Useful positioning. |
| `docs/agentready/GO_TO_MARKET_PLAN.md` | UPDATE | Align pricing and manual review path with current `pricing.html`. |
| `docs/agentready/COMMERCIAL_DEMOS_PLAN.md` | UPDATE | Mark commercial fixture contrast work as completed and link latest results if available. |
| `docs/agentready/AUTOMATED_PRODUCT_STRATEGY.md` | UPDATE | Keep as future strategy, but de-emphasize Stripe/dashboard until demand. |
| `docs/agentready/AGENTREADY_CHECKED_TRUST_LAYER.md` | KEEP | Future trust concept; must remain private/draft and not become a public safety guarantee. |
| `docs/agentready/LEGACY_REMOVAL_DECISION.md` | KEEP | Important decision record: do not rebuild old proof product. |

## Docs: historical or completed planning notes

| Item | Class | Reason |
|---|---|---|
| `docs/agentready/*_PR_NOTE.md` | ARCHIVE | Historical PR notes are noisy as active documentation. Move under `docs/agentready/archive/pr-notes/`. |
| `docs/agentready/REPO_AUDIT_INITIAL.md` | ARCHIVE | Historical pre-pivot audit; superseded by this cleanup audit. |
| `docs/agentready/README_AGENTREADY_REBOOT.md` | ARCHIVE | Historical reboot note; active source should be README + project context. |
| `docs/agentready/README_ALIGNMENT_NOTE.md` | ARCHIVE | Historical alignment note. |
| `docs/agentready/MOBILE_NAV_PROPAGATION_PLAN.md` | ARCHIVE | Plan appears completed. |
| `docs/agentready/MCP_SCANNER_EXPLORATION.md` | ARCHIVE | MCP core/page now exist; keep as history, not source of truth. |
| `docs/agentready/AGENT_SIMULATION_EXPLORATION.md` | ARCHIVE | Simulation core/page now exist; keep as history, not source of truth. |
| `docs/agentready/STATIC_SIMULATION_PARSER_SCOPE.md` | KEEP | Useful scope/spec reference for static simulation behavior. |
| `docs/agentready/BROWSER_V1_RELEASE_NOTES_DRAFT.md` | UPDATE | Draft release notes should reflect current public deployment and commercial page updates. |

## Public contradictions found

| Item | Class | Reason |
|---|---|---|
| `404.html` old navigation | UPDATE | Visitors hitting a missing page are sent to removed ProofSpec/Verify/API docs pages. |
| `dpa.html` old legal model | ARCHIVE | Talks about hash-only proof storage and Cloudflare processing; not current static scanner. |
| `manifest.json` and `manifest.webmanifest` | DELETE | Still describe proof-of-existence. |
| `humans.txt` | UPDATE | Still says project goal is universal proof of existence. |
| `.well-known/security.txt` | UPDATE | Points to absent `/security.html`. |
| `CHANGELOG.md` and `ROADMAP.md` | ARCHIVE | They can mislead contributors into rebuilding proof/timestamp/billing/dashboard work. |
| `.github/*` templates | UPDATE | They steer PRs/issues toward ProofSpec and old API compatibility. |

## PRs or docs contradiction visible locally

No live PR metadata was required for this audit. Locally visible `*_PR_NOTE.md` files act like historical PR notes and should be archived away from the active docs path.

The strongest doc contradictions are:

```txt
AGENTREADY_PROJECT_CONTEXT.md says MCP static core parser is not built.
AGENTREADY_PROJECT_CONTEXT.md says Agent simulation is not built.
TODO_NEXT.md says commercial fixture scanning is the immediate next PR.
BROWSER_V1_QA_RESULT.md records old production commit d2adc71.
CHANGELOG.md / ROADMAP.md still present TimeProofs as the proof-of-existence product.
```

## Recommended cleanup order

### PR 1 - Align public/repo metadata with AgentReady

Scope:

```txt
README.md
AGENTREADY_PROJECT_CONTEXT.md
docs/agentready/TODO_NEXT.md
docs/agentready/REMAINING_WORK.md
docs/agentready/BROWSER_V1_QA_RESULT.md
404.html
humans.txt
SECURITY.md
CONTRIBUTING.md
CODE_OF_CONDUCT.md
.github/
.well-known/security.txt
manifest files
```

Reason:

```txt
These files are visible to visitors/contributors and currently create the most confusion.
No scanner behavior needs to change.
```

### PR 2 - Archive historical docs

Scope:

```txt
docs/agentready/*_PR_NOTE.md
docs/agentready/REPO_AUDIT_INITIAL.md
docs/agentready/README_AGENTREADY_REBOOT.md
docs/agentready/README_ALIGNMENT_NOTE.md
docs/agentready/MOBILE_NAV_PROPAGATION_PLAN.md
docs/agentready/MCP_SCANNER_EXPLORATION.md
docs/agentready/AGENT_SIMULATION_EXPLORATION.md
CHANGELOG.md legacy content
ROADMAP.md legacy content
```

Reason:

```txt
Keep history, but move it away from active execution docs.
```

### PR 3 - Remove legacy proof implementation

Scope:

```txt
selfhost/
docs/run-local.md
sdk/timeproof.js
unused root icon duplicates
unreferenced generated image
old manifests after active manifest links are confirmed
```

Reason:

```txt
These files implement or support the old proof/timestamp/verify product, not AgentReady.
Confirm no deployment or external package depends on them before deletion.
```

## Proposed next cleanup PR

Recommended next PR:

```txt
chore(repo): align public metadata and contributor docs with AgentReady
```

Include:

```txt
Update 404.html to route users to AgentReady scanner/docs/sample report.
Update root README and AGENTREADY_PROJECT_CONTEXT current-state sections.
Update TODO_NEXT and REMAINING_WORK to reflect completed commercial fixture work and public deployment.
Update BROWSER_V1_QA_RESULT with the current public deployment commit observation.
Update SECURITY, CONTRIBUTING, CODE_OF_CONDUCT, humans.txt, and GitHub templates to remove ProofSpec/timestamp/verify guidance.
Update or remove legacy manifests so only site.webmanifest remains active.
Do not touch agentready-core.
Do not touch tests.
Do not create GitHub Actions.
Do not delete selfhost/sdk in this PR unless explicitly approved.
```

This gives the repo one clear public story before deeper archival/deletion work.
