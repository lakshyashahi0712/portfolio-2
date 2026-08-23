import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";
import { ArrowUpRight } from "./ui/Icons";
import { headings, profile } from "../data/profile";
import useGitHubActivity from "../hooks/useGitHubActivity";

/* Five steps of cream. Zero contributions is a barely-there cell rather
   than an empty one, so the shape of the calendar is always readable. */
const LEVELS = [
  "bg-bone/[0.055]",
  "bg-bone/25",
  "bg-bone/45",
  "bg-bone/[0.68]",
  "bg-bone",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Chunk the flat day list into calendar columns.
 * The first column is padded so every row is the same weekday all the way
 * across — without that the grid is just 365 squares in a rough rectangle.
 */
function toWeeks(days) {
  if (!days.length) return [];

  const weeks = [];
  let week = Array.from({ length: new Date(days[0].date).getUTCDay() }, () => null);

  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) {
    weeks.push([...week, ...Array.from({ length: 7 - week.length }, () => null)]);
  }

  return weeks;
}

/** Month label above the first column that starts a new month. */
function monthLabels(weeks) {
  let last = -1;
  return weeks.map((week) => {
    const first = week.find(Boolean);
    if (!first) return null;
    const month = new Date(first.date).getUTCMonth();
    if (month === last) return null;
    last = month;
    return MONTHS[month];
  });
}

function Cell({ day }) {
  if (!day) return <span className="h-[11px] w-[11px]" />;

  return (
    <span
      title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
      className={`h-[11px] w-[11px] rounded-[2px] ${LEVELS[day.level] ?? LEVELS[0]}`}
    />
  );
}

export default function Activity() {
  const { status, days, total, repos, active } = useGitHubActivity(profile.githubUser);
  const weeks = toWeeks(days);
  const labels = monthLabels(weeks);

  const stats = [
    { value: status === "ready" ? total.toLocaleString() : "—", label: "Contributions / yr" },
    { value: repos === null ? "—" : String(repos), label: "Public repos" },
    { value: status === "ready" ? String(active) : "—", label: "Active days / yr" },
  ];

  return (
    <Section id="activity">
      <SectionHeader
        {...headings.activity}
        sub="Pulled live from GitHub whenever this page loads — not a screenshot."
      />

      <Reveal delay={0.1}>
        <div className="panel mt-12 px-5 py-6 sm:px-8 sm:py-8 lg:mt-20">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
            <span className="hud text-faint">@{profile.githubUser}</span>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="hud group inline-flex items-center gap-2 text-dim transition-colors hover:text-bone"
            >
              Open on GitHub
              <span className="transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={13} />
              </span>
            </a>
          </div>

          {/* ---- Calendar ---- */}
          {status === "error" ? (
            <p className="py-10 text-center text-[14.5px] text-faint">
              GitHub&rsquo;s activity feed didn&rsquo;t answer this time.{" "}
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="text-dim underline decoration-line-bright underline-offset-4 transition-colors hover:text-bone"
              >
                The profile has it
              </a>
              .
            </p>
          ) : (
            <div className="mt-6 overflow-x-auto pb-2">
              <div className="inline-block min-w-full">
                {status === "loading" ? (
                  /* Same footprint as the real grid, so nothing jumps when
                     the data lands. */
                  <div className="flex animate-pulse gap-[3px]">
                    {Array.from({ length: 53 }, (_, w) => (
                      <div key={w} className="flex flex-col gap-[3px]">
                        {Array.from({ length: 7 }, (_, d) => (
                          <span
                            key={d}
                            className="h-[11px] w-[11px] rounded-[2px] bg-bone/[0.055]"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="mb-2 flex gap-[3px]">
                      {labels.map((label, i) => (
                        <span
                          key={i}
                          className="hud relative w-[11px] text-[9px] tracking-[0.1em] text-faint"
                        >
                          {label && (
                            <span className="absolute top-0 left-0 whitespace-nowrap">
                              {label}
                            </span>
                          )}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-[3px]">
                      {weeks.map((week, w) => (
                        <div key={w} className="flex flex-col gap-[3px]">
                          {week.map((day, d) => (
                            <Cell key={day?.date ?? `${w}-${d}`} day={day} />
                          ))}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ---- Legend ---- */}
          <div className="mt-5 flex items-center gap-2">
            <span className="hud text-faint">Less</span>
            {LEVELS.map((level) => (
              <span key={level} className={`h-[11px] w-[11px] rounded-[2px] ${level}`} />
            ))}
            <span className="hud text-faint">More</span>
          </div>
        </div>
      </Reveal>

      {/* ---- Stats ---- */}
      <dl className="mt-5 grid grid-cols-3 gap-3 sm:gap-5">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={0.05 * i}>
            <div className="panel px-4 py-5 sm:px-6 sm:py-7">
              <dd className="display text-2xl sm:text-4xl">{stat.value}</dd>
              <dt className="hud mt-2.5 text-faint sm:mt-3">{stat.label}</dt>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
