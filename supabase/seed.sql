-- Resultados de exemplo (seed — não roda automaticamente em produção via GitHub Integration)
-- Para dev local: supabase db reset

update public.matches
set home_score = 2, away_score = 1, is_locked = true
where id = '1';

update public.matches
set home_score = 1, away_score = 1, is_locked = true
where id = '2';

update public.matches
set home_score = 0, away_score = 2, is_locked = true
where id = '3';

update public.matches
set home_score = 3, away_score = 1, is_locked = true
where id = '4';
