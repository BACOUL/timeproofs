#!/usr/bin/env node

import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import process from 'node:process';
import {
  scanOpenApiText,
  scanMcpToolsText,
  runStaticSimulation
} from '../agentready-core/index.js';

const require = createRequire(import.meta.url);
const { version: VERSION } = require('../package.json');
const EXIT = Object.freeze({
  PASS: 0,
  POLICY_FAILED: 1,
  USAGE_OR_INPUT_ERROR: 2,
  INTERNAL_ERROR: 3
});

const SEVERITY_RANK = Object.freeze({ low: 1, medium: 2, high: 3, critical: 4 });
const SCAN_TYPES = new Set(['openapi', 'mcp']);

main(process.argv.slice(2)).catch((error) => {
  printError(error?.message || 'Unexpected AgentReady CLI error.');
  if (process.env.AGENTREADY_DEBUG) console.error(error);
  process.exit(error?.usage ? EXIT.USAGE_OR_INPUT_ERROR : EXIT.INTERNAL_ERROR);
});

async function main(argv) {
  const [command, subcommand, ...rest] = argv;

  if (!command || command === 'help' || command === '--help' || command === '-h') {
    printHelp();
    return;
  }

  if (command === '--version' || command === '-v' || command === 'version') {
    console.log(VERSION);
    return;
  }

  if (command === 'scan') {
    await runScan(subcommand, rest);
    return;
  }

  if (command === 'simulate') {
    await runSimulation([subcommand, ...rest].filter(Boolean));
    return;
  }

  if (command === 'report') {
    await runReport([subcommand, ...rest].filter(Boolean));
    return;
  }

  throw usageError(`Unknown command: ${command}`);
}

async function runScan(scanType, argv) {
  if (!SCAN_TYPES.has(scanType)) {
    throw usageError('Usage: agentready scan <openapi|mcp> <file> [--out dir] [--min-score n] [--fail-on severity]');
  }

  const parsed = parseOptions(argv, {
    flags: ['json'],
    values: ['out', 'min-score', 'fail-on']
  });

  const filePath = parsed.positionals[0];
  if (!filePath) throw usageError(`Missing ${scanType} file path.`);
  if (parsed.positionals.length > 1) throw usageError(`Unexpected argument: ${parsed.positionals[1]}`);

  const text = await readUtf8File(filePath);
  const result = scanType === 'openapi'
    ? await scanOpenApiText(text, { filename: path.basename(filePath) })
    : await scanMcpToolsText(text, { filename: path.basename(filePath) });

  const policy = evaluatePolicy(result, {
    minScore: parsed.options['min-score'],
    failOn: parsed.options['fail-on']
  });

  if (parsed.options.out) {
    await writeScanOutputs(parsed.options.out, scanType, result);
  }

  if (parsed.flags.json) {
    console.log(JSON.stringify(buildScanCliJson(scanType, result, policy), null, 2));
  } else {
    printScanSummary(scanType, result, policy, parsed.options.out);
  }

  if (!policy.passed) process.exit(EXIT.POLICY_FAILED);
}

async function runSimulation(argv) {
  const parsed = parseOptions(argv, {
    flags: ['json'],
    values: ['out']
  });

  const [agentreadyPath, scenarioPath] = parsed.positionals;
  if (!agentreadyPath || !scenarioPath) {
    throw usageError('Usage: agentready simulate <agentready.json> <scenario.json> [--out dir]');
  }

  const agentready = JSON.parse(await readUtf8File(agentreadyPath));
  const scenario = JSON.parse(await readUtf8File(scenarioPath));
  const result = runStaticSimulation(agentready, scenario, { filename: path.basename(scenarioPath) });

  if (parsed.options.out) {
    await ensureDir(parsed.options.out);
    await writeJson(path.join(parsed.options.out, 'agentready-simulation.json'), result);
  }

  if (parsed.flags.json) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    printSimulationSummary(result, parsed.options.out);
  }
}

async function runReport(argv) {
  const parsed = parseOptions(argv, {
    flags: ['json'],
    values: []
  });

  const filePath = parsed.positionals[0];
  if (!filePath) throw usageError('Usage: agentready report <agentready.json>');

  const agentready = JSON.parse(await readUtf8File(filePath));
  const summary = agentready.summary || {};
  const tools = Array.isArray(agentready.tools) ? agentready.tools : [];

  if (parsed.flags.json) {
    console.log(JSON.stringify({ summary, tool_count: tools.length }, null, 2));
    return;
  }

  console.log(`AgentReady report: ${filePath}`);
  console.log(`Score: ${summary.score ?? 'n/a'}/100`);
  console.log(`Status: ${summary.status || 'n/a'}`);
  console.log(`Tools: ${tools.length}`);
  console.log(formatRiskCounts(summary.risk_counts || {}));
}

function parseOptions(argv, schema) {
  const flags = new Set(schema.flags || []);
  const values = new Set(schema.values || []);
  const options = {};
  const parsedFlags = {};
  const positionals = [];

  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];
    if (!item.startsWith('--')) {
      positionals.push(item);
      continue;
    }

    const [rawName, inlineValue] = item.slice(2).split('=', 2);
    if (flags.has(rawName)) {
      parsedFlags[rawName] = true;
      continue;
    }

    if (values.has(rawName)) {
      const value = inlineValue !== undefined ? inlineValue : argv[index + 1];
      if (!value || value.startsWith('--')) throw usageError(`Missing value for --${rawName}.`);
      options[rawName] = value;
      if (inlineValue === undefined) index += 1;
      continue;
    }

    throw usageError(`Unknown option: --${rawName}`);
  }

  return { positionals, options, flags: parsedFlags };
}

function evaluatePolicy(result, options) {
  const reasons = [];
  const score = Number(result.summary?.score ?? 0);
  const minScore = options.minScore === undefined ? null : Number(options.minScore);

  if (options.minScore !== undefined && (!Number.isFinite(minScore) || minScore < 0 || minScore > 100)) {
    throw usageError('--min-score must be a number between 0 and 100.');
  }

  if (minScore !== null && score < minScore) {
    reasons.push(`score ${score} is below --min-score ${minScore}`);
  }

  const failOn = normalizeFailOn(options.failOn);
  if (failOn !== 'none') {
    const failingCount = countRisksAtOrAbove(result.summary?.risk_counts || {}, failOn);
    if (failingCount > 0) {
      reasons.push(`${failingCount} ${failOn}+ risk(s) detected`);
    }
  }

  return {
    passed: reasons.length === 0,
    reasons,
    min_score: minScore,
    fail_on: failOn
  };
}

function normalizeFailOn(value) {
  if (value === undefined) return 'none';
  const normalized = String(value).toLowerCase();
  if (normalized === 'none') return 'none';
  if (!SEVERITY_RANK[normalized]) throw usageError('--fail-on must be one of: critical, high, medium, low, none.');
  return normalized;
}

function countRisksAtOrAbove(riskCounts, severity) {
  const threshold = SEVERITY_RANK[severity];
  return Object.entries(riskCounts).reduce((total, [level, count]) => {
    return SEVERITY_RANK[level] >= threshold ? total + Number(count || 0) : total;
  }, 0);
}

async function writeScanOutputs(outDir, scanType, result) {
  await ensureDir(outDir);
  const contractName = scanType === 'mcp' ? 'agentready-mcp.json' : 'agentready.json';
  const reportName = scanType === 'mcp' ? 'agentready-mcp-report.md' : 'agentready-report.md';
  await writeJson(path.join(outDir, contractName), result.agentready_json);
  await fs.writeFile(path.join(outDir, reportName), result.markdown_report || '', 'utf8');
}

function buildScanCliJson(scanType, result, policy) {
  const ruleCodes = collectRuleCodes(result.operations || []);

  return {
    source_type: scanType,
    score: result.summary?.score,
    status: result.summary?.status,
    risk_counts: result.summary?.risk_counts,
    total_findings: result.summary?.total_findings,
    rule_codes: ruleCodes,
    policy,
    operations: (result.operations || []).length
  };
}

function printScanSummary(scanType, result, policy, outDir) {
  const summary = result.summary || {};
  console.log(`AgentReady ${scanType.toUpperCase()} scan`);
  console.log(`Score: ${summary.score ?? 'n/a'}/100`);
  console.log(`Status: ${summary.status || 'n/a'}`);
  console.log(`Operations/tools: ${(result.operations || []).length}`);
  console.log(formatRiskCounts(summary.risk_counts || {}));

  const topFindings = collectTopFindings(result.operations || []).slice(0, 5);
  if (topFindings.length) {
    console.log('\nTop findings:');
    for (const finding of topFindings) {
      console.log(`- [${finding.severity}] ${finding.code} — ${finding.operationId || finding.path || 'unknown operation'}`);
    }
  }

  if (outDir) console.log(`\nOutputs written to: ${outDir}`);

  if (policy.passed) {
    console.log('\nPolicy: PASS');
  } else {
    console.log('\nPolicy: FAIL');
    for (const reason of policy.reasons) console.log(`- ${reason}`);
  }
}

function printSimulationSummary(result, outDir) {
  const summary = result.summary || {};
  console.log('AgentReady static simulation');
  console.log(`Scenarios: ${summary.total_scenarios ?? 'n/a'}`);
  console.log(`Pass: ${summary.pass ?? 0}`);
  console.log(`Warning: ${summary.warning ?? 0}`);
  console.log(`Fail: ${summary.fail ?? 0}`);
  console.log(`Not applicable: ${summary.not_applicable ?? 0}`);
  if (outDir) console.log(`Outputs written to: ${outDir}`);
}

function collectTopFindings(operations) {
  const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
  return operations
    .flatMap((operation) => (operation.findings || []).map((finding) => ({
      ...finding,
      code: formatFindingCode(finding),
      operationId: operation.operationId,
      path: operation.path
    })))
    .sort((a, b) => (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0));
}

function collectRuleCodes(operations) {
  return [
    ...new Set(
      operations
        .flatMap((operation) => operation.findings || [])
        .map((finding) => finding.rule_code)
        .filter(Boolean)
    )
  ];
}

function formatFindingCode(finding) {
  return finding.rule_code ? `${finding.rule_code} (${finding.code})` : finding.code;
}

function formatRiskCounts(counts) {
  return `Risks: critical=${counts.critical || 0}, high=${counts.high || 0}, medium=${counts.medium || 0}, low=${counts.low || 0}`;
}

async function readUtf8File(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error) {
    if (error?.code === 'ENOENT') throw usageError(`File not found: ${filePath}`);
    throw error;
  }
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function writeJson(filePath, value) {
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function usageError(message) {
  const error = new Error(message);
  error.usage = true;
  return error;
}

function printError(message) {
  console.error(`AgentReady error: ${message}`);
}

function printHelp() {
  console.log(`TimeProofs AgentReady CLI ${VERSION}

Usage:
  agentready scan openapi <openapi.yaml|openapi.json> [--out dir] [--min-score n] [--fail-on critical|high|medium|low|none]
  agentready scan mcp <mcp-tools.json> [--out dir] [--min-score n] [--fail-on critical|high|medium|low|none]
  agentready simulate <agentready.json> <scenario.json> [--out dir]
  agentready report <agentready.json>

Examples:
  agentready scan openapi ./openapi.yaml --out ./agentready-output
  agentready scan mcp ./mcp-tools.json --min-score 80 --fail-on critical
  agentready simulate ./agentready-output/agentready.json ./scenario.json --out ./agentready-output

Exit codes:
  0 = pass
  1 = valid scan but policy failed
  2 = invalid input or CLI usage error
  3 = unexpected internal error

Privacy:
  The CLI scans local files only. It does not call live APIs, MCP servers, LLMs, or a hosted TimeProofs backend.
`);
}
