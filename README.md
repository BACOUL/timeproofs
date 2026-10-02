# TimeProofs V2

**Autonomous agents act. TimeProofs determines what must be proven.**

A deterministic proof orchestration reference: intended action → versioned profile → requirements → resolver → missing evidence requests → registered collectors → verification → portable Proof Case.

## Canonical language

English is the canonical language of TimeProofs V2. The public site defaults to English at `/`, regardless of browser language. Documentation, profiles, schemas, API/OpenAPI, SDK, CLI, examples, public tests, security, pricing and integration labels are maintained in English. Technical identifiers and statuses remain English in every future locale. No French translation or language negotiation is shipped. See [language policy](docs/language.md).

## Run the complete reference

Node.js 22+; no runtime dependencies or paid API required.

```sh
git clone --branch timeproofs-v2 https://github.com/BACOUL/timeproofs.git
cd timeproofs
npm run check
npm run demo
npm start
# http://localhost:3000/demo
```

The signed sandbox purchase starts with Authority / Identity / Offer SATISFIED and Execution / Outcome MISSING. The resolver requests and receives two fixture artifacts, verifies issuer signatures and scope, binds the processor transaction to the merchant outcome, and returns 5/5 SATISFIED. No purchase, money transfer or external merchant call occurs. The cryptographic verification and deterministic decisions are real; the business events are fixtures.

## SDK from source

The npm registry release is **not published**. From the cloned repository, build a package and install it into your application:

```sh
npm pack
# In your application directory, replace the path with your clone location:
npm install /absolute/path/to/timeproofs/timeproofs-sdk-2.0.0-alpha.1.tgz
```

```js
import { EvidenceResolver, ProofCaseVerifier } from '@timeproofs/sdk';
const resolver = new EvidenceResolver({ policy: independentlyTrustedPolicy,
  collectors: { execution: collectProcessorEvidence, outcome: collectMerchantEvidence } });
const { evidence } = await resolver.collect({ profile: 'authorized_purchase/v1', action, evidence: initialEvidence });
const proofCase = resolver.createCase({ profile: 'authorized_purchase/v1', action, evidence });
const verification = new ProofCaseVerifier({ policy: independentlyTrustedPolicy }).verify(proofCase);
```

TypeScript declarations are included. A collector is an explicitly registered asynchronous function returning a signed artifact. It is not an arbitrary URL supplied by an untrusted agent.

## Offline CLI

```sh
node bin/timeproofs.js profiles
node bin/timeproofs.js demo
node examples/purchase.js --export
node bin/timeproofs.js verify purchase-case.json examples/demo-policy.json
```

Use a policy obtained independently of the case. Never trust issuer keys from an uploaded case. Public fixture policy is at `examples/demo-policy.json`; production requires your own pinned issuers.

## HTTP / self-host

```sh
TRUST_POLICY_FILE=/secure/trusted-policy.json \
TIMEPROOFS_API_KEY=<random-secret-at-least-32-characters> \
TIMEPROOFS_DATA_DIR=/persistent/timeproofs \
npm start
```

The private API is disabled unless a trusted policy is configured. Create, append and retrieve cases via the bearer-authenticated API. Atomic disk writes and per-case serialization support one process, one tenant. Configure a persistent volume. This storage implementation is not suitable for serverless private cases or multiple instances.

- `POST /v1/resolve`
- `GET /v1/profiles`
- `GET /v1/profiles/:name/:version`
- `POST /v1/cases`
- `POST /v1/cases/:id/evidence`
- `GET /v1/cases/:id`
- `POST /v1/verify` — public sandbox policy
- `POST /v1/verify-private` — private configured policy
- `POST /v1/demo` — `{ "stage": 0 | 1 | 2 }`

[Proof Case JSON Schema](public/schemas/proof-case.json) · [OpenAPI 3.1](public/openapi.json) · [Architecture](docs/architecture.md) · [Gate evidence](docs/gates.md) · [Threat model](docs/security.md) · [Standards audit](docs/standards.md) · [Economics hypotheses](docs/economics.md).

## Implementation boundary

`authorized_purchase/v1` is a tested alpha reference. `fund_transfer/v1`, `contract_acceptance/v1`, `data_deletion/v1`, `agent_delegation/v1` are versioned drafts and resolve to UNSUPPORTED. JWT/JWS Ed25519 and a strict VC-JWT 1.1 subset are tested. MCP, A2A, AP2, SCITT, x401 and Agent Action Receipts are PLANNED, not integrated.

SATISFIED means all declared requirements pass **under the verifier's explicit trust policy**. It does not mean the content is true, the action is legal or compliant, or a court will accept the dossier. Signatures authenticate claims, not events. The profile does not prove that undisclosed contradictory evidence does not exist.

## Legacy

`timeproofs-v1` remains intact at `696bbf21e987c226456636c2903a8de977aca845`. This branch descends from that commit, replaces its active product tree, and preserves all ancestry. The default `timeproofs` branch and AgentReady are unchanged. No legacy Seal, Action File or proprietary receipt is the V2 conceptual model.

## Release status

Reference alpha only. No billing, managed SLA, independently validated customer demand or production readiness claim. GitHub Actions is configured; local check results do not imply external CI has run. A separate Vercel preview is deployed from `timeproofs-v2`; it is not the production website. See [verification record](docs/verification.md) for tested capabilities and outstanding acceptance checks. Production promotion, domain and DNS changes are outside this release.

## Alpha acceptance

See [the alpha readiness report](docs/readiness.md) for the mobile matrix, real downloaded-file round-trip, tampering checks, installation evidence and remaining production boundaries.
