-- Meta 3: partidas na nuvem + ranking agregado

create table public.matches (
  id text primary key,
  home_team text not null,
  away_team text not null,
  kickoff_at timestamptz not null,
  stage text not null,
  home_score int check (home_score is null or home_score >= 0),
  away_score int check (away_score is null or away_score >= 0),
  is_locked boolean not null default false
);

alter table public.matches enable row level security;

create policy "matches_select_authenticated"
  on public.matches for select
  to authenticated
  using (true);

insert into public.matches (id, home_team, away_team, kickoff_at, stage) values
  ('1', 'Brasil', 'Argentina', '2026-06-15T19:00:00+00', 'Fase de Grupos'),
  ('2', 'Alemanha', 'França', '2026-06-16T16:00:00+00', 'Fase de Grupos'),
  ('3', 'Espanha', 'Portugal', '2026-06-17T13:00:00+00', 'Fase de Grupos'),
  ('4', 'Inglaterra', 'Holanda', '2026-06-18T19:00:00+00', 'Fase de Grupos'),
  ('5', 'Uruguai', 'Colômbia', '2026-06-22T16:00:00+00', 'Fase de Grupos'),
  ('6', 'Brasil', 'Marrocos', '2026-06-25T19:00:00+00', 'Fase de Grupos'),
  ('7', 'Brasil', 'Alemanha', '2026-07-05T16:00:00+00', 'Oitavas de Final'),
  ('8', 'TBD', 'TBD', '2026-07-19T16:00:00+00', 'Final');

create or replace function public.get_ranking()
returns table (
  user_id uuid,
  display_name text,
  points bigint,
  predictions_count bigint
)
language sql
security definer
set search_path = public
as $$
  select
    p.user_id,
    pr.display_name,
    coalesce(sum(
      case
        when m.home_score is null or m.away_score is null then 0
        when p.home_score = m.home_score and p.away_score = m.away_score then 3
        when sign(p.home_score - p.away_score) = sign(m.home_score - m.away_score) then 1
        else 0
      end
    ), 0) as points,
    count(p.id) as predictions_count
  from public.predictions p
  join public.profiles pr on pr.id = p.user_id
  join public.matches m on m.id = p.match_id
  group by p.user_id, pr.display_name
  order by points desc, predictions_count desc;
$$;

grant execute on function public.get_ranking() to authenticated;
