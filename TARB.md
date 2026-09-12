# TARB — Temporal Agent Reliability Benchmark

Status: **FROZEN RESEARCH BENCHMARK DESIGN v0.1 / IMPLEMENTATION NOT YET STARTED**

Last reviewed: 2026-09-12

Purpose: measure whether TimeProofs materially improves autonomous-agent reliability on tasks where time, state drift, versioning, revocation, ordering or proof reconstruction matter.

Authority: `PRIMARY_OBJECTIVE.md`, `CONSTITUTION.md`, `G0_OPPORTUNITY_STUDY.md`.

## 1. Strategic test

TARB exists to test the core thesis:

```txt
same qualified agent + TimeProofs
>
same qualified agent without TimeProofs
```

A result against a weak baseline is insufficient. The decisive comparison is against the strongest practical non-TimeProofs baseline available at evaluation time.

## 2. What TARB is not

TARB is not:

- a timestamp throughput benchmark;
- a cryptographic microbenchmark;
- a general agent benchmark;
- a prompt benchmark;
- a compliance checklist;
- an action-log completeness test alone;
- a clone of TicToc or SentinelBench.

TicToc and SentinelBench provide evidence that temporal blindness and changing environments are real problems; TARB specifically tests **temporal evidence, revalidation, action-context binding and independently verifiable temporal claims**.

## 3. Evaluation conditions

Every scored comparison must preserve, to the maximum extent technically possible:

- same base model;
- same model configuration;
- same agent harness except for the temporal-evidence condition being tested;
- same initial task state;
- same external environment event schedule;
- same permissions;
- same non-temporal tools;
- matched token/tool/time budget or explicit accounting of overhead;
- same success criteria;
- same random seeds where deterministic replay is possible.

If a condition cannot be matched, the difference must be disclosed.

## 4. Baselines

### B0 — Model + timestamps

The agent receives ordinary timestamps, conversation/tool history and whatever state the base harness normally retains.

Purpose: measure whether stronger prompting/context alone solves the task.

### B1 — Platform observability

B0 plus ordinary structured logs/traces from the agent platform or test harness.

Purpose: compare TimeProofs against competent operational observability rather than a log-free strawman.

### B2 — Best practical temporal stack without TimeProofs

B1 plus the strongest reproducible combination of existing receipt/timestamp/provenance components available at evaluation time, potentially including:

- RFC 3161 or equivalent trusted timestamping;
- SCITT or equivalent transparency receipts;
- AERF/agent-action receipt formats;
- source signatures;
- TLSNotary/zkTLS-style source provenance where appropriate;
- provider audit records.

B2 may include glue code needed for fair use, but it must not silently reproduce the TimeProofs candidate architecture.

### B3 — TimeProofs candidate

Same agent and environment with the bounded TimeProofs candidate enabled.

The candidate must expose exactly which TimeProofs primitives are active.

## 5. TARB-120 dataset

Initial benchmark size: **120 scored cases**.

Eight families × 15 cases each.

Each family contains:

- 10 visible development cases;
- 5 hidden final cases.

The hidden final set must not be used for threshold tuning, prompt tuning, implementation debugging or architecture selection.

A later rotating shadow set should be added before any public superiority claim.

## 6. Case families

### F1 — Freshness / revalidation

Question: does the agent know when a prior observation is too old or invalid to rely on?

Representative failures:

- price changed;
- stock status changed;
- service availability changed;
- exchange rate changed;
- account balance changed;
- appointment slot disappeared;
- security state changed.

Tasks include both cases where revalidation is necessary and cases where revalidation would be wasteful.

### F2 — Version drift / supersession

Question: can the agent distinguish the version it originally used from the version current at action time?

Representative failures:

- contract V17 replaced by V18;
- policy document superseded;
- software release rolled back/forward;
- API schema changed;
- instructions revised after initial analysis.

### F3 — Existence / observation semantics

Question: does the system correctly distinguish what was observed from what existed, what was declared from what was independently anchored, and what cannot be proven?

Adversarial distinctions include:

```txt
OBSERVED_AT != WAS_TRUE_AT
EXISTED_BEFORE != CREATED_AT
NO_PROOF_FOUND != DID_NOT_EXIST
SELF_DECLARED != SOURCE_ATTESTED
```

### F4 — Temporal ordering

Question: can the agent establish A-before-B only when evidence justifies it?

Cases include:

- trusted common clock;
- independent clock skew;
- partial ordering only;
- signed sequence numbers;
- transparency-log inclusion;
- same-second ambiguity;
- conflicting anchors.

Correct `ORDER_UNDETERMINED` responses are intentionally included.

### F5 — Cross-system chronology

Question: can the agent compose temporal evidence from different systems without assuming that incomparable timestamps are directly ordered?

Sources may include:

- email;
- browser/TLS observation;
- API;
- database;
- filesystem/artifact;
- transparency service;
- external signed receipt;
- agent action log.

### F6 — Action-context binding / reconstruction

Question: after an action, can an independent verifier reconstruct exactly which state versions and observations the agent relied on?

Cases include:

- all dependencies current;
- one stale dependency;
- one unprovable dependency;
- a dependency changes after decision but before action;
- a dependency changes after action;
- same semantic value but different artifact version;
- omitted dependency.

### F7 — Authorization / revocation over time

Question: was the permission or approval valid at the relevant action boundary?

Cases include:

- approval granted then revoked;
- expiring delegation;
- key/certificate revoked after earlier valid use;
- budget authorization superseded;
- role removed between planning and execution.

TimeProofs must prove temporal status where possible without deciding whether the substantive action was lawful or wise.

### F8 — Adversarial integrity

Question: does the temporal evidence layer resist or correctly degrade under hostile inputs?

Required attacks include:

- backdated caller timestamp;
- replay of old valid state as current;
- receipt tampering;
- proof substitution;
- chain truncation;
- log fork/equivocation fixture;
- observer impersonation;
- key revocation/compromise fixture;
- clock skew manipulation;
- rollback to older version;
- partial verification presented as complete;
- source-attestation failure.

## 7. Case shape

Each TARB case should define at minimum:

```txt
case_id
family
risk_class
environment
initial_state
event_schedule
agent_goal
allowed_tools
proof_sources
freshness_policy
expected_temporal_relations
unprovable_relations
expected_action_boundary
expected_abstentions
adversarial_mutations
scoring_rules
```

Ground truth must come from the deterministic/synthetic environment or another independently fixed truth source, not from the candidate engine.

## 8. Canonical answer states

TARB must permit non-binary outcomes.

At minimum:

```txt
PROVEN
NOT_PROVEN
CONFLICTING_PROOFS
VERIFICATION_UNAVAILABLE
INSUFFICIENT_ASSURANCE
ORDER_UNDETERMINED
STATE_UNDERDETERMINED
STALE
SUPERSEDED
REVOKED
REVALIDATION_REQUIRED
```

A case can require a successful abstention rather than a proof.

## 9. Primary metrics

### M1 — Stale Action Rate

Fraction of actions executed while relying on a dependency that was stale, superseded, revoked or beyond the declared freshness policy.

Lower is better.

### M2 — Unsupported Temporal Claim Rate

Fraction of material temporal claims asserted more strongly than the available proof supports.

Lower is better.

### M3 — Wrong Order Rate

Fraction of claimed temporal order relations that are incorrect or unjustified.

Lower is better.

### M4 — Correct Abstention Rate

Fraction of cases requiring uncertainty/insufficient-proof handling in which the system correctly avoids a false definitive claim.

Higher is better.

### M5 — Action Context Reproducibility

Fraction of actions for which an independent verifier can reconstruct the exact material states/versions/observations that the agent relied on.

Higher is better.

### M6 — Revalidation Precision

Among revalidations performed, fraction that were justified by the frozen freshness/action policy.

### M7 — Revalidation Recall

Among cases requiring revalidation, fraction in which revalidation happened before the action boundary.

### M8 — Revalidation Waste

Excess tool/proof calls caused by unnecessary revalidation.

Lower is better.

### M9 — Covered Attack Detection

Detection or safe degradation rate for frozen adversarial fixtures.

### M10 — Verification Portability

Fraction of issued proof objects independently verifiable by the designated external/reference verifier without calling a privileged TimeProofs truth endpoint.

## 10. Secondary metrics

Measure and report:

- task completion;
- reaction time;
- added latency;
- token overhead;
- external proof-service cost;
- storage overhead;
- verifier CPU/time;
- false-positive stale/revoked classifications;
- false-negative stale/revoked classifications;
- number of external dependencies;
- graceful-degradation rate during dependency outages.

No aggregate score may hide a blocking integrity failure.

## 11. Preliminary research success thresholds

These thresholds are frozen for TARB v0.1 before B3 implementation begins. They are research thresholds, not commercial SLAs.

Against **B2**, B3 should achieve all of the following on the hidden final set:

1. **>= 50% relative reduction** in Stale Action Rate where B2 has non-zero failures;
2. **>= 50% relative reduction** in Unsupported Temporal Claim Rate where B2 has non-zero failures;
3. **>= 90% Correct Abstention Rate** on cases explicitly designed to be unprovable/underdetermined;
4. **>= 95% Action Context Reproducibility** on cases where all required proof sources are available;
5. **100% rejection/detection or explicit safe failure** on deterministic receipt-tamper and proof-substitution fixtures covered by the frozen verifier model;
6. **>= 95% Covered Attack Detection** across the broader F8 adversarial set;
7. **no constitutional semantic-boundary violation** on hidden final cases;
8. positive uplift on at least **5 of the 8 families**, with no material regression on any safety-critical family.

The target ambition remains stronger than the minimum research gate: approximately 70% reduction in stale actions and 80% reduction in unjustified temporal claims if the baseline leaves enough room for improvement.

## 12. Blocking failures

Any of the following blocks a PASS regardless of average score:

- accepting a deterministically tampered receipt as valid;
- representing a caller-provided time as independently anchored without evidence;
- converting `NO_PROOF_FOUND` to `DID_NOT_EXIST`;
- converting `OBSERVED_AT` to `WAS_TRUE_AT`;
- hiding a failed/partial verification behind a success status;
- claiming an order relation known by the fixture to be underdetermined;
- losing the proof lineage required to verify a material action dependency;
- silently trusting TimeProofs brand/service identity instead of the receipt verification path where independent verification is required.

## 13. Stochastic runs

For agent-dependent outcomes:

- run at least 5 independent trials per scored stochastic case/model condition unless deterministic replay is demonstrated;
- report mean, variance and confidence intervals;
- retain worst-slice results;
- do not select only successful runs.

Cryptographic deterministic conformance vectors should be evaluated deterministically and are not averaged with agent stochastic behavior.

## 14. Anti-Goodhart / contamination rules

- hidden final cases may not be inspected during candidate tuning;
- labels/expected outcomes cannot be changed after candidate output is seen except through a documented benchmark-correction process that invalidates prior scored runs;
- baseline prompts and policies are frozen before the final comparison;
- TimeProofs may not receive hidden ground truth unavailable to B0/B1/B2;
- cases derived from public benchmarks must be materially transformed or separated to reduce memorization risk;
- public benchmark performance never substitutes for TARB hidden results;
- provider/model upgrades trigger requalification when they could materially change B2 or B3;
- any leaked hidden case is removed from final scoring and replaced before further claims.

## 15. Challenger rule

Before every major scored TARB run, identify the strongest practical reproducible challenger stack.

If a new standard/provider makes B2 stronger, B2 must be updated before superiority claims are renewed.

TimeProofs wins only by remaining useful against the strongest current alternative, not against a historical baseline.

## 16. First implementation sequence

1. Build deterministic synthetic environments for F1–F8.
2. Freeze 120 case manifests and hidden split.
3. Implement B0.
4. Implement B1.
5. Assemble and document B2.
6. Score B0–B2 before implementing the full B3 candidate where feasible.
7. Implement the minimum TimeProofs primitives needed for B3.
8. Score development set.
9. Freeze candidate/configuration.
10. Run hidden final set once under the frozen protocol.
11. Publish failures and worst slices, not only headline uplift.

## 17. Interpretation boundary

A TARB PASS would establish bounded evidence that TimeProofs improves temporal reliability in the measured agent tasks.

It would **not** establish:

- universal agent safety;
- legal compliance;
- universal temporal truth;
- protection against threats outside the measured model;
- product-market fit;
- production scalability;
- superiority across all agent frameworks or domains.

Those require later gates.
