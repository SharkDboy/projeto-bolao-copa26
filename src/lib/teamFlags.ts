const TEAM_FLAG_CODES: Record<string, string> = {
  Brasil: "br",
  Brazil: "br",
  Argentina: "ar",
  Alemanha: "de",
  Germany: "de",
  França: "fr",
  France: "fr",
  Espanha: "es",
  Spain: "es",
  Portugal: "pt",
  Inglaterra: "gb-eng",
  England: "gb-eng",
  Holanda: "nl",
  Netherlands: "nl",
  Uruguai: "uy",
  Uruguay: "uy",
  Colômbia: "co",
  Colombia: "co",
  Marrocos: "ma",
  Morocco: "ma",
};

function isoToEmoji(iso2: string): string {
  const upper = iso2.replace(/-.*/, "").toUpperCase();
  if (upper.length !== 2) return "🏳️";
  const base = 0x1f1e6;
  return String.fromCodePoint(
    ...[...upper].map((char) => base + char.charCodeAt(0) - 65),
  );
}

export function getTeamFlagCode(teamName: string): string | null {
  const trimmed = teamName.trim();
  if (!trimmed || trimmed.toUpperCase() === "TBD") return null;
  return TEAM_FLAG_CODES[trimmed] ?? null;
}

export function getTeamFlagEmoji(teamName: string): string {
  const code = getTeamFlagCode(teamName);
  if (!code) return "🏳️";
  return isoToEmoji(code);
}
