"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// Adds/removes the "dark" class on <html>: follows the OS setting by default,
// remembers the user's choice, and avoids a flash of the wrong theme on load.
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
