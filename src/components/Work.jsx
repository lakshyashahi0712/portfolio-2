import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";
import { ArrowUpRight, CodeIcon, GitHubIcon } from "./ui/Icons";
import { backdrops, headings, projects } from "../data/profile";

const featured = projects.filter((p) => p.featured);
const rest = projects.filter((p) => !p.featured);

/** Live / Code / Client — the same row of affordances on every card. */
function Links({ project }) {
  return (
    <div className="mt-7 flex flex-wrap items-center gap-2.5">
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer noopener"
          className="hud group/link inline-flex items-center gap-2 rounded-full bg-bone px-4 py-2.5 font-bold text-ink transition-transform duration-300 hover:scale-[1.03]"
        >
          Live
          <span className="transition-transform duration-300 group-hover/link:rotate-45">
            <ArrowUpRight size={13} />
          </span>
        </a>
      )}

      <a
        href={project.code}
        target="_blank"
        rel="noreferrer noopener"
        className="hud inline-flex items-center gap-2 rounded-full border border-line-bright px-4 py-2.5 text-dim transition-colors duration-300 hover:border-bone/40 hover:text-bone"
      >
        <GitHubIcon size={13} />
        Code
      </a>

      {project.codeAlt && (
        <a
          href={project.codeAlt.url}
          target="_blank"
          rel="noreferrer noopener"
          className="hud inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-faint transition-colors duration-300 hover:border-line-bright hover:text-bone"
        >
          <CodeIcon size={13} />
          {project.codeAlt.label}
        </a>
      )}
    </div>
  );
}

/** The numbers each project moved. Rendered as a list, not prose. */
function Metrics({ items, className = "" }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((metric) => (
        <li key={metric} className="flex gap-3 text-[14px] leading-snug text-dim">
          <span
            aria-hidden="true"
            className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-bone/50"
          />
          {metric}
        </li>
      ))}
    </ul>
  );
}

function Tech({ items }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="hud rounded-full border border-line bg-bone/[0.03] px-3 py-1.5 text-faint"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Work. The first project gets a wide two-column card — it's the one with a
 * live URL and the strongest numbers, so it earns the extra room. The other
 * two featured builds sit beside each other underneath, and the remaining
 * work goes in a compact pair so the section doesn't turn into a catalogue.
 */
export default function Work() {
  const [lead, ...others] = featured;

  return (
    <Section id="work" media={backdrops.work}>
      <SectionHeader
        {...headings.work}
        sub="Five builds. Every number below is something I measured, not something I estimated."
      />

      <div className="mt-12 grid gap-5 lg:mt-20 lg:grid-cols-2">
        {/* ---- Lead project ---- */}
        <Reveal className="lg:col-span-2">
          <article className="panel bg-page/60 px-6 py-7 backdrop-blur-sm sm:px-10 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
              <div>
                <div className="flex items-center gap-3">
                  <span className="hud text-faint">/01</span>
                  <span className="hud rounded-full border border-line-bright px-2.5 py-1 text-dim">
                    Featured
                  </span>
                </div>

                <h3 className="display mt-6 text-[2rem] sm:text-4xl">{lead.name}</h3>

                <p className="mt-5 max-w-lg leading-[1.7] text-dim">{lead.blurb}</p>

                <Tech items={lead.tech} />
                <Links project={lead} />
              </div>

              <div className="lg:border-l lg:border-line lg:pl-10">
                <span className="hud text-faint">What it moved</span>
                <Metrics items={lead.metrics} className="mt-6" />
              </div>
            </div>
          </article>
        </Reveal>

        {/* ---- Remaining featured ---- */}
        {others.map((project, i) => (
          <Reveal key={project.name} delay={0.06 * i} className="h-full">
            <article className="panel flex h-full flex-col bg-page/60 px-6 py-7 backdrop-blur-sm sm:px-8 sm:py-8">
              <span className="hud text-faint">/0{i + 2}</span>

              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-bone">
                {project.name}
              </h3>

              <p className="mt-4 leading-[1.7] text-dim">{project.blurb}</p>

              <Metrics items={project.metrics} className="mt-7 border-t border-line pt-7" />

              <Tech items={project.tech} />

              <div className="mt-auto">
                <Links project={project} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* ---- Everything else ---- */}
      <div className="mt-14 lg:mt-20">
        <Reveal>
          <h3 className="hud border-b border-line pb-4 text-faint">Also built</h3>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.name} delay={0.06 * i} className="h-full">
              <article className="panel flex h-full flex-col bg-page/60 px-6 py-7 backdrop-blur-sm">
                <h4 className="text-lg font-semibold tracking-[-0.01em] text-bone">
                  {project.name}
                </h4>

                <p className="mt-3.5 text-[15px] leading-[1.65] text-dim">
                  {project.blurb}
                </p>

                <Metrics items={project.metrics} className="mt-6" />

                <div className="mt-auto">
                  <Links project={project} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
