# Deploy — compartilhar com amigos

## Passo 1 — Supabase

1. [SQL Editor](https://supabase.com/dashboard/project/kxdrlljdtncpwtdhetit/sql/new) → execute [`RODE-ANTES-DE-USAR.sql`](supabase/RODE-ANTES-DE-USAR.sql)
2. **Authentication → Email** → desative **Confirm email** (cadastro imediato)

Partidas: use `npm run sync:matches` (recomendado) ou execute [`seed-matches-2026.sql`](supabase/seed-matches-2026.sql).

Para confirmar placares no banco:

```sql
select id, home_team, away_team, home_score, away_score, status
from matches where home_score is not null order by kickoff_at;
```

## Passo 2 — Atualizar placares (ranking)

Fonte: [worldcup26.ir](https://worldcup26.ir/get/games) — **sem API key**.

```powershell
npm run sync:matches
```

Requer `SUPABASE_SERVICE_ROLE_KEY` no `.env` (JWT `eyJ...`).

Opcional em produção: Edge Function `sync-match-results` + cron (ver [`functions/sync-match-results/README.md`](supabase/functions/sync-match-results/README.md)).

O app recarrega partidas e ranking **a cada 60s** no navegador.

## Passo 3 — Vercel

1. [vercel.com/new](https://vercel.com/new) → importe o repo
2. Env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
3. Deploy

## Passo 4 — Auth URLs

Supabase → **Authentication → URL Configuration** → adicione a URL `.vercel.app` e `http://localhost:5173`.

## Comandos úteis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Local |
| `npm run sync:matches` | Sync worldcup26 → Supabase |
| `npm run cleanup:remote` | Remove partidas fora da fonte atual |
| `npm run setup:remote` | SQL (se token) + sync + deploy edge (se token) |
| `npm run generate:matches-sql` | Regenerar seed SQL |
