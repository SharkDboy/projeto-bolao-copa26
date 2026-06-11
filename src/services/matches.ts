import { supabase } from "../lib/supabase";
import type { Match } from "../types";

interface MatchRow {
  id: string;
  home_team: string;
  away_team: string;
  kickoff_at: string;
  stage: string;
  home_score: number | null;
  away_score: number | null;
  is_locked: boolean;
  status: string | null;
}

function mapMatch(row: MatchRow): Match {
  const kickoffAt = row.kickoff_at;
  const kickoffPassed = new Date(kickoffAt).getTime() <= Date.now();

  return {
    id: row.id,
    homeTeam: row.home_team,
    awayTeam: row.away_team,
    kickoffAt,
    stage: row.stage,
    resultHomeScore: row.home_score,
    resultAwayScore: row.away_score,
    status: row.status,
    isLocked: row.is_locked || kickoffPassed,
  };
}

export async function fetchMatches(): Promise<Match[]> {
  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .order("kickoff_at", { ascending: true });

  if (error) throw error;

  return ((data ?? []) as MatchRow[]).map(mapMatch);
}
