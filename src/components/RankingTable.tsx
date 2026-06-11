import type { RankingEntry } from "../types";

interface RankingTableProps {
  entries: RankingEntry[];
  currentUserId?: string;
}

export default function RankingTable({
  entries,
  currentUserId,
}: RankingTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800">
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
                <td className="px-4 py-3 font-bold text-amber-400">
                  {entry.position}º
                </td>
                <td className="px-4 py-3 font-medium text-white">
                  {entry.name}
                  {isCurrentUser && (
                    <span className="ml-2 text-xs text-emerald-400">(você)</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right font-bold text-emerald-400">
                  {entry.points}
                </td>
                <td className="px-4 py-3 text-right text-zinc-400">
                  {entry.predictionsCount}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
