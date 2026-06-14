# Deploy — compartilhar com amigos

## Passo 1 — Supabase

1. [SQL Editor](https://supabase.com/dashboard/project/kxdrlljdtncpwtdhetit/sql/new) → execute [`RODE-ANTES-DE-USAR.sql`](supabase/RODE-ANTES-DE-USAR.sql)
2. Execute [`seed-matches-2026.sql`](supabase/seed-matches-2026.sql) — **necessário para placares e ranking pontuar**
3. **Authentication → Email** → desative **Confirm email**

Para confirmar placares no banco:

```sql
select id, home_team, away_team, home_score, away_score, status
from matches where home_score is not null order by kickoff_at;
```

## Passo 2 — Entrada por nome (Edge Function)

1. Gere um secret aleatório (32+ caracteres) e configure:

```powershell
supabase login
supabase link --project-ref kxdrlljdtncpwtdhetit
supabase secrets set AUTH_NAME_SECRET=seu-secret-aleatorio-longo
supabase functions deploy enter-with-name
```

2. (Recomendado) **Authentication → Providers → Email** → desabilite cadastro público se a opção existir — contas são criadas só pela function.

Detalhes: [`functions/enter-with-name/README.md`](supabase/functions/enter-with-name/README.md)

Amigos acessam o app, digitam o **nome** e entram — sem e-mail nem senha. O mesmo nome funciona em qualquer aparelho.

## Passo 3 — Atualizar placares (ranking)

Dados via [rezarahiminia/worldcup2026](https://github.com/rezarahiminia/worldcup2026) — **sem API key**.

O ranking pontua quando a partida tem resultado no banco.

### Opção A — Regenerar SQL (mais simples)

```powershell
npm run generate:matches-sql
```

Execute o `seed-matches-2026.sql` gerado no SQL Editor.

### Opção B — Script com service_role

1. No `.env`, use a chave **`service_role`** (JWT `eyJ...`), **não** `sb_publishable_...`
2. Rode:

```powershell
npm run sync:matches
```

Em produção: Edge Function `sync-match-results` + cron a cada 6h (ver [`functions/sync-match-results/README.md`](supabase/functions/sync-match-results/README.md)).

O app recarrega partidas e ranking **a cada 60s** no navegador.

## Passo 4 — Vercel

1. [vercel.com/new](https://vercel.com/new) → importe o repo
2. Env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
3. Deploy

## Passo 5 — Auth URLs

Supabase → **Authentication → URL Configuration** → adicione a URL `.vercel.app` e `http://localhost:5173`.

## Comandos úteis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Local |
| `npm run sync:matches` | Sync worldcup2026 → Supabase |
| `npm run generate:matches-sql` | Regenerar seed SQL |
