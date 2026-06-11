# Bolão Copa do Mundo 2026

App de bolão para a Copa 2026 — React + Vite + Tailwind CSS + Supabase.

## Metas concluídas

- **Meta 1:** UI mockada (partidas e ranking)
- **Meta 2:** Auth Supabase + palpites na nuvem
- **Meta 3:** Pontuação (3 pts exato, 1 pt vencedor) + ranking real

## Meta 4 — Deploy em produção

Publicar o app na internet via Vercel.

1. **Authentication → URL Configuration** no Supabase (localhost + URL Vercel)
2. Importe o repo em [vercel.com/new](https://vercel.com/new) com `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
3. Veja [`vercel.json`](vercel.json) e [`supabase/README.md`](supabase/README.md)

## Meta 5 — Placares oficiais (atual)

Sincronização automática via [API-Football](https://www.api-football.com/).

1. Rode [`supabase/migrations/20260102000000_api_football_sync.sql`](supabase/migrations/20260102000000_api_football_sync.sql)
2. Siga [`supabase/functions/sync-match-results/README.md`](supabase/functions/sync-match-results/README.md):
   - Crie conta e copie a **API-KEY**
   - Secrets no Supabase: `API_FOOTBALL_KEY`, `CRON_SECRET`
   - Deploy: `supabase functions deploy sync-match-results`
   - Agende cron `*/15 * * * *` no dashboard

Novas partidas usam IDs da API. Partidas mock (`"1"`–`"8"`) permanecem até remoção manual.

### Desenvolvimento local

```powershell
copy .env.example .env
npm install
npm run dev
```

Abra `http://localhost:5173`.

### Comandos

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build local |

### Regras de pontuação

- **3 pts** — placar exato
- **1 pt** — acertou vencedor (inclui empate)
- **0 pts** — errou
