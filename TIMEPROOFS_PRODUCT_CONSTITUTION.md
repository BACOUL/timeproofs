# TimeProofs Product Constitution

Status: FROZEN PRODUCT THESIS
Branch: `relaunch/invariant-engine`

This file defines what TimeProofs is. Implementation details, protocol packs, pricing and distribution tactics may evolve. The product thesis below does not change unless an explicit founder decision supersedes it in `docs/startup/DECISION_LOG.md`.

## 1. Company

**TimeProofs** is cross-protocol consistency infrastructure for agentic transactions.

Core thesis:

> Individually valid protocol objects can compose into a globally inconsistent transaction.

TimeProofs exists to verify the composition.

## 2. Product promise

TimeProofs verifies that an agentic transaction remains coherent when it crosses protocol and system boundaries before consequential state is committed.

The long-term product is a **Cross-Protocol Consistency & Invariant Engine**.

The system reasons over five first-class primitives:

1. **ProtocolObject** — a versioned source artifact from a protocol or business system.
2. **Binding** — the declared or derived relationship between two or more objects in the same economic/business transaction.
3. **Invariant** — a deterministic condition that must hold across those objects.
4. **Evidence** — the exact fields, versions, signatures, hashes, timestamps and external facts used to evaluate the invariant.
5. **Decision** — `PASS`, `WARN`, `BLOCK`, or `UNKNOWN`.

No opaque numeric score is a primary product primitive.

## 3. Initial wedge

The first wedge is **UCP ↔ AP2 composition consistency**.

This is not a generic UCP/AP2 conformance checker. UCP/AP2 already own many local guarantees such as signatures, mandate presence, expiry and basic scope binding.

TimeProofs focuses on composition properties that remain after those local guarantees are satisfied, including:

- semantic payment projection consistency;
- cross-object economic consistency;
- transaction object-chain closure;
- execution evidence closure;
- lifecycle-aware state consistency;
- preservation of cross-object business invariants.

The exact blocking invariant set is versioned inside the UCP/AP2 Invariant Pack and may evolve as standards evolve.

## 4. Strategic destination

The company expands by adding **Invariant Packs**, not by changing category.

Examples:

- UCP ↔ AP2
- A2A ↔ UCP
- MCP ↔ UCP
- UCP Travel ↔ AP2
- procurement ↔ payment
- internal business protocol ↔ payment/mandate rail

Each pack contains maintained, version-aware knowledge:

- object mappings;
- canonicalization rules;
- binding rules;
- invariants;
- tolerated transformations;
- evidence requirements;
- edge cases;
- fixtures;
- compatibility matrices;
- regression tests.

The moat hypothesis is the accumulated verified corpus of these packs and their operational compatibility knowledge, not the generic comparison engine.

## 5. Product modes

TimeProofs evolves through three operating modes using the same engine:

### Verify
Local/CI verification of supplied artifacts. No transaction blocking required.

### Enforce
Machine decision used by an application/runtime to allow, block or escalate a consequential action.

### Inline
TimeProofs runs on the commit path for supported flows and becomes part of production transaction execution.

Observe-only reporting is an adoption mode, not the final strategic position.

## 6. Architecture invariants

The following are architectural rules:

- core consistency decisions are deterministic;
- LLMs may assist research, authoring, mapping or explanations, but do not own `PASS/BLOCK` for core invariants;
- protocol-specific parsing belongs in adapters;
- evidence is preserved, never discarded by canonicalization;
- protocol and schema versions are explicit;
- ambiguous or unsupported semantics return `UNKNOWN`, never guessed success;
- every blocking invariant has reproducible fixtures and evidence;
- standards are dependencies/targets, not competitors to reimplement;
- if a protocol fully and reliably owns a guarantee, TimeProofs treats it as conformance/compatibility, not strategic moat.

## 7. What TimeProofs is NOT

TimeProofs must not become primarily:

- an AI readiness scanner;
- an audit/score/badge business;
- a generic MCP gateway;
- an identity provider;
- an OAuth replacement;
- a generic policy engine;
- an agent authorization ledger;
- a generic observability dashboard;
- a generic workflow engine;
- a payment processor;
- a passive PDF/report product;
- an invented protocol whose main value is visibility;
- a wrapper whose value disappears when one standard adds one field.

## 8. Product quality standard

TimeProofs is intended to be a global developer-infrastructure product.

For each major product area, design must be benchmarked against world-class products relevant to that workflow. The team extracts principles rather than copying layouts.

The native TimeProofs visual and interaction grammar must come from its own primitives: **Objects, Bindings, Invariants, Evidence, Decisions**.

Avoid default SaaS conventions when they do not improve the actual verification workflow.

## 9. Distribution principle

Primary adoption should be developer-led and low-friction where possible:

- GitHub;
- package registries;
- CLI/SDK;
- CI integrations;
- protocol communities;
- reproducible fixtures;
- technical documentation useful before signup;
- integration examples.

Enterprise sales can become important, but the company must not require a large outbound sales organization to obtain all early adoption.

## 10. Commercial principle

The likely value metric is consequential transactions verified/enforced, not arbitrary seats.

The intended model is:

- low-friction local/community use for distribution;
- paid managed verification/enforcement, pack maintenance, evidence retention and collaboration;
- usage-based production component when appropriate;
- enterprise packaging for private packs, internal systems, deployment controls, SLA and support.

Exact pricing and open-source boundary remain implementation/business decisions, not constitutional decisions.

## 11. Change control

The following may evolve without changing the company thesis:

- a specific invariant;
- a protocol field mapping;
- a pack version;
- a supported protocol;
- SDK/API syntax;
- packaging/pricing;
- website structure;
- cloud architecture;
- distribution tactic.

The following require an explicit founder-level product-direction decision recorded in the Decision Log:

- changing the category away from cross-protocol consistency infrastructure;
- replacing the Object → Binding → Invariant → Evidence → Decision model;
- changing the strategic destination away from multi-protocol invariant packs and enforcement;
- turning TimeProofs into one of the explicit non-goals above.

## 12. One-sentence handoff

> TimeProofs verifies that independently valid agentic protocol objects still compose into the same valid business transaction, and eventually enforces those invariants before commit.
