# AGENTS.md

## Cursor Cloud specific instructions

### What this is
Single-page web app **Bolão Copa do Mundo 2026** (World Cup 2026 prediction pool):
React 19 + Vite + Tailwind 4 frontend backed by **Supabase** (Postgres + Auth). There
is one product/service: the Vite frontend plus a local Supabase backend.

The app is built for hosted Supabase (see `README.md` / `DEPLOY.md`). For local
development we run the Supabase stack locally via the Supabase CLI (Docker).

### Standard commands (defined in `package.json`)
- `npm run dev` — Vite dev server on http://localhost:5173
- `npm run build` — `tsc -b && vite build` (this is also the type-check; there is **no**
  separate lint script and **no** automated test suite in this repo)

### Backend: local Supabase (Docker)
Docker and the Supabase CLI are installed at the system level (persist in the VM
snapshot). The Postgres data volume also persists, so once seeded the data survives
restarts. You only need the full setup again after `supabase db reset` or a fresh stack.

Start the backend (run from the repo root `/workspace` — `config.toml` lives here; running
`supabase start` from another directory spins up a default project with **no migrations**):

```bash
# 1. Ensure the Docker daemon is running (start it if `docker info` fails)
sudo dockerd >/tmp/dockerd.log 2>&1 &   # then: sudo chmod 666 /var/run/docker.sock
# 2. Start Supabase (applies migrations in supabase/migrations/)
supabase start
# 3. Get local URL + keys
supabase status -o env
```

The frontend reads `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` from `.env` (gitignored).
For local dev point it at the local stack (these local keys are the CLI's fixed defaults):

```
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=<ANON_KEY from `supabase status -o env`>
```

### Non-obvious gotchas
- **Matches must be seeded.** Migration `20260104_real_world_cup_sync.sql` deletes the
  mock matches, so after migrations the `matches` table is empty and the UI shows
  "Nenhuma partida encontrada". Load the 104 real matches:
  ```bash
  DBC=$(docker ps --format '{{.Names}}' | grep supabase_db)
  docker exec -i "$DBC" psql -U postgres < supabase/seed-matches-2026.sql
  ```
- **Table privileges gotcha (causes 403).** On this local Supabase CLI version, tables
  created by `postgres` in migrations only grant TRUNCATE/REFERENCES/TRIGGER to
  `anon`/`authenticated` — **not SELECT/INSERT/UPDATE/DELETE**. Hosted Supabase grants
  these automatically, so the app works in production but locally the REST API returns
  `403 permission denied for table matches` and the matches list stays empty. Fix once
  per fresh DB:
  ```bash
  DBC=$(docker ps --format '{{.Names}}' | grep supabase_db)
  docker exec "$DBC" psql -U postgres -c "grant select, insert, update, delete on all tables in schema public to anon, authenticated, service_role;"
  docker exec "$DBC" psql -U postgres -c "grant usage, select on all sequences in schema public to anon, authenticated, service_role;"
  ```
- **Email confirmation is off locally** (CLI default), so signup logs you in immediately —
  no Mailpit step needed for the create-account flow.

### Hello-world flow to verify the env
Open http://localhost:5173 → "Criar conta" (sign up) → land on Partidas → enter a score on
an open match → "Salvar palpite" (shows "Palpite: X × Y") → check Ranking page.
