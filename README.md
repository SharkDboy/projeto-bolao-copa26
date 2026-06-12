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

- Auth, palpites na nuvem, ranking (3 pts exato / 1 pt vencedor)
- 104 partidas via [openfootball/worldcup.json](https://github.com/openfootball/worldcup.json)
- Sync de placares → ranking atualiza automaticamente
- UI em português com bandeiras PNG

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor local |
| `npm run sync:matches` | Atualizar partidas/placares no Supabase |
| `npm run generate:matches-sql` | Regenerar `seed-matches-2026.sql` |
| `npm run build` | Build produção |
