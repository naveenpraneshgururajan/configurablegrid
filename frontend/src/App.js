import React, { useState, useEffect } from "react";
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
              element={
                <NumberHeatGenerator
                  configuration={configurations.numberheatmap}
                  onSettingsUpdated={(newConfig) => {
                    updateConfiguration("numberheatmap", newConfig);
                  }}
                />
              }
            />
            <Route
              path={routes.timeHeatmap}
              element={
                <TimeHeatMapGenerator
                  configuration={configurations.timestamp}
                  onSettingsUpdated={(newConfig) => {
                    updateConfiguration("timestamp", newConfig);
                  }}
                />
              }
            />
            <Route
              path={routes.rangeHeatmap}
              element={
                <RangeHeatmapGenerator
                  configuration={configurations.rangeheatmap}
                  onSettingsUpdated={(newConfig) => {
                    updateConfiguration("rangeheatmap", newConfig);
                  }}
                />
              }
            />
          </Routes>

          {/* Snackbar from useConfigurations hook */}
          {snackbar.component(handleCloseSnackbar)}
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
