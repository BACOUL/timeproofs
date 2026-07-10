# TODO Next - TimeProofs AgentReady

Active direction:

```txt
AgentReady is the shift-left CI gate for agent-facing contracts.
```

Source of truth:

```txt
docs/agentready/AGENTREADY_MASTER_PLAN.md
```

Core promise:

```txt
Fail the build before unsafe agent-facing APIs or MCP tools are deployed.
```

## Completed Foundation

```txt
1. CLI alpha merged.
2. Commercial bad/fixed fixture CI Gate behavior validated.
3. Rule codes AR001-AR010 stabilized.
4. GitHub Action wrapper added.
5. agentready.json spec v0.1 published and aligned with code.
6. /agentready-ci public page added.
7. Homepage repositioned around AgentReady CI Gate.
8. Self-service commercial and launch architecture documented.
9. CLI public distribution package preparation validated.
10. Versioned GitHub Action preparation validated.
11. Community release workflow prepared.
12. Community + Pro strategy rebaselined.
```

Community public publication remains blocked and has not occurred.

## Immediate Next PR

```txt
release(agentready): resolve Community publication blockers
```

Planned branch:

```txt
release-agentready-community-publication-blockers
```

Purpose:

- resolve npm scope, license, legacy ProofSpec references, publication policy, 2FA/trusted publishing, provenance, and approval path;
- keep Community publication, tag creation, GitHub Release creation, and Marketplace listing blocked;
- preserve current scoring, rule codes, CLI exits, GitHub Action outputs, and `agentready.json` v0.1 compatibility.

The next PR must not publish the package without separate explicit authorization.

## Execution Plan

The locked execution plan is:

```txt
docs/agentready/SELF_SERVICE_EXECUTION_PLAN.md
```

That document is the authority for the expected PR order. If GitHub assigns a different PR number than expected, the title and order remain the authority.

## Keep Stable

- scoring thresholds unless a fixture-backed bug is proven;
- rule codes AR001-AR010;
- `agentready.json` v0.1 compatibility;
- CLI exit behavior;
- GitHub Action inputs and outputs;
- bad/fixed commercial CI Gate decisions:
  - Refund bad FAIL / fixed PASS
  - Email bad FAIL / fixed PASS
  - Files bad FAIL / fixed PASS

## Do Not Build In The Next PR

- dashboard
- production Stripe/payment flow
- backend
- account system
- license service
- database
- runtime firewall
- old proof-of-existence product
- public HTML changes
- paid feature claims
- Pro implementation
- npm package publication
- GitHub release tag creation
- Marketplace listing

## Commercial Guardrails

No manual review offer, request-by-email purchase flow, quote workflow, manual payment path, consulting-first model, mandatory Contact Sales path, or Enterprise plan should be presented as the active launch direction.

No paid plan should be displayed as available until its features, entitlements, billing flow, support model, legal pages, and launch QA are ready.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
