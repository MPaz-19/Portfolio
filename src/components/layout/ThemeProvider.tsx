"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/** Dark mode by default, class strategy on <html>, no system sync. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
