"use client";

import { motion } from "framer-motion";
import { skills } from "@/content/skills";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="05 · Skills"
            title="Core strengths"
            description="The mix of technical and human skills I bring to a team."
          />
        </Reveal>

        <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {skills.map((skill, index) => (
            <Reveal key={skill.name} delay={index * 0.05}>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                  <skill.icon className="h-4 w-4 text-accent" />
                  {skill.name}
                </span>
                <span className="font-mono text-xs text-subtle">
                  {skill.level}%
                </span>
              </div>
              {/* Animated proficiency bar */}
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: 0.15 + index * 0.06,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className="h-full rounded-full bg-gradient-accent"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
