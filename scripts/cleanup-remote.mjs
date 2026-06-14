/**
 * Limpeza remota via REST (sem SQL Editor): remove mocks, órfãs e partidas fora da fonte atual.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";
import {
  DEFAULT_WORLDCUP_URL,
  fetchWorldCupMatches,
  rowsFromMatches,
} from "../supabase/functions/_shared/worldcup2026.js";

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
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key?.startsWith("eyJ")) {
  console.error("Configure VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env");
  process.exit(1);
}

const sb = createClient(url, key);
const mockIds = ["1", "2", "3", "4", "5", "6", "7", "8"];

const { error: predErr } = await sb
  .from("predictions")
  .delete()
  .in("match_id", mockIds);
if (predErr) throw predErr;

const { error: mockErr } = await sb.from("matches").delete().in("id", mockIds);
if (mockErr) throw mockErr;

const { data: orphans, error: orphanListErr } = await sb
  .from("matches")
  .select("id")
  .is("external_id", null)
  .is("synced_at", null);
if (orphanListErr) throw orphanListErr;

if (orphans?.length) {
  const orphanIds = orphans.map((r) => r.id);
  await sb.from("predictions").delete().in("match_id", orphanIds);
  const { error: orphanDelErr } = await sb
    .from("matches")
    .delete()
    .in("id", orphanIds);
  if (orphanDelErr) throw orphanDelErr;
}

const worldcupUrl =
  process.env.WORLDCUP2026_API_URL ?? DEFAULT_WORLDCUP_URL;
const matches = await fetchWorldCupMatches(worldcupUrl);
const validExternalIds = new Set(
  rowsFromMatches(matches, new Date().toISOString()).map((r) => r.external_id),
);

const { data: stale, error: staleErr } = await sb
  .from("matches")
  .select("id, external_id")
  .not("external_id", "is", null);
if (staleErr) throw staleErr;

const staleIds = (stale ?? [])
  .filter((row) => !validExternalIds.has(row.external_id))
  .map((row) => row.id);

if (staleIds.length) {
  await sb.from("predictions").delete().in("match_id", staleIds);
  const { error: staleDelErr } = await sb.from("matches").delete().in("id", staleIds);
  if (staleDelErr) throw staleDelErr;
}

const { count } = await sb.from("matches").select("*", { count: "exact", head: true });
console.log(
  `Limpeza OK — ${orphans?.length ?? 0} órfãs, ${staleIds.length} partidas antigas removidas, ${count} restantes (fonte: ${validExternalIds.size}).`,
);
