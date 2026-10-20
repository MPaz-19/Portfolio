/* ────────────────────────────────────────────────────────────
 * SITE CONFIGURATION — single source of truth for personal data.
 * ──────────────────────────────────────────────────────────── */

export const siteConfig = {
  /* TODO: your full name as it should appear across the site. */
  name: "Manuel Paz",
  /* TODO: initials used in the logo and monogram (2 chars max). */
  initials: "MP",
  /* TODO: your professional title. */
  role: "System Engineer",
  /* TODO: short, attractive one-liner shown in the hero. */
  tagline:
    "I design and build fast, accessible web applications — from clean, elegant interfaces to robust, well-tested APIs.",
  /* Shown as a status badge in the hero. Set to "" to hide it. */
  availability: "Open to new opportunities",

  /* TODO: contact details. */
  email: "mpazvi19@gmail.com",
  location: "Popayán, Colombia",

  /* Technical annotations in the hero and footer: short city label,
     coordinates, and the IANA time zone used for the live clock. */
  city: "Popayán, CO",
  coordinates: "2.4448° N — 76.6147° W",
  timeZone: "America/Bogota",
  utcOffset: "GMT-5",

  /* TODO: the production URL of this portfolio (used for SEO,
     Open Graph, sitemap and robots). No trailing slash. */
  siteUrl: "https://portfolio-indol-two-88.vercel.app",

  /* Path to your CV inside /public. Replace public/cv.pdf with
     your real resume and keep this path unchanged. */
  resumeUrl: "/cv.pdf",

  /* TODO: your GitHub username. Powers the live GitHub section
     (repositories, stars, languages and recent activity). */
  githubUsername: "MPaz-19",

  /* TODO: social links. */
  links: {
    github: "https://github.com/MPaz-19",
    linkedin: "https://www.linkedin.com/in/mpaz19/",
  },

  /* TODO: Formspree form endpoint for the contact form,
     e.g. "https://formspree.io/f/mnjewwbd".
     While empty, the form gracefully falls back to a mailto link. */
  formspreeEndpoint: "https://formspree.io/f/mnjewwbd",

  /* SEO */
  description:
    "Portfolio of Manuel Paz, a System Engineer specialized in React, Next.js, TypeScript, Node.js, Java. Explore selected projects, case studies and open source activity.",
  keywords: [
    "System Engineer",
    "Software Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Java",
    "Portfolio",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
