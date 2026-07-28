import {
  ArrowLeft,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Gauge,
  Image as ImageIcon,
  Layers,
  Lightbulb,
  ListChecks,
  Puzzle,
  Target,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project, ProjectStatus } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const statusVariant: Record<
  ProjectStatus,
  "success" | "warning" | "accent"
> = {
  Completed: "success",
  "In Progress": "warning",
  Maintained: "accent",
};

/** Section wrapper with a consistent icon + title heading. */
function CaseStudySection({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="mt-16">
      <h2 className="flex items-center gap-3 text-xl font-semibold text-foreground md:text-2xl">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </Reveal>
  );
}

interface CaseStudyProps {
  project: Project;
}

/** Full case study page content for a single project. */
export function CaseStudy({ project }: CaseStudyProps) {
  const { caseStudy } = project;

  return (
    <article className="pb-24 pt-28 md:pt-36">
      <Container className="max-w-4xl">
        {/* Back navigation */}
        <Reveal>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>
        </Reveal>

        {/* Header */}
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Badge variant={statusVariant[project.status]}>
              {project.status}
            </Badge>
            <Badge>
              <Gauge className="h-3 w-3" />
              {project.difficulty}
            </Badge>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {project.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {project.tagline}
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            {project.links.demo && (
              <Button href={project.links.demo}>
                <ExternalLink className="h-4 w-4" />
                View live demo
              </Button>
            )}
            {project.links.repo && (
              <Button href={project.links.repo} variant="secondary">
                <GithubIcon className="h-4 w-4" />
                View repository
              </Button>
            )}
          </div>
        </Reveal>

        {/* Cover */}
        <Reveal delay={0.1}>
          <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
            <Image
              src={project.image}
              alt={`${project.name} cover`}
              fill
              priority
              sizes="(min-width: 896px) 896px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Objective */}
        <CaseStudySection icon={Target} title="Objective">
          <p className="leading-relaxed text-muted">{caseStudy.objective}</p>
          <p className="mt-4 leading-relaxed text-muted">
            <span className="font-medium text-foreground">
              Problem it solves:{" "}
            </span>
            {project.problem}
          </p>
        </CaseStudySection>

        {/* Features */}
        <CaseStudySection icon={ListChecks} title="Key features">
          <ul className="grid gap-3 sm:grid-cols-2">
            {caseStudy.features.map((feature) => (
              <li
                key={feature}
                className="flex gap-2.5 text-sm leading-relaxed text-muted"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {feature}
              </li>
            ))}
          </ul>
        </CaseStudySection>

        {/* Architecture */}
        <CaseStudySection icon={Layers} title="Architecture">
          <p className="leading-relaxed text-muted">
            {caseStudy.architecture}
          </p>
          <Card hover={false} className="mt-6">
            <ul className="space-y-3">
              {caseStudy.architectureHighlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 font-mono text-[13px] leading-relaxed text-muted"
                >
                  <span aria-hidden="true" className="select-none text-accent">
                    ▸
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </Card>
        </CaseStudySection>

        {/* Screenshots */}
        <CaseStudySection icon={ImageIcon} title="Screenshots">
          <div className="grid gap-5 sm:grid-cols-2">
            {caseStudy.screenshots.map((screenshot) => (
              <figure key={screenshot.src + screenshot.alt}>
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border">
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    fill
                    sizes="(min-width: 640px) 440px, 100vw"
                    className="object-cover"
                  />
                </div>
                {screenshot.caption && (
                  <figcaption className="mt-2 text-xs text-subtle">
                    {screenshot.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </CaseStudySection>

        {/* Challenges & solutions */}
        <CaseStudySection icon={Puzzle} title="Challenges & solutions">
          <div className="space-y-5">
            {caseStudy.challenges.map((item) => (
              <Card hover={false} key={item.challenge}>
                <p className="text-xs font-medium uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Challenge
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.challenge}
                </p>
                <div className="mt-4 border-t border-border pt-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Solution
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.solution}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </CaseStudySection>

        {/* Learnings */}
        <CaseStudySection icon={Lightbulb} title="What I learned">
          <ul className="space-y-3">
            {caseStudy.learnings.map((learning) => (
              <li
                key={learning}
                className="flex gap-2.5 text-sm leading-relaxed text-muted"
              >
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {learning}
              </li>
            ))}
          </ul>
        </CaseStudySection>

        {/* Tech stack */}
        <CaseStudySection icon={Cpu} title="Tech stack">
          <div className="flex flex-wrap gap-2.5">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="accent">
                {tech}
              </Badge>
            ))}
          </div>
        </CaseStudySection>

        {/* Footer CTA */}
        <Reveal className="mt-16">
          <Card
            hover={false}
            className="flex flex-col items-center gap-5 py-10 text-center"
          >
            <h2 className="text-xl font-semibold text-foreground">
              Want to dive deeper?
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              The repository includes the full source code, setup instructions
              and technical documentation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {project.links.repo && (
                <Button href={project.links.repo}>
                  <GithubIcon className="h-4 w-4" />
                  Explore the code
                </Button>
              )}
              <Button href="/#projects" variant="secondary">
                <ArrowLeft className="h-4 w-4" />
                All projects
              </Button>
            </div>
          </Card>
        </Reveal>
      </Container>
    </article>
  );
}
