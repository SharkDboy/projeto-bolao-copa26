/**
 * Dados das seleções: código ISO da bandeira + nome em português.
 * Chaves em inglês das APIs de partidas e português.
 */
export interface TeamInfo {
  flag: string;
  pt: string;
}

const TEAMS: Record<string, TeamInfo> = {
  // América do Sul
  Brazil: { flag: "br", pt: "Brasil" },
  Brasil: { flag: "br", pt: "Brasil" },
  Argentina: { flag: "ar", pt: "Argentina" },
  Uruguay: { flag: "uy", pt: "Uruguai" },
  Uruguai: { flag: "uy", pt: "Uruguai" },
  Colombia: { flag: "co", pt: "Colômbia" },
  Colômbia: { flag: "co", pt: "Colômbia" },
  Chile: { flag: "cl", pt: "Chile" },
  Ecuador: { flag: "ec", pt: "Equador" },
  Equador: { flag: "ec", pt: "Equador" },
  Paraguay: { flag: "py", pt: "Paraguai" },
  Paraguai: { flag: "py", pt: "Paraguai" },
  Peru: { flag: "pe", pt: "Peru" },
  Bolivia: { flag: "bo", pt: "Bolívia" },
  Bolívia: { flag: "bo", pt: "Bolívia" },
  Venezuela: { flag: "ve", pt: "Venezuela" },

  // Europa
  Germany: { flag: "de", pt: "Alemanha" },
  Alemanha: { flag: "de", pt: "Alemanha" },
  France: { flag: "fr", pt: "França" },
  França: { flag: "fr", pt: "França" },
  Spain: { flag: "es", pt: "Espanha" },
  Espanha: { flag: "es", pt: "Espanha" },
  Portugal: { flag: "pt", pt: "Portugal" },
  England: { flag: "gb-eng", pt: "Inglaterra" },
  Inglaterra: { flag: "gb-eng", pt: "Inglaterra" },
  Netherlands: { flag: "nl", pt: "Holanda" },
  Holanda: { flag: "nl", pt: "Holanda" },
  Belgium: { flag: "be", pt: "Bélgica" },
  Bélgica: { flag: "be", pt: "Bélgica" },
  Croatia: { flag: "hr", pt: "Croácia" },
  Croácia: { flag: "hr", pt: "Croácia" },
  Switzerland: { flag: "ch", pt: "Suíça" },
  Suíça: { flag: "ch", pt: "Suíça" },
  Denmark: { flag: "dk", pt: "Dinamarca" },
  Dinamarca: { flag: "dk", pt: "Dinamarca" },
  Italy: { flag: "it", pt: "Itália" },
  Itália: { flag: "it", pt: "Itália" },
  Poland: { flag: "pl", pt: "Polônia" },
  Polônia: { flag: "pl", pt: "Polônia" },
  Austria: { flag: "at", pt: "Áustria" },
  Áustria: { flag: "at", pt: "Áustria" },
  Serbia: { flag: "rs", pt: "Sérvia" },
  Sérvia: { flag: "rs", pt: "Sérvia" },
  Ukraine: { flag: "ua", pt: "Ucrânia" },
  Ucrânia: { flag: "ua", pt: "Ucrânia" },
  Turkey: { flag: "tr", pt: "Turquia" },
  Turquia: { flag: "tr", pt: "Turquia" },
  Scotland: { flag: "gb-sct", pt: "Escócia" },
  Escócia: { flag: "gb-sct", pt: "Escócia" },
  Wales: { flag: "gb-wls", pt: "País de Gales" },
  "País de Gales": { flag: "gb-wls", pt: "País de Gales" },
  Ireland: { flag: "ie", pt: "Irlanda" },
  Irlanda: { flag: "ie", pt: "Irlanda" },
  "Republic of Ireland": { flag: "ie", pt: "Irlanda" },
  Norway: { flag: "no", pt: "Noruega" },
  Noruega: { flag: "no", pt: "Noruega" },
  Sweden: { flag: "se", pt: "Suécia" },
  Suécia: { flag: "se", pt: "Suécia" },
  Finland: { flag: "fi", pt: "Finlândia" },
  Finlândia: { flag: "fi", pt: "Finlândia" },
  Iceland: { flag: "is", pt: "Islândia" },
  Islândia: { flag: "is", pt: "Islândia" },
  Greece: { flag: "gr", pt: "Grécia" },
  Grécia: { flag: "gr", pt: "Grécia" },
  Romania: { flag: "ro", pt: "Romênia" },
  Romênia: { flag: "ro", pt: "Romênia" },
  Hungary: { flag: "hu", pt: "Hungria" },
  Hungria: { flag: "hu", pt: "Hungria" },
  "Czech Republic": { flag: "cz", pt: "República Tcheca" },
  Czechia: { flag: "cz", pt: "República Tcheca" },
  Tcheca: { flag: "cz", pt: "República Tcheca" },
  Slovakia: { flag: "sk", pt: "Eslováquia" },
  Eslováquia: { flag: "sk", pt: "Eslováquia" },
  Slovenia: { flag: "si", pt: "Eslovênia" },
  Eslovênia: { flag: "si", pt: "Eslovênia" },
  Albania: { flag: "al", pt: "Albânia" },
  Albânia: { flag: "al", pt: "Albânia" },
  "Bosnia and Herzegovina": { flag: "ba", pt: "Bósnia e Herzegovina" },
  "Bosnia & Herzegovina": { flag: "ba", pt: "Bósnia e Herzegovina" },
  "Bosnia-Herzegovina": { flag: "ba", pt: "Bósnia e Herzegovina" },
  Montenegro: { flag: "me", pt: "Montenegro" },
  "North Macedonia": { flag: "mk", pt: "Macedônia do Norte" },

  // África
  Morocco: { flag: "ma", pt: "Marrocos" },
  Marrocos: { flag: "ma", pt: "Marrocos" },
  Senegal: { flag: "sn", pt: "Senegal" },
  Tunisia: { flag: "tn", pt: "Tunísia" },
  Tunísia: { flag: "tn", pt: "Tunísia" },
  Algeria: { flag: "dz", pt: "Argélia" },
  Argélia: { flag: "dz", pt: "Argélia" },
  Egypt: { flag: "eg", pt: "Egito" },
  Egito: { flag: "eg", pt: "Egito" },
  Nigeria: { flag: "ng", pt: "Nigéria" },
  Nigéria: { flag: "ng", pt: "Nigéria" },
  Ghana: { flag: "gh", pt: "Gana" },
  Gana: { flag: "gh", pt: "Gana" },
  Cameroon: { flag: "cm", pt: "Camarões" },
  Camarões: { flag: "cm", pt: "Camarões" },
  "Ivory Coast": { flag: "ci", pt: "Costa do Marfim" },
  "Costa do Marfim": { flag: "ci", pt: "Costa do Marfim" },
  "Côte d'Ivoire": { flag: "ci", pt: "Costa do Marfim" },
  "Cote d'Ivoire": { flag: "ci", pt: "Costa do Marfim" },
  "South Africa": { flag: "za", pt: "África do Sul" },
  "África do Sul": { flag: "za", pt: "África do Sul" },
  Mali: { flag: "ml", pt: "Mali" },
  "Burkina Faso": { flag: "bf", pt: "Burkina Faso" },
  Burkina: { flag: "bf", pt: "Burkina Faso" },
  "Cape Verde": { flag: "cv", pt: "Cabo Verde" },
  "Cabo Verde": { flag: "cv", pt: "Cabo Verde" },
  Angola: { flag: "ao", pt: "Angola" },
  "DR Congo": { flag: "cd", pt: "República Democrática do Congo" },
  "Congo DR": { flag: "cd", pt: "República Democrática do Congo" },
  "Democratic Republic of the Congo": {
    flag: "cd",
    pt: "República Democrática do Congo",
  },
  RD: { flag: "cd", pt: "República Democrática do Congo" },

  // Ásia / Oceania
  Japan: { flag: "jp", pt: "Japão" },
  Japão: { flag: "jp", pt: "Japão" },
  "South Korea": { flag: "kr", pt: "Coreia do Sul" },
  "Coreia do Sul": { flag: "kr", pt: "Coreia do Sul" },
  "Korea Republic": { flag: "kr", pt: "Coreia do Sul" },
  "Saudi Arabia": { flag: "sa", pt: "Arábia Saudita" },
  Arábia: { flag: "sa", pt: "Arábia Saudita" },
  Iran: { flag: "ir", pt: "Irã" },
  Irã: { flag: "ir", pt: "Irã" },
  Australia: { flag: "au", pt: "Austrália" },
  Austrália: { flag: "au", pt: "Austrália" },
  Qatar: { flag: "qa", pt: "Catar" },
  Catar: { flag: "qa", pt: "Catar" },
  UAE: { flag: "ae", pt: "Emirados Árabes Unidos" },
  "United Arab Emirates": { flag: "ae", pt: "Emirados Árabes Unidos" },
  Emirados: { flag: "ae", pt: "Emirados Árabes Unidos" },
  Iraq: { flag: "iq", pt: "Iraque" },
  Iraque: { flag: "iq", pt: "Iraque" },
  Jordan: { flag: "jo", pt: "Jordânia" },
  Jordânia: { flag: "jo", pt: "Jordânia" },
  Uzbekistan: { flag: "uz", pt: "Uzbequistão" },
  Uzbekistão: { flag: "uz", pt: "Uzbequistão" },
  China: { flag: "cn", pt: "China" },
  "China PR": { flag: "cn", pt: "China" },
  Indonesia: { flag: "id", pt: "Indonésia" },
  Indonésia: { flag: "id", pt: "Indonésia" },
  Thailand: { flag: "th", pt: "Tailândia" },
  Tailândia: { flag: "th", pt: "Tailândia" },
  Vietnam: { flag: "vn", pt: "Vietnã" },
  Vietnã: { flag: "vn", pt: "Vietnã" },
  "New Zealand": { flag: "nz", pt: "Nova Zelândia" },
  "Nova Zelândia": { flag: "nz", pt: "Nova Zelândia" },

  // Américas
  Mexico: { flag: "mx", pt: "México" },
  México: { flag: "mx", pt: "México" },
  USA: { flag: "us", pt: "Estados Unidos" },
  EUA: { flag: "us", pt: "Estados Unidos" },
  "United States": { flag: "us", pt: "Estados Unidos" },
  Canada: { flag: "ca", pt: "Canadá" },
  Canadá: { flag: "ca", pt: "Canadá" },
  "Costa Rica": { flag: "cr", pt: "Costa Rica" },
  Panama: { flag: "pa", pt: "Panamá" },
  Panamá: { flag: "pa", pt: "Panamá" },
  Jamaica: { flag: "jm", pt: "Jamaica" },
  Honduras: { flag: "hn", pt: "Honduras" },
  "El Salvador": { flag: "sv", pt: "El Salvador" },
  Haiti: { flag: "ht", pt: "Haiti" },
  Curaçao: { flag: "cw", pt: "Curaçao" },
  Curacao: { flag: "cw", pt: "Curaçao" },

  TBD: { flag: "", pt: "A definir" },
};

const NORMALIZED = Object.fromEntries(
  Object.entries(TEAMS).map(([name, info]) => [
    name.trim().toLowerCase(),
    info,
  ]),
);

function lookupTeam(name: string): TeamInfo | null {
  const trimmed = name.trim();
  if (!trimmed) return null;
  return TEAMS[trimmed] ?? NORMALIZED[trimmed.toLowerCase()] ?? null;
}

export function getTeamDisplayName(teamName: string): string {
  const trimmed = teamName.trim();
  if (!trimmed || trimmed.toUpperCase() === "TBD") return "A definir";
  return lookupTeam(trimmed)?.pt ?? trimmed;
}

function getTeamFlagCode(teamName: string): string | null {
  const trimmed = teamName.trim();
  if (!trimmed || trimmed.toUpperCase() === "TBD") return null;
  const code = lookupTeam(trimmed)?.flag;
  return code || null;
}

export function getTeamFlagUrl(teamName: string): string | null {
  const code = getTeamFlagCode(teamName);
  if (!code) return null;
  return `/flags/${code}.png`;
}

function isoToEmoji(iso2: string): string {
  const upper = iso2.replace(/-.*/, "").toUpperCase();
  if (upper.length !== 2) return "🏳️";
  const base = 0x1f1e6;
  return String.fromCodePoint(
    ...[...upper].map((char) => base + char.charCodeAt(0) - 65),
  );
}

/** Fallback quando a imagem PNG não carrega */
export function getTeamFlagEmoji(teamName: string): string {
  const code = getTeamFlagCode(teamName);
  if (!code) return "🏳️";
  return isoToEmoji(code);
}
