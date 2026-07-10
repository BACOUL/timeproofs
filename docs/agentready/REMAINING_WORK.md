# Remaining Work - TimeProofs AgentReady

## Purpose

This is the execution checklist after CLI, CI Gate validation, rule codes, GitHub Action, and `agentready.json` spec v0.1 have landed.

## Current Status

```txt
CLI alpha: merged
Commercial CI Gate validation: merged
Rule codes AR001-AR010: merged
GitHub Action wrapper: merged
agentready.json spec v0.1: merged and aligned with code
```

## Priority 1 - Public CI Gate Page

Add a static `/agentready-ci` public page.

It should show:

- what AgentReady blocks in CI;
- CLI examples;
- GitHub Action examples;
- recommended policy: `--min-score 75 --fail-on critical`;
- outputs: score, status, report, `agentready.json`;
- links to rule codes and the v0.1 spec.

It must not add:

- backend;
- dashboard;
- Stripe/payment;
- account flow;
- runtime firewall.

## Priority 2 - Public Site QA/Polish

After `/agentready-ci`, run public site QA/polish.

Check:

- homepage;
- `/agentready-ci`;
- OpenAPI scanner;
- MCP scanner;
- sample report;
- docs/examples navigation;
- mobile layout;
- no unexpected network calls from scanner flows.

## Priority 3 - Keep Contracts Stable

Do not casually change:

- scoring;
- AR001-AR010 meanings;
- `agentready.json` v0.1 field names;
- CLI exit behavior;
- GitHub Action inputs/outputs.

Any change here needs fixture-backed evidence.

## Priority 4 - Later Product Ideas

Only after CI Gate adoption evidence:

- AgentReady Checked;
- policy packs;
- paid review workflow;
- report packaging;
- team-oriented docs.

## Mandatory Limitation

TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
