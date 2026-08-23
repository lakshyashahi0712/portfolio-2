import Backdrop from "../backdrop/Backdrop";

/**
 * Section shell — the container width, gutters and vertical rhythm that
 * every section shares, so none of them drift apart over time.
 *
 * Pass `media` for the sections that sit on a looping backdrop; the rest
 * render on the page colour alone. Backdrops here are always `band`
 * intensity: there's real text on top, and the imagery is only meant to
 * be felt, not looked at.
 *
 * The vertical rhythm is deliberately much tighter on phones. Desktop
 * padding scaled down proportionally is what makes a long single-column
 * page feel like it never ends.
 */
export default function Section({ id, media, className = "", children }) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden py-16 sm:py-28 lg:py-40 ${className}`}
    >
      {media && <Backdrop media={media} intensity="band" />}

      <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        {children}
      </div>
    </section>
  );
}
