import type { Experience } from "@/types";

/* ────────────────────────────────────────────────────────────
 * Experience timeline.
 *
 * Empty on purpose — there's no professional experience to show
 * yet, and the Projects section carries the weight instead. The
 * Experience section (and its navbar link) hide themselves while
 * this array is empty, so nothing needs to be touched elsewhere.
 *
 * When you land a job, internship or practice, add it here and
 * both the section and the nav link come back automatically:
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

export const experience: Experience[] = [];
