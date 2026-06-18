# Security Policy — TimeProofs

TimeProofs is a privacy-first traceability system for AI Action Files and proof bundles.
This policy explains how security reports are handled and summarizes the target security model for Action File sealing, public-key verification, and key rotation.

---

## Supported versions

| Version | Status | Security fixes |
|----------|--------|----------------|
| Action File v1 design | In development | Active security model under design |
| Seal API v1 design / beta | In development | Active security model under design |
| v0.2 / Proof Bundle | Public beta | Active monitored surface |
| < v0.1 | Experimental | Not supported |

---

## Reporting a vulnerability

If you believe you discovered a security or privacy vulnerability, report it privately and responsibly.

**Contact:**

- Email: [security@timeproofs.io](mailto:security@timeproofs.io)
- PGP key: [https://timeproofs.io/pgp.txt](https://timeproofs.io/pgp.txt)

Do not publicly disclose issues before coordinated remediation and acknowledgement.

Target response process:

1. Acknowledge the report within 72 hours.
2. Provide an initial assessment within 7 days when enough detail is available.
3. Publish a security advisory once mitigations are live, if the issue affects users.

---

## Scope

This policy covers:

- Action File creation, hashing, sealing, and verification flows.
- Seal payload signing and public-key verification logic.
- Public key registry and key status guidance.
- Existing API endpoints such as `/api/timestamp`, `/api/verify`, and `/api/seal` where deployed.
- Frontend verification pages and static site pages.
- Self-host server code where maintained in this repository.
- Open-source code under `github.com/BACOUL/timeproofs`.

Out of scope:

- Customer-created Action File content not controlled by TimeProofs.
- Local integrations, forks, or modified deployments not maintained by TimeProofs.
- Third-party infrastructure outside TimeProofs control.
- Business decisions, AI outputs, or workflow actions made by customer systems.

---

## Action File security model

TimeProofs Action File v1 follows a privacy-first, hash-only default model:

- the company or integrator creates the Action File;
- sensitive action content should stay in the customer environment;
- the hashable Action File payload is canonicalized locally;
- the canonical payload hash is calculated before sealing;
- TimeProofs receives only the payload hash and minimal sealing metadata by default;
- the final Action File can be stored wherever the company chooses.

The canonicalization profile is documented in `docs/canonicalization-profile.md`.
The hash model and anti-circular hash rule are documented in `docs/hash-model.md`.

---

## Local hashing and canonical payload hashes

The security model depends on deterministic hashing.

Core rules:

1. Build the hashable Action File payload.
2. Exclude mutable or circular fields such as Seal data, signature, proof bundle, verifier result, local annotations, and payload hash itself.
3. Canonicalize the remaining payload with the documented deterministic JSON profile.
4. Compute the SHA-256 payload hash.
5. Send only this payload hash and minimal non-sensitive metadata for sealing by default.

This prevents the file from hashing its own hash or its own Seal.

---

## TimeProofs Seal model

The TimeProofs Seal binds a canonical payload hash to a TimeProofs-issued signature.

A Seal payload should contain:

- `seal_version`
- `seal_id`
- `payload_hash`
- `format`
- `action_id`
- `sealed_at`
- `public_key_id`
- `signature_algorithm`

TimeProofs signs the Seal payload, not raw prompts, AI outputs, documents, API tokens, credentials, or other sensitive action content.

---

## Asymmetric signature model

The target Action File Seal model uses asymmetric signatures for public verification.

Preferred algorithm:

```text
Ed25519
```

Target principles:

- TimeProofs signs a Seal payload, not raw sensitive action content.
- Every Seal includes a stable `public_key_id`.
- The private key is used only by the TimeProofs issuer.
- Public keys are published for independent verification.
- Retired keys remain available for historical verification.
- Compromised keys must remain listed with clear status and guidance.

The full design is documented in `docs/signature-model.md`.

---

## Public key registry and rotation

The TimeProofs public key registry is published at:

```text
/.well-known/timeproofs-keys.json
```

Human-readable guidance is published at:

```text
/keys.html
```

Registry rules:

- public keys are published for independent verification only;
- private keys must never appear in the registry;
- each `public_key_id` must be stable and must never be reused for different key material;
- active keys are used for current Seals;
- retired keys remain published for historical verification;
- compromised keys remain listed with a clear incident state and guidance;
- placeholder keys must be clearly marked as not production-ready.

---

## Private key policy

Private keys must never be committed to this repository.

Rules:

- production private keys must be stored only in environment variables, secret managers, or dedicated key-management infrastructure;
- logs must never print private key material;
- CI artifacts must never contain private key material;
- demo keys, if ever added, must be clearly marked as unsafe and must never be used in production;
- production signing must fail closed if key material is missing or invalid.

---

## Verifier behavior

A verifier should:

1. Parse the Action File locally.
2. Rebuild the hashable payload according to the canonicalization profile.
3. Recompute the canonical payload hash.
4. Compare that hash with the Seal payload hash.
5. Resolve the referenced `public_key_id` from the public key registry or a trusted snapshot.
6. Verify the Seal signature.
7. Return a clear status.

Expected statuses include:

- `valid`
- `modified_payload`
- `invalid_signature`
- `unknown_key`
- `retired_key`
- `compromised_key`
- `unsupported_algorithm`
- `unsupported_format`

Verification should not require uploading sensitive action content by default.

---

## Threat model

TimeProofs helps protect against:

- Action File modification after sealing;
- mismatch between a Seal and a changed payload;
- signature forgery attempts;
- silent key replacement when key IDs and registry statuses are preserved;
- accidental over-sharing when privacy linting and hash-only defaults are followed.

TimeProofs does not protect against:

- incorrect AI outputs or hallucinations;
- unlawful, unauthorized, or invalid business actions;
- incomplete or misleading evidence created by the customer;
- compromised customer devices, CRM, storage, or access controls;
- third-party acceptance risk.

---

## No blockchain by default

TimeProofs V1 does not require blockchain anchoring by default.

The primary trust model is:

```text
canonical payload hash → TimeProofs Seal → public key verification
```

Blockchain or transparency-log anchoring may be explored later, but it must not be presented as active until implemented.

---

## Verification limits

TimeProofs verification can prove integrity and signature consistency.

It does not prove:

- that the AI was correct;
- that the action was lawful;
- that the business decision was valid;
- that all relevant facts are present;
- that TimeProofs reviewed the underlying sensitive content;
- that a court, regulator, insurer, bank, auditor, or partner will accept the record;
- that the system provides full AI Act, GDPR, or other regulatory compliance.

Use careful wording: TimeProofs provides a technical traceability and verification artifact, not absolute legal proof.

---

## Disclosure process

1. Submit your report to [security@timeproofs.io](mailto:security@timeproofs.io).
2. Include:
   - description and steps to reproduce;
   - affected endpoint or component;
   - potential impact and severity;
   - whether sensitive content could be exposed.
3. Optionally encrypt with the [PGP key](https://timeproofs.io/pgp.txt).

---

## Policy references

- Canonical security policy: [https://timeproofs.io/.well-known/security.txt](https://timeproofs.io/.well-known/security.txt)
- Public key registry: [https://timeproofs.io/.well-known/timeproofs-keys.json](https://timeproofs.io/.well-known/timeproofs-keys.json)
- Public key guidance: [https://timeproofs.io/keys.html](https://timeproofs.io/keys.html)
- Legal terms: [https://timeproofs.io/legal.html](https://timeproofs.io/legal.html)
- Privacy policy: [https://timeproofs.io/privacy.html](https://timeproofs.io/privacy.html)
- Signature model: `docs/signature-model.md`
- Hash model: `docs/hash-model.md`
- Canonicalization profile: `docs/canonicalization-profile.md`

---

© 2026 TimeProofs — La boîte noire des actions IA.
