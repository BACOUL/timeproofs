# Run Local / BYOI

## Variables
- TP_SECRET   : clé HMAC privée (obligatoire)
- TP_REDIS_URL: ex. redis://redis:6379 (optionnel, sinon mémoire)

## Démarrage rapide
# Local sans Redis
cd selfhost
cp .env.example .env   # mets une vraie clé
npm i
npm start
# -> http://127.0.0.1:8787

## Docker + Redis
make up
# -> API sur http://127.0.0.1:8787

## Endpoints
POST /api/timestamp {hash, type?, meta?}
GET  /api/verify?hash=...

Signature = HMAC-SHA256( `${hash}|${timestamp}` , TP_SECRET )

## Tests
HASH=$(curl -s https://timeproofs.io | openssl dgst -sha256 | awk '{print $2}')
curl -s -X POST http://127.0.0.1:8787/api/timestamp \
  -H 'Content-Type: application/json' -d "{\"hash\":\"$HASH\"}" | jq .
curl -s "http://127.0.0.1:8787/api/verify?hash=$HASH" | jq .

## Parité Worker
- Même schéma KV: key = hash, value = {timestamp, signature, type?, meta?}
- En local: mémoire ou Redis. En prod CF: KV.
- CSP/HSTS gérés par l’edge (Cloudflare) → non applicables ici.
