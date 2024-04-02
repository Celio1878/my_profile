"use client";

import { createContext, ReactNode, useState } from "react";

interface ThemeContextProps {
  children: ReactNode;
}

export const ThemeContext = createContext({});

export default function ThemeProvider({ children }: ThemeContextProps) {
  const local_theme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(() => {
    return local_theme || "light";
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
