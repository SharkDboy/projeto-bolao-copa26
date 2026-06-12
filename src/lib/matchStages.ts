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

function stageSortIndex(stage: string) {
  const index = STAGE_ORDER.indexOf(stage);
  return index === -1 ? STAGE_ORDER.length : index;
}

export function groupMatchesByStage(matches: Match[]) {
  const groups = new Map<string, Match[]>();

  for (const match of matches) {
    const list = groups.get(match.stage) ?? [];
    list.push(match);
    groups.set(match.stage, list);
  }

  return [...groups.entries()]
    .sort(([a], [b]) => stageSortIndex(a) - stageSortIndex(b))
    .map(([stage, stageMatches]) => ({
      stage,
      matches: stageMatches.sort(
        (a, b) =>
          new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime(),
      ),
    }));
}
