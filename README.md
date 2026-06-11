# Bolão Copa do Mundo 2026

App de bolão para a Copa 2026 — React + Vite + Tailwind CSS + Supabase.

## Compartilhar com amigos

Siga o guia **[DEPLOY.md](DEPLOY.md)** — resumo:

1. Rode [`supabase/RODE-ANTES-DE-USAR.sql`](supabase/RODE-ANTES-DE-USAR.sql) no Supabase
2. Deploy na [Vercel](https://vercel.com/new) importando este repo
3. Configure a URL `.vercel.app` no Supabase Auth

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
- Partidas 1–4 com resultado de exemplo; 5–8 abertas para palpite
- Sync opcional de placares via API-Football ([Meta 5](supabase/functions/sync-match-results/README.md))

## Comandos

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor local |
| `npm run dev:host` | Local na rede Wi‑Fi |
| `npm run build` | Build de produção |

## Regras de pontuação

- **3 pts** — placar exato
- **1 pt** — acertou vencedor (inclui empate)
- **0 pts** — errou
