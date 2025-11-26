# TimeProofs JavaScript SDK v0.2 – Specification (Draft)

This document defines the high-level API and behavior of the TimeProofs JavaScript SDK for API v0.2.

The SDK is designed to:
- work in Node.js and modern browsers,
- never send raw data to the TimeProofs API,
- only send hashes and protocol parameters,
- generate and verify `.tproof.json` Proof Bundles according to the Proof Bundles spec and JSON Schema.

The SDK must be simple enough to be adopted by developers and AI agents as a default pattern.

## 1. Top-level API

The SDK exposes:

- a `createClient(options)` factory
- a set of standalone helpers

### 1.1. `createClient(options)`

```js
import { createClient } from "timeproofs";

const tp = createClient({
  apiBase: "https://api.timeproofs.io", // optional, default
  apiKey: "tp_test_xxx"                 // optional, for rate limits/plan
});
