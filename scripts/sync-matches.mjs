/**
 * Sincroniza partidas reais da Copa 2026 (API-Football) → Supabase.
 *
 * Uso:
 *   1. Copie .env.example → .env e preencha as chaves
 *   2. npm run sync:matches
 *
 * Alternativa: Edge Function sync-match-results (ver supabase/functions/sync-match-results/README.md)
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

loadEnv();

const API_BASE = "https://v3.football.api-sports.io";
const FINISHED = new Set(["FT", "AET", "PEN"]);
const LOCKED = new Set(["1H", "HT", "2H", "ET", "BT", "P", "LIVE", "INT", ...FINISHED]);

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

function mapStage(round) {
  const value = round.toLowerCase();
  if (value.includes("3rd place") || value.includes("third place")) {
    return "Disputa 3º lugar";
  }
  if (value.includes("final") && !value.includes("semi") && !value.includes("quarter")) {
    return "Final";
  }
  if (value.includes("semi")) return "Semifinal";
  if (value.includes("quarter")) return "Quartas de Final";
  if (value.includes("round of 16") || value.includes("8th finals")) {
    return "Oitavas de Final";
  }
  if (value.includes("round of 32") || value.includes("16th finals")) {
    return "32 avos de Final";
  }
  if (value.includes("group")) return "Fase de Grupos";
  return round || "Copa do Mundo";
}

async function fetchAllFixtures(apiKey, leagueId, season) {
  const all = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const url = new URL(`${API_BASE}/fixtures`);
    url.searchParams.set("league", leagueId);
    url.searchParams.set("season", season);
    url.searchParams.set("page", String(page));

    const res = await fetch(url, { headers: { "x-apisports-key": apiKey } });
    if (!res.ok) {
      throw new Error(`API-Football HTTP ${res.status}: ${await res.text()}`);
    }

    const json = await res.json();
    all.push(...(json.response ?? []));
    totalPages = json.paging?.total ?? 1;
    page += 1;
  }

  return all;
}

function buildRow(item, now) {
  const status = item.fixture.status.short;
  const finished = FINISHED.has(status);
  const locked = LOCKED.has(status);
  const kickoffPassed = new Date(item.fixture.date).getTime() <= Date.now();

  return {
    id: String(item.fixture.id),
    external_id: item.fixture.id,
    home_team: item.teams.home.name,
    away_team: item.teams.away.name,
    kickoff_at: item.fixture.date,
    stage: mapStage(item.league.round),
    status,
    synced_at: now,
    is_locked: locked || kickoffPassed,
    home_score: finished && item.goals.home != null ? item.goals.home : null,
    away_score: finished && item.goals.away != null ? item.goals.away : null,
  };
}

async function main() {
  const apiKey = process.env.API_FOOTBALL_KEY;
  const supabaseUrl = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const leagueId = process.env.API_FOOTBALL_LEAGUE_ID ?? "1";
  const season = process.env.API_FOOTBALL_SEASON ?? "2026";

  if (!apiKey) {
    console.error("Defina API_FOOTBALL_KEY no .env (api-football.com → Dashboard → API-KEY)");
    process.exit(1);
  }
  if (!supabaseUrl || !serviceRoleKey) {
    console.error(
      "Defina VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env\n" +
        "(service role: Supabase → Settings → API → service_role — nunca commite!)",
    );
    process.exit(1);
  }

  console.log(`Buscando fixtures league=${leagueId} season=${season}...`);
  const fixtures = await fetchAllFixtures(apiKey, leagueId, season);
  console.log(`${fixtures.length} partidas na API`);

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const now = new Date().toISOString();
  const batchSize = 50;
  let upserted = 0;

  for (let i = 0; i < fixtures.length; i += batchSize) {
    const batch = fixtures.slice(i, i + batchSize).map((item) => buildRow(item, now));
    const { error } = await supabase.from("matches").upsert(batch, {
      onConflict: "external_id",
    });
    if (error) throw new Error(error.message);
    upserted += batch.length;
  }

  const withResult = fixtures.filter((f) => FINISHED.has(f.fixture.status.short)).length;
  console.log(`OK — ${upserted} partidas sincronizadas (${withResult} com resultado final)`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
