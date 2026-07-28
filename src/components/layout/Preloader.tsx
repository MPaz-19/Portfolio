"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site.config";

/**
 * Minimal branded loader shown once per session on first visit.
 * Kept intentionally short (~1s) so it never hurts perceived
 * performance; repeat visits skip it via sessionStorage.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Repeat visits in the same session skip straight to the fade-out.
    const alreadyShown = sessionStorage.getItem("preloader-done") !== null;
    const timer = setTimeout(
      () => {
        setVisible(false);
        sessionStorage.setItem("preloader-done", "1");
      },
      alreadyShown ? 0 : 1100
    );
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-background"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex flex-col items-center gap-5"
          >
            <span className="font-mono text-3xl font-semibold text-foreground">
              <span className="text-accent">&lt;</span>
              <span className="text-gradient">{siteConfig.initials}</span>
              <span className="text-accent">/&gt;</span>
            </span>
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="h-0.5 rounded-full bg-gradient-accent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
