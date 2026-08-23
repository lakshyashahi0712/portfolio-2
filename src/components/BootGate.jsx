import { useEffect } from "react";
import { motion } from "motion/react";
import Backdrop from "./backdrop/Backdrop";
import { ArrowUpRight } from "./ui/Icons";
import { backdrops, gate, profile } from "../data/profile";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const ease = [0.22, 1, 0.36, 1];

/**
 * The entry gate: one full-viewport screen over a looping backdrop.
 *
 * Composition, top to bottom — a minimal brand bar, the name centred in
 * the space that's left, and a row of frosted cards along the bottom of
 * the frame. The centre block is `flex-1` + `justify-center` rather than
 * `margin: auto`, so the bar and the card row can change height without
 * throwing the vertical centring off.
 *
 * Shown once per tab session (see useBootGate) so a refresh doesn't make
 * you sit through it again.
 */
export default function BootGate({ onEnter }) {
  const reduced = usePrefersReducedMotion();

  // Enter / Escape / Space all get you in
  useEffect(() => {
    const onKey = (e) => {
      if (["Enter", "Escape", " "].includes(e.key)) {
        e.preventDefault();
        onEnter();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onEnter]);

  // The staggered entrance: name, then the button, then the cards as a row.
  const bloom = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease },
        };

  return (
    <motion.div
      className="fixed inset-0 z-100 flex flex-col overflow-hidden bg-page"
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
    >
      {/* Loaded eagerly — this screen is the first thing anyone sees, so the
          loop is worth the bytes here even though the sections below wait
          until they're scrolled near. */}
      <Backdrop media={backdrops.gate} intensity="full" eager />

      {/* ---- Brand bar ---- */}
      <div className="relative mx-auto flex min-h-[72px] w-full max-w-[1240px] items-center gap-5 px-(--gutter)">
        <span className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line-bright font-mono text-[11px] font-bold text-bone"
          >
            LS
          </span>
          <span className="text-[15.5px] font-medium tracking-[0.01em] text-bone">
            {profile.name}
          </span>
        </span>

        <span className="hud ml-auto hidden text-faint sm:inline">
          {profile.location}
        </span>
      </div>

      {/* ---- Centre block ---- */}
      <div className="relative mx-auto flex w-full max-w-[1240px] flex-1 flex-col items-center justify-center px-(--gutter) text-center">
        <motion.h1
          {...bloom(0)}
          className="display text-[clamp(2.5rem,7.5vw,5.5rem)]"
        >
          <span className="mb-2 block text-[0.3em] font-normal tracking-[0.16em] text-dim uppercase">
            {gate.lead}
          </span>
          {profile.first} <span className="accent-italic">{profile.last}</span>
        </motion.h1>

        <motion.div {...bloom(0.1)} className="mt-8">
          <button
            type="button"
            onClick={onEnter}
            className="group inline-flex items-center gap-4 rounded-full bg-bone py-2 pr-2 pl-7 text-ink shadow-[0_8px_26px_rgba(0,0,0,0.36)] transition-all duration-300 hover:-translate-y-px hover:shadow-[0_12px_34px_rgba(0,0,0,0.44)]"
          >
            <span className="hud font-bold">Enter</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-bone transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={15} />
            </span>
          </button>

          <p className="hud mt-5 text-[10px] text-faint">or press enter</p>
        </motion.div>
      </div>

      {/* ---- Card row along the bottom of the frame ---- */}
      <motion.div
        {...bloom(0.3)}
        className="relative mx-auto flex w-full max-w-[1240px] flex-col items-stretch gap-[clamp(14px,2.4vw,30px)] px-(--gutter) pt-[clamp(18px,3vh,32px)] pb-[clamp(20px,3vh,34px)] text-center md:flex-row md:items-end md:justify-between md:text-left"
      >
        <article className="glass px-[18px] py-[15px] md:max-w-[320px]">
          <h2 className="text-[14.5px] font-medium tracking-[0.005em] text-bone">
            {gate.noteHeading}
          </h2>
          <p className="mt-1.5 text-[11.5px] leading-[1.55] font-light text-faint">
            {gate.noteBody}
          </p>
        </article>

        <p className="max-md:order-first text-[12.5px] font-light text-dim [text-shadow:0_1px_14px_rgba(4,6,4,0.7)] md:pb-1.5">
          {gate.caption}
        </p>

        <div className="flex justify-center gap-[clamp(10px,1.4vw,16px)]">
          {gate.stats.map((stat) => (
            <article
              key={stat.figure}
              className="glass flex flex-1 flex-col px-[18px] py-[15px] md:min-w-[124px] md:flex-none"
            >
              <strong className="text-[23px] leading-[1.1] font-medium text-bone">
                {stat.figure}
              </strong>
              <span className="text-[12px] font-light text-faint">{stat.label}</span>
              <span className="mt-3.5 text-[11px] font-light text-dim">
                {stat.foot}
              </span>
            </article>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
