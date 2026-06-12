# Edge Function: sync-match-results

Sincroniza partidas e placares da Copa 2026 via [rezarahiminia/worldcup2026](https://github.com/rezarahiminia/worldcup2026) — **sem API key**.

Fonte padrão: `https://worldcup26.ir/get/games`

Usa `upsert_matches_sync` — **preserva placares** já gravados quando a API ainda não marcou `finished = TRUE`.

## Setup

```powershell
supabase login
supabase link --project-ref kxdrlljdtncpwtdhetit
supabase secrets set CRON_SECRET=seu-token-secreto
supabase functions deploy sync-match-results
```

`CRON_SECRET` é **obrigatório**. Sem ele, a function responde `401`.

`SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` são injetados automaticamente na Edge Function.

## Cron (produção)

Dashboard → **Edge Functions → sync-match-results → Schedules**

- Cron: `0 */6 * * *` — a cada 6 horas
- Header: `Authorization: Bearer SEU_CRON_SECRET`

## Local

```powershell
npm run sync:matches
```

Configure `SUPABASE_SERVICE_ROLE_KEY` no `.env` — ver [DEPLOY.md](../../DEPLOY.md).

Requer migration `20260105000000_sync_and_ranking.sql` (incluída em `RODE-ANTES-DE-USAR.sql`).

## Testar manualmente

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

## Comportamento

- Baixa o JSON público da API `worldcup26.ir` (104 jogos da Copa 2026)
- Upsert em `matches` por `external_id` (ID da partida na API)
- **Placar**: grava resultado apenas quando a API marca `finished = TRUE`
- **Após kickoff**: trava palpites (status `LIVE` quando a API indicar jogo em andamento)
- **Mata-mata sem times definidos** (`home_team_id`/`away_team_id` igual a `0`): trancado até a fonte atualizar os nomes
