import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** When set, renders a link (internal Link or external <a>). */
  href?: string;
  /** Marks the link as a file download (e.g. the CV). */
  download?: boolean;
}

const baseStyles =
  "inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-all duration-300";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-foreground shadow-lg shadow-accent/25 hover:bg-accent-hover hover:shadow-accent/35 hover:-translate-y-0.5",
  secondary:
    "border border-border bg-card text-foreground hover:border-accent/50 hover:-translate-y-0.5",
  ghost: "text-muted hover:bg-surface hover:text-foreground",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
};

/**
 * Polymorphic button: renders a <button>, a Next <Link> or an
 * external <a> depending on `href`, with consistent styling.
 */
export function Button({
  variant = "primary",
  size = "md",
  href,
  download,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal || download) {
      return (
        <a
          href={href}
          download={download}
          className={classes}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
