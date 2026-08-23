import { motion } from "motion/react";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";
import { about, headings, profile } from "../data/profile";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

/**
 * The statement, revealed a word at a time as it scrolls through.
 *
 * Words start at low opacity rather than zero, so the shape of the
 * paragraph is there from the moment it enters the frame — you're reading
 * text that's brightening, not waiting for text to arrive.
 */
function WordReveal({ text }) {
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");

  if (reduced) return <>{text}</>;

  return words.map((word, i) => (
    <motion.span
      key={`${word}-${i}`}
      className="inline-block"
      initial={{ opacity: 0.14 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-15% 0px -25% 0px" }}
      transition={{ duration: 0.5, delay: i * 0.028, ease: "easeOut" }}
    >
      {word}
      {i < words.length - 1 && " "}
    </motion.span>
  ));
}

/**
 * About. Two columns: the statement and prose on the left, the portrait card
 * on the right.
 */
export default function About() {
  return (
    <Section id="about">
      <SectionHeader {...headings.about} />

      <div className="mt-12 grid gap-10 lg:mt-20 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
        {/* ---- Statement + prose ---- */}
        <div>
          <p className="display text-[1.5rem] leading-[1.3] sm:text-[2.125rem] sm:leading-[1.25] lg:text-[2.5rem]">
            <WordReveal text={about.statement} />
          </p>

          <Reveal>
            <p className="mt-7 max-w-2xl leading-[1.7] text-dim sm:mt-10 sm:leading-[1.75]">
              {about.body}
            </p>
          </Reveal>

          <dl className="mt-9 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:mt-12 sm:grid-cols-2">
            {about.facts.map((fact, i) => (
              <Reveal
                key={fact.label}
                delay={0.05 * i}
                className="bg-page/80 px-5 py-5 backdrop-blur-sm sm:px-6 sm:py-6"
              >
                <dt className="hud text-faint">{fact.label}</dt>
                <dd className="mt-2.5 text-[15px] leading-snug text-bone sm:mt-3">
                  {fact.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* ---- Profile card ---- */}
        <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
          {/* Capped on phones. At full width the portrait is the tallest thing
              on the page and pushes everything below it a screen further
              down; at 16rem it sits beside the prose instead.

              No header row and no gradient over the image: the artwork
              carries its own frame, name plate and status read-out, and
              anything laid on top of it either repeats that or covers it. */}
          <figure className="panel mx-auto w-full max-w-[16rem] overflow-hidden sm:max-w-[19rem] lg:max-w-none">
            <img
              src={profile.photo}
              alt={`${profile.name}, ${profile.role} — pixel-art portrait`}
              width={627}
              height={627}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover"
            />

            <figcaption className="flex items-center justify-between gap-4 border-t border-line px-5 py-4">
              <span className="hud text-faint">{profile.location}</span>
              <span className="hud flex items-center gap-2 text-dim">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-live" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
                </span>
                Open to work
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
