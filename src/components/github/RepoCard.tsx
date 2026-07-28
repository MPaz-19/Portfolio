import { FolderGit2, GitFork, Star } from "lucide-react";
import { formatMonthYear } from "@/lib/utils";
import type { GitHubRepo } from "@/types";
import { getLanguageColor } from "@/components/github/language-colors";

interface RepoCardProps {
  repo: GitHubRepo;
}

/** Compact repository card linking to the repo on GitHub. */
export function RepoCard({ repo }: RepoCardProps) {
  return (
    <a
      href={repo.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
    >
      <div className="flex items-center gap-2">
        <FolderGit2 className="h-4 w-4 shrink-0 text-accent" />
        <h4 className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-accent">
          {repo.name}
        </h4>
      </div>

      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
        {repo.description ?? "No description provided."}
      </p>

      <div className="mt-4 flex items-center gap-4 text-xs text-subtle">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: getLanguageColor(repo.language) }}
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5" />
          {repo.stars}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" />
          {repo.forks}
        </span>
        <span className="ml-auto">{formatMonthYear(repo.updatedAt)}</span>
      </div>
    </a>
  );
}
