/**
 * Sincroniza partidas da Copa 2026 via rezarahiminia/worldcup2026 (sem API key).
 * Preserva placares já gravados quando a API ainda não tem resultado.
 *
 * Uso: npm run sync:matches
 * Alternativa: Edge Function sync-match-results
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import {
  DEFAULT_WORLDCUP_URL,
  fetchWorldCupMatches,
  rowsFromMatches,
} from "../supabase/functions/_shared/worldcup2026.js";

loadEnv();

const BATCH_SIZE = 50;

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

function assertServiceRoleKey(key) {
  if (!key) {
    console.error(
      "Defina SUPABASE_SERVICE_ROLE_KEY no .env (JWT eyJ... em Settings → API → service_role)",
    );
    process.exit(1);
  }
  if (!key.startsWith("eyJ")) {
    console.error(
      "SUPABASE_SERVICE_ROLE_KEY inválida: use service_role (eyJ...), não publishable.",
    );
    process.exit(1);
  }
}

async function main() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const worldcupUrl =
    process.env.WORLDCUP2026_API_URL ??
    process.env.OPENFOOTBALL_WORLDCUP_URL ??
    DEFAULT_WORLDCUP_URL;

  assertServiceRoleKey(serviceRoleKey);

  console.log(`Buscando ${worldcupUrl} ...`);
  const matches = await fetchWorldCupMatches(worldcupUrl);
  console.log(`${matches.length} partidas no JSON`);

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const now = new Date().toISOString();
  const rows = rowsFromMatches(matches, now);
  let upserted = 0;
  let resultsUpdated = 0;

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const { data, error } = await supabase.rpc("upsert_matches_sync", {
      rows: batch,
    });
    if (error) {
      throw new Error(
        `${error.message}\n` +
          "Rode a migration 20260105000000_sync_and_ranking.sql no Supabase.",
      );
    }
    upserted += data?.upserted ?? batch.length;
    resultsUpdated += data?.results_updated ?? 0;
  }

  console.log(
    `OK — ${upserted} partidas sincronizadas (${resultsUpdated} com placar neste sync)`,
  );
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
