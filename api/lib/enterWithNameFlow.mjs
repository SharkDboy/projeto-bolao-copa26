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
  const { data: listed, error: listError } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (listError) throw listError;

  for (const user of listed?.users ?? []) {
    if (user.email?.toLowerCase() === email.toLowerCase() && user.id !== userId) {
      const { error: deleteError } = await admin.auth.admin.deleteUser(user.id);
      if (deleteError) throw deleteError;
    }
  }

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

async function signInSynthetic(admin, email, password) {
  const signIn = await admin.auth.signInWithPassword({ email, password });

  if (signIn.error && signIn.error.message !== "Invalid login credentials") {
    throw new Error(signIn.error.message);
  }

  if (!signIn.data.session || !signIn.data.user) {
    return null;
  }

  return {
    session: signIn.data.session,
    userId: signIn.data.user.id,
  };
}

export async function resolveSession(
  admin,
  { email, password, displayName, normalized },
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

    const signedIn = await signInSynthetic(admin, email, password);
    if (!signedIn) {
      throw new Error("Não foi possível entrar com este nome.");
    }

    return {
      session: signedIn.session,
      userId: existingProfile.id,
    };
  }

  const signedIn = await signInSynthetic(admin, email, password);
  if (signedIn) {
    return signedIn;
  }

  const signUp = await admin.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName } },
  });

  if (signUp.error) {
    const retry = await signInSynthetic(admin, email, password);
    if (!retry) {
      throw new Error(
        signUp.error.message ?? "Não foi possível criar a conta.",
      );
    }
    return retry;
  }

  let session = signUp.data.session;
  let userId = signUp.data.user?.id ?? null;

  if (!session) {
    const retry = await signInSynthetic(admin, email, password);
    session = retry?.session ?? null;
    userId = retry?.userId ?? userId;
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
