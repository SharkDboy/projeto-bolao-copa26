import { supabase } from "../lib/supabase";

interface EnterWithNameResponse {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  display_name: string;
  error?: string;
}

function authApiUrl() {
  const override = import.meta.env.VITE_AUTH_API_URL?.trim();
  if (override) return override;

  if (import.meta.env.DEV) {
    const base = import.meta.env.VITE_SUPABASE_URL?.replace(/\/+$/, "");
    if (base) return `${base}/functions/v1/enter-with-name`;
  }

  return "/api/enter-with-name";
}

export async function enterWithName(displayName: string): Promise<string> {
  const url = authApiUrl();
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (url.includes("/functions/v1/")) {
    if (!anonKey) throw new Error("VITE_SUPABASE_ANON_KEY não configurada.");
    headers.Authorization = `Bearer ${anonKey}`;
    headers.apikey = anonKey;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
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
