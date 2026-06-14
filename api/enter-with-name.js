import { createClient } from "@supabase/supabase-js";
import { createHmac } from "node:crypto";
import {
  derivePassword,
  syntheticEmail,
  validateDisplayName,
} from "./lib/playerAuth.mjs";
import {
  resolveSession,
  upsertProfile,
} from "./lib/enterWithNameFlow.mjs";

function resolveAuthNameSecret(serviceRoleKey) {
  if (process.env.AUTH_NAME_SECRET?.trim()) {
    return process.env.AUTH_NAME_SECRET.trim();
  }
  if (!serviceRoleKey) {
    throw new Error("AUTH_NAME_SECRET ou SUPABASE_SERVICE_ROLE_KEY ausente.");
  }
  return createHmac("sha256", "bolao-enter-name-v1")
    .update(serviceRoleKey)
    .digest("base64url")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 48);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const supabaseUrl =
    process.env.VITE_SUPABASE_URL ??
    process.env.SUPABASE_URL ??
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({
      error:
        "Configure SUPABASE_SERVICE_ROLE_KEY na Vercel (integração Supabase).",
    });
  }

  let authNameSecret;
  try {
    authNameSecret = resolveAuthNameSecret(serviceRoleKey);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  const validated = validateDisplayName(req.body?.displayName);
  if (!validated.ok) {
    return res.status(400).json({ error: validated.error });
  }

  const { displayName, normalized } = validated;
  const email = syntheticEmail(normalized);

  try {
    const password = await derivePassword(normalized, authNameSecret);
    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { session, userId } = await resolveSession(admin, {
      email,
      password,
      displayName,
      normalized,
    });

    await upsertProfile(admin, userId, displayName);

    return res.status(200).json({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      expires_in: session.expires_in,
      display_name: displayName,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido.";
    const status = message.includes("já está em uso") ? 409 : 500;
    return res.status(status).json({ error: message });
  }
}
