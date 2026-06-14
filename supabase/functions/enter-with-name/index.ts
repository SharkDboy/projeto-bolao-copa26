import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient, type SupabaseClient } from "jsr:@supabase/supabase-js@2";
import {
  derivePassword,
  syntheticEmail,
  validateDisplayName,
} from "../_shared/playerAuth.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

async function findProfileByNormalizedName(
  admin: SupabaseClient,
  normalized: string,
) {
  const { data, error } = await admin.from("profiles").select("id, display_name");
  if (error) throw error;
  return (
    data?.find(
      (row) => row.display_name.trim().toLowerCase() === normalized,
    ) ?? null
  );
}

async function migrateAuthToSynthetic(
  admin: SupabaseClient,
  userId: string,
  email: string,
  password: string,
  displayName: string,
) {
  const { data, error } = await admin.auth.admin.getUserById(userId);
  if (error || !data.user) {
    throw new Error("Conta existente não encontrada para este nome.");
  }

  const { error: updateError } = await admin.auth.admin.updateUserById(userId, {
    email,
    password,
    email_confirm: true,
    user_metadata: { display_name: displayName },
  });

  if (updateError) throw updateError;
}

async function resolveSession(
  admin: SupabaseClient,
  email: string,
  password: string,
  displayName: string,
  normalized: string,
) {
  const existingProfile = await findProfileByNormalizedName(admin, normalized);

  if (existingProfile) {
    await migrateAuthToSynthetic(
      admin,
      existingProfile.id,
      email,
      password,
      displayName,
    );

    const signIn = await admin.auth.signInWithPassword({ email, password });
    if (signIn.error || !signIn.data.session) {
      throw new Error(
        signIn.error?.message ?? "Não foi possível entrar com este nome.",
      );
    }

    return {
      session: signIn.data.session,
      userId: existingProfile.id,
    };
  }

  const signIn = await admin.auth.signInWithPassword({ email, password });

  if (signIn.error && signIn.error.message !== "Invalid login credentials") {
    throw new Error(signIn.error.message);
  }

  if (signIn.data.session) {
    return {
      session: signIn.data.session,
      userId: signIn.data.user.id,
    };
  }

  const signUp = await admin.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName } },
  });

  if (signUp.error) {
    const retry = await admin.auth.signInWithPassword({ email, password });
    if (retry.error || !retry.data.session) {
      throw new Error(
        signUp.error.message ?? "Não foi possível criar a conta.",
      );
    }
    return {
      session: retry.data.session,
      userId: retry.data.user.id,
    };
  }

  let session = signUp.data.session;
  let userId = signUp.data.user?.id ?? null;

  if (!session) {
    const retry = await admin.auth.signInWithPassword({ email, password });
    session = retry.data.session ?? null;
    userId = retry.data.user?.id ?? userId;
  }

  if (!session || !userId) {
    throw new Error(
      "Sessão não criada. Desative confirmação de e-mail no Supabase.",
    );
  }

  return { session, userId };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, {
      status: 405,
      headers: corsHeaders,
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const authNameSecret = Deno.env.get("AUTH_NAME_SECRET");

  if (!supabaseUrl || !serviceRoleKey || !authNameSecret) {
    return Response.json(
      { error: "Configuração do servidor incompleta." },
      { status: 500, headers: corsHeaders },
    );
  }

  let body: { displayName?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "JSON inválido." }, {
      status: 400,
      headers: corsHeaders,
    });
  }

  const validated = validateDisplayName(body.displayName);
  if (!validated.ok) {
    return Response.json({ error: validated.error }, {
      status: 400,
      headers: corsHeaders,
    });
  }

  const { displayName, normalized } = validated;
  const email = syntheticEmail(normalized);
  const password = await derivePassword(normalized, authNameSecret);

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  try {
    const { session, userId } = await resolveSession(
      admin,
      email,
      password,
      displayName,
      normalized,
    );

    const { error: profileError } = await admin.from("profiles").upsert(
      { id: userId, display_name: displayName },
      { onConflict: "id" },
    );

    if (profileError) {
      const message =
        profileError.code === "23505"
          ? "Este nome já está em uso por outra conta. Escolha outro nome ou peça ajuda ao organizador."
          : profileError.message;
      const status = profileError.code === "23505" ? 409 : 500;
      return Response.json({ error: message }, {
        status,
        headers: corsHeaders,
      });
    }

    return Response.json(
      {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_in: session.expires_in,
        display_name: displayName,
      },
      { headers: corsHeaders },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido.";
    const status = message.includes("já está em uso") ? 409 : 500;
    return Response.json({ error: message }, {
      status,
      headers: corsHeaders,
    });
  }
});
