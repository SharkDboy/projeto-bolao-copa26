const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "Invalid login credentials": "E-mail ou senha incorretos.",
  "User already registered": "Este e-mail já está cadastrado. Tente entrar.",
  "Email not confirmed": "Confirme seu e-mail antes de entrar.",
  "Password should be at least 6 characters":
    "A senha deve ter pelo menos 6 caracteres.",
  "Unable to validate email address: invalid format":
    "E-mail inválido. Use o formato nome@dominio.com.",
};

export function translateAuthError(err: unknown): string {
  if (err instanceof TypeError && err.message === "Failed to fetch") {
    return "Não foi possível conectar ao Supabase. Verifique sua internet, se o projeto está ativo no dashboard e se o .env está correto.";
  }

  if (err instanceof Error) {
    const translated = AUTH_ERROR_MESSAGES[err.message];
    if (translated) return translated;

    if (err.message.includes("row-level security")) {
      return "Erro ao criar perfil. Execute supabase/RODE-ANTES-DE-USAR.sql no SQL Editor do Supabase.";
    }

    if (err.message.includes("profiles_display_name_lower_idx")) {
      return "Este nome já está em uso. Escolha outro nome de exibição.";
    }

    return err.message;
  }

  return "Erro ao autenticar. Tente novamente.";
}
