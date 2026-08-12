export const TIMEPROOFS_ENFORCEMENT_CONTRACT_VERSION = 'timeproofs.enforcement.v0.1';

export const DEFAULT_FINANCIAL_POLICY = Object.freeze({
  policy_id: 'timeproofs.financial.fail-closed.v0.1',
  deny_on: Object.freeze(['BLOCK', 'UNKNOWN']),
  on_error: 'ERROR'
});

const VERIFICATION_DECISIONS = new Set(['PASS', 'WARN', 'BLOCK', 'UNKNOWN']);

export function normalizeEnforcementPolicy(policy = DEFAULT_FINANCIAL_POLICY) {
  const value = policy ?? DEFAULT_FINANCIAL_POLICY;
  const denyOn = value.deny_on ?? value.block ?? DEFAULT_FINANCIAL_POLICY.deny_on;
  const onError = value.on_error ?? DEFAULT_FINANCIAL_POLICY.on_error;
  if (!Array.isArray(denyOn) || denyOn.some(x => !VERIFICATION_DECISIONS.has(x))) {
    throw new TypeError('policy.deny_on must contain only PASS, WARN, BLOCK or UNKNOWN');
  }
  if (!['ERROR', 'ALLOW'].includes(onError)) throw new TypeError('policy.on_error must be ERROR or ALLOW');
  return Object.freeze({
    policy_id: value.policy_id ?? (onError === 'ALLOW' || !denyOn.includes('UNKNOWN') ? 'caller-explicit-fail-open' : DEFAULT_FINANCIAL_POLICY.policy_id),
    deny_on: Object.freeze([...new Set(denyOn)]),
    on_error: onError
  });
}

export function applyEnforcementPolicy(verification, policy = DEFAULT_FINANCIAL_POLICY) {
  if (!verification || !VERIFICATION_DECISIONS.has(verification.decision)) {
    throw new TypeError('verification.decision must be PASS, WARN, BLOCK or UNKNOWN');
  }
  const normalized = normalizeEnforcementPolicy(policy);
  const denied = normalized.deny_on.includes(verification.decision);
  return {
    enforcement_contract_version: TIMEPROOFS_ENFORCEMENT_CONTRACT_VERSION,
    state: denied ? 'DENY' : 'ALLOW',
    allowed: !denied,
    verification_decision: verification.decision,
    reason_code: denied ? `POLICY_DENY_${verification.decision}` : `POLICY_ALLOW_${verification.decision}`,
    policy: normalized,
    verification
  };
}

export function enforcementError(error, policy = DEFAULT_FINANCIAL_POLICY) {
  const normalized = normalizeEnforcementPolicy(policy);
  const explicitAllow = normalized.on_error === 'ALLOW';
  return {
    enforcement_contract_version: TIMEPROOFS_ENFORCEMENT_CONTRACT_VERSION,
    state: explicitAllow ? 'ALLOW' : 'ERROR',
    allowed: explicitAllow,
    verification_decision: 'UNKNOWN',
    reason_code: explicitAllow ? 'EXPLICIT_POLICY_ALLOW_ON_ERROR' : 'ENFORCEMENT_EVALUATION_ERROR',
    policy: normalized,
    verification: {
      decision: 'UNKNOWN',
      results: [],
      error: { code: error?.code ?? 'RUNTIME_ERROR', message: error?.message ?? 'Enforcement evaluation failed.' }
    }
  };
}
