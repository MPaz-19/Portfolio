import { FolderGit2, Star, Users, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { getGitHubData } from "@/lib/github";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { ActivityFeed } from "@/components/github/ActivityFeed";
import { LanguageBar } from "@/components/github/LanguageBar";
import { RepoCard } from "@/components/github/RepoCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
}) {
  return (
    <Card hover={false} className="flex items-center gap-4 p-5">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-2xl font-semibold text-foreground">{value}</p>
        <p className="text-xs text-muted">{label}</p>
      </div>
    </Card>
  );
}

/** Friendly state shown until a real GitHub username is configured. */
function GitHubFallback() {
  return (
    <Reveal>
      <Card hover={false} className="flex flex-col items-center py-14 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <GithubIcon className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-lg font-semibold text-foreground">
          GitHub integration ready
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
          Set <code className="font-mono text-accent">githubUsername</code> in{" "}
          <code className="font-mono">src/config/site.config.ts</code> to show
          live repositories, stars, languages and recent commits fetched from
          the GitHub API.
        </p>
        <Button
          href={siteConfig.links.github}
          variant="secondary"
          className="mt-6"
        >
          <GithubIcon className="h-4 w-4" />
          Visit my GitHub
        </Button>
      </Card>
    </Reveal>
  );
}

/**
 * Server component: fetches GitHub data at build/revalidation time
 * and renders live stats, or a graceful fallback if unavailable.
 */
export async function GitHubSection() {
  const data = await getGitHubData();

  return (
    <section id="github" className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="07 · GitHub"
            title="Open source & activity"
            description="Live data from the GitHub API — public repositories, most used languages and my latest commits."
          />
        </Reveal>

        {!data ? (
          <GitHubFallback />
        ) : (
          <div className="space-y-10">
            {/* Profile stats */}
            <Reveal>
              <div className="grid gap-4 sm:grid-cols-3">
                <StatCard
                  icon={FolderGit2}
                  label="Public repositories"
                  value={data.profile.publicRepos}
                />
                <StatCard
                  icon={Star}
                  label="Total stars"
                  value={data.totalStars}
                />
                <StatCard
                  icon={Users}
                  label="Followers"
                  value={data.profile.followers}
                />
              </div>
            </Reveal>

            {/* Language distribution */}
            {data.languages.length > 0 && (
              <Reveal delay={0.05}>
                <Card hover={false}>
                  <h3 className="text-sm font-medium text-foreground">
                    Most used languages
                  </h3>
                  <LanguageBar className="mt-4" languages={data.languages} />
                </Card>
              </Reveal>
            )}

            {/* Top repositories */}
            <Reveal delay={0.05}>
              <h3 className="text-sm font-medium text-foreground">
                Top repositories
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.topRepos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            </Reveal>

            {/* Latest commits */}
            {data.recentCommits.length > 0 && (
              <Reveal delay={0.05}>
                <Card hover={false}>
                  <h3 className="text-sm font-medium text-foreground">
                    Recent activity
                  </h3>
                  <ActivityFeed className="mt-2" commits={data.recentCommits} />
                </Card>
              </Reveal>
            )}

            <Reveal delay={0.05} className="flex justify-center">
              <Button href={data.profile.htmlUrl} variant="secondary">
                <GithubIcon className="h-4 w-4" />
                View full profile
              </Button>
            </Reveal>
          </div>
        )}
      </Container>
    </section>
  );
}
