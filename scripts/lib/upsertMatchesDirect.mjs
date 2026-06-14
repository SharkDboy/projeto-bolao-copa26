/**
 * Upsert direto em matches (fallback quando upsert_matches_sync não existe).
 */

export async function upsertMatchesDirect(supabase, rows) {
  let upserted = 0;
  let resultsUpdated = 0;

  for (const row of rows) {
    const { data: existing } = await supabase
      .from("matches")
      .select("home_score, away_score")
      .eq("external_id", row.external_id)
      .maybeSingle();

    const homeScore =
      row.home_score != null ? row.home_score : (existing?.home_score ?? null);
    const awayScore =
      row.away_score != null ? row.away_score : (existing?.away_score ?? null);

    const status =
      homeScore != null && awayScore != null
        ? "FT"
        : row.status;

    const payload = {
      id: row.id,
      external_id: row.external_id,
      home_team: row.home_team,
      away_team: row.away_team,
      kickoff_at: row.kickoff_at,
      stage: row.stage,
      home_score: homeScore,
      away_score: awayScore,
      is_locked: row.is_locked,
      status,
      synced_at: row.synced_at,
    };

    const { error } = await supabase
      .from("matches")
      .upsert(payload, { onConflict: "external_id" });

    if (error) throw error;

    upserted += 1;
    if (homeScore != null && awayScore != null) {
      resultsUpdated += 1;
    }
  }

  return { upserted, resultsUpdated };
}
