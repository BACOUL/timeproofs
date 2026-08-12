# TimeProofs — Current State

Last updated: 2026-08-13
Branch: `relaunch/invariant-engine`

## Where the project is

**Company:** Cross-Protocol Consistency Infrastructure for agentic transactions.

**Constitution-level product thesis:** `docs/product/PRODUCT_THESIS.md`.

> **TimeProofs is the transaction integrity layer between what autonomous agents were authorized to do and what external systems actually executed.**

**Strategic primitives:** VERIFY → ENFORCE → RESOLVE.

Canonical company documents:
- `docs/startup/BUSINESS_ARCHITECTURE.md`
- `docs/startup/COMPANY_COMPLETENESS_AUDIT.md`
- `docs/startup/COMPANY_GAP_REGISTER.md`
- `docs/startup/METERING_BILLING_ARCHITECTURE.md`
- `docs/product/PACK_GOVERNANCE_AND_COMPATIBILITY.md`
- `docs/startup/INCIDENT_OBSERVABILITY_CONTINUITY.md`
- `docs/startup/PRIVACY_TRUST_ENTERPRISE_BOUNDARY.md`
- `docs/startup/PARTNERS_IP_MOAT_LOOP.md`
- `docs/product/M9_WEBSITE_DOCS_VISION.md`

**Current milestone:** M8 — local-first runtime enforcement: ACTIVE.

**Pre-M8 World-Class Readiness Gate:** COMPLETE / GREEN.

**Company architecture / anti-omission audit:** COMPLETE at design level. Commercial proof remains open.

## Completed milestones

- M0 — product constitution and operating system: COMPLETE
- M1 — UCP/AP2 normative composition audit: COMPLETE
- M2 — canonical transaction model: COMPLETE
- M2.1 — foundation hardening: COMPLETE
- M3 — UCP/AP2 Invariant Pack v0.1 specification: COMPLETE
- M4 — fixture corpus and regression contract: COMPLETE
- M5 — deterministic Verify Engine: COMPLETE
- M6 — real UCP/AP2 adapters + local SDK/CLI: COMPLETE
- M7 — customer-facing CI integration and package contract: COMPLETE
- pre-M8 World-Class Readiness Gate: COMPLETE / GREEN
- full startup/company completeness audit: COMPLETE
- anti-omission operating architecture: DOCUMENTED / CANONICAL

## Current executable product

Implemented production path:
- deterministic core and canonicalization;
- real UCP Checkout adapter;
- real AP2 PaymentMandate adapter;
- JS SDK `verifyTransaction()`;
- JS SDK `enforceTransaction()` initial M8 implementation;
- CLI `timeproofs verify`;
- customer GitHub Action;
- safe CI result projection;
- clean-room TimeProofs package build by allowlist.

Supported initial profiles:
- UCP `2026-04-08` Checkout (`dev.ucp.shopping.checkout`)
- AP2 PaymentMandate VCT `mandate.payment.1`

## Product thesis boundary

The UCP↔AP2 pack is a beachhead, not the company boundary.

TimeProofs evolves around cross-system transaction integrity:
1. **VERIFY** — Is it valid?
2. **ENFORCE** — Can it run?
3. **RESOLVE** — Did it happen?

Priority boundary: `AUTHORIZED REALITY ↔ EXECUTED REALITY`.

Outcome rule:
> **Never retry an unknown side effect. Resolve it first.**

## Business architecture baseline

Current operating hypothesis, not published/validated pricing:
- Community/local: €0;
- Production: €99/month, modeling 10,000 protected VERIFY/ENFORCE transactions included, then ~€0.01/protected transaction;
- RESOLVE: modeling envelope ~€0.03–€0.10/provider-specific resolution;
- Business: €499/month + usage;
- Enterprise: €15k–€25k annual minimum + usage.

Primary distribution baseline:
GitHub → npm → technical docs → CI/GitHub Action → protocol communities → provider/platform integrations → B2B2Developer partnerships.

## Anti-omission company architecture now explicit

The repository now contains explicit operating designs for:
- usage metering/billing and dedupe;
- pack trust lifecycle and compatibility/deprecation;
- incident severity/rollback/false-block handling;
- runtime observability;
- solo-founder business continuity;
- privacy lifecycle and enterprise trust boundary;
- abuse/adversarial customer controls;
- enterprise procurement boundaries;
- liability baseline;
- partner economics;
- IP/trademark/licensing gate;
- moat telemetry loop that favors sanitized reusable knowledge over raw customer data custody;
- M9 website/docs design direction.

These designs do not pretend paid-production implementation exists before it is needed. `COMPANY_GAP_REGISTER.md` assigns each item to NOW/M8/M9/PAID/ENTERPRISE/M10/SCALE/RELEASE.

## Validation proof

### Strengthened M8 full matrix
`TimeProofs Core Regression` run `31624413675`: Ubuntu/macOS/Windows × Node 22/24 — **6/6 success**.

The run executes:
- M4 fixtures;
- M6 adapter/SDK/CLI tests;
- M8 enforcement policy/SDK tests;
- security tests;
- 250-family generated property regression;
- CLI/error contract;
- package clean-room smoke requiring VERIFY + ENFORCE behavior.

### Customer Action
PASS/BLOCK/UNKNOWN customer contract run `31591960176` — success.

### CodeQL
Run `31592599707` — success.

### Performance
1,000-line-item baseline:
- p50 `3.668 ms`
- p95 `6.004 ms`
- max `6.805 ms`
- RSS `70.3 MiB`

Provisional algorithmic guard: 100 ms p95; run `31618899028` — success. This is not a commercial SLA.

## M8 active design

Canonical design: `docs/product/M8_RUNTIME_ENFORCEMENT_DESIGN.md`.

Frozen boundaries:
- verification remains PASS/WARN/BLOCK/UNKNOWN;
- enforcement returns ALLOW/DENY/ERROR;
- default financial policy: PASS→ALLOW, WARN→ALLOW, BLOCK→DENY, UNKNOWN→DENY;
- runtime error never silently ALLOWs;
- fail-open must be explicit/audit-visible;
- TimeProofs does not execute/custody the caller's side effect;
- no generic MCP/A2A gateway;
- pinned versions, no silent `latest` mutation;
- local-first, no mandatory cloud dependency.

Current M8 implementation includes:
- enforcement result schema;
- pure policy evaluator;
- `enforceTransaction()` SDK;
- fail-closed default and explicit fail-open override;
- regression tests;
- enforcement module/schema in package allowlist;
- strengthened clean-room package verification;
- green 6-environment full matrix.

Remaining before M8 closure:
- enforcement-specific hostile/policy mutation/property cases;
- explicit VERIFY-vs-ENFORCE overhead measurement;
- final decision on SDK-first versus CLI/Action enforcement surface;
- rollback/migration/runtime-evidence documentation tied to implemented behavior.

## Commercial/company gaps still requiring real-world proof

Design coverage is no longer the main gap. Evidence is.

Highest-risk unresolved facts:
1. willingness-to-pay;
2. exact economic buyer;
3. repeatable first provider execution pack (approved mandate ↔ PSP/network outcome);
4. distribution pull;
5. Resolve unit economics;
6. first meaningful PSP/platform partnership;
7. exact open-source/commercial split before broad public release.

## Lifecycle gates

### M9/public relaunch
- archive/remove/redirect AgentReady public surfaces;
- finalize website/docs against `M9_WEBSITE_DOCS_VISION.md`;
- freeze package name, public support/deprecation policy and open/commercial split;
- complete IP/name/license checks.

### Paid production
- implement metering ledger/billing semantics;
- legal/liability/DPA/trust package;
- spend controls and abuse controls for managed surfaces;
- operational incident/support model.

### Release
- Trusted Publishing/OIDC;
- provenance;
- SBOM/attestation;
- immutable release and registry-install proof.

### M10/scale
No major managed-cloud spend until the commercial validation gate is materially satisfied.

## Known non-claims

TimeProofs does not yet claim:
- full SD-JWT signature/key-binding verification;
- merchant authorization JWS verification;
- arbitrary AP2 hash algorithms;
- provider/network execution evidence;
- authoritative outcome resolution;
- hosted enforcement/SLA;
- product-market fit;
- validated willingness-to-pay or published pricing.

Missing proof remains UNKNOWN.

## One-line status

> M0–M7 and the pre-M8 quality gate are complete; the company architecture now includes explicit anti-omission policies for billing, packs, incidents, privacy, trust, enterprise, IP, continuity and moat learning; M8 enforcement is active with a green 6-environment matrix, while commercial proof and the first authorized↔executed provider boundary remain the highest-value unresolved work.
