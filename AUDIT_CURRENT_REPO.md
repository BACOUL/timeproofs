# Current Repository Audit

Status: repository audit before product, website, API, SDK, or architecture changes
Base branch: `timeproofs-v1`
Audit date: 2026-06-15
Product source of truth: `PRODUCT_STRATEGY.md`

## Audit Purpose

This document maps the current repository before changing product code, website copy, API behavior, SDK behavior, or architecture.

The product positioning remains:

**TimeProofs = the black box for AI actions.**

The audit is intentionally documentation-only. It identifies what can be reused safely for the TimeProofs AI Action File direction and what should wait for later PRs.

## High-Level Repository Shape

The repository currently contains:

- A static marketing and documentation website made of standalone HTML pages.
- A v0.2 stateless API worker in `api-v02/worker.js`.
- A self-hosted stateless server in `selfhost/server.js`.
- JavaScript SDK helpers in `sdk/`.
- CLI and examples for `.tproof.json` proof bundles.
- OpenAPI, ProofSpec, JSON schemas, release manifests, privacy, security, legal, and governance docs.
- Product strategy and roadmap documents for the AI Action File repositioning.

The current implementation is still centered on proof-of-existence and `.tproof.json` proof bundles. The new direction should not break that existing model while introducing TimeProofs Action File v1 later.

## 1. Existing Pages

### Static HTML Pages

| Page | Current role | Reuse for AI Action File repositioning | Later wording update needed | Do not modify yet |
| --- | --- | --- | --- | --- |
| `index.html` | Main homepage. Current message is `Freeze before sending` and general timestamp/integrity proof. | Strong candidate for the future AI Action File homepage repositioning. | Yes, later in P004. Needs black-box-for-AI-actions language and AI Action File framing. | Yes. Do not change in this audit PR. |
| `verify.html` | Browser verifier for `.tproof.json` proof files. Lets users load a proof file, verify it through `/api/verify`, and optionally hash an original file locally to compare hashes. | Highly reusable verification UI pattern for future `.action.json` support. | Yes, but only after the object model is defined. It currently says `.tproof.json`, proof file, and frozen version. | Yes. Do not modify until P006 defines AI Action File, Seal, and Proof Bundle behavior. |
| `docs.html` | API documentation for v0.2 timestamp, proof bundle, and verification flows. | Reusable as technical documentation structure. | Yes, later. It currently describes `.tproof.json`, proof bundles, and proof-of-existence. | Yes. Do not change until API/object model decisions are made. |
| `proofspec.html` | Normative protocol page for ProofSpec and digital proof-of-existence concepts. | Useful as a precedent for a later AI Action File or seal specification page. | Yes. Some wording is broad and may imply a general proof/compliance standard. | Yes. Do not edit before the future object model PR. |
| `privacy.html` | Privacy policy and privacy-first explanation for hash-only proof files and stateless verification. | Very reusable because the hash-only principle remains core. | Yes. Later wording should mention AI Action Files while preserving no-content-by-default boundaries. | Yes. Legal/privacy wording should be updated deliberately. |
| `security.html` | Security overview, threat model, CSP, key policy, and proof-file verification language. | Reusable security model for hash-only, local hashing, key pinning, and stateless verification. | Yes. Later wording should distinguish AI Action File, Seal, and Proof Bundle. | Yes. Do not alter security claims in this audit PR. |
| `legal.html` | Legal terms/disclaimers page. | Reusable as a boundary document. | Yes. Must avoid absolute legal proof or compliance claims. | Yes. Legal wording should be handled in a later dedicated PR. |
| `regulations.html` | Regulations/compliance-facing page. | Reusable only with careful review. | Yes. Highest risk page for overclaiming legal or compliance value. | Yes. Do not change until claims are reviewed against product truth. |
| `use-cases.html` | Use-case marketing page for current proof workflows. | Reusable for future AI action traceability scenarios. | Yes, later. Needs AI action-specific use cases and should avoid generic proof-of-everything framing. | Yes. Do not change in this audit PR. |
| `pricing.html` | Pricing/commercial page. | Reusable once the commercial offer is validated. | Yes. Should eventually align to TimeProofs Action File v1, but only after the product surface is clearer. | Yes. Do not modify before sales validation direction is accepted. |
| `install.html` | Install page for the current freeze/proof workflow and browser-oriented acquisition path. | Partially reusable if future capture/generation helpers remain browser-oriented. | Yes. Likely needs repositioning away from generic freeze language. | Yes. Do not modify until the AI Action File generation flow is defined. |
| `about.html` | About/company/product narrative page. | Reusable for explaining the shift from proof-of-existence to AI action traceability. | Yes, later. | Yes. Not part of this PR. |
| `404.html` | Not-found page for the static site. | Reusable unchanged. | Probably no product update needed unless navigation/footer changes later. | Yes. Leave untouched. |
| `examples/browser-basic.html` | Minimal browser example for hashing, timestamping, and bundle creation. | Reusable as an example pattern for local hash, timestamp, and bundle creation. | Yes. Later examples should include safe synthetic AI Action Files. | Yes. Do not modify examples in this audit PR. |
| `v02/playground-v02.html` | v0.2 playground for local hash, `/api/timestamp`, and client-side `.tproof.json` bundle creation. Contains French UI copy today. | Reusable as a quick experimental harness, but not as a production AI Action File UI. | Yes. Should be translated and/or replaced later. | Yes. Do not modify until the future demo/object model work. |

### Non-HTML Static Site Files

These files support the static site but are not product pages:

- `sitemap.xml`, `robots.txt`, `humans.txt`
- `site.webmanifest`, `manifest.json`, `manifest.webmanifest`, `sw.js`
- Favicons, logos, `og.png`, and other image assets
- `.well-known/security.txt`, `.well-known/jwks.json`, `.well-known/pgp.txt`

These should not be modified in this audit PR. Later navigation, footer, metadata, sitemap, and manifest updates belong in P005.

### Page Reuse Summary

Reusable soon:

- `README.md` for P003 repositioning.
- `index.html` for P004 homepage repositioning.
- Navigation, footer, SEO metadata, sitemap, and social metadata for P005 alignment.

Reusable after object model work:

- `verify.html`, `docs.html`, `proofspec.html`, `security.html`, schemas, SDK examples, and playground flows.

Should not be modified yet:

- `verify.html`, `api-v02/worker.js`, `selfhost/server.js`, SDK files, OpenAPI files, proof schemas, and legal/privacy/security/regulations pages.

## 2. Existing Verify Flow

### Browser Verify Flow (`verify.html`)

The current browser verifier works like this:

1. The user loads a `.tproof.json` proof file in the browser.
2. The page parses the JSON locally.
3. The page extracts the proof hash from either `bundle.hash.value` or a string `bundle.hash` shape.
4. The hash must be a 64-character hex SHA-256 value.
5. The user clicks verify.
6. The page posts `{ bundle: loadedProof }` to `https://api.timeproofs.io/api/verify`.
7. The page treats `valid: true` as a verified proof and displays the proof hash, date, and status.
8. The user can optionally load the original file.
9. The original file is hashed locally in the browser with SHA-256.
10. The page compares the local file hash to the proof hash and reports whether it is the same version.

Important properties:

- The page does not create proofs.
- The original file is not uploaded.
- The proof bundle is sent to the API for signature verification.
- The current UI is `.tproof.json` proof-file first, not `.action.json` AI Action File first.

### Public API Verify Flow (`api-v02/worker.js`)

The current Cloudflare Worker verification flow is stateless:

- `POST /api/verify` accepts either a proof bundle directly or `{ bundle: <proof bundle> }`.
- It validates the hash object or hash value.
- It validates timestamp fields: `issuedAt`, `issuer`, and `nonce`.
- It enforces the canonical issuer `https://api.timeproofs.io`.
- It rebuilds the canonical string as `<hash>|<issuedAt>|<issuer>|<nonce>`.
- It rejects canonical mismatches.
- It validates an Ed25519 proof signature.
- It verifies the signature against the server-configured trusted public key, not against an arbitrary bundle-provided public key.
- It returns `valid: true` only when the bundle passes the stateless cryptographic checks.

`GET /api/verify?hash=...` is intentionally rejected in v0.2 because a hash alone cannot be verified without server-side storage. The endpoint tells callers to use a bundle with `POST /api/verify`.

### Self-Hosted Verify Flow (`selfhost/server.js`)

The self-host server has a related but different flow:

- `POST /api/verify` accepts a bundle or `{ bundle: <bundle> }`.
- It checks `.tproof.json` structure.
- It verifies an HMAC based on local `TP_SECRET`.
- It returns schema and proof validity fields.

This differs from the public Worker, which is Ed25519-only in the current `api-v02/worker.js` implementation.

### SDK Offline Verify Flow

SDK verification is available through:

- `sdk/verify.js` with `verifyBundle(bundle, fileOrBytes?, options?)`.
- `sdk/timeproof.js` and `sdk/timeproofs-v02.js` with `verifyBundle(...)` exposed through the UMD/client API.
- `sdk/verify-offline.js` with `verifyOffline(bundle, options)` for `.tproof.json` bundles.

The SDK checks structure, canonical string, issuer, Ed25519 signature when a trusted public key is provided, and optionally whether a local file or text hash matches the bundle hash.

### What The Current Flow Verifies

The current verification stack verifies:

- SHA-256 hash format.
- `.tproof.json` proof bundle structure.
- Timestamp fields such as `issuedAt`, `issuer`, and `nonce`.
- Canonical string consistency.
- Ed25519 signature validity in the public Worker and SDK paths.
- HMAC validity in the self-host path.
- Optional local file hash match in the browser and SDK.

The current verification stack does not verify:

- The truth of the underlying file content.
- The correctness of an AI action.
- The legality, compliance status, fairness, or completeness of an action.
- A full chain of custody.
- A `.action.json` AI Action File format, because that format does not exist yet.

### Reuse For Future `.action.json` Verification

Reusable parts:

- Local JSON file loading pattern.
- Local SHA-256 hashing of an original file.
- Hash comparison UX.
- Stateless seal verification against a signed receipt.
- Canonical issuer and key-pinning model.
- Clear result states: loaded, verified, invalid, file match, file mismatch.
- Debug output gated behind a query parameter.

Potential future flow:

1. Load an AI Action File (`.action.json`) locally.
2. Hash the AI Action File locally using a deterministic canonicalization rule.
3. Extract or load a Seal/Proof Bundle that contains the sealed fingerprint.
4. Verify the Seal/Proof Bundle with TimeProofs.
5. Compare the computed AI Action File fingerprint with the sealed fingerprint.
6. Display the result without uploading sensitive action content by default.

### Risks When Adding AI Action File Verification Later

- The current verifier sends the proof bundle to the API. A future `.action.json` verifier must not accidentally send sensitive AI Action File content to TimeProofs by default.
- `.tproof.json` and `.action.json` must not be treated as the same object.
- The system must avoid circular hashing, especially if an AI Action File contains its own Seal or Proof Bundle.
- The UI must distinguish verifying a Seal from validating an AI Action File schema and from checking file integrity.
- Backward-compatible `.tproof.json` verification should continue to work.
- Existing `/api/verify` behavior should not be changed without explicit versioning and tests.

## 3. Existing SDK Capabilities

### SDK Files And Current Exports

| File | Current exports/helpers | Current role |
| --- | --- | --- |
| `sdk/hash.js` | `hashText`, `hashBytes`, `hashFile`, `isBrowser` | Hashes text, bytes, or browser files locally with SHA-256. |
| `sdk/bundle.js` | `BUNDLE_VERSION`, `CANONICAL_ISSUER`, `createBundle` | Builds a v0.2 `.tproof.json` proof bundle from hash, timestamp, proof, and optional metadata. |
| `sdk/verify.js` | `verifyBundle` | Verifies v0.2 proof bundle structure, canonical string, signature, issuer, and optional file/hash match. |
| `sdk/timeproof.js` | `createClient`, `hashText`, `hashBytes`, `hashFile`, `timestamp`, `createBundle`, `verifyBundle`, `formatBundle` | Main UMD/CommonJS-style SDK surface for v0.2. Hashes locally, timestamps hashes, builds bundles, verifies bundles, and formats proof output. |
| `sdk/timeproofs-v02.js` | `createClient`, `hashText`, `hashBytes`, `hashFile`, `timestamp`, `createBundle`, `verifyBundle` | Alternate v0.2 SDK bundle with similar stateless API helpers. |
| `sdk/verify-offline.js` | `verifyOffline` | Offline `.tproof.json` bundle verification helper. |
| `sdk/format.js` | CLI-style script functions such as `readJsonFile` and `printBundle` | Reads a proof bundle and prints a human-readable verification result. |
| `sdk/test.js` | Test script, not an exported SDK module | Smoke test for hashing, timestamping, bundle creation, offline verification, and saving `proof.tproof.json`. |

### What The SDK Currently Does

The SDK currently supports:

- Local SHA-256 hashing.
- Posting a hash to `/api/timestamp`.
- Creating `.tproof.json` proof bundles.
- Verifying `.tproof.json` proof bundles.
- Optional local file/text hash comparison.
- Formatting proof bundles for human-readable output.

The SDK currently assumes the v0.2 proof-bundle model, not an AI Action File model.

### Reuse For AI Action File Work

Reusable capabilities:

- `hashText`, `hashBytes`, and `hashFile` can support local AI Action File fingerprinting.
- `timestamp` can seal a locally computed fingerprint without sending raw content.
- `createBundle` provides a starting model for a Seal or Proof Bundle object, but should not be reused blindly as the AI Action File itself.
- `verifyBundle` and `verifyOffline` can inform future seal verification.
- `formatBundle` can inform future human-readable verification summaries.

### Missing Capabilities For Later PRs Only

Do not add these in this audit PR. They should be scoped later:

- `createActionFile` for building a deterministic `.action.json` AI Action File.
- `hashActionFile` with explicit canonicalization and circular-hash protection.
- `sealActionFile` or equivalent helper that sends only the AI Action File fingerprint to TimeProofs.
- `verifyActionFile` that validates the AI Action File schema, recomputes the fingerprint, verifies the Seal, and compares hashes.
- Schema validation for `.action.json`.
- Clear object separation between AI Action File, Seal, and Proof Bundle.
- Safe redaction helpers or examples that keep sensitive content outside TimeProofs by default.
- Tests that prove sensitive action content is not sent to TimeProofs by default.

## 4. Existing Selfhost/API/Server Routes

### Public Worker Routes (`api-v02/worker.js`)

| Route | Method | Current behavior | Backward-compatibility note |
| --- | --- | --- | --- |
| `/api/health` | `GET` | Returns status, version, mode, proof mode, issuer, and key ID. | Keep stable for monitoring and clients. |
| `/api/timestamp` | `POST` | Accepts `{ hash: <64-char sha256 hex> }`; signs canonical payload; returns hash, timestamp, proof, canonical string, and minimal metadata. | Must remain backward-compatible. It is the current hash-sealing primitive. |
| `/api/verify` | `POST` | Accepts `.tproof.json` bundle or `{ bundle }`; verifies issuer, canonical string, hash, timestamp fields, and Ed25519 signature. | Must remain backward-compatible for existing `.tproof.json` verification. |
| `/api/verify` | `GET` | Rejects hash-only verification in stateless v0.2 and instructs callers to POST a bundle. | Keep behavior unless a versioned compatibility decision is made. |
| Any other path | Any | Returns JSON `not_found`. | Keep default behavior predictable. |
| CORS preflight | `OPTIONS` | Returns permissive CORS headers for current API use. | Review only if future routes need different headers. |

### Self-Hosted Routes (`selfhost/server.js`)

| Route | Method | Current behavior | Backward-compatibility note |
| --- | --- | --- | --- |
| `/api/health` | `GET` | Returns selfhost status, version, mode, and issuer. | Keep stable. |
| `/api/timestamp` | `POST` | Accepts `{ hash }`; returns v0.2 hash, timestamp, nonce, and HMAC-based proof. | Keep stable for self-hosted users. |
| `/api/verify` | `POST` | Accepts a bundle or `{ bundle }`; validates structure and HMAC. | Keep stable for existing self-host verification. |

### OpenAPI Routes (`openapi.yaml`)

The OpenAPI contract currently documents:

- `GET /api/health`
- `POST /api/timestamp`
- `POST /api/verify`

It does not define `/api/seal` or `/api/verify-seal` today.

### Where `/api/seal` And `/api/verify-seal` Could Be Added Later

Do not implement these routes now. Later, after P006 defines the object model, additive routes could be added beside existing routes:

- `api-v02/worker.js`: add `POST /api/seal` and `POST /api/verify-seal` as new branches in the existing `handle(req)` router.
- `selfhost/server.js`: add matching Express routes after `/api/timestamp` and before or after `/api/verify`.
- `openapi.yaml`: add new paths and schemas only after route behavior is specified.
- `docs.html` and SDK docs: document only after implementation exists.
- SDK: add helper functions only after route contracts and object models are stable.

Backward compatibility rule: do not change the meaning of `/api/timestamp` or `/api/verify` when introducing seal-specific endpoints.

## 5. Existing ProofSpec, OpenAPI, Security, And Privacy Docs

### Specification And Documentation Files

| File | Current role | Remains useful? | Later wording update needed? | Must not delete? |
| --- | --- | --- | --- | --- |
| `PRODUCT_STRATEGY.md` | Product source of truth for TimeProofs V1 and AI Action File positioning. | Yes. This should guide later PRs. | Only if strategy changes. | Yes. |
| `ROADMAP.md` | Safe execution path from strategy to foundations, AI Action File V1, demo, and sales validation. | Yes. | Only as phases progress. | Yes. |
| `README.md` | Current broad v0.2 proof-of-existence overview, `.tproof.json` flow, SDK summary, and privacy principles. | Yes, but it is the first repositioning target. | Yes, P003. | Yes. |
| `CHANGELOG.md` | Release history. | Yes. | Add entries as future changes ship. | Yes. |
| `SECURITY.md` | Vulnerability policy and security posture. | Yes. | Possibly later to mention AI Action File boundaries. | Yes. |
| `CONTRIBUTING.md` | Contribution guidance. | Yes. | Low priority. | Yes. |
| `CODE_OF_CONDUCT.md` | Community standards. | Yes. | No immediate update needed. | Yes. |
| `LICENSE` | License. | Yes. | No. | Yes. |
| `openapi.yaml` | Current v0.2 API contract. | Yes. | Later, only when new routes are implemented. | Yes. |
| `proof-bundle.schema.json` | Current `.tproof.json` proof bundle schema. | Yes for compatibility. | Later if versioned. | Yes. |
| `spec/proof-bundle-v0.2.schema.json` | Alternate v0.2 proof bundle schema. | Yes for compatibility and migration reference. | Later if consolidated. | Yes. |
| `schemas/timeproofs-bundle-v02.schema.json` | Additional v0.2 bundle schema. | Yes as compatibility artifact. | Later if schema strategy is consolidated. | Yes. |
| `v02/spec/proofspec-v0.2.md` | v0.2 ProofSpec documentation. | Yes as technical history and reference. | Later to clarify relation to AI Action File. | Yes. |
| `v02/spec/proof-bundles.md` | v0.2 proof bundle documentation. | Yes. | Later to distinguish Proof Bundle from AI Action File. | Yes. |
| `v02/spec/sdk-js.md` | SDK specification documentation. | Yes. | Later after SDK additions. | Yes. |
| `v02/spec/cli.md` and `docs/cli-v0.2.md` | CLI documentation. | Yes. | Later if CLI supports AI Action Files. | Yes. |
| `api-v02/README.md` | Worker/API reference for stateless v0.2. | Yes. | Later only after route changes. | Yes. |
| `docs/run-local.md` | Local run documentation. | Yes. | Later if local dev flow changes. | Yes. |
| `privacy.html` | Privacy page. | Yes. | Yes, but carefully. | Yes. |
| `security.html` | Security page. | Yes. | Yes, but carefully. | Yes. |
| `legal.html` | Legal/disclaimer page. | Yes. | Yes, with extra caution. | Yes. |
| `regulations.html` | Regulations-facing page. | Yes, but high-risk for claim review. | Yes. | Yes. |
| `.well-known/security.txt` | Security contact file. | Yes. | No immediate update needed. | Yes. |
| `.well-known/jwks.json` | Public key discovery placeholder/artifact. | Yes if key-discovery remains relevant. | Later if key model changes. | Yes. |
| `.well-known/pgp.txt` and `pgp.txt` | PGP public key material. | Yes. | No immediate update needed. | Yes. |
| `release-v0.1.tproof.json`, `releases/v0.1.json`, `releases/v0.2.json` | Release proof artifacts/manifests. | Yes as historical proof artifacts. | No immediate update needed. | Yes. |
| `examples/demo.tproof.json`, `examples/sample-v0.2.tproof.json` | Existing proof bundle examples. | Yes for compatibility and migration examples. | Later add separate `.action.json` examples. | Yes. |

### Documents That Remain Especially Useful

- `PRODUCT_STRATEGY.md` and `ROADMAP.md` define the safe product direction.
- `privacy.html`, `SECURITY.md`, and `security.html` preserve the privacy-first, hash-only boundary.
- `openapi.yaml`, `api-v02/README.md`, and schemas preserve current API behavior.
- Proof bundle schemas and examples are needed for backward compatibility.

### Documents That Need Wording Updates Later

- `README.md` should be the next repositioning target.
- `index.html`, `docs.html`, `proofspec.html`, `use-cases.html`, `pricing.html`, `install.html`, and `about.html` should be updated only in scoped later PRs.
- `legal.html`, `privacy.html`, `security.html`, and `regulations.html` need careful updates to avoid unsupported legal or compliance claims.
- `v02/playground-v02.html` contains French UI copy and should be translated or replaced later, but not in this audit PR.

### Documents That Must Not Be Deleted

Do not delete existing `.tproof.json`, ProofSpec, OpenAPI, schema, release, security, privacy, legal, and governance files. Even if the product direction moves to AI Action Files, these files preserve compatibility, history, and current user expectations.

## 6. Migration Risks

### Confusing `.tproof.json` And `.action.json`

Risk: users and code may treat `.tproof.json` proof bundles and `.action.json` AI Action Files as the same object.

Mitigation later:

- Define separate names, schemas, examples, MIME/type guidance, and UI labels.
- Use `.tproof.json` for existing proof bundles and `.action.json` for AI Action Files.
- Keep migration docs explicit.

### Breaking Existing Verification

Risk: changing `/api/verify`, `verify.html`, or SDK `verifyBundle` for AI Action Files could break current `.tproof.json` users.

Mitigation later:

- Preserve current `/api/verify` behavior.
- Add new behavior through additive routes or explicit versioned branches.
- Keep `.tproof.json` examples and tests.
- Add regression tests before any API or SDK behavior change.

### Overclaiming Legal Or Compliance Value

Risk: the repositioning could accidentally imply absolute legal proof, legal notarization, regulatory certification, or full compliance.

Mitigation later:

- Keep claims narrow: file fingerprint, signed receipt, timestamp, and integrity check.
- Make legal/compliance pages explicit about limits.
- Avoid court-ready, regulator-approved, certified, or full-compliance language unless externally reviewed and supported.

### Sending Sensitive Content To TimeProofs By Mistake

Risk: a future `.action.json` verifier or sealing helper could upload the full AI Action File to TimeProofs, including prompts, outputs, customer data, or operational details.

Mitigation later:

- Design sealing around local hashing of the AI Action File.
- Send only the fingerprint and minimal required sealing metadata by default.
- Add tests that fail if sensitive file content is sent to TimeProofs by default.
- Make examples synthetic and redacted.

### Circular Hash Mistakes

Risk: an AI Action File may include its own Seal or Proof Bundle, changing the bytes that are supposed to be hashed and making verification impossible or unstable.

Mitigation later:

- Define exactly which fields are included in the AI Action File fingerprint.
- Keep Seal/Proof Bundle outside the signed/hashable core or define a canonical detached seal pattern.
- Provide deterministic canonicalization rules.
- Add tests for stable hashing.

### Unclear Distinction Between AI Action File, Seal, And Proof Bundle

Risk: users may not know whether they are verifying the action record, the sealed fingerprint receipt, or an existing proof bundle.

Mitigation later:

- Define the objects in P006 before implementation:
  - AI Action File: customer-owned traceability file for one observable AI action.
  - Seal: TimeProofs signed receipt for the AI Action File fingerprint.
  - Proof Bundle: existing or future portable proof object used to verify a seal/timestamp.
- Align UI labels, docs, SDK names, and examples to those distinctions.

### Losing Backward Compatibility

Risk: removing or renaming `.tproof.json`, proof bundle schemas, `/api/timestamp`, `/api/verify`, or SDK helpers would break current users and historical proofs.

Mitigation later:

- Keep existing files and routes.
- Add new AI Action File support as additive functionality.
- Keep old examples and release manifests.
- Document migration rather than replacing history.

## 7. Recommended Next PRs

These are recommendations only. Do not implement them in this audit PR.

### P003 README Repositioning

Update `README.md` to align with the accepted product strategy:

- TimeProofs = the black box for AI actions.
- First sellable product: TimeProofs Action File v1.
- Preserve hash-only privacy language.
- Keep existing `.tproof.json` compatibility clear.
- Avoid legal/compliance overclaims.

### P004 Homepage Repositioning

Update `index.html` only after README positioning is accepted:

- Reframe the homepage around AI action traceability.
- Explain that each observable AI action creates a clear, signed and verifiable AI Action File.
- Keep the company-owned-file and fingerprint-only privacy model clear.
- Do not change verification behavior in this PR.

### P005 Navigation/Footer/Meta Alignment

Update cross-site navigation, footer language, SEO metadata, social metadata, sitemap, and related static support files:

- Align the site-wide message after homepage repositioning.
- Keep all repository documentation and visible copy in English.
- Avoid touching product behavior.

### P006 AI Action File / Seal / Proof Bundle Object Model

Define the object model before implementation:

- AI Action File (`.action.json`)
- Seal
- Proof Bundle
- Hashing and canonicalization rules
- Sensitive-content boundary
- Compatibility with existing `.tproof.json` flows
- Future route and SDK requirements such as `/api/seal`, `/api/verify-seal`, `createActionFile`, `hashActionFile`, and `verifyActionFile`

No code, API, SDK, or architecture change should happen until the object model is explicit and reviewable.
