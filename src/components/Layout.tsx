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
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-amber-400">
              Copa do Mundo 2026
            </p>
            <h1 className="text-lg font-bold text-white">Bolão</h1>
          </div>
          <nav className="flex items-center gap-1">
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
            <span className="ml-2 hidden text-sm text-zinc-400 sm:inline">
              {userLabel}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="ml-1 rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              Sair
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
