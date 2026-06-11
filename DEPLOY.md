# Deploy — compartilhar com amigos

## Passo 1 — Supabase (5 min)

1. Abra [Supabase SQL Editor](https://supabase.com/dashboard/project/kxdrlljdtncpwtdhetit/sql/new)
2. Cole e execute [`RODE-ANTES-DE-USAR.sql`](RODE-ANTES-DE-USAR.sql)
3. **Authentication → Providers → Email** → desative **Confirm email**
4. Anote a **Project URL** e **anon key** (Settings → API)

## Passo 2 — Vercel (5 min)

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Importe **SharkDboy/projeto-bolao-copa26**
3. Framework: **Vite**
4. Environment Variables:

| Nome | Valor |
|------|-------|
| `VITE_SUPABASE_URL` | `https://kxdrlljdtncpwtdhetit.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | sua anon key |

5. **Deploy**

## Passo 3 — Supabase URLs de produção

1. Copie a URL do deploy (ex.: `https://projeto-bolao-copa26.vercel.app`)
2. Supabase → **Authentication → URL Configuration**
3. Adicione em **Site URL** e **Redirect URLs**:
   - `https://SUA-URL.vercel.app`
   - Mantenha `http://localhost:5173` para dev

## Passo 4 — Testar

1. Abra a URL Vercel em aba anônima
2. **Criar conta** → palpitar nas partidas **5–8** (abertas)
3. Partidas **1–4** já têm resultado — servem para ver pontos no ranking
4. Envie o link para seus amigos

## Alternativa: mesma rede Wi‑Fi (sem Vercel)

```powershell
npm run dev:host
```

Adicione `http://SEU-IP:5173` nas Redirect URLs do Supabase.
