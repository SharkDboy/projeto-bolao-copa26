# Bolão Copa do Mundo 2026

React + Vite + Tailwind + Supabase.

## Início rápido

```powershell
copy .env.example .env
npm install
npm run dev
```

Setup completo: **[DEPLOY.md](DEPLOY.md)**

## Cloud Agents (Cursor)

Este repositório inclui `.cursor/environment.json` com:

- `install: "npm install"`

Assim, novos Cloud Agents instalam as dependências automaticamente antes das execuções, garantindo que `tsc` e `vite` estejam disponíveis para `npm run build`.

## Funcionalidades

- Entrada só com **nome** (mesma conta em qualquer aparelho)
- Palpites na nuvem, ranking (3 pts exato / 1 pt vencedor)
- **104 partidas reais** da Copa 2026 via [rezarahiminia/worldcup2026](https://github.com/rezarahiminia/worldcup2026) (sem API key)
- Sync de placares → ranking atualiza automaticamente
- UI em português com bandeiras PNG e partidas agrupadas por rodada

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor local |
| `npm run dev:host` | Local na rede Wi‑Fi |
| `npm run sync:matches` | Atualizar partidas/placares no Supabase |
| `npm run generate:matches-sql` | Regenerar `seed-matches-2026.sql` |
| `npm run build` | Build produção |

## Regras de pontuação

- **3 pts** — placar exato
- **1 pt** — acertou vencedor (inclui empate)
- **0 pts** — errou
