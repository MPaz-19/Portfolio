import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Disable the lift/glow hover effect for static cards. */
  hover?: boolean;
}

/** Base surface card with an optional subtle hover lift. */
export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5",
        className
      )}
    >
      {children}
    </div>
  );
}
