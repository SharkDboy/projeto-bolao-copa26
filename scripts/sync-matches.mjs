/**
 * Sincroniza partidas da Copa 2026 via openfootball/worldcup.json (sem API key).
 *
 * Uso:
 *   npm run sync:matches
 *
 * Alternativa: Edge Function sync-match-results
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import {
  DEFAULT_WORLDCUP_URL,
  fetchWorldCupMatches,
  rowsFromMatches,
} from "../supabase/functions/_shared/openfootball.js";

loadEnv();

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

async function main() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const worldcupUrl =
    process.env.OPENFOOTBALL_WORLDCUP_URL ?? DEFAULT_WORLDCUP_URL;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error(
      "Defina VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env\n" +
        "(service role: Supabase → Settings → API → service_role — JWT que começa com eyJ)",
    );
    process.exit(1);
  }

  if (!serviceRoleKey.startsWith("eyJ")) {
    console.error(
      "SUPABASE_SERVICE_ROLE_KEY inválida: use a chave service_role (JWT eyJ...),\n" +
        "não a chave publishable (sb_publishable_...).\n" +
        "Alternativa: execute supabase/seed-matches-2026.sql no SQL Editor.",
    );
    process.exit(1);
  }

  console.log(`Buscando ${worldcupUrl} ...`);
  const matches = await fetchWorldCupMatches(worldcupUrl);
  console.log(`${matches.length} partidas no JSON`);

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const now = new Date().toISOString();
  const rows = rowsFromMatches(matches, now);
  const batchSize = 50;
  let upserted = 0;

  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error } = await supabase.from("matches").upsert(batch, {
      onConflict: "external_id",
    });
    if (error) {
      throw new Error(
        `${error.message}\n` +
          "Se vir erro de RLS, confira se a chave é service_role (eyJ...) ou rode seed-matches-2026.sql no SQL Editor.",
      );
    }
    upserted += batch.length;
  }

  const withResult = rows.filter(
    (row) => row.home_score != null && row.away_score != null,
  ).length;

  console.log(`OK — ${upserted} partidas sincronizadas (${withResult} com resultado)`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
