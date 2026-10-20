import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/content/projects";
import type { Project, ProjectStatus } from "@/types";
import { GitHubStrip } from "@/components/github/GitHubStrip";
import { Container } from "@/components/ui/Container";
import { DisplayHeading, SectionHead } from "@/components/ui/SectionHead";
import { cssVars, labelClass } from "@/lib/styles";
import { cn } from "@/lib/utils";

const MAX_VISIBLE_TECHNOLOGIES = 5;

/* Color of the status dot on each row. */
const statusColor: Record<ProjectStatus, string> = {
  Maintained: "#22c55e",
  Completed: "var(--accent)",
  "In Progress": "#f59e0b",
};

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const caseStudyHref = `/projects/${project.slug}`;

  return (
    <li className="fx-proj">
      <div className="fx-proj-head">
        <p className="pt-3 font-mono text-xs text-muted">
          {String(index + 1).padStart(2, "0")}
        </p>

        <div>
          <h3 className="text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.035em] text-foreground">
            {/* Stretched link: the whole row opens the case study. */}
            <Link
              href={caseStudyHref}
              className="fx-proj-link"
              data-cursor="view"
            >
              <span className="fx-proj-title">{project.name}</span>
            </Link>
          </h3>
          <p className="mt-3 max-w-[54ch] text-[0.9375rem] leading-relaxed text-muted">
            {project.description}
          </p>
        </div>

        <p className="fx-proj-stack pt-3 font-mono text-xs leading-[1.8] text-muted">
          {project.technologies.slice(0, MAX_VISIBLE_TECHNOLOGIES).join(" · ")}
        </p>

        <p className="fx-proj-meta flex flex-col items-start gap-2 pt-2.5 font-mono text-xs text-muted">
          <span
            className="fx-tag"
            style={cssVars({ "--tag": statusColor[project.status] })}
          >
            {project.status}
          </span>
          <span>{project.difficulty}</span>
        </p>

        <span className="fx-proj-arrow" aria-hidden="true">
          <ArrowUpRight className="h-[18px] w-[18px]" />
        </span>
      </div>

      <div className="fx-proj-body">
        <div>
          <div className="fx-proj-body-grid">
            <p className="fx-proj-solves max-w-[62ch] text-[0.9375rem] leading-relaxed text-foreground/85">
              <span className={cn(labelClass, "mb-1.5 block")}>Solves</span>
              {project.problem}
            </p>
            <div className="fx-proj-links">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fx-btn-ghost fx-btn-sm"
                >
                  Live demo
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fx-btn-ghost fx-btn-sm"
                >
                  Code
                </a>
              )}
              <Link href={caseStudyHref} className="fx-btn-ghost fx-btn-sm">
                Case study
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export function Projects() {
  const count = String(projects.length).padStart(2, "0");

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="pb-24 md:pb-32"
    >
      <Container className="flex flex-col gap-12 md:gap-20">
        <SectionHead
          id="projects-title"
          index="03"
          title="Selected work"
          aside="Hover a row for the details"
        />

        <div className="grid items-end gap-x-20 gap-y-6 lg:grid-cols-2">
          <DisplayHeading lines={[{ text: "Selected" }, { text: "work" }]}>
            <sup className="ml-2 align-super font-mono text-[0.2em] font-medium tracking-normal text-accent">
              ({count})
            </sup>
          </DisplayHeading>
          <p className="fx-reveal max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted">
            Work I&apos;m proud of — each project includes a full case study
            with architecture, challenges, solutions and what I learned building
            it.
          </p>
        </div>

        <ol className="fx-projects">
          {projects.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index} />
          ))}
        </ol>

        <GitHubStrip />
      </Container>
    </section>
  );
}
