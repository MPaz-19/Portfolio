import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small mono label above the title, e.g. "01 · About". */
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

/** Consistent heading block used at the top of every section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-14 max-w-2xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
