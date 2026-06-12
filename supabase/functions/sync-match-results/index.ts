import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import {
  DEFAULT_WORLDCUP_URL,
  fetchWorldCupMatches,
  rowsFromMatches,
} from "../_shared/openfootball.js";

function safeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const aa = enc.encode(a);
  const bb = enc.encode(b);
  if (aa.length !== bb.length) return false;
  let result = 0;
  for (let i = 0; i < aa.length; i++) {
    result |= aa[i] ^ bb[i];
  }
  return result === 0;
}

function isAuthorized(req: Request): boolean {
  const cronSecret = Deno.env.get("CRON_SECRET");
  if (!cronSecret) return false;
  const header = req.headers.get("Authorization");
  if (!header?.startsWith("Bearer ")) return false;
  return safeEqual(header.slice(7), cronSecret);
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

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const worldcupUrl =
    Deno.env.get("OPENFOOTBALL_WORLDCUP_URL") ?? DEFAULT_WORLDCUP_URL;

  if (!supabaseUrl || !serviceRoleKey) {
    return Response.json(
      { error: "Supabase URL ou SERVICE_ROLE_KEY ausentes" },
      { status: 500 },
    );
  }

  try {
    const matches = await fetchWorldCupMatches(worldcupUrl);
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const now = new Date().toISOString();
    const rows = rowsFromMatches(matches, now);

    const batchSize = 50;
    let upserted = 0;
    let resultsUpdated = 0;

    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
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
      source: "openfootball/worldcup.json",
      url: worldcupUrl,
      fixturesFromApi: matches.length,
      upserted,
      resultsUpdated,
      syncedAt: now,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
});
