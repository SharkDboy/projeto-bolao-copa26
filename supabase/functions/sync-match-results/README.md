# Edge Function: sync-match-results

Sincroniza partidas e placares da **Copa do Mundo 2026** via [API-Football](https://www.api-football.com/documentation-v3).

## Alternativa rápida (sem CLI)

```powershell
npm run sync:matches
```

Configure `API_FOOTBALL_KEY` e `SUPABASE_SERVICE_ROLE_KEY` no `.env` — ver [DEPLOY.md](../../DEPLOY.md).

## 1. Obter chave da API

1. Crie conta em [api-football.com](https://www.api-football.com/)
2. Dashboard → **API-KEY**
3. Plano free: ~100 req/dia (suficiente para sync a cada 15 min)

## 2. Secrets no Supabase

Dashboard → **Project Settings → Edge Functions → Secrets** (ou CLI):

```powershell
supabase login
supabase link --project-ref kxdrlljdtncpwtdhetit
supabase secrets set API_FOOTBALL_KEY=sua-chave-aqui
supabase secrets set CRON_SECRET=um-token-secreto-aleatorio
# opcionais (padrão: World Cup 2026)
supabase secrets set API_FOOTBALL_LEAGUE_ID=1
supabase secrets set API_FOOTBALL_SEASON=2026
```

`CRON_SECRET` é **obrigatório**. Sem ele, a function responde `401`.

`SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` são injetados automaticamente na Edge Function.

## 3. Deploy da function

```powershell
supabase functions deploy sync-match-results
```

## 4. Rodar migration

Execute [`RODE-ANTES-DE-USAR.sql`](../RODE-ANTES-DE-USAR.sql) no SQL Editor (remove mocks + colunas de sync).

## 5. Testar manualmente

```powershell
curl -X POST "https://kxdrlljdtncpwtdhetit.supabase.co/functions/v1/sync-match-results" `
  -H "Authorization: Bearer SEU_CRON_SECRET"
```

Resposta esperada:

```json
{
  "ok": true,
  "fixturesFromApi": 104,
  "upserted": 104,
  "resultsUpdated": 12
}
```

## 6. Agendar (cron)

Dashboard → **Edge Functions → sync-match-results → Schedules**

- Cron: `*/15 * * * *` (a cada 15 minutos)
- Header: `Authorization: Bearer SEU_CRON_SECRET`

## Comportamento

- Busca fixtures `league=1` (World Cup), `season=2026` (104 jogos)
- Paginação automática da API
- Upsert em `matches` por `external_id`
- Partida **encerrada** (`FT`, `AET`, `PEN`): grava placar e trava palpites
- Partida **ao vivo** ou **após kickoff**: trava palpites
- IDs das partidas = `fixture.id` da API
