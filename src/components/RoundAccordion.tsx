import { type ReactNode, useId, useState } from "react";

interface RoundAccordionProps {
  title: string;
  matchesCount: number;
  openMatchesCount: number;
  finishedMatchesCount: number;
  defaultOpen?: boolean;
  children: ReactNode;
}

function matchCountLabel(count: number) {
  return `${count} ${count === 1 ? "jogo" : "jogos"}`;
}

export default function RoundAccordion({
  title,
  matchesCount,
  openMatchesCount,
  finishedMatchesCount,
  defaultOpen = false,
  children,
}: RoundAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <section className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/70 shadow-lg">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((current) => !current)}
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
              open ? "rotate-180" : ""
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
          {openMatchesCount > 0 && (
            <span className="rounded-full bg-emerald-950 px-2.5 py-1 text-xs font-semibold text-emerald-300">
              {openMatchesCount} abertas
            </span>
          )}
          {finishedMatchesCount > 0 && (
            <span className="rounded-full bg-amber-950 px-2.5 py-1 text-xs font-semibold text-amber-300">
              {finishedMatchesCount} encerradas
            </span>
          )}
          <span className="text-[11px] font-medium text-zinc-500">
            3 pts placar exato · 1 pt vencedor/empate
          </span>
        </div>
      </button>

      <div
        id={contentId}
        hidden={!open}
        className="border-t border-zinc-800 bg-zinc-950/30 p-4 sm:p-5"
      >
        <div className="space-y-4">{children}</div>
      </div>
    </section>
  );
}
