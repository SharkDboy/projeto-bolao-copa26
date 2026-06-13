import { supabase } from "../lib/supabase";
import type { Match } from "../types";

interface MatchRow {
  id: string;
  external_id?: number | null;
  home_team: string;
  away_team: string;
  kickoff_at: string;
  stage: string;
  home_score: number | null;
  away_score: number | null;
  is_locked: boolean;
  status: string | null;
}

let matchChannelCounter = 0;

function mapMatch(row: MatchRow): Match {
  const kickoffAt = row.kickoff_at;
  const kickoffPassed = new Date(kickoffAt).getTime() <= Date.now();

  return {
    id: row.id,
    externalId: row.external_id,
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

function sortMatches(matches: Match[]) {
  return [...matches].sort(
    (a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime(),
  );
}

function isPlaceholderTeam(team: string) {
  return team.trim().toUpperCase() === "TBD";
}

function duplicateSignature(match: Match) {
  if (isPlaceholderTeam(match.homeTeam) || isPlaceholderTeam(match.awayTeam)) {
    return null;
  }

  return [
    match.stage,
    match.kickoffAt,
    match.homeTeam.trim().toUpperCase(),
    match.awayTeam.trim().toUpperCase(),
  ].join("|");
}

function hasResult(match: Match) {
  return match.resultHomeScore != null && match.resultAwayScore != null;
}

function preferMatch(candidate: Match, current: Match) {
  if (hasResult(candidate) !== hasResult(current)) {
    return hasResult(candidate) ? candidate : current;
  }

  if (candidate.externalId != null && current.externalId == null) {
    return candidate;
  }

  return current;
}

export function normalizeMatches(matches: Match[]) {
  const byId = new Map<string, Match>();

  for (const match of matches) {
    const current = byId.get(match.id);
    byId.set(match.id, current ? preferMatch(match, current) : match);
  }

  const bySignature = new Map<string, Match>();
  const normalized: Match[] = [];

  for (const match of byId.values()) {
    const signature = duplicateSignature(match);
    if (!signature) {
      normalized.push(match);
      continue;
    }

    const current = bySignature.get(signature);
    if (!current) {
      bySignature.set(signature, match);
      normalized.push(match);
      continue;
    }

    const preferred = preferMatch(match, current);
    bySignature.set(signature, preferred);
    const index = normalized.findIndex((item) => item === current);
    if (index >= 0) normalized[index] = preferred;
  }

  return sortMatches(normalized);
}

export function mergeMatchUpdate(matches: Match[], updatedMatch: Match) {
  const index = matches.findIndex((match) => match.id === updatedMatch.id);

  if (index >= 0) {
    const next = [...matches];
    next[index] = updatedMatch;
    return normalizeMatches(next);
  }

  const signature = duplicateSignature(updatedMatch);
  if (signature) {
    const signatureIndex = matches.findIndex(
      (match) => duplicateSignature(match) === signature,
    );
    if (signatureIndex >= 0) {
      const next = [...matches];
      next[signatureIndex] = preferMatch(updatedMatch, next[signatureIndex]);
      return normalizeMatches(next);
    }
  }

  return normalizeMatches([...matches, updatedMatch]);
}

export async function fetchMatches(): Promise<Match[]> {
  const { data, error } = await supabase
    .from("matches")
    .select(
      "id, external_id, home_team, away_team, kickoff_at, stage, home_score, away_score, is_locked, status",
    )
    .order("kickoff_at", { ascending: true });

  if (error) throw error;

  return normalizeMatches(((data ?? []) as MatchRow[]).map(mapMatch));
}

export function subscribeToMatchChanges(onChange: (match: Match) => void) {
  const channel = supabase
    .channel(`matches-updates-${++matchChannelCounter}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "matches" },
      (payload) => {
        if (payload.eventType === "DELETE") return;
        onChange(mapMatch(payload.new as MatchRow));
      },
    )
    .subscribe();

  return () => {
    void supabase.removeChannel(channel);
  };
}
