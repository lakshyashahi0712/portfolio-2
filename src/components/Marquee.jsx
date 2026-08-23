import { marquee } from "../data/profile";

/**
 * How many times the list is repeated across the track.
 *
 * The animation translates the track by exactly -50%, so the seam only
 * disappears if two conditions hold: the count is even (so -50% lands on a
 * copy boundary), and *half* the track is at least as wide as the viewport.
 * Miss the second one and the tail of the track scrolls past the right edge
 * before the loop restarts — the band visibly runs out of content.
 *
 * Eight short words come to roughly 1400px a copy, so three copies per half
 * covers displays up to ~4000px wide.
 */
const REPEATS = 6;

/**
 * Seamless ticker under the hero.
 */
export default function Marquee() {
  const row = Array.from({ length: REPEATS }, () => marquee).flat();

  return (
    <div
      className="relative overflow-hidden border-y border-line bg-surface/30 py-7 sm:py-9"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <div className="animate-marquee flex w-max items-center">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            /* Not `.hud` — this needs the same mono/uppercase/tracking
               treatment at a much larger size than a field label. */
            className="flex shrink-0 items-center font-mono text-[13px] leading-none font-medium tracking-[0.16em] text-faint uppercase sm:text-[15px]"
            aria-hidden={i >= marquee.length ? "true" : undefined}
          >
            <span className="px-8 sm:px-10">{item}</span>
            <span className="text-line-bright">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
