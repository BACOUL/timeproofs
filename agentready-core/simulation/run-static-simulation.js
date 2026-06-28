import { parseSimulationScenarioDocument } from './parse-simulation-scenario.js';
import { createSimulationResult, createSimulationSummary, SIMULATION_STATUSES, unique } from './simulation-result.js';

export class AgentReadyStaticSimulationError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.name = 'AgentReadyStaticSimulationError';
    this.code = code;
    this.details = details;
  }
}

const RISK_TO_SIMULATION_FINDING = Object.freeze({
  dangerous_action_without_confirmation: 'confirmation_required_but_not_documented',
  irreversible_action: 'irreversible_action_not_safely_guarded',
  unbounded_parameter: 'unsafe_parameter_bounds_missing',
  missing_enum: 'closed_set_validation_missing',
  missing_success_verification: 'success_verification_missing',
  non_corrective_error: 'error_recovery_guidance_missing',
  missing_error_recovery: 'error_recovery_guidance_missing',
  sensitive_data_exposure: 'sensitive_data_boundary_missing',
  overbroad_permission: 'permission_boundary_too_broad',
  mcp_missing_output_schema: 'output_verification_missing',
  mcp_missing_required_fields: 'required_inputs_not_enforced',
  mcp_missing_input_schema: 'required_inputs_not_enforced',
  mcp_empty_input_schema: 'required_inputs_not_enforced',
  mcp_dangerous_tool_weak_description: 'confirmation_required_but_not_documented'
});

const FAILURE_FINDING_HINTS = Object.freeze({
  'unsafe autonomous execution': 'confirmation_required_but_not_documented',
  'wrong or unsafe parameter value': 'unsafe_parameter_bounds_missing',
  'agent cannot verify action success': 'success_verification_missing',
  'wrong tool selection': 'wrong_tool_selection_possible',
  'sensitive data exposure': 'sensitive_data_boundary_missing',
  'agent cannot recover from error': 'error_recovery_guidance_missing'
});

const HIGH_RISK_LEVELS = new Set(['high', 'critical']);

export function runStaticSimulation(agentreadyContract, scenarioDocument, options = {}) {
  validateAgentReadyContract(agentreadyContract);
  const parsedScenarios = normalizeScenarios(scenarioDocument, options);
  const results = parsedScenarios.scenarios.map((scenario) => simulateScenario(agentreadyContract, scenario));
  const sourceType = inferSourceType(agentreadyContract, parsedScenarios.scenarios);

  return createSimulationSummary(results, { source_type: sourceType });
}

function normalizeScenarios(scenarioDocument, options) {
  if (scenarioDocument && Array.isArray(scenarioDocument.scenarios) && scenarioDocument.source?.type === 'simulation_scenarios') {
    return scenarioDocument;
  }

  return parseSimulationScenarioDocument(scenarioDocument, options);
}

function validateAgentReadyContract(contract) {
  if (!contract || typeof contract !== 'object' || Array.isArray(contract)) {
    throw new AgentReadyStaticSimulationError('INVALID_AGENTREADY_CONTRACT', 'agentready.json must be a JSON object.');
  }

  if (!contract.agentready_version) {
    throw new AgentReadyStaticSimulationError('MISSING_AGENTREADY_VERSION', 'agentready.json must include agentready_version.');
  }

  if (!contract.source_type) {
    throw new AgentReadyStaticSimulationError('MISSING_AGENTREADY_SOURCE_TYPE', 'agentready.json must include source_type.');
  }

  if (!Array.isArray(contract.tools)) {
    throw new AgentReadyStaticSimulationError('MISSING_AGENTREADY_TOOLS', 'agentready.json must include tools[].');
  }
}

function simulateScenario(contract, scenario) {
  if (scenario.source_type !== contract.source_type) {
    return createSimulationResult({
      scenario,
      status: SIMULATION_STATUSES.NOT_APPLICABLE,
      findings: ['scenario_source_type_mismatch'],
      recommendation: 'Scenario source_type does not match this AgentReady contract.'
    });
  }

  const match = findMatchingTool(contract.tools, scenario);

  if (!match.tool) {
    return createSimulationResult({
      scenario,
      status: SIMULATION_STATUSES.NOT_APPLICABLE,
      findings: match.findings,
      recommendation: 'No matching operation or tool was found for this scenario.'
    });
  }

  const findings = [...match.findings];
  const mappedRisks = normalizeDetectedRisks(match.tool.detected_risks);

  findings.push(...mapRisksToFindings(mappedRisks));
  findings.push(...mapExpectedFailureModesToFindings(scenario.expected_failure_modes));

  if (scenario.must_require_confirmation && match.tool.requires_human_confirmation !== true) {
    findings.push('confirmation_required_but_not_documented');
  }

  if (scenario.expected_action_type && scenario.expected_action_type !== match.tool.action_type) {
    findings.push('expected_action_type_mismatch');
  }

  if (scenario.required_inputs.length && hasMissingRequiredInputSignal(match.tool, mappedRisks)) {
    findings.push('required_inputs_not_enforced');
  }

  const uniqueFindings = unique(findings);
  const status = determineStatus(match.tool, scenario, uniqueFindings, match.ambiguous);

  return createSimulationResult({
    scenario,
    status,
    matchedTool: match.tool,
    findings: uniqueFindings,
    mappedRisks,
    recommendation: buildRecommendation(status, match.tool, uniqueFindings)
  });
}

function findMatchingTool(tools, scenario) {
  if (scenario.expected_tool) {
    const exactTool = tools.find((tool) => tool.operation_id === scenario.expected_tool);
    if (exactTool) return { tool: exactTool, findings: [], ambiguous: false };

    return {
      tool: null,
      findings: ['expected_tool_not_found'],
      ambiguous: false
    };
  }

  const matches = tools.filter((tool) => tool.action_type === scenario.expected_action_type);

  if (matches.length === 1) return { tool: matches[0], findings: [], ambiguous: false };

  if (matches.length > 1) {
    return {
      tool: matches[0],
      findings: ['multiple_matching_tools_for_action_type'],
      ambiguous: true
    };
  }

  return {
    tool: null,
    findings: ['expected_action_type_not_found'],
    ambiguous: false
  };
}

function normalizeDetectedRisks(risks) {
  return Array.isArray(risks) ? risks.filter(Boolean) : [];
}

function mapRisksToFindings(risks) {
  return risks.map((risk) => RISK_TO_SIMULATION_FINDING[risk]).filter(Boolean);
}

function mapExpectedFailureModesToFindings(failureModes) {
  return (failureModes || []).map((mode) => FAILURE_FINDING_HINTS[mode]).filter(Boolean);
}

function hasMissingRequiredInputSignal(tool, risks) {
  return risks.some((risk) => ['mcp_missing_required_fields', 'mcp_missing_input_schema', 'mcp_empty_input_schema'].includes(risk));
}

function determineStatus(tool, scenario, findings, ambiguous) {
  if (!tool) return SIMULATION_STATUSES.NOT_APPLICABLE;

  if (scenario.expected_action_type !== tool.action_type) {
    return HIGH_RISK_LEVELS.has(tool.risk_level) ? SIMULATION_STATUSES.FAIL : SIMULATION_STATUSES.WARNING;
  }

  if (scenario.must_require_confirmation && tool.requires_human_confirmation !== true) {
    return SIMULATION_STATUSES.FAIL;
  }

  if (HIGH_RISK_LEVELS.has(tool.risk_level)) return SIMULATION_STATUSES.FAIL;

  if (ambiguous || findings.length > 0 || tool.risk_level === 'medium') return SIMULATION_STATUSES.WARNING;

  return SIMULATION_STATUSES.PASS;
}

function buildRecommendation(status, tool, findings) {
  if (status === SIMULATION_STATUSES.PASS) {
    return 'Scenario appears structurally supported by the AgentReady contract.';
  }

  if (status === SIMULATION_STATUSES.NOT_APPLICABLE) {
    return 'No applicable tool was found for this scenario.';
  }

  if (status === SIMULATION_STATUSES.FAIL) {
    if (findings.includes('confirmation_required_but_not_documented')) {
      return 'Do not allow autonomous execution until confirmation requirements are documented and enforced.';
    }

    if (findings.includes('success_verification_missing') || findings.includes('output_verification_missing')) {
      return 'Do not allow autonomous execution until the tool returns a verifiable success or output contract.';
    }

    return 'Do not allow autonomous execution for this scenario before fixing the detected issues.';
  }

  return 'Review the matched tool before broad agent exposure and resolve the simulation warnings.';
}

function inferSourceType(contract, scenarios) {
  if (contract.source_type) return contract.source_type;
  return scenarios.find((scenario) => scenario.source_type)?.source_type || 'unknown';
}
