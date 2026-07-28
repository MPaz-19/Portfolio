"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before animating (use for stagger effects). */
  delay?: number;
  direction?: Direction;
  /** Animate only the first time the element enters the viewport. */
  once?: boolean;
}

const OFFSET = 28;

const directionOffset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: OFFSET },
  down: { y: -OFFSET },
  left: { x: OFFSET },
  right: { x: -OFFSET },
  none: {},
};

/**
 * Reusable scroll-reveal wrapper — the single source of scroll
 * animations across the site. Respects `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = reduceMotion ? {} : directionOffset[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.2, margin: "0px 0px -48px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
