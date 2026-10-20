import { labelClass, cssVars } from "@/lib/styles";
import { cn } from "@/lib/utils";

interface SectionHeadProps {
  /** Two-digit section number, e.g. "01". */
  index: string;
  title: string;
  /** Optional note on the right side of the rule. */
  aside?: string;
  id?: string;
}

/**
 * Technical section header: a hairline rule with an accent marker
 * that draws in on scroll, the numbered section title on the left
 * and a short annotation on the right.
 */
export function SectionHead({ index, title, aside, id }: SectionHeadProps) {
  return (
    <div className="fx-sec-head">
      <h2
        id={id}
        className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-foreground"
      >
        [{index}] {title}
      </h2>
      {aside && <span className={labelClass}>{aside}</span>}
    </div>
  );
}

interface DisplayHeadingProps {
  /** Each entry is one masked line; `muted` dims it. */
  lines: { text: string; muted?: boolean }[];
  className?: string;
  children?: React.ReactNode;
}

/**
 * Oversized display text whose lines rise out of a mask as the
 * section scrolls in. Decorative: the real heading is the
 * SectionHead `h2`.
 */
export function DisplayHeading({
  lines,
  className,
  children,
}: DisplayHeadingProps) {
  return (
    <p
      className={cn(
        "text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-foreground",
        className
      )}
    >
      {lines.map((line, index) => (
        <span key={line.text} className="fx-sline">
          <span
            style={cssVars({ "--d": index })}
            className={line.muted ? "text-muted" : undefined}
          >
            {line.text}
            {index === lines.length - 1 && children}
          </span>
        </span>
      ))}
    </p>
  );
}
