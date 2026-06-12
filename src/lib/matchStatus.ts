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

const LIVE_STATUSES = new Set(["1H", "2H", "HT", "LIVE"]);

function normalizeStatus(status: string | null | undefined) {
  return status?.trim().toUpperCase().replace(/[\s_-]+/g, "") ?? "";
}

export function isFinishedStatus(status: string | null | undefined) {
  return FINISHED_STATUSES.has(normalizeStatus(status));
}

export function isLiveStatus(status: string | null | undefined) {
  return LIVE_STATUSES.has(normalizeStatus(status));
}

export function isMatchFinished(match: Match) {
  return (
    isFinishedStatus(match.status) ||
    (match.resultHomeScore != null && match.resultAwayScore != null)
  );
}
