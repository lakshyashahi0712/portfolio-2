import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";
import { BadgeIcon, TrophyIcon } from "./ui/Icons";
import { education, headings, milestones } from "../data/profile";

/** Recognition gets the trophy, everything else is a certificate. */
const iconFor = (category) =>
  category === "Recognition" ? <TrophyIcon size={16} /> : <BadgeIcon size={16} />;

const certificates = milestones.filter((item) => item.category === "Certification");

/**
 * Milestones and education.
 *
 * Certificates are the weakest thing on any junior CV, so they're rendered
 * small and in a grid — present, verifiable, not asking for attention. The
 * one that took three seasons of actual work leads the list.
 *
 * On a phone the certificate cards are dropped entirely: four cards of
 * course names is a screen and a half of scrolling for the least interesting
 * content on the page. One line takes their place, so nothing is hidden —
 * just not spelled out at that width.
 */
export default function Milestones() {
  return (
    <Section id="milestones">
      <SectionHeader
        {...headings.milestones}
        sub="Course certificates and one thing that took a while."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-20">
        {milestones.map((item, i) => (
          <Reveal
            key={item.title}
            delay={0.05 * i}
            className={
              item.category === "Certification" ? "hidden h-full sm:block" : "h-full"
            }
          >
            <article className="panel group flex h-full gap-5 px-6 py-6 transition-colors duration-500 hover:border-line-bright">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tile border border-line bg-bone/[0.03] text-dim transition-colors duration-500 group-hover:border-line-bright group-hover:text-bone"
              >
                {iconFor(item.category)}
              </span>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="hud text-faint">{item.category}</span>
                  <span aria-hidden="true" className="h-2.5 w-px bg-line-bright" />
                  <span className="hud text-faint">{item.date}</span>
                </div>

                <h3 className="mt-3 text-[17px] leading-snug font-semibold tracking-[-0.01em] text-bone">
                  {item.title}
                </h3>

                <p className="mt-2.5 text-[14.5px] leading-[1.65] text-dim">
                  {item.body}
                </p>

                <p className="hud mt-4 text-faint">{item.org}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Stands in for the certificate cards on phones. */}
      <Reveal className="sm:hidden">
        <p className="mt-5 text-[14.5px] leading-[1.65] text-dim">
          Plus {certificates.length} Google Cloud certificates — on the resume, and
          listed here on a wider screen.
        </p>
      </Reveal>

      {/* ---- Education ---- */}
      <div className="mt-14 lg:mt-20">
        <Reveal>
          <h3 className="hud border-b border-line pb-4 text-faint">Education</h3>
        </Reveal>

        <ul className="mt-2">
          {education.map((entry, i) => (
            <Reveal key={entry.degree} delay={0.05 * i} as="li">
              <div className="grid gap-2 border-b border-line py-6 sm:grid-cols-[9rem_1fr] sm:gap-8">
                <span className="hud pt-1 text-dim">{entry.period}</span>

                <div>
                  <p className="text-[16px] font-medium tracking-[-0.01em] text-bone">
                    {entry.degree}
                  </p>
                  <p className="mt-1.5 text-[14.5px] text-dim">{entry.school}</p>
                  {entry.note && (
                    <p className="hud mt-3 inline-block rounded-full border border-line-bright px-2.5 py-1 text-dim">
                      {entry.note}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
