"use client";

import { aboutHighlights, aboutParagraphs } from "@/content/about";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="01 · About"
            title="A developer focused on building things that matter"
            description="Beyond the stack: who I am, how I work and what I'm aiming for."
          />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Story */}
          <div className="space-y-5">
            {aboutParagraphs.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.08}>
                <p className="leading-relaxed text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          {/* Highlights */}
          <div className="grid content-start gap-4 sm:grid-cols-2">
            {aboutHighlights.map((highlight, index) => (
              <Reveal key={highlight.title} delay={0.1 + index * 0.08}>
                <Card className="h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <highlight.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-medium text-foreground">
                    {highlight.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {highlight.description}
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
