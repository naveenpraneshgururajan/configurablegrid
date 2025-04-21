import { useState, useMemo } from "react";
import { createTheme } from "@mui/material";

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: "#3a80c1",
          },
          secondary: {
            main: "#5f9ee9",
          },
          background: {
            default: darkMode ? "#171c26" : "#f0f4f8",
            paper: darkMode ? "#1e2532" : "#ffffff",
          },
          text: {
            primary: darkMode ? "#e1e6ef" : "#2d3748",
            secondary: darkMode ? "#bfd0e6" : "#4a5568",
          },
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return { theme, darkMode, toggleDarkMode };
};

export default useTheme;
