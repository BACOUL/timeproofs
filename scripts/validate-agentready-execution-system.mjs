import { readLedger, validateLedger } from "./agentready-execution-lib.mjs";

validateLedger(readLedger(), true);
console.log("AgentReady execution system validation: PASS");
