/**
 * Inline icons — no icon package, no extra bundle weight.
 * All inherit currentColor and size from the `size` prop.
 */

const base = (size) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
});

export const GitHubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.28-1.7-1.28-1.7-1.05-.71.08-.7.08-.7 1.15.09 1.76 1.19 1.76 1.19 1.02 1.76 2.68 1.25 3.34.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

export const LinkedInIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

export const MailIcon = ({ size = 18 }) => (
  <svg {...base(size)}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
    <path d="m3 6.5 9 6 9-6" />
  </svg>
);

export const ArrowUpRight = ({ size = 16 }) => (
  <svg {...base(size)}>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export const ArrowDown = ({ size = 16 }) => (
  <svg {...base(size)}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);

export const DownloadIcon = ({ size = 16 }) => (
  <svg {...base(size)}>
    <path d="M12 3v12M7.5 10.5 12 15l4.5-4.5M4 20h16" />
  </svg>
);

export const CodeIcon = ({ size = 16 }) => (
  <svg {...base(size)}>
    <path d="m9 17-5-5 5-5M15 7l5 5-5 5" />
  </svg>
);

export const MenuIcon = ({ size = 20 }) => (
  <svg {...base(size)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = ({ size = 20 }) => (
  <svg {...base(size)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const CopyIcon = ({ size = 16 }) => (
  <svg {...base(size)}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3H5.5A2.5 2.5 0 0 0 3 5.5v7A2.5 2.5 0 0 0 5.5 15" />
  </svg>
);

export const CheckIcon = ({ size = 16 }) => (
  <svg {...base(size)}>
    <path d="m5 13 4.5 4.5L19 7" />
  </svg>
);

export const TrophyIcon = ({ size = 16 }) => (
  <svg {...base(size)}>
    <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
    <path d="M8 5.5H5.5v1A3.5 3.5 0 0 0 8 9.85M16 5.5h2.5v1A3.5 3.5 0 0 1 16 9.85" />
    <path d="M12 13v3.5M9 20h6M10.5 16.5h3l.5 3.5h-4l.5-3.5Z" />
  </svg>
);

export const BadgeIcon = ({ size = 16 }) => (
  <svg {...base(size)}>
    <circle cx="12" cy="9.5" r="5.5" />
    <path d="m9 14.5-1 6 4-2 4 2-1-6" />
  </svg>
);

export const SendIcon = ({ size = 16 }) => (
  <svg {...base(size)}>
    <path d="M4 12 20 4l-8 16-2-6-6-2Z" />
  </svg>
);
