"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site.config";
import { labelClass } from "@/lib/styles";
import { cn } from "@/lib/utils";

type Phase = "loading" | "leaving" | "done";

/** How long the counter runs before the curtain lifts. */
const SHOW_MS = 1600;
/** Must match the `.fx-loader` transform transition. */
const EXIT_MS = 900;
const SESSION_KEY = "preloader-done";

/* Lets the hero's intro animation start (see `.intro-ready` in
   motion.css), timed with the curtain lifting. */
function releaseIntro() {
  document.documentElement.classList.add("intro-ready");
}

function alreadyShown() {
  try {
    return sessionStorage.getItem(SESSION_KEY) !== null;
  } catch {
    return false;
  }
}

function markShown() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* Storage unavailable (private mode): show it again next time. */
  }
}

/**
 * Branded loader shown once per session: a 0→100% counter (pure CSS)
 * and a curtain that lifts to reveal the hero. Repeat visits and
 * reduced-motion users skip it.
 */
export function Preloader() {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (alreadyShown() || reduceMotion) {
      const skip = setTimeout(() => {
        releaseIntro();
        setPhase("done");
      }, 0);
      return () => clearTimeout(skip);
    }

    const leave = setTimeout(() => {
      releaseIntro();
      markShown();
      setPhase("leaving");
    }, SHOW_MS);
    const done = setTimeout(() => setPhase("done"), SHOW_MS + EXIT_MS);
    return () => {
      clearTimeout(leave);
      clearTimeout(done);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={cn("fx-loader", phase === "leaving" && "is-leaving")}
      aria-hidden="true"
    >
      <div className="flex h-full max-h-[56rem] flex-col justify-between p-6 md:p-14">
        <div className={cn(labelClass, "flex justify-between gap-4")}>
          <span>Compiling portfolio</span>
          <span>{siteConfig.city}</span>
        </div>

        <p className="text-center font-mono text-3xl font-medium text-foreground md:text-4xl">
          &lt;{siteConfig.initials}
          <span className="text-accent">/</span>&gt;
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex items-end justify-between gap-4">
            <span className={labelClass}>
              {siteConfig.role} — Rev. {new Date().getFullYear()}
            </span>
            <span className="fx-loader-pct text-[clamp(3.5rem,10vw,8.75rem)] font-semibold leading-[0.85] tracking-[-0.04em] text-foreground" />
          </div>
          <div className="h-px bg-border">
            <div className="fx-loader-bar h-px bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}
