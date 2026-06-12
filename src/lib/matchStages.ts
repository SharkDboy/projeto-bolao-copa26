import type { Match } from "../types";

const STAGE_ORDER = [
  "Fase de Grupos",
  "32 avos de Final",
  "Oitavas de Final",
  "Quartas de Final",
  "Semifinal",
  "Disputa 3º lugar",
  "Final",
];

function stageSortIndex(round: string) {
  const normalizedRound = round.toLowerCase();
  const index = STAGE_ORDER.findIndex((stage) =>
    normalizedRound.startsWith(stage.toLowerCase()),
  );
  return index === -1 ? STAGE_ORDER.length : index;
}

function roundNumber(round: string) {
  const match = round.match(/(?:rodada|round|matchday)\s*(\d+)/i);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
}

function firstKickoff(matches: Match[]) {
  return Math.min(
    ...matches.map((match) => new Date(match.kickoffAt).getTime()),
  );
}

export function groupMatchesByRound(matches: Match[]) {
  const groups = new Map<string, Match[]>();

  for (const match of matches) {
    const list = groups.get(match.stage) ?? [];
    list.push(match);
    groups.set(match.stage, list);
  }

  return [...groups.entries()]
    .sort(([a, aMatches], [b, bMatches]) => {
      const stageOrderDiff = stageSortIndex(a) - stageSortIndex(b);
      if (stageOrderDiff !== 0) return stageOrderDiff;

      const roundNumberDiff = roundNumber(a) - roundNumber(b);
      if (roundNumberDiff !== 0) return roundNumberDiff;

      return firstKickoff(aMatches) - firstKickoff(bMatches);
    })
    .map(([round, roundMatches]) => ({
      round,
      matches: [...roundMatches].sort(
        (a, b) =>
          new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime(),
      ),
    }));
}

export const groupMatchesByStage = groupMatchesByRound;
