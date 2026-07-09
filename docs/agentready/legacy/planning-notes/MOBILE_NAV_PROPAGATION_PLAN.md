# TimeProofs AgentReady — Mobile Navigation Propagation Plan

## Purpose

The homepage now has a real mobile menu foundation, but the same mobile navigation must be propagated across all public pages before Browser V1 can be considered publicly presentable.

This is a Browser V1 blocker.

## Current problem

The preview showed that the desktop navigation wraps into multiple rows on mobile.

That makes the product look like a technical preview rather than a serious public site.

## Already added

```txt
assets/site-nav.css
assets/site-nav.js
legal.html
privacy.html
terms.html
```

## Required activation

Each public HTML page must include:

```html
<link rel="stylesheet" href="/assets/site-nav.css" />
```

and before `</body>`:

```html
<script src="/assets/site-nav.js" defer></script>
```

The script injects:

```txt
mobile dropdown menu
legal / privacy / terms footer links
outside-click close behavior
```

## Pages that must be activated

```txt
agentready.html
agentready-mcp.html
agentready-simulation.html
agentready-docs.html
agentready-examples.html
agentready-test.html
```

## Acceptance criteria

```txt
On mobile, desktop nav links are hidden.
A single Menu button is visible.
The Menu opens a dropdown with all key pages.
The nav no longer wraps into multiple rows.
Legal / Privacy / Terms links are accessible.
Desktop navigation still works.
No scanner behavior is changed.
No export behavior is changed.
No release PASS is claimed.
```

## Implementation note

A direct full-file update of some existing large HTML pages may be blocked by tool execution.

If that happens, the next implementation pass should apply the two required include lines file-by-file using a local editor, Codex, or a smaller patch-based workflow.

## Do not continue before this is done

Do not continue V2 implementation, SEO pages, monetization, or public launch until this mobile navigation propagation is completed and checked on a real phone.
