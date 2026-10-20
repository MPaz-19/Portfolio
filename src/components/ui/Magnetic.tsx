"use client";

import Link from "next/link";
import type { PointerEvent, ReactNode } from "react";

const PULL_X = 0.28;
const PULL_Y = 0.4;

/**
 * Pointer handlers that pull an element toward the cursor through
 * the `--mx` / `--my` custom properties read by `.fx-btn`. The CSS
 * transition smooths the motion; reduced motion disables it in CSS.
 */
export function useMagnetic<T extends HTMLElement>() {
  const onPointerMove = (event: PointerEvent<T>) => {
    if (event.pointerType !== "mouse") return;
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * PULL_X;
    const y = (event.clientY - rect.top - rect.height / 2) * PULL_Y;
    element.style.setProperty("--mx", `${x.toFixed(1)}px`);
    element.style.setProperty("--my", `${y.toFixed(1)}px`);
  };

  const onPointerLeave = (event: PointerEvent<T>) => {
    event.currentTarget.style.setProperty("--mx", "0px");
    event.currentTarget.style.setProperty("--my", "0px");
  };

  return { onPointerMove, onPointerLeave };
}

interface MagneticLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

/** Internal link with the magnetic pull (used for primary CTAs). */
export function MagneticLink({ href, className, children }: MagneticLinkProps) {
  const magnetic = useMagnetic<HTMLAnchorElement>();
  return (
    <Link href={href} className={className} {...magnetic}>
      {children}
    </Link>
  );
}
