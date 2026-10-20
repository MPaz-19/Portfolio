import { techStack } from "@/content/tech-stack";
import { Container } from "@/components/ui/Container";
import { DisplayHeading, SectionHead } from "@/components/ui/SectionHead";
import { cssVars, labelClass } from "@/lib/styles";

const total = techStack.reduce(
  (sum, category) => sum + category.items.length,
  0
);

export function TechStack() {
  return (
    <section id="tech" aria-labelledby="tech-title" className="pb-24 md:pb-32">
      <Container className="flex flex-col gap-12 md:gap-20">
        <SectionHead
          id="tech-title"
          index="02"
          title="Tech stack"
          aside={`${total} technologies · ${techStack.length} layers`}
        />

        <div className="grid items-end gap-x-20 gap-y-6 lg:grid-cols-2">
          <DisplayHeading
            lines={[
              { text: "Technologies" },
              { text: "I work with.", muted: true },
            ]}
          />
          <p className="fx-reveal max-w-[44ch] text-[1.0625rem] leading-relaxed text-muted">
            The tools I reach for to build reliable products — organized by
            where they live in the stack.
          </p>
        </div>

        <div className="fx-stack-cols grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((category, index) => (
            <div
              key={category.title}
              className="fx-stack-col"
              style={cssVars({ "--d": index })}
            >
              <div className="flex items-start justify-between gap-3 border-b border-border-strong pb-5">
                <div className="flex flex-col gap-2.5">
                  <span
                    aria-hidden="true"
                    className="fx-count text-[clamp(3.5rem,6vw,5.25rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-foreground"
                    style={cssVars({ "--to": category.items.length })}
                  />
                  <h3 className="text-lg font-medium text-foreground">
                    {category.title}
                    <span className="sr-only">
                      {" "}
                      — {category.items.length} technologies
                    </span>
                  </h3>
                </div>
                <span className={labelClass}>
                  [{String(index + 1).padStart(2, "0")}]
                </span>
              </div>

              <ul>
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className="fx-stack-item flex items-center gap-3 border-b border-border py-3 text-[0.9375rem] text-muted"
                    style={cssVars({ "--dot": item.color })}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
