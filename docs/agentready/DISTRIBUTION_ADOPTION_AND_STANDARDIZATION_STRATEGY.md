# Distribution, Adoption, And Standardization Strategy

Status: ACTIVE SPECIALIZED SPECIFICATION

Authority: `AGENTREADY_MASTER_PLAN.md`.

## Community Distribution Sequence

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

## Adoption

Community adoption must require no signup, card, token, or upload.

Allowed future badges:

- AgentReady CI enabled;
- AgentReady scan: PASS;
- AgentReady score: 92.

Badge and PASS freshness rules:

- every PASS or badge must link to engine version;
- every PASS or badge must link to ruleset version;
- every PASS or badge must link to policy configuration/version;
- every PASS or badge must link to source protocol and version when known;
- every PASS or badge must link to commit;
- every PASS or badge must link to input hash;
- every PASS or badge must link to scan date;
- an old PASS must never be presented as current state.

Forbidden badges:

- AgentReady Certified;
- Certificate of Compliance;
- Guaranteed AI Safe.

## Standardization

Planned assets:

- public AR001-AR010 dictionary;
- bad/fixed examples;
- public `agentready.json` spec;
- open JSON/YAML rule format;
- community rule namespaces.

Official namespace:

```txt
AR001
AR002
...
```

Community namespaces:

- `community/...`
- `research/...`
- `vendor/...`

## Contributions

Open source contributions should be targeted:

- start with about ten relevant repositories;
- read contribution guidelines;
- personalize each contribution;
- open an issue first when appropriate;
- avoid automated mass PRs;
- never add badges without maintainer agreement.

Do not run 100 automated pull requests with identical content. Each contribution must provide a real fix, useful workflow, or clearly scoped readiness improvement for that repository.

## Framework Integration Roadmap

Framework integration should advance in four levels:

1. documentation;
2. official examples;
3. templates or plugins;
4. targeted upstream contributions after the Community release and benchmark are stable.

Possible targets, without implying any partnership or approval:

- MCP TypeScript SDK;
- MCP Python SDK;
- FastMCP;
- LangChain MCP;
- OpenAPI Generator.

## Public Observatory Policy

The future public observatory, tentatively named `The State of Agent-Facing Contract Security`, may be published only after:

- benchmark foundation exists;
- methodology is public;
- sources are public or explicitly consented;
- results are aggregated;
- period and sample size are stated;
- engine version is stated;
- ruleset version is stated;
- selection bias is disclosed;
- false positives are acknowledged;
- correction process exists.

Silent collection of private OpenAPI contracts, MCP definitions, CI results, or findings is forbidden.

Do not publish accusatory named rankings of projects.

## Adoption Metrics

Allowed adoption signals:

- public npm downloads;
- public repositories using the Action;
- privacy-respecting documentation traffic;
- Pro accounts;
- registered Pro repositories;
- voluntarily submitted feedback;
- explicitly consented benchmark data.

Forbidden adoption claims:

- total private runs;
- total private findings;
- total private CI failures;
- private vulnerability counts.

Do not claim to know private runs or findings unless they were voluntarily and explicitly shared.
