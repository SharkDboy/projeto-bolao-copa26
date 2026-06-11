-- Endurecimento de segurança: palpites, FK, limites de placar

-- Remove palpites órfãos (match_id inexistente) antes da FK
delete from public.predictions p
where not exists (
  select 1 from public.matches m where m.id = p.match_id
);

-- FK: palpite só em partida existente
alter table public.predictions
  drop constraint if exists predictions_match_id_fkey;

alter table public.predictions
  add constraint predictions_match_id_fkey
  foreign key (match_id) references public.matches (id);

-- Placar entre 0 e 20
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

-- Palpites: só se partida existir, não trancada e antes do apito
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
