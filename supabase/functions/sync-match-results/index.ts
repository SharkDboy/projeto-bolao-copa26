import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import {
  DEFAULT_WORLDCUP_URL,
  fetchWorldCupMatches,
  rowsFromMatches,
} from "../_shared/worldcup2026.js";

const BATCH_SIZE = 50;

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
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const worldcupUrl =
    Deno.env.get("WORLDCUP2026_API_URL") ?? DEFAULT_WORLDCUP_URL;

  if (!supabaseUrl || !serviceRoleKey) {
    return Response.json({ error: "Supabase config ausente" }, { status: 500 });
  }

  try {
    const matches = await fetchWorldCupMatches(worldcupUrl);
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
        return Response.json({ error: error.message }, { status: 500 });
      }

      upserted += (data as { upserted?: number })?.upserted ?? batch.length;
      resultsUpdated += (data as { results_updated?: number })?.results_updated ?? 0;
    }

    return Response.json({
      ok: true,
      source: "rezarahiminia/worldcup2026",
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
