export async function findProfileByNormalizedName(admin, normalized) {
  const { data, error } = await admin
    .from("profiles")
    .select("id, display_name");

  if (error) throw error;

  return (
    data?.find(
      (row) => row.display_name.trim().toLowerCase() === normalized,
    ) ?? null
  );
}

export async function migrateAuthToSynthetic(
  admin,
  userId,
  email,
  password,
  displayName,
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

export async function resolveSession(
  admin,
  { email, password, displayName, normalized },
) {
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

  const existingProfile = await findProfileByNormalizedName(admin, normalized);

  if (existingProfile) {
    await migrateAuthToSynthetic(
      admin,
      existingProfile.id,
      email,
      password,
      displayName,
    );

    const retry = await admin.auth.signInWithPassword({ email, password });
    if (retry.error || !retry.data.session) {
      throw new Error(
        retry.error?.message ?? "Não foi possível entrar com este nome.",
      );
    }

    return {
      session: retry.data.session,
      userId: retry.data.user.id,
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

export async function upsertProfile(admin, userId, displayName) {
  const { error } = await admin.from("profiles").upsert(
    { id: userId, display_name: displayName },
    { onConflict: "id" },
  );

  if (!error) return;

  if (error.code === "23505") {
    throw new Error(
      "Este nome já está em uso por outra conta. Escolha outro nome ou peça ajuda ao organizador.",
    );
  }

  throw new Error(error.message);
}
