# TimeProofs AgentReady — Document Maître V1

## 1. Définition du projet

**TimeProofs AgentReady** est une couche pré-déploiement qui vérifie, score et prépare les APIs, serveurs MCP et outils avant qu'ils soient donnés à des agents IA.

Le produit répond à une question simple :

> Cet outil est-il prêt à être utilisé par un agent IA sans risque de mauvaise action ?

TimeProofs ne se positionne pas comme un runtime firewall, ni comme une plateforme cybersécurité IA généraliste, ni comme un simple scanner OpenAPI.

TimeProofs se positionne comme :

> **Pre-deployment readiness for AI-agent tools.**

## 2. Phrase produit

### Version anglaise

> See where AI agents will fail before they use your API or MCP tools.

### Version française

> Voyez où les agents IA risquent d'échouer avant qu'ils utilisent votre API ou vos outils MCP.

### Phrase stratégique interne

> Les autres sécurisent l'agent quand il agit. TimeProofs prépare l'outil avant qu'il puisse agir.

## 3. Positionnement V1

La V1 doit faire une seule chose correctement :

```txt
Upload OpenAPI
→ Analyse AgentReady
→ Score /100
→ Rapport humain
→ agentready.json
```

La V1 ne doit pas encore faire :

- scan MCP complet ;
- simulation agentique ;
- runtime guardrail ;
- paiement ;
- comptes utilisateurs complexes ;
- dashboard lourd ;
- certification ;
- marketplace ;
- preuve cryptographique avancée ;
- monitoring après exécution.

## 4. Objectif de la V1

Créer un produit utilisable qui permet à un développeur, une startup IA ou une équipe API de savoir :

1. si son API est claire pour un agent IA ;
2. où un agent risque de se tromper ;
3. quelles actions sont dangereuses ;
4. quels paramètres sont trop libres ;
5. quelles erreurs ne permettent pas à l'agent de se corriger ;
6. quelles validations humaines sont nécessaires ;
7. quel contrat d'usage `agentready.json` peut être généré.

## 5. Entrées V1

La V1 accepte :

```txt
openapi.yaml
openapi.yml
openapi.json
```

Formats supportés :

```txt
OpenAPI 3.0
OpenAPI 3.1
```

La V1 doit refuser proprement :

- fichier vide ;
- fichier non YAML / JSON ;
- fichier trop volumineux ;
- spec invalide ;
- spec sans `paths` ;
- spec sans opérations exploitables ;
- fichier non OpenAPI.

## 6. Sorties V1

La V1 génère 3 sorties principales.

### 6.1 AgentReady Score

Score global sur 100.

Statuts :

```txt
85-100 : AgentReady
70-84  : Minor fixes
50-69  : Needs fixes
0-49   : Not AgentReady
```

### 6.2 AgentReady Report

Rapport lisible par humain.

Il contient :

- résumé exécutif ;
- score global ;
- statut ;
- risques critiques ;
- risques moyens ;
- corrections recommandées ;
- détail endpoint par endpoint ;
- priorités de correction ;
- conclusion claire.

### 6.3 agentready.json

Contrat lisible par machine.

Il décrit :

- nom de l'outil ;
- type d'action ;
- niveau de risque ;
- conditions d'utilisation ;
- conditions interdites ;
- confirmation humaine requise ou non ;
- modes d'échec possibles ;
- recommandations pour agent IA.

## 7. Flux utilisateur V1

### Étape 1 — Page d'accueil AgentReady

Route cible :

```txt
/agentready
```

Message principal :

> Upload your OpenAPI spec. TimeProofs shows where AI agents may fail before they use your tools.

CTA :

```txt
Scan your OpenAPI
```

### Étape 2 — Upload

L'utilisateur ajoute un fichier `openapi.yaml`, `openapi.yml` ou `openapi.json`.

Le produit vérifie :

- format ;
- taille ;
- validité OpenAPI ;
- présence de chemins ;
- présence d'opérations analysables.

### Étape 3 — Analyse

TimeProofs analyse :

- paths ;
- methods ;
- operationId ;
- summary ;
- description ;
- parameters ;
- requestBody ;
- responses ;
- security ;
- tags ;
- schemas.

### Étape 4 — Score

TimeProofs calcule l'**AgentReady Score /100** et classe l'API en :

```txt
AgentReady
Minor fixes
Needs fixes
Not AgentReady
```

### Étape 5 — Rapport

Route cible :

```txt
/agentready/report/[id]
```

Le rapport doit être clair même pour quelqu'un qui ne connaît pas TimeProofs.

### Étape 6 — Export

L'utilisateur peut télécharger :

```txt
AgentReady Report PDF
agentready.json
```

## 8. Pages V1 minimales

```txt
/
/agentready
/agentready/report/[id]
/agentready/download/[id]
/docs/agentready
/examples
```

Pages non nécessaires en V1 :

```txt
/dashboard
/login
/pricing
/team
/api
/certification
/benchmark
```

## 9. Données à ne pas stocker en V1

Pour réduire les risques, la V1 ne doit pas stocker durablement :

- fichiers OpenAPI complets ;
- secrets ;
- tokens ;
- données clients ;
- endpoints privés sensibles ;
- clés API ;
- informations personnelles.

La V1 peut stocker temporairement :

- résultat du scan ;
- score ;
- liste des risques ;
- rapport généré ;
- `agentready.json`.

Si le stockage n'est pas nécessaire, privilégier une génération locale ou session temporaire.

## 10. Sécurité V1

La V1 doit prévoir :

- limite de taille fichier ;
- validation YAML / JSON ;
- nettoyage des entrées ;
- blocage des fichiers non OpenAPI ;
- absence d'exécution de code externe ;
- aucune requête automatique vers les endpoints fournis ;
- aucune analyse active du serveur ;
- pas d'appel API externe sans accord explicite.

Important :

> La V1 analyse une spec. Elle n'exécute pas l'API.

## 11. Limites affichées

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

## 12. Définition finale V1

La V1 officielle est :

```txt
OpenAPI upload
→ AgentReady analysis
→ AgentReady Score
→ AgentReady Report
→ agentready.json
```

La V1 n'est pas :

```txt
un runtime firewall
un outil cybersécurité généraliste
un scanner MCP complet
une preuve de fichier
un dashboard enterprise
une marketplace
```

Phrase boussole :

> TimeProofs prépare les outils avant qu'ils soient donnés aux agents IA.
