# TimeProofs AgentReady — Legacy Removal Decision

## Decision

The old TimeProofs proof-of-existence product surface is removed from the active repository direction.

The repository now focuses on:

```txt
TimeProofs AgentReady
Pre-deployment readiness for AI-agent tools
```

## Why

The project now has a clearer and stronger product direction:

```txt
OpenAPI / MCP / tool schema
→ AgentReady analysis
→ AgentReady Score
→ AgentReady Report
→ agentready.json
```

The previous proof-of-existence product created confusion because it positioned TimeProofs around:

```txt
hashing
timestamp API
.tproof.json
verify page
proofspec
regulations/security/legal proof pages
```

Those are no longer the main product.

## What is removed from the active surface

Legacy files/pages targeted for removal:

```txt
verify.html
proofspec.html
docs.html
use-cases.html
regulations.html
security.html
privacy.html
legal.html
about.html
pricing.html
roadmap.html
openapi.yaml
release-v0.1.tproof.json
releases/v0.1.json
rss.xml
sw.js
```

The root landing page is replaced with an AgentReady landing page.

The README is replaced with AgentReady-focused documentation.

The sitemap and manifest are updated for AgentReady.

## What stays

The following remain because they are useful for the new AgentReady project:

```txt
agentready-core/
agentready-examples/
docs/agentready/
AGENTREADY_PROJECT_CONTEXT.md
assets/
sitemap.xml
robots.txt
site.webmanifest
```

## Rule

Do not rebuild the old proof-of-existence product unless explicitly requested.

The next build step is:

```txt
agentready.html
```

with:

```txt
local OpenAPI JSON upload
AgentReady Score display
top risks display
endpoint findings
agentready.json export
Markdown report display
```
