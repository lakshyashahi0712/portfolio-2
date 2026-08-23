import Reveal from "./Reveal";

/**
 * Section header.
 *
 * The heading is always a pair: a bold sans phrase followed by an
 * italic serif one. That contrast is the single strongest signal in
 * the reference site's type, so every section repeats it and nothing
 * else has to work as hard.
 *
 *   <SectionHeader kicker="About me" title="Engineering the" accent="stack" />
 */
export default function SectionHeader({
  no,
  kicker,
  title,
  accent,
  sub,
  align = "left",
}) {
  const centered = align === "center";

  return (
    <header className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <div
          className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-bone/[0.03] px-3.5 py-1.5">
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-bone/70" />
            <span className="hud text-dim">{kicker}</span>
          </span>
          {no && <span className="hud text-faint">/{no}</span>}
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="display mt-5 text-[2.125rem] sm:mt-6 sm:text-5xl lg:text-[3.75rem]">
          {title}
          {accent && (
            <>
              {" "}
              <span className="accent-italic">{accent}</span>
            </>
          )}
        </h2>
      </Reveal>

      {sub && (
        <Reveal delay={0.14}>
          <p className="mt-4 text-[15px] leading-relaxed text-dim sm:mt-6 sm:text-lg">
            {sub}
          </p>
        </Reveal>
      )}
    </header>
  );
}
