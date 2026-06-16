# Security Policy — TimeProofs

TimeProofs is a privacy-first traceability system for AI Action Files and proof bundles.
This document defines how to responsibly report and coordinate security vulnerabilities and summarizes the target security model for Action File sealing.

---

## Supported Versions

| Version | Status | Security Fixes |
|----------|--------|----------------|
| v0.2 / Proof Bundle | Public beta | ✅ Active (monitored) |
| Action File v1 design | In development | ✅ Security model under active design |
| < v0.1 | Experimental | ❌ Not supported |

---

## Reporting a Vulnerability

If you believe you’ve discovered a security or privacy vulnerability, please report it privately and responsibly.

**Contact:**
- 📧 Email: [security@timeproofs.io](mailto:security@timeproofs.io)
- 🔑 PGP Key: [https://timeproofs.io/pgp.txt](https://timeproofs.io/pgp.txt)

**Do not** publicly disclose issues before coordinated remediation and acknowledgment.

We commit to:
1. Acknowledge your report within **72 hours**.
2. Provide an initial assessment within **7 days**.
3. Publish a security advisory once mitigations are live.

---

## Scope

This policy covers:
- Existing API endpoints (`/api/timestamp`, `/api/verify`)
- Future Action File sealing and verification flows
- Frontend site (https://timeproofs.io)
- Cloudflare Workers backend & KV storage where used
- Self-host server code where maintained in this repository
- Open-source repositories under `github.com/BACOUL` or future TimeProofs organization repositories

Out of scope:
- Third-party dependencies (handled via dependency monitoring where available)
- Local integrations or forks not maintained by TimeProofs
- Customer-created Action File content not controlled by TimeProofs

---

## Action File Security Model

TimeProofs Action File v1 follows a privacy-first hash-only default model:

- the company or integrator creates the Action File;
- sensitive action content should stay in the customer environment;
- the hashable Action File payload is canonicalized locally;
- TimeProofs should receive only a payload hash and minimal sealing metadata by default;
- the final Action File can be stored wherever the company chooses.

The canonicalization profile is documented in `docs/canonicalization-profile.md`.
The hash model and anti-circular hash rule are documented in `docs/hash-model.md`.

---

## Asymmetric Signature Model

The target Action File seal model uses asymmetric signatures for public verification.

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

## Public Key Registry

The future TimeProofs public key registry is published at:

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
- retired keys remain published for historical verification;
- compromised keys remain listed with a clear incident state and guidance;
- placeholder keys must be clearly marked as not production-ready.

Current status: design placeholder until production signing is implemented.

---

## Private Key Policy

Private keys must never be committed to this repository.

Rules:

- production private keys must be stored only in environment variables, secret managers, or dedicated key management infrastructure;
- logs must never print private key material;
- CI artifacts must never contain private key material;
- demo keys, if ever added, must be clearly marked as unsafe and must never be used in production;
- production signing must fail closed if key material is missing or invalid.

---

## Verification Limits

TimeProofs verification can prove integrity and signature consistency.

It does not prove:

- that the AI was correct;
- that the action was lawful;
- that the business decision was valid;
- that all relevant facts are present;
- that TimeProofs reviewed the underlying sensitive content;
- that a court, regulator, insurer, bank, auditor, or partner will accept the record.

Use careful wording: TimeProofs provides a technical traceability and verification artifact, not absolute legal proof.

---

## Disclosure Process

1. Submit your report to [security@timeproofs.io](mailto:security@timeproofs.io)
2. Include:
   - Description and steps to reproduce
   - Affected endpoint or component
   - Potential impact and severity
3. Optionally encrypt with our [PGP key](https://timeproofs.io/pgp.txt)

---

## Hall of Thanks

Researchers who help secure TimeProofs will be acknowledged on:
🔗 [https://timeproofs.io/security](https://timeproofs.io/security)

---

## Policy References

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
