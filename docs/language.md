# Canonical language policy

English (`en`) is the canonical project language for TimeProofs V2.

This covers public pages, README, documentation, Proof Profiles, schemas, examples, API and OpenAPI, SDK, CLI output, public test descriptions, security and threat model, pricing, integration labels and demo copy.

The public home is served in English at `/`. Browser language, Accept-Language and device locale do not select another language. The document declares `lang="en"` and responses declare `Content-Language: en`.

Technical identifiers, field names, routes, profile ids, versions and machine-readable statuses remain English. SATISFIED, INCOMPLETE, CONFLICT, INVALID, UNSUPPORTED, MISSING and BLOCKED must never be translated in protocol artifacts. Locale changes must never change an action fingerprint, profile version, trust policy or verification decision.

No French translation, translation dependency, locale-prefixed route or language switcher is included. Future translations require a separate product decision and may translate explanatory interface text only.

## Preview identity

The site title and visible badge identify this release as TimeProofs V2 Preview. The designated currently tested Vercel project is `timeproofs` (prj_Su1mpb1PRYZEFCTTZs2L97LW5o82), not `timeproofsv1`; deployment target must remain preview. The requested console name is `timeproofs-v2-preview`. Renaming it requires signed-in Vercel project settings access, unavailable in the current browser session. Existing Git-linked projects may also produce duplicate previews; do not use a legacy-named duplicate as the canonical V2 preview.

Do not promote this branch to production, attach timeproofs.io, change DNS or modify timeproofs-v1.
