-- Evita que o sync dispare updates em todas as partidas quando nada mudou.
-- Com realtime em public.matches, somente o card da partida alterada recebe update.

do $$
begin
  if exists (
    select 1
    from pg_publication
    where pubname = 'supabase_realtime'
  ) and not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'matches'
  ) then
    alter publication supabase_realtime add table public.matches;
  end if;
end;
$$;

create or replace function public.upsert_matches_sync(rows jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  item jsonb;
  existing public.matches%rowtype;
  upserted int := 0;
  inserted int := 0;
  changed int := 0;
  results_updated int := 0;
  ext_id int;
  new_home int;
  new_away int;
  new_locked boolean;
  new_status text;
  effective_home int;
  effective_away int;
  effective_status text;
  sync_time timestamptz;
  row_changed boolean;
  result_changed boolean;
begin
  if rows is null or jsonb_typeof(rows) <> 'array' then
    raise exception 'rows deve ser um array JSON';
  end if;

  for item in select value from jsonb_array_elements(rows)
  loop
    upserted := upserted + 1;

    ext_id := nullif(item->>'external_id', '')::int;
    new_home := nullif(item->>'home_score', '')::int;
    new_away := nullif(item->>'away_score', '')::int;
    new_locked := coalesce(nullif(item->>'is_locked', '')::boolean, false);
    new_status := item->>'status';
    sync_time := coalesce(nullif(item->>'synced_at', '')::timestamptz, now());

    select *
    into existing
    from public.matches
    where external_id = ext_id
       or id = item->>'id'
    order by (external_id = ext_id) desc
    limit 1;

    if found then
      effective_home := coalesce(new_home, existing.home_score);
      effective_away := coalesce(new_away, existing.away_score);
      effective_status := case
        when effective_home is not null and effective_away is not null then 'FT'
        else new_status
      end;

      result_changed :=
        new_home is not null
        and new_away is not null
        and (
          existing.home_score is distinct from new_home
          or existing.away_score is distinct from new_away
        );

      row_changed :=
        existing.external_id is distinct from ext_id
        or existing.home_team is distinct from item->>'home_team'
        or existing.away_team is distinct from item->>'away_team'
        or existing.kickoff_at is distinct from (item->>'kickoff_at')::timestamptz
        or existing.stage is distinct from item->>'stage'
        or existing.home_score is distinct from effective_home
        or existing.away_score is distinct from effective_away
        or existing.is_locked is distinct from new_locked
        or existing.status is distinct from effective_status;

      if row_changed then
        update public.matches
        set
          external_id = ext_id,
          home_team = item->>'home_team',
          away_team = item->>'away_team',
          kickoff_at = (item->>'kickoff_at')::timestamptz,
          stage = item->>'stage',
          home_score = effective_home,
          away_score = effective_away,
          is_locked = new_locked,
          status = effective_status,
          synced_at = sync_time
        where id = existing.id;

        changed := changed + 1;
        if result_changed then
          results_updated := results_updated + 1;
        end if;
      end if;
    else
      insert into public.matches (
        id,
        external_id,
        home_team,
        away_team,
        kickoff_at,
        stage,
        home_score,
        away_score,
        is_locked,
        status,
        synced_at
      )
      values (
        item->>'id',
        ext_id,
        item->>'home_team',
        item->>'away_team',
        (item->>'kickoff_at')::timestamptz,
        item->>'stage',
        new_home,
        new_away,
        new_locked,
        case
          when new_home is not null and new_away is not null then 'FT'
          else new_status
        end,
        sync_time
      );

      inserted := inserted + 1;
      changed := changed + 1;
      if new_home is not null and new_away is not null then
        results_updated := results_updated + 1;
      end if;
    end if;
  end loop;

  return jsonb_build_object(
    'upserted', upserted,
    'inserted', inserted,
    'changed', changed,
    'results_updated', results_updated
  );
end;
$$;

revoke all on function public.upsert_matches_sync(jsonb) from public;
grant execute on function public.upsert_matches_sync(jsonb) to service_role;
