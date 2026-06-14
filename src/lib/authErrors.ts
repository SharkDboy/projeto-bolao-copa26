export function translateAuthError(err: unknown): string {
  if (err instanceof TypeError && err.message === "Failed to fetch") {
    return "Não foi possível conectar. Verifique sua internet e se a Edge Function enter-with-name está publicada no Supabase.";
  }

  if (err instanceof Error) {
    if (err.message.includes("row-level security")) {
      return "Erro ao criar perfil. Execute supabase/RODE-ANTES-DE-USAR.sql no SQL Editor do Supabase.";
    }

    if (err.message.includes("Configuração do servidor incompleta")) {
      return "Servidor não configurado. Defina AUTH_NAME_SECRET na Edge Function enter-with-name.";
    }

    return err.message;
  }

  return "Erro ao entrar. Tente novamente.";
}
