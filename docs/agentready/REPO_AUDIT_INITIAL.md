# TimeProofs AgentReady — Audit initial du repo

## 1. Objectif de l'audit

Cet audit vérifie l'état du repo **BACOUL/timeproofs** avant toute intégration technique AgentReady.

But :

> Identifier ce qui existe, ce qu'il faut conserver, ce qui peut être réutilisé, et où intégrer AgentReady sans casser TimeProofs legacy.

Cet audit ne modifie aucun runtime.

---

## 2. Résumé exécutif

Le repo actuel est une base **TimeProofs legacy statique** orientée preuve d'existence.

Il ne s'agit pas d'une application Next.js ou d'un backend complet dans le repo.

Le produit actuel est décrit comme :

```txt
Proof of Existence for Everything
Hash locally, get a signed timestamp, verify publicly
zero personal data, no blockchain, full transparency
```

Les éléments principaux observés :

- pages HTML statiques ;
- CSS et JavaScript intégrés dans chaque page ;
- documentation OpenAPI existante ;
- API publique séparée sur `api.timeproofs.io` ;
- logique de preuve/timestamp documentée ;
- page de création/vérification existante ;
- manifeste de release ;
- sitemap, RSS, manifest, robots, security.txt ;
- absence de `package.json` détecté ;
- absence de structure `/app`, `/lib`, `/src` ;
- absence de code backend API dans le repo consulté.

Conclusion :

> AgentReady doit être intégré comme une extension progressive et isolée, pas comme une refonte brutale du site.

---

## 3. État produit actuel

### Positionnement actuel

Le README positionne TimeProofs comme une API de timestamp et preuve d'existence :

```txt
TimeProofs is a free, open, privacy-first timestamp API.
Hash locally, get a signed timestamp, verify publicly.
```

Fonctions v0.1 listées :

```txt
Hash-only inputs
Signed timestamp events
Public verification endpoint
Stateless & privacy-first
Edge-native
Proof bundle format: .tproof.json
Full site integrity via /releases/v0.1.json
```

### Positionnement futur AgentReady

AgentReady ne doit pas supprimer ce socle.

L'ancien TimeProofs devient :

```txt
legacy proof layer
hash / timestamp / verification / proof bundle
```

Le nouveau TimeProofs AgentReady devient :

```txt
pre-deployment readiness layer for AI-agent tools
OpenAPI / MCP → score → report → agentready.json
```

---

## 4. Pages existantes identifiées

Le sitemap actuel liste les pages suivantes :

```txt
/
/proofspec.html
/use-cases.html
/verify.html
/docs.html
/regulations.html
/security.html
/privacy.html
/legal.html
/about.html
/humans.txt
/.well-known/security.txt
```

Pages supplémentaires constatées mais non listées dans le sitemap actif :

```txt
/pricing.html
/roadmap.html
```

Le fichier `robots.txt` bloque explicitement :

```txt
/pricing.html
/roadmap.html
```

et des zones internes :

```txt
/api/
/internal/
/drafts/
/admin/
/_next/
/assets/private/
/tmp/
```

### Implication AgentReady

Ne pas réutiliser `/pricing.html` ou `/roadmap.html` pour AgentReady V1.

Créer une page dédiée :

```txt
/agentready.html
```

et plus tard, si besoin :

```txt
/agentready-report.html
/examples.html
```

Mais en V1 technique, la priorité est le moteur, pas les pages.

---

## 5. Fichiers clés existants

### README.md

Rôle : documentation principale du produit legacy.

À conserver.

Ne pas remplacer par AgentReady immédiatement.

Action recommandée plus tard : ajouter une section courte :

```txt
AgentReady is an upcoming pre-deployment readiness layer for AI-agent tools.
```

### index.html

Rôle : landing page principale legacy.

Constats :

- HTML statique ;
- CSS intégré ;
- JS intégré ;
- header partagé visuellement ;
- navigation existante vers ProofSpec, Use Cases, API Docs, Regulations, Security, Privacy, Legal, About ;
- CTA principal vers pricing et create/verify ;
- enregistrement service worker ;
- chargement release manifest via `/releases/v1.json`, `/releases/v0.2.json`, puis `/releases/v0.1.json`.

À conserver sans modification en phase moteur.

### verify.html

Rôle : interface existante pour créer/vérifier des preuves.

À conserver.

Ne pas mélanger l'upload OpenAPI AgentReady avec cette page.

### docs.html

Rôle : documentation API legacy timestamp/verify.

À conserver.

Ne pas transformer cette page en documentation AgentReady.

Créer plus tard :

```txt
agentready-docs.html
```

ou une section dédiée si le site reste statique.

### proofspec.html

Rôle : spécification du format de preuve `.tproof.json`.

À conserver comme couche proof legacy.

À réutiliser plus tard pour la couche “verified report”, mais pas en V1 moteur.

### openapi.yaml

Rôle : description OpenAPI de l'API TimeProofs legacy.

Endpoints observés :

```txt
GET /api/ping
POST /api/timestamp
GET /api/verify
```

Ce fichier peut devenir la première fixture réelle pour tester AgentReady, car il est déjà en OpenAPI 3.1.0.

Attention : ce fichier décrit TimeProofs legacy, pas AgentReady.

### releases/v0.1.json

Rôle : manifeste de release integrity.

À conserver.

Ne pas intégrer AgentReady dans le manifeste avant que le produit soit stable.

### release-v0.1.tproof.json

Rôle : preuve de release legacy.

À conserver.

### sw.js

Rôle : service worker minimal.

Contenu observé :

```txt
install → skipWaiting
activate → clients.claim
```

Risque faible.

À conserver.

### sitemap.xml

À mettre à jour seulement quand une vraie page AgentReady publique existe.

Ne pas ajouter `/agentready.html` tant que la page n'est pas prête.

### robots.txt

À conserver.

Quand AgentReady est public, vérifier qu'il n'est pas bloqué par erreur.

---

## 6. Architecture actuelle

Architecture constatée :

```txt
root/
  index.html
  verify.html
  docs.html
  proofspec.html
  use-cases.html
  regulations.html
  security.html
  privacy.html
  legal.html
  about.html
  pricing.html
  roadmap.html
  openapi.yaml
  sitemap.xml
  robots.txt
  rss.xml
  site.webmanifest
  sw.js
  humans.txt
  pgp.txt
  release-v0.1.tproof.json
  releases/v0.1.json
  assets/
  .well-known/security.txt
  docs/agentready/
```

Absences importantes :

```txt
package.json absent
Next.js absent
/app absent
/lib absent
/src absent
tests absents
runner de build non identifié
backend API non présent dans le repo
```

### Conséquence

Les chemins prévus dans la documentation V1 :

```txt
/lib/agentready/
/app/agentready/
```

ne peuvent pas être appliqués tels quels sans introduire une nouvelle stack.

Il faut choisir une stratégie technique adaptée au repo statique.

---

## 7. Stratégie technique recommandée

### Option A — Rester statique pour V1

Créer un moteur AgentReady en JavaScript pur côté navigateur.

Structure recommandée :

```txt
agentready.html
agentready-report.html
agentready-core/
  parser.js
  extract-operations.js
  classify-action.js
  detect-risks.js
  score.js
  generate-agentready-json.js
  report.js
  types.js
agentready-examples/
  valid-simple-openapi.json
  dangerous-actions-openapi.yaml
```

Avantages :

- cohérent avec le repo actuel ;
- pas de build ;
- pas de dépendances lourdes ;
- privacy-first ;
- la spec peut être analysée localement ;
- aucun endpoint externe appelé ;
- bon pour une V1 simple.

Limites :

- parsing YAML plus délicat sans dépendance ;
- export PDF plus limité ;
- tests automatisés plus rudimentaires ;
- moins propre qu'une vraie app.

### Option B — Introduire une app Next.js

Créer une vraie app avec :

```txt
package.json
app/agentready
lib/agentready
tests
```

Avantages :

- architecture long terme plus propre ;
- tests plus simples ;
- PDF/export plus maîtrisable ;
- produit SaaS plus évolutif.

Risques :

- refonte plus lourde ;
- risque de casser la publication statique ;
- nécessite build/deploy propre ;
- trop lourd si l'objectif est une V1 rapide.

### Recommandation audit

Pour la prochaine PR technique, choisir **Option A**.

Raison :

> Le repo actuel est statique. La V1 AgentReady peut être construite comme moteur local, sans dépendance, sans backend et sans casser TimeProofs legacy.

---

## 8. Ce qu'on garde

À conserver strictement :

```txt
index.html
verify.html
docs.html
proofspec.html
use-cases.html
regulations.html
security.html
privacy.html
legal.html
about.html
openapi.yaml
sitemap.xml
robots.txt
rss.xml
site.webmanifest
sw.js
humans.txt
pgp.txt
release-v0.1.tproof.json
releases/v0.1.json
assets/
.well-known/security.txt
```

---

## 9. Ce qu'on réutilise

### Design

Réutiliser les styles existants :

```txt
fond sombre
accent cyan
cards
header fixe
cta
footer
micro chips
sections bg-alt / bg-solid
```

Comme les styles sont intégrés par page, la V1 AgentReady pourra copier une base visuelle depuis `index.html`.

### OpenAPI existant

Utiliser `openapi.yaml` comme première fixture.

### Proof layer

Réutiliser plus tard :

```txt
.tproof.json
verify.html
proofspec.html
release manifest
```

Mais seulement après le rapport AgentReady V1.

### Message privacy-first

Très compatible avec AgentReady :

```txt
OpenAPI analyzed locally
No API endpoint called
No file stored by default
```

---

## 10. Ce qu'on ne touche pas maintenant

Ne pas modifier en phase moteur :

```txt
index.html
verify.html
proofspec.html
docs.html
security.html
privacy.html
legal.html
openapi.yaml
release manifests
service worker
robots.txt
sitemap.xml
```

Exception : mise à jour du sitemap/robots uniquement après création d'une page publique stable.

---

## 11. Risques détectés

### Risque 1 — Liens vers pages absentes

`index.html` contient des liens vers :

```txt
/request-access.html
```

mais ce fichier n'a pas été trouvé pendant l'audit.

Action recommandée hors AgentReady : créer ou corriger ce lien, mais ne pas mélanger avec AgentReady.

### Risque 2 — Pricing / roadmap bloqués par robots

`pricing.html` et `roadmap.html` existent mais sont bloqués dans `robots.txt`.

Action : ne pas les utiliser pour AgentReady.

### Risque 3 — Manifest v1/v0.2 manquants

`index.html` tente de charger :

```txt
/releases/v1.json
/releases/v0.2.json
/releases/v0.1.json
```

Seul `releases/v0.1.json` a été trouvé.

Ce n'est pas bloquant grâce au fallback, mais à documenter.

### Risque 4 — CSP stricte

Les pages ont des CSP inline avec nonce `TP-2025`.

Toute nouvelle page AgentReady doit respecter la même logique et éviter des scripts externes non nécessaires.

### Risque 5 — Pas de build/test

Absence de `package.json` détectée.

Il n'y a pas de test runner identifié.

Pour V1 statique, prévoir des fixtures et tests manuels d'abord, ou créer un mini runner JS plus tard.

### Risque 6 — YAML parsing

Si aucune dépendance n'est ajoutée, YAML complet est difficile à parser côté navigateur.

Options :

1. V1a support JSON uniquement pour le moteur initial ;
2. V1b ajouter YAML via librairie locale vendored ;
3. V1b introduire une dépendance et un build.

Recommandation :

```txt
V1a : OpenAPI JSON d'abord
V1b : YAML ensuite
```

Mais le document maître demande YAML + JSON pour V1 complète. Il faut donc traiter YAML avant de déclarer V1 terminée.

---

## 12. Plan de PR recommandé après audit

### PR #44 — AgentReady Core Static V1a

Objectif : moteur sans UI lourde.

Créer :

```txt
agentready-core/types.js
agentready-core/parse-openapi.js
agentready-core/extract-operations.js
agentready-core/classify-action.js
agentready-core/detect-risks.js
agentready-core/score.js
agentready-core/generate-agentready-json.js
agentready-core/report.js
agentready-examples/valid-simple-openapi.json
agentready-examples/dangerous-actions-openapi.json
```

V1a accepte JSON OpenAPI.

Ne pas faire encore :

```txt
PDF
MCP
paiement
dashboard
runtime guardrail
preuve cryptographique
```

### PR #45 — AgentReady UI Static Upload

Créer :

```txt
agentready.html
```

Fonctions :

```txt
upload JSON
analyse locale
score
risques
export agentready.json
```

### PR #46 — YAML + Report polish

Ajouter YAML et rapport plus lisible.

### PR #47 — PDF export

Ajouter export PDF sans casser CSP.

### PR #48 — Sitemap/docs/examples

Ajouter page stable au sitemap, docs publiques, exemples.

---

## 13. Décision technique immédiate

Décision recommandée :

```txt
Ne pas introduire Next.js maintenant.
Construire AgentReady comme module statique local.
Garder le legacy TimeProofs intact.
Créer le moteur avant la page.
Commencer par OpenAPI JSON.
Ajouter YAML avant V1 complète.
```

---

## 14. Définition d'intégration propre

L'intégration AgentReady doit respecter :

```txt
aucune suppression legacy
aucune modification des endpoints existants
aucun appel automatique aux URLs OpenAPI
analyse locale si possible
stockage minimal
export agentready.json
rapport humain clair
```

---

## 15. Conclusion

Le repo actuel est une bonne base de marque, de design, de documentation et de philosophie privacy-first.

Mais il n'est pas encore structuré comme une application produit AgentReady.

La bonne approche est :

```txt
1. conserver TimeProofs legacy
2. ajouter AgentReady comme module isolé
3. créer le moteur local
4. créer la page upload seulement après
5. ne pas toucher au proof layer avant d'avoir un rapport utile
```

Phrase de décision :

> TimeProofs legacy reste la couche de preuve. AgentReady devient une nouvelle couche statique pré-déploiement, isolée, locale et compatible privacy-first.
