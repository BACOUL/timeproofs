# AgentReady Execution Sequence

Status: ACTIVE SOURCE OF EXECUTION ORDER

Authority: `AGENTREADY_MASTER_PLAN.md`.

PR numbers are provisional. Titles and order are authoritative.

Detailed execution register:

```txt
docs/agentready/AGENTREADY_EXECUTION_LEDGER.json
```

Generated Markdown views are read-only projections of that ledger.

Task granularity remains mandatory, but prompt counting is now batch-based.

```txt
One ledger work item = one independently verifiable unit of work.

One Codex execution batch = one coherent pull request that may complete
one or several compatible ledger work items.

One execution-ready Codex batch = one generated Codex prompt.
```

`CODEX_WORK_ITEM` entries track detailed deliverables. `CODEX_PR` entries are
reserved for historical or current PR-shaped work. Future Codex prompts must
come from `execution_batches`, not directly from individual work items.

Future discoveries must pass through:

```txt
docs/agentready/PROJECT_CHANGE_CONTROL.md
```

## Phase 0 - Completed Foundation

- CLI packaging candidate;
- GitHub Action versioning preparation;
- Community release candidate workflow.

## Phase 1 - Strategic Rebaseline

```txt
docs(product): rebaseline AgentReady Community and Pro strategy
```

## Phase 2 - Resolve Community Blockers

Inserted governance PR before further blocker resolution:

```txt
docs(project): add canonical AgentReady execution system
```

This insertion prevents project drift, omissions and improvised execution prompts. It does not change product strategy, Community/Pro scope or publication blockers.

```txt
release(agentready): resolve Community publication blockers
```

Scope:

- npm scope;
- license;
- legacy ProofSpec references;
- publication policy;
- 2FA or trusted publishing;
- provenance;
- explicit approval path.

This PR must not publish the package.

Phase gate:

- `COMMUNITY_PUBLICATION_BLOCKERS.md` has no open blocker;
- `COMMUNITY_PUBLICATION_APPROVAL_CHECKLIST.md` is explicitly approved;
- final tarball SHA-256 is recorded;
- source commit is approved.

## Phase 3 - Publish Community

```txt
release(agentready): publish Community CLI and immutable release
```

## Phase 4 - Marketplace Distribution

```txt
feat(distribution): publish AgentReady GitHub Marketplace action
```

Marketplace is distribution, not validation by GitHub. The immutable public Action is complete and remains unchanged by the following site work.

## Phase 4B - Global Standard Site Before Public Validation

```txt
site(agentready): build global design system and navigation
site(agentready): publish global product scanners CI and planned pricing
site(standard): publish AgentReady standard rules and governance foundation
site(trust): publish company security privacy and legal foundation
docs(adoption): publish developer and adoption foundation
ai(site): publish SEO GEO AI-first and international architecture
qa(site): validate the complete global site
```

The shell PR may remain open as an approved stack base while the remaining site PRs are built against it. This avoids deploying a visibly partial redesign. The complete stack is reviewed, then merged in dependency order.

No meaningful Marketplace promotion, maintainer outreach or external pilot recruitment begins before global-site QA passes. No batch in this phase modifies the engine, CLI, npm package, immutable Action, billing or runtime scope.

## Phase 4C - Public Installation And Onboarding

```txt
qa(community): validate public AgentReady installation
feat(community): add three-minute onboarding commands
```

Public installation validation follows the global-standard site gate. Onboarding follows the public installation batch.

## Phase 4D - External Pilot Preparation

```txt
docs(validation): prepare AgentReady external Community pilot kit
```

Codex prepares the tester guide, evidence registry, false-positive register, case template and consent controls. Human outreach and evidence collection remain owner actions.

## Phase 5 - Engine Benchmark

```txt
test(engine): add AgentReady labeled benchmark foundation
```

Benchmark and critical corrections must be completed before paid launch. The reproducible report must also include factual differentiation evidence and an MCP static-coverage matrix.

Before Phase 6 begins, the external pilot and benchmark evidence must produce an explicit `CONTINUE`, `CORRECT`, `PAUSE`, `PIVOT` or `REJECT` decision. Only `CONTINUE` authorizes the first Pro implementation batch.

## Phase 6 - MVP Pro

```txt
feat(pro): add versioned AgentReady policy configuration
feat(pro): add baseline and new-risk comparison
feat(pro): add SARIF export and pull request annotations
feat(pro): add documented and expiring policy exceptions
```

## Phase 7 - Engine Quality Alignment

```txt
fix(engine): align AR001 AR003 AR008 and AR010 semantics
test(engine): establish AgentReady quality gates
```

## Commercial Infrastructure Gate

Before licensing, Stripe, account or transactional-email implementation begins, require ten external Community users, three explicit Pro payment signals at the real price and scope, one credible external value case, accepted benchmark/differentiation evidence and an owner authorization decision.

## Phase 8 - Licensing, Stripe, And Automation

```txt
feat(commercial): implement Community and Pro entitlements
feat(licensing): add privacy-first license activation
feat(licensing): add minimal license and entitlement service
feat(billing): add Stripe Checkout test flow
feat(billing): automate subscriptions and license provisioning
feat(account): add minimal account and Stripe Customer Portal access
feat(automation): add transactional customer emails
```

## Phase 9 - Site, Legal, And Trust Center

```txt
site(commercial): publish Community and Pro pricing and purchase flow
site(product): add self-service onboarding and help
site(legal): finalize legal and B2B terms
site(trust): publish AgentReady Trust Center
privacy(site): finalize privacy-first architecture
```

## Phase 10 - Rule Dictionary, Badges, And Integrations

```txt
docs(site): publish AgentReady rule dictionary
feat(distribution): add AgentReady scan badges
docs(integrations): publish framework integration guides
seo(site): complete technical search architecture
ai(site): add machine-readable AgentReady discovery layer
```

## Phase 11 - Launch

```txt
qa(launch): run AgentReady Community and Pro launch audit
release(commercial): enable production billing
release(agentready): launch Community and Pro
```

## Post-Revenue

- Team;
- Agency;
- multi-user;
- organizations;
- cloud history;
- centralized governance;
- client workspaces;
- branding;
- client access.

## Only Next PR

If and only if all Community publication blockers are `RESOLVED`, the next release PR may be:

```txt
release(agentready): publish Community CLI and immutable release
```

If any blocker remains open, the next authorized action is the owner or legal action named in:

```txt
docs/agentready/COMMUNITY_PUBLICATION_BLOCKERS.md
```
