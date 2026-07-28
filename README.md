# Developer Portfolio

A modern, minimal and recruiter-focused portfolio built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4** and **Framer Motion**. Dark mode by default, fully responsive, SEO-optimized and ready to deploy.

## ✨ Features

- **Premium minimal design** — sober palette (near-black, grays, violet accent), generous spacing, Geist typography.
- **Projects as the centerpiece** — every project has a full case study page (`/projects/[slug]`) with objective, architecture, screenshots, challenges → solutions and learnings.
- **Live GitHub integration** — repositories, stars, language distribution and latest commits fetched server-side from the GitHub API (cached 1 hour, graceful fallback).
- **Subtle animations** — Framer Motion reveals, staggered hero, animated skill bars; respects `prefers-reduced-motion`.
- **Dark / light theme** — dark by default, toggle in the navbar (`next-themes`).
- **Contact form** — client-side validation, honeypot, Formspree support with mailto fallback.
- **SEO complete** — Metadata API, Open Graph image generated at build time, JSON-LD (Person), `sitemap.xml`, `robots.txt`, custom favicon.
- **Extras** — session preloader, scroll-spy navbar, back-to-top button, custom animated 404.

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## 🛠 Make it yours (3 steps)

1. **Edit [`src/config/site.config.ts`](src/config/site.config.ts)** — name, role, tagline, email, location, site URL, GitHub username, social links and (optionally) your Formspree endpoint. Every `TODO` marks a value to replace.
2. **Edit the content files in [`src/content/`](src/content/)** — `projects.ts` (your projects + case studies), `experience.ts`, `education.ts`, `skills.ts`, `about.ts`, `tech-stack.ts`. All data is typed; your editor will guide you.
3. **Replace the assets in [`public/`](public/)** — `cv.pdf` with your resume, `images/avatar.svg` with your photo, and the images in `images/projects/` with real screenshots.

Optional: copy `.env.example` to `.env.local` and set `GITHUB_TOKEN` to raise the GitHub API rate limit.

## 📁 Project structure

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

**Architecture notes:** Server Components by default (`"use client"` only where interactivity/animation requires it); content is strictly separated from presentation; the GitHub section renders on the server with ISR-style caching.

## ☁️ Deploy

The easiest path is [Vercel](https://vercel.com): push this repo to GitHub, import it in Vercel and deploy. Remember to update `siteUrl` in `site.config.ts` with your production domain so SEO, sitemap and Open Graph use the right URLs.
