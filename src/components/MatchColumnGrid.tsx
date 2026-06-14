import MatchCard from "./MatchCard";
import type { Match, Prediction } from "../types";

interface MatchColumnGridProps {
  open: Match[];
  inProgress: Match[];
  finished: Match[];
  predictions: Record<string, Prediction>;
  onSave: (prediction: Prediction) => void;
  savingMatchId: string | null;
}

function MatchColumn({
  title,
  matches,
  emptyLabel,
  predictions,
  onSave,
  savingMatchId,
}: {
  title: string;
  matches: Match[];
  emptyLabel: string;
  predictions: Record<string, Prediction>;
  onSave: (prediction: Prediction) => void;
  savingMatchId: string | null;
}) {
  return (
    <div className="min-w-0">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
        {title}
        <span className="ml-2 font-normal normal-case tracking-normal text-zinc-500">
          ({matches.length})
        </span>
      </h4>
      {matches.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-800 px-3 py-6 text-center text-xs text-zinc-600">
          {emptyLabel}
        </p>
      ) : (
        <div className="space-y-4">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              savedPrediction={predictions[match.id]}
              onSave={onSave}
              saving={savingMatchId === match.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MatchColumnGrid({
  open,
  inProgress,
  finished,
  predictions,
  onSave,
  savingMatchId,
}: MatchColumnGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-4">
      <MatchColumn
        title="Abertos"
        matches={open}
        emptyLabel="Nenhum jogo aberto nesta rodada"
        predictions={predictions}
        onSave={onSave}
        savingMatchId={savingMatchId}
      />
      <MatchColumn
        title="Em andamento"
        matches={inProgress}
        emptyLabel="Nenhum jogo em andamento"
        predictions={predictions}
        onSave={onSave}
        savingMatchId={savingMatchId}
      />
      <MatchColumn
        title="Finalizados"
        matches={finished}
        emptyLabel="Nenhum jogo finalizado"
        predictions={predictions}
        onSave={onSave}
        savingMatchId={savingMatchId}
      />
    </div>
  );
}
