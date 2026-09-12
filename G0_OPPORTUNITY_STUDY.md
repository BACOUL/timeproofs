# TimeProofs G0 — Opportunity Study

Status: **G0 RESEARCH COMPLETE / CONDITIONAL PASS TO PROTOTYPE RESEARCH / NO PRODUCT BUILD AUTHORIZATION**

Last reviewed: 2026-09-12

Authority: `PRIMARY_OBJECTIVE.md` and `CONSTITUTION.md`.

## 1. Decision question

TimeProofs should be rebuilt only if autonomous AI agents have a material need for a specialized temporal-evidence layer that is not adequately solved by ordinary logs, generic timestamping, action receipts, provenance proofs or one vendor's observability stack.

The G0 question is therefore:

> **Will capable autonomous agents need independently verifiable temporal evidence about the external states, observations, versions, permissions and event ordering on which they rely, and can a specialist layer materially improve agent reliability beyond strong current alternatives?**

## 2. G0 conclusion

**Conditional PASS.**

The opportunity is strong enough to justify a dedicated prototype/benchmark program, but not yet strong enough to authorize a production rebuild or public repositioning.

The key finding is that the market is not missing cryptographic primitives. It is missing, or at minimum has not yet converged on, a broadly adopted **agent-native temporal evidence layer** that composes heterogeneous proofs and controls how agents rely on changing state before and after action.

The strongest TimeProofs thesis is therefore not `timestamp-as-a-service` and not `agent receipts` alone.

It is:

> **Temporal state and proof infrastructure for agents: prove what was observed, what existed, which version/state was relied on, whether that dependency was still valid when an action occurred, and what temporal ordering can actually be established.**

The highest-value initial wedge is **Proof Before Action / Action Context Binding**.

## 3. Evidence that the agent need is real

### 3.1 Temporal blindness is a measured model weakness

The ACL 2026 paper *Your LLM Agents are Temporally Blind* evaluates agents in dynamic multi-turn settings and finds that models often over-rely on stale context or unnecessarily repeat tool calls. No evaluated model exceeded 65% normalized alignment with human temporal tool-use preferences even when timestamps were supplied.

Implication: merely exposing timestamps to the model does not solve temporal-state reliability.

Source: https://aclanthology.org/2026.findings-acl.1848/

### 3.2 Long-running agents operate in independently changing environments

Microsoft Research's SentinelBench evaluates long-running monitoring tasks where the environment changes without the agent causing the change. It includes 100 tasks across 10 synthetic web environments and measures completion, response time and resource use.

Implication: future agents increasingly need to distinguish `state observed earlier` from `state currently safe to rely on`.

Source: https://www.microsoft.com/en-us/research/publication/sentinelbench-a-benchmark-for-long-running-monitoring-agents/

### 3.3 Major platforms are making agent activity auditable

AWS AgentCore provides unified traces, prompts and logs per agent, while Microsoft Entra Agent ID exposes agent identity activity in audit and sign-in logs.

Implication: traceability of agents is becoming infrastructure rather than an optional debugging feature. However, platform logs are primarily provider/tenant observability; they do not by themselves establish a portable cross-system temporal proof model.

Sources:
- https://aws.amazon.com/about-aws/whats-new/2026/07/amazon-bedrock-agentcore-unified-observability-single-log-group/
- https://learn.microsoft.com/en-us/entra/agent-id/sign-in-audit-logs-agents

### 3.4 Open standards are forming around receipts and transparency

RFC 9943 (SCITT) became a Proposed Standard in June 2026. It defines signed-statement transparency, verifiable data structures and receipts for auditable histories. An August 2026 Internet-Draft profiles SCITT specifically for AI-agent action receipts.

Implication: signed receipts will likely become commodity infrastructure. TimeProofs should compose and interpret such standards rather than compete with them at the primitive level.

Sources:
- https://www.rfc-editor.org/info/rfc9943/
- https://datatracker.ietf.org/doc/draft-noa-scitt-ai-agent-receipt/01/

## 4. Existing solution classes

### RFC 3161 / qualified time stamps

Strong at: proving that a data imprint existed before a bounded time; trusted/qualified time assurance.

Weak at: agent context, state dependency graphs, freshness policy, cross-system action binding.

RFC 3161 source: https://www.rfc-editor.org/info/rfc3161/

EU qualified electronic time stamps additionally receive a legal presumption of date/time accuracy and integrity under eIDAS when requirements are met.

Source: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02014R0910-20241018

### SCITT / transparency services

Strong at: signed statements, transparency, verifiable history, receipts, anti-equivocation architecture.

Weak at: domain-specific semantics for an agent asking whether a dependency is stale, which state was used for an action, or whether a cross-system temporal relation is actually proven.

### AERF / AgentMint

Strong at: open, independently verifiable evidence receipts for agent actions; policy/action evidence.

Weak at: general external-state temporal reasoning and cross-provider state composition.

Source: https://github.com/aerf-spec/aerf

### Agent Receipts

Strong at: signed/hash-chained action receipts, MCP proxy, SDK integration, optional trusted timestamping.

Weak at: broader external-state lifecycle and proof-aware revalidation.

Source: https://agentreceipts.ai/

### EverMint

Strong at: locking agent observation/state/decision/action payloads with cryptographic timestamping and chain linkage.

Weakness to test: the agent can submit what it says it observed; that is not always equivalent to independently proving what an external source actually returned.

Source: https://evermint.app/

### TLSNotary / zkTLS-style systems

Strong at: cryptographic provenance of data returned by an external TLS server, selective disclosure and source authenticity.

Weak at: complete temporal lifecycle, cross-system ordering, state supersession, freshness/revalidation policy and action-context orchestration.

Sources:
- https://tlsnotary.org/docs/protocol/verification/
- https://docs.reclaimprotocol.org/agents/usage

### AWS / Microsoft platform logs

Strong at: operational traces, identity, execution history, tenant auditability.

Weak at: provider-neutral portable proof semantics and cross-system evidence composition.

## 5. What is commodity or likely to become commodity

TimeProofs must not treat the following as a moat:

- hashing;
- digital signatures;
- a JSON receipt format by itself;
- append-only logs;
- a blockchain anchor;
- RFC 3161 submission;
- SCITT registration;
- basic action logging;
- a generic MCP wrapper;
- a dashboard of agent activity.

These are building blocks.

## 6. Candidate durable problem

The candidate specialist problem is **temporal dependency assurance for autonomous action**.

An agent often acts after a chain of observations made at different times and through different systems. It needs to know, or correctly abstain from claiming, whether those dependencies were still valid at the action boundary.

Example:

```txt
T1: contract version V17 observed
T2: budget approval A4 observed
T3: price P9 observed
T4: contract changed to V18
T5: agent attempts purchase
```

A conventional action receipt can prove the purchase attempt at T5.

TimeProofs should additionally be able to represent and verify that:

- V17 was the contract state originally used;
- V18 superseded V17 before the action;
- the action context therefore contains a stale dependency;
- A4 and P9 may have different freshness/validity policies;
- a revalidation requirement exists before the action is allowed to rely on them;
- the evidence for each statement is independently inspectable.

This is not a truth judgment. It is a temporal-proof and dependency judgment.

## 7. Five proposed TimeProofs differentiators

### D1 — Heterogeneous proof composition

Normalize RFC 3161, SCITT, transparency-log receipts, source signatures, TLS/zk provenance and platform/provider receipts into one canonical temporal-proof graph without flattening their different assurance semantics.

### D2 — Freshness and revalidation as explicit proof state

Represent the difference between `last observed`, `still valid under policy`, `superseded`, `revoked`, `stale`, `unknown` and `revalidation required`.

### D3 — Action-context binding

Bind an agent action to the exact versions/states/observations it relied on, making the action context reconstructable and independently auditable.

### D4 — Cross-system temporal ordering

Establish only the order relations that are actually justified when events come from different clocks, logs, anchors and providers; abstain when order cannot be proven.

### D5 — Portable temporal receipts

Return structured claims and proof paths that another agent/system can verify without needing to trust a proprietary TimeProofs database answer.

## 8. Required primitives for research

The research interface is intentionally small:

```txt
observe()
anchor()
checkpoint()
proveExistence()
proveOrder()
revalidate()
bindAction()
verify()
history()
```

The first prototype should prioritize:

```txt
observe()
proveExistence()
proveOrder()
revalidate()
bindAction()
verify()
```

## 9. Primary use cases to test

1. **Purchase/contract agent** — document or price changes between analysis and execution.
2. **Financial/treasury agent** — authority, balance, quote or approval expires/revokes before action.
3. **Security remediation agent** — state/version changes while remediation plan is being prepared.
4. **Compliance agent** — reconstruct exactly which policy/data versions an action relied on.
5. **Monitoring agent** — detect when previously observed external state has materially changed.
6. **Cross-system workflow agent** — prove ordering across email, API, database and external service events.
7. **Investigation agent** — SpiderEvidence asks for proof that artifact A existed before event B or that one version superseded another.

## 10. Strongest-baseline rule

TimeProofs may not compare itself only with an agent that has no temporal tools.

The benchmark must include at least:

- **B0 — model + timestamps/context only**;
- **B1 — model + ordinary provider/platform logs**;
- **B2 — model + best practical receipt/timestamp/provenance components available without TimeProofs orchestration**;
- **B3 — same model + TimeProofs candidate**.

The strategic win is meaningful only if B3 beats B2 on the tasks TimeProofs claims to specialize in.

## 11. G0 GO / NO-GO criteria

### GO to prototype research if all are true

1. Temporal blindness / dynamic-state failures remain material on strong current agents.
2. Existing tools remain fragmented across timestamps, action receipts, source provenance, observability and transparency.
3. The TimeProofs canonical model can preserve those distinctions without inventing stronger semantics than the underlying proof supports.
4. TARB can fairly measure incremental value against B2.
5. At least one high-value wedge — currently `Proof Before Action / Action Context Binding` — is not reducible to a trivial wrapper around one existing standard.

### NO-GO / pivot if any of these persist after prototype evaluation

- B2 matches or beats TimeProofs on practical correctness, trust, portability and economics;
- TimeProofs cannot materially reduce stale or temporally invalid actions;
- source-attested state cannot be distinguished reliably from agent-self-declared state in representative workflows;
- cross-system composition adds complexity without measurable reliability gain;
- independent verification depends primarily on trusting the TimeProofs service itself;
- the differentiator collapses to generic logs, timestamping or receipt storage.

## 12. Current verdict

**G0: CONDITIONAL PASS.**

TimeProofs has enough evidence of a future agent need to justify a dedicated benchmark and bounded prototype.

This is **not** a product-market-fit pass and **not** authorization to rebuild the current site or deprecate AgentReady.

The next authorized research work is:

1. freeze the canonical temporal proof model;
2. freeze the temporal threat model;
3. freeze TARB v0.1 before implementing the candidate engine;
4. build the smallest candidate needed to run B3;
5. compare B0/B1/B2/B3 under matched conditions;
6. make the rebuild decision from measured uplift.
