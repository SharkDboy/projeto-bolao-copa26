# Bolão Copa do Mundo 2026

App de bolão para a Copa 2026 — React + Vite + Tailwind CSS + Supabase.

## Compartilhar com amigos

Siga o guia **[DEPLOY.md](DEPLOY.md)** — resumo:

1. Rode [`supabase/RODE-ANTES-DE-USAR.sql`](supabase/RODE-ANTES-DE-USAR.sql) + [`seed-matches-2026.sql`](supabase/seed-matches-2026.sql) no Supabase
2. Atualize partidas: `npm run generate:matches-sql` ou `npm run sync:matches` ([Meta 5](supabase/functions/sync-match-results/README.md))
3. Deploy na [Vercel](https://vercel.com/new) importando este repo
4. Configure a URL `.vercel.app` no Supabase Auth

Repo: [github.com/SharkDboy/projeto-bolao-copa26](https://github.com/SharkDboy/projeto-bolao-copa26)

## Desenvolvimento local

```powershell
copy .env.example .env
npm install
npm run dev
```

Abra `http://localhost:5173`.

## Cloud Agents (Cursor)

Este repositório inclui `.cursor/environment.json` com:

- `install: "npm install"`

Assim, novos Cloud Agents instalam as dependências automaticamente antes das execuções, garantindo que `tsc` e `vite` estejam disponíveis para `npm run build`.

## Funcionalidades

- Cadastro e login (Supabase Auth)
- Palpites salvos na nuvem
- Ranking com pontuação (3 pts exato, 1 pt vencedor)
- **104 partidas reais** da Copa 2026 via [rezarahiminia/worldcup2026](https://github.com/rezarahiminia/worldcup2026) (sem API key)
- Sync automático opcional (Edge Function + cron a cada 15 min)

## Comandos

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor local |
| `npm run dev:host` | Local na rede Wi‑Fi |
| `npm run build` | Build de produção |
| `npm run sync:matches` | Importar/atualizar partidas da API worldcup2026 (requer service_role eyJ...) |
| `npm run generate:matches-sql` | Regenerar `seed-matches-2026.sql` para o SQL Editor |

## Regras de pontuação

- **3 pts** — placar exato
- **1 pt** — acertou vencedor (inclui empate)
- **0 pts** — errou
