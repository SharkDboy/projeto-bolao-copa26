# Edge Function: sync-match-results

Sincroniza partidas e placares da Copa 2026 via [openfootball/worldcup.json](https://github.com/openfootball/worldcup.json).

Usa `upsert_matches_sync` — **preserva placares** já gravados quando o JSON ainda não tem `score.ft`.

## Setup

```powershell
supabase secrets set CRON_SECRET=seu-token-secreto
supabase functions deploy sync-match-results
```

## Cron (produção)

- `0 */6 * * *` — a cada 6 horas
- Header: `Authorization: Bearer SEU_CRON_SECRET`

## Local

```powershell
npm run sync:matches
```

Requer migration `20260105000000_sync_and_ranking.sql` (incluída em `RODE-ANTES-DE-USAR.sql`).
