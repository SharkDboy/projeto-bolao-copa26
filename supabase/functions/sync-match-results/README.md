# Edge Function: sync-match-results

Sincroniza partidas e placares da **Copa 2026** via [rezarahiminia/worldcup2026](https://github.com/rezarahiminia/worldcup2026) — **sem API key**.

Fonte padrão: `https://worldcup26.ir/get/games`

## Alternativa rápida (sem CLI)

```powershell
npm run sync:matches
```

Configure `SUPABASE_SERVICE_ROLE_KEY` no `.env` — ver [DEPLOY.md](../../DEPLOY.md).

## 1. Secrets no Supabase

Dashboard → **Project Settings → Edge Functions → Secrets** (ou CLI):

```powershell
supabase login
supabase link --project-ref kxdrlljdtncpwtdhetit
supabase secrets set CRON_SECRET=um-token-secreto-aleatorio
# opcional — sobrescrever endpoint
# supabase secrets set WORLDCUP2026_API_URL=https://worldcup26.ir/get/games
```

`CRON_SECRET` é **obrigatório**. Sem ele, a function responde `401`.

`SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` são injetados automaticamente na Edge Function.

## 2. Deploy da function

```powershell
supabase functions deploy sync-match-results
```

## 3. Rodar migration / SQL

Execute [`RODE-ANTES-DE-USAR.sql`](../RODE-ANTES-DE-USAR.sql) no SQL Editor (remove mocks + colunas de sync).

## 4. Testar manualmente

```powershell
curl -X POST "https://kxdrlljdtncpwtdhetit.supabase.co/functions/v1/sync-match-results" `
  -H "Authorization: Bearer SEU_CRON_SECRET"
```

Resposta esperada:

```json
{
  "ok": true,
  "source": "rezarahiminia/worldcup2026",
  "fixturesFromApi": 104,
  "upserted": 104,
  "resultsUpdated": 0
}
```

## 5. Agendar (cron)

Dashboard → **Edge Functions → sync-match-results → Schedules**

- Cron: `*/15 * * * *` (a cada 15 minutos — a fonte informa atualização frequente dos placares)
- Header: `Authorization: Bearer SEU_CRON_SECRET`

## Comportamento

- Baixa o JSON público da API `worldcup26.ir` (104 jogos da Copa 2026)
- Upsert em `matches` por `external_id` (ID da partida na API)
- **Placar**: grava resultado apenas quando a API marca `finished = TRUE`
- **Após kickoff**: trava palpites (status `LIVE` quando a API indicar jogo em andamento)
- **Mata-mata sem times definidos** (`home_team_id`/`away_team_id` igual a `0`): trancado até a fonte atualizar os nomes
- Atualizações de placares dependem do serviço público [worldcup26.ir](https://worldcup26.ir/get/games)
