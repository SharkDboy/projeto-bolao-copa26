interface Score {
  homeScore: number;
  awayScore: number;
}

function outcome(home: number, away: number): number {
  if (home > away) return 1;
  if (home < away) return -1;
  return 0;
}

export function calculateMatchPoints(
  prediction: Score,
  result: Score,
): number {
  if (
    prediction.homeScore === result.homeScore &&
    prediction.awayScore === result.awayScore
  ) {
    return 3;
  }

  if (
    outcome(prediction.homeScore, prediction.awayScore) ===
    outcome(result.homeScore, result.awayScore)
  ) {
    return 1;
  }

  return 0;
}

export function hasResult(
  homeScore: number | null | undefined,
  awayScore: number | null | undefined,
): homeScore is number {
  return homeScore != null && awayScore != null;
}
