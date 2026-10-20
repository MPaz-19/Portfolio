"use client";

import { useEffect, useRef } from "react";

const EASE = 0.2;
const INTERACTIVE = "[data-cursor], a, button, input, textarea, select, label";

/**
 * Ring that trails the mouse and reacts to what it hovers:
 * grows over links and buttons, turns into a "View" disc over
 * elements marked `data-cursor="view"` and hides over text fields.
 * The native cursor stays visible. Mouse-only; hidden on touch
 * devices and with reduced motion (see `.fx-cursor` in motion.css).
 */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = ref.current;
    if (!cursor) return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canHover.matches || reduce.matches) return;

    let x = -100;
    let y = -100;
    let targetX = -100;
    let targetY = -100;
    let frame = 0;

    const loop = () => {
      const dx = targetX - x;
      const dy = targetY - y;
      x += dx * EASE;
      y += dy * EASE;
      cursor.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      frame =
        Math.abs(dx) + Math.abs(dy) > 0.2 ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (cursor.dataset.visible !== "1") {
        x = targetX;
        y = targetY;
        cursor.dataset.visible = "1";
      }
      if (!frame) frame = requestAnimationFrame(loop);
    };

    const onOver = (event: PointerEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest(INTERACTIVE)
          : null;
      let state = "";
      if (target) {
        state =
          target.getAttribute("data-cursor") ??
          (target.matches("input, textarea, select") ? "hide" : "link");
      }
      if (cursor.dataset.state !== state) cursor.dataset.state = state;
    };

    const onLeave = () => {
      cursor.dataset.visible = "0";
    };

    const root = document.documentElement;
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    root.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="fx-cursor" aria-hidden="true">
      <div className="fx-cursor-ring">
        <span className="fx-cursor-label">View</span>
      </div>
    </div>
  );
}
