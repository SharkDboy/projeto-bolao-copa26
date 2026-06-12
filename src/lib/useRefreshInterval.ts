import { useEffect } from "react";

/** Reexecuta callback em intervalo (ex.: atualizar ranking após sync da API). */
export function useRefreshInterval(
  callback: () => void,
  intervalMs: number,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled || intervalMs <= 0) return;
    const id = setInterval(callback, intervalMs);
    return () => clearInterval(id);
  }, [callback, intervalMs, enabled]);
}
