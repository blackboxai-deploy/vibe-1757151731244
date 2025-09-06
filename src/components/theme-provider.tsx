"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

interface ExtendedThemeProviderProps extends ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children, ...props }: ExtendedThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      {...props}
    >
      <ThemeTransition>{children}</ThemeTransition>
    </NextThemesProvider>
  );
}

function ThemeTransition({ children }: { children: React.ReactNode }) {
  return (
    <div className="transition-colors duration-300 ease-in-out">
      {children}
    </div>
  );
}