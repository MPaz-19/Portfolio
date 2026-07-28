"use client";

import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="03 · Projects"
            title="Selected projects"
            description="Work I'm proud of — each project includes a full case study with architecture, challenges, solutions and what I learned building it."
          />
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal
              key={project.slug}
              delay={(index % 2) * 0.1}
              className="h-full"
            >
              <ProjectCard project={project} priority={index === 0} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
