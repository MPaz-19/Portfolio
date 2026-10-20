import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { getGitHubData } from "@/lib/github";
import { labelClass } from "@/lib/styles";
import { cn } from "@/lib/utils";

/* Accent for the top language, then fading neutrals. */
const shades = [
  "var(--accent)",
  "color-mix(in oklab, var(--foreground) 75%, transparent)",
  "color-mix(in oklab, var(--foreground) 45%, transparent)",
  "color-mix(in oklab, var(--foreground) 25%, transparent)",
];

/**
 * Compact, live GitHub summary under the project list (server
 * component: data is fetched and cached by `getGitHubData`). Falls
 * back to a plain profile link when the API is unavailable.
 */
export async function GitHubStrip() {
  const data = await getGitHubData();
  const languages = data?.languages.slice(0, shades.length) ?? [];
  const profileUrl = data?.profile.htmlUrl ?? siteConfig.links.github;

  return (
    <div className="fx-gh fx-reveal grid items-center gap-x-12 gap-y-6 border border-border p-7 md:grid-cols-[1fr_1fr_auto]">
      <div className="flex flex-col gap-1.5">
        <span className={labelClass}>[GitHub] Open source &amp; activity</span>
        <span className="text-lg text-foreground">
          {data
            ? `${data.profile.publicRepos} public repositories${
                languages.length
                  ? `, mostly ${languages
                      .slice(0, 2)
                      .map((language) => language.name)
                      .join(" and ")}`
                  : ""
              }.`
            : "Follow what I'm building on GitHub."}
        </span>
      </div>

      {languages.length > 0 ? (
        <div className="flex flex-col gap-2.5">
          <div className="flex h-1.5 gap-[3px]" aria-hidden="true">
            {languages.map((language, index) => (
              <span
                key={language.name}
                className="fx-lb block h-full"
                style={{
                  flexGrow: language.percent,
                  flexBasis: 0,
                  background: shades[index],
                }}
              />
            ))}
          </div>
          <ul className="flex flex-wrap justify-between gap-x-4 gap-y-1 font-mono text-xs text-muted">
            {languages.map((language) => (
              <li key={language.name}>
                {language.name} {language.percent}%
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div />
      )}

      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("fx-link md:justify-self-end")}
      >
        <span>View full profile</span>
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}
