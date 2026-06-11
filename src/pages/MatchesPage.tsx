import { useEffect, useState } from "react";
import MatchCard from "../components/MatchCard";
import { useAuth } from "../contexts/AuthContext";
import { fetchMatches } from "../services/matches";
import {
  fetchUserPredictions,
  upsertPrediction,
} from "../services/predictions";
import type { Match, Prediction } from "../types";

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

  useEffect(() => {
    if (!user) return;
    const userId = user.id;

    let cancelled = false;

    async function load() {
      setLoading(true);
      setLoadError(null);
      try {
        const [matchList, userPredictions] = await Promise.all([
          fetchMatches(),
          fetchUserPredictions(userId),
        ]);
        if (!cancelled) {
          setMatches(matchList);
          setPredictions(userPredictions);
        }
      } catch {
        if (!cancelled) {
          setLoadError(
            "Não foi possível carregar partidas. Verifique se o Supabase está configurado.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [user]);

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

  if (loading) {
    return <p className="text-sm text-zinc-400">Carregando partidas...</p>;
  }

  if (matches.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-white">Partidas</h2>
        <p className="mt-4 text-sm text-red-400">
          Nenhuma partida encontrada. Execute o setup do Supabase (veja DEPLOY.md).
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Partidas</h2>
        <p className="mt-1 text-sm text-zinc-400">
          {savedCount} de {matches.length} palpites salvos ·{" "}
          {openMatches.length} abertas para palpite
        </p>
        {loadError && (
          <p className="mt-2 text-sm text-red-400">{loadError}</p>
        )}
        {saveError && (
          <p className="mt-2 text-sm text-red-400">{saveError}</p>
        )}
      </div>

      {openMatches.length > 0 && (
        <section className="mb-8">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-400">
            Abertas para palpite
          </h3>
          <div className="space-y-4">
            {openMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                savedPrediction={predictions[match.id]}
                onSave={handleSave}
                saving={savingMatchId === match.id}
              />
            ))}
          </div>
        </section>
      )}

      {closedMatches.length > 0 && (
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Encerradas
          </h3>
          <div className="space-y-4">
            {closedMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                savedPrediction={predictions[match.id]}
                onSave={handleSave}
                saving={savingMatchId === match.id}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
