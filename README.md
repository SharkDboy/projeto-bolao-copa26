# Bolão Copa do Mundo 2026

App de bolão para a Copa 2026 — React + Vite + Tailwind CSS + Supabase.

## Compartilhar com amigos

Siga o guia **[DEPLOY.md](DEPLOY.md)** — resumo:

1. Rode [`supabase/RODE-ANTES-DE-USAR.sql`](supabase/RODE-ANTES-DE-USAR.sql) no Supabase
2. Sincronize partidas reais: `npm run sync:matches` ([Meta 5](supabase/functions/sync-match-results/README.md))
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

## Funcionalidades

- Cadastro e login (Supabase Auth)
- Palpites salvos na nuvem
- Ranking com pontuação (3 pts exato, 1 pt vencedor)
- **104 partidas reais** da Copa 2026 via [openfootball/worldcup.json](https://github.com/openfootball/worldcup.json) (sem API key)
- Sync automático opcional (Edge Function + cron a cada 15 min)

## Comandos

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor local |
| `npm run dev:host` | Local na rede Wi‑Fi |
| `npm run build` | Build de produção |
| `npm run sync:matches` | Importar/atualizar partidas do openfootball/worldcup.json |

## Regras de pontuação

- **3 pts** — placar exato
- **1 pt** — acertou vencedor (inclui empate)
- **0 pts** — errou
