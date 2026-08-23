import { useEffect, useRef } from "react";

/**
 * Ambient node field on a <canvas>.
 *
 * Stands in for the reference site's looping video backgrounds: same sense
 * of a live, moving surface behind the content, for ~3 KB instead of tens
 * of megabytes. Nodes drift, near neighbours link up, a handful pulse like
 * active hosts on a monitor, and the whole field leans toward the cursor.
 *
 * Pointer tracking is on `window`, not the canvas, so the element can stay
 * `pointer-events: none` and never intercept clicks.
 */
export default function ParticleField({
  density = 0.00007, // nodes per px² — scaled by area, then capped
  max = 130,
  speed = 0.16,
  link = 132,
  interactive = true,
  color = "237, 234, 224", // cream, matching --color-bone
  className = "",
  style,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const RGB = color;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 1;
    let h = 1;
    let nodes = [];
    let raf = 0;
    let onScreen = true;
    let last = 0;
    const ptr = { x: -1e4, y: -1e4, on: false };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(rect.width, 1);
      h = Math.max(rect.height, 1);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.round(w * h * density), max);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: Math.random() * 1.1 + 0.5,
        // ~1 in 6 nodes breathes, so the field never looks static
        phase: Math.random() < 0.17 ? Math.random() * Math.PI * 2 : null,
      }));
    };

    const frame = (t) => {
      raf = requestAnimationFrame(frame);
      if (!onScreen) return;

      // Cap at ~40fps: this is background texture, not gameplay
      if (t - last < 25) return;
      const dt = Math.min(t - last, 48) / 16.67;
      last = t;

      ctx.clearRect(0, 0, w, h);

      // --- move ---
      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;

        // wrap rather than bounce — no visible walls
        if (n.x < -20) n.x = w + 20;
        else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        else if (n.y > h + 20) n.y = -20;

        // gentle lean toward the cursor
        if (interactive && ptr.on) {
          const dx = ptr.x - n.x;
          const dy = ptr.y - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 26000 && d2 > 1) {
            const f = 0.00022 / Math.max(Math.sqrt(d2) / 90, 0.5);
            n.vx += dx * f;
            n.vy += dy * f;
          }
        }

        // keep drift speeds bounded so interaction can't run away
        const sp = Math.hypot(n.vx, n.vy);
        const cap = speed * 1.9;
        if (sp > cap) {
          n.vx = (n.vx / sp) * cap;
          n.vy = (n.vy / sp) * cap;
        }
      }

      // --- links (drawn first so dots sit on top) ---
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > link * link) continue;
          const alpha = (1 - Math.sqrt(d2) / link) * 0.22;
          ctx.strokeStyle = `rgba(${RGB},${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // --- links to the cursor, brighter ---
      if (interactive && ptr.on) {
        for (const n of nodes) {
          const dx = ptr.x - n.x;
          const dy = ptr.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d > 170) continue;
          ctx.strokeStyle = `rgba(${RGB},${((1 - d / 170) * 0.4).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(ptr.x, ptr.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }

      // --- nodes ---
      for (const n of nodes) {
        let r = n.r;
        let a = 0.5;
        if (n.phase !== null) {
          const s = (Math.sin(t / 900 + n.phase) + 1) / 2;
          r = n.r * (1 + s * 0.7);
          a = 0.45 + s * 0.5;
          // faint halo on the breathing ones
          ctx.fillStyle = `rgba(${RGB},${(a * 0.12).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 3.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${RGB},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > link) continue;
          ctx.strokeStyle = `rgba(${RGB},${((1 - d / link) * 0.18).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${RGB},0.45)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const onPointer = (e) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      ptr.on = inside;
      ptr.x = e.clientX - rect.left;
      ptr.y = e.clientY - rect.top;
    };

    const onLeave = () => {
      ptr.on = false;
    };

    // Pause entirely when scrolled away or the tab is hidden
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      onScreen = !document.hidden;
    };

    const ro = new ResizeObserver(() => {
      build();
      if (reduced) drawStatic();
    });
    ro.observe(canvas);

    build();

    if (reduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(frame);
      if (interactive) {
        window.addEventListener("pointermove", onPointer, { passive: true });
        window.addEventListener("pointerleave", onLeave, { passive: true });
      }
      document.addEventListener("visibilitychange", onVisibility);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, max, speed, link, interactive, color]);

  return <canvas ref={ref} aria-hidden="true" className={className} style={style} />;
}
