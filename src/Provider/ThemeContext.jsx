import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme === "dark";

    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? true
      : false;
  });

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
