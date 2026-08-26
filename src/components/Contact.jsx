import { useState } from "react";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";
import {
  CheckIcon,
  CopyIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  SendIcon,
} from "./ui/Icons";
import { backdrops, contact, headings, profile } from "../data/profile";

// The transport is configured in profile.js beside the rest of the site's
// content. This deployment uses FormSubmit's AJAX activation token.
const ENDPOINT = contact.endpoint;
const field =
  "mt-2.5 w-full rounded-tile border border-line bg-ink/50 px-4 py-3.5 text-[15px] text-bone transition-colors duration-300 outline-none placeholder:text-faint focus:border-bone/40";

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the mailto link beside it still works */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${profile.email}`}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-faint transition-colors duration-300 hover:border-line-bright hover:text-bone"
    >
      {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
    </button>
  );
}

export default function Contact() {
  // idle · sending · sent · error
  const [status, setStatus] = useState("idle");

  const onSubmit = async (event) => {
    event.preventDefault();
    // Captured before the first await: `currentTarget` is only valid for the
    // duration of the dispatch.
    const form = event.currentTarget;

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      // Formspree signals failure with the status code. FormSubmit answers
      // 200 either way and puts the verdict in the body — an unconfirmed
      // address comes back as success:"false" — so both need checking.
      if (!res.ok) throw new Error(`${ENDPOINT} responded ${res.status}`);
      const payload = await res.json().catch(() => null);
      if (payload && String(payload.success) === "false") {
        throw new Error(payload.message ?? "rejected");
      }

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, copy: true },
    { label: "Based in", value: profile.location, href: null },
  ];

  return (
    <Section id="contact" media={backdrops.contact}>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* ---- Pitch + channels ---- */}
        <div>
          <SectionHeader {...headings.contact} sub={contact.body} />

          <dl className="mt-9 border-t border-line sm:mt-12">
            {channels.map((channel) => (
              <Reveal key={channel.label}>
                <div className="flex items-center gap-4 border-b border-line py-5">
                  <dt className="hud w-20 shrink-0 text-faint">{channel.label}</dt>
                  <dd className="min-w-0 flex-1">
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="block truncate text-[15px] text-bone transition-colors hover:text-dim"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <span className="text-[15px] text-bone">{channel.value}</span>
                    )}
                  </dd>
                  {channel.copy && <CopyEmail />}
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.08}>
            <div className="mt-8 flex items-center gap-2.5">
              {[
                { href: profile.github, label: "GitHub", icon: <GitHubIcon size={16} /> },
                { href: profile.linkedin, label: "LinkedIn", icon: <LinkedInIcon size={16} /> },
                { href: `mailto:${profile.email}`, label: "Email", icon: <MailIcon size={16} /> },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer noopener"
                  aria-label={link.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-dim transition-colors duration-300 hover:border-bone/40 hover:text-bone"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ---- Form ---- */}
        <Reveal delay={0.12}>
          <form
            onSubmit={onSubmit}
            className="panel bg-page/70 px-6 py-7 backdrop-blur-md sm:px-8 sm:py-9"
          >
            {/* Honeypot — a text input bots fill in and people never see. */}
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <input type="hidden" name="_subject" value={`Portfolio enquiry — ${profile.name}`} />
            {/* Without this an AJAX post comes back as a captcha
                challenge instead of a delivery. */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="hud text-faint">Your name</span>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                  className={field}
                />
              </label>

              <label className="block">
                <span className="hud text-faint">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={field}
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="hud text-faint">Message</span>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="What are you building?"
                className={`${field} resize-y leading-relaxed`}
              />
            </label>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="hud group inline-flex items-center gap-3 rounded-full bg-bone px-6 py-3.5 font-bold text-ink transition-all duration-300 hover:scale-[1.02] disabled:scale-100 disabled:opacity-60"
              >
                {status === "sending" ? "Sending" : "Send message"}
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  <SendIcon size={14} />
                </span>
              </button>

              {/* One live region for all three outcomes, so a screen reader
                  hears the result without the message order mattering. */}
              <p aria-live="polite" className="hud">
                {status === "sent" && (
                  <span className="text-live">Sent — I&rsquo;ll reply soon.</span>
                )}
                {status === "error" && (
                  <span className="text-warm">
                    That didn&rsquo;t go through. Email me directly?
                  </span>
                )}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
