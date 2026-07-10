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

- start with a small set of relevant repositories;
- read contribution guidelines;
- personalize each contribution;
- open an issue first when appropriate;
- avoid automated mass PRs;
- never add badges without maintainer agreement.
