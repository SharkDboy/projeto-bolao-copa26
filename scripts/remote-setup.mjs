/**
 * Setup remoto: sync de partidas + deploy Supabase (se SUPABASE_ACCESS_TOKEN existir).
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

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

function run(cmd, args) {
  const result = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });
  if (result.status !== 0) {
    throw new Error(`${cmd} ${args.join(" ")} falhou (${result.status})`);
  }
}

async function applySqlViaManagementApi() {
  const token = process.env.SUPABASE_ACCESS_TOKEN?.trim();
  if (!token) {
    console.log("SUPABASE_ACCESS_TOKEN ausente — SQL manual: RODE-ANTES-DE-USAR.sql");
    return false;
  }

  const sqlPath = resolve(process.cwd(), "supabase/RODE-ANTES-DE-USAR.sql");
  const query = readFileSync(sqlPath, "utf8");

  const res = await fetch(
    "https://api.supabase.com/v1/projects/kxdrlljdtncpwtdhetit/database/query",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    },
  );

  if (!res.ok) {
    const body = await res.text();
    console.warn(`SQL via API falhou (${res.status}): ${body}`);
    return false;
  }

  console.log("RODE-ANTES-DE-USAR.sql aplicado via Management API.");
  return true;
}

async function deploySupabaseFunctions() {
  const token = process.env.SUPABASE_ACCESS_TOKEN?.trim();
  if (!token) {
    console.log("Pulando deploy Edge Functions (sem SUPABASE_ACCESS_TOKEN).");
    return;
  }

  run("supabase", ["login", "--token", token]);
  run("supabase", ["link", "--project-ref", "kxdrlljdtncpwtdhetit"]);

  if (process.env.CRON_SECRET) {
    run("supabase", ["secrets", "set", `CRON_SECRET=${process.env.CRON_SECRET}`]);
  }

  run("supabase", ["functions", "deploy", "sync-match-results"]);
}

async function main() {
  console.log("=== 1/3 SQL (opcional) ===");
  await applySqlViaManagementApi();

  console.log("\n=== 2/3 Sync partidas ===");
  run("npm", ["run", "sync:matches"]);

  console.log("\n=== 3/3 Deploy sync-match-results (opcional) ===");
  await deploySupabaseFunctions();

  console.log("\nSetup concluído.");
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
