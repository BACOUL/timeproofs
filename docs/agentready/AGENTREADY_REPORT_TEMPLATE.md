# TimeProofs AgentReady — Report Template V1

## Objectif

Le **AgentReady Report** est la sortie lisible par humain.

Il doit permettre à un développeur, fondateur ou responsable technique de comprendre rapidement :

1. le score global ;
2. les risques principaux ;
3. pourquoi un agent IA peut échouer ;
4. ce qu'il faut corriger ;
5. quelles actions demandent une confirmation humaine ;
6. ce que contient le fichier `agentready.json`.

## Format

La V1 doit pouvoir générer :

```txt
rapport web
rapport PDF
```

Le contenu doit rester identique entre la page web et l'export PDF.

## Structure officielle

```txt
# TimeProofs AgentReady Report

## Executive Summary

## AgentReady Score

## Top Risks

## Critical Findings

## Recommended Fixes

## Endpoint Details

## Generated AgentReady Contract

## Limitations
```

---

## 1. Executive Summary

Exemple :

```txt
Source: openapi.yaml
OpenAPI version: 3.1.0
Total operations: 24
Score: 72/100
Status: Needs fixes

Conclusion:
This API can be used by AI agents only after fixing high-risk actions and improving tool descriptions.
```

Le résumé doit être compréhensible en moins de 30 secondes.

---

## 2. AgentReady Score

Afficher :

```txt
Score: 72/100
Status: Needs fixes
```

Statuts :

```txt
85-100 : AgentReady
70-84  : Minor fixes
50-69  : Needs fixes
0-49   : Not AgentReady
```

Ajouter une explication courte :

```txt
The score reflects structural risks that may cause AI agents to misuse this API.
```

---

## 3. Top Risks

Afficher les 5 risques les plus importants.

Exemple :

```txt
1. Dangerous refund action without explicit human confirmation.
2. Several parameters are too open-ended.
3. Error responses do not help the agent self-correct.
4. Some operation names are ambiguous.
5. Sensitive customer data may be exposed without clear permission boundaries.
```

Chaque risque doit avoir :

- niveau de sévérité ;
- explication simple ;
- impact agent ;
- correction recommandée.

---

## 4. Critical Findings

Pour chaque finding critique :

```txt
Risk: dangerous_action_without_confirmation
Severity: critical
Endpoint: POST /refunds
Operation: refundCustomer

Why it matters:
An AI agent may trigger a refund without confirming the customer identity, amount or business approval.

Recommended fix:
Require explicit human confirmation and add allowed_when / forbidden_when constraints.
```

---

## 5. Recommended Fixes

Les corrections doivent être actionnables.

Exemple :

```txt
1. Add explicit when-to-use descriptions.
2. Add when-not-to-use constraints.
3. Add enums for status/type/category fields.
4. Add minimum and maximum values for amount/quantity/limit fields.
5. Require human confirmation for destructive or financial actions.
6. Improve 400/422 error messages with corrective guidance.
7. Add verification responses after critical actions.
```

---

## 6. Endpoint Details

Pour chaque opération :

```txt
Method: POST
Path: /refunds
Operation ID: refundCustomer
Action type: REFUND
Risk level: critical
Requires human confirmation: yes
Detected risks:
- dangerous_action_without_confirmation
- unbounded_parameter

Explanation:
This operation can trigger a financial action. The OpenAPI description does not state when an agent is allowed to use it or when it must ask for human confirmation.

Recommended correction:
Add confirmation requirements, max refund amount, forbidden conditions and corrective error responses.
```

---

## 7. Generated AgentReady Contract

Le rapport doit expliquer que `agentready.json` est disponible.

Exemple :

```txt
TimeProofs generated a machine-readable AgentReady contract.
This file can be used later by agent runtimes, CI/CD, MCP marketplaces or internal governance tools.
```

Afficher un extrait :

```json
{
  "operation_id": "refundCustomer",
  "action_type": "REFUND",
  "risk_level": "critical",
  "requires_human_confirmation": true
}
```

---

## 8. Limitations

Texte obligatoire :

```txt
TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
```

Version française possible :

```txt
TimeProofs AgentReady ne garantit pas qu'un agent IA ne se trompera jamais.
Il identifie les risques structurels qui peuvent provoquer une mauvaise utilisation d'une API, d'un outil ou d'un serveur MCP.
```

---

## Ton du rapport

Le rapport doit être :

- clair ;
- technique mais lisible ;
- direct ;
- orienté correction ;
- sans promesse absolue ;
- sans langage juridique excessif.

## Ce que le rapport ne doit pas faire

Le rapport ne doit pas :

- garantir une sécurité absolue ;
- prétendre certifier une conformité légale ;
- appeler automatiquement les endpoints ;
- exposer des secrets détectés ;
- afficher inutilement des données sensibles ;
- donner un faux sentiment de sécurité.

## Exemple de conclusion

```txt
Conclusion:
This API is technically usable, but it is not yet ready for autonomous AI agents. High-risk operations should require human confirmation, and several endpoint descriptions must be improved before exposing these tools to agents.
```
