"use client";

import { motion } from "framer-motion";
import { FolderKanban, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-gradient font-mono text-8xl font-bold md:text-9xl"
      >
        404
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-6 text-2xl font-semibold text-foreground md:text-3xl"
      >
        Page not found
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-3 max-w-md text-muted"
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="mt-8 flex flex-wrap justify-center gap-4"
      >
        <Button href="/">
          <Home className="h-4 w-4" />
          Back home
        </Button>
        <Button href="/#projects" variant="secondary">
          <FolderKanban className="h-4 w-4" />
          View projects
        </Button>
      </motion.div>
    </div>
  );
}
