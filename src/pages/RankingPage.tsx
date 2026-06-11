import { useEffect, useState } from "react";
import RankingTable from "../components/RankingTable";
import { useAuth } from "../contexts/AuthContext";
import { fetchRanking } from "../services/ranking";
import type { RankingEntry } from "../types";

export default function RankingPage() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchRanking();
        if (!cancelled) setEntries(data);
      } catch {
        if (!cancelled) {
          setError("Não foi possível carregar o ranking.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const myEntry = entries.find((e) => e.userId === user?.id);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Ranking</h2>
        <p className="mt-1 text-sm text-zinc-400">
          3 pts placar exato · 1 pt vencedor/empate
        </p>
        {myEntry && (
          <p className="mt-2 text-sm text-emerald-400">
            Sua posição: {myEntry.position}º · {myEntry.points} pts
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
