# TimeProofs — Pack Governance & Compatibility

Status: CANONICAL PRODUCT GOVERNANCE

## Pack trust lifecycle

Every pack/version is one of:
- EXPERIMENTAL — research/dev only; never default blocking in production;
- CANDIDATE — complete evidence/fixtures, under compatibility review;
- STABLE — allowed for production enforcement within stated profiles;
- DEPRECATED — supported temporarily, migration available;
- RETIRED — no longer accepted for new production deployment.

## Promotion requirements

A pack may reach STABLE only with:
- explicit protocol/provider versions;
- normative/authoritative evidence references;
- deterministic mappings/canonicalization;
- PASS/BLOCK/UNKNOWN/unsupported fixtures;
- adversarial tests where consequential;
- compatibility matrix;
- rollback path;
- documented limitations and non-claims;
- review of false-block risk.

## Identity and integrity

Every pack release must have immutable pack ID + version + content digest. Runtime must pin an explicit version/digest. No silent `latest` mutation in enforcement.

Release signing/attestation becomes mandatory when public production distribution infrastructure exists.

## Bad-pack response

If a stable pack causes material false BLOCK/DENY:
1. stop promotion/distribution of the bad version;
2. publish incident/advisory;
3. provide known-good pin/rollback;
4. preserve evidence and affected-version identity;
5. add regression fixture before replacement release;
6. never mutate the released version in place.

## Deprecation baseline

Before M9/public release, publish a concrete support window. Until then, policy is:
- no silent removal;
- breaking semantics require a new version;
- supported upstream protocol changes trigger review, never automatic widening;
- migrations identify old/new pack/profile and behavior change;
- customers can pin known-good versions.

## Third-party packs

External pack authoring is NOT automatically trusted. Future third-party packs require trust tiers, schema validation, sandbox/security review, provenance and explicit publisher identity. TimeProofs-hosted third-party packs must never inherit STABLE status merely because they are syntactically valid.

## Moat boundary

Open schemas/fixtures can maximize trust and distribution. Deep provider resolver semantics, maintained operational compatibility knowledge and private packs may remain commercial. Exact license boundary is frozen before broad M9 release.
