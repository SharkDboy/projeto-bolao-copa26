import { useEffect, useState } from "react";
import type { Match, Prediction } from "../types";
import { calculateMatchPoints, hasResult } from "../lib/scoring";

interface MatchCardProps {
  match: Match;
  savedPrediction?: Prediction;
  onSave: (prediction: Prediction) => void;
  saving?: boolean;
}

function formatKickoff(iso: string) {
  const date = new Date(iso);
  return date.toLocaleString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MatchCard({
  match,
  savedPrediction,
  onSave,
  saving = false,
}: MatchCardProps) {
  const [homeScore, setHomeScore] = useState(
    savedPrediction?.homeScore ?? 0,
  );
  const [awayScore, setAwayScore] = useState(
    savedPrediction?.awayScore ?? 0,
  );
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (savedPrediction) {
      setHomeScore(savedPrediction.homeScore);
      setAwayScore(savedPrediction.awayScore);
    }
  }, [savedPrediction]);

  const disabled = match.isLocked;
  const resultAvailable = hasResult(
    match.resultHomeScore,
    match.resultAwayScore,
  );

  const pointsEarned =
    savedPrediction && resultAvailable
      ? calculateMatchPoints(savedPrediction, {
          homeScore: match.resultHomeScore!,
          awayScore: match.resultAwayScore!,
        })
      : null;

  function handleSave() {
    onSave({
      matchId: match.id,
      homeScore,
      awayScore,
    });
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
            {match.stage}
          </span>
          {match.status === "LIVE" ||
          match.status === "1H" ||
          match.status === "2H" ||
          match.status === "HT" ? (
            <span className="rounded-full bg-red-950 px-2 py-1 text-xs font-semibold text-red-400">
              Ao vivo
            </span>
          ) : null}
        </div>
        <time className="text-xs text-zinc-500">{formatKickoff(match.kickoffAt)}</time>
      </div>

      <div className="mb-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <p className="text-right text-base font-semibold text-white">
          {match.homeTeam}
        </p>
        <span className="text-xs font-bold text-zinc-600">VS</span>
        <p className="text-left text-base font-semibold text-white">
          {match.awayTeam}
        </p>
      </div>

      {resultAvailable && (
        <p className="mb-4 text-center text-sm text-amber-400">
          Resultado: {match.resultHomeScore} × {match.resultAwayScore}
        </p>
      )}

      <div className="flex items-end justify-center gap-4">
        <label className="flex flex-col items-center gap-1">
          <span className="text-xs text-zinc-500">Casa</span>
          <input
            type="number"
            min={0}
            max={20}
            value={homeScore}
            disabled={disabled}
            onChange={(e) => setHomeScore(Number(e.target.value))}
            className="w-16 rounded-lg border border-zinc-700 bg-zinc-800 px-2 py-2 text-center text-lg font-bold text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
          />
        </label>
        <span className="pb-2 text-xl font-bold text-zinc-600">×</span>
        <label className="flex flex-col items-center gap-1">
          <span className="text-xs text-zinc-500">Visitante</span>
          <input
            type="number"
            min={0}
            max={20}
            value={awayScore}
            disabled={disabled}
            onChange={(e) => setAwayScore(Number(e.target.value))}
            className="w-16 rounded-lg border border-zinc-700 bg-zinc-800 px-2 py-2 text-center text-lg font-bold text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
          />
        </label>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          {savedPrediction ? (
            <span className="text-sm text-emerald-400">
              Palpite: {savedPrediction.homeScore} × {savedPrediction.awayScore}
            </span>
          ) : (
            <span className="text-sm text-zinc-500">Nenhum palpite salvo</span>
          )}
          {pointsEarned !== null && (
            <span className="text-sm font-semibold text-amber-400">
              +{pointsEarned} pts
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={disabled || saving}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Salvando..." : justSaved ? "Salvo!" : "Salvar palpite"}
        </button>
      </div>
    </article>
  );
}
