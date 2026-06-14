# Supabase

| Arquivo | Uso |
|---------|-----|
| [`migrations/`](migrations/) | Schema versionado |
| [`RODE-ANTES-DE-USAR.sql`](RODE-ANTES-DE-USAR.sql) | Setup manual (SQL Editor) — rode **uma vez** antes de usar |
| [`seed-matches-2026.sql`](seed-matches-2026.sql) | 104 partidas Copa 2026 (worldcup2026) |
| [`functions/enter-with-name/`](functions/enter-with-name/) | Entrada por nome |
| [`functions/sync-match-results/`](functions/sync-match-results/) | Cron de sync worldcup2026 |

## Setup rápido

1. `RODE-ANTES-DE-USAR.sql`
2. `seed-matches-2026.sql`
3. Deploy `enter-with-name` + `AUTH_NAME_SECRET` (ver [DEPLOY.md](../DEPLOY.md))
4. `npm run sync:matches` (opcional — atualiza placares quando a API marcar `finished = TRUE`)

O ranking soma pontos automaticamente quando `matches.home_score` e `away_score` estão preenchidos.
