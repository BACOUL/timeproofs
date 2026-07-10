# AgentReady Master Plan

Status: ACTIVE SOURCE OF TRUTH

This document supersedes earlier AgentReady product, commercial and execution directions wherever they conflict with this master plan.

If another document conflicts with AGENTREADY_MASTER_PLAN.md, the master plan prevails.

## Document Hierarchy

1. `AGENTREADY_MASTER_PLAN.md`
2. `EXECUTION_SEQUENCE.md`
3. `DECISION_LOG.md`
4. specialized specifications
5. historical documents

Historical documents may remain useful context, but they do not define current product direction.

## Official Positioning

AgentReady is the shift-left CI gate for agent-facing contracts.

Official description:

```txt
AgentReady analyzes OpenAPI specifications and MCP tools before deployment to identify ambiguous, unbounded or insufficiently controlled agent actions.
```

AgentReady is:

- static analysis;
- a CI/CD control before deployment;
- specialized in OpenAPI and MCP contracts exposed to agents;
- complementary to runtime security and observability solutions.

AgentReady is not:

- a runtime firewall;
- an API gateway;
- an IAM solution;
- a guarantee of invulnerability;
- an official certification.

Mandatory limitation:

```txt
TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
```

## PASS And Score Meaning

A PASS result or a score of 100/100 means only:

```txt
No risk covered by the selected AgentReady engine version, ruleset version and policy configuration was detected in the analyzed input.
```

Every result should be traceable to:

- engine version;
- ruleset version;
- AgentReady schema version;
- source type;
- source protocol version when known;
- policy configuration/version;
- input file hash;
- commit;
- scan date.

A badge or previous PASS must never be presented as current state unless it still points to the exact engine version, ruleset version, policy configuration/version, source protocol and version when known, commit, input hash, and scan date that produced it.

Forbidden product and communication terms:

- certified;
- certificate of compliance;
- AI-safe certified;
- guaranteed secure;
- invulnerable;
- official global standard.

Allowed terminology:

- AgentReady Scan Report;
- AgentReady Assessment Result;
- AgentReady CI Evidence;
- AgentReady PASS Report;
- AgentReady scan: PASS;
- AgentReady score.

## Launch Offer

Initial launch includes only:

- Community;
- Pro.

Team and Agency are:

```txt
POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT
```

Team and Agency remain long-term vision items, but they must not:

- be developed before real revenue or repeated real demand;
- be announced as available;
- block Community or Pro;
- appear as purchasable offers at initial launch.

## Community

Community is the free adoption layer.

Official scope:

- free;
- no account;
- no license;
- no credit card;
- local analysis;
- no OpenAPI/MCP upload by default;
- OpenAPI;
- MCP;
- AR001-AR010;
- score and status;
- PASS/FAIL;
- `--min-score`;
- `--fail-on`;
- Markdown report;
- `agentready.json`;
- CLI;
- GitHub Action;
- unlimited CLI runs;
- unlimited CI runs;
- unlimited local repositories;
- private or public usage not measured by TimeProofs.

Community keeps CI blocking free.

Never put CI blocking behind Pro.

Never monetize by number of Community scans.

Provisional technical targets, not yet enforced in code and subject to benchmark:

- Maximum file size target: 10 MB.
- Maximum operation/tool count target: 5,000.
- Maximum scan duration target: 120 seconds.

These targets apply equally to Community and Pro. They are technical quality targets, not monetization boundaries.

## Pro V0.1

Target price:

```txt
24 EUR excl. VAT/month
240 EUR excl. VAT/year
```

Limit:

```txt
5 registered repositories
```

Runs:

```txt
unlimited
```

MVP Pro functions:

1. versioned policy configuration;
2. baseline comparison;
3. new-risks-only mode;
4. SARIF export;
5. pull request annotations;
6. local structured and expiring exceptions;
7. mandatory reason;
8. exception owner;
9. mandatory expiration.

Not in initial Pro MVP:

- multi-user;
- organizations;
- collaboration;
- hosted result history;
- notifications;
- heavy analytics dashboard;
- client workspaces;
- Agency branding;
- advanced individual developer features;
- premium reports, which are `POST_MVP`;
- certification;
- Enterprise.

Premium reports, hosted result history, notifications, collaboration, organizations, advanced individual developer features, and client workspaces are `POST_MVP` or `POST_REVENUE`, not initial Pro entitlements.

## Exceptions And Portability

Exception format must be:

- structured;
- versioned;
- readable;
- storable in Git;
- exportable;
- retained after cancellation;
- non-opaque.

Example:

```yaml
schema_version: "0.1"

exceptions:
  - rule: AR004_BULK_ACTION_WITHOUT_LIMIT
    operation: export_internal_logs
    reason: Internal API restricted to the audit network
    owner: security-team
    expires_at: 2026-12-31
```

Data lock-in is forbidden. Retention should come from accumulated context value, not from making it impossible to leave AgentReady.

## Engine Quality

Functional engine maturity is advanced.
Measured detection quality is not yet established.

The benchmark program must include:

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

Known rule-quality issues to strengthen:

- AR001: name is write-oriented while detection can be broader;
- AR003: current coverage is mostly MCP;
- AR008: idempotency/rollback promise is wider than current analysis;
- AR010: structured rate-limit detection is insufficient.

No rule is scientifically validated until measured.

## Distribution And Onboarding

Community publication sequence:

1. resolve license;
2. confirm npm scope;
3. define 2FA or trusted publishing;
4. validate provenance;
5. publish Community package;
6. create immutable tag;
7. create GitHub Release;
8. test public installation;
9. prepare public Action repository if needed;
10. publish on GitHub Marketplace.

GitHub Marketplace is a distribution channel, not a security validation.

Stripe remains the initial payment channel.

## License Architecture

Target Pro license architecture:

```txt
Stripe payment
-> cryptographically random AgentReady license key
-> only the key hash stored server-side
-> signed entitlement token
-> local signature verification
-> bounded local cache
-> documented grace period
```

Rules:

- never use a Stripe identifier as a secret;
- never store a raw license key server-side;
- no network call is mandatory on every scan;
- no OpenAPI/MCP contract is sent to the license service;
- Community works without account, license, or server;
- the minimal token contains only plan, expiration, features, repository limit, and a pseudonymized identifier.

Target onboarding:

```txt
discover
-> run locally
-> initialize CI
-> commit
-> first successful GitHub run
```

Target: under three minutes, without signup, card, token, or upload.

Planned commands, not implemented in this PR:

```txt
npx @timeproofs/agentready scan openapi ./openapi.yaml
npx @timeproofs/agentready scan mcp ./mcp-tools.json
npx @timeproofs/agentready init
npx @timeproofs/agentready demo
```

`init` must detect OpenAPI/MCP, show files before writing, ask confirmation, generate a Community workflow, run a local scan, and not generate Pro policy.

## Standardization

Planned public standardization assets:

- AR001-AR010 public dictionary;
- bad/fixed pages;
- open JSON/YAML rule format;
- official `AR...` namespace controlled by AgentReady;
- community namespaces:
  - `community/...`
  - `research/...`
  - `vendor/...`

Allowed badges:

- AgentReady CI enabled;
- AgentReady scan: PASS;
- AgentReady score: 92.

Every badge must be tied to:

- engine version;
- ruleset version;
- policy configuration/version;
- source protocol and version when known;
- commit;
- input hash;
- scan date.

An old PASS must never be shown as the current state.

Forbidden badges:

- AgentReady Certified;
- Certificate of Compliance;
- Guaranteed AI Safe.

## Privacy And Support

Direction:

```txt
self-service by default
```

No silent telemetry in Community.

Do not automatically collect:

- OpenAPI contracts;
- MCP definitions;
- full reports;
- private CI results;
- secrets.

Future voluntary command:

```txt
agentready report-false-positive
```

It must show data before sending, require explicit consent, allow local redaction, avoid full contract upload by default, and never send secrets.

Maintain channels for:

- security;
- billing;
- privacy;
- legal;
- vulnerabilities;
- incidents.

Do not promise zero human intervention.

## Open Core And IP

Planned open or publicly auditable layers:

- Community CLI;
- GitHub Action;
- `agentready.json`;
- AR taxonomy;
- rule documentation;
- bad/fixed examples;
- Community rules;
- community rule format.

Advanced assets that may remain protected:

- advanced rule packs;
- calibration;
- full corpus;
- advanced differential engine;
- enriched SARIF;
- internal benchmark data;
- licensing;
- Pro services;
- Team/Agency functions.

This PR does not choose the final legal license.

Publication remains blocked until:

- legacy ProofSpec references are resolved;
- open-core boundary is validated;
- legal decision is approved.

Do not claim locally shipped encrypted code is invulnerable.

## Legal

AgentReady is:

```txt
an automated static-analysis and decision-support tool
```

Legal posture:

- obligation of means;
- no result guarantee;
- no runtime guarantee;
- no guarantee against prompt injections;
- no IAM, infrastructure, secrets, dependency, or implementation guarantee;
- liability limitation must be legally validated;
- professional/cyber insurance required before real payments;
- terms must be validated before production Stripe activation.

## Trust Center

Future public Trust Center must explain:

- local analysis;
- license metadata;
- Stripe;
- hosting;
- retention;
- deletion;
- incidents;
- vulnerabilities;
- product limits;
- voluntary feedback data.

Do not write: `No data is ever sent.`

Always distinguish:

- analyzed contract;
- license metadata;
- billing data;
- voluntary feedback.

## Anti-Drift Rule

A new idea never changes the current PR directly.
It is recorded in the Decision Log or backlog, evaluated, sequenced and implemented only in a dedicated PR.

Before every PR, answer:

1. Which Master Plan stage does this execute?
2. What is the exact scope?
3. What is explicitly prohibited?
4. Which tests prove completion?
5. What is the only next PR allowed?

## Only Next PR

After this rebaseline PR, the only authorized next PR is:

```txt
release(agentready): resolve Community publication blockers
```

Planned branch:

```txt
release-agentready-community-publication-blockers
```

That PR must resolve blockers. It must not publish the package without a separate explicit authorization.
