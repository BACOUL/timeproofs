GENERATED FILE — DO NOT EDIT MANUALLY

Canonical source:
docs/agentready/AGENTREADY_EXECUTION_LEDGER.json

# AgentReady Execution Ledger

## Milestones
### M1 - Governance locked
Status: IN_PROGRESS
Horizon: BEFORE_COMMUNITY_PUBLICATION
Exit criteria:
  - sources of truth defined
  - canonical ledger valid
  - generated views synchronized
  - change control defined
  - next action identifiable

### M2 - Community publication blockers resolved
Status: PLANNED
Horizon: BEFORE_COMMUNITY_PUBLICATION
Exit criteria:
  - npm scope controlled or alternative approved
  - license approved
  - ProofSpec references classified and treated
  - npm security defined
  - provenance defined
  - publication explicitly approvable

### M3 - Community publicly usable
Status: PLANNED
Horizon: BEFORE_COMMUNITY_PUBLICATION
Exit criteria:
  - npm package published
  - immutable tag
  - GitHub Release
  - public installation tested
  - public Action usable
  - onboarding documented
  - no signup
  - no payment

### M4 - Engine benchmark established
Status: PLANNED
Horizon: BEFORE_PRO_TECHNICAL_COMPLETION
Exit criteria:
  - OpenAPI and MCP corpora
  - human annotations
  - precision and recall
  - false-positive and false-negative rates
  - performance
  - reproducibility
  - AR001 AR003 AR008 AR010 treated or documented

### M5 - Pro technically complete
Status: PLANNED
Horizon: BEFORE_PRO_TECHNICAL_COMPLETION
Exit criteria:
  - versioned policy
  - baseline
  - new-risks-only
  - SARIF
  - pull request annotations
  - local structured exceptions
  - tests

### M6 - Pro commercially sellable
Status: PLANNED
Horizon: BEFORE_PRO_FIRST_SALE
Exit criteria:
  - license and entitlements
  - activation
  - five repositories
  - Stripe
  - VAT
  - subscription lifecycle
  - portal
  - emails
  - legal
  - support
  - controlled purchase

### M7 - Global launch ready
Status: PLANNED
Horizon: BEFORE_GLOBAL_LAUNCH
Exit criteria:
  - global product site
  - documentation
  - Trust Center
  - SEO
  - GEO
  - accessibility
  - performance
  - competition
  - support and incidents

### M8 - Category-building active
Status: PLANNED
Horizon: POST_LAUNCH
Exit criteria:
  - public AR dictionary
  - AR001-AR010 pages
  - bad/fixed library
  - integrations
  - targeted contributions
  - benchmark methodology
  - observatory only when prerequisites are met

## Tasks
### AR-GOV-EPIC - Governance and anti-drift
- Type: EPIC
- Status: IN_PROGRESS
- Owner: CODEX_AND_JEASON
- Milestone: M1
- Horizon: BEFORE_COMMUNITY_PUBLICATION
- Workstream: GOV
- Weight: 8
- Depends on: None
- Branch: None
- PR title: None

Acceptance criteria:
  - governance child tasks are tracked
Required evidence:
  - child tasks tracked in ledger

### AR-GOV-001 - Rebaseline Community and Pro strategy
- Type: CODEX_PR
- Status: DONE
- Owner: CODEX
- Milestone: M1
- Horizon: BEFORE_COMMUNITY_PUBLICATION
- Workstream: GOV
- Weight: 5
- Depends on: None
- Branch: docs-agentready-community-pro-rebaseline
- PR title: docs(product): rebaseline AgentReady Community and Pro strategy
- PR: #113
Acceptance criteria:
  - strategy rebaseline merged
  - Team and Agency post-revenue
  - Community free CI blocking preserved
Required evidence:
  - PR #113 merge SHA

### AR-GOV-002 - Resolve and record Community publication blockers
- Type: CODEX_PR
- Status: DONE
- Owner: CODEX
- Milestone: M1
- Horizon: BEFORE_COMMUNITY_PUBLICATION
- Workstream: GOV
- Weight: 3
- Depends on: AR-GOV-001
- Branch: release-agentready-community-publication-blockers
- PR title: release(agentready): resolve Community publication blockers
- PR: #114
Acceptance criteria:
  - blockers classified
  - PUBLICATION APPROVED remains NO
  - package remains private
Required evidence:
  - PR #114 merge SHA

### AR-GOV-003 - Add canonical AgentReady execution system
- Type: CODEX_PR
- Status: IN_REVIEW
- Owner: CODEX_AND_JEASON
- Milestone: M1
- Horizon: BEFORE_COMMUNITY_PUBLICATION
- Workstream: GOV
- Weight: 5
- Depends on: AR-GOV-002
- Branch: docs-agentready-canonical-execution-system
- PR title: docs(project): add canonical AgentReady execution system
- PR: #115
Acceptance criteria:
  - canonical ledger exists
  - generated views synchronized
  - next action and prompt generated
  - prompt counts generated
  - human ledger review required
Required evidence:
  - draft PR #115
  - workflow success
  - human ledger review before merge

### AR-GOV-004 - Monthly execution ledger review
- Type: RECURRING_OPERATION
- Status: RECURRING
- Owner: CODEX_AND_JEASON
- Milestone: M1
- Horizon: POST_LAUNCH
- Workstream: OPS
- Weight: 2
- Depends on: AR-GOV-003
- Branch: None
- PR title: None

Acceptance criteria:
  - monthly review completed
Required evidence:
  - dated review evidence

### AR-COM-EPIC - Community publication
- Type: EPIC
- Status: PLANNED
- Owner: CODEX_AND_JEASON
- Milestone: M2
- Horizon: BEFORE_COMMUNITY_PUBLICATION
- Workstream: COM
- Weight: 8
- Depends on: AR-GOV-003
- Branch: None
- PR title: None

Acceptance criteria:
  - Community publication child tasks are tracked
Required evidence:
  - child tasks tracked in ledger

### AR-COM-001 - Verify control of npm scope @timeproofs
- Type: OWNER_ACTION
- Status: OWNER_ACTION_REQUIRED
- Owner: JEASON
- Milestone: M2
- Horizon: BEFORE_COMMUNITY_PUBLICATION
- Workstream: OWNER
- Weight: 3
- Depends on: AR-GOV-003
- Branch: None
- PR title: None

Acceptance criteria:
  - scope control verified with dated evidence
  - package publish rights verified
Required evidence:
  - owner-provided npm scope evidence

### AR-COM-002 - Define npm account security
- Type: OWNER_ACTION
- Status: OWNER_ACTION_REQUIRED
- Owner: JEASON
- Milestone: M2
- Horizon: BEFORE_COMMUNITY_PUBLICATION
- Workstream: OWNER
- Weight: 2
- Depends on: AR-GOV-003
- Branch: None
- PR title: None

Acceptance criteria:
  - 2FA or trusted publishing recorded
  - no long-lived npm token stored
Required evidence:
  - owner-provided npm security evidence

### AR-COM-003 - Approve AgentReady Community license
- Type: LEGAL_REVIEW
- Status: LEGAL_REVIEW_REQUIRED
- Owner: LEGAL
- Milestone: M2
- Horizon: BEFORE_COMMUNITY_PUBLICATION
- Workstream: LEG
- Weight: 3
- Depends on: AR-GOV-003
- Branch: None
- PR title: None

Acceptance criteria:
  - final license approved
  - package license and LICENSE coherent
Required evidence:
  - legal approval or owner legal decision

### AR-COM-004 - Treat package-public ProofSpec references
- Type: LEGAL_REVIEW
- Status: LEGAL_REVIEW_REQUIRED
- Owner: LEGAL
- Milestone: M2
- Horizon: BEFORE_COMMUNITY_PUBLICATION
- Workstream: LEG
- Weight: 3
- Depends on: AR-GOV-003
- Branch: None
- PR title: None

Acceptance criteria:
  - legacy references removed, renamed or legally justified
Required evidence:
  - legal treatment decision
  - updated package-public audit

### AR-COM-005 - Approve final Community tarball content
- Type: OWNER_ACTION
- Status: OWNER_ACTION_REQUIRED
- Owner: JEASON
- Milestone: M2
- Horizon: BEFORE_COMMUNITY_PUBLICATION
- Workstream: OWNER
- Weight: 2
- Depends on: AR-COM-003, AR-COM-004
- Branch: None
- PR title: None

Acceptance criteria:
  - tarball file list reviewed
  - checksum approved
Required evidence:
  - approved tarball SHA-256
  - approved source commit

### AR-COM-006A - Explicit Community publication approval
- Type: DECISION_GATE
- Status: DECISION_REQUIRED
- Owner: JEASON
- Milestone: M2
- Horizon: BEFORE_COMMUNITY_PUBLICATION
- Workstream: OWNER
- Weight: 1
- Depends on: AR-COM-001, AR-COM-002, AR-COM-003, AR-COM-004, AR-COM-005
- Branch: None
- PR title: None

Acceptance criteria:
  - PUBLICATION APPROVED explicitly set by owner
Required evidence:
  - approved commit
  - approved version
  - approved tarball SHA-256
  - approval date

### AR-COM-006 - Publish Community CLI and immutable release
- Type: CODEX_PR
- Status: BLOCKED
- Owner: CODEX
- Milestone: M3
- Horizon: BEFORE_COMMUNITY_PUBLICATION
- Workstream: COM
- Weight: 5
- Depends on: AR-COM-001, AR-COM-002, AR-COM-003, AR-COM-004, AR-COM-005, AR-COM-006A
- Branch: release-agentready-community-cli
- PR title: release(agentready): publish Community CLI and immutable release

Acceptance criteria:
  - publication only from approved commit
  - immutable tag and GitHub Release only when approved
  - public install tested
Required evidence:
  - npm package URL
  - immutable tag
  - GitHub Release URL
  - public installation test

### AR-COM-007 - Publish public AgentReady GitHub Action distribution
- Type: CODEX_PR
- Status: PLANNED
- Owner: CODEX
- Milestone: M3
- Horizon: BEFORE_COMMUNITY_PUBLICATION
- Workstream: COM
- Weight: 3
- Depends on: AR-COM-006
- Branch: feat-distribution-agentready-marketplace-action
- PR title: feat(distribution): publish AgentReady GitHub Marketplace action

Acceptance criteria:
  - public Action distribution documented
  - Marketplace wording not certification wording
Required evidence:
  - public Action usage evidence

### AR-ONB-EPIC - Community onboarding
- Type: EPIC
- Status: PLANNED
- Owner: CODEX
- Milestone: M3
- Horizon: BEFORE_COMMUNITY_PUBLICATION
- Workstream: ONB
- Weight: 8
- Depends on: AR-COM-006
- Branch: None
- PR title: None

Acceptance criteria:
  - onboarding child tasks are tracked
Required evidence:
  - child tasks tracked in ledger

### AR-ONB-001 - Add three-minute Community onboarding commands
- Type: CODEX_PR
- Status: PLANNED
- Owner: CODEX
- Milestone: M3
- Horizon: BEFORE_COMMUNITY_PUBLICATION
- Workstream: ONB
- Weight: 5
- Depends on: AR-COM-006
- Branch: feat-community-three-minute-onboarding
- PR title: feat(community): add three-minute onboarding commands

Acceptance criteria:
  - init detects OpenAPI/MCP
  - files shown before writing
  - demo works locally
Required evidence:
  - clean install onboarding test

### AR-ENG-EPIC - Engine benchmark and quality
- Type: EPIC
- Status: PLANNED
- Owner: CODEX_AND_JEASON
- Milestone: M4
- Horizon: BEFORE_PRO_TECHNICAL_COMPLETION
- Workstream: ENG
- Weight: 8
- Depends on: AR-COM-006
- Branch: None
- PR title: None

Acceptance criteria:
  - benchmark child tasks are tracked
Required evidence:
  - child tasks tracked in ledger

### AR-ENG-001 - Add labeled benchmark foundation
- Type: CODEX_PR
- Status: PLANNED
- Owner: CODEX
- Milestone: M4
- Horizon: BEFORE_PRO_TECHNICAL_COMPLETION
- Workstream: ENG
- Weight: 5
- Depends on: AR-COM-006
- Branch: test-engine-agentready-labeled-benchmark
- PR title: test(engine): add AgentReady labeled benchmark foundation

Acceptance criteria:
  - safe/dangerous corpora exist
  - human annotations exist
  - precision and recall calculable
Required evidence:
  - benchmark report
  - test results

### AR-ENG-002 - Align AR001 AR003 AR008 and AR010 semantics
- Type: CODEX_PR
- Status: PLANNED
- Owner: CODEX
- Milestone: M4
- Horizon: BEFORE_PRO_TECHNICAL_COMPLETION
- Workstream: ENG
- Weight: 5
- Depends on: AR-ENG-001
- Branch: fix-engine-align-rule-semantics
- PR title: fix(engine): align AR001 AR003 AR008 and AR010 semantics

Acceptance criteria:
  - rule semantics match scope or limitations
  - benchmark regressions updated
Required evidence:
  - benchmark delta
  - core tests

### AR-PRO-EPIC - Pro MVP
- Type: EPIC
- Status: PLANNED
- Owner: CODEX
- Milestone: M5
- Horizon: BEFORE_PRO_TECHNICAL_COMPLETION
- Workstream: PRO
- Weight: 8
- Depends on: AR-ENG-001
- Branch: None
- PR title: None

Acceptance criteria:
  - Pro MVP child tasks are tracked
Required evidence:
  - child tasks tracked in ledger

### AR-PRO-001 - Add versioned AgentReady policy configuration
- Type: CODEX_PR
- Status: PLANNED
- Owner: CODEX
- Milestone: M5
- Horizon: BEFORE_PRO_TECHNICAL_COMPLETION
- Workstream: PRO
- Weight: 3
- Depends on: AR-ENG-001
- Branch: feat-pro-versioned-policy-configuration
- PR title: feat(pro): add versioned AgentReady policy configuration

Acceptance criteria:
  - policy file versioned
  - Community blocking remains free
Required evidence:
  - CLI tests
  - policy examples

### AR-PRO-002 - Add baseline and new-risk comparison
- Type: CODEX_PR
- Status: PLANNED
- Owner: CODEX
- Milestone: M5
- Horizon: BEFORE_PRO_TECHNICAL_COMPLETION
- Workstream: PRO
- Weight: 5
- Depends on: AR-PRO-001
- Branch: feat-pro-baseline-new-risk-comparison
- PR title: feat(pro): add baseline and new-risk comparison

Acceptance criteria:
  - baseline comparison exists
  - new-risk-only mode exists
Required evidence:
  - baseline fixture tests

### AR-PRO-003 - Add SARIF export and pull request annotations
- Type: CODEX_PR
- Status: PLANNED
- Owner: CODEX
- Milestone: M5
- Horizon: BEFORE_PRO_TECHNICAL_COMPLETION
- Workstream: PRO
- Weight: 5
- Depends on: AR-PRO-002
- Branch: feat-pro-sarif-pr-annotations
- PR title: feat(pro): add SARIF export and pull request annotations

Acceptance criteria:
  - SARIF output validates
  - PR annotation behavior documented and tested
Required evidence:
  - SARIF validation
  - annotation smoke test

### AR-PRO-004 - Add documented and expiring policy exceptions
- Type: CODEX_PR
- Status: PLANNED
- Owner: CODEX
- Milestone: M5
- Horizon: BEFORE_PRO_TECHNICAL_COMPLETION
- Workstream: PRO
- Weight: 5
- Depends on: AR-PRO-003
- Branch: feat-pro-expiring-policy-exceptions
- PR title: feat(pro): add documented and expiring policy exceptions

Acceptance criteria:
  - exceptions structured
  - reason owner expiration required
  - exceptions portable
Required evidence:
  - exception fixtures
  - CLI tests

### AR-LIC-EPIC - Licensing and entitlements
- Type: EPIC
- Status: PLANNED
- Owner: CODEX
- Milestone: M6
- Horizon: BEFORE_PRO_FIRST_SALE
- Workstream: LIC
- Weight: 8
- Depends on: AR-PRO-004
- Branch: None
- PR title: None

Acceptance criteria:
  - licensing child tasks are tracked
Required evidence:
  - child tasks tracked in ledger

### AR-LIC-001 - Implement Community and Pro entitlements
- Type: CODEX_PR
- Status: PLANNED
- Owner: CODEX
- Milestone: M6
- Horizon: BEFORE_PRO_FIRST_SALE
- Workstream: LIC
- Weight: 5
- Depends on: AR-PRO-004
- Branch: feat-commercial-community-pro-entitlements
- PR title: feat(commercial): implement Community and Pro entitlements

Acceptance criteria:
  - Community no license requirement
  - Pro five registered repositories
  - Team/Agency post-revenue
Required evidence:
  - entitlement tests

### AR-LIC-002 - Add privacy-first license activation
- Type: CODEX_PR
- Status: PLANNED
- Owner: CODEX
- Milestone: M6
- Horizon: BEFORE_PRO_FIRST_SALE
- Workstream: LIC
- Weight: 5
- Depends on: AR-LIC-001
- Branch: feat-licensing-privacy-first-activation
- PR title: feat(licensing): add privacy-first license activation

Acceptance criteria:
  - raw key not stored server-side
  - contracts not sent to license service
  - offline behavior documented
Required evidence:
  - license activation tests
  - privacy review

### AR-BILL-EPIC - Stripe and commercial automation
- Type: EPIC
- Status: PLANNED
- Owner: CODEX_AND_JEASON
- Milestone: M6
- Horizon: BEFORE_PRO_FIRST_SALE
- Workstream: BILL
- Weight: 8
- Depends on: AR-LIC-002
- Branch: None
- PR title: None

Acceptance criteria:
  - billing child tasks are tracked
Required evidence:
  - child tasks tracked in ledger

### AR-BILL-001 - Verify Stripe account tax and payment readiness
- Type: OWNER_ACTION
- Status: OWNER_ACTION_REQUIRED
- Owner: JEASON
- Milestone: M6
- Horizon: BEFORE_PRO_FIRST_SALE
- Workstream: FIN
- Weight: 3
- Depends on: AR-LIC-002
- Branch: None
- PR title: None

Acceptance criteria:
  - Stripe test account ready
  - VAT obligations confirmed
  - B2B terms prerequisite recorded
Required evidence:
  - owner verification record

### AR-BILL-002 - Add Stripe Checkout test flow and provisioning
- Type: CODEX_PR
- Status: PLANNED
- Owner: CODEX
- Milestone: M6
- Horizon: BEFORE_PRO_FIRST_SALE
- Workstream: BILL
- Weight: 5
- Depends on: AR-BILL-001
- Branch: feat-billing-stripe-checkout-test-flow
- PR title: feat(billing): add Stripe Checkout test flow

Acceptance criteria:
  - test checkout works
  - webhooks idempotent
  - failed payments handled
Required evidence:
  - test purchase evidence
  - webhook replay evidence

### AR-SITE-EPIC - Global product website and launch surface
- Type: EPIC
- Status: PLANNED
- Owner: CODEX_AND_JEASON
- Milestone: M7
- Horizon: BEFORE_GLOBAL_LAUNCH
- Workstream: SITE
- Weight: 8
- Depends on: AR-BILL-002
- Branch: None
- PR title: None

Acceptance criteria:
  - global launch child tasks are tracked
Required evidence:
  - child tasks tracked in ledger

### AR-SITE-001 - Publish Community and Pro pricing and purchase flow
- Type: CODEX_PR
- Status: PLANNED
- Owner: CODEX
- Milestone: M7
- Horizon: BEFORE_GLOBAL_LAUNCH
- Workstream: SITE
- Weight: 5
- Depends on: AR-BILL-002
- Branch: site-commercial-community-pro-pricing
- PR title: site(commercial): publish Community and Pro pricing and purchase flow

Acceptance criteria:
  - pricing reflects only available plans
  - no Team/Agency purchase at launch
  - browser QA completed
Required evidence:
  - browser QA
  - link check

### AR-SITE-002 - Publish Trust Center legal privacy and support pages
- Type: CODEX_PR
- Status: PLANNED
- Owner: CODEX
- Milestone: M7
- Horizon: BEFORE_GLOBAL_LAUNCH
- Workstream: SITE
- Weight: 5
- Depends on: AR-LEG-001
- Branch: site-trust-legal-privacy-support
- PR title: site(trust): publish AgentReady Trust Center

Acceptance criteria:
  - trust model distinguishes data types
  - legal placeholders completed or blocked
  - support channels realistic
Required evidence:
  - legal review evidence
  - browser QA

### AR-SEO-001 - Complete technical search architecture
- Type: CODEX_PR
- Status: PLANNED
- Owner: CODEX
- Milestone: M7
- Horizon: BEFORE_GLOBAL_LAUNCH
- Workstream: SEO
- Weight: 5
- Depends on: AR-SITE-001
- Branch: seo-site-technical-search-architecture
- PR title: seo(site): complete technical search architecture

Acceptance criteria:
  - canonical and sitemap coherent
  - structured data reflects visible content
  - Core Web Vitals risk reviewed
Required evidence:
  - static link check
  - metadata review

### AR-GEO-001 - Add machine-readable AgentReady discovery layer
- Type: CODEX_PR
- Status: POST_LAUNCH
- Owner: CODEX
- Milestone: M8
- Horizon: POST_LAUNCH
- Workstream: GEO
- Weight: 3
- Depends on: AR-SEO-001
- Branch: ai-site-agentready-discovery-layer
- PR title: ai(site): add machine-readable AgentReady discovery layer

Acceptance criteria:
  - content accessible without JavaScript
  - experimental files not presented as official standards
Required evidence:
  - AI-readable content review

### AR-COMP-001 - Verify competitors and pricing categories
- Type: EXTERNAL_VERIFICATION
- Status: EXTERNAL_VERIFICATION_REQUIRED
- Owner: EXTERNAL_SPECIALIST
- Milestone: M7
- Horizon: BEFORE_GLOBAL_LAUNCH
- Workstream: COMP
- Weight: 3
- Depends on: AR-GOV-003
- Branch: None
- PR title: None

Acceptance criteria:
  - sources dated
  - pricing comparisons current
  - no partnership implied
Required evidence:
  - competitive research report with sources and dates

### AR-DOC-001 - Publish AgentReady developer documentation hub
- Type: CODEX_PR
- Status: PLANNED
- Owner: CODEX
- Milestone: M7
- Horizon: BEFORE_GLOBAL_LAUNCH
- Workstream: DOC
- Weight: 5
- Depends on: AR-PRO-004
- Branch: docs-site-agentready-developer-hub
- PR title: docs(site): publish AgentReady developer documentation hub

Acceptance criteria:
  - docs hub links CLI Action policy SARIF exceptions and troubleshooting
  - docs public without JavaScript
Required evidence:
  - link check
  - documentation review

### AR-INT-001 - Publish framework integration guides
- Type: CODEX_PR
- Status: POST_LAUNCH
- Owner: CODEX
- Milestone: M8
- Horizon: POST_LAUNCH
- Workstream: INT
- Weight: 3
- Depends on: AR-DOC-001
- Branch: docs-integrations-agentready-framework-guides
- PR title: docs(integrations): publish framework integration guides

Acceptance criteria:
  - no partnership or endorsement claimed
  - guides include tested examples
Required evidence:
  - guide review
  - example validation

### AR-CAT-001 - Publish AgentReady rule dictionary and badges
- Type: CODEX_PR
- Status: POST_LAUNCH
- Owner: CODEX
- Milestone: M8
- Horizon: POST_LAUNCH
- Workstream: CAT
- Weight: 5
- Depends on: AR-ENG-001
- Branch: docs-site-agentready-rule-dictionary
- PR title: docs(site): publish AgentReady rule dictionary

Acceptance criteria:
  - AR pages include bad/fixed examples
  - badges avoid certification wording
  - rule namespace governance public
Required evidence:
  - rule page QA
  - badge wording review

### AR-LEG-001 - Finalize legal B2B terms privacy and liability
- Type: LEGAL_REVIEW
- Status: LEGAL_REVIEW_REQUIRED
- Owner: LEGAL
- Milestone: M6
- Horizon: BEFORE_PRO_FIRST_SALE
- Workstream: LEG
- Weight: 5
- Depends on: AR-BILL-001
- Branch: None
- PR title: None

Acceptance criteria:
  - terms legally reviewed
  - privacy and cookies legally reviewed
  - insurance need documented
Required evidence:
  - legal review signoff

### AR-INFRA-001 - Add minimal production infrastructure architecture
- Type: CODEX_PR
- Status: PLANNED
- Owner: CODEX
- Milestone: M6
- Horizon: BEFORE_PRO_FIRST_SALE
- Workstream: INFRA
- Weight: 5
- Depends on: AR-LIC-002
- Branch: feat-infra-minimal-agentready-production
- PR title: feat(infra): add minimal AgentReady production infrastructure

Acceptance criteria:
  - staging and production separated
  - backup and restore tested
  - cost limits documented
Required evidence:
  - restore test
  - architecture diagram

### AR-SEC-001 - Review security and software supply chain
- Type: SECURITY_REVIEW
- Status: SECURITY_REVIEW_REQUIRED
- Owner: SECURITY
- Milestone: M6
- Horizon: BEFORE_PRO_FIRST_SALE
- Workstream: SEC
- Weight: 5
- Depends on: AR-INFRA-001, AR-BILL-002
- Branch: None
- PR title: None

Acceptance criteria:
  - security review findings recorded
  - critical issues fixed or accepted
Required evidence:
  - security review report

### AR-REL-001 - Add reliability runbooks and status model
- Type: CODEX_PR
- Status: PLANNED
- Owner: CODEX
- Milestone: M7
- Horizon: BEFORE_GLOBAL_LAUNCH
- Workstream: REL
- Weight: 3
- Depends on: AR-INFRA-001
- Branch: docs-reliability-agentready-runbooks
- PR title: docs(ops): add AgentReady reliability runbooks

Acceptance criteria:
  - incident runbook exists
  - rollback and cost alerts documented
Required evidence:
  - runbook review

### AR-FIN-001 - Define accounting VAT and Stripe reconciliation workflow
- Type: OWNER_ACTION
- Status: OWNER_ACTION_REQUIRED
- Owner: JEASON
- Milestone: M6
- Horizon: BEFORE_PRO_FIRST_SALE
- Workstream: FIN
- Weight: 3
- Depends on: AR-BILL-001
- Branch: None
- PR title: None

Acceptance criteria:
  - accounting workflow written
  - VAT confirmed
  - refund process confirmed
Required evidence:
  - owner accounting workflow decision

### AR-SUPPORT-001 - Add self-service support and help center
- Type: CODEX_PR
- Status: PLANNED
- Owner: CODEX
- Milestone: M6
- Horizon: BEFORE_PRO_FIRST_SALE
- Workstream: SUPPORT
- Weight: 3
- Depends on: AR-LEG-001
- Branch: site-product-self-service-help
- PR title: site(product): add self-service onboarding and help

Acceptance criteria:
  - support channels realistic
  - no zero-human-intervention promise
  - billing and privacy contacts exist
Required evidence:
  - support content review

### AR-UX-001 - Review premium UX conversion and accessibility
- Type: DESIGN_REVIEW
- Status: EXTERNAL_SPECIALIST_REQUIRED
- Owner: DESIGN
- Milestone: M7
- Horizon: BEFORE_GLOBAL_LAUNCH
- Workstream: UX
- Weight: 3
- Depends on: AR-SITE-001, AR-SITE-002
- Branch: None
- PR title: None

Acceptance criteria:
  - design review completed
  - accessibility and mobile issues recorded
Required evidence:
  - design review report

### AR-LAUNCH-001 - Run AgentReady Community and Pro launch audit
- Type: CODEX_PR
- Status: PLANNED
- Owner: CODEX_AND_JEASON
- Milestone: M7
- Horizon: BEFORE_GLOBAL_LAUNCH
- Workstream: LAUNCH
- Weight: 5
- Depends on: AR-SITE-002, AR-SEC-001, AR-FIN-001
- Branch: qa-launch-agentready-community-pro
- PR title: qa(launch): run AgentReady Community and Pro launch audit

Acceptance criteria:
  - blocking launch categories ready or documented
  - controlled purchase test passes
  - rollback plan exists
Required evidence:
  - launch audit report
  - owner launch decision

### AR-MARKET-001 - Evaluate first Community users and Pro price signal
- Type: DECISION_GATE
- Status: DECISION_REQUIRED
- Owner: JEASON
- Milestone: M7
- Horizon: BEFORE_GLOBAL_LAUNCH
- Workstream: MARKET
- Weight: 3
- Depends on: AR-COM-006
- Branch: None
- PR title: None

Acceptance criteria:
  - first user data reviewed
  - price signal recorded
  - selected outcome documented
Required evidence:
  - decision gate record

### AR-ACQ-001 - Prepare global launch acquisition plan
- Type: CODEX_PR
- Status: PLANNED
- Owner: CODEX
- Milestone: M7
- Horizon: BEFORE_GLOBAL_LAUNCH
- Workstream: ACQ
- Weight: 3
- Depends on: AR-COMP-001
- Branch: docs-acquisition-agentready-launch-plan
- PR title: docs(acquisition): prepare AgentReady global launch plan

Acceptance criteria:
  - no bulk spam PR campaign
  - channels have evidence requirements
  - case study process ethical
Required evidence:
  - launch plan review

### AR-OPS-001 - Run monthly post-launch operations review
- Type: RECURRING_OPERATION
- Status: RECURRING
- Owner: CODEX_AND_JEASON
- Milestone: M8
- Horizon: POST_LAUNCH
- Workstream: OPS
- Weight: 3
- Depends on: AR-LAUNCH-001
- Branch: None
- PR title: None

Acceptance criteria:
  - monthly review has evidence
  - new work enters change control
Required evidence:
  - monthly operations review

### AR-I18N-001 - Verify internationalization obligations
- Type: EXTERNAL_VERIFICATION
- Status: POST_LAUNCH
- Owner: EXTERNAL_SPECIALIST
- Milestone: M8
- Horizon: POST_LAUNCH
- Workstream: I18N
- Weight: 2
- Depends on: AR-SITE-001
- Branch: None
- PR title: None

Acceptance criteria:
  - international requirements dated
  - English canonical policy preserved
Required evidence:
  - internationalization review

### AR-TEAM-001 - Team and Agency post-revenue expansion
- Type: CODEX_PR
- Status: POST_REVENUE
- Owner: CODEX
- Milestone: M8
- Horizon: POST_REVENUE
- Workstream: PRO
- Weight: 8
- Depends on: AR-LAUNCH-001, AR-MARKET-001
- Branch: feat-post-revenue-team-agency
- PR title: feat(post-revenue): add Team and Agency expansion

Acceptance criteria:
  - revenue or repeated demand evidenced
  - Team and Agency not launch offers
Required evidence:
  - post-revenue decision evidence

