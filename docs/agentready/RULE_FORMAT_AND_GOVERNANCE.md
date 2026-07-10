# Rule Format And Governance

Status: ACTIVE SPECIALIZED SPECIFICATION

Authority: `AGENTREADY_MASTER_PLAN.md`.

## Goal

AgentReady rule codes should become durable CI vocabulary without pretending to be certification.

## Namespaces

Official namespace controlled by AgentReady:

```txt
AR001
AR002
...
```

Community namespaces:

- `community/...`
- `research/...`
- `vendor/...`

## Future Rule Format

The future JSON/YAML rule format should include:

- schema version;
- rule id;
- title;
- severity;
- source types;
- protocol versions;
- detection summary;
- remediation;
- bad fixtures;
- fixed fixtures;
- false-positive notes;
- changelog.

## Official Rule Requirements

An official rule requires:

- risk justification;
- bad/fixed fixtures;
- tests;
- benchmark data;
- false-positive analysis;
- review;
- versioning;
- recorded decision.

Opening the format does not require opening all advanced detectors.

## Badge Rules

Allowed:

- AgentReady CI enabled;
- AgentReady scan: PASS;
- AgentReady score: 92.

Forbidden:

- AgentReady Certified;
- Certificate of Compliance;
- Guaranteed AI Safe.
