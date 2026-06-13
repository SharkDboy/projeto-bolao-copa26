import { useCallback, useEffect, useState } from "react";
import RankingTable from "../components/RankingTable";
import { useAuth } from "../contexts/AuthContext";
import { useRefreshInterval } from "../lib/useRefreshInterval";
import { subscribeToMatchChanges } from "../services/matches";
import { fetchRanking } from "../services/ranking";
import type { RankingEntry } from "../types";

const REFRESH_MS = 60_000;

export default function RankingPage() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const load = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);
    setError(null);
    try {
      const data = await fetchRanking();
      setEntries(data);
      setLastUpdated(new Date());
    } catch {
      setError("Não foi possível carregar o ranking.");
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(true);
  }, [load]);

  useEffect(() => {
    return subscribeToMatchChanges(() => {
      load(false);
    });
  }, [load]);

  useRefreshInterval(() => {
    load(false);
  }, REFRESH_MS);

  const myEntry = entries.find((e) => e.userId === user?.id);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Ranking</h2>
        <p className="mt-1 text-sm text-zinc-400">
          3 pts placar exato · 1 pt vencedor/empate · pontua só após resultado
          oficial
        </p>
        {lastUpdated && (
          <p className="mt-1 text-xs text-zinc-500">
            Atualizado às{" "}
            {lastUpdated.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            · recarrega a cada 60s
          </p>
        )}
        {myEntry && (
          <p className="mt-2 text-sm text-emerald-400">
            Sua posição: {myEntry.position}º · {myEntry.points} pts (
            {myEntry.scoredPredictionsCount} jogos pontuados)
          </p>
        )}
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>

      {loading ? (
        <p className="text-sm text-zinc-400">Carregando ranking...</p>
      ) : entries.length === 0 ? (
        <p className="text-sm text-zinc-500">
          Nenhum palpite registrado ainda. Faça seus palpites em Partidas.
        </p>
      ) : (
        <RankingTable entries={entries} currentUserId={user?.id} />
      )}
    </div>
  );
}
