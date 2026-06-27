# TimeProofs AgentReady — Score Model V1

## Objectif

Le **AgentReady Score** mesure si une API, un serveur MCP ou un outil est prêt à être utilisé par un agent IA.

Le score ne mesure pas seulement la qualité technique de l'API. Il mesure surtout :

> La capacité d'un agent IA à comprendre, choisir, paramétrer, limiter et vérifier l'usage d'un outil.

## Score global

Score total : **100 points**.

| Catégorie | Points |
|---|---:|
| Noms d'outils et endpoints clairs | 10 |
| Descriptions utiles pour agents | 15 |
| Présence “when to use / when not to use” | 15 |
| Paramètres stricts et bornés | 15 |
| Erreurs auto-correctives | 10 |
| Actions dangereuses encadrées | 15 |
| Permissions et données sensibles | 10 |
| Réponses lisibles par agent | 5 |
| Version, traçabilité et stabilité | 5 |

## Statuts

```txt
85-100 : AgentReady
70-84  : Minor fixes
50-69  : Needs fixes
0-49   : Not AgentReady
```

## Catégorie 1 — Noms d'outils et endpoints clairs

### Poids

10 points.

### Objectif

Un agent doit comprendre l'intention d'une opération sans ambiguïté.

### Pénalités

- operationId absent ;
- operationId trop générique ;
- endpoint nommé avec des verbes vagues ;
- plusieurs endpoints très similaires sans différenciation claire.

### Exemples à risque

```txt
getData
process
handle
manage
update
doAction
execute
run
submit
```

## Catégorie 2 — Descriptions utiles pour agents

### Poids

15 points.

### Objectif

La description doit aider l'agent à décider si l'outil est adapté à la tâche.

### Pénalités

- description absente ;
- description trop courte ;
- description purement technique ;
- description sans contexte métier ;
- description qui ne distingue pas les cas d'usage.

## Catégorie 3 — When to use / when not to use

### Poids

15 points.

### Objectif

L'agent doit savoir quand utiliser et quand ne pas utiliser l'outil.

### Bonnes pratiques

Inclure des formulations proches de :

```txt
Use this when...
Do not use this when...
This operation should only be used if...
Requires human confirmation when...
```

## Catégorie 4 — Paramètres stricts et bornés

### Poids

15 points.

### Objectif

Réduire les erreurs de paramètres.

### Pénalités

- `string` sans enum pour un statut, type, rôle, devise, langue ou catégorie ;
- nombre sans minimum / maximum pour montant, quantité, limite ou durée ;
- paramètre requis non marqué comme required ;
- paramètres sensibles non documentés ;
- valeurs libres alors que le domaine est fermé.

## Catégorie 5 — Erreurs auto-correctives

### Poids

10 points.

### Objectif

Une erreur doit aider l'agent à se corriger.

### Mauvais exemple

```txt
400 Bad Request
```

### Bon exemple

```txt
Missing required field: customer_id. Provide a valid customer_id before retrying.
```

## Catégorie 6 — Actions dangereuses encadrées

### Poids

15 points.

### Objectif

Les actions irréversibles, financières, externes ou sensibles doivent être limitées.

### Actions concernées

```txt
DELETE
SEND
PUBLISH
PAY
REFUND
TRANSFER
EXPORT
CANCEL
TERMINATE
DISABLE
```

### Pénalités

- absence de confirmation humaine ;
- absence de preview ;
- absence de limite ;
- absence de vérification post-action ;
- action irréversible non signalée.

## Catégorie 7 — Permissions et données sensibles

### Poids

10 points.

### Objectif

L'agent ne doit pas obtenir plus de droits ou de données que nécessaire.

### Pénalités

- schéma security absent ;
- permissions trop larges ;
- endpoint exposant des données sensibles sans limites ;
- accès à secrets, tokens, paiements ou données personnelles sans règle claire.

## Catégorie 8 — Réponses lisibles par agent

### Poids

5 points.

### Objectif

Les réponses doivent être structurées, limitées et exploitables.

### Pénalités

- réponse très large ;
- absence de pagination ;
- payload non structuré ;
- champs ambigus ;
- mélange d'informations utiles et non utiles.

## Catégorie 9 — Version, traçabilité et stabilité

### Poids

5 points.

### Objectif

Un agent et un runtime doivent savoir quelle version de l'outil est analysée.

### Pénalités

- version absente ;
- spec instable ;
- absence d'ID d'opération ;
- absence de conventions stables ;
- absence d'information de dépréciation.

## Calcul V1

Le score V1 doit être déterministe : une même spec doit produire le même score.

La V1 ne doit pas dépendre d'un modèle IA externe pour calculer le score de base.

Les règles peuvent être heuristiques au début, mais elles doivent être explicites, testables et documentées.

## Interprétation

| Score | Statut | Interprétation |
|---:|---|---|
| 85-100 | AgentReady | L'outil semble prêt pour un agent sous conditions normales. |
| 70-84 | Minor fixes | Quelques corrections recommandées avant exposition. |
| 50-69 | Needs fixes | Risques significatifs, exposition agent déconseillée sans correction. |
| 0-49 | Not AgentReady | L'outil est trop ambigu ou dangereux pour un agent autonome. |

## Règle importante

Le score ne doit jamais être présenté comme une garantie absolue.

Formulation obligatoire :

> TimeProofs identifies structural risks that may cause AI agents to misuse APIs or tools. It does not guarantee that an AI agent will never fail.
