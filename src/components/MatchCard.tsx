import { useEffect, useState } from "react";
import type { Match, Prediction } from "../types";
import { calculateMatchPoints, hasResult } from "../lib/scoring";
import { isMatchFinished } from "../lib/matchStatus";
import { normalizeScore, parseScoreInput } from "../lib/predictionValidation";
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

const scoreFieldClass =
  "w-10 min-w-[2.5rem] shrink-0 border-0 bg-transparent p-0 text-center text-3xl font-bold text-white focus:outline-none focus:ring-0 disabled:cursor-default disabled:opacity-90 sm:w-14 sm:text-4xl [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

interface ScoreFieldProps {
  value: number;
  label: string;
  disabled: boolean;
  onChange: (value: number) => void;
}

function ScoreField({ value, label, disabled, onChange }: ScoreFieldProps) {
  if (disabled) {
    return (
      <span className={scoreFieldClass} aria-label={`Placar ${label}`}>
        {value}
      </span>
    );
  }

  return (
    <input
      type="number"
      min={0}
      max={20}
      aria-label={`Placar ${label}`}
      value={value}
      onChange={(e) => onChange(parseScoreInput(e.target.value))}
      className={scoreFieldClass}
    />
  );
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
      homeScore: normalizeScore(homeScore),
      awayScore: normalizeScore(awayScore),
    });
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  const homeLabel = getTeamDisplayName(match.homeTeam);
  const awayLabel = getTeamDisplayName(match.awayTeam);

  return (
    <article className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 pb-3 pt-4 sm:px-5">
        <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300 sm:px-3">
          {match.stage}
        </span>
        <time className="text-xs text-zinc-500">{formatKickoff(match.kickoffAt)}</time>
      </div>

      <div className="flex items-stretch border-y border-zinc-800">
        <div className="flex min-w-0 flex-1 items-stretch">
          <TeamFlag
            teamName={match.homeTeam}
            size="panel"
            panelSide="left"
          />
          <div className="flex min-w-0 flex-1 items-center justify-center gap-1 px-2 py-3 sm:gap-2 sm:px-3">
            <span className="min-w-0 flex-1 truncate text-center text-sm font-semibold text-white sm:text-base">
              {homeLabel}
            </span>
            <ScoreField
              value={homeScore}
              label={homeLabel}
              disabled={disabled}
              onChange={setHomeScore}
            />
          </div>
        </div>

        <span
          className="flex shrink-0 items-center px-1 text-2xl font-bold text-zinc-500 sm:px-2 sm:text-3xl"
          aria-hidden="true"
        >
          ×
        </span>

        <div className="flex min-w-0 flex-1 items-stretch">
          <div className="flex min-w-0 flex-1 items-center justify-center gap-1 px-2 py-3 sm:gap-2 sm:px-3">
            <ScoreField
              value={awayScore}
              label={awayLabel}
              disabled={disabled}
              onChange={setAwayScore}
            />
            <span className="min-w-0 flex-1 truncate text-center text-sm font-semibold text-white sm:text-base">
              {awayLabel}
            </span>
          </div>
          <TeamFlag
            teamName={match.awayTeam}
            size="panel"
            panelSide="right"
          />
        </div>
      </div>

      {matchFinished && resultAvailable && (
        <div className="border-t border-zinc-800 px-4 py-3 text-center sm:px-5">
          <p className="text-xs text-amber-300/90">
            Placar final:{" "}
            <span className="font-bold text-amber-300">
              {match.resultHomeScore} × {match.resultAwayScore}
            </span>
          </p>
          <p className="mt-1.5 text-sm">
            {savedPrediction ? (
              pointsEarned! > 0 ? (
                <span className="font-semibold text-emerald-400">
                  Bolão: +{pointsEarned} pts
                </span>
              ) : (
                <span className="text-zinc-400">
                  Bolão: 0 pts — errou o palpite
                </span>
              )
            ) : (
              <span className="text-zinc-500">Bolão: sem palpite</span>
            )}
          </p>
        </div>
      )}

      {matchFinished && !resultAvailable && (
        <p className="border-t border-zinc-800 px-4 py-3 text-center text-sm text-amber-300 sm:px-5">
          Partida encerrada; placar final ainda indisponível.
        </p>
      )}

      {!disabled && (
        <div className="px-4 py-3 sm:px-5">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Salvando..." : justSaved ? "Salvo!" : "Salvar palpite"}
          </button>
        </div>
      )}
    </article>
  );
}
