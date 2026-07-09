import {
  HUMAN_CONFIRMATION_ACTIONS,
  RISK_DEFINITIONS,
  maxRiskLevel
} from './types.js';
import { containsSensitiveTerms } from './classify-action.js';

const VAGUE_OPERATION_NAMES = Object.freeze([
  'getdata',
  'process',
  'handle',
  'manage',
  'update',
  'doaction',
  'execute',
  'run',
  'submit',
  'perform'
]);

const VAGUE_MCP_TOOL_NAMES = Object.freeze([
  'run',
  'execute',
  'process',
  'handle',
  'do',
  'task',
  'tool',
  'action',
  'dotask',
  'do_task',
  'call',
  'invoke'
]);

const CLOSED_STRING_NAMES = Object.freeze([
  'status',
  'type',
  'category',
  'country',
  'currency',
  'language',
  'locale',
  'role',
  'state',
  'mode'
]);

const NUMERIC_BOUND_NAMES = Object.freeze([
  'amount',
  'quantity',
  'limit',
  'price',
  'discount',
  'duration',
  'total',
  'count',
  'max',
  'minimum',
  'maximum'
]);

const SENSITIVE_FIELD_NAMES = Object.freeze([
  'email',
  'phone',
  'address',
  'password',
  'token',
  'secret',
  'api_key',
  'apikey',
  'payment',
  'iban',
  'credit_card',
  'card',
  'ssn',
  'customer_data',
  'personal_data',
  'private'
]);

const ERROR_STATUS_CODES = Object.freeze(['400', '401', '403', '404', '409', '422', '500']);
const READ_ONLY_ACTIONS = Object.freeze(['READ', 'SEARCH', 'LIST', 'HEALTH_CHECK']);
const STATE_CHANGING_ACTIONS = Object.freeze(['CREATE', 'UPDATE', 'DELETE', 'SEND', 'PUBLISH', 'PAY', 'REFUND', 'TRANSFER', 'EXPORT', 'CANCEL']);

export function detectRisks(operation, classification) {
  const findings = [];
  const lowRiskUtility = isLowRiskUtilityOperation(classification);
  const webhookReceiver = classification.action_type === 'WEBHOOK';

  addIf(findings, isUnclearOperationName(operation) && !lowRiskUtility, 'unclear_operation_name', operation);
  addIf(findings, isAmbiguousDescription(operation) && !lowRiskUtility, 'ambiguous_tool_description', operation);
  addIf(findings, !hasWhenToUse(operation) && !lowRiskUtility && !webhookReceiver, 'missing_when_to_use', operation);
  addIf(findings, !hasWhenNotToUse(operation) && !lowRiskUtility && !webhookReceiver, 'missing_when_not_to_use', operation);
  addIf(findings, hasMissingEnum(operation), 'missing_enum', operation);
  addIf(findings, hasUnboundedNumericParameter(operation), 'unbounded_parameter', operation);
  addIf(
    findings,
    HUMAN_CONFIRMATION_ACTIONS.includes(classification.action_type) && !hasHumanConfirmationGuidance(operation),
    'missing_human_confirmation_flow',
    operation
  );
  addIf(findings, isIrreversibleAction(classification.action_type), 'irreversible_action', operation);
  addIf(findings, hasNonCorrectiveErrors(operation, classification), 'non_corrective_error', operation);
  addIf(findings, hasSensitiveDataExposure(operation, classification), 'sensitive_data_exposure', operation);
  addIf(findings, hasOverbroadPermission(operation, classification), 'overbroad_permission', operation);
  addIf(findings, hasLargeUnstructuredResponse(operation), 'large_unstructured_response', operation);
  addIf(findings, needsSuccessVerification(operation, classification), 'missing_success_verification', operation);
  addIf(findings, hasNonCorrectiveErrors(operation, classification), 'missing_error_recovery', operation);
  addIf(findings, hasImplicitContext(operation), 'agent_context_confusion', operation);
  addIf(findings, classification.action_type === 'UNKNOWN', 'unknown_action_type', operation);

  if (isMcpOperation(operation)) {
    addIf(findings, hasVagueMcpToolName(operation), 'mcp_vague_tool_name', operation);
    addIf(findings, hasMissingMcpInputSchema(operation), 'mcp_missing_input_schema', operation);
    addIf(findings, hasEmptyMcpInputSchema(operation), 'mcp_empty_input_schema', operation);
    addIf(findings, hasMissingMcpRequiredFields(operation), 'mcp_missing_required_fields', operation);
    addIf(findings, hasDangerousMcpToolWeakDescription(operation, classification), 'mcp_dangerous_tool_weak_description', operation);
    addIf(findings, hasMissingMcpOutputSchema(operation), 'mcp_missing_output_schema', operation);
  }

  const deduped = dedupeFindings(findings);

  return {
    findings: deduped,
    risk_level: maxRiskLevel(deduped.map((finding) => finding.severity))
  };
}

function addIf(findings, condition, riskCode, operation) {
  if (!condition) return;
  const definition = RISK_DEFINITIONS[riskCode];
  findings.push({
    code: riskCode,
    severity: definition?.severity || 'medium',
    category: definition?.category || 'agent_descriptions',
    explanation: definition?.explanation || 'AgentReady risk detected.',
    recommendation: definition?.recommendation || 'Improve the OpenAPI operation before exposing it to agents.',
    operationId: operation.operationId,
    path: operation.path,
    method: operation.method
  });
}

function isLowRiskUtilityOperation(classification) {
  return classification.action_type === 'HEALTH_CHECK';
}

function isUnclearOperationName(operation) {
  if (!operation.hasExplicitOperationId) return true;
  const normalized = String(operation.operationId || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  if (normalized.length < 5) return true;
  return VAGUE_OPERATION_NAMES.includes(normalized);
}

function isAmbiguousDescription(operation) {
  const description = normalizeText(`${operation.summary || ''} ${operation.description || ''}`);
  return description.length < 80;
}

function hasWhenToUse(operation) {
  const text = normalizeText(`${operation.summary || ''} ${operation.description || ''}`);
  return /use this when|use this only when|when to use|only use|should be used|intended for|use when/.test(text);
}

function hasWhenNotToUse(operation) {
  const text = normalizeText(`${operation.summary || ''} ${operation.description || ''}`);
  return /do not use|should not|must not|forbidden|not for|unless|only if|requires|require/.test(text);
}

function hasHumanConfirmationGuidance(operation) {
  const text = normalizeText(`${operation.summary || ''} ${operation.description || ''}`);
  return /human confirmation|manual approval|explicit approval|requires approval|confirm before|approval required|review before|preview before|dry run/.test(text);
}

function hasMissingEnum(operation) {
  return getAllFields(operation).some((field) => {
    const name = normalizeName(field.name);
    const type = field.type || field.schema?.type;
    return type === 'string' && !field.enum && CLOSED_STRING_NAMES.some((candidate) => name.endsWith(candidate) || name.includes(candidate));
  });
}

function hasUnboundedNumericParameter(operation) {
  return getAllFields(operation).some((field) => {
    const name = normalizeName(field.name);
    const type = field.type || field.schema?.type;
    const looksNumeric = ['number', 'integer'].includes(type) || NUMERIC_BOUND_NAMES.some((candidate) => name.includes(candidate));
    if (!looksNumeric) return false;
    const hasMin = field.minimum !== undefined || field.schema?.minimum !== undefined;
    const hasMax = field.maximum !== undefined || field.schema?.maximum !== undefined;
    return NUMERIC_BOUND_NAMES.some((candidate) => name.includes(candidate)) && (!hasMin || !hasMax);
  });
}

function isIrreversibleAction(actionType) {
  return ['DELETE', 'PAY', 'REFUND', 'TRANSFER', 'PUBLISH', 'CANCEL'].includes(actionType);
}

function hasNonCorrectiveErrors(operation, classification) {
  if (classification.action_type === 'HEALTH_CHECK') return false;

  const responses = operation.responses || [];
  const availableErrorResponses = responses.filter((response) => ERROR_STATUS_CODES.includes(String(response.statusCode)));

  if (availableErrorResponses.length === 0) {
    return !READ_ONLY_ACTIONS.includes(classification.action_type);
  }

  return availableErrorResponses.some((response) => {
    const description = normalizeText(response.description || '');
    if (description.length < 30) return true;
    return !/missing|required|invalid|provide|retry|permission|not found|conflict|correct|expected/.test(description);
  });
}

function hasSensitiveDataExposure(operation, classification) {
  if (classification.action_type === 'HEALTH_CHECK') return false;
  if (classification.action_type === 'WEBHOOK' && hasWebhookSafetyBoundary(operation)) return false;

  if (containsSensitiveTerms(operation)) return true;

  return getAllFields(operation).some((field) => {
    const name = normalizeName(field.name);
    return SENSITIVE_FIELD_NAMES.some((candidate) => name.includes(candidate));
  });
}

function hasOverbroadPermission(operation, classification) {
  const sensitive = hasSensitiveDataExposure(operation, classification);
  const highRiskAction = ['DELETE', 'SEND', 'PUBLISH', 'PAY', 'REFUND', 'TRANSFER', 'EXPORT', 'AUTH', 'SENSITIVE_DATA'].includes(
    classification.action_type
  );
  return (sensitive || highRiskAction) && !operation.hasSecurity;
}

function hasLargeUnstructuredResponse(operation) {
  if (operation.method !== 'GET') return false;
  const pathSuggestsCollection = /list|search|all|customers|users|orders|files|events|logs|items/i.test(
    `${operation.operationId} ${operation.path} ${operation.summary}`
  );
  const hasLimit = getAllFields(operation).some((field) => ['limit', 'page', 'perpage', 'pagesize', 'cursor'].includes(normalizeName(field.name)));
  const hasStructuredResponse = (operation.responses || []).some((response) => response.hasContent && response.schemaTypes.length > 0);
  return pathSuggestsCollection && (!hasLimit || !hasStructuredResponse);
}

function needsSuccessVerification(operation, classification) {
  if (!STATE_CHANGING_ACTIONS.includes(classification.action_type)) {
    return false;
  }

  const successResponses = (operation.responses || []).filter((response) => /^2\d\d$/.test(String(response.statusCode)));
  if (successResponses.length === 0) return true;

  const text = normalizeText(successResponses.map((response) => response.description).join(' '));
  return !/success|created|updated|deleted|sent|published|verified|completed|accepted|id|status/.test(text);
}

function hasImplicitContext(operation) {
  const text = normalizeText(`${operation.summary || ''} ${operation.description || ''} ${operation.path || ''}`);
  return /current user|current account|current tenant|active workspace|default project|selected environment|my account|\bme\b/.test(text);
}

function hasWebhookSafetyBoundary(operation) {
  const text = normalizeText(`${operation.summary || ''} ${operation.description || ''} ${(operation.responses || []).map((response) => response.description || '').join(' ')}`);
  return /signature verification|valid signature|idempotency|idempotent|event provider|not intended to be called by autonomous agents|not called autonomously/.test(text);
}

function isMcpOperation(operation) {
  return operation.source === 'mcp' || Boolean(operation.mcp);
}

function hasVagueMcpToolName(operation) {
  const normalized = normalizeName(operation.mcp?.tool_name || operation.operationId);
  return VAGUE_MCP_TOOL_NAMES.includes(normalized);
}

function hasMissingMcpInputSchema(operation) {
  return operation.mcp?.has_input_schema === false;
}

function hasEmptyMcpInputSchema(operation) {
  if (operation.mcp?.has_input_schema === false) return false;
  return Number(operation.mcp?.input_properties_count || 0) === 0;
}

function hasMissingMcpRequiredFields(operation) {
  const propertyCount = Number(operation.mcp?.input_properties_count || 0);
  const required = operation.mcp?.input_required || [];
  return propertyCount > 0 && required.length === 0;
}

function hasDangerousMcpToolWeakDescription(operation, classification) {
  if (!HUMAN_CONFIRMATION_ACTIONS.includes(classification.action_type)) return false;
  const text = normalizeText(`${operation.summary || ''} ${operation.description || ''}`);
  if (text.length < 140) return true;
  return !/human confirmation|manual approval|explicit approval|confirm before|preview|dry run|rollback|do not use|should not|must not|success|verified|completed/.test(text);
}

function hasMissingMcpOutputSchema(operation) {
  return operation.mcp?.has_output_schema === false;
}

function getAllFields(operation) {
  return [...(operation.parameters || []), ...(operation.requestFields || [])];
}

function normalizeText(value) {
  return String(value || '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
}

function normalizeName(value) {
  return String(value || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

function dedupeFindings(findings) {
  const seen = new Set();
  return findings.filter((finding) => {
    const key = `${finding.code}:${finding.method}:${finding.path}:${finding.operationId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
