import { motion } from "motion/react";
import Backdrop from "./backdrop/Backdrop";
import { ArrowDown, ArrowUpRight, DownloadIcon } from "./ui/Icons";
import { backdrops, heroStats, profile } from "../data/profile";

const ease = [0.22, 1, 0.36, 1];

/**
 * The hero. The name is the whole composition — everything else is a
 * read-out beside it, sized so it never competes.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden pt-32 pb-16"
    >
      <Backdrop media={backdrops.hero} intensity="hero" eager />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
          {/* ---- Identity ---- */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2.5 rounded-full border border-line-bright bg-ink/40 px-3.5 py-2 backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-live" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
              </span>
              <span className="hud text-bone">{profile.availability}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease }}
              className="display mt-7 text-[clamp(3.25rem,12vw,9rem)]"
            >
              {profile.first}
              <br />
              <span className="accent-italic">{profile.last}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              <span className="hud text-dim">{profile.role}</span>
              <span aria-hidden="true" className="h-3 w-px bg-line-bright" />
              <span className="hud text-faint">{profile.location}</span>
              <a
                href="#about"
                className="hud group ml-auto hidden items-center gap-2 text-faint transition-colors hover:text-bone lg:inline-flex"
              >
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowDown size={13} />
                </motion.span>
                Scroll
              </a>
            </motion.div>
          </div>

          {/* ---- Read-out ---- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.34, ease }}
            className="lg:pb-3"
          >
            {/* Sized close to a section heading. At body-copy size this column
                left the right half of the first screen looking empty. */}
            <p className="max-w-lg text-[1.5rem] leading-[1.2] font-semibold tracking-[-0.02em] text-bone sm:text-[1.75rem] lg:text-[2rem]">
              {profile.heroLine} <span className="accent-italic">{profile.heroAccent}</span>.
            </p>

            <p className="mt-5 max-w-lg text-[15px] leading-[1.65] text-dim sm:text-base">
              {profile.heroSub}
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dd className="display text-[2rem] sm:text-[2.75rem]">{stat.value}</dd>
                  <dt className="hud mt-2 text-faint">{stat.label}</dt>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-4 rounded-full bg-bone py-2 pr-2 pl-6 text-ink transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="hud font-bold">Let&rsquo;s connect</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-bone transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={15} />
                </span>
              </a>

              <a
                href={profile.resume}
                download
                className="hud inline-flex items-center gap-2.5 rounded-full border border-line-bright bg-ink/40 px-5 py-3.5 text-dim backdrop-blur-sm transition-colors duration-300 hover:border-bone/40 hover:text-bone"
              >
                <DownloadIcon size={14} />
                Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
