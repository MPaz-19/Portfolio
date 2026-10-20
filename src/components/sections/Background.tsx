import { certifications, education } from "@/content/education";
import { skills } from "@/content/skills";
import type { CertificationKind } from "@/types";
import { Container } from "@/components/ui/Container";
import { DisplayHeading, SectionHead } from "@/components/ui/SectionHead";
import { cssVars, labelClass } from "@/lib/styles";
import { cn } from "@/lib/utils";

const kindLabel: Record<CertificationKind, string> = {
  certification: "Cert.",
  course: "Course",
  bootcamp: "Bootcamp",
};

/** Education, certifications and core strengths in one section. */
export function Background() {
  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className="pb-24 md:pb-32"
    >
      <Container className="flex flex-col gap-12 md:gap-20">
        <SectionHead
          id="education-title"
          index="04"
          title="Background"
          aside="Education & core strengths"
        />

        <div className="grid items-start gap-x-20 gap-y-14 lg:grid-cols-2">
          {/* Education & certifications */}
          <div className="flex flex-col gap-7">
            <DisplayHeading
              className="text-[clamp(2rem,3.6vw,3.25rem)]"
              lines={[{ text: "Always" }, { text: "learning.", muted: true }]}
            />
            <ol className="fx-reveal">
              {education.map((item) => (
                <li
                  key={item.institution}
                  className="grid gap-x-6 gap-y-2 border-t border-border py-7 sm:grid-cols-[8.75rem_1fr]"
                >
                  <span className={cn(labelClass, "pt-1.5")}>
                    {item.period}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-2xl font-medium leading-tight tracking-[-0.02em] text-foreground">
                      {item.degree}
                    </h3>
                    <p className="text-foreground/85">{item.institution}</p>
                    {item.description && (
                      <p className="text-[0.9375rem] leading-relaxed text-muted">
                        {item.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
              {certifications.map((item) => (
                <li
                  key={item.name}
                  className="grid gap-x-6 gap-y-2 border-t border-border py-7 sm:grid-cols-[8.75rem_1fr]"
                >
                  <span className={cn(labelClass, "pt-1.5")}>
                    {item.year} · {kindLabel[item.kind]}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-2xl font-medium leading-tight tracking-[-0.02em] text-foreground">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-accent"
                        >
                          {item.name}
                        </a>
                      ) : (
                        item.name
                      )}
                    </h3>
                    <p className="text-foreground/85">{item.issuer}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Core strengths */}
          <div className="flex flex-col gap-7">
            <p className={cn(labelClass, "pt-2")}>
              Core strengths — technical &amp; human
            </p>
            <ul className="fx-skills flex flex-col gap-[1.375rem]">
              {skills.map((skill, index) => (
                <li key={skill.name} style={cssVars({ "--d": index })}>
                  <div className="flex items-baseline justify-between gap-4 text-[0.9375rem] text-foreground/85">
                    <span>{skill.name}</span>
                    <span
                      aria-hidden="true"
                      className="fx-count is-pct font-mono text-[0.8125rem] text-muted"
                      style={cssVars({ "--to": skill.level })}
                    />
                    <span className="sr-only">{skill.level}%</span>
                  </div>
                  <div className="mt-3 h-0.5 bg-border">
                    <div
                      className="fx-bar h-full bg-accent"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
