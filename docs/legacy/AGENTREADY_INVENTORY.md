# AgentReady Legacy Inventory

Status: ACTIVE MIGRATION INVENTORY
Branch: `relaunch/invariant-engine`

AgentReady is historical product material. This inventory prevents legacy assets from accidentally re-entering TimeProofs public/release surfaces.

## 1. Legacy runtime/code — retain only until archive boundary is complete

Known surfaces:
- `agentready-core/**`
- `bin/agentready.js`
- AgentReady test files under `cli/tests/`
- AgentReady scripts under `scripts/`
- `agentready-examples/**`

Policy:
- MUST NOT be included in a TimeProofs publishable package;
- MUST NOT be called by TimeProofs CI/release workflows;
- may remain in Git history or an explicitly named legacy/archive branch after relaunch cleanup.

## 2. Legacy documentation

Known surfaces:
- `AGENTREADY_PROJECT_CONTEXT.md`
- `docs/agentready/**`
- historical AgentReady release/strategy/planning evidence

Policy:
- non-canonical;
- MUST NOT appear in the TimeProofs contributor reading order except through this inventory/legacy marker;
- should eventually move out of the active relaunch tree if repository size/noise interferes with contributor comprehension.

## 3. Legacy website/public pages

Known examples:
- `agentready*.html`
- `openapi-ai-agent-readiness.html`
- `mcp-server-readiness.html`
- `ai-agent-tool-risk-checklist.html`
- old `index.html` / product/pricing surfaces that still describe AgentReady-era positioning
- old assets/sitemap/robots/site metadata

Policy:
- these are NOT the target M9 TimeProofs site;
- do not redesign them incrementally before M9;
- before TimeProofs public relaunch, production routing and sitemap must be audited so old AgentReady claims do not represent the new product accidentally.

## 4. Legacy packaging/release

Known surfaces:
- `packaging/agentready-community/**`
- historical npm/release documentation under `docs/agentready/**`

Legacy GitHub Action/release workflows have already been removed from the relaunch branch.

Policy:
- no AgentReady packaging file may be copied into the new TimeProofs package;
- TimeProofs release pipeline is built independently with explicit allowlists.

## 5. Legacy package history

Historical fact: AgentReady had a prerelease package/release. That history is not erased, but new TimeProofs package metadata, tags, provenance and changelog must be unambiguous and independent.

## 6. Active TimeProofs allowlist

The current product/release source set is centered on:
- `timeproofs-core/**`
- `adapters/**`
- `sdk/**`
- `cli/timeproofs.js`
- `bin/timeproofs.js`
- `ci/**`
- `packs/ucp-ap2/**`
- TimeProofs schemas under `schemas/`
- active TimeProofs docs under `docs/product`, `docs/security`, `docs/release`, `docs/startup`, `docs/research`
- root `action.yml`, README, SECURITY, LICENSE and TimeProofs constitution/context files

A future package builder MUST use an allowlist, never a repository-wide copy with excludes.

## 7. Removal decision

Do not mass-delete the old product during M7 solely for aesthetic cleanliness. Preserve evidence/history until:

1. the TimeProofs publishable package is independently buildable;
2. the TimeProofs site relaunch plan (M9) is ready;
3. needed legal/release history is archived;
4. a founder-approved archive/remove commit can be reviewed as one deliberate migration.

This avoids both legacy contamination and destructive loss of historical evidence.
