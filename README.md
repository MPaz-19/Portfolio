# Developer Portfolio

A modern, minimal and recruiter-focused portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4** and **Framer Motion**. Dark mode by default, fully responsive, SEO-optimized and ready to deploy.

## Features

- **Premium minimal design** — sober palette (near-black, grays, violet accent), generous spacing, Geist typography.
- **Projects as the centerpiece** — every project has a full case study page (`/projects/[slug]`) with objective, architecture, screenshots, challenges → solutions and learnings.
- **Live GitHub integration** — repositories, stars, language distribution and latest commits fetched server-side from the GitHub API (cached 1 hour, graceful fallback).
- **Motion layer** — Awwwards-inspired, mostly pure CSS (`src/app/motion.css`): preloader counter, masked headline reveals, scroll-driven word-by-word statement, count-ups, tech marquee, expanding project rows, outline-to-fill contact headline, magnetic CTAs and a cursor follower. Scroll effects use CSS scroll-driven animations and fall back to a static layout; everything respects `prefers-reduced-motion`.
- **Dark / light theme** — dark by default, toggle in the navbar (`next-themes`).
- **Contact form** — client-side validation, honeypot, Formspree support with mailto fallback.
- **SEO complete** — Metadata API, Open Graph image generated at build time, JSON-LD (Person), `sitemap.xml`, `robots.txt`, custom favicon.
- **Extras** — session preloader, scroll-spy navbar with scroll progress, live local time, back-to-top button, custom animated 404.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## Project structure

```
src/
├── app/                  # Routes: home, /projects/[slug], 404, sitemap, robots, OG image
├── components/
│   ├── layout/           # Navbar, Footer, ThemeToggle, ScrollToTop, Preloader, CustomCursor
│   ├── sections/         # Hero, TechMarquee, About, TechStack, Projects, Experience, Background, Contact
│   ├── projects/         # CaseStudy
│   ├── github/           # GitHubStrip (live summary under the projects)
│   └── ui/               # Button, Badge, Card, Container, Reveal, SectionHead, LocalTime, Magnetic
├── config/               # site.config.ts — single source of personal data
├── content/              # Typed content: projects, experience, education, skills…
├── lib/                  # GitHub API client, utils
└── types/                # Shared TypeScript types
```



