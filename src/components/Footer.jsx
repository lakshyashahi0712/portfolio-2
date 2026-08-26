import { ArrowUpRight, DownloadIcon, GitHubIcon, LinkedInIcon } from "./ui/Icons";
import { navItems, profile } from "../data/profile";

/**
 * Footer. Oversized name across the bottom, faded out — the same move the
 * hero makes, closing the page with the thing it opened on.
 */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div aria-hidden="true" className="grid-backdrop absolute inset-0 opacity-30" />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-14 pb-10 sm:pt-20 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1fr_auto_auto] lg:gap-20">
          <div>
            <p className="text-xl leading-snug font-medium tracking-[-0.01em] text-bone">
              {profile.availability}
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="group mt-6 inline-flex items-center gap-2 text-[15px] text-dim transition-colors hover:text-bone"
            >
              {profile.email}
              <span className="transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={14} />
              </span>
            </a>
          </div>

          <nav aria-label="Footer">
            <h2 className="hud text-faint">Sections</h2>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[15px] text-dim transition-colors hover:text-bone"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="hud text-faint">Elsewhere</h2>
            <ul className="mt-5 space-y-3">
              {[
                { href: profile.github, label: "GitHub", icon: <GitHubIcon size={14} /> },
                { href: profile.linkedin, label: "LinkedIn", icon: <LinkedInIcon size={14} /> },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2.5 text-[15px] text-dim transition-colors hover:text-bone"
                  >
                    {link.icon}
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resume}
                  download
                  className="inline-flex items-center gap-2.5 text-[15px] text-dim transition-colors hover:text-bone"
                >
                  <DownloadIcon size={14} />
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* The name, oversized and fading into the page. Spelled out rather
            than reusing `.display`, whose colour would fight the tint. The
            max is 11rem, not larger: past that the 13 characters stop fitting
            inside the 1400px container and the last one gets clipped. */}
        <p
          aria-hidden="true"
          className="text-fade mt-14 text-[clamp(2.5rem,13vw,11rem)] leading-[0.95] font-extrabold tracking-[-0.035em] whitespace-nowrap text-bone/[0.13] sm:mt-20"
        >
          {profile.first} {profile.last}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-7">
          <span className="hud text-faint">
            &copy; {new Date().getFullYear()} {profile.name}
          </span>
          <span className="hud text-faint">Built with React &amp; Tailwind</span>
        </div>
      </div>
    </footer>
  );
}
