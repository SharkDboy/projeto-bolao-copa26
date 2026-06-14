import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
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

  const signIn = await admin.auth.signInWithPassword({ email, password });

  if (signIn.error && signIn.error.message !== "Invalid login credentials") {
    return Response.json({ error: signIn.error.message }, {
      status: 500,
      headers: corsHeaders,
    });
  }

  let session = signIn.data.session;
  let userId = signIn.data.user?.id;

  if (!session) {
    const signUp = await admin.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    });

    if (signUp.error) {
      const retrySignIn = await admin.auth.signInWithPassword({
        email,
        password,
      });
      if (retrySignIn.error || !retrySignIn.data.session) {
        return Response.json(
          { error: signUp.error.message ?? "Não foi possível criar a conta." },
          { status: 500, headers: corsHeaders },
        );
      }
      session = retrySignIn.data.session;
      userId = retrySignIn.data.user?.id;
    } else {
      session = signUp.data.session;
      userId = signUp.data.user?.id;

      if (!session) {
        const retrySignIn = await admin.auth.signInWithPassword({
          email,
          password,
        });
        session = retrySignIn.data.session ?? null;
        userId = retrySignIn.data.user?.id ?? userId;
      }
    }
  }

  if (!session || !userId) {
    return Response.json(
      { error: "Sessão não criada. Desative confirmação de e-mail no Supabase." },
      { status: 500, headers: corsHeaders },
    );
  }

  const { error: profileError } = await admin.from("profiles").upsert(
    { id: userId, display_name: displayName },
    { onConflict: "id" },
  );

  if (profileError) {
    return Response.json({ error: profileError.message }, {
      status: 500,
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
});
