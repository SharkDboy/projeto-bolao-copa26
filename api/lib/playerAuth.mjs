const DISPLAY_NAME_MIN = 2;
const DISPLAY_NAME_MAX = 30;
const SYNTHETIC_EMAIL_DOMAIN = "players.bolao.local";

export function validateDisplayName(raw) {
  if (typeof raw !== "string") {
    return { ok: false, error: "Nome inválido." };
  }

  const displayName = raw.trim().replace(/\s+/g, " ");
  if (
    displayName.length < DISPLAY_NAME_MIN ||
    displayName.length > DISPLAY_NAME_MAX
  ) {
    return {
      ok: false,
      error: `Use entre ${DISPLAY_NAME_MIN} e ${DISPLAY_NAME_MAX} caracteres.`,
    };
  }

  if (/[\x00-\x1f\x7f]/.test(displayName)) {
    return { ok: false, error: "Nome contém caracteres inválidos." };
  }

  return { ok: true, displayName, normalized: displayName.toLowerCase() };
}

export function slugifyName(normalized) {
  const slug = normalized
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

  return slug || "jogador";
}

export function syntheticEmail(normalized) {
  return `${slugifyName(normalized)}@${SYNTHETIC_EMAIL_DOMAIN}`;
}

export async function derivePassword(normalizedName, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(normalizedName),
  );
  const bytes = new Uint8Array(signature);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/[^a-zA-Z0-9]/g, "").slice(0, 32);
}
