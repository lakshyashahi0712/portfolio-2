/**
 * Every piece of content on the site lives here.
 * Edit this file to update the portfolio — no component changes needed.
 */

export const profile = {
  name: "Lakshya Shahi",
  first: "Lakshya",
  last: "Shahi",
  role: "Full-Stack Developer",
  location: "Ghaziabad, India",
  email: "lakshyashahi0712@gmail.com",
  github: "https://github.com/lakshyashahi0712",
  githubUser: "lakshyashahi0712",
  linkedin: "https://www.linkedin.com/in/lakshya-shahi-739a53334",
  resume: "/Lakshya-Shahi-Resume.pdf",
  // Pixel-art portrait, square, with its own HUD frame — the card renders it
  // full-bleed rather than adding chrome the artwork already has.
  photo: "/avatar.webp",
  availability: "Open to SDE internships",

  // Boot gate
  bootTitle: "Full Stack // 2026",
  bootTagline:
    "Building MERN applications and real-time systems — with an eye on the numbers they move.",

  // Hero. The line is split so it can end on the italic serif accent, the
  // same pair every section heading uses.
  heroLine: "I build full-stack web applications that hold up under",
  heroAccent: "real use",
  heroSub:
    "Real-time dashboards, a streaming interface, a Chrome extension that survives a single-page app rewriting the DOM underneath it. Shipped, measured, still running.",
  bio: "Third-year B.Tech IT student at GTBIT, New Delhi. I work across the stack with React, Node and MongoDB — and I just wrapped an internship at DRDO SAG building a real-time network operations dashboard. I care less about starting things than about shipping them and being able to point at what changed.",
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

/**
 * Section background media.
 *
 * `poster` paints immediately and drifts, so a section is never visually
 * dead; `video` cross-fades in over it and is only fetched when the section
 * is near the viewport (the gate and hero load theirs eagerly). Set a
 * `video` to null to run on the poster alone.
 *
 * The gate gets its own loop — it is the first thing anyone sees, and it
 * should not be the same footage the hero reuses one scroll later.
 *
 * Footage and stills: Pexels, free for commercial use.
 */
export const backdrops = {
  gate: { poster: "/bg/gate.webp", video: "/bg/gate.mp4" },
  hero: { poster: "/bg/hero.webp", video: "/bg/hero.mp4" },
  experience: { poster: "/bg/experience.webp", video: "/bg/experience.mp4" },
  stack: { poster: "/bg/stack.webp", video: "/bg/stack.mp4" },
  work: { poster: "/bg/work.webp", video: "/bg/work.mp4" },
  contact: { poster: "/bg/contact.webp", video: "/bg/contact.mp4" },
};

/** Hero counters — all three are verifiable from the resume. */
export const heroStats = [
  { value: "05", label: "Projects shipped" },
  { value: "100", label: "Lighthouse score" },
  { value: "03", label: "Arcade seasons" },
];

/**
 * Entry gate content.
 *
 * One screen: a lead-in line, the name, a single Enter affordance, and a
 * row of frosted cards along the bottom of the frame. Two stats here, not
 * three — the third would crowd the row at this width.
 */
export const gate = {
  lead: profile.role,
  noteHeading: "Full-stack, end to end",
  noteBody: profile.bootTagline,
  caption: "Ship it, then measure what changed.",
  stats: [
    { figure: "05", label: "Projects", foot: "Shipped and live" },
    { figure: "01", label: "Internship", foot: "DRDO SAG, 2026" },
  ],
};

/**
 * Section headings.
 *
 * Every heading is a pair — a bold sans phrase then an italic serif one —
 * so they live here as two fields rather than one string with markup in it.
 */
export const headings = {
  about: { kicker: "About me", title: "Engineering the", accent: "stack" },
  experience: { kicker: "Experience", title: "Where I have", accent: "worked" },
  stack: { kicker: "Toolkit", title: "Things I build", accent: "with" },
  work: { kicker: "Selected work", title: "Projects that", accent: "shipped" },
  milestones: { kicker: "Milestones", title: "Certified and", accent: "recognised" },
  activity: { kicker: "Activity", title: "Commits over", accent: "time" },
  contact: { kicker: "Contact", title: "Let's build", accent: "something" },
};

/** Scrolling marquee under the hero. */
export const marquee = [
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "Socket.io",
  "REST APIs",
  "Redux",
  "Tailwind CSS",
];

export const about = {
  // Rendered as a word-by-word scroll reveal
  statement:
    "I am Lakshya Shahi, a full-stack developer. I build web applications end to end and I measure whether they actually got better.",
  body: "Most of what I know came from building the thing and then fixing what broke. A Netflix-style app taught me state management; a developer-matching platform taught me auth and data modelling; a Chrome extension for a Vue single-page app taught me that the DOM will not sit still while you work. At DRDO SAG I learned networking from the OSI model up, because you cannot monitor a network you do not understand.",
  facts: [
    { label: "Institution", value: "GTBIT, New Delhi (B.Tech IT)" },
    { label: "Focus areas", value: "Full-stack, real-time systems" },
    { label: "Based in", value: "Ghaziabad, India" },
    { label: "Currently", value: "Open to SDE internships" },
  ],
};

/** The section that replaces the reference site's blog. */
export const experience = [
  {
    org: "DRDO SAG",
    role: "Full Stack & Cybersecurity Intern",
    period: "7 Jun — 31 Jul 2026",
    status: "Completed",
    tags: ["MERN", "Socket.io", "PM2", "Networking"],
    points: [
      "Built a MERN-stack Network Operations Center (NOC) dashboard for real-time device monitoring and network scanning, using Socket.io for live updates and PM2 for deployment.",
      "Studied networking fundamentals from the ground up — OSI model, network devices and protocols, air-gapped networks — to support cybersecurity-focused development.",
    ],
  },
  {
    org: "Google Developers Group, GTBIT",
    role: "Web Development Team Member",
    period: "Sep 2024 — Present",
    status: "Active",
    tags: ["Community", "Google Cloud", "Web"],
    points: [
      "Contributed to web development projects and knowledge-sharing sessions within a community of 100+ developers.",
      "Completed three consecutive Google Cloud Arcade seasons, reaching the highest tier in all three.",
    ],
  },
];

/**
 * Toolkit.
 *
 * Each item carries a `note` — where it was actually used. The section
 * surfaces it in a read-out when you hover or tap the tool, which is the
 * difference between a list of logos and something worth reading.
 */
export const stack = [
  {
    no: "01",
    title: "Frontend & UI",
    items: [
      { name: "React.js", note: "Every front end I have shipped, starting with StreamerGPT." },
      { name: "Redux", note: "One store for search, filters and the browse state." },
      { name: "Tailwind CSS", note: "Design tokens over stylesheets — this page included." },
      { name: "React Router", note: "Nested routes and views that stay in sync with the URL." },
      { name: "HTML5", note: "Semantics first: landmarks, real labels, one h1." },
      { name: "CSS3", note: "Grid, custom properties, animation without a library." },
    ],
  },
  {
    no: "02",
    title: "Backend & Data",
    items: [
      { name: "Node.js", note: "The DevTinder API and the DRDO NOC backend." },
      { name: "Express.js", note: "Routing, middleware, and auth that fails closed." },
      { name: "MongoDB", note: "Profiles and matches — where I learned data modelling." },
      { name: "Socket.io", note: "Live device status on the DRDO NOC dashboard." },
      { name: "REST APIs", note: "Consuming TMDB at 500+ entries, and writing my own." },
    ],
  },
  {
    no: "03",
    title: "Languages & Core",
    items: [
      { name: "JavaScript (ES6+)", note: "The language behind all five projects above." },
      { name: "Java", note: "Where I do data structures and algorithms." },
      { name: "SQL", note: "Joins, indexes, and knowing when not to reach for Mongo." },
    ],
  },
  {
    no: "04",
    title: "Tools & Practice",
    items: [
      { name: "Git", note: "A branch per feature and a history I can actually read." },
      { name: "GitHub", note: "Where every project on this page lives." },
      { name: "Google Cloud Platform", note: "Three Arcade seasons, highest tier in each." },
      { name: "Agile", note: "How the DRDO internship ran, sprint to sprint." },
      { name: "SDLC", note: "Requirements through deployment, not just the fun part." },
      {
        name: "Networking (OSI, NOC/SOC)",
        note: "From the OSI model up — you cannot monitor what you do not understand.",
      },
    ],
  },
];

export const projects = [
  {
    name: "StreamerGPT",
    blurb:
      "A Netflix-style streaming interface with AI-driven personalised recommendations, built on TMDB and Gemini.",
    metrics: [
      "~40% better content discovery",
      "100% Lighthouse score",
      "500+ movie entries over REST",
    ],
    tech: ["React.js", "Redux", "Tailwind CSS", "TMDB API", "Gemini API"],
    live: "https://streamer-gpt.vercel.app",
    code: "https://github.com/lakshyashahi0712/StreamerGPT",
    featured: true,
  },
  {
    name: "DevTinder",
    blurb:
      "A developer collaboration platform with secure JWT authentication and skill-based matching between profiles.",
    metrics: [
      "30+ profiles tested",
      "100% valid login success rate",
      "10+ developer matches made",
    ],
    tech: ["Node.js", "Express.js", "MongoDB", "React.js", "JWT"],
    live: null,
    code: "https://github.com/lakshyashahi0712/devTinder",
    codeAlt: {
      label: "Client",
      url: "https://github.com/lakshyashahi0712/devTinder_web",
    },
    featured: true,
  },
  {
    name: "AC Insights",
    blurb:
      "A Manifest V3 Chrome extension for the Apna College platform that generates live lecture notes, using MutationObserver to survive a Vue single-page app that rewrites the DOM underneath it.",
    metrics: ["Groq Whisper transcription", "Llama-generated notes", "Manifest V3"],
    tech: ["Chrome Extension", "JavaScript", "Groq API", "MutationObserver"],
    live: null,
    code: "https://github.com/lakshyashahi0712/ac-insights",
    featured: true,
  },
  {
    name: "Food Delivery App",
    blurb:
      "A restaurant discovery interface with a dynamic search and filter system built over a live catalogue.",
    metrics: ["60% faster search", "100+ restaurant entries"],
    tech: ["React.js", "Redux", "Tailwind CSS", "React Router"],
    live: "https://food-delivery-react-omega.vercel.app",
    code: "https://github.com/lakshyashahi0712/food-delivery-react",
    featured: false,
  },
  {
    name: "Web LLM",
    blurb:
      "A lightweight tool that runs large language models entirely in the browser — no server, no API key, no network round-trip.",
    metrics: ["3+ models running offline", "Zero cloud API dependency"],
    tech: ["JavaScript", "WebLLM API"],
    live: null,
    code: "https://github.com/lakshyashahi0712/web-llm",
    featured: false,
  },
];

export const milestones = [
  {
    category: "Recognition",
    date: "3 seasons",
    title: "Google Cloud Arcade — Highest Tier",
    org: "Google Cloud",
    body: "Reached the top tier in three consecutive Arcade seasons while on the GDG GTBIT web development team.",
  },
  {
    category: "Certification",
    date: "Aug 2026",
    title: "Claude Platform 101",
    org: "Anthropic",
    body: "Anthropic's official course on the Claude Platform, covering core capabilities, use cases, and best practices for working with Claude.",
  },
  {
    category: "Certification",
    date: "Nov 2023",
    title: "Generative AI Fundamentals",
    org: "Google Cloud",
    body: "Foundations of generative models and their practical application.",
  },
  {
    category: "Certification",
    date: "Nov 2023",
    title: "Introduction to Large Language Models",
    org: "Google Cloud",
    body: "How large language models are trained, prompted and evaluated.",
  },
  {
    category: "Certification",
    date: "Nov 2023",
    title: "Build Infrastructure with Terraform",
    org: "Google Cloud",
    body: "Infrastructure as code — provisioning and managing cloud resources declaratively.",
  },
  {
    category: "Certification",
    date: "Nov 2023",
    title: "Responsible AI: Applying AI Principles",
    org: "Google Cloud",
    body: "Fairness, accountability and safety considerations when shipping AI systems.",
  },
];

export const education = [
  {
    degree: "B.Tech — Information Technology",
    school: "Guru Tegh Bahadur Institute of Technology (GGSIPU), New Delhi",
    period: "2024 — 2028",
    note: null,
  },
  {
    degree: "Senior Secondary (XII)",
    school: "Preet Vihar Govt. Coed Senior Secondary School",
    period: "2024",
    note: null,
  },
  {
    degree: "Secondary (X)",
    school: "Ram Kishan Institute, Ghaziabad",
    period: "2022",
    note: null,
  },
];

export const contact = {
  body: "I'm looking for software development internships and I'm happy to talk about anything full-stack. The fastest way to reach me is email — the form below lands in the same inbox.",
  // Optional. Leave as-is and the form posts to FormSubmit, which needs no
  // account — see "Before deploying" in the README. Set a Formspree form ID
  // here to use that instead; either way the form posts from the page.
  formspreeId: "YOUR_FORM_ID",
};
