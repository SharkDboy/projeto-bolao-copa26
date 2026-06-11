# Bolão Copa do Mundo 2026

App de bolão para a Copa 2026 — React + Vite + Tailwind CSS + Supabase.

## Metas concluídas

- **Meta 1:** UI mockada (partidas e ranking)
- **Meta 2:** Auth Supabase + palpites na nuvem
- **Meta 3:** Pontuação (3 pts exato, 1 pt vencedor) + ranking real

## Meta 4 — Deploy em produção (atual)

Publicar o app na internet via Vercel.

### 1. Supabase — preparar produção

No dashboard do Supabase:

1. **Authentication → URL Configuration**
   - Adicione a URL da Vercel em **Site URL** e **Redirect URLs** (ex.: `https://seu-app.vercel.app`)
   - Mantenha `http://localhost:5173` para dev local
2. Confirme que os scripts SQL foram executados: `schema.sql`, `fixes.sql`, `meta3.sql`, `seed-results.sql`

### 2. Deploy na Vercel

1. Importe o repositório GitHub em [vercel.com/new](https://vercel.com/new)
2. Framework preset: **Vite**
3. Em **Environment Variables**, adicione:
   - `VITE_SUPABASE_URL` = URL do projeto Supabase
   - `VITE_SUPABASE_ANON_KEY` = chave anon public
4. Clique **Deploy**

### Integrações Git

- **GitHub:** repositório com código frontend + pasta [`supabase/`](supabase/)
- **Supabase + GitHub:** veja [`supabase/README.md`](supabase/README.md) para conectar migrations ao banco via dashboard

O arquivo [`vercel.json`](vercel.json) já configura o roteamento SPA (React Router).

### 3. Testar produção

1. Acesse a URL `.vercel.app`
2. Crie conta, faça palpites, confira ranking
3. Teste em celular (layout responsivo)

### Desenvolvimento local

```powershell
copy .env.example .env
npm install
npm run dev
```

Abra `http://localhost:5173`.

### Comandos

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build local |

### Regras de pontuação

- **3 pts** — placar exato
- **1 pt** — acertou vencedor (inclui empate)
- **0 pts** — errou
