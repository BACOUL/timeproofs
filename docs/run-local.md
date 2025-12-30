# Run Local / BYOI

Variables
TP_SECRET: private HMAC key (required)
TP_REDIS_URL: e.g. redis://redis:6379 (optional, otherwise in-memory)

Quick Start

Local without Redis
cd selfhost
cp .env.example .env
npm install
npm start
http://127.0.0.1:8787

Docker + Redis
make up
API available at http://127.0.0.1:8787

Endpoints
POST /api/timestamp {hash, type?, meta?}
GET  /api/verify?hash=...

Signature
HMAC-SHA256( `${hash}|${timestamp}` , TP_SECRET )

Tests
HASH=$(curl -s https://timeproofs.io | openssl dgst -sha256 | awk '{print $2}')
curl -s -X POST http://127.0.0.1:8787/api/timestamp -H 'Content-Type: application/json' -d "{\"hash\":\"$HASH\"}" | jq .
curl -s "http://127.0.0.1:8787/api/verify?hash=$HASH" | jq .

Worker parity
Same KV schema: key = hash, value = {timestamp, signature, type?, meta?}
Local mode: memory or Redis
Production (Cloudflare): KV
CSP/HSTS handled at the edge (Cloudflare), not here.
