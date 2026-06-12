import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const API_BASE = "https://v3.football.api-sports.io";
const FINISHED_STATUSES = new Set(["FT", "AET", "PEN"]);
const LOCKED_STATUSES = new Set([
  "1H",
  "HT",
  "2H",
  "ET",
  "BT",
  "P",
  "LIVE",
  "INT",
  ...FINISHED_STATUSES,
]);

interface ApiFixture {
  fixture: {
    id: number;
    date: string;
    status: { short: string };
  };
  league: { round: string };
  teams: {
    home: { name: string };
    away: { name: string };
  };
  goals: { home: number | null; away: number | null };
}

function mapStage(round: string): string {
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

function isAuthorized(req: Request): boolean {
  const cronSecret = Deno.env.get("CRON_SECRET");
  if (!cronSecret) return false;
  const header = req.headers.get("Authorization");
  return header === `Bearer ${cronSecret}`;
}

async function fetchAllFixtures(
  apiKey: string,
  leagueId: string,
  season: string,
): Promise<ApiFixture[]> {
  const all: ApiFixture[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const url = new URL(`${API_BASE}/fixtures`);
    url.searchParams.set("league", leagueId);
    url.searchParams.set("season", season);
    url.searchParams.set("page", String(page));

    const apiRes = await fetch(url, {
      headers: { "x-apisports-key": apiKey },
    });

    if (!apiRes.ok) {
      throw new Error(`API-Football HTTP ${apiRes.status}: ${await apiRes.text()}`);
    }

    const apiJson = await apiRes.json();
    const fixtures = (apiJson.response ?? []) as ApiFixture[];
    all.push(...fixtures);

    totalPages = apiJson.paging?.total ?? 1;
    page += 1;
  }

  return all;
}

function buildMatchRow(item: ApiFixture, now: string) {
  const status = item.fixture.status.short;
  const finished = FINISHED_STATUSES.has(status);
  const locked = LOCKED_STATUSES.has(status);
  const homeGoals = item.goals.home;
  const awayGoals = item.goals.away;
  const kickoffAt = item.fixture.date;
  const kickoffPassed = new Date(kickoffAt).getTime() <= Date.now();

  return {
    id: String(item.fixture.id),
    external_id: item.fixture.id,
    home_team: item.teams.home.name,
    away_team: item.teams.away.name,
    kickoff_at: kickoffAt,
    stage: mapStage(item.league.round),
    status,
    synced_at: now,
    is_locked: locked || kickoffPassed,
    home_score: finished && homeGoals != null ? homeGoals : null,
    away_score: finished && awayGoals != null ? awayGoals : null,
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, content-type",
      },
    });
  }

  if (!isAuthorized(req)) {
    return Response.json(
      { error: "Unauthorized — configure CRON_SECRET e envie Authorization: Bearer <secret>" },
      { status: 401 },
    );
  }

  const apiKey = Deno.env.get("API_FOOTBALL_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const leagueId = Deno.env.get("API_FOOTBALL_LEAGUE_ID") ?? "1";
  const season = Deno.env.get("API_FOOTBALL_SEASON") ?? "2026";

  if (!apiKey) {
    return Response.json(
      { error: "API_FOOTBALL_KEY não configurada nos secrets da Edge Function" },
      { status: 500 },
    );
  }

  if (!supabaseUrl || !serviceRoleKey) {
    return Response.json(
      { error: "Supabase URL ou SERVICE_ROLE_KEY ausentes" },
      { status: 500 },
    );
  }

  try {
    const fixtures = await fetchAllFixtures(apiKey, leagueId, season);
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const now = new Date().toISOString();
    let upserted = 0;
    let resultsUpdated = 0;

    const batchSize = 50;
    for (let i = 0; i < fixtures.length; i += batchSize) {
      const batch = fixtures.slice(i, i + batchSize).map((item) => buildMatchRow(item, now));
      const { error } = await supabase.from("matches").upsert(batch, {
        onConflict: "external_id",
      });

      if (error) {
        console.error("Batch upsert error", error.message);
        return Response.json({ error: error.message }, { status: 500 });
      }

      upserted += batch.length;
      resultsUpdated += batch.filter(
        (row) => row.home_score != null && row.away_score != null,
      ).length;
    }

    return Response.json({
      ok: true,
      leagueId,
      season,
      fixturesFromApi: fixtures.length,
      upserted,
      resultsUpdated,
      syncedAt: now,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
});
