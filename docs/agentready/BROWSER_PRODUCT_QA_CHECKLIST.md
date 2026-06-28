# TimeProofs AgentReady — Browser Product QA Checklist

## Purpose

This checklist validates the current browser-first AgentReady V1 before CLI, SEO, monetization, accounts, payments, dashboard, backend, or runtime firewall work.

The product must remain static and local:

```txt
No API endpoint calls.
No MCP tool execution.
No LLM calls.
No backend requirement.
No account requirement.
No payment requirement.
```

## Recommended local QA command

Run from the repository root:

```bash
python3 -m http.server 8080
```

Then open:

```txt
http://localhost:8080/
http://localhost:8080/agentready.html
http://localhost:8080/agentready-mcp.html
http://localhost:8080/agentready-simulation.html
http://localhost:8080/agentready-docs.html
http://localhost:8080/agentready-examples.html
http://localhost:8080/agentready-test.html
```

Do not rely on `file://` for QA because browser `fetch()` may block local fixtures.

## Global navigation QA

Check every public page:

```txt
/agentready.html
/agentready-mcp.html
/agentready-simulation.html
/agentready-docs.html
/agentready-examples.html
/agentready-test.html
```

Expected:

```txt
1. Header loads.
2. Logo loads.
3. Navigation links work.
4. Page title is clear.
5. Core limitation text appears where relevant.
6. No broken internal links.
7. Browser console has no uncaught errors after normal use.
```

## OpenAPI scanner QA

Page:

```txt
/agentready.html
```

Fixtures:

```txt
/agentready-examples/valid-simple-openapi.json
/agentready-examples/valid-simple-openapi.yaml
/agentready-examples/dangerous-actions-openapi.json
```

Expected for good JSON fixture:

```txt
1. Upload succeeds.
2. Score appears.
3. Status appears.
4. Risk counts appear.
5. Endpoint findings render.
6. agentready.json download works.
7. Markdown report download works.
8. Print / Save as PDF opens browser print dialog.
9. No API endpoint is called.
```

Expected for good YAML fixture:

```txt
1. Upload succeeds.
2. YAML parses correctly.
3. Operation count matches the JSON version when expected.
4. agentready.json is generated.
```

Expected for risky fixture:

```txt
1. Upload succeeds.
2. Critical or high risks appear.
3. Refund/delete/export risks are visible.
4. Recommendations are displayed.
5. agentready.json contains source_type: openapi.
```

Invalid file QA:

```txt
1. Invalid JSON fails cleanly.
2. Invalid YAML fails cleanly.
3. Error message is visible to the user.
4. Page does not crash.
```

## MCP scanner QA

Page:

```txt
/agentready-mcp.html
```

Fixtures:

```txt
/agentready-examples/mcp-tools-simple.json
/agentready-examples/mcp-tools-dangerous.json
```

Expected for simple MCP fixture:

```txt
1. Upload succeeds.
2. MCP AgentReady Score appears.
3. MCP-specific summary appears.
4. Tool findings render.
5. agentready.json download works.
6. Markdown report download works.
7. Print / Save as PDF opens browser print dialog.
8. No MCP tool is executed.
```

Expected for dangerous MCP fixture:

```txt
1. Upload succeeds.
2. High or critical risks appear.
3. Dangerous tool findings are visible.
4. Missing/weak schema findings are visible where applicable.
5. agentready.json contains source_type: mcp.
```

Invalid file QA:

```txt
1. Invalid MCP JSON fails cleanly.
2. Missing tools[] fails cleanly.
3. Empty tools[] fails cleanly.
4. Missing tool name fails cleanly.
5. Page does not crash.
```

## Static simulation QA

Page:

```txt
/agentready-simulation.html
```

Inputs:

```txt
agentready.json generated from OpenAPI scanner
agentready.json generated from MCP scanner
simulation-openapi-refund-scenario.json
simulation-mcp-delete-file-scenario.json
simulation-openapi-export-customers-scenario.json
simulation-mcp-send-email-scenario.json
```

OpenAPI refund scenario expected:

```txt
1. Upload OpenAPI-generated agentready.json.
2. Load or upload simulation-openapi-refund-scenario.json.
3. Run static simulation.
4. pass/warning/fail/not_applicable counts render.
5. Refund result appears.
6. Result is fail if confirmation, bounds, or success verification risks exist.
7. Raw agentready-simulation.json appears.
8. Download agentready-simulation.json works.
9. No API endpoint is called.
10. No LLM is called.
```

MCP delete-file scenario expected:

```txt
1. Upload MCP-generated agentready.json.
2. Load or upload simulation-mcp-delete-file-scenario.json.
3. Run static simulation.
4. Result appears as fail or not_applicable depending on matching.
5. Raw agentready-simulation.json appears.
6. Download agentready-simulation.json works.
7. No MCP tool is executed.
8. No LLM is called.
```

Mismatch QA:

```txt
1. OpenAPI scenario against MCP agentready.json returns not_applicable or source mismatch.
2. MCP scenario against OpenAPI agentready.json returns not_applicable or source mismatch.
3. Unknown expected_tool returns not_applicable.
4. Invalid scenario JSON fails cleanly.
5. Missing scenario_id fails cleanly.
```

## Test harness QA

Page:

```txt
/agentready-test.html
```

Expected:

```txt
1. Run tests button works.
2. OpenAPI group renders.
3. MCP group renders.
4. Export contract group renders.
5. Static simulation group renders.
6. PASS/FAIL counts are visible.
7. Failure details are visible when tests fail.
8. Raw output includes scores, risks, simulation output, and structured errors.
9. No browser console crash.
```

## Export filename QA

Expected download names:

```txt
agentready.json or agentready-mcp.json
agentready-report.md or agentready-mcp-report.md
agentready-simulation.json
```

Expected JSON properties:

```txt
agentready_version
generated_at
source_type
source
summary
tools[]
```

Expected simulation JSON properties:

```txt
simulation_version
generated_at
source_type
scenarios_total
pass
warning
fail
not_applicable
results[]
```

## No-execution verification

During QA, confirm by code review and browser behavior:

```txt
1. OpenAPI scanner never sends network requests to API endpoints from uploaded specs.
2. MCP scanner never connects to a live MCP server.
3. MCP scanner never executes tools.
4. Static simulation never calls APIs.
5. Static simulation never executes MCP tools.
6. Static simulation never calls LLMs.
7. Pages do not require login, payment, or backend.
```

Browser Network tab should show only static asset and fixture requests from the local site.

## Mobile smoke QA

Test on narrow viewport:

```txt
1. Navigation wraps without blocking content.
2. Upload inputs remain usable.
3. Result cards remain readable.
4. JSON/pre blocks scroll or wrap safely.
5. Buttons remain tappable.
```

## Acceptance criteria

The browser V1 can be considered stable enough for the next phase when:

```txt
1. All scanner pages complete the happy path.
2. All exports download with expected filenames.
3. Test harness passes or failures are understood and documented.
4. No-execution constraints are verified.
5. Static simulation produces agentready-simulation.json from real scanner output.
6. Navigation between product pages is clear.
7. No backend/account/payment/dashboard/runtime feature has been introduced.
```

## Mandatory limitation text

TimeProofs AgentReady does not guarantee that an AI agent will never fail.

It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
