import { useCallback, useEffect, useState } from "react";

const KEY = "ls-portfolio-booted";

/**
 * Controls the entry gate.
 * Skipped when the visitor arrives on a deep link (#work etc.) or has
 * already entered in this tab — a refresh shouldn't cost them the wait.
 */
export default function useBootGate() {
  const [booted, setBooted] = useState(() => {
    if (typeof window === "undefined") return true;
    // ?boot forces the intro — handy for showing it off on demand
    if (new URLSearchParams(window.location.search).has("boot")) return false;
    if (window.location.hash) return true;
    try {
      return sessionStorage.getItem(KEY) === "1";
    } catch {
      return false;
    }
  });

  // No scrolling behind the gate
  useEffect(() => {
    document.body.style.overflow = booted ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [booted]);

  const enter = useCallback(() => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* private mode — just continue */
    }
    setBooted(true);
  }, []);

  return { booted, enter };
}
