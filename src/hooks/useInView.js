import { useEffect, useRef, useState } from "react";

/**
 * True once the element has scrolled near the viewport.
 *
 * Used to defer loading section background videos — the hero's loop is worth
 * fetching immediately, the four below the fold are not.
 */
export default function useInView({ rootMargin = "300px", once = true } = {}) {
  const ref = useRef(null);
  // No IntersectionObserver (very old browsers, some SSR shims) — treat
  // everything as visible rather than never loading it.
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, once]);

  return [ref, inView];
}
