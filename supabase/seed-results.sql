    -- Resultados de exemplo para testar pontuação (3 pts, 1 pt, 0 pts)
    -- Rode após meta3.sql

    update public.matches
    set home_score = 2, away_score = 1, is_locked = true
    where id = '1'; -- Brasil 2×1 Argentina

    update public.matches
    set home_score = 1, away_score = 1, is_locked = true
    where id = '2'; -- Alemanha 1×1 França

    update public.matches
    set home_score = 0, away_score = 2, is_locked = true
    where id = '3'; -- Espanha 0×2 Portugal

    update public.matches
    set home_score = 3, away_score = 1, is_locked = true
    where id = '4'; -- Inglaterra 3×1 Holanda
