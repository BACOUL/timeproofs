# AgentReady 0.1.0-alpha.0 Draft Release Notes

Draft release notes - not published.

## Status

This is a Community release candidate note for review only.

- npm package: not published.
- GitHub Release: not created.
- GitHub tag: not created.
- Marketplace listing: not created.
- Root repository package: still protected by `private: true`.
- Staged Community tarball package: technically publishable after approval, but not approved and not published.

## What This Candidate Contains

AgentReady is a pre-deployment CI gate for agent-facing OpenAPI and MCP tools.

This candidate includes:

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

Community is the free standard-adoption layer. It is intended to support local and CI checks before paid product features exist.

This candidate does not include:

- account creation;
- hosted backend;
- dashboard;
- Stripe billing;
- license service;
- Pro, Team, or Agency features;
- continuous monitoring;
- certification;
- Marketplace listing;
- public npm availability.

## Trust Model

AgentReady Community scans run locally or in the customer's CI runner.

The candidate does not:

- execute live APIs;
- execute live MCP tools;
- call LLMs;
- upload OpenAPI files;
- upload MCP definitions;
- upload full reports by default;
- require production secrets.

## Limitations

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.

## Publication Blockers

- final Community tarball content not approved.
- explicit release approval not granted.
- no public tag exists.
- no GitHub Release exists.
- trusted publishing provenance not configured for publication.
