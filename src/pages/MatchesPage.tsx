import { useCallback, useEffect, useMemo, useState } from "react";
import RoundAccordion from "../components/RoundAccordion";
import { useAuth } from "../contexts/AuthContext";
import { groupMatchesByRound } from "../lib/matchStages";
import {
  isMatchOpen,
  splitMatchesByCategory,
} from "../lib/matchStatus";
import { useRefreshInterval } from "../lib/useRefreshInterval";
import { fetchMatches } from "../services/matches";
import {
  fetchUserPredictions,
  upsertPrediction,
} from "../services/predictions";
import type { Match, Prediction } from "../types";

const REFRESH_MS = 60_000;

export default function MatchesPage() {
  const { user } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const [predictions, setPredictions] = useState<Record<string, Prediction>>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [savingMatchId, setSavingMatchId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const load = useCallback(
    async (showLoading = false) => {
      if (!user) return;
      if (showLoading) setLoading(true);
      setLoadError(null);
      try {
        const [matchList, userPredictions] = await Promise.all([
          fetchMatches(),
          fetchUserPredictions(user.id),
        ]);
        setMatches(matchList);
        setPredictions(userPredictions);
      } catch {
        setLoadError(
          "Não foi possível carregar partidas. Verifique o Supabase.",
        );
      } finally {
        if (showLoading) setLoading(false);
      }
    },
    [user],
  );

  useEffect(() => {
    load(true);
  }, [load]);

  useRefreshInterval(() => {
    load(false);
  }, REFRESH_MS);

  async function handleSave(prediction: Prediction) {
    if (!user) return;

    const match = matches.find((m) => m.id === prediction.matchId);
    if (match?.isLocked) {
      setSaveError("Esta partida já está encerrada para palpites.");
      return;
    }

    setSavingMatchId(prediction.matchId);
    setSaveError(null);

    try {
      await upsertPrediction(user.id, prediction);
      setPredictions((prev) => ({
        ...prev,
        [prediction.matchId]: prediction,
      }));
    } catch {
      setSaveError(
        "Erro ao salvar palpite. A partida pode estar trancada ou o prazo encerrado.",
      );
    } finally {
      setSavingMatchId(null);
    }
  }

  const savedCount = Object.keys(predictions).length;
  const categoryTotals = useMemo(
    () => splitMatchesByCategory(matches),
    [matches],
  );
  const rounds = useMemo(() => groupMatchesByRound(matches), [matches]);
  const firstOpenRoundIndex = rounds.findIndex(({ matches: roundMatches }) =>
    roundMatches.some(isMatchOpen),
  );
  const defaultOpenRoundIndex =
    firstOpenRoundIndex === -1 ? 0 : firstOpenRoundIndex;

  if (loading) {
    return <p className="text-sm text-zinc-400">Carregando partidas...</p>;
  }

  if (matches.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-white">Partidas</h2>
        <p className="mt-4 text-sm text-red-400">
          Nenhuma partida encontrada. Execute{" "}
          <code className="text-zinc-300">supabase/seed-matches-2026.sql</code>{" "}
          no SQL Editor (veja DEPLOY.md).
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Copa do Mundo 2026</h2>
        <p className="mt-1 text-sm text-zinc-400">
          {savedCount} de {matches.length} palpites salvos ·{" "}
          {categoryTotals.open.length} abertos ·{" "}
          {categoryTotals.inProgress.length} em andamento ·{" "}
          {categoryTotals.finished.length} finalizados
        </p>
        {loadError && (
          <p className="mt-2 text-sm text-red-400">{loadError}</p>
        )}
        {saveError && (
          <p className="mt-2 text-sm text-red-400">{saveError}</p>
        )}
      </div>

      <div className="space-y-4">
        {rounds.map(({ round, matches: roundMatches }, index) => {
          const { open, inProgress, finished } =
            splitMatchesByCategory(roundMatches);

          return (
            <RoundAccordion
              key={round}
              title={round}
              matchesCount={roundMatches.length}
              openCount={open.length}
              inProgressCount={inProgress.length}
              finishedCount={finished.length}
              open={open}
              inProgress={inProgress}
              finished={finished}
              predictions={predictions}
              onSave={handleSave}
              savingMatchId={savingMatchId}
              defaultOpen={index === defaultOpenRoundIndex}
            />
          );
        })}
      </div>
    </div>
  );
}
