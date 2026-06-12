# Edge Function: sync-match-results

Sincroniza partidas e placares da **Copa 2026** via [openfootball/worldcup.json](https://github.com/openfootball/worldcup.json) — **sem API key**.

Fonte padrão: `https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json`

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
# opcional — outra edição/copa
# supabase secrets set OPENFOOTBALL_WORLDCUP_URL=https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json
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
  "source": "openfootball/worldcup.json",
  "fixturesFromApi": 104,
  "upserted": 104,
  "resultsUpdated": 0
}
```

## 5. Agendar (cron)

Dashboard → **Edge Functions → sync-match-results → Schedules**

- Cron: `0 */6 * * *` (a cada 6 horas — o JSON é atualizado manualmente na fonte)
- Header: `Authorization: Bearer SEU_CRON_SECRET`

## Comportamento

- Baixa o JSON público do GitHub (104 jogos da Copa 2026)
- Upsert em `matches` por `external_id` (número oficial do jogo ou hash estável)
- **Placar** (`score.ft`): grava resultado e trava palpites
- **Após kickoff**: trava palpites (status `LIVE` até o JSON trazer placar)
- **Mata-mata com times TBD** (ex.: `W74`): trancado até a fonte atualizar os nomes
- Atualizações de placares dependem de contribuições no repositório [openfootball/worldcup](https://github.com/openfootball/worldcup)
