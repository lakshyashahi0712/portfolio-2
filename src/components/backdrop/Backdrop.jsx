import { useState } from "react";
import ParticleField from "./ParticleField";
import useInView from "../../hooks/useInView";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

/**
 * The moving surface behind a section. Same idea as the reference site's
 * looping <video> backgrounds, built to cost a fraction of the bandwidth.
 *
 * Layers, back to front:
 *   1. poster still, slowly drifting (Ken Burns) — paints immediately
 *   2. the video loop, cross-fading in over the poster once it can play
 *   3. a warm glow pool for depth
 *   4. optional canvas node field
 *   5. a travelling light line
 *   6. grain + vignette, which is what keeps cream text readable on top
 *
 * The poster does the work the video can't: it's ~30 KB, it paints on first
 * frame, and because it drifts, the section is never visually dead — so the
 * video can be deferred, or skipped entirely under reduced-motion, without
 * the section looking broken.
 */

const LEVELS = {
  // The entry gate — nothing to read but one line, so let it be cinematic
  full: { media: 0.6, glow: 0.9, grid: 0.35, grain: 0.05, scan: true, particles: true },
  // The hero — real text on top, so pull it back
  hero: { media: 0.42, glow: 0.8, grid: 0.3, grain: 0.04, scan: false, particles: true },
  // Section bands — a suggestion of imagery, nothing more
  band: { media: 0.16, glow: 0.5, grid: 0.25, grain: 0.03, scan: false, particles: false },
};

export default function Backdrop({
  media,
  intensity = "band",
  eager = false,
  className = "",
}) {
  const level = LEVELS[intensity] ?? LEVELS.band;
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInView({ rootMargin: "400px" });
  const [playing, setPlaying] = useState(false);

  const poster = media?.poster;
  // A paused <video> still downloads, so reduced-motion has to skip the
  // element entirely rather than just not animating it.
  const video = media?.video && !reduced && (eager || inView) ? media.video : null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* 1 — grid */}
      <div className="grid-backdrop absolute inset-0" style={{ opacity: level.grid }} />

      {/* 2 — poster still, drifting */}
      {poster && (
        <img
          src={poster}
          alt=""
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="animate-kenburns absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
          style={{ opacity: playing ? 0 : level.media }}
        />
      )}

      {/* 3 — the loop, fading in over the poster */}
      {video && (
        <video
          src={video}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={() => setPlaying(true)}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
          style={{ opacity: playing ? level.media : 0 }}
        />
      )}

      {/* 4 — warm light low in the frame */}
      <div
        className="animate-drift absolute -bottom-[28%] left-1/2 h-[48rem] w-[130%] -translate-x-1/2 rounded-[50%] bg-warm blur-[170px]"
        style={{ opacity: level.glow * 0.08 }}
      />

      {/* 5 — node field */}
      {level.particles && (
        <ParticleField
          className="absolute inset-0 h-full w-full"
          style={{ opacity: intensity === "full" ? 0.85 : 0.5 }}
          max={intensity === "full" ? 120 : 85}
          density={intensity === "full" ? 0.00006 : 0.000045}
        />
      )}

      {/* 6 — travelling light line */}
      {level.scan && (
        <div className="animate-scan absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-bone/25 to-transparent" />
      )}

      {/* 7 — grain + vignette. This is what makes text legible over imagery. */}
      <div className="grain absolute inset-0" style={{ opacity: level.grain }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_45%,transparent_10%,var(--color-page)_100%)]" />
    </div>
  );
}
