/** GitHub-style colors for common languages (fallback: neutral gray). */
export const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C#": "#178600",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00add8",
  Rust: "#dea584",
  PHP: "#4f5d95",
  Ruby: "#701516",
  Kotlin: "#a97bff",
  Swift: "#f05138",
  Shell: "#89e051",
  Vue: "#41b883",
  Dart: "#00b4ab",
  SCSS: "#c6538c",
  Dockerfile: "#384d54",
};

export function getLanguageColor(language: string): string {
  return languageColors[language] ?? "#8b8b93";
}
