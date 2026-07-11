# AgentReady Community ProofSpec Reference Audit

Status: PACKAGE-PUBLIC REFERENCES TREATED

Publication status: NOT PUBLISHED

Audit date: 2026-07-11

## Decision

The AgentReady Community package is built from a dedicated staging directory.
It does not directly package the repository root.

The staged package uses dedicated assets:

- `packaging/agentready-community/LICENSE`;
- `packaging/agentready-community/NOTICE`;
- `packaging/agentready-community/README.md`.

The historical root `LICENSE` file is not included in the Community tarball.

The historical root `README.md` file is not included in the Community tarball.

## Package-Included Files

The package candidate is limited to these families:

```txt
LICENSE
NOTICE
README.md
package.json
bin/agentready.js
agentready-core/*.js
agentready-core/simulation/*.js
```

The release candidate script validates that the tarball does not contain:

- `ProofSpec`;
- `proof-of-existence`;
- `TimeProofs protocol`;
- `timestamp proofs`;
- `Based on the TimeProofs open protocol`.

## Historical Repository References

Historical references outside the package may remain in repository history,
legacy notes, public HTML or active planning documents where they describe:

- removed legacy product context;
- prohibited wording;
- superseded decisions;
- publication blockers that have now been resolved for the npm package.

Those references do not ship in the AgentReady Community npm package candidate.

## Publication Impact

`AR-COM-004 — Treat package-public ProofSpec references` is resolved for the
Community package boundary.

This does not approve publication.

Final publication still requires owner approval of the exact tarball SHA-256
and source commit.
