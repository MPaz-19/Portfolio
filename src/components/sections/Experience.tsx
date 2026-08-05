"use client";

import { Award, ChevronRight } from "lucide-react";
import { experience } from "@/content/experience";
import type { ExperienceType } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const typeLabel: Record<ExperienceType, string> = {
  work: "Work",
  personal: "Personal",
  academic: "Academic",
};

export function Experience() {
  /* Nothing to show yet — render nothing rather than an empty timeline.
     The navbar link is hidden by the same condition. */
  if (experience.length === 0) return null;

  return (
    <section id="experience" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            /* Sections are numbered by hand: if experience comes back, this
               becomes 04 and Education/Skills/GitHub/Contact shift up one. */
            eyebrow="04 · Experience"
            title="Where I've built things"
            description="Professional work, personal products and academic practice — everything that shaped how I build software."
          />
        </Reveal>

        {/* Vertical timeline */}
        <div className="relative space-y-12 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
          {experience.map((item, index) => (
            <Reveal key={`${item.company}-${item.role}`} delay={index * 0.08}>
              <div className="relative pl-10">
                {/* Timeline dot */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-accent bg-background"
                />

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.role}
                  </h3>
                  <span className="text-sm font-medium text-accent">
                    @ {item.company}
                  </span>
                  <Badge>{typeLabel[item.type]}</Badge>
                </div>
                <p className="mt-1.5 font-mono text-xs text-subtle">
                  {item.period}
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
                  {item.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {item.responsibilities.map((responsibility) => (
                    <li
                      key={responsibility}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted"
                    >
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {responsibility}
                    </li>
                  ))}
                </ul>

                {item.achievements.length > 0 && (
                  <div className="mt-4 rounded-xl border border-border bg-surface/60 p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-subtle">
                      Key achievements
                    </p>
                    <ul className="mt-2.5 space-y-2">
                      {item.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className="flex gap-2.5 text-sm leading-relaxed text-muted"
                        >
                          <Award className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
