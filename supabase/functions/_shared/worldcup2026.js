export const DEFAULT_WORLDCUP_URL =
  "https://worldcup26.ir/get/games";

const ALLOWED_EXACT_URLS = new Set([
  "https://worldcup26.ir/get/games",
]);

const ALLOWED_GITHUB_PREFIX =
  "https://raw.githubusercontent.com/rezarahiminia/worldcup2026/";

/** Restringe fetch da Edge Function a URLs confiáveis da fonte da Copa 2026 */
export function resolveWorldCupUrl(url = DEFAULT_WORLDCUP_URL) {
  const trimmed = url.trim();
  let parsed;

  try {
    parsed = new URL(trimmed);
  } catch {
    throw new Error("WORLDCUP2026_API_URL inválida.");
  }

  if (parsed.protocol !== "https:") {
    throw new Error("WORLDCUP2026_API_URL deve usar HTTPS.");
  }

  const withoutQuery = `${parsed.origin}${parsed.pathname}`.replace(/\/$/, "");

  if (ALLOWED_EXACT_URLS.has(withoutQuery)) {
    return trimmed;
  }

  if (
    parsed.hostname === "raw.githubusercontent.com" &&
    trimmed.startsWith(ALLOWED_GITHUB_PREFIX)
  ) {
    return trimmed;
  }

  throw new Error(
    "WORLDCUP2026_API_URL deve ser https://worldcup26.ir/get/games ou raw.githubusercontent.com/rezarahiminia/worldcup2026/...",
  );
}

/**
 * @typedef {Object} WorldCup2026Match
 * @property {string} id
 * @property {string} home_team_id
 * @property {string} away_team_id
 * @property {string | number} home_score
 * @property {string | number} away_score
 * @property {string} group
 * @property {string} matchday
 * @property {string} local_date
 * @property {string} stadium_id
 * @property {string | boolean} finished
 * @property {string} time_elapsed
 * @property {string} type
 * @property {string} [home_team_name_en]
 * @property {string} [away_team_name_en]
 * @property {string} [home_team_label]
 * @property {string} [away_team_label]
 */

/**
 * @param {string} type
 */
export function mapStage(type) {
  const value = type.toLowerCase();
  if (value === "third") return "Disputa 3º lugar";
  if (value === "final") return "Final";
  if (value === "sf") return "Semifinal";
  if (value === "qf") return "Quartas de Final";
  if (value === "r16") return "Oitavas de Final";
  if (value === "r32") return "32 avos de Final";
  if (value === "group") return "Fase de Grupos";
  return type || "Copa do Mundo";
}

const STADIUM_UTC_OFFSET_HOURS = {
  // Mexico keeps these host cities on UTC-6 during the tournament.
  1: -6,
  2: -6,
  3: -6,
  // US Central host cities use daylight saving time in Jun/Jul 2026.
  4: -5,
  5: -5,
  6: -5,
  // Eastern host cities use daylight saving time.
  7: -4,
  8: -4,
  9: -4,
  10: -4,
  11: -4,
  12: -4,
  // Pacific host cities use daylight saving time.
  13: -7,
  14: -7,
  15: -7,
  16: -7,
};

/**
 * @param {string} localDate MM/DD/YYYY HH:mm
 * @param {string} stadiumId
 */
export function parseKickoffAt(localDate, stadiumId) {
  const match = localDate.match(
    /^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})$/,
  );
  if (!match) {
    return new Date(localDate).toISOString();
  }

  const month = parseInt(match[1], 10);
  const day = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);
  const localH = parseInt(match[4], 10);
  const localM = parseInt(match[5], 10);
  const offsetHours = STADIUM_UTC_OFFSET_HOURS[stadiumId] ?? 0;
  const utcTotalMinutes = (localH - offsetHours) * 60 + localM;
  const dayOffset = Math.floor(utcTotalMinutes / (24 * 60));
  const normalizedMinutes =
    ((utcTotalMinutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const utcH = Math.floor(normalizedMinutes / 60);
  const utcM = normalizedMinutes % 60;

  const base = new Date(Date.UTC(year, month - 1, day));
  base.setUTCDate(base.getUTCDate() + dayOffset);
  base.setUTCHours(utcH, utcM, 0, 0);
  return base.toISOString();
}

function parseBoolean(value) {
  if (typeof value === "boolean") return value;
  return String(value).trim().toLowerCase() === "true";
}

function parseNullableScore(value) {
  if (value == null || value === "null") return null;
  const score = Number(value);
  return Number.isFinite(score) ? score : null;
}

function matchStatus(match, finished) {
  if (finished) return "FT";
  const elapsed = String(match.time_elapsed ?? "").trim().toLowerCase();
  if (!elapsed || elapsed === "notstarted") return "NS";
  if (elapsed === "halftime" || elapsed === "ht") return "HT";
  return "LIVE";
}

/** Placeholders do mata-mata ainda não definidos pela API */
export function isPlaceholderTeam(match, side) {
  const id = side === "home" ? match.home_team_id : match.away_team_id;
  return id === "0";
}

function teamName(match, side) {
  const name =
    side === "home"
      ? match.home_team_name_en ?? match.home_team_label
      : match.away_team_name_en ?? match.away_team_label;
  return name || "TBD";
}

/**
 * @param {WorldCup2026Match} match
 * @param {number} index
 * @param {string} now
 */
export function buildMatchRow(match, index, now) {
  const kickoffAt = parseKickoffAt(match.local_date, match.stadium_id);
  const kickoffPassed = new Date(kickoffAt).getTime() <= Date.now();
  const externalId = Number.parseInt(match.id, 10);
  const finished = parseBoolean(match.finished);
  const homeScore = parseNullableScore(match.home_score);
  const awayScore = parseNullableScore(match.away_score);
  const hasFinalScore = finished && homeScore != null && awayScore != null;
  const knockoutPlaceholder =
    isPlaceholderTeam(match, "home") || isPlaceholderTeam(match, "away");

  return {
    id: String(Number.isFinite(externalId) ? externalId : index + 1),
    external_id: Number.isFinite(externalId) ? externalId : index + 1,
    home_team: teamName(match, "home"),
    away_team: teamName(match, "away"),
    kickoff_at: kickoffAt,
    stage: mapStage(match.type),
    status: matchStatus(match, finished),
    synced_at: now,
    is_locked: finished || kickoffPassed || knockoutPlaceholder,
    home_score: hasFinalScore ? homeScore : null,
    away_score: hasFinalScore ? awayScore : null,
  };
}

/**
 * @param {string} [url]
 */
export async function fetchWorldCupMatches(url = DEFAULT_WORLDCUP_URL) {
  const safeUrl = resolveWorldCupUrl(url);
  const res = await fetch(safeUrl);
  if (!res.ok) {
    throw new Error(`worldcup2026 HTTP ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();
  return /** @type {WorldCup2026Match[]} */ (json.games ?? json ?? []);
}

/**
 * @param {WorldCup2026Match[]} matches
 * @param {string} now
 */
export function rowsFromMatches(matches, now) {
  return matches.map((match, index) => buildMatchRow(match, index, now));
}
