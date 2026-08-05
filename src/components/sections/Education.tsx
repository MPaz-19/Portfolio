"use client";

import { BadgeCheck, GraduationCap } from "lucide-react";
import { certifications, education } from "@/content/education";
import type { CertificationKind } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const kindLabel: Record<CertificationKind, string> = {
  certification: "Certification",
  course: "Course",
  bootcamp: "Bootcamp",
};

export function Education() {
  return (
    <section id="education" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="04 · Education"
            title="Education & certifications"
            description="Formal studies plus the courses and bootcamps I take to keep learning constantly."
          />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr]">
          {/* Formal education */}
          <div className="space-y-4">
            {education.map((item) => (
              <Reveal key={item.institution}>
                <Card hover={false} className="h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">
                    {item.degree}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent">
                    {item.institution}
                  </p>
                  <p className="mt-1 font-mono text-xs text-subtle">
                    {item.period}
                  </p>
                  {item.description && (
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  )}
                </Card>
              </Reveal>
            ))}
          </div>

          {/* Certifications, courses and bootcamps */}
          <div className="grid content-start gap-4 sm:grid-cols-2">
            {certifications.map((certification, index) => (
              <Reveal key={certification.name} delay={0.05 + index * 0.06}>
                <Card className="h-full">
                  <div className="flex items-start justify-between gap-3">
                    <BadgeCheck className="h-5 w-5 shrink-0 text-accent" />
                    <Badge variant="accent">
                      {kindLabel[certification.kind]}
                    </Badge>
                  </div>
                  <h3 className="mt-3 text-sm font-medium leading-snug text-foreground">
                    {certification.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted">
                    {certification.issuer} · {certification.year}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
