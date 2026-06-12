-- Partidas reais Copa 2026 (openfootball/worldcup.json)
-- Idempotente: pode rodar mais de uma vez.
-- Fonte: https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json

insert into public.matches (
  id, external_id, home_team, away_team, kickoff_at, stage,
  home_score, away_score, is_locked, status, synced_at
) values (
  '247457',
  247457,
  'Mexico',
  'South Africa',
  '2026-06-11T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  true,
  'LIVE',
  '2026-06-12T01:03:03.306Z'
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
  '343898',
  343898,
  'South Korea',
  'Czech Republic',
  '2026-06-12T02:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '509205',
  509205,
  'Czech Republic',
  'South Africa',
  '2026-06-18T16:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '296621',
  296621,
  'Mexico',
  'South Korea',
  '2026-06-19T01:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '235413',
  235413,
  'Czech Republic',
  'Mexico',
  '2026-06-25T01:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '838548',
  838548,
  'South Africa',
  'South Korea',
  '2026-06-25T01:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '233810',
  233810,
  'Canada',
  'Bosnia & Herzegovina',
  '2026-06-12T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '458484',
  458484,
  'Qatar',
  'Switzerland',
  '2026-06-13T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '315559',
  315559,
  'Switzerland',
  'Bosnia & Herzegovina',
  '2026-06-18T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '655045',
  655045,
  'Canada',
  'Qatar',
  '2026-06-18T22:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '38001',
  38001,
  'Switzerland',
  'Canada',
  '2026-06-24T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '483796',
  483796,
  'Bosnia & Herzegovina',
  'Qatar',
  '2026-06-24T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '499919',
  499919,
  'Brazil',
  'Morocco',
  '2026-06-13T22:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '304925',
  304925,
  'Haiti',
  'Scotland',
  '2026-06-14T01:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '233915',
  233915,
  'Scotland',
  'Morocco',
  '2026-06-19T22:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '659211',
  659211,
  'Brazil',
  'Haiti',
  '2026-06-20T00:30:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '685701',
  685701,
  'Scotland',
  'Brazil',
  '2026-06-24T22:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '484661',
  484661,
  'Morocco',
  'Haiti',
  '2026-06-24T22:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '817178',
  817178,
  'USA',
  'Paraguay',
  '2026-06-13T01:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '880903',
  880903,
  'Australia',
  'Turkey',
  '2026-06-14T04:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '846256',
  846256,
  'USA',
  'Australia',
  '2026-06-19T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '291649',
  291649,
  'Turkey',
  'Paraguay',
  '2026-06-20T03:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '410786',
  410786,
  'Turkey',
  'USA',
  '2026-06-26T02:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '460330',
  460330,
  'Paraguay',
  'Australia',
  '2026-06-26T02:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '698409',
  698409,
  'Germany',
  'Curaçao',
  '2026-06-14T17:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '458123',
  458123,
  'Ivory Coast',
  'Ecuador',
  '2026-06-14T23:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '292888',
  292888,
  'Germany',
  'Ivory Coast',
  '2026-06-20T20:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '716956',
  716956,
  'Ecuador',
  'Curaçao',
  '2026-06-21T00:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '133780',
  133780,
  'Curaçao',
  'Ivory Coast',
  '2026-06-25T20:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '47880',
  47880,
  'Ecuador',
  'Germany',
  '2026-06-25T20:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '226106',
  226106,
  'Netherlands',
  'Japan',
  '2026-06-14T20:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '244645',
  244645,
  'Sweden',
  'Tunisia',
  '2026-06-15T02:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '628102',
  628102,
  'Netherlands',
  'Sweden',
  '2026-06-20T17:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '509782',
  509782,
  'Tunisia',
  'Japan',
  '2026-06-21T04:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '62033',
  62033,
  'Japan',
  'Sweden',
  '2026-06-25T23:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '141317',
  141317,
  'Tunisia',
  'Netherlands',
  '2026-06-25T23:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '623650',
  623650,
  'Belgium',
  'Egypt',
  '2026-06-15T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '108194',
  108194,
  'Iran',
  'New Zealand',
  '2026-06-16T01:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '397460',
  397460,
  'Belgium',
  'Iran',
  '2026-06-21T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '516462',
  516462,
  'New Zealand',
  'Egypt',
  '2026-06-22T01:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '254947',
  254947,
  'Egypt',
  'Iran',
  '2026-06-27T03:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '238063',
  238063,
  'New Zealand',
  'Belgium',
  '2026-06-27T03:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '484140',
  484140,
  'Spain',
  'Cape Verde',
  '2026-06-15T16:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '900689',
  900689,
  'Saudi Arabia',
  'Uruguay',
  '2026-06-15T22:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '798978',
  798978,
  'Spain',
  'Saudi Arabia',
  '2026-06-21T16:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '841593',
  841593,
  'Uruguay',
  'Cape Verde',
  '2026-06-21T22:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '584325',
  584325,
  'Cape Verde',
  'Saudi Arabia',
  '2026-06-27T00:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '846652',
  846652,
  'Uruguay',
  'Spain',
  '2026-06-27T00:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '674674',
  674674,
  'France',
  'Senegal',
  '2026-06-16T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '35447',
  35447,
  'Iraq',
  'Norway',
  '2026-06-16T22:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '858262',
  858262,
  'France',
  'Iraq',
  '2026-06-22T21:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '76504',
  76504,
  'Norway',
  'Senegal',
  '2026-06-23T00:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '323929',
  323929,
  'Norway',
  'France',
  '2026-06-26T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '271001',
  271001,
  'Senegal',
  'Iraq',
  '2026-06-26T19:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '548594',
  548594,
  'Argentina',
  'Algeria',
  '2026-06-17T01:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '280653',
  280653,
  'Austria',
  'Jordan',
  '2026-06-17T04:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '212092',
  212092,
  'Argentina',
  'Austria',
  '2026-06-22T17:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '619821',
  619821,
  'Jordan',
  'Algeria',
  '2026-06-23T03:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '744709',
  744709,
  'Algeria',
  'Austria',
  '2026-06-28T02:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '821393',
  821393,
  'Jordan',
  'Argentina',
  '2026-06-28T02:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '776673',
  776673,
  'Portugal',
  'DR Congo',
  '2026-06-17T17:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '545808',
  545808,
  'Uzbekistan',
  'Colombia',
  '2026-06-18T02:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '183380',
  183380,
  'Portugal',
  'Uzbekistan',
  '2026-06-23T17:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '44125',
  44125,
  'Colombia',
  'DR Congo',
  '2026-06-24T02:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '128873',
  128873,
  'Colombia',
  'Portugal',
  '2026-06-27T23:30:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '369904',
  369904,
  'DR Congo',
  'Uzbekistan',
  '2026-06-27T23:30:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '369176',
  369176,
  'England',
  'Croatia',
  '2026-06-17T20:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '131699',
  131699,
  'Ghana',
  'Panama',
  '2026-06-17T23:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '15607',
  15607,
  'England',
  'Ghana',
  '2026-06-23T20:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '135798',
  135798,
  'Panama',
  'Croatia',
  '2026-06-23T23:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '228472',
  228472,
  'Panama',
  'England',
  '2026-06-27T21:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '122396',
  122396,
  'Croatia',
  'Ghana',
  '2026-06-27T21:00:00.000Z',
  'Fase de Grupos',
  null,
  null,
  false,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-06-28T19:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-06-29T20:30:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-06-30T01:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-06-29T17:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-06-30T21:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-06-30T17:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-01T01:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-01T16:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-02T00:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-01T20:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-02T23:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-02T19:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-03T03:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-03T22:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-04T01:30:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-03T18:00:00.000Z',
  '32 avos de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-04T21:00:00.000Z',
  'Oitavas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-04T17:00:00.000Z',
  'Oitavas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-05T20:00:00.000Z',
  'Oitavas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-06T00:00:00.000Z',
  'Oitavas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-06T19:00:00.000Z',
  'Oitavas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-07T00:00:00.000Z',
  'Oitavas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-07T16:00:00.000Z',
  'Oitavas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-07T20:00:00.000Z',
  'Oitavas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-09T20:00:00.000Z',
  'Quartas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-10T19:00:00.000Z',
  'Quartas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-11T21:00:00.000Z',
  'Quartas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-12T01:00:00.000Z',
  'Quartas de Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-14T19:00:00.000Z',
  'Semifinal',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  'TBD',
  'TBD',
  '2026-07-15T19:00:00.000Z',
  'Semifinal',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '347853',
  347853,
  'TBD',
  'TBD',
  '2026-07-18T21:00:00.000Z',
  'Disputa 3º lugar',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
  '886801',
  886801,
  'TBD',
  'TBD',
  '2026-07-19T19:00:00.000Z',
  'Final',
  null,
  null,
  true,
  'NS',
  '2026-06-12T01:03:03.306Z'
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
