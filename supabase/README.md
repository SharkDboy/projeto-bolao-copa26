# Supabase

| Arquivo | Uso |
|---------|-----|
| [`migrations/`](migrations/) | Schema versionado |
| [`RODE-ANTES-DE-USAR.sql`](RODE-ANTES-DE-USAR.sql) | Setup manual (SQL Editor) — rode **uma vez** antes de usar |
| [`seed-matches-2026.sql`](seed-matches-2026.sql) | 104 partidas Copa 2026 (alternativa ao sync) |
| [`functions/sync-match-results/`](functions/sync-match-results/) | Cron opcional de sync worldcup26 |

## Setup rápido

1. `RODE-ANTES-DE-USAR.sql`
2. `npm run sync:matches` (ou `seed-matches-2026.sql`)
3. Login no app: e-mail + senha (Supabase Auth)

O ranking soma pontos quando `matches.home_score` e `away_score` estão preenchidos.
