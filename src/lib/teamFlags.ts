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

export function getTeamFlagCode(teamName: string): string | null {
  const trimmed = teamName.trim();
  if (!trimmed || trimmed.toUpperCase() === "TBD") return null;
  return TEAM_FLAG_CODES[trimmed] ?? null;
}

export function getTeamFlagUrl(teamName: string, width = 40): string | null {
  const code = getTeamFlagCode(teamName);
  if (!code) return null;
  return `https://flagcdn.com/w${width}/${code}.png`;
}
