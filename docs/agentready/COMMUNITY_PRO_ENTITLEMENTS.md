# Community And Pro Entitlements

Status: ACTIVE SPECIALIZED SPECIFICATION

Authority: `AGENTREADY_MASTER_PLAN.md`.

## Launch Plans

Initial launch contains only:

- Community;
- Pro.

Team and Agency are:

```txt
POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT
```

## Community

Community includes:

- free usage;
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
- free CI blocking.

Never paywall CI blocking.

Never monetize by number of Community scans.

## Pro V0.1

Target price:

```txt
24 EUR excl. VAT/month
240 EUR excl. VAT/year
```

Repository limit:

```txt
5 registered repositories
```

Runs:

```txt
unlimited
```

MVP functions:

1. versioned policy configuration;
2. baseline comparison;
3. new-risks-only mode;
4. SARIF export;
5. pull request annotations;
6. local structured and expiring exceptions;
7. mandatory reason;
8. exception owner;
9. mandatory expiration.

Not in Pro MVP:

- multi-user;
- organizations;
- collaboration;
- hosted result history;
- notifications;
- heavy dashboard;
- client workspaces;
- Agency branding;
- advanced individual developer features;
- premium reports;
- certification;
- Enterprise.

`POST_MVP`, not initial Pro entitlement:

- premium reports;
- hosted result history;
- notifications;
- collaboration;
- organizations;
- advanced individual developer features;
- client workspaces.

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
- minimal token contents are plan, expiration, features, repository limit, and pseudonymized identifier.

## Exceptions

Exceptions must be structured, versioned, readable, stored in Git, exportable, and retained after cancellation.

```yaml
schema_version: "0.1"

exceptions:
  - rule: AR004_BULK_ACTION_WITHOUT_LIMIT
    operation: export_internal_logs
    reason: Internal API restricted to the audit network
    owner: security-team
    expires_at: 2026-12-31
```

## Technical Targets

Targets, not yet enforced and subject to benchmark:

- Maximum file size target: 10 MB.
- Maximum operation/tool count target: 5,000.
- Maximum scan duration target: 120 seconds.

These targets are the same for Community and Pro.
