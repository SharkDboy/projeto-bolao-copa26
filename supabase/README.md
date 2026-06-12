# Supabase + GitHub

Este diretório está configurado para a **integração GitHub do Supabase**.

## Estrutura

| Arquivo | Uso |
|---------|-----|
| [`config.toml`](config.toml) | Config CLI — `project_id` do projeto remoto |
| [`migrations/`](migrations/) | Migrations versionadas (deploy via GitHub) |
| [`seed-matches-2026.sql`](seed-matches-2026.sql) | 104 partidas reais Copa 2026 (openfootball) |
| [`seed.sql`](seed.sql) | Deprecated — use seed-matches-2026.sql |
| [`functions/sync-match-results/`](functions/sync-match-results/) | Edge Function — sync openfootball/worldcup.json |

Scripts legados (`schema.sql`, `fixes.sql`, etc.) permanecem como referência manual.

## Conectar Supabase ao GitHub (dashboard)

1. Supabase → seu projeto → **Project Settings** → **Integrations**
2. **GitHub** → **Authorize GitHub**
3. Selecione o repositório `projeto-bolao-copa26`
4. **Enable Supabase Branching** (opcional) ou **Deploy migrations to production**
5. Branch de produção: `master` ou `main`
6. Diretório de migrations: `supabase/migrations`

Novas migrations em `supabase/migrations/` serão aplicadas ao banco ao fazer merge na branch de produção.

## CLI local (opcional)

```powershell
npm install -g supabase
supabase login
supabase link --project-ref kxdrlljdtncpwtdhetit
supabase db push
```
