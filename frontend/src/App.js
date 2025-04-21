import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useTheme } from "./utils/theme";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import NumberHeatGenerator from "./pages/NumberHeatGenerator/NumberHeatGenerator";
import TimeHeatMapGenerator from "./pages/TimeHeatMapGenerator/TimeHeatMapGenerator";
import RangeHeatmapGenerator from "./pages/RangeHeatmapGenerator/RangeHeatmapGenerator";
import { useConfigurations } from "./hooks/useConfigurations";
import { routes } from "./utils/routes";

function App() {
  const { theme, darkMode, toggleDarkMode } = useTheme();
  const {
    configurations,
    loading,
    currentHeatmapType,
    setCurrentHeatmapType,
    snackbar,
    handleCloseSnackbar,
    updateConfiguration,
  } = useConfigurations();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          currentHeatmapType={currentHeatmapType}
        >
          <Routes>
            <Route
              path={routes.home}
              element={
                <HomePage
                  configurations={configurations}
                  loading={loading}
                  updateConfiguration={updateConfiguration}
                  setCurrentHeatmapType={setCurrentHeatmapType}
                />
              }
            />
            <Route
              path={routes.numberHeatmap}
              element={<NumberHeatGenerator />}
            />
            <Route
              path={routes.timeHeatmap}
              element={<TimeHeatMapGenerator />}
            />
            <Route
              path={routes.rangeHeatmap}
              element={<RangeHeatmapGenerator />}
            />
          </Routes>
          {snackbar.component(handleCloseSnackbar)}
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
