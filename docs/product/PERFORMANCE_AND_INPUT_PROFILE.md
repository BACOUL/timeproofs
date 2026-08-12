# TimeProofs — Performance & Input Profile

Status: pre-M8 developer contract
Date: 2026-08-12

## Purpose

This document defines conservative limits for the current local/CI product. It is not a network/runtime SLA.

## CI input limits

The GitHub Action currently enforces:

- default maximum per input artifact: 10 MiB;
- configurable maximum via `TP_MAX_INPUT_BYTES` only up to 50 MiB;
- input must be a regular file;
- output path must not alias an input path.

These are safety ceilings, not statements that every valid 10–50 MiB protocol artifact has been benchmarked.

## Canonicalization safety limits

Canonicalization applies explicit depth/node-count protections and rejects:

- cyclic structures;
- non-finite numbers;
- non-JSON values;
- excessive structural depth/node count.

See the world-class security regression for executable coverage.

## Representative benchmark

Verified GitHub-hosted Ubuntu / Node 22 baseline:

- UCP Checkout with 1,000 line items;
- 50 verification iterations after warm-up;
- p50: 3.668 ms;
- p95: 6.004 ms;
- max: 6.805 ms;
- process RSS observed: 70.3 MiB.

Source proof:
- workflow `TimeProofs Performance`;
- run id `31592637945`;
- head `14e1e12fe55be71eb977188f2b967f00929ab0ae`;
- conclusion `success`.

## Regression guard

The benchmark now enforces a provisional p95 ceiling of **100 ms** for the 1,000-line-item / 50-iteration profile.

Why 100 ms:

- it is deliberately much looser than the measured ~6 ms p95, avoiding false failures from normal hosted-runner variance;
- it is tight enough to detect a major algorithmic or accidental performance regression before M8;
- it is not represented as an end-user latency SLA.

The threshold may be tightened after M8 architecture introduces a real latency budget and representative production traces.

## Current supported-performance claim

TimeProofs currently claims only that its deterministic UCP↔AP2 Verify path is regression-tested on the 1,000-line-item benchmark profile under the above conditions.

TimeProofs does NOT yet claim:

- a 10,000-line-item production SLA;
- a fixed memory ceiling across OS/runtime combinations;
- networked enforcement latency;
- PSP/network connector latency;
- throughput guarantees under concurrent hosted traffic.

M8 must define those claims, if any, from measured runtime evidence rather than extrapolation.
