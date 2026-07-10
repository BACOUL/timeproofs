# Engine Quality And Benchmark Plan

Status: ACTIVE SPECIALIZED SPECIFICATION

Authority: `AGENTREADY_MASTER_PLAN.md`.

Functional engine maturity is advanced.
Measured detection quality is not yet established.

## Benchmark Program

The benchmark must include:

- safe OpenAPI corpus;
- dangerous OpenAPI corpus;
- safe MCP corpus;
- dangerous MCP corpus;
- ambiguous cases;
- false positives;
- false negatives;
- bad/fixed fixtures;
- human annotations;
- precision per rule;
- recall per rule;
- false-positive rate;
- false-negative rate;
- performance;
- reproducibility.

Quality must be measured per rule, not only globally.

## Known Rule Gaps

- AR001: name is write-oriented while detection can be broader.
- AR003: current coverage is mostly MCP.
- AR008: idempotency/rollback promise is wider than current analysis.
- AR010: structured rate-limit detection is insufficient.

No rule may be described as scientifically validated before measurement.

## Quality Gates

Before paid launch:

- benchmark corpus exists;
- each rule has bad/fixed fixtures;
- each rule has precision and recall estimates;
- false positive review process exists;
- performance target is measured;
- results are reproducible from a recorded engine version and ruleset version.

This document does not change any rule.
