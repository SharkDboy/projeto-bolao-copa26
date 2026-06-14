import { supabase } from "../lib/supabase";
import type { Prediction } from "../types";
import { isValidScore, normalizeScore } from "../lib/predictionValidation";

interface PredictionRow {
  match_id: string;
  home_score: number;
  away_score: number;
}

export async function fetchUserPredictions(
  userId: string,
): Promise<Record<string, Prediction>> {
  const { data, error } = await supabase
    .from("predictions")
    .select("match_id, home_score, away_score")
    .eq("user_id", userId);

  if (error) throw error;

  const map: Record<string, Prediction> = {};
  for (const row of (data ?? []) as PredictionRow[]) {
    map[row.match_id] = {
      matchId: row.match_id,
      homeScore: row.home_score,
      awayScore: row.away_score,
    };
  }
  return map;
}

export async function upsertPrediction(
  userId: string,
  prediction: Prediction,
): Promise<void> {
  const homeScore = normalizeScore(prediction.homeScore);
  const awayScore = normalizeScore(prediction.awayScore);

  if (!isValidScore(homeScore) || !isValidScore(awayScore)) {
    throw new Error("Placar inválido. Use números inteiros entre 0 e 20.");
  }

  const { error } = await supabase.from("predictions").upsert(
    {
      user_id: userId,
      match_id: prediction.matchId,
      home_score: homeScore,
      away_score: awayScore,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,match_id" },
  );

  if (error) throw error;
}
