# AgentReady Community 0.1.0-alpha.0 Release Notes

## Status

This is the published AgentReady Community alpha release.

```txt
VERSION: 0.1.0-alpha.0
NPM PACKAGE: @timeproofs/agentready@0.1.0-alpha.0
NPM PACKAGE STATUS: PUBLISHED
NPM DIST-TAG alpha: 0.1.0-alpha.0
NPM DIST-TAG latest: 0.1.0-alpha.0
LATEST ACCEPTANCE DECISION: ACCEPT_TEMPORARILY
LATEST TEMPORARY ACCEPTANCE: until first stable release
FUTURE PRERELEASES DIST-TAG: alpha
NEW NPM OPERATION AUTHORIZED: NO
GIT TAG: v0.1.0-alpha.0
GIT TAG STATUS: CREATED
GIT TAG TARGET: 150da23932c1fb9433cb3d546904f03c18c909e9
GITHUB RELEASE: CREATED
GITHUB RELEASE PRERELEASE: true
GITHUB RELEASE DRAFT: false
GITHUB RELEASE LATEST: false
MARKETPLACE LISTING: NOT CREATED
```

## Install

```sh
npm install @timeproofs/agentready@alpha
npx @timeproofs/agentready@alpha --help
```

All future prereleases must be published explicitly with the npm dist-tag
`alpha`. No new npm operation is authorized by this release evidence PR.

## What This Release Contains

AgentReady is a pre-deployment CI gate for agent-facing OpenAPI and MCP tools.

This alpha release includes:

- AgentReady CLI;
- OpenAPI static scans;
- MCP tools static scans;
- CI policy PASS / FAIL behavior with `--min-score` and `--fail-on`;
- stable rule codes AR001-AR010;
- `agentready.json` v0.1 output;
- Markdown reports;
- local GitHub Action wrapper;
- local-first analysis;
- Node.js 20 runtime support.

## Community Scope

Community is the free standard-adoption layer. It supports local and CI checks
before paid product features exist.

This alpha release does not include:

- account creation;
- hosted backend;
- dashboard;
- Stripe billing;
- license service;
- Pro, Team, or Agency features;
- continuous monitoring;
- certification;
- Marketplace listing.

## Trust Model

AgentReady Community scans run locally or in the customer's CI runner.

The release does not:

- execute live APIs;
- execute live MCP tools;
- call LLMs;
- upload OpenAPI files;
- upload MCP definitions;
- upload full reports by default;
- require production secrets.

## Documented npm latest Exception

The approved publication command used the explicit npm dist-tag `alpha`.
After publication, npm exposed both observed dist-tags as:

```txt
alpha: 0.1.0-alpha.0
latest: 0.1.0-alpha.0
```

The attempted removal of `latest` failed with E400, and no dist-tag was
removed. JEASON accepted this `latest` state temporarily until the first stable
release. This acceptance does not authorize another npm publication, another
version, an unpublish, a deprecation, a token, or a `latest` modification.

## Release Evidence

- Package: `@timeproofs/agentready`
- Version: `0.1.0-alpha.0`
- Approved source commit: `150da23932c1fb9433cb3d546904f03c18c909e9`
- Approved tarball SHA-256:
  `602799c5dd20ada03f2ee5e27048bacd865a71654e1c09f8119a484c837da6fe`
- Git tag: `v0.1.0-alpha.0`
- Git tag target: `150da23932c1fb9433cb3d546904f03c18c909e9`
- GitHub Release:
  `https://github.com/BACOUL/timeproofs/releases/tag/v0.1.0-alpha.0`
- GitHub Release status: public prerelease, not latest

## Limitations

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
