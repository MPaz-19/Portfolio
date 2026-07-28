import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/content/projects";
import { CaseStudy } from "@/components/projects/CaseStudy";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render every case study at build time. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.name} — Case Study`,
    description: project.tagline,
    openGraph: {
      title: `${project.name} — Case Study`,
      description: project.tagline,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <CaseStudy project={project} />;
}
