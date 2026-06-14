/**
 * Sincroniza partidas — usa RPC upsert_matches_sync ou fallback direto na tabela.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import {
  DEFAULT_WORLDCUP_URL,
  fetchWorldCupMatches,
  rowsFromMatches,
} from "../supabase/functions/_shared/worldcup2026.js";
import { upsertMatchesDirect } from "./lib/upsertMatchesDirect.mjs";

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
  if (!key?.startsWith("eyJ")) {
    console.error("SUPABASE_SERVICE_ROLE_KEY inválida ou ausente (JWT eyJ...).");
    process.exit(1);
  }
}

async function upsertBatch(supabase, batch, useRpc) {
  if (useRpc) {
    const { data, error } = await supabase.rpc("upsert_matches_sync", {
      rows: batch,
    });
    if (error) throw error;
    return {
      upserted: data?.upserted ?? batch.length,
      resultsUpdated: data?.results_updated ?? 0,
    };
  }
  return upsertMatchesDirect(supabase, batch);
}

async function main() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const worldcupUrl =
    process.env.WORLDCUP2026_API_URL ?? DEFAULT_WORLDCUP_URL;

  assertServiceRoleKey(serviceRoleKey);

  console.log(`Buscando ${worldcupUrl} ...`);
  const matches = await fetchWorldCupMatches(worldcupUrl);
  console.log(`${matches.length} partidas no JSON`);

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const { error: rpcProbe } = await supabase.rpc("upsert_matches_sync", {
    rows: [],
  });
  const useRpc = !rpcProbe?.message?.includes("Could not find the function");

  if (!useRpc) {
    console.log("RPC upsert_matches_sync ausente — usando upsert direto.");
  }

  const now = new Date().toISOString();
  const rows = rowsFromMatches(matches, now);
  let upserted = 0;
  let resultsUpdated = 0;

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const result = await upsertBatch(supabase, batch, useRpc);
    upserted += result.upserted;
    resultsUpdated += result.resultsUpdated;
  }

  console.log(
    `OK — ${upserted} partidas sincronizadas (${resultsUpdated} com placar neste sync)`,
  );
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
