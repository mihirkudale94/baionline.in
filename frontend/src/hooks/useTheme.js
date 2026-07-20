import { useEffect, useState } from "react";

const STORAGE_KEY = "bai-theme";

function getInitialTheme() {
  const stored = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return null; // no explicit choice — follow system preference
}

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem(STORAGE_KEY, theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [theme]);

  const isDark = () => {
    if (theme) return theme === "dark";
    return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const toggleTheme = () => setTheme(isDark() ? "light" : "dark");

  return { theme, isDark: isDark(), toggleTheme };
}
