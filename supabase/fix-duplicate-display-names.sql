-- Rode ANTES do índice único se RODE-ANTES-DE-USAR.sql falhar com 23505.
-- Mantém o perfil mais antigo; renomeia duplicatas (ex.: "dennys" → "dennys #2").

with ranked as (
  select
    id,
    display_name,
    row_number() over (
      partition by lower(trim(display_name))
      order by created_at asc nulls last, id asc
    ) as rn
  from public.profiles
)
update public.profiles p
set display_name = p.display_name || ' #' || r.rn
from ranked r
where p.id = r.id
  and r.rn > 1;

create unique index if not exists profiles_display_name_lower_idx
  on public.profiles (lower(trim(display_name)));
