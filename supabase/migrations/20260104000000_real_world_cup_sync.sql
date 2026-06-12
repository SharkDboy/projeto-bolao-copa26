-- Troca dados mock (IDs 1–8) por partidas reais via sync API-Football.
-- Rode scripts/sync-matches.mjs ou a Edge Function sync-match-results após esta migration.

delete from public.predictions
where match_id in ('1', '2', '3', '4', '5', '6', '7', '8');

delete from public.matches
where id in ('1', '2', '3', '4', '5', '6', '7', '8')
   or (external_id is null and synced_at is null);
