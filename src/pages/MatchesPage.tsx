import { useCallback, useEffect, useMemo, useState } from "react";
import MatchCard from "../components/MatchCard";
import { useAuth } from "../contexts/AuthContext";
import { groupMatchesByStage } from "../lib/matchStages";
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
  const openMatches = matches.filter((m) => !m.isLocked);
  const closedMatches = matches.filter((m) => m.isLocked);
  const withResult = matches.filter(
    (m) => m.resultHomeScore != null && m.resultAwayScore != null,
  ).length;
  const openByStage = useMemo(
    () => groupMatchesByStage(openMatches),
    [openMatches],
  );
  const closedByStage = useMemo(
    () => groupMatchesByStage(closedMatches),
    [closedMatches],
  );

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
          {openMatches.length} abertas · {withResult} com resultado oficial
        </p>
        {loadError && (
          <p className="mt-2 text-sm text-red-400">{loadError}</p>
        )}
        {saveError && (
          <p className="mt-2 text-sm text-red-400">{saveError}</p>
        )}
      </div>

      {openByStage.length > 0 && (
        <section className="mb-8">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-emerald-400">
            Abertas para palpite
          </h3>
          <div className="space-y-8">
            {openByStage.map(({ stage, matches: stageMatches }) => (
              <div key={stage}>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    {stage} · {stageMatches.length}{" "}
                    {stageMatches.length === 1 ? "jogo" : "jogos"}
                  </h4>
                  <span className="text-[11px] font-medium text-zinc-500">
                    3 pts placar exato · 1 pt vencedor/empate
                  </span>
                </div>
                <div className="space-y-4">
                  {stageMatches.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      savedPrediction={predictions[match.id]}
                      onSave={handleSave}
                      saving={savingMatchId === match.id}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {closedByStage.length > 0 && (
        <section>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Encerradas
          </h3>
          <div className="space-y-8">
            {closedByStage.map(({ stage, matches: stageMatches }) => (
              <div key={stage}>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                    {stage} · {stageMatches.length}{" "}
                    {stageMatches.length === 1 ? "jogo" : "jogos"}
                  </h4>
                  <span className="text-[11px] font-medium text-zinc-500">
                    3 pts placar exato · 1 pt vencedor/empate
                  </span>
                </div>
                <div className="space-y-4">
                  {stageMatches.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      savedPrediction={predictions[match.id]}
                      onSave={handleSave}
                      saving={savingMatchId === match.id}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
