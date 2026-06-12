-- Execute no SQL Editor do Supabase ANTES de compartilhar o app com amigos.
-- Idempotente: pode rodar mais de uma vez.

-- Meta 5: colunas para sync openfootball/worldcup.json
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
