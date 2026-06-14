export const SCORE_MIN = 0;
export const SCORE_MAX = 20;

export function parseScoreInput(raw: string): number {
  const trimmed = raw.trim();
  if (trimmed === "") return 0;
  const value = Number(trimmed);
  if (!Number.isFinite(value)) return 0;
  return Math.min(SCORE_MAX, Math.max(SCORE_MIN, Math.trunc(value)));
}

export function normalizeScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(SCORE_MAX, Math.max(SCORE_MIN, Math.trunc(value)));
}

export function isValidScore(value: number): boolean {
  return Number.isInteger(value) && value >= SCORE_MIN && value <= SCORE_MAX;
}
