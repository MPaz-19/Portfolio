"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FileDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site.config";
import { experience } from "@/content/experience";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

/* The Experience link only exists while there's experience to link to —
   its section hides itself when the content file is empty, and a nav item
   pointing at a missing anchor would just scroll nowhere. */
const hasExperience = experience.length > 0;

/* `index` mirrors the [NN] number on each section's header. */
const navLinks = [
  { label: "About", href: "/#about", id: "about", index: "01" },
  { label: "Stack", href: "/#tech", id: "tech", index: "02" },
  { label: "Work", href: "/#projects", id: "projects", index: "03" },
  ...(hasExperience
    ? [
        {
          label: "Experience",
          href: "/#experience",
          id: "experience",
          index: "04",
        },
      ]
    : []),
  {
    label: "Contact",
    href: "/#contact",
    id: "contact",
    index: hasExperience ? "06" : "05",
  },
];

/**
 * Fixed navbar with blur-on-scroll, scroll-spy highlighting of
 * the active section (home only), rolling link labels, a scroll
 * progress line and an animated mobile menu.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  /* Blur background once the page is scrolled; clear the active
     link when the user is back at the hero. */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (window.scrollY < 200) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll-spy: a section is "active" while it crosses the band
     between 30% and 40% from the top of the viewport. */
  useEffect(() => {
    if (pathname !== "/") return;
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  /* Close the mobile menu after navigating. */
  const closeMenu = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/#"
          onClick={closeMenu}
          className="font-mono text-sm font-semibold tracking-tight text-foreground"
          aria-label="Go to top"
        >
          &lt;{siteConfig.initials}
          <span className="text-accent">/</span>&gt;
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              aria-current={active === link.id ? "true" : undefined}
              className={cn(
                "inline-flex min-h-11 items-center gap-1.5 text-sm transition-colors duration-300",
                active === link.id ? "text-accent" : "text-foreground/80"
              )}
            >
              <span className="font-mono text-[0.6875rem] text-muted">
                {link.index}
              </span>
              <span className="fx-roll">
                <span>{link.label}</span>
                <span aria-hidden="true">{link.label}</span>
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={siteConfig.resumeUrl}
            download
            className="hidden items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent/50 md:inline-flex"
          >
            <FileDown className="h-4 w-4 text-accent" />
            Resume
          </a>
          <ThemeToggle />
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted transition-colors hover:text-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </Container>

      {/* Scroll progress (scroll-driven CSS, see motion.css) */}
      <span aria-hidden="true" className="fx-progress" />

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
            aria-label="Mobile"
          >
            <Container className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-baseline gap-3 rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
                >
                  <span className="font-mono text-[0.6875rem]">
                    {link.index}
                  </span>
                  {link.label}
                </Link>
              ))}
              <a
                href={siteConfig.resumeUrl}
                download
                onClick={closeMenu}
                className="mt-2 inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-accent"
              >
                <FileDown className="h-4 w-4" />
                Download Resume
              </a>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
