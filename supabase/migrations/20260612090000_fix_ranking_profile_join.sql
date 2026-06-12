-- Corrige ranking para não descartar palpites de usuários sem linha em profiles.

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

grant execute on function public.get_ranking() to authenticated;
