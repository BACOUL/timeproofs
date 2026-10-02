# Threat model and release controls

## Assets and trust boundaries

Assets: action scope, original evidence, requirement results, private Proof Cases, issuer keys and API credentials. Trust boundaries: submitting agent → resolver; external issuer → signed artifact; registered collector → external system; verifier → independently pinned public-key policy; private API → filesystem.

The engine does not trust case-supplied policies, embedded JOSE keys, arbitrary key URLs or claimed SATISFIED fields. It does trust explicitly configured issuers within their allowed roles. Issuer dishonesty, a compromised collector system or a poorly specified proof profile can produce a misleading satisfied case despite valid cryptography.

## Implemented controls

- Ed25519 signature verification over original compact JWS bytes; algorithm allowlist, exact base64url signature length and encoding.
- Pinned issuer/kid and role constraints, exact audience/sub, required jti, iat/nbf/exp, activation/retirement and local revocation.
- Action digest, amount, currency, agent, principal, merchant and offer binding.
- Transaction-id linkage across processor and merchant artifacts.
- Duplicate id and issuer-jti detection inside each case.
- Consistent failure precedence; no silent selection between contradictory valid claims.
- Verifier recomputation of all recorded decision fields except time, with evaluation-time sanity check.
- No arbitrary network fetch or dynamic code; registered callbacks only.
- Bearer API secrets of at least 32 characters, timing-safe comparison, private API disabled unless configured.
- 256 KiB body limit, 100 evidence records, JWT size limit, process-local 60 requests/minute per socket address.
- Atomic private file writes, restrictive permissions and per-case serialization.
- Security response headers, external scripts only, no inline-script allowance in CSP.
- Public fixture-only demo, no private fixture signing keys committed.
- Adversarial/conformance tests and Node 22/24 CI configuration.

## Key management, rotation and revocation

Issuer private keys never belong in TimeProofs source or uploaded cases. Configure independently trusted public JWKs. Rotation: add a new key with a new kid and role constraints, specify activation, retire the old key with notAfter, retain it only where your historical verification policy requires it. Compromise: set revoked true. Current verifier always rejects revoked keys. There is no remote revocation fetch, OCSP, VC status-list or KMS integration in this alpha.

There is no platform signing key for the case envelope. A dossier is a container of original external artifacts, not a TimeProofs receipt. Trust-policy and profile fingerprints identify the decision inputs; they do not establish external trust by themselves.

## Explicit limitations

- Signed claims can be false. No claim of truth, legal authority, compliance or legal admissibility.
- Complete relative to provided profile and supplied evidence, not the external evidence universe. Omissions cannot be detected without a committed manifest/source registry.
- Same exact action can be replayed into another case. Production uniqueness/action execution registry is not implemented.
- No aggregate spending control, real-world payment, payment-network settlement finality or universal VC support.
- Collector callbacks are trusted application code; production callbacks must enforce consent, timeouts, retries and source authorization. This reference does not provide a managed collection network.
- JSON objects are interpreted by Node JSON.parse. Duplicate-member detection at raw JSON ingestion and cross-runtime canonicalization conformance are pending; do not claim cross-language cryptographic portability of normalized claims.
- No multi-tenant service, multi-process write lock, distributed rate limit, encryption-at-rest service, backup job or retention scheduler.
- Public verifier does not persist uploads in application storage, but host/platform logs and transport metadata remain subject to host configuration.
- Rate limiting is process-local and based on socket address. Shared serverless instances need an authenticated distributed quota system.
- Demo fixtures have a fixed validity window, ending 4 September 2027. Regenerate fixtures and publish changed demo policy atomically before expiry; regeneration never rotates real customer keys.

## Staging → production gate (pending)

1. Deploy sandbox staging after hosting authorization; smoke health, all pages and three demo stages.
2. Verify Node runtime, bundled fixture availability and CSP in deployed environment.
3. Add proper persistent storage, tenant authentication/authorization and distributed rate limiting before enabling a managed private API.
4. Establish secrets/KMS policy, key revocation procedures, backup/restore exercise, retention and deletion procedures.
5. Pin immutable profiles and conformance release vectors; external protocol conformance only after actual integration tests.
6. Establish monitoring for health, error rate, latency, collection failures and quota abuse; never log tokens or raw sensitive evidence.
7. Outside-developer reproduction and a real issuer integration; paid pilot acceptance before production SLA or billing.

No production-readiness claim is made. A separate public sandbox preview is deployed. See the verification record for the exact tested preview and remaining acceptance checks. Production domain and DNS are unchanged.

## Imported case validation

An import must include exactly version, id, profile, action, evidence and resolution. Missing envelope fields or malformed nested evidence are INVALID. Missing mandatory purchase action fields are INVALID. Removing an artifact from an already recorded SATISFIED case without recomputing the recorded resolution is INVALID. A newly resolved case with a genuinely missing artifact is INCOMPLETE. Changing signed content invalidates its signature; changing action scope invalidates the action binding.

The case id is a local label, not a cryptographically signed identifier. Original issuer artifacts bind to the action, not to the case label. Cross-case replay of the same action remains an explicit limitation. No signature is added to the case envelope.
