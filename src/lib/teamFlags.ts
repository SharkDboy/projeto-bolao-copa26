/**
 * Nomes de seleções (API-Football / PT) → código ISO para emoji de bandeira.
 * Lookup case-insensitive via chave normalizada.
 */
const TEAM_FLAG_CODES: Record<string, string> = {
  // América do Sul
  Brasil: "br",
  Brazil: "br",
  Argentina: "ar",
  Uruguai: "uy",
  Uruguay: "uy",
  Colômbia: "co",
  Colombia: "co",
  Chile: "cl",
  Equador: "ec",
  Ecuador: "ec",
  Paraguai: "py",
  Paraguay: "py",
  Peru: "pe",
  Bolívia: "bo",
  Bolivia: "bo",
  Venezuela: "ve",

  // Europa
  Alemanha: "de",
  Germany: "de",
  França: "fr",
  France: "fr",
  Espanha: "es",
  Spain: "es",
  Portugal: "pt",
  Inglaterra: "gb",
  England: "gb",
  Holanda: "nl",
  Netherlands: "nl",
  Bélgica: "be",
  Belgium: "be",
  Croácia: "hr",
  Croatia: "hr",
  Suíça: "ch",
  Switzerland: "ch",
  Dinamarca: "dk",
  Denmark: "dk",
  Itália: "it",
  Italy: "it",
  Polônia: "pl",
  Poland: "pl",
  Áustria: "at",
  Austria: "at",
  Sérvia: "rs",
  Serbia: "rs",
  Ucrânia: "ua",
  Ukraine: "ua",
  Turquia: "tr",
  Turkey: "tr",
  Escócia: "gb",
  Scotland: "gb",
  "País de Gales": "gb",
  Wales: "gb",
  Irlanda: "ie",
  Ireland: "ie",
  "Republic of Ireland": "ie",
  Noruega: "no",
  Norway: "no",
  Suécia: "se",
  Sweden: "se",
  Finlândia: "fi",
  Finland: "fi",
  Islândia: "is",
  Iceland: "is",
  Grécia: "gr",
  Greece: "gr",
  Romênia: "ro",
  Romania: "ro",
  Hungria: "hu",
  Hungary: "hu",
  "Czech Republic": "cz",
  "Czechia": "cz",
  Tcheca: "cz",
  Eslováquia: "sk",
  Slovakia: "sk",
  Eslovênia: "si",
  Slovenia: "si",
  Albânia: "al",
  Albania: "al",
  "Bosnia and Herzegovina": "ba",
  "Bosnia & Herzegovina": "ba",
  "Bosnia-Herzegovina": "ba",
  "South Africa": "za",
  "África do Sul": "za",
  Haiti: "ht",
  Montenegro: "me",
  "North Macedonia": "mk",
  Kosovo: "xk",

  // África
  Marrocos: "ma",
  Morocco: "ma",
  Senegal: "sn",
  Tunísia: "tn",
  Tunisia: "tn",
  Argélia: "dz",
  Algeria: "dz",
  Egito: "eg",
  Egypt: "eg",
  Nigéria: "ng",
  Nigeria: "ng",
  Gana: "gh",
  Ghana: "gh",
  Camarões: "cm",
  Cameroon: "cm",
  "Costa do Marfim": "ci",
  "Ivory Coast": "ci",
  "Côte d'Ivoire": "ci",
  "Cote d'Ivoire": "ci",
  Mali: "ml",
  Burkina: "bf",
  "Burkina Faso": "bf",
  "Cabo Verde": "cv",
  "Cape Verde": "cv",
  Angola: "ao",
  RD: "cd",
  "DR Congo": "cd",
  "Congo DR": "cd",

  // Ásia / Oceania
  Japão: "jp",
  Japan: "jp",
  "Coreia do Sul": "kr",
  "South Korea": "kr",
  "Korea Republic": "kr",
  Arábia: "sa",
  "Saudi Arabia": "sa",
  Irã: "ir",
  Iran: "ir",
  Austrália: "au",
  Australia: "au",
  Qatar: "qa",
  Catar: "qa",
  Emirados: "ae",
  UAE: "ae",
  "United Arab Emirates": "ae",
  Iraque: "iq",
  Iraq: "iq",
  Jordânia: "jo",
  Jordan: "jo",
  Uzbekistão: "uz",
  Uzbekistan: "uz",
  China: "cn",
  "China PR": "cn",
  Indonésia: "id",
  Indonesia: "id",
  Tailândia: "th",
  Thailand: "th",
  Vietnã: "vn",
  Vietnam: "vn",
  "New Zealand": "nz",
  "Nova Zelândia": "nz",

  // América do Norte / Central / Caribe
  México: "mx",
  Mexico: "mx",
  EUA: "us",
  USA: "us",
  "United States": "us",
  Canadá: "ca",
  Canada: "ca",
  "Costa Rica": "cr",
  Panamá: "pa",
  Panama: "pa",
  Jamaica: "jm",
  Honduras: "hn",
  "El Salvador": "sv",
  Curaçao: "cw",
  Curacao: "cw",
};

const NORMALIZED_CODES = Object.fromEntries(
  Object.entries(TEAM_FLAG_CODES).map(([name, code]) => [
    name.trim().toLowerCase(),
    code,
  ]),
);

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
  return (
    TEAM_FLAG_CODES[trimmed] ??
    NORMALIZED_CODES[trimmed.toLowerCase()] ??
    null
  );
}

export function getTeamFlagEmoji(teamName: string): string {
  const code = getTeamFlagCode(teamName);
  if (!code) return "🏳️";
  return isoToEmoji(code);
}
