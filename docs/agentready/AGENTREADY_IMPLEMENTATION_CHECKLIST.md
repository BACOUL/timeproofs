# TimeProofs AgentReady — Implementation Checklist V1

## Objectif

Ce document liste les modules, critères d'acceptation et tests obligatoires pour construire la V1 sans manque ni dérive produit.

La V1 officielle est :

```txt
OpenAPI upload
→ AgentReady analysis
→ AgentReady Score
→ AgentReady Report
→ agentready.json
```

## Modules de construction

Construire dans cet ordre :

```txt
1. Parser OpenAPI
2. Extracteur d'opérations
3. Classification des actions
4. Détection des risques
5. Score AgentReady
6. Génération du rapport
7. Génération agentready.json
8. Page upload
9. Page rapport
10. Export PDF / JSON
11. Tests fixtures
```

## Architecture fonctionnelle recommandée

```txt
/lib/agentready/
  parse-openapi.ts
  extract-operations.ts
  classify-action.ts
  detect-risks.ts
  score.ts
  generate-report.ts
  generate-agentready-json.ts
  types.ts

/app/agentready/
  page.tsx

/app/agentready/report/[id]/
  page.tsx

/docs/agentready/
  README.md
  TIMEPROOFS_AGENTREADY_MASTER_PLAN.md
  AGENTREADY_ROADMAP.md
  AGENTREADY_SCORE_MODEL.md
  AGENTREADY_RISK_TAXONOMY.md
  AGENTREADY_JSON_SPEC.md
  AGENTREADY_REPORT_TEMPLATE.md
  AGENTREADY_IMPLEMENTATION_CHECKLIST.md
```

Cette architecture devra être adaptée à la structure réelle du repo existant après audit technique.

## Entrées à supporter

```txt
openapi.yaml
openapi.yml
openapi.json
```

Formats :

```txt
OpenAPI 3.0
OpenAPI 3.1
```

## Cas à refuser proprement

- fichier vide ;
- fichier non YAML / JSON ;
- fichier trop volumineux ;
- JSON invalide ;
- YAML invalide ;
- document sans champ `openapi` ;
- document sans `paths` ;
- spec sans opérations analysables ;
- fichier contenant du code exécutable ;
- tentative d'upload d'un type non autorisé.

## Règles V1 obligatoires

La V1 doit détecter au minimum :

```txt
unclear_operation_name
ambiguous_tool_description
missing_when_to_use
missing_when_not_to_use
unbounded_parameter
missing_enum
dangerous_action_without_confirmation
irreversible_action
non_corrective_error
sensitive_data_exposure
overbroad_permission
large_unstructured_response
missing_success_verification
missing_error_recovery
agent_context_confusion
unknown_action_type
```

## Critères d'acceptation V1

La V1 ne peut être considérée comme terminée que si :

```txt
1. OpenAPI JSON fonctionne.
2. OpenAPI YAML fonctionne.
3. Une spec invalide est refusée proprement.
4. Une spec sans paths est refusée proprement.
5. Au moins 12 risques AgentReady sont détectables.
6. Chaque risque a une explication.
7. Chaque risque a une recommandation.
8. Le score global est calculé.
9. Le statut est affiché.
10. Le rapport web est lisible.
11. Le rapport PDF est exportable.
12. agentready.json est exportable.
13. Les actions dangereuses sont classées.
14. Les confirmations humaines nécessaires sont détectées.
15. Les erreurs non correctives sont détectées.
16. Aucun endpoint externe n'est appelé.
17. Aucune clé ou donnée sensible n'est affichée inutilement.
18. Le produit explique clairement sa limite.
```

## Tests fixtures obligatoires

Prévoir au minimum :

```txt
valid-simple-openapi.json
valid-complex-openapi.yaml
invalid-json.json
invalid-yaml.yaml
empty-openapi.json
no-paths-openapi.yaml
dangerous-actions-openapi.yaml
sensitive-data-openapi.yaml
missing-descriptions-openapi.yaml
good-agentready-openapi.yaml
```

## Tests à vérifier

```txt
parsing JSON
parsing YAML
invalid file handling
extract operations
classify action type
detect unclear operation name
detect missing descriptions
detect missing when-to-use
detect missing enum
detect unbounded parameter
detect dangerous action
detect human confirmation required
detect sensitive data exposure
detect non-corrective errors
calculate score
generate report
generate agentready.json
export PDF
export JSON
```

## Règles de sécurité V1

1. Ne jamais exécuter de code fourni par l'utilisateur.
2. Ne jamais appeler automatiquement les endpoints de la spec.
3. Ne jamais tester activement un serveur externe sans accord explicite.
4. Limiter la taille du fichier uploadé.
5. Nettoyer les erreurs affichées à l'utilisateur.
6. Éviter d'afficher des secrets ou tokens complets.
7. Ne pas stocker durablement la spec complète si ce n'est pas nécessaire.
8. Préférer des résultats temporaires en session.

## Données à ne pas stocker durablement

- OpenAPI complet ;
- secrets ;
- tokens ;
- données clients ;
- endpoints privés sensibles ;
- clés API ;
- informations personnelles.

## Textes obligatoires dans l'interface

Version anglaise :

```txt
TimeProofs AgentReady does not guarantee that an AI agent will never fail.
It identifies structural risks that may cause AI agents to misuse APIs, tools or MCP servers.
```

Version française :

```txt
TimeProofs AgentReady ne garantit pas qu'un agent IA ne se trompera jamais.
Il identifie les risques structurels qui peuvent provoquer une mauvaise utilisation d'une API, d'un outil ou d'un serveur MCP.
```

## Règles anti-dispersion pour les PRs

Une PR V1 doit être refusée si elle :

- ajoute une fonctionnalité non liée à Agent Tool Readiness ;
- transforme le produit en runtime firewall ;
- ajoute MCP complet avant OpenAPI stable ;
- ajoute un dashboard complexe avant le moteur ;
- ajoute le paiement avant que le scan soit utile ;
- place la preuve TimeProofs comme promesse principale ;
- casse les pages existantes sans justification ;
- modifie le produit legacy sans audit.

## Ordre recommandé des PRs techniques

### PR 1 — Documentation V1

- documents maîtres ;
- roadmap ;
- score model ;
- taxonomie ;
- spec `agentready.json` ;
- template rapport ;
- checklist.

### PR 2 — Audit du repo existant

- architecture actuelle ;
- pages existantes ;
- composants réutilisables ;
- logique proof/hash existante ;
- routes existantes ;
- risques de régression.

### PR 3 — Core AgentReady

- parser OpenAPI ;
- extracteur d'opérations ;
- types internes ;
- fixtures tests.

### PR 4 — Risk Engine

- classification action type ;
- détection risques V1 ;
- recommandations ;
- tests.

### PR 5 — Scoring + JSON

- score /100 ;
- statuts ;
- génération `agentready.json` ;
- tests.

### PR 6 — UI V1

- page upload ;
- page rapport ;
- affichage risques ;
- export JSON.

### PR 7 — PDF Export + Polish

- export PDF ;
- limites affichées ;
- exemples ;
- vérification finale.

## Définition de “terminé”

La V1 est terminée seulement si un utilisateur peut :

```txt
1. Aller sur /agentready.
2. Uploader une spec OpenAPI valide.
3. Obtenir un score AgentReady.
4. Lire un rapport clair.
5. Télécharger agentready.json.
6. Télécharger le rapport PDF.
7. Comprendre les limites du produit.
```

Et si le système :

```txt
1. Refuse proprement les fichiers invalides.
2. Ne lance aucune requête externe.
3. Ne stocke pas durablement de secrets.
4. Applique les règles V1 documentées.
5. Produit un résultat déterministe.
```
