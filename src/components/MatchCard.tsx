import { useEffect, useState, type KeyboardEvent } from "react";
import type { Match, Prediction } from "../types";
import { calculateMatchPoints, hasResult } from "../lib/scoring";
import { isMatchFinished } from "../lib/matchStatus";
import { normalizeScore, SCORE_MAX, SCORE_MIN } from "../lib/predictionValidation";
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

const overlayBoxClass =
  "rounded-lg border border-white/40 bg-black/45 shadow-md backdrop-blur-sm";

const scoreBoxClass =
  `${overlayBoxClass} flex items-stretch overflow-hidden focus-within:border-emerald-400/70 focus-within:ring-1 focus-within:ring-emerald-500/30`;

const teamNameBoxClass = `${overlayBoxClass} max-w-[min(100%,12rem)] px-3 py-1 sm:max-w-[14rem]`;

const teamNameClass =
  "block truncate text-center text-sm font-semibold text-white sm:text-base";

const scoreValueClass =
  "flex min-w-[2.5ch] flex-1 items-center justify-center px-2 py-1 text-5xl font-bold leading-none tabular-nums text-white sm:text-6xl";

const scoreStepColumnClass =
  "flex w-9 shrink-0 flex-col border-l border-white/20 sm:w-10";

const scoreStepClass =
  "flex flex-1 items-center justify-center text-zinc-300 transition-colors hover:bg-white/10 hover:text-white active:bg-white/15 disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:bg-transparent";

interface ScoreFieldProps {
  value: number;
  label: string;
  disabled: boolean;
  onChange: (value: number) => void;
}

function ScoreStepButton({
  direction,
  label,
  disabled,
  onClick,
}: {
  direction: "up" | "down";
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  const action = direction === "up" ? "Aumentar" : "Diminuir";

  return (
    <button
      type="button"
      aria-label={`${action} placar ${label}`}
      disabled={disabled}
      onClick={onClick}
      className={scoreStepClass}
    >
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
      className="h-3.5 w-3.5 sm:h-4 sm:w-4"
        aria-hidden="true"
      >
        {direction === "up" ? (
          <path
            fillRule="evenodd"
            d="M10 3a.75.75 0 01.53.22l4.5 4.5a.75.75 0 11-1.06 1.06L10 5.06 6.03 9.03a.75.75 0 01-1.06-1.06l4.5-4.5A.75.75 0 0110 3z"
            clipRule="evenodd"
          />
        ) : (
          <path
            fillRule="evenodd"
            d="M10 17a.75.75 0 01-.53-.22l-4.5-4.5a.75.75 0 111.06-1.06L10 14.94l3.97-3.97a.75.75 0 111.06 1.06l-4.5 4.5A.75.75 0 0110 17z"
            clipRule="evenodd"
          />
        )}
      </svg>
    </button>
  );
}

function ScoreField({ value, label, disabled, onChange }: ScoreFieldProps) {
  function step(delta: number) {
    onChange(normalizeScore(value + delta));
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowUp" || event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  }

  if (disabled) {
    return (
      <div className={`${scoreBoxClass} justify-center`}>
        <span className={`${scoreValueClass} flex-none px-4`} aria-label={`Placar ${label}`}>
          {value}
        </span>
      </div>
    );
  }

  return (
    <div
      className={scoreBoxClass}
      tabIndex={0}
      role="spinbutton"
      aria-label={`Placar ${label}`}
      aria-valuemin={SCORE_MIN}
      aria-valuemax={SCORE_MAX}
      aria-valuenow={value}
      onKeyDown={handleKeyDown}
    >
      <span className={scoreValueClass}>{value}</span>
      <div className={scoreStepColumnClass}>
        <ScoreStepButton
          direction="up"
          label={label}
          disabled={value >= SCORE_MAX}
          onClick={() => step(1)}
        />
        <div className="h-px bg-white/20" aria-hidden="true" />
        <ScoreStepButton
          direction="down"
          label={label}
          disabled={value <= SCORE_MIN}
          onClick={() => step(-1)}
        />
      </div>
    </div>
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

      <div className="relative min-h-[7rem] overflow-hidden border-y border-zinc-800 sm:min-h-[8rem]">
        <div className="absolute inset-0 z-[1] flex" aria-hidden="true">
          <div className="relative flex-1">
            <TeamFlag
              teamName={match.homeTeam}
              size="panel"
              panelSide="left"
              fillContainer
            />
            <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-r from-transparent to-black/50 sm:w-12" />
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-1/2 z-[1] w-4 -translate-x-1/2 bg-gradient-to-r from-black/40 via-black/55 to-black/40 sm:w-6" />
          <div className="relative flex-1">
            <TeamFlag
              teamName={match.awayTeam}
              size="panel"
              panelSide="right"
              fillContainer
            />
            <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-l from-transparent to-black/50 sm:w-12" />
          </div>
        </div>

        <div className="relative z-[2] flex items-stretch">
          <div className="flex flex-1 flex-col items-center justify-center gap-1 px-2 py-5 sm:gap-1.5 sm:py-6">
            <div className={teamNameBoxClass}>
              <span className={teamNameClass}>{homeLabel}</span>
            </div>
            <ScoreField
              value={homeScore}
              label={homeLabel}
              disabled={disabled}
              onChange={setHomeScore}
            />
          </div>

          <span
            className="flex shrink-0 items-center self-center px-0.5 text-sm font-normal text-zinc-400 drop-shadow-sm sm:px-1"
            aria-hidden="true"
          >
            ×
          </span>

          <div className="flex flex-1 flex-col items-center justify-center gap-1 px-2 py-5 sm:gap-1.5 sm:py-6">
            <div className={teamNameBoxClass}>
              <span className={teamNameClass}>{awayLabel}</span>
            </div>
            <ScoreField
              value={awayScore}
              label={awayLabel}
              disabled={disabled}
              onChange={setAwayScore}
            />
          </div>
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
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Salvando..." : justSaved ? "Salvo!" : "Salvar palpite"}
            {!saving && !justSaved && (
              <span className="text-base leading-none" aria-hidden="true">
                ✦
              </span>
            )}
          </button>
        </div>
      )}
    </article>
  );
}
