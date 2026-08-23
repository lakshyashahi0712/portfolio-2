import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { navItems, profile } from "../data/profile";
import useActiveSection from "../hooks/useActiveSection";
import { CloseIcon, DownloadIcon, GitHubIcon, MenuIcon } from "./ui/Icons";

const sectionIds = navItems.map((n) => n.href.slice(1));

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile panel on Escape, and lock scroll while it's open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Floating capsule, centred — not a full-width bar */}
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
        <motion.nav
          aria-label="Primary"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className={`flex items-center gap-1 rounded-full border px-2 py-2 transition-colors duration-500 ${
            scrolled
              ? "border-line-bright bg-ink/80 backdrop-blur-xl"
              : "border-line bg-ink/50 backdrop-blur-md"
          }`}
        >
          {/* Monogram — mobile only, where the links collapse away */}
          <a
            href="#top"
            aria-label={`${profile.name} — home`}
            className="flex h-9 w-9 items-center justify-center rounded-full font-mono text-xs font-bold text-bone md:hidden"
          >
            LS
          </a>

          {/* Links */}
          <ul className="hidden items-center md:flex">
            {navItems.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`hud relative block px-4 py-2.5 font-bold transition-colors duration-300 ${
                      isActive ? "text-bone" : "text-faint hover:text-dim"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-4 bottom-1 h-0.5 rounded-full bg-bone"
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="ml-1 flex items-center gap-1.5">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-faint transition-colors duration-300 hover:border-line-bright hover:text-bone"
            >
              <GitHubIcon size={15} />
            </a>

            <a
              href={profile.resume}
              download
              className="hud flex items-center gap-2 rounded-full border border-line-bright px-4 py-2.5 font-bold text-bone transition-colors duration-300 hover:border-bone/40 hover:bg-bone/5"
            >
              <DownloadIcon size={13} />
              <span className="hidden sm:inline">Resume</span>
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-bone transition-colors hover:border-line-bright md:hidden"
            >
              <MenuIcon size={17} />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-70 bg-ink/97 backdrop-blur-xl md:hidden"
          >
            <div aria-hidden="true" className="grid-backdrop absolute inset-0 opacity-40" />

            <div className="relative flex h-[76px] items-center justify-between px-6">
              <span className="hud text-faint">Navigation</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-bone transition-colors hover:border-line-bright"
              >
                <CloseIcon size={17} />
              </button>
            </div>

            <ul className="relative mt-6 px-6">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.4 }}
                  className="border-b border-line"
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-5"
                  >
                    <span className="hud text-faint">0{i + 1}</span>
                    <span className="display text-3xl">{item.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="relative mt-10 px-6">
              <a
                href={profile.resume}
                download
                className="hud flex w-full items-center justify-center gap-2 rounded-full bg-bone py-4 font-bold text-ink"
              >
                <DownloadIcon size={14} />
                Download resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
