import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";
import { backdrops, experience, headings } from "../data/profile";

/**
 * Experience timeline — the section standing in for the reference site's
 * blog. Two roles, so a rail-and-node timeline rather than a grid: it makes
 * the ordering explicit and reads fine at two entries or at six.
 *
 * The rail is drawn on the list, not on each item, so it runs continuously
 * and stops at the last node instead of trailing off into the padding.
 */
export default function Experience() {
  return (
    <Section id="experience" media={backdrops.experience}>
      <SectionHeader
        {...headings.experience}
        sub="Two places so far — one that taught me how networks actually behave, and one that keeps me building alongside other people."
      />

      <ol className="relative mt-12 lg:mt-20">
        {/* The rail. Inset to line up with the centre of each node. */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-line-bright via-line to-transparent md:left-[calc(11rem+7px)]"
        />

        {experience.map((job, i) => (
          <li key={job.org} className="relative pb-10 last:pb-0 sm:pb-14">
            <Reveal delay={0.06 * i}>
              <div className="grid gap-6 pl-8 md:grid-cols-[11rem_1fr] md:gap-10 md:pl-0">
                {/* Period, in the left gutter on desktop */}
                <div className="md:pt-1 md:text-right">
                  <span className="hud text-dim">{job.period}</span>
                </div>

                {/* Node, sitting on the rail */}
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 left-0 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-line-bright bg-page md:left-[11rem]"
                >
                  <span
                    className={`h-[5px] w-[5px] rounded-full ${
                      job.status === "Active" ? "bg-live" : "bg-bone/60"
                    }`}
                  />
                </span>

                <article className="panel bg-page/60 px-6 py-6 backdrop-blur-sm sm:px-8 sm:py-8">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="text-xl font-semibold tracking-[-0.01em] text-bone sm:text-2xl">
                      {job.org}
                    </h3>
                    <span
                      className={`hud rounded-full border px-2.5 py-1 ${
                        job.status === "Active"
                          ? "border-live/30 text-live"
                          : "border-line-bright text-faint"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <p className="mt-2 text-[15px] text-dim">{job.role}</p>

                  <ul className="mt-6 space-y-4">
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-3.5 leading-[1.7] text-dim">
                        <span
                          aria-hidden="true"
                          className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-bone/50"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <li
                        key={tag}
                        className="hud rounded-full border border-line bg-bone/[0.03] px-3 py-1.5 text-faint"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
