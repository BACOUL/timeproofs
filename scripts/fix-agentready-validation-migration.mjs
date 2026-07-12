import { readFileSync, writeFileSync } from "node:fs";

const file = "scripts/rebuild-agentready-ledger-data.mjs";
let lines = readFileSync(file, "utf8").replace(/\r\n/g, "\n").split("\n");

// The one-time migration originally located the first market IDs inside the M7
// milestone declaration. Remove those misplaced statements before rebuilding.
lines = lines.filter((line) =>
  !line.includes('epic("AR-MARKET-EPIC"')
  && !line.includes('decisionGate("AR-MARKET-EPIC", "AR-MARKET-002"')
);

const firstMarketTask = lines.findIndex((line) =>
  line.includes('decisionGate("AR-MARKET-EPIC","AR-MARKET-001A"')
);
if (firstMarketTask < 0) {
  throw new Error("Could not locate the migrated AR-MARKET-001A task definition.");
}

lines.splice(
  firstMarketTask,
  0,
  'epic("AR-MARKET-EPIC", "M5", "BEFORE_PRO_FIRST_SALE", "MARKET", "Commercial validation and evidence gates", ["AR-MARKET-PILOT-002"]);'
);

const firstSaleTask = lines.findIndex((line) =>
  line.includes('decisionGate("AR-MARKET-EPIC","AR-MARKET-001C"')
);
if (firstSaleTask < 0) {
  throw new Error("Could not locate the migrated AR-MARKET-001C task definition.");
}

lines.splice(
  firstSaleTask,
  0,
  'decisionGate("AR-MARKET-EPIC", "AR-MARKET-002", "M5", "BEFORE_PRO_FIRST_SALE", "MARKET", "Authorize licensing Stripe and account implementation", { decision_ids: [...decisionIds, validationDecisionId], owner: "CODEX_AND_JEASON", depends_on: ["AR-MARKET-001A", "AR-MARKET-001B", "AR-MARKET-001D"], blocks: ["AR-LIC-001"], source_documents: [doc.validation, doc.gtm, doc.pricing, doc.engine], acceptance_criteria: ["ten external Community users gate passed", "three explicit Pro payment signals gate passed at the real price and scope", "credible external value case gate passed", "benchmark and differentiation evidence accepted", "owner authorizes or refuses commercial infrastructure implementation", "continue correct pause pivot or reject decision recorded"], required_evidence: ["commercial infrastructure authorization decision", "ten-user evidence review", "payment-signal evidence review", "value-case evidence review", "benchmark and differentiation review"], metrics: ["external Community users", "30-day reuse", "explicit Pro payment signals", "credible public value cases", "precision", "recall", "false-positive rate", "differentiation evidence"], allowed_outcomes: ["CONTINUE", "CORRECT", "PAUSE", "PIVOT", "REJECT"] });'
);

writeFileSync(file, `${lines.join("\n")}\n`);
console.log("Repaired AgentReady market gate insertion order.");
