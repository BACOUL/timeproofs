GENERATED FILE — DO NOT EDIT MANUALLY

Canonical source:
docs/agentready/AGENTREADY_EXECUTION_LEDGER.json

# Next Codex Prompt

Repository: BACOUL/timeproofs
Base: timeproofs
Batch ID: ARB-COM-002
Work item IDs: AR-COM-007, AR-COM-009
Owner: CODEX_AND_JEASON
Milestone: M3
Horizon: BEFORE_COMMUNITY_PUBLICATION
Objective: Publish public GitHub Action distribution.
Branch: feat-distribution-agentready-marketplace-action
PR title: feat(distribution): publish AgentReady GitHub Marketplace action

Documents sources:
  - docs/agentready/GITHUB_ACTION_VERSIONING.md
  - docs/agentready/GITHUB_ACTION_USAGE.md
  - docs/agentready/GITHUB_ACTION_MARKETPLACE_EXECUTION_SPEC.md
  - docs/agentready/VALIDATION_GATES_AND_EXTERNAL_PILOT.md

Dependencies:
  - ARB-COM-001

Deliverables:
  - canonical root Marketplace Action
  - migrated workflows and tests
  - tag-pinned and SHA-pinned public workflows
  - Marketplace prerelease and listing
  - supply-chain and rollback documentation
  - current public-site alignment
  - immutable evidence record

Routes or surfaces:
  - /action.yml
  - /.github/actions/agentready/action.yml removal
  - AgentReady workflows
  - Action tests
  - README and Action docs
  - index.html
  - pricing.html
  - agentready-ci.html
  - Action release evidence
  - Marketplace GitHub Release
  - Marketplace listing
  - Action release evidence documentation

Allowed paths:
  - action.yml
  - .github/actions/agentready/action.yml
  - .github/workflows/**
  - cli/tests/**
  - scripts/**
  - docs/agentready/**
  - README.md
  - AGENTREADY_PROJECT_CONTEXT.md
  - CHANGELOG.md
  - index.html
  - pricing.html
  - agentready-ci.html

Forbidden paths:
  - agentready-core/**
  - bin/**
  - package.json
  - packaging/agentready-community/**
  - LICENSE
  - NOTICE
  - server/**
  - api/**

Acceptance criteria by work item:
  - AR-COM-007: one Marketplace metadata file exists at repository root as action.yml; nested Action metadata is removed after every reference is migrated; root Action preserves file type min-score fail-on and out inputs; root Action preserves score status report-path and contract-path outputs; root Action preserves exit codes and policy-failure outputs; root metadata contains the reviewed unique-name candidate author description shield branding and blue color; internal workflows use the root Action; public docs include immutable Action tag and full-SHA examples; canonical consumer workflow declares contents read and no broader permissions; no secret or TimeProofs backend is required; existing v0.1.0-alpha.0 tag and release remain unchanged; reserved tag agentready-action-v0.1.0-alpha.0 is used only at the owner checkpoint; Marketplace publication is performed only through the reviewed owner checkpoint; public site states Community is available and Pro is in preparation; active public pages remove manual review Fix Pack email payment mandatory contact and available-Pro wording; Marketplace wording does not imply GitHub validation certification or guaranteed safety; no npm operation package version change engine change or runtime feature is introduced
  - AR-COM-009: repository is public; one action.yml exists at root; metadata name is confirmed unique by the Marketplace interface; author description inputs outputs runs and branding are valid; listing copy states static scope privacy behavior and mandatory limitation; listing does not imply GitHub validation certification or guaranteed safety; immutable tag and full-SHA guidance are visible; minimum contents-read permission is visible; Marketplace Developer Agreement and owner 2FA remain private owner actions; final public Release and Marketplace URLs are recorded; a Marketplace validation rejection stops publication and is recorded honestly

Batch acceptance criteria:
  - all AR-COM-007 and AR-COM-009 criteria pass
  - all automated validations pass before the owner checkpoint
  - owner publishes only the approved immutable Action commit
  - post-publication public Action run passes
  - release listing and site evidence are recorded before merge
  - existing npm package release and tag remain unchanged

Commands:
  - node agentready-core/tests/run-agentready-core-tests.mjs
  - node cli/tests/run-agentready-cli-tests.mjs
  - node cli/tests/run-agentready-action-smoke-test.mjs
  - node cli/tests/run-agentready-package-smoke-test.mjs
  - node cli/tests/run-agentready-community-release-workflow-test.mjs
  - node scripts/validate-agentready-action-marketplace-readiness.mjs
  - node scripts/rebuild-agentready-ledger-data.mjs
  - node scripts/generate-agentready-ledger-views.mjs --write
  - node scripts/generate-agentready-status.mjs --write
  - node scripts/generate-agentready-next-action.mjs --write
  - node scripts/generate-agentready-next-prompt.mjs --write
  - node scripts/validate-agentready-strategy-docs.mjs
  - node scripts/validate-agentready-execution-system.mjs
  - git diff --check

Independent test plan:
  - preflight existing Action behavior
  - validate root migration and metadata
  - run complete regression suite
  - validate active site copy
  - perform owner Marketplace checkpoint
  - verify public tag listing and full-SHA references
  - rerun deterministic governance generation

Required evidence:
  - root metadata audit
  - reference migration inventory
  - test and workflow evidence
  - approved implementation SHA
  - immutable Action tag target
  - GitHub prerelease URL
  - Marketplace URL
  - public tag workflow run
  - full-SHA example
  - permissions and supply-chain review
  - site alignment report
  - rollback procedure

Rollback: Before tagging, revert or close the PR. After Marketplace publication, preserve the immutable tag and audit trail, remove the affected release from Marketplace if necessary, publish a notice, and issue a corrected immutable Action tag.

Manual actions:
  - JEASON approves the exact implementation commit
  - JEASON accepts any required Marketplace agreement and publishes the tagged prerelease privately with 2FA
  - JEASON returns public URLs only
  - JEASON reviews final evidence before merge

Authorized external actions:
  - prepare and validate the root Action
  - migrate internal Action references
  - update approved docs tests workflows and public pages
  - after owner confirmation verify and record the public Action release and Marketplace listing

## Étape Codex préalable

  - verify existing release immutability
  - run existing Action tests
  - inventory nested references and stale active-site wording
  - confirm root action.yml is absent
  - open a draft PR

## Point de contrôle propriétaire obligatoire

  - approve exact implementation SHA
  - accept Marketplace agreement if required
  - tag exact commit as agentready-action-v0.1.0-alpha.0
  - publish Marketplace prerelease with private 2FA
  - provide public Release and Marketplace URLs only

## Après confirmation propriétaire

  - verify tag target release and listing
  - run public tag reference
  - record full SHA and final metadata
  - replace placeholders
  - record all evidence
  - request final human review

External verifications:
  - current GitHub Marketplace root metadata and publication requirements
  - public Marketplace listing availability

Forbidden actions:
  - no npm operation
  - no movement or reuse of v0.1.0-alpha.0
  - no moving Action major tag
  - no engine CLI package billing backend or runtime changes
  - no credentials or 2FA material
  - no merge before final owner review

Response format: summarize files changed, validations, workflow status, draft status, and any remaining human review.

