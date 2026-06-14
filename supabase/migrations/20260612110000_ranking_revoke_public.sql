-- Impede leitura do ranking via anon key sem sessão autenticada.

revoke all on function public.get_ranking() from public;
grant execute on function public.get_ranking() to authenticated;
