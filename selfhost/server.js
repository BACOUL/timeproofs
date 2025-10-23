import express from "express";
import crypto from "crypto";
import dotenv from "dotenv";
import Redis from "ioredis";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8787;
const TP_SECRET = process.env.TP_SECRET;
if (!TP_SECRET) {
  console.error("TP_SECRET manquant");
  process.exit(1);
}

const redis = process.env.TP_REDIS_URL ? new Redis(process.env.TP_REDIS_URL) : null;
const mem = new Map();

async function kvGet(key) {
  if (redis) return await redis.get(key);
  return mem.get(key) || null;
}
async function kvPut(key, val) {
  const s = typeof val === "string" ? val : JSON.stringify(val);
  if (redis) return await redis.set(key, s);
  mem.set(key, s);
}

function isHex64(x) { return typeof x === "string" && /^[a-f0-9]{64}$/i.test(x); }
function sign(hash, ts) {
  return crypto.createHmac("sha256", TP_SECRET).update(`${hash}|${ts}`).digest("hex");
}

app.get("/api/health", (_req, res) => res.json({ ok: true, env: "selfhost", redis: !!redis }));

app.post("/api/timestamp", async (req, res) => {
  try {
    const { hash, type, meta } = req.body || {};
    if (!isHex64(hash)) return res.status(400).json({ ok: false, error: "invalid_hash" });
    const timestamp = new Date().toISOString();
    const signature = sign(hash, timestamp);
    const value = { hash, timestamp, signature, type, meta };
    await kvPut(hash, value);
    return res.json({ ok: true, ...value, verify_url: `/api/verify?hash=${hash}` });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "server_error" });
  }
});

app.get("/api/verify", async (req, res) => {
  try {
    const { hash } = req.query;
    if (!isHex64(hash)) return res.status(400).json({ ok: false, error: "invalid_hash" });
    const raw = await kvGet(hash);
    if (!raw) return res.json({ ok: true, found: false });
    const data = typeof raw === "string" ? JSON.parse(raw) : raw;
    const expected = sign(data.hash, data.timestamp);
    const valid = expected === data.signature;
    return res.json({ ok: true, found: true, valid, ...data });
  } catch {
    return res.status(500).json({ ok: false, error: "server_error" });
  }
});

app.listen(PORT, () => console.log(`TimeProofs local on :${PORT}`));
