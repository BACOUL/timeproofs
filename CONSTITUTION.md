# TimeProofs Constitution

Status: **FOUNDATIONAL / PROPOSED FOR AGENT TRUST-LAYER REBASELINE**

Last reviewed: 2026-09-12

This constitution defines the invariants that any future TimeProofs implementation must preserve. Product features, APIs, providers and cryptographic mechanisms may change; these rules may not be weakened silently.

## 1. TimeProofs is a reliance-security layer, not a truth oracle

TimeProofs evaluates what can be independently verified about the objects, states and authorities on which an AI agent relies, and whether that evidence satisfies an explicit policy for a specific intended use.

It does not decide whether every proposition contained in an object is factually true, credible, causal, lawful or epistemically sufficient.

Investigation/truth reasoning belongs outside TimeProofs, including to systems such as SpiderEvidence.

## 2. `Safe to use` is always scoped

No object is universally safe, trusted or good.

A reliance decision must be bound to:

- the exact object/state;
- intended use or action class;
- agent/actor where relevant;
- policy version;
- evaluation time/boundary;
- required assurance dimensions.

A low-risk use decision must never be silently reused for a higher-risk action.

## 3. Authenticity is not truth

TimeProofs must preserve these distinctions:

```txt
AUTHENTIC != TRUE
SIGNED != CORRECT
SOURCE_VERIFIED != CLAIM_VERIFIED
PROVENANCE_KNOWN != TRUSTWORTHY_CONTENT
```

A genuine document can contain false information. A correctly signed API response can contain an error. A known source can be wrong.

## 4. Every verdict must expose its proof dimensions

A generic trust score is insufficient.

Machine-readable output must expose, where applicable, distinct states for:

- integrity;
- source identity;
- authenticity;
- provenance;
- temporal evidence;
- freshness/currentness;
- version/supersession;
- revocation;
- authorization/delegation;
- conflicts;
- verification availability;
- policy fit.

No scalar score may hide a blocking failure.

## 5. Every proof must state exactly what is proven

No output may use a generic `verified=true` when the actual claim is more specific.

A receipt or assessment must identify the exact claim being verified, such as:

- content digest matches;
- source identity verified;
- signature valid under profile P;
- observed at;
- existed before;
- state observed at;
- precedes/follows;
- supersedes;
- not revoked within a defined checked domain;
- authorized for action class A under delegation D;
- action bound to evidence context C.

The proof semantics must be explicit and machine-readable.

## 6. No invented precision

Time, identity, provenance, version and authorization may each be exact, bounded, declared, independently attested, partial or unknown.

The system must not convert a weaker statement into a stronger one.

Examples:

```txt
EXISTED_BEFORE 14:32 != CREATED_AT 14:32
OBSERVED_AT 14:32 != WAS_TRUE_AT 14:32
NO_NEWER_VERSION_FOUND != CURRENT_VERSION
NO_REVOCATION_FOUND != PROVEN_NOT_REVOKED
```

## 7. Absence of proof is not proof of absence

`NO_PROOF_FOUND`, `NOT_PROVEN`, inaccessible evidence or failed verification may never be rendered as proof that an artifact, state, revocation or event did not exist.

Negative claims require an explicit bounded observation domain with justified completeness.

## 8. Integrity is object-specific

A successful digest/signature check proves only the property defined by the relevant canonicalization and verification profile.

If the bytes, structured fields or rendered semantics can differ under another representation, that limitation must remain visible.

Canonicalization must be versioned.

## 9. Source identity and acquisition provenance are mandatory where relevant

An observation should preserve, where applicable:

- observer identity or cryptographic identity;
- claimed source identity;
- acquisition method;
- source locator;
- artifact/state commitment;
- observation time and its provenance;
- software/component version;
- authentication/authorization context;
- source attestation or session proof;
- prior related proof object.

A self-declared observation must remain distinguishable from a source-attested observation.

## 10. Independent time must remain distinguishable from caller time

A timestamp supplied by a caller is evidence about what the caller declared, not independent temporal proof.

Independent assurance requires a verifiable external mechanism appropriate to the claim.

## 11. Freshness is policy-relative

No information is universally fresh.

Currentness must be evaluated against a policy appropriate to the resource and intended use.

The system must not represent an old observation as current merely because no newer proof exists.

## 12. Version and supersession claims require a justified version domain

TimeProofs may call an object `CURRENT_VERSION` only where the relevant version authority, source or policy makes that determination justifiable.

Otherwise it must use weaker states such as:

```txt
NO_NEWER_VERSION_OBSERVED
SUPERSESSION_UNKNOWN
REVALIDATION_REQUIRED
```

## 13. Revocation claims require a checked revocation domain

TimeProofs may represent `NOT_REVOKED` only when the relevant revocation mechanism/domain was successfully checked and the semantics justify the claim.

If the mechanism is unavailable, incomplete or stale, output must degrade explicitly.

## 14. Authorization is external authority, not model judgment

An agent cannot grant itself authority merely by reasoning that an action is appropriate.

Authorization/delegation evidence must be externally grounded, scoped and time-bounded where applicable.

TimeProofs may verify authorization artifacts and their current status; it does not invent permissions.

## 15. Proofs must be independently verifiable

A `TimeProofsReceipt` should contain or reference sufficient verification material for another authorized machine to validate its claims without relying solely on a TimeProofs database response.

TimeProofs should minimize proprietary trust dependencies wherever practical.

## 16. Receipts are immutable; assessments are versioned

Issued cryptographic receipts must not be silently rewritten.

If metadata, revocation state, policy or verification interpretation changes, a new assessment must reference the original receipt rather than alter history.

## 17. State history must not imply unobserved continuity

Two matching observations at T1 and T2 do not prove that no intermediate state existed.

Continuous-state claims require continuous or otherwise sufficient evidence under an explicit model.

## 18. Temporal order must be evidence-backed

TimeProofs may infer `A PRECEDES B` only where the proof graph justifies that relation.

Wall-clock values alone may be insufficient when clocks are untrusted, skewed or incomparable.

## 19. Action-context binding is first-class

When TimeProofs binds an agent action to evidence context, the receipt must identify the exact material dependencies and their reliance status at the action boundary.

It must remain possible to determine whether each dependency was:

- accepted under policy;
- stale;
- superseded;
- revoked;
- unverifiable;
- conflict-bearing;
- not revalidated within the required window.

TimeProofs does not decide whether the action itself was substantively correct.

## 20. Revalidation is explicit

TimeProofs must make clear what was rechecked, against which source or authority, at what time and under which policy.

A partial revalidation must not masquerade as complete revalidation.

## 21. Conflicting proofs are a valid result

If valid-looking evidence conflicts, TimeProofs must preserve the conflict rather than average it away.

Canonical outcomes should include states such as:

```txt
CONFLICTING_PROOFS
SOURCE_CONFLICT
VERSION_CONFLICT
AUTHORITY_CONFLICT
```

## 22. Cryptographic and provider agility are mandatory

No hash algorithm, signature scheme, blockchain, timestamp authority, transparency log, identity provider or protocol is constitutional.

Algorithms and providers must be versioned and replaceable.

Deprecated or compromised mechanisms must be reclassified transparently.

## 23. Standards before invention

TimeProofs must use established, auditable standards and implementations where they satisfy the requirement.

A new cryptographic primitive or protocol may be introduced only when a documented gap cannot be solved safely and interoperably with existing methods.

## 24. Privacy by construction

TimeProofs should prove as much as possible from commitments, hashes, selective disclosure and minimal metadata rather than requiring unnecessary raw-content retention.

Sensitive content must not be published to public ledgers/transparency systems unless explicitly authorized and safe.

## 25. Verification failure must degrade safely

Unavailable anchors, expired certificates, revoked keys, unsupported algorithms, incomplete chains, source-authentication failures, stale revocation data or inconsistent proofs must produce explicit degraded/failed states.

They must never silently become success.

## 26. Adversarial resistance must be testable

The threat model must explicitly cover, at minimum:

- content tampering;
- canonicalization ambiguity;
- source spoofing;
- provenance substitution;
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
- stale or forged authorization;
- revocation hiding;
- partial verification masquerading as complete verification;
- policy downgrade;
- trust-score laundering across use cases.

Covered threats require reproducible adversarial tests.

## 27. Machine-readable output is authoritative

Human-readable prose may summarize results, but canonical proof and reliance state must be structured, versioned and machine-readable.

Agents must not need to parse natural-language prose to determine whether an object is acceptable, degraded, rejected or requires revalidation.

## 28. Reliance decisions must explain themselves

A verdict such as `TRUSTED_FOR_USE` or `DO_NOT_USE` must include:

- policy/intended use;
- passed checks;
- failed checks;
- unknown checks;
- blocking reasons;
- evidence/proof references;
- expiry/revalidation requirements;
- limitations.

No opaque trust oracle is permitted.

## 29. SpiderEvidence interoperability preserves separation of concerns

A TimeProofs assessment consumed by SpiderEvidence is evidence about integrity, provenance, source, authority, time or currentness — not an epistemic conclusion about the truth of the content.

SpiderEvidence must verify TimeProofs receipts and reason independently.

TimeProofs must not import SpiderEvidence conclusions as verified source facts without their own valid proof basis.

## 30. No superiority claim without benchmark evidence

TimeProofs may not claim to make agents safer, more reliable or more trustworthy merely because checks/receipts exist.

Such claims require controlled comparison against strong current alternatives under matched model, task, information and budget conditions.

The target comparison is:

```txt
same qualified agent + TimeProofs
vs
same qualified agent without TimeProofs
```

## 31. Correct abstention is success

When evidence cannot establish a requested property or policy requirement, TimeProofs must say so.

Valid outcomes include:

```txt
PROVEN
NOT_PROVEN
INSUFFICIENT_EVIDENCE
CONFLICTING_PROOFS
VERIFICATION_UNAVAILABLE
INSUFFICIENT_ASSURANCE
REVALIDATION_REQUIRED
SUPERSESSION_UNKNOWN
REVOCATION_UNKNOWN
SOURCE_UNVERIFIED
ORDER_UNDETERMINED
STATE_UNDERDETERMINED
```

A forced definitive answer is a defect when evidence is insufficient.

## 32. Research targets are not product claims

Planned primitives such as `assessForUse()`, `revalidate()`, `bindAction()` or cross-system proof composition are hypotheses until implemented and benchmarked.

The public site, documentation and API must distinguish clearly among:

- implemented;
- validated;
- experimental;
- planned.

## 33. Final strategic boundary

TimeProofs should become excellent at one specialized question:

> **Can an AI agent safely rely on this external object for this intended use, based on independently verifiable integrity, source, provenance, authority, version, revocation and temporal evidence?**

It should not become a general investigation engine, an all-purpose governance platform or a universal truth score.
