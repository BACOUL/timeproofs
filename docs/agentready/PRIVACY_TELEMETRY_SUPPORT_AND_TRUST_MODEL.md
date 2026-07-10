# Privacy, Telemetry, Support, And Trust Model

Status: ACTIVE SPECIALIZED SPECIFICATION

Authority: `AGENTREADY_MASTER_PLAN.md`.

## Privacy

No silent telemetry in Community.

Do not automatically collect:

- OpenAPI contracts;
- MCP definitions;
- full reports;
- private CI results;
- secrets.

Accepted signals:

- public npm download counts;
- public repositories using the Action;
- privacy-respecting documentation traffic;
- Pro accounts;
- registered Pro repositories;
- voluntarily submitted data;
- explicitly consented feedback.

Never claim to know total private run count, private vulnerability count, or private CI results without voluntary collection.

## License Privacy Model

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

License rules:

- never use a Stripe identifier as a secret;
- never store a raw license key server-side;
- no network call is mandatory on every scan;
- no OpenAPI/MCP contract is sent to the license service;
- Community works without account, license, or server;
- minimal token contents are plan, expiration, features, repository limit, and pseudonymized identifier.

Data sent to the license service must be limited to license and entitlement metadata. OpenAPI contracts, MCP definitions, full reports, private CI results, and secrets are not required for license validation.

## False Positives

Future command:

```txt
agentready report-false-positive
```

Requirements:

- voluntary;
- display data before sending;
- explicit consent;
- local redaction;
- no automatic full contract upload;
- no secrets.

## Support

Direction:

```txt
self-service by default
```

Maintain channels for:

- security;
- billing;
- privacy;
- legal;
- vulnerabilities;
- incidents.

Do not promise zero human intervention.

## Trust Center

Future Trust Center must distinguish:

- analyzed contract;
- license metadata;
- billing data;
- voluntary feedback.

Do not write:

```txt
No data is ever sent.
```

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
