# Automated Purchase And Billing Flow

## Purpose

This document describes the target zero-touch purchase, billing, subscription, and license activation flow for AgentReady.

It is documentation only. It does not add Stripe, backend, database, accounts, licenses, cookies, or billing code.

If this document conflicts with `AGENTREADY_MASTER_PLAN.md`, the master plan prevails.

The initial paid launch target is Pro only. Community remains free and accountless. Team and Agency are `POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT`.

## Target Customer Flow

```txt
Stripe payment
-> customer/account record
-> subscription record
-> Community/Pro entitlement
-> cryptographically random AgentReady license key
-> repository registration
-> transactional email
```

Pro V0.1 creates no organization. Organizations, members, workspaces, and shared governance are reserved for Team and are `POST_REVENUE VISION — NOT AN INITIAL ENTITLEMENT`.

## Future Pages

Future public or authenticated pages:

- `/pricing.html`
- `/checkout-success.html`
- `/checkout-cancelled.html`
- `/account/`
- `/billing/`
- `/help/`
- `/status.html`

Do not create these pages in this PR.

## Pricing Page

The pricing page should:

- show Community and Pro for the initial launch when Pro is implemented;
- keep Team and Agency post-revenue and not purchasable at launch;
- state that paid prices are HT / excluding tax;
- state that taxes are calculated according to the applicable customer situation;
- link to terms, privacy, refund policy, and cookie policy;
- avoid mandatory contact sales for Community or Pro;
- avoid request-by-email purchase flows;
- make Community self-service and free.

## Stripe Checkout

Stripe Checkout should collect:

- plan;
- billing interval;
- customer email;
- company name;
- billing address;
- country;
- tax/VAT information where applicable;
- terms acceptance;
- payment method.

Checkout should redirect to:

- `/checkout-success.html` on success;
- `/checkout-cancelled.html` on cancellation.

## Expected Stripe Events

The backend must handle at minimum:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.paid`
- `invoice.payment_failed`

Webhook handling requirements:

- verify Stripe signatures;
- process events idempotently;
- persist the Stripe event id;
- avoid double license creation;
- handle out-of-order subscription updates;
- log failures without exposing secrets.

## Account, Subscription, And Repository Registration

After a successful checkout:

1. Create or find the customer.
2. Create the account identity.
3. Create the subscription record.
4. Create the Community/Pro entitlement.
5. Generate a cryptographically random AgentReady license key.
6. Register allowed repositories after explicit customer action.
7. Send transactional email.

Pro V0.1 does not create an organization.

For future Team and Agency:

- organization should be created automatically;
- owner should be assigned automatically;
- repository and member limits should be derived from entitlements.

These Team and Agency flows are post-revenue and must not block the Community + Pro launch.

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

## License Generation

After payment:

- generate a license id and cryptographically random secret;
- store only the key hash server-side;
- associate the hashed license with customer, account, subscription, plan, entitlements, and registered repositories;
- issue a signed entitlement token;
- expose activation instructions;
- send email with safe activation guidance;
- never email long-lived secrets in a way that violates security requirements if a safer token exchange exists.

## Installation And Activation

The success page and email should show:

```txt
agentready login
agentready license activate <token>
```

or another future CLI activation command once implemented.

GitHub Actions setup should show:

```txt
AGENTREADY_LICENSE_KEY
```

as a repository secret for Pro V0.1.

The exact command names must match the implemented CLI before being published.

## Renewals

On renewal:

- Stripe charges subscription;
- `invoice.paid` confirms paid renewal;
- entitlement validity extends automatically;
- license remains active;
- invoice is available in billing portal.

## Failed Payment

On `invoice.payment_failed`:

- notify customer automatically;
- keep a short grace period if product policy allows it;
- display billing action in account portal;
- downgrade or suspend paid-only entitlements after grace period;
- keep Community access available where possible.

## Plan Changes

Upgrade:

- update subscription;
- apply proration according to Stripe configuration;
- update entitlement record;
- update license cache on next validation;
- send confirmation email.

Downgrade:

- update subscription at renewal or immediately, depending on product policy;
- reduce repository/member/client limits;
- make excess resources read-only or require cleanup;
- send confirmation email.

## Cancellation

Cancellation should be self-service through Stripe Customer Portal.

After cancellation:

- subscription remains active until period end unless immediate cancellation is chosen;
- paid entitlement expires at the correct date;
- Community behavior remains available when possible;
- account data follows the retention and deletion policy.

## Stripe Customer Portal

Customers should be able to self-serve:

- payment method update;
- invoice download;
- billing address update;
- tax id update where supported;
- plan change where supported;
- subscription cancellation.

## Invoices

Invoices should be available through Stripe Customer Portal and transactional email.

Invoices must support:

- company name;
- billing address;
- VAT/tax id when applicable;
- tax calculation according to customer situation;
- downloadable PDF or Stripe-hosted invoice.

## Refunds

Refunds should be exceptional and handled according to the published refund policy.

The product should document:

- refund eligibility;
- timing;
- how to request a refund;
- when automatic refunds apply;
- when manual review is required for payment exceptions.

Refund handling is an exception process, not the primary purchase flow.

## Account Deletion

The account area should support or clearly request:

- deletion request;
- data export if applicable;
- deletion confirmation;
- license revocation;
- subscription cancellation handling;
- retention periods for invoices and legal records.

## Non-Goals For This PR

This PR does not implement:

- Stripe Checkout;
- Stripe webhook handlers;
- license generation;
- account creation;
- organization creation;
- transactional email;
- customer portal;
- billing UI;
- backend;
- database.

## Non-Guarantee

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
