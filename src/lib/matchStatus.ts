import type { Match } from "../types";

const FINISHED_STATUSES = new Set([
  "AET",
  "COMPLETE",
  "COMPLETED",
  "ENDED",
  "FINAL",
  "FINISHED",
  "FT",
  "FULLTIME",
  "PEN",
]);

function normalizeStatus(status: string | null | undefined) {
  return status?.trim().toUpperCase().replace(/[\s_-]+/g, "") ?? "";
}

function isFinishedStatus(status: string | null | undefined) {
  return FINISHED_STATUSES.has(normalizeStatus(status));
}

export function isMatchFinished(match: Match) {
  return (
    isFinishedStatus(match.status) ||
    (match.resultHomeScore != null && match.resultAwayScore != null)
  );
}

export function isMatchOpen(match: Match): boolean {
  return new Date(match.kickoffAt) > new Date() && !isMatchFinished(match);
}

type MatchCategory = "open" | "inProgress" | "finished";

function categorizeMatch(match: Match): MatchCategory {
  if (isMatchFinished(match)) return "finished";
  if (new Date(match.kickoffAt) <= new Date()) return "inProgress";
  return "open";
}

export function splitMatchesByCategory(matches: Match[]) {
  const open: Match[] = [];
  const inProgress: Match[] = [];
  const finished: Match[] = [];

  for (const match of matches) {
    const category = categorizeMatch(match);
    if (category === "open") open.push(match);
    else if (category === "inProgress") inProgress.push(match);
    else finished.push(match);
  }

  return { open, inProgress, finished };
}
