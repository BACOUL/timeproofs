GENERATED FILE — DO NOT EDIT MANUALLY

Canonical source:
docs/agentready/AGENTREADY_EXECUTION_LEDGER.json

# Next Codex Prompt

Repository: BACOUL/timeproofs
Base: timeproofs
Batch ID: ARB-COM-001
Work item IDs: AR-COM-006
Milestone: M3
Horizon: BEFORE_COMMUNITY_PUBLICATION
Objective: Publish Community CLI and immutable release.
Branch: release-agentready-community-cli
PR title: release(agentready): publish Community CLI and immutable release

Documents sources:
  - docs/agentready/COMMUNITY_PUBLICATION_POLICY.md
  - docs/agentready/COMMUNITY_RELEASE_WORKFLOW.md

Dependencies:
  - AR-COM-001
  - AR-COM-002
  - AR-COM-003
  - AR-COM-004
  - AR-COM-005
  - AR-COM-006A

Deliverables:
  - Publish Community CLI and immutable release

Routes or surfaces:
  - one coherent file or surface family

Allowed paths:
  - package.json
  - CHANGELOG.md
  - docs/agentready/**

Forbidden paths:
  - agentready-core/**
  - bin/**
  - *.html
  - LICENSE

Acceptance criteria by work item:
  - AR-COM-006: publication only from approved commit; immutable tag and GitHub Release only when approved; public install tested

Batch acceptance criteria:
  - publication only from approved commit
  - immutable tag and GitHub Release only when approved
  - public install tested

Commands:
  - node cli/tests/run-agentready-package-smoke-test.mjs

Independent test plan:
  - run relevant existing tests
  - run execution-system validator

Required evidence:
  - npm package URL
  - immutable tag
  - GitHub Release URL
  - public installation test

Rollback: Revert ARB-COM-001 without reverting unrelated batches.

Manual actions:
  - None

External verifications:
  - None

Interdictions: stay strictly inside the batch scope, do not publish, do not create tags or releases, and do not merge the PR.

Response format: summarize files changed, validations, workflow status, draft status, and any remaining human review.

