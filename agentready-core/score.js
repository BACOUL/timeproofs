import { SCORE_WEIGHTS, getStatusForScore } from './types.js';

const DEDUCTION_BY_SEVERITY = Object.freeze({
  low: 1,
  medium: 3,
  high: 6,
  critical: 10
});

export function calculateAgentReadyScore(analyzedOperations) {
  const categoryScores = createInitialCategoryScores();
  const allFindings = analyzedOperations.flatMap((operation) => operation.findings || []);

  for (const finding of allFindings) {
    const category = finding.category || 'agent_descriptions';
    if (!(category in categoryScores)) continue;
    categoryScores[category] = Math.max(0, categoryScores[category] - (DEDUCTION_BY_SEVERITY[finding.severity] || 3));
  }

  if (!hasVersionTraceability(analyzedOperations)) {
    categoryScores.version_traceability = Math.max(0, categoryScores.version_traceability - 3);
  }

  const rawScore = Object.values(categoryScores).reduce((sum, value) => sum + value, 0);
  const score = Math.max(0, Math.min(100, Math.round(rawScore)));

  return {
    score,
    status: getStatusForScore(score),
    category_scores: categoryScores,
    risk_counts: countRisks(allFindings),
    total_findings: allFindings.length
  };
}

function createInitialCategoryScores() {
  return Object.fromEntries(Object.entries(SCORE_WEIGHTS));
}

function countRisks(findings) {
  return findings.reduce(
    (counts, finding) => {
      const severity = finding.severity || 'medium';
      counts[severity] = (counts[severity] || 0) + 1;
      return counts;
    },
    { critical: 0, high: 0, medium: 0, low: 0 }
  );
}

function hasVersionTraceability(operations) {
  if (!Array.isArray(operations) || operations.length === 0) return false;
  return operations.every((operation) => Boolean(operation.operationId));
}
