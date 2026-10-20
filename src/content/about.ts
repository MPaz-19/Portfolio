import { BookOpen, Code2, Puzzle, Users } from "lucide-react";
import type { AboutHighlight } from "@/types";

/* TODO: rewrite these paragraphs with your own story.
   Keep them short — recruiters skim. */
export const aboutParagraphs: string[] = [
  "I'm a student system engineer who enjoys turning complex problems into simple, elegant software. I work across the entire stack — from designing clean, accessible interfaces to building reliable APIs and data models behind them.",
  "What drives me is the craft: readable code, thoughtful architecture and products that feel fast and effortless to use. I care about the details users notice and the ones they never should.",
  "I work iteratively — I break problems down, ship small, measure and refine. I write code for the next person who reads it, document decisions and treat code review as a conversation, not a gate.",
  "My goal is to join a team where I can contribute from day one, keep growing as an engineer and help build products that matter.",
];

/* Large statement in the About section, lit word by word as it
   scrolls into view. Segments marked `accent` are highlighted. */
export const aboutStatement: { text: string; accent?: boolean }[] = [
  { text: "A developer focused on building" },
  { text: "things that matter", accent: true },
  { text: "— I turn complex problems into" },
  { text: "simple, elegant software,", accent: true },
  { text: "from the interface down to the API." },
];

export const aboutHighlights: AboutHighlight[] = [
  {
    title: "Clean Code",
    description:
      "Readable, tested and maintainable code that other developers enjoy working with.",
    icon: Code2,
  },
  {
    title: "Problem Solver",
    description:
      "I break complex problems into small, shippable steps with pragmatic solutions.",
    icon: Puzzle,
  },
  {
    title: "Continuous Learner",
    description:
      "Always exploring new tools, patterns and best practices to sharpen my craft.",
    icon: BookOpen,
  },
  {
    title: "Team Player",
    description:
      "Clear communication, honest code reviews and a genuine focus on shared goals.",
    icon: Users,
  },
];
