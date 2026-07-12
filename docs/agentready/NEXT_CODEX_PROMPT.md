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
  - docs/agentready/GITHUB_MARKETPLACE_DISTRIBUTION_SPEC.md

Dependencies:
  - ARB-COM-001
  - AR-COM-006

Deliverables:
  - root Marketplace-compatible action.yml
  - shared root and nested Action execution entrypoint
  - root-reference and compatibility integration tests
  - Marketplace compliance and owner checklist
  - draft v0.1.0-alpha.1 Action release notes

Routes or surfaces:
  - action.yml
  - .github/actions/agentready/action.yml
  - scripts/agentready-action-entrypoint.sh
  - .github/workflows/agentready-action-integration.yml
  - docs/agentready/GITHUB_ACTION_USAGE.md
  - docs/agentready/GITHUB_ACTION_VERSIONING.md
  - docs/agentready/GITHUB_MARKETPLACE_DISTRIBUTION_SPEC.md
  - GitHub Release Marketplace publication UI

Allowed paths:
  - action.yml
  - .github/actions/agentready/**
  - .github/workflows/agentready-action-integration.yml
  - scripts/agentready-action-entrypoint.sh
  - cli/tests/run-agentready-action-smoke-test.mjs
  - docs/agentready/GITHUB_ACTION_USAGE.md
  - docs/agentready/GITHUB_ACTION_VERSIONING.md
  - docs/agentready/GITHUB_MARKETPLACE_DISTRIBUTION_SPEC.md
  - docs/agentready/COMMUNITY_RELEASE_NOTES_0_1_0_ALPHA_1_DRAFT.md

Forbidden paths:
  - agentready-core/**
  - bin/**
  - package.json
  - LICENSE
  - packaging/agentready-community/**
  - *.html

Acceptance criteria by work item:
  - AR-COM-007: root action.yml exposes the same documented inputs and outputs as the nested compatibility action; root metadata contains Marketplace-safe name description and branding; root and nested metadata delegate to one shared implementation to prevent behavior drift; integration workflow validates root uses ./ and nested compatibility usage on ubuntu-latest with Node.js 20; PASS policy FAIL and usage-error behavior preserve documented exit semantics and outputs; public documentation uses the exact future immutable Action tag v0.1.0-alpha.1 and states that bundled CLI remains 0.1.0-alpha.0; implementation PR performs no npm publication tag release or Marketplace publication
  - AR-COM-009: compliance matrix covers public repository root metadata unique name branding release tag categories 2FA and Developer Agreement requirements; current monorepo structure is recorded as an explicit Marketplace eligibility risk; owner must verify GitHub reports Everything looks good before publication; owner must decide current repository versus dedicated Action repository before publication; Marketplace publication remains a separate owner checkpoint after implementation PR merge; no stable or moving major tag is created for the alpha release

Batch acceptance criteria:
  - one root action.yml exists and passes metadata validation
  - root and nested action references use one shared execution implementation
  - root Action integration passes OpenAPI MCP policy-failure and usage-error cases
  - documentation distinguishes Action tag v0.1.0-alpha.1 from bundled CLI 0.1.0-alpha.0
  - GitHub Marketplace eligibility is checked after merge before any listing publication
  - owner explicitly decides repository structure exact tag listing title categories and publication
  - no npm operation and no release operation occurs in the implementation PR

Commands:
  - node cli/tests/run-agentready-action-smoke-test.mjs
  - node cli/tests/run-agentready-community-release-workflow-test.mjs
  - node scripts/validate-agentready-strategy-docs.mjs
  - node scripts/validate-agentready-execution-system.mjs
  - git diff --check

Independent test plan:
  - run Action smoke test
  - run root and nested integration workflow
  - validate generated governance files are clean
  - verify forbidden publication commands and credentials are absent
  - run strategy and execution-system validators

Required evidence:
  - implementation PR with reviewed root Action metadata
  - AgentReady Action Integration workflow success
  - Marketplace compliance matrix
  - GitHub Marketplace Everything looks good validation or exact blocker
  - owner decision for current versus dedicated Action repository
  - owner approval for exact v0.1.0-alpha.1 tag and listing publication
  - post-publication public consumer workflow evidence

Rollback: Revert ARB-COM-002 Action distribution files and documentation without changing @timeproofs/agentready@0.1.0-alpha.0 or v0.1.0-alpha.0.

Manual actions:
  - JEASON reviews and merges the implementation PR
  - JEASON verifies the GitHub Marketplace eligibility screen reports Everything looks good
  - JEASON decides whether the current monorepo is acceptable or a dedicated Action repository is required
  - JEASON accepts the GitHub Marketplace Developer Agreement if prompted
  - JEASON approves the exact v0.1.0-alpha.1 tag listing title categories and Marketplace publication before any external write

Authorized external actions:
  - create and test root Action metadata in the implementation PR
  - retain the nested .github/actions/agentready compatibility reference
  - prepare draft release notes and Marketplace compliance evidence
  - after owner approval only create immutable Action tag v0.1.0-alpha.1 from the approved merged commit
  - after owner approval only create the corresponding GitHub prerelease and submit the Marketplace listing

## Étape Codex préalable

  - confirm timeproofs HEAD contains merge 56fd2094b05740573e1fccd36f4c92e6d3254b06
  - confirm v0.1.0-alpha.0 remains immutable and points to 150da23932c1fb9433cb3d546904f03c18c909e9
  - confirm no root action.yml currently exists
  - confirm nested .github/actions/agentready/action.yml and Action integration tests are the current behavior source
  - confirm no npm action is required or authorized

## Point de contrôle propriétaire obligatoire

  - review the implementation PR and green workflows
  - verify GitHub Marketplace eligibility and repository-structure acceptance
  - approve or reject use of the current repository
  - approve the exact merged commit for v0.1.0-alpha.1
  - approve listing title categories prerelease and Marketplace submission

## Après confirmation npm

  - create immutable v0.1.0-alpha.1 only from the owner-approved merged commit
  - create a GitHub prerelease that states bundled CLI version 0.1.0-alpha.0
  - publish the Marketplace listing only after GitHub eligibility passes
  - run a public consumer workflow using the exact tag
  - record tag release listing URL workflow evidence and any documented exception in a reconciliation PR

External verifications:
  - None

Forbidden actions:
  - do not perform any npm operation
  - do not log in to npm or create npm tokens
  - do not move delete or recreate v0.1.0-alpha.0
  - do not create v0 v1 or any stable tag
  - do not create v0.1.0-alpha.1 from a PR head
  - do not create a tag release or Marketplace listing before explicit owner approval
  - do not claim Windows or macOS support
  - do not claim Marketplace publication before public verification
  - do not merge the implementation PR automatically

Response format: summarize files changed, validations, workflow status, draft status, and any remaining human review.

