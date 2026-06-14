import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Layout() {
  const { displayName, user, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
  }

  const userLabel = displayName ?? user?.email ?? "Usuário";

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-3 py-3 sm:px-4 sm:py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-widest text-amber-400">
                Copa do Mundo 2026
              </p>
              <h1 className="truncate text-lg font-bold text-white">Bolão</h1>
            </div>

            <nav className="flex flex-wrap items-center gap-1">
              <NavLink
                to="/partidas"
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`
                }
              >
                Partidas
              </NavLink>
              <NavLink
                to="/ranking"
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`
                }
              >
                Ranking
              </NavLink>
              <span className="max-w-[120px] truncate px-2 text-xs text-zinc-400 sm:max-w-[160px] sm:text-sm">
                {userLabel}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                Sair
              </button>
            </nav>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-3 py-6 sm:px-4 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}
