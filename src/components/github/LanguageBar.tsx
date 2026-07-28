import { cn } from "@/lib/utils";
import type { GitHubLanguage } from "@/types";
import { getLanguageColor } from "@/components/github/language-colors";

interface LanguageBarProps {
  languages: GitHubLanguage[];
  className?: string;
}

/** Proportional, GitHub-style language distribution bar. */
export function LanguageBar({ languages, className }: LanguageBarProps) {
  return (
    <div className={cn(className)}>
      <div className="flex h-2.5 overflow-hidden rounded-full bg-surface">
        {languages.map((language) => (
          <div
            key={language.name}
            title={`${language.name} ${language.percent}%`}
            style={{
              width: `${language.percent}%`,
              backgroundColor: getLanguageColor(language.name),
            }}
          />
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {languages.map((language) => (
          <li
            key={language.name}
            className="flex items-center gap-1.5 text-xs text-muted"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: getLanguageColor(language.name) }}
            />
            {language.name}
            <span className="text-subtle">{language.percent}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
