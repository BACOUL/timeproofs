#!/usr/bin/env node
import { runTimeProofsCli } from '../cli/timeproofs.js';
const code = await runTimeProofsCli(process.argv.slice(2));
process.exitCode = code;
