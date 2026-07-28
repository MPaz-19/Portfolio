import type { LucideIcon } from "lucide-react";

/* ────────────────────────────────────────────────────────────
 * Shared domain types for the portfolio.
 * Content files under `src/content` must conform to these shapes,
 * which keeps data and presentation strictly separated.
 * ──────────────────────────────────────────────────────────── */

export type ProjectStatus = "Completed" | "In Progress" | "Maintained";
export type ProjectDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

/** Full case study rendered at /projects/[slug]. */
export interface ProjectCaseStudy {
  objective: string;
  architecture: string;
  architectureHighlights: string[];
  screenshots: ProjectScreenshot[];
  features: string[];
  challenges: ProjectChallenge[];
  learnings: string[];
}

export interface Project {
  slug: string;
  name: string;
  /** One-line summary shown on the card. */
  tagline: string;
  description: string;
  /** The real-world problem this project solves. */
  problem: string;
  image: string;
  technologies: string[];
  difficulty: ProjectDifficulty;
  status: ProjectStatus;
  links: {
    /** Live demo URL. Leave empty to hide the button. */
    demo: string;
    /** GitHub repository URL. Leave empty to hide the button. */
    repo: string;
  };
  caseStudy: ProjectCaseStudy;
}

export type ExperienceType = "work" | "personal" | "academic";

export interface Experience {
  company: string;
  role: string;
  period: string;
  type: ExperienceType;
  description: string;
  responsibilities: string[];
  achievements: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

export type CertificationKind = "certification" | "course" | "bootcamp";

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  kind: CertificationKind;
  url?: string;
}

export interface Skill {
  name: string;
  /** Proficiency from 0 to 100, rendered as an animated bar. */
  level: number;
  icon: LucideIcon;
}

export interface TechItem {
  name: string;
  /** Brand color used for the small indicator dot. */
  color: string;
}

export interface TechCategory {
  title: string;
  icon: LucideIcon;
  items: TechItem[];
}

export interface AboutHighlight {
  title: string;
  description: string;
  icon: LucideIcon;
}

/* ── GitHub API (normalized shapes consumed by the UI) ────── */

export interface GitHubProfile {
  login: string;
  name: string;
  avatarUrl: string;
  htmlUrl: string;
  bio: string | null;
  followers: number;
  publicRepos: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  htmlUrl: string;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
  topics: string[];
}

export interface GitHubLanguage {
  name: string;
  /** Share of repositories using this language, 0–100. */
  percent: number;
}

export interface GitHubCommit {
  sha: string;
  message: string;
  repo: string;
  url: string;
  date: string;
}

export interface GitHubData {
  profile: GitHubProfile;
  topRepos: GitHubRepo[];
  totalStars: number;
  languages: GitHubLanguage[];
  recentCommits: GitHubCommit[];
}
