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
  if (value.includes("final") && !value.includes("semi") && !value.includes("quarter")) {
    return "Final";
  }
  if (value.includes("semi")) return "Semifinal";
  if (value.includes("quarter")) return "Quartas de Final";
  if (value.includes("round of 16") || value.includes("8th")) return "Oitavas de Final";
  if (value.includes("group")) return "Fase de Grupos";
  return round || "Copa do Mundo";
}

function isAuthorized(req: Request): boolean {
  const cronSecret = Deno.env.get("CRON_SECRET");
  if (!cronSecret) return false;
  const header = req.headers.get("Authorization");
  return header === `Bearer ${cronSecret}`;
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
    const apiRes = await fetch(
      `${API_BASE}/fixtures?league=${leagueId}&season=${season}`,
      { headers: { "x-apisports-key": apiKey } },
    );

    if (!apiRes.ok) {
      console.error("API-Football error", apiRes.status, await apiRes.text());
      return Response.json(
        { error: "Falha ao consultar API-Football" },
        { status: 502 },
      );
    }

    const apiJson = await apiRes.json();
    const fixtures = (apiJson.response ?? []) as ApiFixture[];

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const now = new Date().toISOString();
    let upserted = 0;
    let resultsUpdated = 0;

    for (const item of fixtures) {
      const status = item.fixture.status.short;
      const finished = FINISHED_STATUSES.has(status);
      const locked = LOCKED_STATUSES.has(status);
      const homeGoals = item.goals.home;
      const awayGoals = item.goals.away;

      const row = {
        id: String(item.fixture.id),
        external_id: item.fixture.id,
        home_team: item.teams.home.name,
        away_team: item.teams.away.name,
        kickoff_at: item.fixture.date,
        stage: mapStage(item.league.round),
        status,
        synced_at: now,
        is_locked: locked,
        home_score: finished && homeGoals != null ? homeGoals : null,
        away_score: finished && awayGoals != null ? awayGoals : null,
      };

      const { error } = await supabase.from("matches").upsert(row, {
        onConflict: "external_id",
      });

      if (error) {
        console.error("Upsert error", item.fixture.id, error.message);
        continue;
      }

      upserted += 1;
      if (finished) resultsUpdated += 1;
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
