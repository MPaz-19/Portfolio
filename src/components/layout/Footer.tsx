import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/ui/Container";
import { LocalTime } from "@/components/ui/LocalTime";
import { labelClass } from "@/lib/styles";
import { cn } from "@/lib/utils";

/** Minimal technical footer: credits, local time and back to top. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <div
          className={cn(
            labelClass,
            "flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border pb-8 pt-5"
          )}
        >
          <p>
            © {year} {siteConfig.name}
          </p>
          <p>
            Designed &amp; built in {siteConfig.city.split(",")[0]} —{" "}
            <LocalTime /> {siteConfig.utcOffset}
          </p>
          <Link href="/#" className="fx-link text-foreground/80">
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </footer>
  );
}
