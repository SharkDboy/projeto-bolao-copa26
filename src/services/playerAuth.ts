import { supabase } from "../lib/supabase";

interface EnterWithNameResponse {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  display_name: string;
  error?: string;
}

function functionsUrl() {
  const base = import.meta.env.VITE_SUPABASE_URL?.replace(/\/+$/, "");
  if (!base) throw new Error("VITE_SUPABASE_URL não configurada.");
  return `${base}/functions/v1/enter-with-name`;
}

export async function enterWithName(displayName: string): Promise<string> {
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!anonKey) throw new Error("VITE_SUPABASE_ANON_KEY não configurada.");

  const res = await fetch(functionsUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${anonKey}`,
      apikey: anonKey,
    },
    body: JSON.stringify({ displayName }),
  });

  const payload = (await res.json()) as EnterWithNameResponse;

  if (!res.ok) {
    throw new Error(payload.error ?? "Não foi possível entrar.");
  }

  const { error } = await supabase.auth.setSession({
    access_token: payload.access_token,
    refresh_token: payload.refresh_token,
  });

  if (error) throw error;

  return payload.display_name;
}
