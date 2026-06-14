import { supabase } from "../lib/supabase";
import type { RankingEntry } from "../types";

interface RankingRow {
  user_id: string;
  display_name: string;
  points: number;
  predictions_count: number;
  scored_predictions_count?: number;
}

export class RankingFetchError extends Error {
  constructor(
    message: string,
    readonly needsSqlSetup = false,
  ) {
    super(message);
    this.name = "RankingFetchError";
  }
}

export async function fetchRanking(): Promise<RankingEntry[]> {
  const { data, error } = await supabase.rpc("get_ranking");

  if (error) {
    const msg = error.message ?? "";
    const needsSqlSetup =
      msg.includes("scored_predictions_count") ||
      msg.includes("does not exist") ||
      msg.includes("42804");

    throw new RankingFetchError(
      needsSqlSetup
        ? "Ranking desatualizado no Supabase. Execute supabase/RODE-ANTES-DE-USAR.sql no SQL Editor."
        : msg || "Não foi possível carregar o ranking.",
      needsSqlSetup,
    );
  }

  return ((data ?? []) as RankingRow[]).map((row, index) => ({
    position: index + 1,
    userId: row.user_id,
    name: row.display_name,
    points: Number(row.points),
    predictionsCount: Number(row.predictions_count),
    scoredPredictionsCount: Number(row.scored_predictions_count ?? 0),
  }));
}
