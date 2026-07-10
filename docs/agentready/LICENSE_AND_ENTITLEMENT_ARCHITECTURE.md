# License And Entitlement Architecture

## Purpose

This document defines the future license and entitlement architecture for AgentReady paid plans.

It is documentation only. It does not add license code, backend, account system, database, CLI activation, GitHub Action validation, or payment integration.

## Principles

- Community adoption must remain local-first.
- Paid features require automatic license activation after payment.
- License validation must be privacy-first.
- OpenAPI files are not uploaded.
- MCP definitions are not uploaded.
- Full reports are not uploaded by default.
- Production secrets must never be transmitted.
- Analysis remains local or inside the customer's CI runner.

## License Lifecycle

```txt
payment completed
-> subscription created
-> organization created
-> entitlement record created
-> license generated
-> activation instructions sent
-> CLI or GitHub Action validates license
-> entitlements cached
-> paid features enabled
```

## Automatic License After Payment

After successful Stripe Checkout:

- create license automatically;
- bind it to customer, organization, subscription, and plan;
- attach entitlement payload;
- set validity window;
- expose activation instructions through success page and email.

No owner intervention should be required for ordinary purchases.

## CLI Activation

Future CLI behavior:

```txt
agentready license activate <activation_token>
```

or another command once implemented.

Expected behavior:

- exchange activation token for a license credential;
- store the credential securely where possible;
- validate entitlement periodically;
- allow Community features without license;
- show actionable errors when paid entitlement is missing.

## GitHub Actions Usage

GitHub Actions should use a secret such as:

```txt
AGENTREADY_LICENSE_KEY
```

Validation should:

- happen in the CI runner;
- send only minimal license metadata;
- avoid uploading OpenAPI or MCP files;
- avoid uploading scan reports by default;
- fail paid-only features gracefully if entitlement is invalid.

## Reasonable Periodic Validation

Validation should balance abuse prevention and developer ergonomics.

Suggested behavior:

- validate on paid feature use;
- cache a positive entitlement for a short period;
- refresh periodically;
- allow a grace window for transient network failures;
- block or degrade paid-only features when the license is revoked or expired.

## Local Cache

Cache should store:

- plan;
- entitlement fields;
- validation timestamp;
- expiration timestamp;
- anonymous or pseudonymous repository identifiers if needed.

Cache should not store:

- OpenAPI contents;
- MCP definitions;
- production secrets;
- full reports by default;
- customer business data beyond what is necessary.

## Offline Behavior

Community features:

- should work offline.

Paid features:

- may work within a cached entitlement grace period;
- should display clear status when offline;
- should fail closed after grace period for paid-only capabilities;
- should never upload source artifacts later without explicit customer action.

## Revocation

Revocation triggers:

- subscription deleted;
- payment failure after grace period;
- refund with access removal;
- abuse prevention;
- customer-requested cancellation;
- compromised license.

Revocation behavior:

- paid features disabled;
- Community features remain available where possible;
- cached entitlement invalidated on next validation;
- CI output explains the entitlement failure.

## Plan Changes

Upgrade:

- entitlement expands automatically;
- CLI and GitHub Action refresh on next validation;
- repository/member/client limits increase.

Downgrade:

- entitlement narrows automatically;
- excess resources become read-only or require cleanup;
- paid features outside the new plan are disabled.

## Quotas

Quotas should be enforced from entitlements:

- repository limit;
- member limit;
- organization limit;
- client workspace limit;
- history retention;
- report branding availability.

Quota checks should be understandable and recoverable.

## Abuse Prevention

Abuse controls may include:

- license key rotation;
- rate limiting license validation;
- pseudonymous repository binding;
- suspicious usage detection;
- revocation process;
- support review for exceptional cases.

Abuse prevention must not require uploading customer API or MCP contents.

## Repository Identity

Repository identifiers should be pseudonymized when possible.

Allowed metadata examples:

- hashed repository remote;
- hashed repository owner/name;
- CI provider;
- package version;
- plan;
- entitlement version;
- feature requested.

Avoid collecting:

- source code;
- OpenAPI files;
- MCP tool definitions;
- full generated reports;
- production secrets;
- raw customer data.

## Minimal Data Sent To License Service

Suggested payload:

```json
{
  "license_key_id": "lic_xxx",
  "agentready_version": "0.1.x",
  "feature": "pull_request_annotations",
  "repository_hash": "hash_xxx",
  "ci_provider": "github_actions"
}
```

Never include:

- OpenAPI file contents;
- MCP tool definitions;
- `agentready.json` by default;
- Markdown reports by default;
- production credentials.

## Non-Goals For This PR

This PR does not implement:

- license endpoint;
- CLI activation;
- GitHub Action license validation;
- entitlement storage;
- usage tracking;
- account system;
- backend;
- database.

## Non-Guarantee

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
