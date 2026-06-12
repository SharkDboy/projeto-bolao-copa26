# Deploy — compartilhar com amigos

## Passo 1 — Supabase

1. [SQL Editor](https://supabase.com/dashboard/project/kxdrlljdtncpwtdhetit/sql/new) → execute [`RODE-ANTES-DE-USAR.sql`](supabase/RODE-ANTES-DE-USAR.sql)
2. Execute [`seed-matches-2026.sql`](supabase/seed-matches-2026.sql)
3. **Authentication → Email** → desative **Confirm email**

## Passo 2 — Atualizar placares (ranking)

O ranking pontua quando a partida tem resultado no banco. Atualize via:

```powershell
npm run sync:matches
```

Requer `SUPABASE_SERVICE_ROLE_KEY` (JWT `eyJ...`) no `.env`.

Em produção: Edge Function `sync-match-results` + cron a cada 6h (ver [`functions/sync-match-results/README.md`](supabase/functions/sync-match-results/README.md)).

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
| `npm run sync:matches` | Sync openfootball → Supabase |
| `npm run generate:matches-sql` | Regenerar seed SQL |
