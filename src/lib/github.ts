import { siteConfig } from "@/config/site.config";
import type {
  GitHubCommit,
  GitHubData,
  GitHubLanguage,
  GitHubProfile,
  GitHubRepo,
} from "@/types";

/* ────────────────────────────────────────────────────────────
 * GitHub REST API integration (server-side only).
 *
 * - Responses are cached for 1 hour (`revalidate`), which keeps
 *   the site well under the unauthenticated rate limit.
 * - An optional GITHUB_TOKEN env var raises the rate limit and
 *   is never exposed to the client.
 * - Every failure path returns `null` so the UI can render a
 *   graceful fallback instead of breaking the page.
 * ──────────────────────────────────────────────────────────── */

const API_BASE = "https://api.github.com";
const REVALIDATE_SECONDS = 3600;

/* Raw response shapes (only the fields we consume). */
interface RawProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  followers: number;
  public_repos: number;
}

interface RawRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
  fork: boolean;
  topics?: string[];
}

interface RawPushEvent {
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    commits?: Array<{ sha: string; message: string }>;
  };
}

function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function githubFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: buildHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function normalizeProfile(raw: RawProfile): GitHubProfile {
  return {
    login: raw.login,
    name: raw.name ?? raw.login,
    avatarUrl: raw.avatar_url,
    htmlUrl: raw.html_url,
    bio: raw.bio,
    followers: raw.followers,
    publicRepos: raw.public_repos,
  };
}

function normalizeRepos(raw: RawRepo[]): GitHubRepo[] {
  return raw
    .filter((repo) => !repo.fork)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      htmlUrl: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      updatedAt: repo.pushed_at,
      topics: repo.topics ?? [],
    }));
}

/** Aggregates the primary language of each repo into percentages. */
function aggregateLanguages(repos: GitHubRepo[]): GitHubLanguage[] {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    if (!repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }
  const total = [...counts.values()].reduce((sum, n) => sum + n, 0);
  if (total === 0) return [];
  return [...counts.entries()]
    .map(([name, count]) => ({
      name,
      percent: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 6);
}

/** Extracts the latest commits from public push events. */
function extractRecentCommits(events: RawPushEvent[]): GitHubCommit[] {
  const commits: GitHubCommit[] = [];
  for (const event of events) {
    if (event.type !== "PushEvent") continue;
    for (const commit of event.payload.commits ?? []) {
      commits.push({
        sha: commit.sha.slice(0, 7),
        // Keep only the first line of the commit message.
        message: commit.message.split("\n")[0],
        repo: event.repo.name,
        url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
        date: event.created_at,
      });
      if (commits.length >= 5) return commits;
    }
  }
  return commits;
}

/**
 * Fetches and normalizes everything the GitHub section needs.
 * Returns `null` when the username is still the placeholder or
 * when the API is unavailable, so the section renders a fallback.
 */
const PLACEHOLDER_USERNAME: string = "your-github-username";

export async function getGitHubData(): Promise<GitHubData | null> {
  const username: string = siteConfig.githubUsername;
  if (!username || username === PLACEHOLDER_USERNAME) return null;

  const [rawProfile, rawRepos, rawEvents] = await Promise.all([
    githubFetch<RawProfile>(`/users/${username}`),
    githubFetch<RawRepo[]>(
      `/users/${username}/repos?per_page=100&sort=pushed`
    ),
    githubFetch<RawPushEvent[]>(
      `/users/${username}/events/public?per_page=30`
    ),
  ]);

  if (!rawProfile || !rawRepos) return null;

  const repos = normalizeRepos(rawRepos);
  const topRepos = [...repos]
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 6);

  return {
    profile: normalizeProfile(rawProfile),
    topRepos,
    totalStars: repos.reduce((sum, repo) => sum + repo.stars, 0),
    languages: aggregateLanguages(repos),
    recentCommits: extractRecentCommits(rawEvents ?? []),
  };
}
