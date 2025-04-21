import React, { useState, useRef } from "react";
import { Box, Typography, Paper, Tabs, Tab, Button } from "@mui/material";
import HeatmapCard from "../components/ui/HeatmapCard";
import { routes } from "../utils/routes";
import NumberHeatmapSettings from "./settings/NumberHeatmapSettings";
import TimeHeatmapSettings from "./settings/TimeHeatmapSettings";
import RangeHeatmapSettings from "./settings/RangeHeatmapSettings";

// Material UI Icons
import NumbersIcon from "@mui/icons-material/Numbers";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BarChartIcon from "@mui/icons-material/BarChart";

const HomePage = ({ configurations, loading, updateConfiguration }) => {
  const [activeTab, setActiveTab] = useState("number");

  // Refs to store form values
  const formValues = useRef({
    number: {},
    time: {},
    range: {},
  });

  // Handler for form field changes
  const handleFieldChange = (tabId, fieldId, value) => {
    formValues.current[tabId] = {
      ...formValues.current[tabId],
      [fieldId]: value,
    };
  };

  const handleUpdateConfig = async () => {
    try {
      let updates = [];
      let type = null;
      if (activeTab === "number") {
        type = "numberheatmap";

        // Number heatmap update
        const salesMinEl = document.querySelector("#sales-min");
        const salesMaxEl = document.querySelector("#sales-max");
        const revenueMinEl = document.querySelector("#revenue-min");
        const revenueMaxEl = document.querySelector("#revenue-max");
        const profitMinEl = document.querySelector("#profit-min");
        const profitMaxEl = document.querySelector("#profit-max");

        if (salesMinEl && salesMaxEl) {
          updates.push({
            field: "sales",
            min: parseFloat(salesMinEl.value),
            max: parseFloat(salesMaxEl.value),
          });
        }

        if (revenueMinEl && revenueMaxEl) {
          updates.push({
            field: "revenue",
            min: parseFloat(revenueMinEl.value),
            max: parseFloat(revenueMaxEl.value),
          });
        }

        if (profitMinEl && profitMaxEl) {
          updates.push({
            field: "profit",
            min: parseFloat(profitMinEl.value),
            max: parseFloat(profitMaxEl.value),
          });
        }
      } else if (activeTab === "time") {
        type = "timestamp";
        // Time heatmap update
        const ageMinEl = document.querySelector("#age-min");
        const ageMaxEl = document.querySelector("#age-max");
        const invertEl = document.querySelector("#invert-color");

        if (ageMinEl && ageMaxEl) {
          updates.push({
            field: "age",
            min: parseFloat(ageMinEl.value),
            max: parseFloat(ageMaxEl.value),
            invertColor: invertEl ? invertEl.value : "true",
          });
        }
      } else if (activeTab === "range") {
        type = "rangeheatmap";
        // Range heatmap update - CPU
        const cpuLowMinEl = document.querySelector("#cpu-low-min");
        const cpuLowMaxEl = document.querySelector("#cpu-low-max");
        const cpuMedMinEl = document.querySelector("#cpu-med-min");
        const cpuMedMaxEl = document.querySelector("#cpu-med-max");
        const cpuHighMinEl = document.querySelector("#cpu-high-min");
        const cpuHighMaxEl = document.querySelector("#cpu-high-max");

        // Get color inputs
        const cpuLowColorEl = document.querySelector("#cpu-low-color");
        const cpuMedColorEl = document.querySelector("#cpu-med-color");
        const cpuHighColorEl = document.querySelector("#cpu-high-color");

        if (
          cpuLowMinEl &&
          cpuLowMaxEl &&
          cpuMedMinEl &&
          cpuMedMaxEl &&
          cpuHighMinEl &&
          cpuHighMaxEl
        ) {
          const cpuRanges = [
            {
              min: parseFloat(cpuLowMinEl.value),
              max: parseFloat(cpuLowMaxEl.value),
              style: {
                color: cpuLowColorEl ? cpuLowColorEl.value : "#008000",
              },
            },
            {
              min: parseFloat(cpuMedMinEl.value),
              max: parseFloat(cpuMedMaxEl.value),
              style: {
                color: cpuMedColorEl ? cpuMedColorEl.value : "#FFA500",
              },
            },
            {
              min: parseFloat(cpuHighMinEl.value),
              max: parseFloat(cpuHighMaxEl.value),
              style: {
                color: cpuHighColorEl ? cpuHighColorEl.value : "#FF0000",
                fontWeight: "bold",
              },
            },
          ];

          updates.push({
            field: "cpu",
            ranges: cpuRanges,
          });
        }

        // Memory settings
        const memLowMinEl = document.querySelector("#mem-low-min");
        const memLowMaxEl = document.querySelector("#mem-low-max");
        const memMedMinEl = document.querySelector("#mem-med-min");
        const memMedMaxEl = document.querySelector("#mem-med-max");
        const memHighMinEl = document.querySelector("#mem-high-min");
        const memHighMaxEl = document.querySelector("#mem-high-max");

        // Get color inputs
        const memLowColorEl = document.querySelector("#mem-low-color");
        const memMedColorEl = document.querySelector("#mem-med-color");
        const memHighColorEl = document.querySelector("#mem-high-color");

        if (
          memLowMinEl &&
          memLowMaxEl &&
          memMedMinEl &&
          memMedMaxEl &&
          memHighMinEl &&
          memHighMaxEl
        ) {
          const memRanges = [
            {
              min: parseFloat(memLowMinEl.value),
              max: parseFloat(memLowMaxEl.value),
              style: {
                color: memLowColorEl ? memLowColorEl.value : "#008000",
              },
            },
            {
              min: parseFloat(memMedMinEl.value),
              max: parseFloat(memMedMaxEl.value),
              style: {
                color: memMedColorEl ? memMedColorEl.value : "#FFA500",
              },
            },
            {
              min: parseFloat(memHighMinEl.value),
              max: parseFloat(memHighMaxEl.value),
              style: {
                color: memHighColorEl ? memHighColorEl.value : "#FF0000",
                fontWeight: "bold",
              },
            },
          ];

          updates.push({
            field: "memory",
            ranges: memRanges,
          });
        }
      }

      if (updates.length > 0) {
        const result = await updateConfiguration(type, updates);
      }
    } catch (error) {
      console.error("Error updating configuration:", error);
    } finally {
    }
  };

  // Create change handlers for each settings component
  const handleNumberSettingsChange = (e) => {
    if (e && e.target) {
      const { id, value } = e.target;
      handleFieldChange("number", id, value);
    }
  };

  const handleTimeSettingsChange = (e) => {
    if (e && e.target) {
      const { id, value } = e.target;
      handleFieldChange("time", id, value);
    }
  };

  const handleRangeSettingsChange = (e) => {
    if (e && e.target) {
      const { id, value } = e.target;
      handleFieldChange("range", id, value);
    }
  };

  return (
    <Box>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Heatmap Generator
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Shows Different varieties how Heatmaps can be plotted
        </Typography>
      </Box>

      {/* Card Layout - Fixed for horizontal display */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 3,
          mb: 4,
          flexWrap: { xs: "wrap", md: "nowrap" },
        }}
      >
        {/* Number Heatmap Card */}
        <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "0" } }}>
          <HeatmapCard
            title="Number Heatmaps"
            description="Displays Heatmap based on inidividual Cell values for Sales/Revenue and Profit Margins."
            icon={<NumbersIcon fontSize="medium" />}
            linkTo={routes.numberHeatmap}
          />
        </Box>

        {/* Time Heatmap Card */}
        <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "0" } }}>
          <HeatmapCard
            title="Time Heatmaps"
            description="Utilises a single Cell value and highlights the entire row of data."
            icon={<AccessTimeIcon fontSize="medium" />}
            linkTo={routes.timeHeatmap}
          />
        </Box>

        {/* Range Heatmap Card */}
        <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "0" } }}>
          <HeatmapCard
            title="Range Heatmaps"
            description="Highlights the inidividual test within the Cells to differentiate the values."
            icon={<BarChartIcon fontSize="medium" />}
            linkTo={routes.rangeHeatmap}
          />
        </Box>
      </Box>

      {/* Configuration Section */}
      <Paper elevation={2} sx={{ mt: 4, p: 3, borderRadius: 2 }}>
        <Typography variant="h5" color="primary" gutterBottom>
          Configure Heatmap Settings
        </Typography>

        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
        >
          <Tab value="number" label="Number Heatmap" />
          <Tab value="time" label="Time Heatmap" />
          <Tab value="range" label="Range Heatmap" />
        </Tabs>

        {loading ? (
          <Typography>Loading configuration...</Typography>
        ) : (
          <>
            {activeTab === "number" && (
              <NumberHeatmapSettings
                configuration={configurations.numberheatmap}
                onChange={handleNumberSettingsChange}
              />
            )}

            {activeTab === "time" && (
              <TimeHeatmapSettings
                configuration={configurations.timestamp}
                onChange={handleTimeSettingsChange}
              />
            )}

            {activeTab === "range" && (
              <RangeHeatmapSettings
                configuration={configurations.rangeheatmap}
                onChange={handleRangeSettingsChange}
              />
            )}

            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateConfig}
                disabled={loading}
              >
                Update Configuration
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default HomePage;
