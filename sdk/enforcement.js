export const TIMEPROOFS_ENFORCEMENT_CONTRACT_VERSION = 'timeproofs.enforcement.v0.1';

export const DEFAULT_FINANCIAL_POLICY = Object.freeze({
  policy_id: 'timeproofs.financial.fail-closed.v0.1',
  deny_on: Object.freeze(['BLOCK', 'UNKNOWN']),
  on_error: 'ERROR'
});

const VERIFICATION_DECISIONS = new Set(['PASS', 'WARN', 'BLOCK', 'UNKNOWN']);

function isPlainObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function isLessRestrictiveThanDefault(denyOn, onError) {
  return onError === 'ALLOW' || !denyOn.includes('BLOCK') || !denyOn.includes('UNKNOWN');
}

export function normalizeEnforcementPolicy(policy = DEFAULT_FINANCIAL_POLICY) {
  const value = policy ?? DEFAULT_FINANCIAL_POLICY;
  if (!isPlainObject(value)) throw new TypeError('policy must be a plain object');

  const denyOn = value.deny_on ?? value.block ?? DEFAULT_FINANCIAL_POLICY.deny_on;
  const onError = value.on_error ?? DEFAULT_FINANCIAL_POLICY.on_error;
  if (!Array.isArray(denyOn) || denyOn.some(x => !VERIFICATION_DECISIONS.has(x))) {
    throw new TypeError('policy.deny_on must contain only PASS, WARN, BLOCK or UNKNOWN');
  }
  if (!['ERROR', 'ALLOW'].includes(onError)) throw new TypeError('policy.on_error must be ERROR or ALLOW');

  const deduped = [...new Set(denyOn)];
  const lessRestrictive = isLessRestrictiveThanDefault(deduped, onError);
  const suppliedPolicyId = value.policy_id;
  if (suppliedPolicyId != null && (typeof suppliedPolicyId !== 'string' || suppliedPolicyId.trim().length === 0)) {
    throw new TypeError('policy.policy_id must be a non-empty string when supplied');
  }
  if (lessRestrictive && !suppliedPolicyId) {
    throw new TypeError('a less-restrictive/fail-open policy requires an explicit policy_id');
  }

  return Object.freeze({
    policy_id: suppliedPolicyId ?? DEFAULT_FINANCIAL_POLICY.policy_id,
    deny_on: Object.freeze(deduped),
    on_error: onError
  });
}

export function applyEnforcementPolicy(verification, policy = DEFAULT_FINANCIAL_POLICY) {
  if (!verification || !VERIFICATION_DECISIONS.has(verification.decision)) {
    throw new TypeError('verification.decision must be PASS, WARN, BLOCK or UNKNOWN');
  }
  const normalized = normalizeEnforcementPolicy(policy);
  const denied = normalized.deny_on.includes(verification.decision);
  return Object.freeze({
    enforcement_contract_version: TIMEPROOFS_ENFORCEMENT_CONTRACT_VERSION,
    state: denied ? 'DENY' : 'ALLOW',
    allowed: !denied,
    verification_decision: verification.decision,
    reason_code: denied ? `POLICY_DENY_${verification.decision}` : `POLICY_ALLOW_${verification.decision}`,
    policy: normalized,
    verification
  });
}

export function enforcementError(error, policy = DEFAULT_FINANCIAL_POLICY) {
  const normalized = normalizeEnforcementPolicy(policy);
  const explicitAllow = normalized.on_error === 'ALLOW';
  return Object.freeze({
    enforcement_contract_version: TIMEPROOFS_ENFORCEMENT_CONTRACT_VERSION,
    state: explicitAllow ? 'ALLOW' : 'ERROR',
    allowed: explicitAllow,
    verification_decision: 'UNKNOWN',
    reason_code: explicitAllow ? 'EXPLICIT_POLICY_ALLOW_ON_ERROR' : 'ENFORCEMENT_EVALUATION_ERROR',
    policy: normalized,
    verification: Object.freeze({
      decision: 'UNKNOWN',
      results: Object.freeze([]),
      error: Object.freeze({ code: error?.code ?? 'RUNTIME_ERROR', message: error?.message ?? 'Enforcement evaluation failed.' })
    })
  });
}
