-- Um jogador por nome (case-insensitive) para entrada só com nome.

create unique index if not exists profiles_display_name_lower_idx
  on public.profiles (lower(trim(display_name)));
