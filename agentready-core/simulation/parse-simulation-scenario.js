export class AgentReadySimulationScenarioError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.name = 'AgentReadySimulationScenarioError';
    this.code = code;
    this.details = details;
  }
}

const ALLOWED_SOURCE_TYPES = new Set(['openapi', 'mcp']);

export function parseSimulationScenarioText(text, options = {}) {
  let document;

  try {
    document = JSON.parse(text);
  } catch (error) {
    throw new AgentReadySimulationScenarioError('INVALID_SIMULATION_JSON', 'Simulation scenario JSON could not be parsed.', {
      filename: options.filename || 'simulation-scenario.json',
      parser_message: error.message
    });
  }

  return parseSimulationScenarioDocument(document, options);
}

export function parseSimulationScenarioDocument(document, options = {}) {
  const scenarios = normalizeScenarioList(document, options);

  if (scenarios.length === 0) {
    throw new AgentReadySimulationScenarioError('EMPTY_SIMULATION_SCENARIOS', 'Simulation scenarios must not be empty.', {
      filename: options.filename || 'simulation-scenario.json'
    });
  }

  const validated = scenarios.map((scenario, index) => validateScenario(scenario, index));

  return {
    source: {
      type: 'simulation_scenarios',
      filename: options.filename || 'simulation-scenario.json',
      scenarios_total: validated.length
    },
    scenarios: validated
  };
}

function normalizeScenarioList(document, options) {
  if (Array.isArray(document)) return document;

  if (document && Array.isArray(document.scenarios)) return document.scenarios;

  if (document && typeof document === 'object') return [document];

  throw new AgentReadySimulationScenarioError('INVALID_SIMULATION_SCENARIO_SHAPE', 'Simulation scenario JSON must be an object, an array, or an object with scenarios[].', {
    filename: options.filename || 'simulation-scenario.json'
  });
}

function validateScenario(scenario, index) {
  if (!scenario || typeof scenario !== 'object' || Array.isArray(scenario)) {
    throw new AgentReadySimulationScenarioError('INVALID_SIMULATION_SCENARIO', 'Each simulation scenario must be a JSON object.', { index });
  }

  assertNonEmptyString(scenario.scenario_id, 'MISSING_SCENARIO_ID', 'scenario_id is required.', index);
  assertNonEmptyString(scenario.source_type, 'MISSING_SOURCE_TYPE', 'source_type is required.', index);

  if (!ALLOWED_SOURCE_TYPES.has(scenario.source_type)) {
    throw new AgentReadySimulationScenarioError('UNSUPPORTED_SOURCE_TYPE', 'source_type must be openapi or mcp.', {
      index,
      scenario_id: scenario.scenario_id,
      source_type: scenario.source_type
    });
  }

  assertNonEmptyString(scenario.user_task, 'MISSING_USER_TASK', 'user_task is required.', index, scenario.scenario_id);
  assertNonEmptyString(scenario.expected_action_type, 'MISSING_EXPECTED_ACTION_TYPE', 'expected_action_type is required.', index, scenario.scenario_id);

  if (typeof scenario.must_require_confirmation !== 'boolean') {
    throw new AgentReadySimulationScenarioError('MISSING_CONFIRMATION_FLAG', 'must_require_confirmation must be a boolean.', {
      index,
      scenario_id: scenario.scenario_id
    });
  }

  if (!Array.isArray(scenario.expected_failure_modes)) {
    throw new AgentReadySimulationScenarioError('MISSING_EXPECTED_FAILURE_MODES', 'expected_failure_modes must be an array.', {
      index,
      scenario_id: scenario.scenario_id
    });
  }

  return {
    scenario_id: scenario.scenario_id,
    source_type: scenario.source_type,
    user_task: scenario.user_task,
    expected_action_type: scenario.expected_action_type,
    expected_tool: normalizeOptionalString(scenario.expected_tool),
    must_require_confirmation: scenario.must_require_confirmation,
    required_inputs: normalizeStringArray(scenario.required_inputs),
    forbidden_if: normalizeStringArray(scenario.forbidden_if),
    expected_failure_modes: normalizeStringArray(scenario.expected_failure_modes)
  };
}

function assertNonEmptyString(value, code, message, index, scenarioId = null) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new AgentReadySimulationScenarioError(code, message, {
      index,
      scenario_id: scenarioId
    });
  }
}

function normalizeOptionalString(value) {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function normalizeStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => typeof item === 'string' && item.trim()).map((item) => item.trim());
}
