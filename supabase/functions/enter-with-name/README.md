# Edge Function: enter-with-name

Permite entrar no bolão **apenas com o nome** — mesma conta em qualquer dispositivo.

## Secrets (obrigatório)

```powershell
supabase secrets set AUTH_NAME_SECRET=um-token-aleatorio-longo-min-32-chars
```

Use um valor aleatório forte (32+ caracteres). **Não** commite este secret.

`SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` são injetados automaticamente.

## Deploy

```powershell
supabase functions deploy enter-with-name
```

## Supabase Dashboard

1. **Authentication → Email** → desative **Confirm email**
2. **Authentication → Providers → Email** → considere desabilitar **Enable sign ups** público (contas são criadas só pela function com service_role)

## Teste

```powershell
curl -X POST "https://kxdrlljdtncpwtdhetit.supabase.co/functions/v1/enter-with-name" `
  -H "Authorization: Bearer SUA_ANON_KEY" `
  -H "Content-Type: application/json" `
  -d "{\"displayName\":\"Ana\"}"
```

Resposta esperada: `access_token`, `refresh_token`, `display_name`.

## Comportamento

- Normaliza o nome (trim, case-insensitive para identidade)
- Cria ou recupera conta sintética `@players.bolao.local`
- Senha derivada via HMAC — nunca exposta ao usuário
- Quem souber o nome de outro entra na mesma conta (bolão entre amigos)
