"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown, FileDown, Mail } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/* Staggered entrance for the hero content. */
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const socialLinks = [
  { label: "GitHub", href: siteConfig.links.github, icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: LinkedinIcon },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      {/* Decorative background: soft accent glow + dot grid. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10%] h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_65%_60%_at_50%_40%,black,transparent)]" />
      </div>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          {/* Avatar with gradient ring */}
          <motion.div variants={itemVariants}>
            <div className="rounded-full bg-gradient-accent p-[3px] shadow-xl shadow-accent/20">
              <Image
                src="/images/avatar.jpg"
                alt={`${siteConfig.name} — profile photo`}
                width={112}
                height={112}
                priority
                className="rounded-full object-cover"
              />
            </div>
          </motion.div>

          {/* Availability badge */}
          {siteConfig.availability && (
            <motion.div
              variants={itemVariants}
              className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {siteConfig.availability}
            </motion.div>
          )}

          <motion.h1
            variants={itemVariants}
            className="mt-6 text-5xl font-semibold tracking-tight text-foreground md:text-7xl"
          >
            Hi, I&apos;m <span className="text-gradient">{siteConfig.name}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 font-mono text-sm font-medium text-accent md:text-base"
          >
            {siteConfig.role}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
          >
            {siteConfig.tagline}
          </motion.p>

          {/* Primary calls to action */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Button href="/#projects" size="lg">
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href={siteConfig.resumeUrl}
              download
              variant="secondary"
              size="lg"
            >
              <FileDown className="h-4 w-4 text-accent" />
              Download CV
            </Button>
            <Button href="/#contact" variant="ghost" size="lg">
              <Mail className="h-4 w-4" />
              Contact me
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants} className="mt-10 flex gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.a
        href="/#about"
        aria-label="Scroll to the About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-subtle transition-colors hover:text-accent"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
