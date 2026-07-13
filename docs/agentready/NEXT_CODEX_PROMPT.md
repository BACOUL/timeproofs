GENERATED FILE — DO NOT EDIT MANUALLY

Canonical source:
docs/agentready/AGENTREADY_EXECUTION_LEDGER.json

# Next Codex Prompt

Repository: BACOUL/timeproofs
Base: site-agentready-global-trust
Exact approved base head: 11c488ff98ecb4509dd8bbf916840bf8c9edce77
Batch ID: ARB-SITE-GLOBAL-005
Work item IDs: AR-SITE-GLOBAL-005
Owner: CODEX_AND_JEASON
Milestone: M3
Horizon: BEFORE_COMMUNITY_PUBLICATION
Objective: Publish developer documentation, adoption, examples and contribution paths for AgentReady Community without changing engine, CLI, package, Action, scoring, rule semantics, billing, accounts, backend or runtime behavior.
Branch: site-agentready-global-docs-adoption
PR title: site(docs): publish developer documentation and adoption foundation
Draft PR target: site-agentready-global-trust

Documents sources:
  - docs/agentready/AGENTREADY_MASTER_PLAN.md
  - docs/agentready/EXECUTION_SEQUENCE.md
  - docs/agentready/DECISION_LOG.md
  - docs/agentready/PROJECT_CHANGE_CONTROL.md
  - docs/agentready/GLOBAL_STANDARD_SITE_PROGRAM.md
  - docs/agentready/PUBLIC_SITE_INFORMATION_ARCHITECTURE.md
  - docs/agentready/SITE_COPY_GUIDE.md
  - docs/agentready/DISTRIBUTION_ADOPTION_AND_STANDARDIZATION_STRATEGY.md
  - docs/agentready/CLI_PUBLIC_DISTRIBUTION.md
  - docs/agentready/GITHUB_ACTION_USAGE.md
  - docs/agentready/GITHUB_ACTION_VERSIONING.md
  - docs/agentready/AGENTREADY_JSON_SPEC.md
  - docs/agentready/AGENTREADY_RULE_CODES.md
  - docs/agentready/COMMERCIAL_FIXTURE_CI_GATE_BEHAVIOR.md
  - docs/agentready/MCP_VERSION_COMPATIBILITY_POLICY.md
  - docs/agentready/PRIVACY_TELEMETRY_SUPPORT_AND_TRUST_MODEL.md
  - README.md
  - agentready-docs.html
  - agentready.html
  - agentready-mcp.html
  - agentready-ci.html
  - agentready-json.html
  - agentready-examples.html
  - agentready-resources.html
  - agentready-sample-report.html
  - action.yml
  - package.json

Dependencies:
  - ARB-SITE-GLOBAL-004

Deliverables:
  - Developer documentation hub aligned with product, standard, trust and Community surfaces
  - Browser scanner usage guidance for OpenAPI and MCP local scans without replacing the real scanners
  - CLI installation and command reference for the published Community package
  - GitHub Action installation guide with immutable tag and full-SHA pinning guidance
  - agentready.json and Markdown report interpretation guide
  - OpenAPI and MCP examples using reproducible fixtures and real output provenance
  - Integration and adoption guide from first browser scan to CLI and repository CI
  - Contribution process guidance based only on current repository capabilities
  - Troubleshooting and limitations guide that preserves static-analysis boundaries
  - Cross-links between product, standard, trust, examples, report and developer documentation surfaces
  - Evidence register and validator for the developer documentation and adoption foundation

Routes or surfaces:
  - agentready-docs.html
  - agentready.html
  - agentready-mcp.html
  - agentready-ci.html
  - agentready-json.html
  - agentready-examples.html
  - agentready-resources.html
  - agentready-sample-report.html
  - agentready-cli.html
  - agentready-action.html
  - agentready-adoption.html
  - agentready-contributing.html
  - agentready-troubleshooting.html
  - sitemap.xml
  - shared developer documentation assets where necessary

Allowed paths:
  - assets/**
  - *.html
  - docs/agentready/**
  - scripts/**
  - sitemap.xml
  - robots.txt

Forbidden paths:
  - agentready-core/**
  - cli/** where behavior would change
  - bin/**
  - package.json
  - action.yml
  - .github/workflows/** unless a separately identified stale validation guard requires a separately authorized correction
  - packaging/**
  - server/**
  - api/**
  - billing/**
  - account/**
  - LICENSE
  - NOTICE

Acceptance criteria by work item:
  - AR-SITE-GLOBAL-005: developer documentation entry points clearly route users to browser scanner, CLI, GitHub Action, reports, examples, standard and trust surfaces; browser scanner usage covers OpenAPI and MCP local-first behavior without replacing or degrading the real scanners; CLI documentation covers install and npx usage for @timeproofs/agentready@alpha and command behavior that exists today; GitHub Action documentation uses the public Marketplace Action, immutable Action tag and full-SHA pinning guidance already recorded in governance evidence; the canonical consumer workflow declares only permissions: contents: read unless a documented example explicitly requires otherwise; agentready.json and Markdown report interpretation explain score, status, findings, AR rule codes, PASS/FAIL and policy limitations consistently with the standard pages; OpenAPI and MCP examples use reproducible fixtures, commands and outputs from the current repository rather than invented findings; integration and adoption guidance moves from browser scan to CLI to repository CI without requiring signup, upload, token, account, backend or Pro purchase; contribution guidance is limited to real repository capabilities and does not promise governance processes, response times, partnerships or maintainer acceptance that do not exist; troubleshooting guidance covers invalid input, policy failure, output paths, path spaces, local environment issues and GitHub Action failures without changing CLI behavior; limitations remain explicit: AgentReady is static analysis, not a runtime firewall, IAM system, legal advice, audit, certification or guaranteed safety; Community is shown as free and available; Pro remains planned and not purchasable; Team, Agency and Enterprise are not presented as available; all public examples preserve the approved package version, npm alpha tag, Action facts and documented latest exception without performing npm, tag, Release or Marketplace operations; page bodies use varied premium documentation composition and remain mobile-friendly, keyboard accessible, usable without JavaScript for core content and free of 320px horizontal overflow; all CTA destinations and internal links resolve to existing or newly created real routes with no dead placeholder links presented as finished pages; no engine, CLI, package, Action, scoring, severity, AR001 through AR010 semantic, billing, account, backend, hosted scanning or runtime behavior changes occur

Batch acceptance criteria:
  - developer documentation entry points clearly route users to browser scanner, CLI, GitHub Action, reports, examples, standard and trust surfaces
  - browser scanner usage covers OpenAPI and MCP local-first behavior without replacing or degrading the real scanners
  - CLI documentation covers install and npx usage for @timeproofs/agentready@alpha and command behavior that exists today
  - GitHub Action documentation uses the public Marketplace Action, immutable Action tag and full-SHA pinning guidance already recorded in governance evidence
  - the canonical consumer workflow declares only permissions: contents: read unless a documented example explicitly requires otherwise
  - agentready.json and Markdown report interpretation explain score, status, findings, AR rule codes, PASS/FAIL and policy limitations consistently with the standard pages
  - OpenAPI and MCP examples use reproducible fixtures, commands and outputs from the current repository rather than invented findings
  - integration and adoption guidance moves from browser scan to CLI to repository CI without requiring signup, upload, token, account, backend or Pro purchase
  - contribution guidance is limited to real repository capabilities and does not promise governance processes, response times, partnerships or maintainer acceptance that do not exist
  - troubleshooting guidance covers invalid input, policy failure, output paths, path spaces, local environment issues and GitHub Action failures without changing CLI behavior
  - limitations remain explicit: AgentReady is static analysis, not a runtime firewall, IAM system, legal advice, audit, certification or guaranteed safety
  - Community is shown as free and available; Pro remains planned and not purchasable; Team, Agency and Enterprise are not presented as available
  - all public examples preserve the approved package version, npm alpha tag, Action facts and documented latest exception without performing npm, tag, Release or Marketplace operations
  - page bodies use varied premium documentation composition and remain mobile-friendly, keyboard accessible, usable without JavaScript for core content and free of 320px horizontal overflow
  - all CTA destinations and internal links resolve to existing or newly created real routes with no dead placeholder links presented as finished pages
  - no engine, CLI, package, Action, scoring, severity, AR001 through AR010 semantic, billing, account, backend, hosted scanning or runtime behavior changes occur

Commands:
  - node scripts/validate-agentready-site-navigation.mjs
  - node scripts/validate-agentready-developer-docs-foundation-site.mjs
  - node scripts/validate-agentready-strategy-docs.mjs
  - node scripts/validate-agentready-execution-system.mjs
  - node cli/tests/run-agentready-community-release-workflow-test.mjs
  - node cli/tests/run-agentready-cli-tests.mjs
  - node cli/tests/run-agentready-action-smoke-test.mjs
  - git diff --check

Independent test plan:
  - inventory current developer documentation, scanner, CLI, Action, example, contribution and troubleshooting sources before page edits
  - run real OpenAPI and MCP example commands before displaying any score, finding, report excerpt or JSON excerpt
  - verify CLI documentation against current CLI tests and behavior without modifying CLI implementation
  - verify GitHub Action documentation against action.yml, Marketplace evidence and immutable tag/full-SHA governance records
  - verify agentready.json and Markdown report explanations against AGENTREADY_JSON_SPEC.md and real generated outputs
  - verify contribution and support copy avoids unsupported process, support, SLA, governance, partnership or maintainer-acceptance promises
  - validate all CTA destinations and internal links
  - test desktop, mobile, keyboard, no-JavaScript and 320px layouts for every developer documentation route
  - verify no engine, CLI, package, Action, npm, tag, Release, Marketplace, billing, account, backend or runtime behavior changed
  - rerun deterministic governance regeneration and execution-system validators

Required evidence:
  - developer documentation source inventory
  - route map for docs scanner CLI Action report examples adoption contribution troubleshooting and limitations surfaces
  - real OpenAPI example provenance with fixture path command score status and output excerpt
  - real MCP example provenance with fixture path command score status and output excerpt
  - CLI command reference audit against current CLI behavior
  - GitHub Action usage and immutable pinning audit against current Marketplace evidence
  - agentready.json and Markdown report interpretation audit
  - contribution process source mapping and unsupported-promise audit
  - troubleshooting and limitations audit
  - Community and planned Pro consistency audit
  - CTA and internal-link report
  - desktop and mobile screenshots
  - keyboard accessibility report
  - no-JavaScript evidence
  - 320px overflow evidence
  - preview URL
  - validator and deterministic regeneration results

Rollback: Revert ARB-SITE-GLOBAL-005 without reverting PR #132 shell, PR #134 product foundation, PR #135 standard foundation or PR #136 trust/legal foundation.

Manual actions:
  - JEASON reviews the combined developer documentation and adoption preview
  - JEASON confirms contribution and troubleshooting copy does not promise unsupported support, governance or partner processes

Authorized external actions:
  - create or align static developer documentation, browser scanner usage, CLI, GitHub Action, report, examples, adoption, contribution and troubleshooting surfaces
  - add factual local diagrams or static assets derived from current repository sources
  - add or update validators for developer documentation, examples, adoption and contribution accuracy
  - update sitemap, robots and internal links only for real routes created or aligned by this batch

## Preliminary Codex steps

  - verify branch site-agentready-global-trust is at exact approved parent head 11c488ff98ecb4509dd8bbf916840bf8c9edce77
  - create branch site-agentready-global-docs-adoption from that exact parent head
  - open a draft PR targeting site-agentready-global-trust before broad page edits
  - inventory current developer documentation routes, scanner usage, CLI usage, GitHub Action usage, agentready.json documentation, examples, contribution guidance and troubleshooting copy
  - inventory real OpenAPI and MCP fixtures and commands before displaying any score, finding, report excerpt or JSON excerpt
  - verify PR #132, #134, #135 and #136 remain open draft and unmerged
  - confirm no npm, Action, tag, Release, Marketplace, engine, CLI, package, billing, account, backend or runtime operation is required



External verifications:
  - None

Forbidden actions:
  - do not modify the AgentReady engine
  - do not modify CLI behavior
  - do not modify scoring, severity or AR001 through AR010 semantics
  - do not modify package.json or action.yml
  - do not perform npm operations or change package publication state
  - do not create, move or delete tags
  - do not create or modify GitHub Releases or Marketplace operations
  - do not implement billing, accounts, backend, hosted scanning, telemetry or upload systems
  - do not implement the full SEO, GEO or international batch
  - do not present Pro as purchasable or Team, Agency or Enterprise as available
  - do not invent customers, benchmarks, certifications, standards-body recognition, support commitments or governance processes
  - do not merge any site PR

Response format:
- branch name
- draft PR number and URL
- base branch and exact approved base head
- exact head SHA
- files changed grouped by developer docs routes shared assets validators governance and evidence
- summary of each developer documentation, scanner, CLI, Action, report, examples, adoption, contribution and troubleshooting route
- exact source of every displayed example score finding report excerpt or JSON excerpt
- CLI and GitHub Action fact mapping
- agentready.json and report interpretation mapping
- contribution and troubleshooting boundary audit
- local validation results
- GitHub workflow results
- preview URL
- desktop and mobile evidence paths
- keyboard no-JavaScript and 320px overflow evidence
- remaining owner-review points
- confirmation that no npm tag Release Marketplace engine CLI billing account package or runtime operation occurred
- confirmation that no PR was merged

