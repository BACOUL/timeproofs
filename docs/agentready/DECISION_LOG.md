# AgentReady Decision Log

Status: ACTIVE DECISION RECORD

Authority: `AGENTREADY_MASTER_PLAN.md`.

## 2026-07-10 - Canonical execution system

Decision ID: DL-2026-07-10-CANONICAL-EXECUTION-SYSTEM
Decision: Insert the canonical execution-system PR before further publication-blocker resolution.
Reason: The canonical execution-system PR is inserted before further publication-blocker resolution in order to prevent project drift, omissions and improvised execution prompts.
Impact: `AGENTREADY_EXECUTION_LEDGER.json` becomes the canonical detailed execution register, generated Markdown views become read-only, and future implementation prompts must be generated from the ledger.
Supersedes: ad hoc prompt sequencing after #114.
Status: ACTIVE

This does not change the AgentReady product strategy, Community/Pro scope or publication blockers.

## 2026-07-11 - Execution batches for Codex prompts

Decision ID: DL-2026-07-11-CODEX-EXECUTION-BATCHES
Decision: Codex prompts are generated from coherent execution batches, not directly from individual ledger work items.
Reason: The detailed ledger remains the exhaustive inventory of known approved work, but one page, small document or microfunction should not automatically become a separate pull request and prompt.
Impact: Future detailed Codex units use `CODEX_WORK_ITEM`; historical and current PR-shaped work remains `CODEX_PR`; `execution_batches` define the prompt-producing review boundary.
Supersedes: prompt counts derived directly from every `CODEX_PR`-classified detail task.
Status: ACTIVE

Batching reduces execution overhead without removing deliverables, acceptance criteria, evidence requirements or auditability.

A future change to batch composition does not require a strategic decision if it does not change product strategy, scope, horizon, milestone, deliverable, or the Community/Pro boundary. Any change that removes or materially changes an approved deliverable must be recorded through this Decision Log and the canonical ledger.

## 2026-07-11 - Commercial and benchmark validation thresholds

Decision ID: DL-2026-07-11-COMMERCIAL-BENCHMARK-THRESHOLDS
Decision: Benchmark thresholds and minimum commercial validation evidence must be recorded before final claims or global validation.
Reason: AgentReady should not adjust benchmark acceptance thresholds after seeing results, and it should not present global product validation without external users, explicit payment signal, a real external Pro sale, and one credible value case.
Impact: The ledger now requires `AR-ENG-001T`, `AR-MARKET-001A`, `AR-MARKET-001B`, `AR-MARKET-001C`, `AR-MARKET-001D`, and aggregate `AR-MARKET-001` gates.
Supersedes: vague market-validation intentions without explicit thresholds.
Status: ACTIVE

This decision is refined by DL-2026-07-12-VALIDATION-GATES. The final global-validation thresholds remain active, while earlier pilot and commercial-infrastructure gates now control future execution.

## 2026-07-10 - Shift-left contract security

Decision: AgentReady is the shift-left CI gate for agent-facing contracts.
Reason: The product should prevent unsafe agent-facing contracts before deployment.
Impact: Runtime firewall, gateway, IAM, and monitoring products are out of scope.
Supersedes: earlier browser-scanner-first and generic AI security wording.
Status: ACTIVE

## 2026-07-10 - Community and Pro at launch

Decision: Initial launch includes Community and Pro only.
Reason: Team and Agency add complexity before revenue proof.
Impact: Team and Agency are post-revenue.
Supersedes: four-plan launch direction.
Status: ACTIVE

## 2026-07-10 - Community CI blocking remains free

Decision: Community includes free CI blocking.
Reason: CI blocking is required for standard adoption.
Impact: Pro cannot sell CI blocking itself.
Supersedes: any paywall framing around CI blocking.
Status: ACTIVE

## 2026-07-10 - Unlimited runs

Decision: Community and Pro runs are unlimited.
Reason: Monetization should be workflow depth, not scan count.
Impact: Do not charge by number of scans.
Supersedes: scan-volume monetization.
Status: ACTIVE

## 2026-07-10 - Pro repository limit

Decision: Pro V0.1 covers 5 registered repositories.
Reason: Simple individual developer pricing.
Impact: Entitlements can remain small and understandable.
Supersedes: broader hosted plan assumptions.
Status: ACTIVE

## 2026-07-10 - Pro MVP essentials

Decision: Pro MVP is versioned policy, baseline/new-risk comparison, SARIF/PR annotations, and local expiring exceptions.
Reason: These directly improve CI value.
Impact: Heavy dashboards, multi-user, Team, and Agency wait.
Supersedes: premium-report-first plans.
Status: ACTIVE

## 2026-07-10 - Local exceptions in MVP

Decision: Local structured exceptions are part of first Pro.
Reason: Exceptions are survival tooling against false positives.
Impact: Exception format must be portable and Git-friendly.
Supersedes: centralized-only exception plans.
Status: ACTIVE

## 2026-07-10 - Stripe Customer Portal

Decision: Use Stripe Customer Portal where possible.
Reason: Avoid rebuilding commodity billing flows.
Impact: Initial account area stays minimal.
Supersedes: heavy billing dashboard assumptions.
Status: ACTIVE

## 2026-07-10 - License design

Decision: Future Pro licensing uses random license key, server-side key hash, signed entitlement token, local verification, cache, and grace period.
Reason: Privacy-first licensing without network dependency on every scan.
Impact: Community has no license requirement.
Supersedes: Stripe identifier as secret.
Status: ACTIVE

## 2026-07-10 - Benchmark required

Decision: Engine quality must be measured before paid launch claims.
Reason: Functional maturity is not the same as measured detection quality.
Impact: Benchmark and quality gates are mandatory.
Supersedes: unmeasured rule-confidence claims.
Status: ACTIVE

## 2026-07-10 - No certification

Decision: AgentReady does not sell certification.
Reason: Static analysis cannot guarantee safety.
Impact: Use reports, assessment results, and CI evidence terminology.
Supersedes: certification wording.
Status: ACTIVE

## 2026-07-10 - No silent Community telemetry

Decision: Community has no silent telemetry.
Reason: Trust and local-first adoption.
Impact: Private runs/results are not counted unless voluntarily shared.
Supersedes: implicit adoption analytics.
Status: ACTIVE

## 2026-07-10 - Controlled open core

Decision: Community layers and formats can be open/auditable while advanced assets may remain protected.
Reason: Adoption and defensibility both matter.
Impact: License decision remains blocked until legal review.
Supersedes: all-open or all-closed assumptions.
Status: ACTIVE

## 2026-07-10 - Open rule format

Decision: Future rule format can be open with official AR namespace controlled by AgentReady.
Reason: Community extension should not dilute official rule governance.
Impact: Community namespaces are separate.
Supersedes: ungoverned rule-code expansion.
Status: ACTIVE

## 2026-07-10 - Three-minute onboarding

Decision: Community onboarding targets under three minutes.
Reason: Adoption depends on fast CI proof.
Impact: `init` and `demo` are planned but not implemented here.
Supersedes: account-first onboarding.
Status: ACTIVE

## 2026-07-10 - Marketplace as distribution

Decision: Marketplace is a channel, not validation.
Reason: Marketplace listing does not certify security quality.
Impact: Do not imply GitHub validates AgentReady results.
Supersedes: Marketplace-as-trust framing.
Status: ACTIVE

## 2026-07-10 - Targeted OSS contributions

Decision: Contributions should be targeted and manual, not spam.
Reason: Trust requires relevance.
Impact: No bulk automated PR campaigns.
Supersedes: scale-first outreach.
Status: ACTIVE

## 2026-07-10 - Public observatory after benchmark

Decision: The State of Agent-Facing Contract Security can exist only after benchmark methodology.
Reason: Public claims need reproducible evidence.
Impact: No silent private contract collection.
Supersedes: premature observatory plans.
Status: ACTIVE

## 2026-07-10 - Trust Center before payments

Decision: Trust Center is required before real payments.
Reason: B2B buyers need clear data, subprocessors, support, and limitations.
Impact: Trust Center is in pre-launch sequence.
Supersedes: payments-before-trust flow.
Status: ACTIVE

## 2026-07-10 - Transferable and auditable architecture

Decision: Architecture, releases, dependencies, incidents, and operations must be documented.
Reason: The product must not depend only on founder memory.
Impact: Due diligence discipline is permanent.
Supersedes: informal operations.
Status: ACTIVE

## 2026-07-12 - Earlier validation gates before Pro and commercial infrastructure

Decision ID: DL-2026-07-12-VALIDATION-GATES
Decision: Preserve the static-first Community/Pro strategy while moving external evidence and explicit decision gates earlier in the execution sequence.
Reason: The principal remaining risk is not the ability to build AgentReady, but whether external developers adopt it, reuse it, value its agent-specific findings and express willingness to pay.
Impact: The next action remains `ARB-COM-002`; Community distribution, installation and onboarding are strengthened; one Codex pilot-preparation batch is added; a five-user pilot plus benchmark evidence blocks Pro implementation; ten external users, three explicit payment signals and one credible value case block licensing, Stripe and account construction; dynamic analysis remains post-revenue and demand-gated.
Supersedes: the part of DL-2026-07-11-COMMERCIAL-BENCHMARK-THRESHOLDS that allowed Pro and commercial infrastructure to proceed without earlier external evidence.
Status: ACTIVE

Completed publication evidence, the npm package, immutable tag, GitHub prerelease and Community/Pro feature boundary are unchanged.


## DL-2026-07-12-AGENTREADY-ACTION-MARKETPLACE-PUBLISHED

Status: ACTIVE

- Root `action.yml` was merged through PR #129 at `3070e7827e8118ca62ad6cdb7c37deff9ef24b47`.
- The immutable tag `agentready-action-v0.1.0-alpha.0` remains fixed on `d6634d0fbbe1fced510fc49d8871d52a3dc7f348`.
- The GitHub prerelease and Marketplace listing are public.
- GitHub required root `action.yml` on the default branch before the Marketplace checkbox became available; this sequencing exception is recorded rather than hidden.
- Public OpenAPI and MCP tag smoke tests passed.
- No npm operation occurred.
