import type { Experience } from "@/types";

/* ────────────────────────────────────────────────────────────
 * Experience timeline.
 *
 * No professional experience yet? That's fine — the entries
 * below showcase personal projects and academic practice, which
 * is exactly what recruiters expect from a junior profile.
 *
 * When you land a job or internship, add it using this template:
 *
 * {
 *   company: "Company Name",
 *   role: "Software Developer",
 *   period: "Jan 2026 — Present",
 *   type: "work",
 *   description: "One line about the company and your mission there.",
 *   responsibilities: ["What you do day to day…"],
 *   achievements: ["Measurable impact, e.g. reduced load time by 40%…"],
 * },
 * ──────────────────────────────────────────────────────────── */

export const experience: Experience[] = [
  
  {
    company: "University Software Lab",
    role: "Software Development Practice",
    period: "2023 — 2024",
    type: "academic",
    description:
      "Team-based academic practice building software for real stakeholders using agile methodologies.",
    responsibilities: [
      "Developed features in a 5-person Scrum team with weekly sprints.",
      "Modeled relational databases and built the Java/Spring Boot backend.",
      "Wrote technical documentation and presented demos to stakeholders.",
    ],
    achievements: [
      "Delivered the project on time with the highest evaluation in the cohort.",
      "Introduced Git flow and pull-request reviews to the team workflow.",
    ],
  },
];
