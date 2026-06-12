/**
 * Gera supabase/seed-matches-2026.sql a partir do openfootball/worldcup.json
 * Uso: node scripts/generate-matches-sql.mjs
 */

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  DEFAULT_WORLDCUP_URL,
  fetchWorldCupMatches,
  rowsFromMatches,
} from "../supabase/functions/_shared/openfootball.js";

function sqlString(value) {
  if (value == null) return "null";
  return `'${String(value).replace(/'/g, "''")}'`;
}

async function main() {
  const matches = await fetchWorldCupMatches();
  const now = new Date().toISOString();
  const rows = rowsFromMatches(matches, now);

  const lines = [
    "-- Partidas reais Copa 2026 (openfootball/worldcup.json)",
    "-- Idempotente: pode rodar mais de uma vez.",
    "-- Fonte: " + DEFAULT_WORLDCUP_URL,
    "",
  ];

  for (const row of rows) {
    lines.push(`insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  ${sqlString(row.id)},
  ${row.external_id},
  ${sqlString(row.home_team)},
  ${sqlString(row.away_team)},
  ${sqlString(row.kickoff_at)},
  ${sqlString(row.stage)},
  ${row.home_score ?? "null"},
  ${row.away_score ?? "null"},
  ${row.is_locked},
  ${sqlString(row.status)},
  ${sqlString(row.synced_at)}
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;`);
    lines.push("");
  }

  const outPath = resolve(process.cwd(), "supabase/seed-matches-2026.sql");
  writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log(`Gerado ${outPath} (${rows.length} partidas)`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
