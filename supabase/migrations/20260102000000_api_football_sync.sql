-- Suporte a sync de placares via API-Football (external_id = fixture id)

alter table public.matches
  add column if not exists external_id integer unique,
  add column if not exists status text,
  add column if not exists synced_at timestamptz;

create index if not exists matches_external_id_idx on public.matches (external_id);

-- Permite upsert de partidas pela Edge Function (service role bypassa RLS;
-- esta policy cobre caso usemos role authenticated com claim especial no futuro)
comment on column public.matches.external_id is 'ID estável da partida na fonte worldcup2026';
