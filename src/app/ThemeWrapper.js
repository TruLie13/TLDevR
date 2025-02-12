"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createContext, useContext, useState, useEffect } from "react";
import { darkTheme, neoTheme } from "@/theme.js";

// Create context for theme switching
export const ThemeContext = createContext(null);

// Custom hook for using theme
export const useTheme = () => useContext(ThemeContext);

export default function ClientThemeWrapper({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme-preference") || "dark";
    }
    return "dark"; // Default fallback
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme-preference");
      if (savedTheme) {
        setCurrentTheme(savedTheme);
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = currentTheme === "dark" ? "neo" : "dark";
    setCurrentTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme-preference", newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      <ThemeProvider theme={currentTheme === "dark" ? darkTheme : neoTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
