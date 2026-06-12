import { useEffect, useState } from "react";
import type { Match, Prediction } from "../types";
import { calculateMatchPoints, hasResult } from "../lib/scoring";
import { isLiveStatus, isMatchFinished } from "../lib/matchStatus";
import { getTeamDisplayName } from "../lib/teamFlags";
import TeamFlag from "./TeamFlag";

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
  const matchFinished = isMatchFinished(match);

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

  const scoreInputClass =
    "w-14 rounded-lg border border-zinc-700 bg-zinc-800 py-2 text-center text-lg font-bold text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 sm:w-16";

  const homeLabel = getTeamDisplayName(match.homeTeam);
  const awayLabel = getTeamDisplayName(match.awayTeam);

  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-lg sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300 sm:px-3">
            {match.stage}
          </span>
          {isLiveStatus(match.status) ? (
            <span className="rounded-full bg-red-950 px-2 py-1 text-xs font-semibold text-red-400">
              Ao vivo
            </span>
          ) : null}
          {matchFinished ? (
            <span className="rounded-full bg-amber-950 px-2 py-1 text-xs font-semibold text-amber-300">
              Encerrado
            </span>
          ) : null}
        </div>
        <time className="text-xs text-zinc-500">{formatKickoff(match.kickoffAt)}</time>
      </div>

      {matchFinished && resultAvailable && (
        <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-300">
            Placar final
          </p>
          <p className="mt-1 text-lg font-bold text-white">
            {homeLabel}{" "}
            <span className="text-amber-300">
              {match.resultHomeScore} × {match.resultAwayScore}
            </span>{" "}
            {awayLabel}
          </p>
        </div>
      )}

      {matchFinished && !resultAvailable && (
        <p className="mb-4 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-center text-sm text-amber-300">
          Partida encerrada; placar final ainda indisponível.
        </p>
      )}

      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 sm:gap-x-4">
        <p className="truncate text-right text-sm font-semibold text-white sm:text-base">
          {homeLabel}
        </p>

        <div className="flex items-end justify-center gap-2 sm:gap-3">
          <div className="flex flex-col items-center gap-1.5">
            <TeamFlag teamName={match.homeTeam} size="lg" />
            <input
              type="number"
              min={0}
              max={20}
              aria-label={`Placar ${homeLabel}`}
              value={homeScore}
              disabled={disabled}
              onChange={(e) => setHomeScore(Number(e.target.value))}
              className={scoreInputClass}
            />
          </div>

          <span className="pb-2 text-lg font-bold text-zinc-600 sm:text-xl">×</span>

          <div className="flex flex-col items-center gap-1.5">
            <TeamFlag teamName={match.awayTeam} size="lg" />
            <input
              type="number"
              min={0}
              max={20}
              aria-label={`Placar ${awayLabel}`}
              value={awayScore}
              disabled={disabled}
              onChange={(e) => setAwayScore(Number(e.target.value))}
              className={scoreInputClass}
            />
          </div>
        </div>

        <p className="truncate text-left text-sm font-semibold text-white sm:text-base">
          {awayLabel}
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
          className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {saving ? "Salvando..." : justSaved ? "Salvo!" : "Salvar palpite"}
        </button>
      </div>
    </article>
  );
}
