import { useCallback, useEffect, useState } from "react";

/**
 * Controls the entry gate.
 * Shown on every page load and refresh. Skipped when the visitor arrives
 * on a deep link (#work etc.); ?boot forces it even then.
 */
export default function useBootGate() {
  const [booted, setBooted] = useState(() => {
    if (typeof window === "undefined") return true;
    // ?boot forces the intro — handy for showing it off on demand
    if (new URLSearchParams(window.location.search).has("boot")) return false;
    return Boolean(window.location.hash);
  });

  // No scrolling behind the gate
  useEffect(() => {
    document.body.style.overflow = booted ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [booted]);

  const enter = useCallback(() => {
    setBooted(true);
  }, []);

  return { booted, enter };
}
