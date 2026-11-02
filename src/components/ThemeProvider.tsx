import { ThemeProviderContext, type Theme } from "./theme-context";
import React, { createContext, useContext, useEffect, useState } from "react";



type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};





export function ThemeProvider({
  children,
  defaultTheme,
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const getSystemTheme = (): Theme => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme || getSystemTheme();
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const value = {
    theme,
    setTheme
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
