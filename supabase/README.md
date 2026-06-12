# Supabase

| Arquivo | Uso |
|---------|-----|
| [`migrations/`](migrations/) | Schema versionado |
| [`RODE-ANTES-DE-USAR.sql`](RODE-ANTES-DE-USAR.sql) | Setup manual (SQL Editor) |
| [`seed-matches-2026.sql`](seed-matches-2026.sql) | 104 partidas Copa 2026 (worldcup2026) |
| [`functions/sync-match-results/`](functions/sync-match-results/) | Cron de sync worldcup2026 |

## Setup rápido

1. `RODE-ANTES-DE-USAR.sql`
2. `seed-matches-2026.sql`
3. `npm run sync:matches` (atualiza placares quando a API marcar `finished = TRUE`)

O ranking soma pontos automaticamente quando `matches.home_score` e `away_score` estão preenchidos.
