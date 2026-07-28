import { ArrowRight, ExternalLink, Gauge } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project, ProjectStatus } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { GithubIcon } from "@/components/ui/BrandIcons";

const MAX_VISIBLE_TECHNOLOGIES = 5;

const statusVariant: Record<
  ProjectStatus,
  "success" | "warning" | "accent"
> = {
  Completed: "success",
  "In Progress": "warning",
  Maintained: "accent",
};

interface ProjectCardProps {
  project: Project;
  /** Set on the first card so its cover loads eagerly (LCP). */
  priority?: boolean;
}

/** Card shown in the Projects grid; links to the full case study. */
export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const hiddenTechCount =
    project.technologies.length - MAX_VISIBLE_TECHNOLOGIES;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5">
      {/* Cover */}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`Open the ${project.name} case study`}
        className="relative block aspect-[16/9] overflow-hidden border-b border-border"
      >
        <Image
          src={project.image}
          alt={`${project.name} preview`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={statusVariant[project.status]}>
            {project.status}
          </Badge>
          <Badge>
            <Gauge className="h-3 w-3" />
            {project.difficulty}
          </Badge>
        </div>

        <h3 className="mt-4 text-xl font-semibold text-foreground">
          {project.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-subtle">
          <span className="font-medium text-accent">Solves: </span>
          {project.problem}
        </p>

        {/* Tech tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies
            .slice(0, MAX_VISIBLE_TECHNOLOGIES)
            .map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          {hiddenTechCount > 0 && <Badge>+{hiddenTechCount}</Badge>}
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-4 border-t border-border pt-5">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
            >
              <ExternalLink className="h-4 w-4" />
              Demo
            </a>
          )}
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
            >
              <GithubIcon className="h-4 w-4" />
              Code
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all duration-300 hover:gap-2.5"
          >
            Case Study
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
