import { supabase } from "../lib/supabase";
import type { RankingEntry } from "../types";

interface RankingRow {
  user_id: string;
  display_name: string;
  points: number;
  predictions_count: number;
  scored_predictions_count: number;
}

export async function fetchRanking(): Promise<RankingEntry[]> {
  const { data, error } = await supabase.rpc("get_ranking");

  if (error) throw error;

  return ((data ?? []) as RankingRow[]).map((row, index) => ({
    position: index + 1,
    userId: row.user_id,
    name: row.display_name,
    points: Number(row.points),
    predictionsCount: Number(row.predictions_count),
    scoredPredictionsCount: Number(row.scored_predictions_count ?? 0),
  }));
}
