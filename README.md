# Lakshya Shahi — Portfolio

Personal portfolio. Vite + React + Tailwind CSS v4, no UI library, no CMS.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run lint
```

Add `?boot` to the URL to replay the entry gate (it's shown once per tab session).

## Editing content

Everything readable on the site lives in [`src/data/profile.js`](src/data/profile.js) —
name, role, links, the gate copy, section headings, experience, stack, projects,
milestones, education, contact. Components read from it and never hardcode copy,
so updating the site is editing one file.

Headings are stored as a pair (`title` + `accent`) because every heading on the
site is a bold sans phrase followed by an italic serif one.

## Structure

```
src/
  App.jsx                 gate + section order
  index.css               design tokens (@theme) and custom utilities
  data/profile.js         all content
  components/
    BootGate.jsx          entry screen over a video loop
    Hero.jsx  Marquee.jsx  Nav.jsx
    About.jsx  Experience.jsx  Stack.jsx  Work.jsx
    Milestones.jsx  Activity.jsx  Contact.jsx  Footer.jsx
    backdrop/             Backdrop.jsx, ParticleField.jsx
    ui/                   Section, SectionHeader, Reveal, Icons
  hooks/                  useBootGate, useInView, useActiveSection,
                          usePrefersReducedMotion, useGitHubActivity
public/bg/                six video loops + matching WebP posters
```

### Backgrounds

Each backdrop is a `<video>` loop with a WebP poster of the *same* frame. The
poster paints immediately and drifts (Ken Burns), so a section is never visually
dead; the video cross-fades in over it once it can play, and is only fetched
when the section is near the viewport. Under `prefers-reduced-motion` the
`<video>` element is not rendered at all — a paused video still downloads.

Footage and stills are from Pexels, free for commercial use. `public/bg/gate.*`
is the loop from the Glowinn template, transcoded down from 11.2 MB to 682 KB
and self-hosted here — the template library's own storage is not a CDN licensed
to serve this site's traffic, so its URL appears nowhere in the project.

### Avatar

`public/avatar.webp` is a pixel-art portrait with its own HUD frame, so the
About card renders it full-bleed and adds no chrome of its own. It's a 2× box
downscale of a 1254² source, WebP q95 — 73 KB. `public/lakshya.jpg` is the
photo it was drawn from; nothing renders it.

### Contact form

The form posts over `fetch` and never leaves the page. With no configuration it
goes to [FormSubmit](https://formsubmit.co), which takes no account and no API
key — it posts straight to the address in `profile.email`.

### GitHub activity

The contribution calendar is fetched live on load — the day counts from
[github-contributions-api.jogruber.de](https://github-contributions-api.jogruber.de),
the repo count from the public GitHub API. Both are unauthenticated and
rate-limited per IP, so the section degrades to a link if either fails.

## Before deploying

- **Activate the contact form.** FormSubmit forwards nothing until the owner
  confirms the address once. Submit the live form yourself, then click the link
  in the "Confirm your email" message it sends. Until you do, submissions come
  back as an error. To use Formspree instead, put its form ID in
  `contact.formspreeId` in `src/data/profile.js`.
- **Certificate dates.** The Google Cloud certificates are dated Nov 2023 in the
  resume, which predates the B.Tech start (2024) — worth double-checking.
- **og:image** is generated at `public/og.png`; regenerate it if the name or role
  changes.

Static output — `dist/` deploys as-is to Vercel, Netlify or GitHub Pages.
