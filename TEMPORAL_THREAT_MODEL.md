# TimeProofs Temporal Threat Model

Status: **G0 FROZEN THREAT MODEL v0.1 / IMPLEMENTATION NOT YET STARTED**

Last reviewed: 2026-09-12

Authority: `CONSTITUTION.md`, especially sections 5–17.

## 1. Security objective

TimeProofs must prevent an agent or verifier from accepting a stronger temporal claim than the available evidence supports.

The main protected properties are:

- integrity of proof objects;
- provenance of observations;
- integrity and provenance of time assertions;
- ordering correctness;
- version/state lineage;
- freshness/revocation correctness under explicit policy;
- action-context reconstructability;
- independent verifiability;
- explicit degradation when evidence is missing or invalid.

## 2. Threat actors

### A1 — Malicious caller/agent

May submit false timestamps, fabricated observations, omitted dependencies or replayed states.

### A2 — Compromised observer/tool

May sign incorrect observations or misreport source/state.

### A3 — Compromised TimeProofs component

May attempt to alter storage, issue inconsistent results, hide failures or equivocate.

### A4 — Compromised external proof provider

Examples: timestamp authority, transparency service, source attestor, identity provider.

### A5 — Malicious source/system

May serve different states to different observers, backdate data, omit history or equivocate.

### A6 — Network/adversary

May replay, delay, reorder or substitute messages where transport/protocol controls permit.

### A7 — Honest but misconfigured operator

May use wrong clock, wrong trust policy, expired keys, incorrect freshness windows or incomplete verification.

## 3. Threat families

### T1 — Caller-supplied backdating

Attack: caller claims an earlier time than actually independently established.

Required behavior:

- caller-declared time remains `DECLARED`;
- no upgrade to independent time without a valid external anchor;
- TARB fixture required.

### T2 — Replay of an old valid state as current

Attack: valid old receipt/state is presented as if still current.

Required behavior:

- verify cryptographic validity separately from freshness/currentness;
- evaluate supersession/revocation/freshness policy;
- possible result `STALE`, `SUPERSEDED`, `REVALIDATION_REQUIRED`.

### T3 — Receipt tampering

Attack: modify content, time, subject, proof refs or action context after signature.

Required behavior:

- deterministic verification failure;
- no partial-success rendering.

### T4 — Proof substitution

Attack: attach a valid proof for artifact/state A to claim about B.

Required behavior:

- commitment binding must fail;
- subject/artifact/context identifiers included in signed/committed material.

### T5 — Chain truncation / omitted predecessor

Attack: present a valid later receipt without material preceding history that changes interpretation.

Required behavior:

- if completeness/continuity is required by policy, missing lineage must be explicit;
- valid isolated receipt may remain valid for its narrow claim without implying complete history.

### T6 — Log fork / equivocation

Attack: transparency/log provider gives inconsistent histories to different clients.

Required behavior:

- use consistency/gossip/auditing mechanism where supported;
- expose `CONFLICTING_PROOFS` or degraded trust if inconsistency detected;
- do not claim fork resistance where provider does not support it.

### T7 — Observer impersonation

Attack: attacker claims to be a trusted observer/source.

Required behavior:

- verify key/credential/identity binding;
- expose identity assurance;
- failure becomes `INVALID_PROOF` or insufficient assurance.

### T8 — Key compromise / revocation

Attack: historically valid signer key becomes compromised/revoked.

Required behavior:

- distinguish signing/anchoring time from later revocation;
- verification policy must be versioned;
- original receipt is not rewritten;
- historical validity may require trusted timestamp evidence.

### T9 — Clock skew/manipulation

Attack: observer/source clocks differ or are manipulated.

Required behavior:

- do not assume clock comparability;
- prefer independent anchors, logical sequence or bounded intervals;
- `ORDER_UNDETERMINED` where necessary.

### T10 — Source-response forgery

Attack: agent self-reports external source response that source did not actually return.

Required behavior:

- self-declared observation remains distinct from source-attested/session-proven observation;
- source provenance mechanisms such as signatures/TLS attestation may strengthen assurance.

### T11 — Version rollback

Attack: older state/version intentionally restored and presented as latest.

Required behavior:

- version history and monotonic expectations where available;
- rollback is not automatically malicious, but must be visible;
- freshness/currentness depends on authoritative version policy.

### T12 — Stale authorization

Attack: agent relies on an approval/delegation that was valid when observed but revoked/expired before action.

Required behavior:

- authorization temporal bounds/revocation state treated as action dependency;
- revalidate at required boundary;
- action context records status.

### T13 — Partial verification masquerading as complete verification

Attack: one anchor/signature verifies while a required source/provenance/lineage step fails.

Required behavior:

- verification is componentized;
- missing required component blocks stronger claim;
- expose exact failed dimension.

### T14 — Same value, different version

Attack/failure: content/value appears semantically unchanged but artifact/version changed.

Required behavior:

- distinguish semantic equality from artifact/version identity;
- action policy decides whether revalidation matters.

### T15 — Omitted action dependency

Attack/failure: agent records only favorable dependencies, omitting one material source used in decision.

Required behavior:

- TimeProofs can prove what was bound, not automatically completeness of what the model internally relied on;
- completeness requires harness/policy instrumentation;
- receipt must not claim completeness unless enforced.

### T16 — False non-occurrence claim

Attack/failure: missing proof is rendered as proof that event did not occur.

Required behavior:

- blocked by default;
- only bounded complete-observation models may support future negative temporal claims.

### T17 — Proof provider outage

Failure: timestamp/transparency/provenance provider unavailable.

Required behavior:

- `VERIFICATION_UNAVAILABLE` / degraded mode;
- never silently accept cached success if policy requires fresh verification.

### T18 — Algorithm/provider deprecation

Failure: hash/signature/provider becomes obsolete or distrusted.

Required behavior:

- crypto/provider agility;
- preserve historical receipt;
- versioned re-assessment/re-anchoring where appropriate.

### T19 — Privacy leakage through proof publication

Attack/failure: raw secrets or sensitive metadata are embedded in public logs/receipts.

Required behavior:

- commitments/selective disclosure;
- privacy review for public anchors;
- no raw sensitive content in public transparency systems by default.

### T20 — Cross-system timestamp false ordering

Failure: agent sorts unrelated wall-clock timestamps and infers a false total order.

Required behavior:

- only infer order when clocks/anchors/order proof are comparable;
- otherwise `ORDER_UNDETERMINED`.

## 4. Security invariants

1. Valid signature != valid temporal claim.
2. Valid timestamp != source authenticity.
3. Source authenticity != truth.
4. Old valid proof != current state.
5. Missing proof != non-occurrence.
6. Matching checkpoints != continuous unchanged state.
7. Same displayed time != proven simultaneity.
8. Total order must not be invented from partial order.
9. Independent verification must not rely exclusively on privileged TimeProofs database state where portability is claimed.
10. Any stronger claim must retain the proof path that justifies the upgrade.

## 5. TARB mapping

All T1–T20 threats must map to at least one visible development fixture before implementation is considered mature.

The hidden F8 set must cover at minimum:

- T1, T2, T3, T4, T6, T7, T9, T10, T12, T13, T16, T20.

Deterministic integrity fixtures have zero-tolerance acceptance criteria where the verifier model fully covers the threat.

## 6. Out-of-scope / bounded claims

TimeProofs v0.1 does not claim to solve:

- compromised human intent;
- truth/credibility of source content;
- complete capture of a model's hidden internal reasoning;
- side-channel attacks outside the chosen cryptographic/runtime boundary;
- hardware attestation unless explicitly integrated;
- universal proof of non-occurrence;
- universal legal admissibility across jurisdictions;
- attacks against cryptographic assumptions not represented in the active trust model.

These boundaries must remain visible in product claims.
