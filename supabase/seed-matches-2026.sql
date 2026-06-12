-- Partidas reais Copa 2026 (rezarahiminia/worldcup2026)
-- Idempotente: pode rodar mais de uma vez.
-- Fonte: https://worldcup26.ir/get/games

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '1',
  1,
  'Mexico',
  'South Africa',
  '2026-06-11T19:00:00.000Z',
  'Fase de Grupos',
  2,
  0,
  true,
  'FT',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '2',
  2,
  'South Korea',
  'Czech Republic',
  '2026-06-12T02:00:00.000Z',
  'Fase de Grupos',
  2,
  1,
  true,
  'FT',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '3',
  3,
  'Canada',
  'Bosnia and Herzegovina',
  '2026-06-12T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '4',
  4,
  'United States',
  'Paraguay',
  '2026-06-13T01:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '5',
  5,
  'Haiti',
  'Scotland',
  '2026-06-14T01:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '6',
  6,
  'Australia',
  'Turkey',
  '2026-06-14T04:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '7',
  7,
  'Brazil',
  'Morocco',
  '2026-06-13T22:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '8',
  8,
  'Qatar',
  'Switzerland',
  '2026-06-13T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '9',
  9,
  'Ivory Coast',
  'Ecuador',
  '2026-06-14T23:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '10',
  10,
  'Germany',
  'Curaçao',
  '2026-06-14T17:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '11',
  11,
  'Netherlands',
  'Japan',
  '2026-06-14T20:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '12',
  12,
  'Sweden',
  'Tunisia',
  '2026-06-15T02:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '13',
  13,
  'Iran',
  'New Zealand',
  '2026-06-16T01:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '14',
  14,
  'Spain',
  'Cape Verde',
  '2026-06-15T16:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '15',
  15,
  'Belgium',
  'Egypt',
  '2026-06-15T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '16',
  16,
  'Saudi Arabia',
  'Uruguay',
  '2026-06-15T22:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '17',
  17,
  'France',
  'Senegal',
  '2026-06-16T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '18',
  18,
  'Iraq',
  'Norway',
  '2026-06-16T22:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '19',
  19,
  'Argentina',
  'Algeria',
  '2026-06-17T01:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '20',
  20,
  'Austria',
  'Jordan',
  '2026-06-17T04:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '21',
  21,
  'Portugal',
  'Democratic Republic of the Congo',
  '2026-06-17T17:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '22',
  22,
  'England',
  'Croatia',
  '2026-06-17T20:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '23',
  23,
  'Uzbekistan',
  'Colombia',
  '2026-06-18T02:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '24',
  24,
  'Ghana',
  'Panama',
  '2026-06-17T23:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '25',
  25,
  'Mexico',
  'South Korea',
  '2026-06-19T01:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '26',
  26,
  'Switzerland',
  'Bosnia and Herzegovina',
  '2026-06-18T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '27',
  27,
  'Canada',
  'Qatar',
  '2026-06-18T22:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '28',
  28,
  'Czech Republic',
  'South Africa',
  '2026-06-18T16:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '29',
  29,
  'Brazil',
  'Haiti',
  '2026-06-20T01:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '30',
  30,
  'Scotland',
  'Morocco',
  '2026-06-19T22:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '31',
  31,
  'United States',
  'Australia',
  '2026-06-19T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '32',
  32,
  'Turkey',
  'Paraguay',
  '2026-06-20T03:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '33',
  33,
  'Germany',
  'Ivory Coast',
  '2026-06-20T20:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '34',
  34,
  'Ecuador',
  'Curaçao',
  '2026-06-21T00:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '35',
  35,
  'Netherlands',
  'Sweden',
  '2026-06-20T17:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '36',
  36,
  'Tunisia',
  'Japan',
  '2026-06-21T04:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '37',
  37,
  'Belgium',
  'Iran',
  '2026-06-21T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '38',
  38,
  'New Zealand',
  'Egypt',
  '2026-06-22T01:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '39',
  39,
  'Spain',
  'Saudi Arabia',
  '2026-06-21T16:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '40',
  40,
  'Uruguay',
  'Cape Verde',
  '2026-06-21T22:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '41',
  41,
  'France',
  'Iraq',
  '2026-06-22T21:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '42',
  42,
  'Norway',
  'Senegal',
  '2026-06-23T00:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '43',
  43,
  'Argentina',
  'Austria',
  '2026-06-22T17:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '44',
  44,
  'Jordan',
  'Algeria',
  '2026-06-23T03:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '45',
  45,
  'Portugal',
  'Uzbekistan',
  '2026-06-23T17:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '46',
  46,
  'Panama',
  'Croatia',
  '2026-06-23T23:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '47',
  47,
  'Colombia',
  'Democratic Republic of the Congo',
  '2026-06-24T02:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '48',
  48,
  'England',
  'Ghana',
  '2026-06-23T20:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '49',
  49,
  'Scotland',
  'Brazil',
  '2026-06-24T22:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '50',
  50,
  'Morocco',
  'Haiti',
  '2026-06-24T22:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '51',
  51,
  'South Africa',
  'South Korea',
  '2026-06-25T01:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '52',
  52,
  'Czech Republic',
  'Mexico',
  '2026-06-25T01:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '53',
  53,
  'Bosnia and Herzegovina',
  'Qatar',
  '2026-06-24T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '54',
  54,
  'Switzerland',
  'Canada',
  '2026-06-24T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '55',
  55,
  'Curaçao',
  'Ivory Coast',
  '2026-06-25T20:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '56',
  56,
  'Ecuador',
  'Germany',
  '2026-06-25T20:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '57',
  57,
  'Paraguay',
  'Australia',
  '2026-06-26T02:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '58',
  58,
  'Turkey',
  'United States',
  '2026-06-26T02:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '59',
  59,
  'Japan',
  'Sweden',
  '2026-06-25T23:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '60',
  60,
  'Tunisia',
  'Netherlands',
  '2026-06-25T23:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '61',
  61,
  'Senegal',
  'Iraq',
  '2026-06-26T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '62',
  62,
  'Norway',
  'France',
  '2026-06-26T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '63',
  63,
  'Egypt',
  'Iran',
  '2026-06-27T03:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '64',
  64,
  'New Zealand',
  'Belgium',
  '2026-06-27T03:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '65',
  65,
  'Cape Verde',
  'Saudi Arabia',
  '2026-06-27T00:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '66',
  66,
  'Uruguay',
  'Spain',
  '2026-06-27T00:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '67',
  67,
  'Panama',
  'England',
  '2026-06-27T21:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '68',
  68,
  'Croatia',
  'Ghana',
  '2026-06-27T21:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '69',
  69,
  'Algeria',
  'Austria',
  '2026-06-28T02:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '70',
  70,
  'Jordan',
  'Argentina',
  '2026-06-28T02:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '71',
  71,
  'Colombia',
  'Portugal',
  '2026-06-27T23:30:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '72',
  72,
  'Democratic Republic of the Congo',
  'Uzbekistan',
  '2026-06-27T23:30:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '73',
  73,
  'Runner-up Group A',
  'Runner-up Group B',
  '2026-06-28T19:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '74',
  74,
  'Winner Group E',
  '3rd Group A/B/C/D/F',
  '2026-06-29T20:30:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '75',
  75,
  'Winner Group F',
  'Runner-up Group C',
  '2026-06-30T01:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '76',
  76,
  'Winner Group C',
  'Runner-up Group F',
  '2026-06-29T17:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '77',
  77,
  'Winner Group I',
  '3rd Group C/D/F/G/H',
  '2026-06-30T21:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '78',
  78,
  'Runner-up Group E',
  'Runner-up Group I',
  '2026-06-30T17:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '79',
  79,
  'Winner Group A',
  '3rd Group C/E/F/H/I',
  '2026-07-01T01:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '80',
  80,
  'Winner Group L',
  '3rd Group E/H/I/J/K',
  '2026-07-01T16:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '81',
  81,
  'Winner Group D',
  '3rd Group B/E/F/I/J',
  '2026-07-02T00:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '82',
  82,
  'Winner Group G',
  '3rd Group A/E/H/I/J',
  '2026-07-01T20:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '83',
  83,
  'Runner-up Group K',
  'Runner-up Group L',
  '2026-07-02T23:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '84',
  84,
  'Winner Group H',
  'Runner-up Group J',
  '2026-07-02T19:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '85',
  85,
  'Winner Group B',
  '3rd Group E/F/G/I/J',
  '2026-07-03T03:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '86',
  86,
  'Winner Group J',
  'Runner-up Group H',
  '2026-07-03T22:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '87',
  87,
  'Winner Group K',
  '3rd Group D/E/I/J/L',
  '2026-07-04T01:30:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '88',
  88,
  'Runner-up Group D',
  'Runner-up Group G',
  '2026-07-03T18:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '89',
  89,
  'Winner Match 74',
  'Winner Match 77',
  '2026-07-04T21:00:00.000Z',
  'Oitavas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '90',
  90,
  'Winner Match 73',
  'Winner Match 75',
  '2026-07-04T17:00:00.000Z',
  'Oitavas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '91',
  91,
  'Winner Match 76',
  'Winner Match 78',
  '2026-07-05T20:00:00.000Z',
  'Oitavas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '92',
  92,
  'Winner Match 79',
  'Winner Match 80',
  '2026-07-06T00:00:00.000Z',
  'Oitavas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '93',
  93,
  'Winner Match 83',
  'Winner Match 84',
  '2026-07-06T19:00:00.000Z',
  'Oitavas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '94',
  94,
  'Winner Match 81',
  'Winner Match 82',
  '2026-07-07T00:00:00.000Z',
  'Oitavas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '95',
  95,
  'Winner Match 86',
  'Winner Match 88',
  '2026-07-07T16:00:00.000Z',
  'Oitavas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '96',
  96,
  'Winner Match 85',
  'Winner Match 87',
  '2026-07-07T20:00:00.000Z',
  'Oitavas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '97',
  97,
  'Winner Match 89',
  'Winner Match 90',
  '2026-07-09T20:00:00.000Z',
  'Quartas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '98',
  98,
  'Winner Match 93',
  'Winner Match 94',
  '2026-07-10T19:00:00.000Z',
  'Quartas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '99',
  99,
  'Winner Match 91',
  'Winner Match 92',
  '2026-07-11T21:00:00.000Z',
  'Quartas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '100',
  100,
  'Winner Match 95',
  'Winner Match 96',
  '2026-07-12T01:00:00.000Z',
  'Quartas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '101',
  101,
  'Winner Match 97',
  'Winner Match 98',
  '2026-07-14T19:00:00.000Z',
  'Semifinal',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '102',
  102,
  'Winner Match 99',
  'Winner Match 100',
  '2026-07-15T19:00:00.000Z',
  'Semifinal',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '103',
  103,
  'Loser Match 101',
  'Loser Match 102',
  '2026-07-18T21:00:00.000Z',
  'Disputa 3º lugar',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '104',
  104,
  'Winner Match 101',
  'Winner Match 102',
  '2026-07-19T19:00:00.000Z',
  'Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T09:37:17.113Z'
)
on conflict (external_id) do update set
  home_team = excluded.home_team,
  away_team = excluded.away_team,
  kickoff_at = excluded.kickoff_at,
  stage = excluded.stage,
  home_score = excluded.home_score,
  away_score = excluded.away_score,
  is_locked = excluded.is_locked,
  status = excluded.status,
  synced_at = excluded.synced_at;
