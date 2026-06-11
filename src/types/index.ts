export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  kickoffAt: string;
  stage: string;
  isLocked: boolean;
  resultHomeScore?: number | null;
  resultAwayScore?: number | null;
}

export interface Prediction {
  matchId: string;
  homeScore: number;
  awayScore: number;
}

export interface RankingEntry {
  position: number;
  userId: string;
  name: string;
  points: number;
  predictionsCount: number;
}
