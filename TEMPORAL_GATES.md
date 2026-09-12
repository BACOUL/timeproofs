# TimeProofs Temporal Evidence Gates

Status: **PROPOSED GATED VALIDATION LADDER v0.1**

Last reviewed: 2026-09-12

This gate ladder applies only to the proposed TimeProofs temporal-evidence rebaseline. It does not retroactively redefine historical AgentReady work.

## G0 — Opportunity and semantic feasibility

Question:

> Is there a material future-agent need, and can TimeProofs define a non-redundant specialist problem without confusing temporal proof with truth?

Required evidence:

- primary objective;
- constitution;
- opportunity study;
- current standards/competition mapping;
- canonical temporal proof model;
- threat model;
- TARB design and strongest-baseline rule;
- SpiderEvidence interoperability contract;
- explicit GO/NO-GO criteria.

Current state: **CONDITIONAL PASS FOR RESEARCH / NO PRODUCT BUILD AUTHORIZATION**.

## G1 — Canonical model conformance

Question:

> Can the canonical objects and claims represent external proof mechanisms without semantic overclaiming?

Required:

- schemas for Artifact, Observation, StateCheckpoint, TemporalAnchor, TemporalClaim, TemporalReceipt, ActionContext and VerificationRecord;
- conformance fixtures for each claim type;
- negative fixtures for constitutional semantic violations;
- round-trip serialization/versioning;
- explicit assurance vector.

PASS requires zero accepted fixtures that upgrade weaker evidence into stronger semantics.

## G2 — Receipt integrity and independent verification

Question:

> Can TimeProofs issue portable receipts whose integrity and declared claims can be verified independently?

Required:

- signed receipt profile;
- reference verifier;
- deterministic tamper/substitution vectors;
- algorithm/provider versioning;
- no privileged database trust in the independent-verification path.

## G3 — Time anchoring and provenance adapters

Question:

> Can TimeProofs correctly ingest and preserve the semantics of real external time/provenance mechanisms?

Candidate adapters:

- RFC 3161;
- SCITT/transparency receipts;
- signed source receipts;
- selected public anchor;
- TLSNotary/zkTLS-style source proof where appropriate.

At least two materially different mechanisms should be demonstrated to avoid designing the model around one provider.

## G4 — Temporal ordering and proof composition

Question:

> Can TimeProofs establish order only when the proof graph justifies it, including across heterogeneous systems?

Required:

- trusted common-time cases;
- sequence/chain cases;
- partial-order cases;
- incomparable-clock cases;
- conflicting-proof cases;
- correct `ORDER_UNDETERMINED` behavior.

## G5 — State history, supersession and revalidation

Question:

> Can TimeProofs track observed states/versions and correctly determine when policy requires revalidation without pretending to know unobserved continuity?

Required:

- StateCheckpoint/Transition lifecycle;
- freshness policy model;
- supersession/revocation fixtures;
- stale-state tests;
- revalidation precision/recall accounting.

## G6 — Action-context binding

Question:

> Can an agent action be bound to the exact temporal dependencies it relied on, and can an independent verifier reconstruct that context?

Required:

- `ActionContext` schema;
- exact dependency commitments;
- omitted/stale/revoked dependency fixtures;
- reconstruction verifier;
- no claim of hidden-reasoning completeness unless enforced by instrumentation/policy.

This is the primary candidate wedge for product differentiation.

## G7 — Agent-native access

Question:

> Can agents use TimeProofs safely through a minimal protocol-agnostic capability layer?

Candidate capabilities:

```txt
observe
proveExistence
proveOrder
revalidate
bindAction
verify
history
```

Adapters may include API, SDK, MCP or future agent protocols. No adapter is constitutional.

## G8 — Representative real-system integration

Question:

> Does the temporal model work with real heterogeneous sources rather than synthetic receipts only?

Representative targets should include at least:

- web/TLS-derived state;
- API state;
- signed/attested system data;
- agent action/tool calls;
- document/artifact versions;
- authorization/revocation state.

Limitations and inaccessible proof paths must remain explicit.

## G9 — Controlled Temporal Reliability Uplift

Question:

> Does the same qualified agent perform materially better with TimeProofs than with the strongest practical non-TimeProofs temporal stack?

Authority: `TARB.md`.

Required comparison:

```txt
B0 model + timestamps
B1 + platform logs
B2 + strongest practical receipt/timestamp/provenance stack
B3 + TimeProofs
```

A PASS requires the frozen TARB hidden thresholds and no blocking constitutional failure.

This is the decisive scientific superiority gate.

## G10 — Commercial/use-case validation

Question:

> Do real teams integrate, repeatedly use and value TimeProofs enough to justify productization?

Required evidence should include:

- repeated real workflows;
- integration friction;
- willingness to pay or equivalent strategic adoption signal;
- measured operational value;
- support burden;
- which proof mechanisms customers actually need;
- whether `Proof Before Action` or another wedge is the real buying reason.

No pricing/market claim substitutes for observed usage.

## G11 — Cross-domain resilience and interoperability

Question:

> Does the specialist temporal layer generalize beyond the initial wedge and remain interoperable with evolving standards?

Required:

- second materially different domain;
- updated external challenger;
- standards/profile compatibility;
- backward-compatible receipt/version transition;
- provider replacement test.

## G12 — Operational/economic scale

Question:

> Can TimeProofs operate reliably and economically as infrastructure?

Evaluate:

- proof throughput;
- verification latency;
- anchor/provider outages;
- key rotation/revocation;
- long-term receipt verification;
- storage/indexing;
- privacy/isolation;
- multi-tenant authorization;
- cost per protected action/proof;
- disaster recovery;
- provider migration;
- requalification after cryptographic/standard changes.

## Permanent post-G12 rule

TimeProofs is never finished.

The project must continuously compare itself against:

- stronger agent platforms;
- new action-receipt standards;
- transparency systems;
- provenance protocols;
- trusted-time systems;
- source-attestation mechanisms;
- model improvements that reduce temporal blindness without TimeProofs.

If the practical uplift disappears, TimeProofs must adopt external methods, move differentiation upward or stop defending a commoditized layer.
