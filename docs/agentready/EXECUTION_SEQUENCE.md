# AgentReady Execution Sequence

Status: ACTIVE SOURCE OF EXECUTION ORDER

Authority: `AGENTREADY_MASTER_PLAN.md`.

PR numbers are provisional. Titles and order are authoritative.

## Phase 0 - Completed Foundation

- CLI packaging candidate;
- GitHub Action versioning preparation;
- Community release candidate workflow.

## Phase 1 - Strategic Rebaseline

```txt
docs(product): rebaseline AgentReady Community and Pro strategy
```

## Phase 2 - Resolve Community Blockers

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

## Phase 3 - Publish Community

```txt
release(agentready): publish Community CLI and immutable release
```

## Phase 4 - Marketplace And Onboarding

```txt
feat(distribution): publish AgentReady GitHub Marketplace action
feat(community): add three-minute onboarding commands
```

Marketplace is distribution, not validation by GitHub.

## Phase 5 - Engine Benchmark

```txt
test(engine): add AgentReady labeled benchmark foundation
```

Benchmark and critical corrections must be completed before paid launch.

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

```txt
release(agentready): resolve Community publication blockers
```

Planned branch:

```txt
release-agentready-community-publication-blockers
```
