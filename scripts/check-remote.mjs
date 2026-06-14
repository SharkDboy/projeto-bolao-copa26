import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!url || !serviceKey) {
  console.error("Missing env");
  process.exit(1);
}

const admin = createClient(url, serviceKey);
const anon = anonKey ? createClient(url, anonKey) : null;

const { count: matches } = await admin
  .from("matches")
  .select("*", { count: "exact", head: true });

const { count: withScore } = await admin
  .from("matches")
  .select("*", { count: "exact", head: true })
  .not("home_score", "is", null)
  .not("away_score", "is", null);

const { data: ranking, error: rankErr } = await admin.rpc("get_ranking");
const { error: upsertErr } = await admin.rpc("upsert_matches_sync", {
  rows: [],
});

let anonRankingErr = null;
if (anon) {
  const { error } = await anon.rpc("get_ranking");
  anonRankingErr = error?.message ?? null;
}

console.log(
  JSON.stringify(
    {
      matches,
      matchesWithFinalScore: withScore,
      rankingUsers: ranking?.length ?? 0,
      getRankingOk: !rankErr,
      upsertRpcMissing: upsertErr?.message?.includes("Could not find"),
      upsertRpcError: upsertErr?.message ?? null,
      anonCanCallRanking: anon ? !anonRankingErr : "no anon key",
      anonRankingError: anonRankingErr,
      hasAccessToken: Boolean(process.env.SUPABASE_ACCESS_TOKEN?.trim()),
    },
    null,
    2,
  ),
);
