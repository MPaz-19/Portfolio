# Developer Portfolio

A modern, minimal and recruiter-focused portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4** and **Framer Motion**. Dark mode by default, fully responsive, SEO-optimized and ready to deploy.

## Features

- **Premium minimal design** — sober palette (near-black, grays, violet accent), generous spacing, Geist typography.
- **Projects as the centerpiece** — every project has a full case study page (`/projects/[slug]`) with objective, architecture, screenshots, challenges → solutions and learnings.
- **Live GitHub integration** — repositories, stars, language distribution and latest commits fetched server-side from the GitHub API (cached 1 hour, graceful fallback).
- **Subtle animations** — Framer Motion reveals, staggered hero, animated skill bars; respects `prefers-reduced-motion`.
- **Dark / light theme** — dark by default, toggle in the navbar (`next-themes`).
- **Contact form** — client-side validation, honeypot, Formspree support with mailto fallback.
- **SEO complete** — Metadata API, Open Graph image generated at build time, JSON-LD (Person), `sitemap.xml`, `robots.txt`, custom favicon.
- **Extras** — session preloader, scroll-spy navbar, back-to-top button, custom animated 404.

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
│   ├── layout/           # Navbar, Footer, ThemeToggle, ScrollToTop, Preloader
│   ├── sections/         # Hero, About, TechStack, Projects, Experience, Education, Skills, GitHub, Contact
│   ├── projects/         # ProjectCard, CaseStudy
│   ├── github/           # RepoCard, LanguageBar, ActivityFeed
│   └── ui/               # Button, Badge, Card, Container, Reveal, SectionHeading
├── config/               # site.config.ts — single source of personal data
├── content/              # Typed content: projects, experience, education, skills…
├── lib/                  # GitHub API client, utils
└── types/                # Shared TypeScript types
```



