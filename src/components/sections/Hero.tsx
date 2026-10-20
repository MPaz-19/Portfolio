import { ArrowDown, FileDown } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { LocalTime } from "@/components/ui/LocalTime";
import { MagneticLink } from "@/components/ui/Magnetic";
import { cssVars, labelClass } from "@/lib/styles";
import { cn } from "@/lib/utils";

/**
 * Editorial hero: technical meta row, oversized name whose lines rise
 * out of a mask once the preloader lifts, and the primary actions.
 */
export function Hero() {
  const [firstName, ...rest] = siteConfig.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col pb-10 pt-24"
    >
      <div aria-hidden="true" className="fx-hero-grid" />

      <Container className="relative flex flex-1 flex-col justify-between gap-12">
        {/* Meta row */}
        <div
          className={cn(
            labelClass,
            "fx-intro grid gap-x-6 gap-y-3 sm:grid-cols-3"
          )}
          style={cssVars({ "--d": 0 })}
        >
          <span>[00] Index</span>
          {siteConfig.availability ? (
            <span className="inline-flex items-center gap-2.5 text-foreground">
              <span className="fx-pulse" />
              {siteConfig.availability}
            </span>
          ) : (
            <span />
          )}
          <span className="sm:text-right">
            {siteConfig.city} — <LocalTime /> {siteConfig.utcOffset}
          </span>
        </div>

        {/* Name */}
        <div className="relative">
          <h1
            id="hero-title"
            className="text-[clamp(4rem,15vw,13rem)] font-semibold leading-[0.86] tracking-[-0.055em] text-foreground"
          >
            <span className="fx-line">
              <span style={cssVars({ "--d": 1 })}>{firstName}</span>
            </span>
            {lastName && (
              <span className="fx-line md:pl-[24%]">
                <span style={cssVars({ "--d": 2 })}>
                  {lastName}
                  <span className="text-accent">.</span>
                </span>
              </span>
            )}
          </h1>
          <p
            className={cn(
              labelClass,
              "fx-intro mt-5 max-w-[30ch] leading-relaxed md:absolute md:bottom-[12%] md:left-0 md:mt-0"
            )}
            style={cssVars({ "--d": 3 })}
          >
            Fig. 01 — {siteConfig.role}
            <br />
            Full-stack · Interfaces &amp; APIs
          </p>
        </div>

        {/* Tagline + actions */}
        <div className="grid items-end gap-x-16 gap-y-8 lg:grid-cols-2">
          <p
            className="fx-intro max-w-[36ch] text-lg leading-relaxed text-muted md:text-xl"
            style={cssVars({ "--d": 3 })}
          >
            {siteConfig.tagline}
          </p>
          <div
            className="fx-intro flex flex-wrap items-center gap-x-4 gap-y-3 lg:justify-end"
            style={cssVars({ "--d": 4 })}
          >
            <MagneticLink href="/#projects" className="fx-btn">
              View projects
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </MagneticLink>
            <a href={siteConfig.resumeUrl} download className="fx-btn-ghost">
              <FileDown className="h-4 w-4 text-accent" aria-hidden="true" />
              Download CV
            </a>
            <Link href="/#contact" className="fx-link">
              <span>Contact me</span>
            </Link>
          </div>
        </div>

        {/* Bottom rule */}
        <div
          className={cn(
            labelClass,
            "fx-intro flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-border pt-5"
          )}
          style={cssVars({ "--d": 5 })}
        >
          <Link
            href="/#about"
            className="inline-flex min-h-11 items-center gap-3.5 transition-colors hover:text-accent"
          >
            Scroll <span className="fx-cue" aria-hidden="true" />
          </Link>
          <span>{siteConfig.coordinates}</span>
          <span>Fast · Accessible · Tested</span>
        </div>
      </Container>
    </section>
  );
}
