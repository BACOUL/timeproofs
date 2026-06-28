export const SIMULATION_VERSION = '0.1';

export const SIMULATION_STATUSES = Object.freeze({
  PASS: 'pass',
  WARNING: 'warning',
  FAIL: 'fail',
  NOT_APPLICABLE: 'not_applicable'
});

export function createSimulationSummary(results, options = {}) {
  const counts = results.reduce((accumulator, result) => {
    accumulator[result.result] = (accumulator[result.result] || 0) + 1;
    return accumulator;
  }, {});

  return {
    simulation_version: SIMULATION_VERSION,
    generated_at: new Date().toISOString(),
    source_type: options.source_type || 'unknown',
    scenarios_total: results.length,
    pass: counts.pass || 0,
    warning: counts.warning || 0,
    fail: counts.fail || 0,
    not_applicable: counts.not_applicable || 0,
    results
  };
}

export function createSimulationResult({
  scenario,
  status,
  matchedTool = null,
  findings = [],
  mappedRisks = [],
  recommendation
}) {
  return {
    scenario_id: scenario.scenario_id,
    result: status,
    matched_tool: matchedTool?.operation_id || null,
    matched_action_type: matchedTool?.action_type || null,
    simulation_findings: unique(findings),
    mapped_agentready_risks: unique(mappedRisks),
    recommendation: recommendation || buildDefaultRecommendation(status)
  };
}

export function unique(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function buildDefaultRecommendation(status) {
  if (status === SIMULATION_STATUSES.PASS) return 'Scenario appears structurally supported by the AgentReady contract.';
  if (status === SIMULATION_STATUSES.WARNING) return 'Review the matched tool before broad agent exposure.';
  if (status === SIMULATION_STATUSES.FAIL) return 'Do not allow autonomous execution for this scenario before fixing the detected issues.';
  return 'No applicable tool was found for this scenario.';
}
