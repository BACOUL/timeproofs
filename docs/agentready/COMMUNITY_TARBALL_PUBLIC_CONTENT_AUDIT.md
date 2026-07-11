# AgentReady Community Tarball Public Content Audit

Status: APPROVED CONTENT — PUBLICATION NOT APPROVED

```txt
TARBALL CONTENT APPROVED: YES
PUBLICATION APPROVED: NO
VERSION: 0.1.0-alpha.0
NPM DIST-TAG: alpha
LATEST TAG MODIFIED: NO
FIRST PUBLICATION AUTH: manual npm CLI with owner 2FA
NPM TOKEN: none
FUTURE AUTH: Trusted Publishing OIDC after initial package creation
```

This document records the planned public package contents and the checks
required before publication.

## Package Metadata

Expected package:

```txt
@timeproofs/agentready
```

Expected version:

```txt
0.1.0-alpha.0
```

The root repository package must remain private:

```json
"private": true
```

The staged Community tarball package must be technically publishable after approval:

```json
{
  "license": "Apache-2.0",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/",
    "tag": "alpha"
  }
}
```

The staged Community tarball package must not contain `private: true`.

Staged Community package license field:

```json
"license": "Apache-2.0"
```

The root repository `package.json` and `LICENSE` remain unchanged. They are
not the staged package manifest or package license.

## Dedicated Package Assets

The Community tarball is built from a staging directory that copies:

```txt
packaging/agentready-community/LICENSE -> LICENSE
packaging/agentready-community/NOTICE -> NOTICE
packaging/agentready-community/README.md -> README.md
```

## Expected Files

```txt
LICENSE
NOTICE
README.md
package.json
bin/agentready.js
agentready-core/classify-action.js
agentready-core/detect-risks.js
agentready-core/extract-mcp-tools.js
agentready-core/extract-operations.js
agentready-core/generate-agentready-json.js
agentready-core/index.js
agentready-core/parse-mcp-tools.js
agentready-core/parse-openapi.js
agentready-core/parse-yaml.js
agentready-core/report.js
agentready-core/scan-mcp-tools.js
agentready-core/score.js
agentready-core/types.js
agentready-core/simulation/parse-simulation-scenario.js
agentready-core/simulation/run-static-simulation.js
agentready-core/simulation/simulation-result.js
```

## Expected Exclusions

The public package must not include:

- root repository `LICENSE`;
- root repository `README.md`;
- public HTML site;
- docs directory;
- tests;
- fixtures;
- backend;
- Stripe;
- dashboard;
- secrets;
- `.env`;
- release candidate artifacts;
- GitHub workflow internals not required at runtime;
- Pro, Team or Agency implementation;
- package-public historical ProofSpec or timestamp language.

## Final Approved Alpha Artifact

```txt
TARBALL CONTENT APPROVED: YES
PUBLICATION APPROVED: NO
PUBLICATION AUTHORIZED BY THIS APPROVAL: NO
```

Approver:

```txt
JEASON
```

Approval date:

```txt
2026-07-11
```

Approved package:

```txt
@timeproofs/agentready
```

Approved version:

```txt
0.1.0-alpha.0
```

Approved source commit:

```txt
150da23932c1fb9433cb3d546904f03c18c909e9
```

Approved tarball SHA-256:

```txt
602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe
```

Controlled GitHub Actions ZIP SHA-256:

```txt
1a318eab6a7af3a313da820546b36c4392b58502a025e8bd0a8a06ba45a3c248
```

Approved npm dist-tag:

```txt
alpha
```

Controlled file count:

```txt
21
```

Controlled files:

```txt
LICENSE
NOTICE
README.md
agentready-core/classify-action.js
agentready-core/detect-risks.js
agentready-core/extract-mcp-tools.js
agentready-core/extract-operations.js
agentready-core/generate-agentready-json.js
agentready-core/index.js
agentready-core/parse-mcp-tools.js
agentready-core/parse-openapi.js
agentready-core/parse-yaml.js
agentready-core/report.js
agentready-core/scan-mcp-tools.js
agentready-core/score.js
agentready-core/simulation/parse-simulation-scenario.js
agentready-core/simulation/run-static-simulation.js
agentready-core/simulation/simulation-result.js
agentready-core/types.js
bin/agentready.js
package.json
```

Controlled results:

- manifest references the approved source commit;
- real tarball SHA-256 matches the manifest and `.sha256` file;
- GitHub Actions ZIP SHA-256 matches the controlled ZIP;
- package_name is `@timeproofs/agentready`;
- version is `0.1.0-alpha.0`;
- package_publish_access is `public`;
- package_publish_registry is `https://registry.npmjs.org/`;
- package_publish_tag is `alpha`;
- publication_ready is `false`;
- package contains exactly 21 files;
- Community package does not contain `private: true`;
- root repository package remains private;
- license is `Apache-2.0`;
- `NOTICE` is present;
- dependencies are empty;
- README commands explicitly use `@alpha`;
- no forbidden historical ProofSpec reference is present;
- no secret or token is present;
- no Pro, Stripe, backend or dashboard component is present;
- no dangerous path or symlink is present;
- `npm publish --dry-run --access public --tag alpha` passed;
- no real publication was performed.

Owner approval statement:

```txt
«J’approuve le contenu final corrigé du tarball AgentReady Community 0.1.0-alpha.0, lié au commit 150da23932c1fb9433cb3d546904f03c18c909e9 et au SHA-256 602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe, destiné au dist-tag npm alpha. Cette approbation n’autorise pas encore sa publication.»
```

This content approval is not a publication authorization.

## Superseded Approved Artifact

```txt
TARBALL CONTENT APPROVED: SUPERSEDED
PUBLICATION APPROVED: NO
SUPERSEDED DATE: 2026-07-11
SUPERSEDED REASON: release channel corrected to alpha, changing the tarball content
```

Approver:

```txt
JEASON
```

Approval date:

```txt
2026-07-11
```

Approved package:

```txt
@timeproofs/agentready
```

Approved version:

```txt
0.1.0-alpha.0
```

Approved source commit:

```txt
61a5dab90afe6363f7ea386712bb8cdc48e9f665
```

Approved tarball SHA-256:

```txt
f1381d16277707cfc5d1005ed5e865139aa5a1ed0fcc1fb7de35c2f1a5eab77d
```

Controlled GitHub Actions ZIP SHA-256:

```txt
9bd533ae306e2c511af6af2d7aad7031916d6f24eae3ed4b21cd5364e1dd12c1
```

Workflow:

```txt
AgentReady Community Release Candidate
Run #13
Branch: timeproofs
```

Controlled file count:

```txt
21
```

Controlled files:

```txt
LICENSE
NOTICE
README.md
package.json
bin/agentready.js
agentready-core/classify-action.js
agentready-core/detect-risks.js
agentready-core/extract-mcp-tools.js
agentready-core/extract-operations.js
agentready-core/generate-agentready-json.js
agentready-core/index.js
agentready-core/parse-mcp-tools.js
agentready-core/parse-openapi.js
agentready-core/parse-yaml.js
agentready-core/report.js
agentready-core/scan-mcp-tools.js
agentready-core/score.js
agentready-core/types.js
agentready-core/simulation/parse-simulation-scenario.js
agentready-core/simulation/run-static-simulation.js
agentready-core/simulation/simulation-result.js
```

Controlled results:

- manifest references the approved source commit;
- tarball SHA-256 matches the manifest and `.sha256` file;
- package contains exactly 21 files;
- license is `Apache-2.0`;
- `NOTICE` is present;
- Community package does not contain `private: true`;
- `publishConfig.access` is `public`;
- `publishConfig.registry` is `https://registry.npmjs.org/`;
- `publishConfig.tag` was not yet set to `alpha` in this superseded artifact;
- no forbidden historical ProofSpec reference is present;
- no secret is present;
- no Pro, Stripe, backend or internal content is present;
- clean install and CLI behavior were validated;
- no real publication was performed.

Owner approval statement:

```txt
«J’approuve le contenu final du tarball AgentReady Community 0.1.0-alpha.0, lié au commit 61a5dab90afe6363f7ea386712bb8cdc48e9f665 et au SHA-256 f1381d16277707cfc5d1005ed5e865139aa5a1ed0fcc1fb7de35c2f1a5eab77d. Cette approbation n’autorise pas encore sa publication.»
```

This content approval is not a publication authorization and is no longer
usable for publication because the corrected alpha release channel changes the
tarball contents.

## Current Blockers

- publication approval must remain `NO` until a dedicated approval flow changes it.

## Publication Impact

The corrected alpha artifact contents have been inspected and approved.

Publication remains blocked until explicit publication approval is recorded in
a dedicated approval flow.
