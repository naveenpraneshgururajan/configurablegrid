import { useState, useEffect } from "react";
import {
  getAllConfigurations,
  updateConfiguration as apiUpdateConfiguration,
} from "../services/api";
import { Snackbar, Alert } from "@mui/material";

export const useConfigurations = () => {
  const [configurations, setConfigurations] = useState({
    numberheatmap: null,
    timestamp: null,
    rangeheatmap: null,
  });
  const [loading, setLoading] = useState(true);
  const [currentHeatmapType, setCurrentHeatmapType] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch initial configurations
  useEffect(() => {
    const fetchConfigurations = async () => {
      try {
        console.log("inside try");
        const response = await getAllConfigurations();
        setLoading(false);
        setConfigurations({
          numberheatmap: response.configurations.find(
            (c) => c.id === "numberheatmap"
          ),
          timestamp: response.configurations.find((c) => c.id === "timestamp"),
          rangeheatmap: response.configurations.find(
            (c) => c.id === "rangeheatmap"
          ),
        });
      } catch (error) {
        setLoading(true);
        setSnackbar({
          open: true,
          message: "Failed to load configurations",
          severity: "error",
        });
      }
    };

    fetchConfigurations();
  }, []);

  // Helper to determine the route
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes("numberheatmap")) {
      setCurrentHeatmapType("numberheatmap");
    } else if (path.includes("timeheatmap")) {
      setCurrentHeatmapType("timestamp");
    } else if (path.includes("rangeheatmap")) {
      setCurrentHeatmapType("rangeheatmap");
    } else {
      setCurrentHeatmapType(null);
    }

    // Add a listener for path changes
    const handleLocationChange = () => {
      const newPath = window.location.pathname;
      if (newPath.includes("numberheatmap")) {
        setCurrentHeatmapType("numberheatmap");
      } else if (newPath.includes("timeheatmap")) {
        setCurrentHeatmapType("timestamp");
      } else if (newPath.includes("rangeheatmap")) {
        setCurrentHeatmapType("rangeheatmap");
      } else {
        setCurrentHeatmapType(null);
      }
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const updateConfiguration = async (type, updates) => {
    try {
      setLoading(true);

      // Validate updates
      if (!updates || !Array.isArray(updates) || updates.length === 0) {
        throw new Error("Invalid update format");
      }

      // Make the API call
      const result = await apiUpdateConfiguration(type, updates);

      // Update our state with the new configuration
      if (result.configuration) {
        setConfigurations((prev) => ({
          ...prev,
          [type]: result.configuration,
        }));
      }

      setSnackbar({
        open: true,
        message: "Settings updated successfully",
        severity: "success",
      });

      return result;
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          "Failed to update settings: " + (error.message || "Unknown error"),
        severity: "error",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Snackbar component to be used in parent
  const snackbarComponent = (handleClose) => (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar.severity}
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );

  return {
    configurations,
    loading,
    currentHeatmapType,
    setCurrentHeatmapType,
    updateConfiguration,
    snackbar: {
      ...snackbar,
      component: snackbarComponent,
    },
    handleCloseSnackbar,
  };
};
