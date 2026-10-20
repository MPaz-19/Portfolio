import { Fragment } from "react";
import { techStack } from "@/content/tech-stack";

const names = techStack.flatMap((category) =>
  category.items.map((item) => item.name)
);

function Group() {
  return (
    <div className="fx-marquee-group">
      {names.map((name, index) => (
        <Fragment key={name}>
          <span className={index % 2 === 1 ? "fx-outline" : undefined}>
            {name}
          </span>
          <span className="fx-sep" />
        </Fragment>
      ))}
    </div>
  );
}

/**
 * Infinite strip of the whole stack between the hero and About.
 * Decorative (the Tech Stack section lists the same items), so it is
 * hidden from assistive tech. Pauses on hover; static with reduced
 * motion.
 */
export function TechMarquee() {
  return (
    <div
      aria-hidden="true"
      className="fx-marquee border-y border-border py-6 text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em] text-foreground"
    >
      <div className="fx-marquee-track">
        <Group />
        <Group />
      </div>
    </div>
  );
}
