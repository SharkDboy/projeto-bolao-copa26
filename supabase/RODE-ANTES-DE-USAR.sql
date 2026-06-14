-- Execute no SQL Editor do Supabase ANTES de compartilhar o app com amigos.
-- Idempotente: pode rodar mais de uma vez.

-- Meta 5: colunas para sync worldcup2026
alter table public.matches
  add column if not exists external_id integer unique,
  add column if not exists status text,
  add column if not exists synced_at timestamptz;

create index if not exists matches_external_id_idx on public.matches (external_id);

-- Remove partidas mock (IDs 1–8) — substituídas pelo sync real
delete from public.predictions
where match_id in ('1', '2', '3', '4', '5', '6', '7', '8');

delete from public.matches
where id in ('1', '2', '3', '4', '5', '6', '7', '8')
   or (external_id is null and synced_at is null);

-- Segurança: FK, limite de placar, RLS com partida aberta
delete from public.predictions p
where not exists (
  select 1 from public.matches m where m.id = p.match_id
);

alter table public.predictions
  drop constraint if exists predictions_match_id_fkey;

alter table public.predictions
  add constraint predictions_match_id_fkey
  foreign key (match_id) references public.matches (id);

alter table public.predictions
  drop constraint if exists predictions_home_score_check;

alter table public.predictions
  drop constraint if exists predictions_away_score_check;

alter table public.predictions
  add constraint predictions_home_score_check
  check (home_score >= 0 and home_score <= 20);

alter table public.predictions
  add constraint predictions_away_score_check
  check (away_score >= 0 and away_score <= 20);

drop policy if exists "predictions_insert_own" on public.predictions;
drop policy if exists "predictions_update_own" on public.predictions;

create policy "predictions_insert_own" on public.predictions
  for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and exists (
      select 1
      from public.matches m
      where m.id = match_id
        and m.is_locked = false
        and m.kickoff_at > now()
    )
  );

create policy "predictions_update_own" on public.predictions
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and exists (
      select 1
      from public.matches m
      where m.id = match_id
        and m.is_locked = false
        and m.kickoff_at > now()
    )
  );

-- Passo final: carregar as 104 partidas reais da Copa 2026
-- Execute também o arquivo seed-matches-2026.sql neste mesmo SQL Editor.
-- (Alternativa: npm run sync:matches com SUPABASE_SERVICE_ROLE_KEY eyJ...)

-- Garante profile para usuários que ainda não têm linha em profiles
insert into public.profiles (id, display_name)
select
  u.id,
  coalesce(
    u.raw_user_meta_data->>'display_name',
    split_part(u.email, '@', 1),
    'Jogador ' || left(u.id::text, 8)
  )
from auth.users u
where not exists (
  select 1
  from public.profiles p
  where p.id = u.id
);

-- Entrada por nome: um jogador por nome (case-insensitive)
create unique index if not exists profiles_display_name_lower_idx
  on public.profiles (lower(trim(display_name)));

-- Sync preserva placares + ranking com jogos pontuados (migration 20260105)
create or replace function public.upsert_matches_sync(rows jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  item jsonb;
  upserted int := 0;
  results_updated int := 0;
  new_home int;
  new_away int;
begin
  if rows is null or jsonb_typeof(rows) <> 'array' then
    raise exception 'rows deve ser um array JSON';
  end if;

  for item in select value from jsonb_array_elements(rows)
  loop
    new_home := nullif(item->>'home_score', '')::int;
    new_away := nullif(item->>'away_score', '')::int;

    insert into public.matches (
      id, external_id, home_team, away_team, kickoff_at, stage,
      home_score, away_score, is_locked, status, synced_at
    )
    values (
      item->>'id',
      (item->>'external_id')::int,
      item->>'home_team',
      item->>'away_team',
      (item->>'kickoff_at')::timestamptz,
      item->>'stage',
      new_home,
      new_away,
      coalesce((item->>'is_locked')::boolean, false),
      item->>'status',
      (item->>'synced_at')::timestamptz
    )
    on conflict (external_id) do update set
      id = excluded.id,
      home_team = excluded.home_team,
      away_team = excluded.away_team,
      kickoff_at = excluded.kickoff_at,
      stage = excluded.stage,
      home_score = coalesce(excluded.home_score, matches.home_score),
      away_score = coalesce(excluded.away_score, matches.away_score),
      is_locked = excluded.is_locked,
      status = case
        when coalesce(excluded.home_score, matches.home_score) is not null
          and coalesce(excluded.away_score, matches.away_score) is not null
        then 'FT'
        else excluded.status
      end,
      synced_at = excluded.synced_at;

    upserted := upserted + 1;
    if new_home is not null and new_away is not null then
      results_updated := results_updated + 1;
    end if;
  end loop;

  return jsonb_build_object('upserted', upserted, 'results_updated', results_updated);
end;
$$;

revoke all on function public.upsert_matches_sync(jsonb) from public;
grant execute on function public.upsert_matches_sync(jsonb) to service_role;

create or replace function public.get_ranking()
returns table (
  user_id uuid,
  display_name text,
  points bigint,
  predictions_count bigint,
  scored_predictions_count bigint
)
language sql
security definer
set search_path = public
stable
as $$
  select
    p.user_id,
    coalesce(pr.display_name, 'Jogador ' || left(p.user_id::text, 8)) as display_name,
    coalesce(sum(
      case
        when m.home_score is null or m.away_score is null then 0
        when p.home_score = m.home_score and p.away_score = m.away_score then 3
        when sign(p.home_score - p.away_score) = sign(m.home_score - m.away_score) then 1
        else 0
      end
    ), 0)::bigint as points,
    count(p.id)::bigint as predictions_count,
    count(p.id) filter (
      where m.home_score is not null and m.away_score is not null
    )::bigint as scored_predictions_count
  from public.predictions p
  join public.matches m on m.id = p.match_id
  left join public.profiles pr on pr.id = p.user_id
  group by p.user_id, pr.display_name
  order by points desc, scored_predictions_count desc, predictions_count desc;
$$;

revoke all on function public.get_ranking() from public;
grant execute on function public.get_ranking() to authenticated;
