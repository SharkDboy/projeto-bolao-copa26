# Deploy — compartilhar com amigos

## Passo 1 — Supabase (5 min)

1. Abra [Supabase SQL Editor](https://supabase.com/dashboard/project/kxdrlljdtncpwtdhetit/sql/new)
2. Cole e execute [`RODE-ANTES-DE-USAR.sql`](RODE-ANTES-DE-USAR.sql)
3. **Authentication → Providers → Email** → desative **Confirm email**
4. Anote a **Project URL** e **anon key** (Settings → API)

## Passo 2 — Partidas reais da Copa 2026 (Meta 5)

Dados via [openfootball/worldcup.json](https://github.com/openfootball/worldcup.json) — **sem API key**.

### Opção A — Script local (recomendado)

1. No `.env`, adicione `SUPABASE_SERVICE_ROLE_KEY` (Settings → API → service_role)
2. Rode:

```powershell
npm run sync:matches
```

Deve aparecer **104 partidas sincronizadas**.

### Opção B — Edge Function + cron (produção)

Siga [`supabase/functions/sync-match-results/README.md`](supabase/functions/sync-match-results/README.md):

1. `supabase secrets set CRON_SECRET=...`
2. `supabase functions deploy sync-match-results`
3. Dispare uma vez com `curl` ou agende a cada 6 h

## Passo 3 — Vercel (5 min)

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Importe **SharkDboy/projeto-bolao-copa26**
3. Framework: **Vite**
4. Environment Variables:

| Nome | Valor |
|------|-------|
| `VITE_SUPABASE_URL` | `https://kxdrlljdtncpwtdhetit.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | sua anon key |

5. **Deploy**

## Passo 4 — Supabase URLs de produção

1. Copie a URL do deploy (ex.: `https://projeto-bolao-copa26.vercel.app`)
2. Supabase → **Authentication → URL Configuration**
3. Adicione em **Site URL** e **Redirect URLs**:
   - `https://SUA-URL.vercel.app`
   - Mantenha `http://localhost:5173` para dev

## Passo 5 — Testar

1. Abra a URL Vercel em aba anônima
2. **Criar conta** → palpitar nas partidas com kickoff futuro
3. Partidas encerradas ou com resultado aparecem em **Encerradas**
4. Envie o link para seus amigos

## Alternativa: mesma rede Wi‑Fi (sem Vercel)

```powershell
npm run dev:host
```

Adicione `http://SEU-IP:5173` nas Redirect URLs do Supabase.
