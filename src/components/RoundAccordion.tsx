import { useId, useState } from "react";
import MatchColumnGrid from "./MatchColumnGrid";
import type { Match, Prediction } from "../types";

interface RoundAccordionProps {
  title: string;
  matchesCount: number;
  openCount: number;
  inProgressCount: number;
  finishedCount: number;
  open: Match[];
  inProgress: Match[];
  finished: Match[];
  predictions: Record<string, Prediction>;
  onSave: (prediction: Prediction) => void;
  savingMatchId: string | null;
  defaultOpen?: boolean;
}

function matchCountLabel(count: number) {
  return `${count} ${count === 1 ? "jogo" : "jogos"}`;
}

export default function RoundAccordion({
  title,
  matchesCount,
  openCount,
  inProgressCount,
  finishedCount,
  open,
  inProgress,
  finished,
  predictions,
  onSave,
  savingMatchId,
  defaultOpen = false,
}: RoundAccordionProps) {
  const [openState, setOpenState] = useState(defaultOpen);
  const contentId = useId();

  return (
    <section className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/70 shadow-lg">
      <button
        type="button"
        aria-expanded={openState}
        aria-controls={contentId}
        onClick={() => setOpenState((current) => !current)}
        className="flex w-full flex-col gap-3 p-4 text-left transition-colors hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-950 sm:p-5"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-400">
              Rodada
            </p>
            <h3 className="mt-1 text-base font-bold text-white sm:text-lg">
              {title}
            </h3>
          </div>

          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`mt-1 h-5 w-5 shrink-0 text-zinc-400 transition-transform ${
              openState ? "rotate-180" : ""
            }`}
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300">
            {matchCountLabel(matchesCount)}
          </span>
          {openCount > 0 && (
            <span className="rounded-full bg-emerald-950 px-2.5 py-1 text-xs font-semibold text-emerald-300">
              {openCount} abertos
            </span>
          )}
          {inProgressCount > 0 && (
            <span className="rounded-full bg-sky-950 px-2.5 py-1 text-xs font-semibold text-sky-300">
              {inProgressCount} em andamento
            </span>
          )}
          {finishedCount > 0 && (
            <span className="rounded-full bg-amber-950 px-2.5 py-1 text-xs font-semibold text-amber-300">
              {finishedCount} finalizados
            </span>
          )}
        </div>
      </button>

      <div
        id={contentId}
        hidden={!openState}
        className="border-t border-zinc-800 bg-zinc-950/30 p-4 sm:p-5"
      >
        <MatchColumnGrid
          open={open}
          inProgress={inProgress}
          finished={finished}
          predictions={predictions}
          onSave={onSave}
          savingMatchId={savingMatchId}
        />
      </div>
    </section>
  );
}
