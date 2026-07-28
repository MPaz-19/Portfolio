"use client";

import { techStack } from "@/content/tech-stack";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TechStack() {
  return (
    <section id="tech" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="02 · Tech Stack"
            title="Technologies I work with"
            description="The tools I reach for to build reliable products — organized by where they live in the stack."
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {techStack.map((category, index) => (
            <Reveal key={category.title} delay={index * 0.08}>
              <Card hover={false} className="h-full">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <category.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-medium text-foreground">
                    {category.title}
                  </h3>
                  <span className="ml-auto font-mono text-xs text-subtle">
                    {category.items.length}
                  </span>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {category.items.map((item) => (
                    <li key={item.name}>
                      <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-muted transition-colors duration-300 hover:border-accent/40 hover:text-foreground">
                        <span
                          aria-hidden="true"
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
