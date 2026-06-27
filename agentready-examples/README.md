# AgentReady Examples

Fixtures utilisées pour vérifier le moteur AgentReady V1.

## Fichiers

```txt
valid-simple-openapi.json
valid-simple-openapi.yaml
dangerous-actions-openapi.json
```

## Usage attendu

`valid-simple-openapi.json` et `valid-simple-openapi.yaml` doivent produire un score relativement élevé, car ils contiennent :

- operationId explicites ;
- descriptions avec limites ;
- enums ;
- erreurs correctives ;
- sécurité déclarée.

`dangerous-actions-openapi.json` doit produire plusieurs risques forts ou critiques :

- remboursement sans confirmation humaine ;
- montant non borné ;
- status sans enum ;
- export de données sensibles ;
- suppression de fichier ;
- erreurs non correctives ;
- absence de sécurité déclarée.

## Formats

Le moteur accepte maintenant :

```txt
OpenAPI JSON
OpenAPI YAML
```

Le parseur YAML est léger et interne. Il vise les specs OpenAPI courantes, pas l'intégralité de la spécification YAML avancée.
