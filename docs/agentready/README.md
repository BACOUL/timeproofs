# TimeProofs AgentReady — Documentation V1

Ce dossier contient le socle produit officiel de **TimeProofs AgentReady**.

## Vision figée

**TimeProofs AgentReady** est une couche de préparation pré-déploiement pour les APIs, serveurs MCP et outils avant qu'ils soient donnés à des agents IA.

Phrase boussole :

> TimeProofs prépare les outils avant qu'ils soient donnés aux agents IA.

## Positionnement

TimeProofs ne doit pas être positionné comme :

- un runtime firewall ;
- une plateforme cybersécurité IA généraliste ;
- un simple scanner OpenAPI ;
- un simple générateur de PDF ;
- un outil de monitoring agent ;
- une marketplace MCP.

TimeProofs doit être positionné comme :

> **Pre-deployment readiness for AI-agent tools.**

## Fichiers de référence

| Fichier | Rôle |
|---|---|
| `TIMEPROOFS_AGENTREADY_MASTER_PLAN.md` | Document maître stratégique V1 |
| `AGENTREADY_ROADMAP.md` | Roadmap V1 à V6 |
| `AGENTREADY_SCORE_MODEL.md` | Modèle de score /100 |
| `AGENTREADY_RISK_TAXONOMY.md` | Taxonomie des actions et risques |
| `AGENTREADY_JSON_SPEC.md` | Spécification v0.1 du contrat `agentready.json` |
| `AGENTREADY_RULE_CODES.md` | Codes stables AR001-AR010 pour CI Gate |
| `COMMERCIAL_FIXTURE_CI_GATE_BEHAVIOR.md` | Validation bad/fixed du comportement CI Gate |
| `GITHUB_ACTION_USAGE.md` | Utilisation d'AgentReady comme CI Gate dans GitHub Actions |
| `AGENTREADY_REPORT_TEMPLATE.md` | Structure du rapport humain |
| `AGENTREADY_IMPLEMENTATION_CHECKLIST.md` | Checklist fonctionnelle et critères d'acceptation |

## Archive legacy

Les notes historiques, anciennes explorations et références proof/timestamp/verify/tproof sont regroupées sous :

```txt
docs/agentready/legacy/
```

Ce contenu est conservé comme historique uniquement. Il ne définit pas la direction produit active.

## Formule officielle V1

```txt
OpenAPI upload
→ AgentReady analysis
→ AgentReady Score
→ AgentReady Report
→ agentready.json
```

## Règle anti-dispersion

Toute nouvelle idée doit répondre oui à ces questions :

1. Est-ce lié à **Agent Tool Readiness** ?
2. Est-ce une couche **avant** l'utilisation par l'agent ?
3. Est-ce utile pour API, MCP ou tool schema ?
4. Est-ce que cela renforce `agentready.json`, la taxonomie, le score ou le moat ?

Si la réponse est non, l'idée est refusée ou reportée après V1.
