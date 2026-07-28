import {
  Boxes,
  Database,
  GitBranch,
  Lightbulb,
  MessageSquare,
  Network,
  Users,
} from "lucide-react";
import type { Skill } from "@/types";

/* Core skills rendered as animated bars. `level` is 0–100.
   TODO: adjust levels honestly — recruiters value self-awareness. */
export const skills: Skill[] = [
  { name: "Problem Solving", level: 90, icon: Lightbulb },
  { name: "REST APIs", level: 85, icon: Network },
  { name: "Databases", level: 80, icon: Database },
  { name: "Git & Version Control", level: 85, icon: GitBranch },
  { name: "Software Architecture", level: 72, icon: Boxes },
  { name: "Teamwork", level: 92, icon: Users },
  { name: "Communication", level: 88, icon: MessageSquare },
];
