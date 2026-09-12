# TimeProofs Constitution

Status: **FOUNDATIONAL / PROPOSED FOR TEMPORAL-EVIDENCE REBASELINE**

Last reviewed: 2026-09-12

This constitution defines the invariants that any future TimeProofs implementation must preserve. Product features, APIs, providers and cryptographic mechanisms may change; these rules may not be weakened silently.

## 1. Temporal proof is not truth

TimeProofs proves temporal properties of artifacts, observations, states, versions and actions.

It does not decide whether a proposition contained in those artifacts is true, credible, causal, lawful or justified.

Truth/investigation reasoning belongs outside TimeProofs, including to systems such as SpiderEvidence.

## 2. Every proof must state exactly what is proven

No output may use a generic `verified=true` when the actual claim is more specific.

A receipt must identify the temporal claim being verified, such as:

- observed at;
- existed before;
- state observed at;
- precedes/follows;
- supersedes;
- action bound to evidence context.

The proof semantics must be explicit and machine-readable.

## 3. No invented precision

Time may be:

- exact;
- bounded;
- independently anchored;
- observer-declared;
- approximate;
- unknown.

The system must not convert a weaker temporal statement into a stronger one.

Examples:

```txt
EXISTED_BEFORE 14:32
!=
CREATED_AT 14:32
```

and:

```txt
OBSERVED_AT 14:32
!=
WAS_TRUE_AT 14:32
```

## 4. Absence of proof is not proof of absence

`NO_PROOF_FOUND`, `NOT_PROVEN`, inaccessible evidence or failed verification may never be rendered as proof that an artifact, state or event did not exist.

Any proof of non-occurrence would require an explicit bounded observation model with a justified completeness guarantee.

## 5. Observation provenance is mandatory

An observation must preserve, where applicable:

- observer identity or cryptographic identity;
- acquisition method;
- source locator or source identity;
- artifact/state hash;
- observation time and its provenance;
- software/component version;
- relevant authentication or authorization context;
- previous related proof object where applicable.

A self-declared observation must remain distinguishable from an independently attested or source-attested observation.

## 6. Independent time must remain distinguishable from caller time

A timestamp supplied by a caller is evidence about what the caller declared, not independent temporal proof.

Independent assurance requires a verifiable external mechanism such as a timestamp authority, transparency service, public anchor or another appropriately governed attestation source.

## 7. Proofs must be independently verifiable

A `TemporalReceipt` must contain or reference sufficient verification material for another authorized machine to validate its claims without relying solely on a TimeProofs database response.

TimeProofs should minimize proprietary trust dependencies wherever technically and legally practical.

## 8. Receipts are immutable; interpretations are versioned

Issued cryptographic receipts must not be silently rewritten.

If metadata, assurance interpretation, revocation state or verification policy changes, a new versioned assessment must reference the original receipt rather than alter history.

## 9. State history must not imply unobserved continuity

Two matching observations at T1 and T2 do not prove that no intermediate state existed.

A checkpoint proves only the semantics supported by its observation/attestation path.

Continuous-state claims require continuous or otherwise sufficient evidence under an explicit model.

## 10. Temporal order must be evidence-backed

TimeProofs may infer `A PRECEDES B` only where the proof graph justifies that relation.

Wall-clock values alone may be insufficient when clocks are untrusted, skewed or incomparable.

Ordering may rely on signed sequence, transparency-log inclusion, causal chaining, trusted time anchors or other valid mechanisms. The mechanism and limitations must be exposed.

## 11. Action-context binding is first-class

When TimeProofs binds an agent action to evidence context, the receipt must identify the exact states/artifacts relied on and their temporal proof status.

It must remain possible to determine whether a dependency was:

- current under the applicable policy;
- stale;
- superseded;
- revoked;
- unverifiable;
- not revalidated within the required window.

TimeProofs does not decide whether the action itself was substantively correct.

## 12. Revalidation is policy-aware, not magical freshness

No data source is universally "fresh".

A revalidation result must be interpreted against an explicit freshness or validity policy appropriate to the resource and action.

The system must not represent an old observation as current merely because no newer receipt exists.

## 13. Cryptographic agility is mandatory

No hash algorithm, signature scheme, blockchain, timestamp authority, transparency log or protocol is constitutional.

Algorithms and providers must be versioned and replaceable.

Deprecated or compromised mechanisms must be reclassified transparently rather than hidden.

## 14. Provider and protocol neutrality

TimeProofs may support RFC 3161, SCITT, transparency logs, OpenTimestamps, Sigstore/Rekor-style logs, source attestations, TLS/zk provenance systems and future standards.

No single mechanism is the product identity.

The canonical model sits above these mechanisms.

## 15. Privacy by construction

TimeProofs should prove as much as possible from commitments, hashes, selective disclosure and minimal metadata rather than requiring unnecessary raw-content retention.

Sensitive content must not be published to public ledgers or transparency systems unless explicitly authorized and safe.

## 16. Verification failure must degrade safely

Failures such as unavailable anchors, expired certificates, revoked keys, unsupported algorithms, incomplete chains, source-authentication failures or inconsistent proofs must produce explicit degraded/failed states.

They must never silently become success.

## 17. Fork, replay and equivocation resistance must be testable

The threat model must explicitly cover, at minimum:

- backdating;
- replay of old valid state as current;
- proof substitution;
- receipt tampering;
- log fork/equivocation;
- event omission;
- observer impersonation;
- key compromise;
- clock skew/manipulation;
- source-response forgery;
- state/version rollback;
- stale authorization;
- partial verification masquerading as complete verification.

Covered threats require reproducible adversarial tests.

## 18. Machine-readable output is authoritative

Human-readable prose may summarize results, but canonical proof state must be structured, versioned and machine-readable.

Agents must not need to parse natural-language prose to determine whether a temporal claim is proven, unproven, degraded or unverifiable.

## 19. Standards before invention

TimeProofs must use established, auditable standards and implementations where they satisfy the requirement.

A new cryptographic primitive or protocol may be introduced only when a documented gap cannot be solved safely and interoperably with existing methods.

## 20. SpiderEvidence interoperability preserves separation of concerns

A TimeProofs receipt consumed by SpiderEvidence is temporal evidence, not an epistemic conclusion.

SpiderEvidence must verify the receipt and reason independently over its meaning.

TimeProofs must not import SpiderEvidence conclusions as temporal facts without their own valid temporal proof basis.

## 21. No superiority claim without benchmark evidence

TimeProofs may not claim to make agents safer, more reliable or more auditable merely because cryptographic receipts exist.

Such claims require controlled comparison against strong current alternatives under matched model, task, information and budget conditions.

The target comparison is:

```txt
same qualified agent + TimeProofs
vs
same qualified agent without TimeProofs
```

## 22. Correct abstention is success

When the available proof cannot establish a requested temporal relation, TimeProofs must say so.

Valid outcomes include:

```txt
PROVEN
NOT_PROVEN
CONFLICTING_PROOFS
VERIFICATION_UNAVAILABLE
INSUFFICIENT_ASSURANCE
ORDER_UNDETERMINED
STATE_UNDERDETERMINED
```

A forced definitive answer is a defect when proof is insufficient.

## 23. Historical reconstruction must remain auditable

Where TimeProofs maintains version/state history, previous receipts and verification states must remain reconstructable.

Supersession must not erase prior evidence.

## 24. Research targets are not product claims

Planned primitives such as `revalidate()`, `bindAction()` or cross-system proof composition are hypotheses until implemented and benchmarked.

The public site, documentation and API must distinguish clearly among:

- implemented;
- validated;
- experimental;
- planned.

## 25. Final strategic boundary

TimeProofs should become excellent at one specialized question:

> **What can be independently proven about the temporal existence, observation, state, version and ordering of the information and actions on which AI agents rely?**

It should not become a general investigation engine, an all-purpose governance platform or a universal trust score.
