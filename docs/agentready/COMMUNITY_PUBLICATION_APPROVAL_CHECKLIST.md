# AgentReady Community Publication Approval Checklist

Status: APPROVED

This checklist is the explicit publication gate. Publication is approved only
for the exact artifact, version and alpha dist-tag recorded below.

```txt
PUBLICATION APPROVED: YES
APPROVED BY: JEASON
APPROVED COMMIT: 150da23932c1fb9433cb3d546904f03c18c909e9
APPROVED VERSION: 0.1.0-alpha.0
APPROVED TARBALL SHA-256: 602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe
APPROVAL DATE: 2026-07-12
NPM DIST-TAG: alpha
LATEST TAG MODIFIED: TEMPORARILY ACCEPTED AS 0.1.0-alpha.0
LATEST ACCEPTANCE DECISION: ACCEPT_TEMPORARILY
LATEST TEMPORARY ACCEPTANCE: until first stable release
FUTURE PRERELEASES DIST-TAG: alpha
NEW NPM OPERATION AUTHORIZED: NO
IMMUTABLE GIT TAG AUTHORIZED: v0.1.0-alpha.0
GITHUB RELEASE AUTHORIZED: YES
ARTIFACT MODIFICATION AUTHORIZED: NO
OTHER VERSION AUTHORIZED: NO
FIRST PUBLICATION AUTH: manual npm CLI with owner 2FA
NPM AUTOMATION TOKEN: none
TEMPORARY LOCAL OWNER LOGIN: authorized for controlled first publication only
LOCAL LOGIN STORAGE: owner device ~/.npmrc only
CREDENTIAL SHARING: forbidden
POST-PUBLICATION ACTION: npm logout immediately after verification
FUTURE AUTH: Trusted Publishing OIDC after initial package creation
```

## Owner Publication Authorization

```txt
Â«Jâ€™autorise explicitement la publication publique de @timeproofs/agentready version 0.1.0-alpha.0, exclusivement sous le dist-tag npm alpha, Ã  partir du commit source approuvÃ© 150da23932c1fb9433cb3d546904f03c18c909e9 et du tarball dont le SHA-256 est 602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe. Jâ€™autorise Ã©galement la crÃ©ation du tag Git immuable v0.1.0-alpha.0 et de la GitHub Release correspondante. Cette autorisation ne permet pas de publier sous latest, de modifier lâ€™artefact approuvÃ© ou de publier une autre version. Approbation donnÃ©e par JEASON le 12 juillet 2026.Â»
```

Final decision:

- publication is authorized only for the exact approved artifact;
- publication is authorized only under npm dist-tag `alpha`;
- publishing under `latest` is forbidden;
- immutable Git tag `v0.1.0-alpha.0` is authorized;
- the corresponding GitHub Release is authorized;
- publication has not yet been executed.

## Tarball Content Approval

```txt
TARBALL CONTENT APPROVED: YES
TARBALL APPROVED BY: JEASON
TARBALL APPROVAL DATE: 2026-07-11
APPROVED SOURCE COMMIT: 150da23932c1fb9433cb3d546904f03c18c909e9
APPROVED VERSION: 0.1.0-alpha.0
APPROVED TARBALL SHA-256: 602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe
APPROVED ZIP SHA-256: 1a318eab6a7af3a313da820546b36c4392b58502a025e8bd0a8a06ba45a3c248
APPROVED NPM DIST-TAG: alpha
PUBLICATION AUTHORIZED BY THIS APPROVAL: NO
```

## Historical Superseded Tarball Approval

```txt
PREVIOUS TARBALL APPROVAL SUPERSEDED: YES
SUPERSEDED DATE: 2026-07-11
SUPERSEDED REASON: release channel corrected to alpha, changing the tarball content
PREVIOUS APPROVED SOURCE COMMIT: 61a5dab90afe6363f7ea386712bb8cdc48e9f665
PREVIOUS APPROVED VERSION: 0.1.0-alpha.0
PREVIOUS APPROVED TARBALL SHA-256: f1381d16277707cfc5d1005ed5e865139aa5a1ed0fcc1fb7de35c2f1a5eab77d
PREVIOUS PUBLICATION AUTHORIZED BY APPROVAL: NO
```

The previous tarball content approval is retained as historical evidence only.

## Recorded Approval Preconditions

- npm scope ownership verified;
- npm package publishability verified;
- root repository package remains `private: true`;
- staged Community tarball package omits `private: true`;
- staged Community tarball package uses public npm `publishConfig`;
- staged Community tarball package uses `publishConfig.tag: alpha`;
- npm account access list documented;
- npm 2FA enabled or trusted publishing decision completed;
- AgentReady Community package license approved for the package boundary;
- package-public legacy references resolved by staged package assets;
- package tarball contents reviewed;
- tarball SHA-256 recorded;
- source commit recorded;
- GitHub Actions candidate workflow passed;
- changelog reviewed;
- release notes reviewed;
- immutable tag plan approved;
- GitHub Release plan approved;
- rollback/deprecation policy accepted.

## Current Decision

Publication approval is recorded. Publication has not yet been executed.
