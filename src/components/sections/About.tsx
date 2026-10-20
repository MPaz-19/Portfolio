import {
  aboutHighlights,
  aboutParagraphs,
  aboutStatement,
} from "@/content/about";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { cssVars, labelClass } from "@/lib/styles";
import { cn } from "@/lib/utils";

/* Flatten the statement into words, keeping each word's accent flag. */
const words = aboutStatement.flatMap((segment) =>
  segment.text.split(" ").map((word) => ({ word, accent: segment.accent }))
);
/* Spread the reveal over ~40% of the paragraph's scroll range. */
const step = `${(40 / words.length).toFixed(2)}%`;

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="py-24 md:py-32"
    >
      <Container className="flex flex-col gap-14 md:gap-24">
        <SectionHead
          id="about-title"
          index="01"
          title="About"
          aside="Beyond the stack"
        />

        {/* Statement, lit word by word on scroll */}
        <p
          className="fx-words text-[clamp(1.875rem,4.3vw,3.875rem)] font-medium leading-[1.12] tracking-[-0.03em] text-foreground"
          style={cssVars({ "--step": step })}
        >
          {words.map(({ word, accent }, index) => (
            <span key={index}>
              <span
                className={cn("fx-w", accent && "is-accent")}
                style={cssVars({ "--i": index })}
              >
                {word}
              </span>{" "}
            </span>
          ))}
        </p>

        <div className="grid items-start gap-x-20 gap-y-14 lg:grid-cols-2">
          {/* Story */}
          <div className="fx-reveal flex max-w-[58ch] flex-col gap-5 text-[1.0625rem] leading-relaxed text-muted">
            <p className={labelClass}>How I work</p>
            {aboutParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === aboutParagraphs.length - 1
                    ? "text-foreground"
                    : undefined
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Principles */}
          <ul className="fx-cells">
            {aboutHighlights.map((highlight, index) => (
              <li
                key={highlight.title}
                className="fx-cell"
                style={cssVars({ "--d": index })}
              >
                <span className="font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 text-[1.375rem] font-medium leading-tight tracking-[-0.02em] text-foreground">
                  {highlight.title}
                </h3>
                <p className="text-[0.9375rem] leading-relaxed text-muted">
                  {highlight.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
