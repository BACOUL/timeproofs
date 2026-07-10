# TimeProofs AgentReady — Roadmap Produit

## Principe de roadmap

La roadmap doit construire progressivement un actif difficile à copier.

La V1 sera forcément copiable si elle reste un simple scanner. Le moat doit donc venir de :

```txt
AgentReady Score
+ agentready.json
+ taxonomie des risques
+ simulation agentique
+ base d'erreurs
+ benchmark public
+ certification
```

## V1 — OpenAPI AgentReady Scanner

### Objectif

Créer le premier produit utilisable :

```txt
Upload OpenAPI
→ AgentReady Score
→ AgentReady Report
→ agentready.json
```

### Entrées

```txt
openapi.yaml
openapi.yml
openapi.json
```

### Sorties

```txt
AgentReady Score /100
AgentReady Report
agentready.json
```

### Analyses V1

- noms d'endpoints ;
- operationId ;
- descriptions ;
- when to use / when not to use ;
- paramètres trop libres ;
- absence d'enum ;
- paramètres numériques non bornés ;
- actions dangereuses ;
- confirmation humaine ;
- erreurs non correctives ;
- données sensibles ;
- réponses trop larges ;
- absence de vérification après action.

### V1 exclut

- MCP complet ;
- simulation agentique ;
- runtime firewall ;
- monitoring ;
- dashboard complexe ;
- paiement ;
- certification.

---

## V2 — MCP Tool Scanner

### Objectif

Étendre TimeProofs aux serveurs MCP et tool schemas.

```txt
MCP tools schema
→ AgentReady MCP Score
→ AgentReady Report
→ agentready.json
```

### Analyses V2

- nom du tool ;
- description du tool ;
- input schema ;
- output schema ;
- actions dangereuses ;
- accès aux données sensibles ;
- permissions ;
- prompt injection basique dans descriptions ;
- confirmation humaine ;
- conditions allowed / forbidden.

---

## V3 — Agent Simulation

### Objectif

Passer du scan statique au banc de test réel.

TimeProofs génère des scénarios, puis teste si un agent choisit le bon outil avec les bons paramètres.

### Exemples de scénarios

```txt
Rembourse le client Martin de 120 €.
Supprime le fichier de test.
Envoie un email au client.
Modifie une commande.
Exporte la liste clients.
Annule un abonnement.
Invite un utilisateur externe.
```

### Mesures

- bon outil choisi ;
- mauvais outil choisi ;
- bons paramètres ;
- mauvais paramètres ;
- confirmation humaine demandée ;
- action dangereuse évitée ;
- erreur comprise ;
- résultat vérifié.

### Métrique clé

```txt
Avant correction : X % success
Après correction : Y % success
```

---

## V4 — CLI / GitHub Action

### Objectif

Entrer dans le workflow développeur.

### CLI cible

```bash
timeproofs scan openapi.yaml
timeproofs scan-mcp tools.json
timeproofs generate-contract openapi.yaml
```

### GitHub Action cible

```yaml
- name: TimeProofs AgentReady Scan
  uses: BACOUL/timeproofs/.github/actions/agentready@v0.1.0-alpha.0
```

Planned versioned reference - tag not created yet.

### Pourquoi cette phase est essentielle

Un gros acteur ne rachète pas seulement un site. Il rachète une brique qui s'intègre dans un workflow développeur.

---

## V5 — Benchmark public

### Objectif

Créer une autorité technique et une base de données d'erreurs.

### Publications possibles

```txt
State of AgentReady APIs
Top 50 mistakes that make AI agents fail
MCP Tool Readiness Benchmark
Agent Tool Risk Index
OpenAPI is not enough for AI agents
```

### Données à accumuler

- types d'outils ;
- erreurs fréquentes ;
- descriptions ambiguës ;
- paramètres flous ;
- actions dangereuses ;
- corrections efficaces ;
- taux réussite avant/après ;
- différences OpenAPI / MCP.

---

## V6 — Certification AgentReady

### Objectif

Créer une marque de confiance.

### Badge cible

```txt
TimeProofs AgentReady Checked
Score: 86/100
Valid until: 2027-06-27
```

### Certification future

La certification ne doit pas être vendue comme une garantie absolue. Elle doit indiquer :

- version de la spec analysée ;
- score ;
- date ;
- statut ;
- risques restants ;
- conditions de validité.

---

## Règle de priorité

Chaque nouvelle fonctionnalité doit renforcer au moins un de ces actifs :

1. AgentReady Score ;
2. agentready.json ;
3. taxonomie des risques ;
4. simulation ;
5. base d'erreurs ;
6. benchmark ;
7. certification.

Sinon, elle est refusée ou reportée.
