export const DEFAULT_WORLDCUP_URL =
  "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json";

const ALLOWED_WORLDCUP_URL_PREFIXES = [
  "https://raw.githubusercontent.com/openfootball/worldcup.json/",
];

/** Restringe fetch da Edge Function a URLs confiáveis do openfootball */
export function resolveWorldCupUrl(url = DEFAULT_WORLDCUP_URL) {
  const trimmed = url.trim();
  const allowed = ALLOWED_WORLDCUP_URL_PREFIXES.some((prefix) =>
    trimmed.startsWith(prefix),
  );
  if (!allowed) {
    throw new Error(
      "OPENFOOTBALL_WORLDCUP_URL deve ser um raw URL do repositório openfootball/worldcup.json",
    );
  }
  return trimmed;
}

/**
 * @typedef {Object} OpenFootballMatch
 * @property {string} round
 * @property {string} date
 * @property {string} time
 * @property {string} team1
 * @property {string} team2
 * @property {string} [group]
 * @property {string} [ground]
 * @property {number} [num]
 * @property {{ ft?: [number, number], ht?: [number, number] }} [score]
 */

/**
 * @param {string} round
 * @param {string | undefined} group
 */
export function mapStage(round, group) {
  const value = round.toLowerCase();
  if (value.includes("third place")) return "Disputa 3º lugar";
  if (value === "final") return "Final";
  if (value.includes("semi")) return "Semifinal";
  if (value.includes("quarter")) return "Quartas de Final";
  if (value.includes("round of 16")) return "Oitavas de Final";
  if (value.includes("round of 32")) return "32 avos de Final";
  if (group || value.includes("matchday")) return "Fase de Grupos";
  return round || "Copa do Mundo";
}

/**
 * @param {string} date YYYY-MM-DD
 * @param {string} time e.g. "13:00 UTC-6"
 */
export function parseKickoffAt(date, time) {
  const match = time.match(/^(\d{2}):(\d{2})\s+UTC([+-]?\d+(?:\.\d+)?)$/i);
  if (!match) {
    return `${date}T12:00:00.000Z`;
  }

  const localH = parseInt(match[1], 10);
  const localM = parseInt(match[2], 10);
  const offsetHours = parseFloat(match[3]);
  const utcTotalMinutes = (localH - offsetHours) * 60 + localM;
  const dayOffset = Math.floor(utcTotalMinutes / (24 * 60));
  const normalizedMinutes =
    ((utcTotalMinutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const utcH = Math.floor(normalizedMinutes / 60);
  const utcM = normalizedMinutes % 60;

  const base = new Date(`${date}T00:00:00.000Z`);
  base.setUTCDate(base.getUTCDate() + dayOffset);
  base.setUTCHours(utcH, utcM, 0, 0);
  return base.toISOString();
}

/** Placeholders do mata-mata (ex.: W74, 1J, 3D/E/I/J/L) */
export function isPlaceholderTeam(name) {
  return (
    !name ||
    /^W\d+L?$/.test(name) ||
    /^L\d+$/.test(name) ||
    /^\d[A-L]$/.test(name) ||
    name.includes("/") ||
    /^\d+[A-L]$/.test(name)
  );
}

/**
 * @param {OpenFootballMatch} match
 * @param {number} index
 */
export function matchExternalId(match, index) {
  if (match.num != null) return match.num;
  return stableHash(
    `${match.date}|${match.time}|${match.team1}|${match.team2}|${index}`,
  );
}

function stableHash(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return 10000 + (Math.abs(hash) % 900000);
}

/**
 * @param {OpenFootballMatch} match
 * @param {number} index
 * @param {string} now
 */
export function buildMatchRow(match, index, now) {
  const kickoffAt = parseKickoffAt(match.date, match.time);
  const kickoffPassed = new Date(kickoffAt).getTime() <= Date.now();
  const externalId = matchExternalId(match, index);
  const hasScore =
    match.score?.ft != null &&
    match.score.ft.length === 2 &&
    match.score.ft[0] != null &&
    match.score.ft[1] != null;

  const homeTeam = isPlaceholderTeam(match.team1) ? "TBD" : match.team1;
  const awayTeam = isPlaceholderTeam(match.team2) ? "TBD" : match.team2;
  const knockoutPlaceholder =
    isPlaceholderTeam(match.team1) || isPlaceholderTeam(match.team2);

  return {
    id: String(externalId),
    external_id: externalId,
    home_team: homeTeam,
    away_team: awayTeam,
    kickoff_at: kickoffAt,
    stage: mapStage(match.round, match.group),
    status: hasScore ? "FT" : kickoffPassed ? "LIVE" : "NS",
    synced_at: now,
    is_locked: hasScore || kickoffPassed || knockoutPlaceholder,
    home_score: hasScore ? match.score.ft[0] : null,
    away_score: hasScore ? match.score.ft[1] : null,
  };
}

/**
 * @param {string} [url]
 */
export async function fetchWorldCupMatches(url = DEFAULT_WORLDCUP_URL) {
  const safeUrl = resolveWorldCupUrl(url);
  const res = await fetch(safeUrl);
  if (!res.ok) {
    throw new Error(`openfootball HTTP ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();
  return /** @type {OpenFootballMatch[]} */ (json.matches ?? []);
}

/**
 * @param {OpenFootballMatch[]} matches
 * @param {string} now
 */
export function rowsFromMatches(matches, now) {
  return matches.map((match, index) => buildMatchRow(match, index, now));
}
