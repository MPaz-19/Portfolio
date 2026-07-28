import { GitCommit } from "lucide-react";
import { cn, timeAgo } from "@/lib/utils";
import type { GitHubCommit } from "@/types";

interface ActivityFeedProps {
  commits: GitHubCommit[];
  className?: string;
}

/** List of the latest public commits, linking to each one. */
export function ActivityFeed({ commits, className }: ActivityFeedProps) {
  return (
    <ul className={cn("divide-y divide-border", className)}>
      {commits.map((commit) => (
        <li key={`${commit.sha}-${commit.date}`}>
          <a
            href={commit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 py-3"
          >
            <GitCommit className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-foreground transition-colors group-hover:text-accent">
                {commit.message}
              </p>
              <p className="mt-0.5 text-xs text-subtle">
                <span className="font-mono">{commit.sha}</span> · {commit.repo}{" "}
                · {timeAgo(commit.date)}
              </p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
