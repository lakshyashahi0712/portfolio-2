import { useState } from "react";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";
import { backdrops, headings, stack } from "../data/profile";

const TOOL_COUNT = stack.reduce((total, group) => total + group.items.length, 0);

/**
 * Toolkit — one frosted slab, four rows, and a read-out.
 *
 * Four boxes of bullet points is the shape every portfolio uses, and it says
 * nothing: anyone can list React. So every tool here is a pill you can poke,
 * and poking it writes where it was actually used into the strip above.
 * Same information density, but you learn something by playing with it.
 *
 * Hover and keyboard focus both drive the read-out, and so does a tap — the
 * value only clears when the pointer leaves the whole slab, which never
 * happens on a touch screen. So a tap sticks until the next one, and a mouse
 * feels live. One piece of state, no pinning logic.
 */
export default function Stack() {
  const [active, setActive] = useState(null);

  return (
    <Section id="stack" media={backdrops.stack}>
      <SectionHeader
        {...headings.stack}
        sub="Not a list of everything I have touched — the things I reach for without looking them up. Poke one to see where it went."
      />

      {/* ---- Read-out ---- */}
      {/* Hidden from assistive tech on purpose: each pill already carries its
          note in its accessible name, so announcing this too would say
          everything twice. */}
      <Reveal
        aria-hidden="true"
        className="panel mt-10 flex flex-col gap-2 bg-page/70 px-5 py-4 backdrop-blur-md sm:flex-row sm:items-center sm:gap-5 sm:px-6 sm:py-5 lg:mt-14"
      >
        <span className="hud shrink-0 text-faint">{active ? active.group : "Read-out"}</span>
        <span className="hidden h-3 w-px shrink-0 bg-line-bright sm:block" />

        <p className="min-w-0 flex-1 text-[14px] leading-snug text-dim sm:min-h-[1.5rem] sm:text-[15px]">
          {active ? (
            <>
              <span className="text-bone">{active.name}</span>
              <span className="text-faint"> — </span>
              {active.note}
            </>
          ) : (
            <span className="font-mono text-[13px] tracking-[0.04em] text-faint">
              pick a tool and I&rsquo;ll tell you where it went
              <span className="animate-blink ml-1.5 inline-block h-3 w-[7px] translate-y-[1px] bg-faint" />
            </span>
          )}
        </p>

        <span className="hud hidden shrink-0 text-faint lg:block">{TOOL_COUNT} tools</span>
      </Reveal>

      {/* ---- Rows ---- */}
      <div
        className="panel mt-4 divide-y divide-line bg-page/60 backdrop-blur-md"
        onMouseLeave={() => setActive(null)}
      >
        {stack.map((group, i) => (
          <Reveal key={group.no} delay={0.05 * i}>
            {/* Label above the pills on a phone, beside them from lg up. */}
            <div className="group grid gap-4 px-5 py-6 sm:px-7 sm:py-8 lg:grid-cols-[15rem_1fr] lg:items-start lg:gap-12">
              <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
                <span
                  aria-hidden="true"
                  className="text-[2.25rem] leading-none font-extrabold tracking-[-0.03em] text-bone/[0.16] transition-colors duration-500 group-hover:text-bone/30 lg:text-[3.25rem]"
                >
                  {group.no}
                </span>
                <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-bone sm:text-lg lg:text-[1.375rem]">
                  {group.title}
                </h3>
              </div>

              <ul className="flex flex-wrap gap-2 sm:gap-2.5">
                {group.items.map((item) => {
                  const on = active?.name === item.name;
                  const select = () => setActive({ ...item, group: group.title });

                  return (
                    <li key={item.name}>
                      <button
                        type="button"
                        aria-pressed={on}
                        aria-label={`${item.name} — ${item.note}`}
                        onMouseEnter={select}
                        onFocus={select}
                        onClick={select}
                        className={`rounded-full border px-3 py-2 text-[12.5px] leading-none transition-all duration-300 active:scale-[0.96] sm:px-4 sm:py-2.5 sm:text-[13.5px] ${
                          on
                            ? "border-bone bg-bone text-ink"
                            : "border-line bg-ink/40 text-dim hover:border-bone/40 hover:bg-bone hover:text-ink"
                        }`}
                      >
                        {item.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
