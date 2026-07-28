import { Database, MonitorSmartphone, Server, Wrench } from "lucide-react";
import type { TechCategory } from "@/types";

/* Technologies grouped by category. The `color` is the brand
   color used for the small dot on each chip. */
export const techStack: TechCategory[] = [
  {
    title: "Frontend",
    icon: MonitorSmartphone,
    items: [
      { name: "HTML", color: "#e34f26" },
      { name: "CSS", color: "#1572b6" },
      { name: "JavaScript", color: "#f7df1e" },
      { name: "TypeScript", color: "#3178c6" },
      { name: "React", color: "#61dafb" },
      { name: "Next.js", color: "#a3a3a3" },
      { name: "Tailwind CSS", color: "#06b6d4" },
      { name: "Angular", color: "#dd0031" },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    items: [
      { name: "Node.js", color: "#5fa04e" },
      { name: "Express", color: "#a3a3a3" },
      { name: "Java", color: "#e76f00" },
      { name: "Spring Boot", color: "#6db33f" },
      { name: "Python", color: "#3776ab" },
      { name: "C++", color: "#00599c" },
      { name: "C", color: "#41a1eb" },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    items: [
      { name: "PostgreSQL", color: "#336791" },
      { name: "MySQL", color: "#4479a1" },
      { name: "MongoDB", color: "#47a248" },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    items: [
      { name: "Git", color: "#f05032" },
      { name: "GitHub", color: "#a3a3a3" },
      { name: "Docker", color: "#2496ed" },
      { name: "Postman", color: "#ff6c37" },
      { name: "Linux", color: "#fbbf24" },
      { name: "Figma", color: "#f24e1e" },
      { name: "Slack", color: "#1259c5" },
    ],
  },
];
