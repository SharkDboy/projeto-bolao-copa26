import type { RankingEntry } from "../types";

interface RankingTableProps {
  entries: RankingEntry[];
  currentUserId?: string;
}

function RankingRow({
  entry,
  isCurrentUser,
}: {
  entry: RankingEntry;
  isCurrentUser: boolean;
}) {
  return (
    <>
      <td className="px-3 py-3 font-bold text-amber-400 sm:px-4">
        {entry.position}º
      </td>
      <td className="px-3 py-3 font-medium text-white sm:px-4">
        <span className="line-clamp-1">{entry.name}</span>
        {isCurrentUser && (
          <span className="ml-1 text-xs text-emerald-400 sm:ml-2">(você)</span>
        )}
      </td>
      <td className="px-3 py-3 text-right font-bold text-emerald-400 sm:px-4">
        {entry.points}
      </td>
      <td className="hidden px-4 py-3 text-right text-zinc-400 sm:table-cell">
        {entry.predictionsCount}
      </td>
    </>
  );
}

export default function RankingTable({
  entries,
  currentUserId,
}: RankingTableProps) {
  return (
    <>
      {/* Mobile: cards */}
      <div className="space-y-3 sm:hidden">
        {entries.map((entry) => {
          const isCurrentUser = currentUserId === entry.userId;
          return (
            <div
              key={entry.userId}
              className={`rounded-xl border border-zinc-800 p-4 ${
                isCurrentUser ? "bg-emerald-950/30" : "bg-zinc-900"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-lg font-bold text-amber-400">
                  {entry.position}º
                </span>
                <span className="text-xl font-bold text-emerald-400">
                  {entry.points} pts
                </span>
              </div>
              <p className="mt-1 font-medium text-white">
                {entry.name}
                {isCurrentUser && (
                  <span className="ml-2 text-xs text-emerald-400">(você)</span>
                )}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                {entry.predictionsCount} palpites
              </p>
            </div>
          );
        })}
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-hidden rounded-xl border border-zinc-800 sm:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900 text-zinc-400">
            <tr>
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Jogador</th>
              <th className="px-4 py-3 font-medium text-right">Pontos</th>
              <th className="px-4 py-3 font-medium text-right">Palpites</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 bg-zinc-950">
            {entries.map((entry) => {
              const isCurrentUser = currentUserId === entry.userId;
              return (
                <tr
                  key={entry.userId}
                  className={
                    isCurrentUser
                      ? "bg-emerald-950/30 hover:bg-emerald-950/40"
                      : "hover:bg-zinc-900/50"
                  }
                >
                  <RankingRow entry={entry} isCurrentUser={isCurrentUser} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
