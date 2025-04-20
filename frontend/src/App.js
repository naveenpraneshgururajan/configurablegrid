import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import NumberHeatGenerator from "./pages/NumberHeatGenerator/NumberHeatGenerator";
import TimeHeatMapGenerator from "./pages/TimeHeatMapGenerator/TimeHeatMapGenerator";
import RangeHeatmapGenerator from "./pages/RangeHeatmapGenerator/RangeHeatmapGenerator";

// Material UI Imports
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Tabs,
  Tab,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Switch,
  FormControlLabel,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Snackbar,
  Alert,
} from "@mui/material";

// Material UI Icons
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NumbersIcon from "@mui/icons-material/Numbers";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BarChartIcon from "@mui/icons-material/BarChart";
import HomeIcon from "@mui/icons-material/Home";

// Import API service
import { getAllConfigurations, updateConfiguration } from "./services/api";

// Create NavLink component that uses Material UI + React Router
const NavLink = ({ to, children, icon, isActive }) => {
  return (
    <Button
      component={Link}
      to={to}
      sx={{
        color: isActive ? "primary.main" : "text.secondary",
        mx: 1,
        "&:hover": {
          color: "primary.main",
        },
        display: "flex",
        alignItems: "center",
        borderBottom: isActive ? "2px solid" : "2px solid transparent",
        borderColor: isActive ? "primary.main" : "transparent",
        borderRadius: 0,
        py: 1.5,
      }}
      startIcon={icon}
    >
      {children}
    </Button>
  );
};

// Create Card component for heatmap options
const HeatmapCard = ({ title, description, icon, linkTo }) => {
  return (
    <Paper
      sx={{
        height: 230,
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 3,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 6,
        },
      }}
    >
      <Box
        sx={{
          bgcolor: "primary.main",
          p: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 42,
            height: 42,
            bgcolor: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "primary.main",
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" color="white" fontWeight="bold">
          {title}
        </Typography>
      </Box>

      <Box
        sx={{
          p: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>

        <Box sx={{ mt: "auto" }}>
          <Button
            component={Link}
            to={linkTo}
            variant="contained"
            color="primary"
            sx={{
              width: "100%",
              py: 1,
              fontWeight: "bold",
              borderRadius: 1.5,
            }}
          >
            View Heatmap
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("number");
  const [currentHeatmapType, setCurrentHeatmapType] = useState(null);
  const [configurations, setConfigurations] = useState({
    numberheatmap: null,
    timestamp: null,
    rangeheatmap: null,
  });
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Create Material UI theme based on dark mode state
  const theme = createTheme({
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
  });

  // Fetch initial configurations
  useEffect(() => {
    const fetchConfigurations = async () => {
      try {
        setLoading(true);
        const response = await getAllConfigurations();
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
        console.error("Error fetching configurations:", error);
        setSnackbar({
          open: true,
          message: "Failed to load configurations",
          severity: "error",
        });
      } finally {
        setLoading(false);
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
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleUpdateConfig = async () => {
    try {
      setLoading(true);
      let updates = [];

      if (currentHeatmapType === "numberheatmap") {
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
      } else if (currentHeatmapType === "timestamp") {
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
      } else if (currentHeatmapType === "rangeheatmap") {
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
        const result = await updateConfiguration(currentHeatmapType, updates);

        // Update our state with the new configuration
        if (result.configuration) {
          setConfigurations((prev) => ({
            ...prev,
            [currentHeatmapType]: result.configuration,
          }));
        }

        setSnackbar({
          open: true,
          message: "Settings updated successfully",
          severity: "success",
        });
      }
    } catch (error) {
      console.error("Error updating configuration:", error);
      setSnackbar({
        open: true,
        message: "Failed to update settings",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderNumberHeatmapSettings = () => {
    const config = configurations.numberheatmap;
    if (!config) return null;

    const salesColumn = config.columns.find((c) => c.field === "sales");
    const revenueColumn = config.columns.find((c) => c.field === "revenue");
    const profitColumn = config.columns.find((c) => c.field === "profit");

    return (
      <Grid container spacing={3}>
        {/* <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Sales Revenue Profit Heatmap Settings
          </Typography>
        </Grid> */}

        {/* Sales Settings */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom color="primary">
              Sales Settings
            </Typography>
            <TextField
              id="sales-min"
              label="Min Value"
              type="number"
              fullWidth
              margin="normal"
              defaultValue={salesColumn?.style?.min || 0}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="sales-max"
              label="Max Value"
              type="number"
              fullWidth
              margin="normal"
              defaultValue={salesColumn?.style?.max || 1000}
              InputLabelProps={{ shrink: true }}
            />
          </Paper>
        </Grid>

        {/* Revenue Settings */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom color="primary">
              Revenue Settings
            </Typography>
            <TextField
              id="revenue-min"
              label="Min Value"
              type="number"
              fullWidth
              margin="normal"
              defaultValue={revenueColumn?.style?.min || 0}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="revenue-max"
              label="Max Value"
              type="number"
              fullWidth
              margin="normal"
              defaultValue={revenueColumn?.style?.max || 50000}
              InputLabelProps={{ shrink: true }}
            />
          </Paper>
        </Grid>

        {/* Profit Settings */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom color="primary">
              Profit Margin Settings
            </Typography>
            <TextField
              id="profit-min"
              label="Min Value"
              type="number"
              fullWidth
              margin="normal"
              defaultValue={profitColumn?.style?.min || 0}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="profit-max"
              label="Max Value"
              type="number"
              fullWidth
              margin="normal"
              defaultValue={profitColumn?.style?.max || 100}
              InputLabelProps={{ shrink: true }}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  };

  const renderTimeHeatmapSettings = () => {
    const config = configurations.timestamp;
    if (!config) return null;

    const ageColumn = config.columns.find((c) => c.field === "age");

    return (
      <Grid container spacing={3}>
        {/* <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Time Heatmap Settings
          </Typography>
        </Grid> */}

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom color="primary">
              Age Settings
            </Typography>
            <TextField
              id="age-min"
              label="Min Days"
              type="number"
              fullWidth
              margin="normal"
              defaultValue={ageColumn?.style?.min || 0}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              id="age-max"
              label="Max Days"
              type="number"
              fullWidth
              margin="normal"
              defaultValue={ageColumn?.style?.max || 30}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="invert-color-label">Invert Colors</InputLabel>
              <Select
                labelId="invert-color-label"
                id="invert-color"
                defaultValue={ageColumn?.style?.invertColor || "true"}
                label="Invert Colors"
              >
                <MenuItem value="true">Yes (Newer is Green)</MenuItem>
                <MenuItem value="false">No (Older is Green)</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    );
  };

  const renderRangeHeatmapSettings = () => {
    const config = configurations.rangeheatmap;
    if (!config) return null;

    const cpuColumn = config.columns.find((c) => c.field === "cpu");
    const memoryColumn = config.columns.find((c) => c.field === "memory");

    return (
      <Grid container spacing={3}>
        {/* <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Range Heatmap Settings
          </Typography>
        </Grid> */}

        {/* CPU Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom color="primary">
              CPU Usage Ranges
            </Typography>

            {/* Low Range (Green) */}
            <Box sx={{ mb: 2, p: 1, borderLeft: "4px solid #008000" }}>
              <Typography color="primary" variant="subtitle2" gutterBottom>
                Low Range (Green)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    id="cpu-low-min"
                    label="Min"
                    type="number"
                    fullWidth
                    size="small"
                    defaultValue={cpuColumn?.style?.ranges[0]?.min || 0}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="cpu-low-max"
                    label="Max"
                    type="number"
                    fullWidth
                    size="small"
                    defaultValue={cpuColumn?.style?.ranges[0]?.max || 60}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="cpu-low-color"
                    label="Color"
                    type="color"
                    fullWidth
                    size="small"
                    defaultValue={
                      cpuColumn?.style?.ranges[0]?.style?.color || "#008000"
                    }
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Medium Range (Orange) */}
            <Box sx={{ mb: 2, p: 1, borderLeft: "4px solid #FFA500" }}>
              <Typography variant="subtitle2" gutterBottom color="primary">
                Medium Range (Orange)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    id="cpu-med-min"
                    label="Min"
                    type="number"
                    fullWidth
                    size="small"
                    defaultValue={cpuColumn?.style?.ranges[1]?.min || 60}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="cpu-med-max"
                    label="Max"
                    type="number"
                    fullWidth
                    size="small"
                    defaultValue={cpuColumn?.style?.ranges[1]?.max || 85}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="cpu-med-color"
                    label="Color"
                    type="color"
                    fullWidth
                    size="small"
                    defaultValue={
                      cpuColumn?.style?.ranges[1]?.style?.color || "#FFA500"
                    }
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* High Range (Red) */}
            <Box sx={{ mb: 2, p: 1, borderLeft: "4px solid #FF0000" }}>
              <Typography variant="subtitle2" gutterBottom color="primary">
                High Range (Red)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    id="cpu-high-min"
                    label="Min"
                    type="number"
                    fullWidth
                    size="small"
                    defaultValue={cpuColumn?.style?.ranges[2]?.min || 85}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="cpu-high-max"
                    label="Max"
                    type="number"
                    fullWidth
                    size="small"
                    defaultValue={cpuColumn?.style?.ranges[2]?.max || 100}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="cpu-high-color"
                    label="Color"
                    type="color"
                    fullWidth
                    size="small"
                    defaultValue={
                      cpuColumn?.style?.ranges[2]?.style?.color || "#FF0000"
                    }
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Memory Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom color="primary">
              Memory Usage Ranges
            </Typography>

            {/* Low Range (Green) */}
            <Box sx={{ mb: 2, p: 1, borderLeft: "4px solid #008000" }}>
              <Typography variant="subtitle2" gutterBottom color="primary">
                Low Range (Green)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    id="mem-low-min"
                    label="Min"
                    type="number"
                    fullWidth
                    size="small"
                    defaultValue={memoryColumn?.style?.ranges[0]?.min || 0}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="mem-low-max"
                    label="Max"
                    type="number"
                    fullWidth
                    size="small"
                    defaultValue={memoryColumn?.style?.ranges[0]?.max || 60}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="mem-low-color"
                    label="Color"
                    type="color"
                    fullWidth
                    size="small"
                    defaultValue={
                      memoryColumn?.style?.ranges[0]?.style?.color || "#008000"
                    }
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Medium Range (Orange) */}
            <Box sx={{ mb: 2, p: 1, borderLeft: "4px solid #FFA500" }}>
              <Typography variant="subtitle2" gutterBottom color="primary">
                Medium Range (Orange)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    id="mem-med-min"
                    label="Min"
                    type="number"
                    fullWidth
                    size="small"
                    defaultValue={memoryColumn?.style?.ranges[1]?.min || 60}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="mem-med-max"
                    label="Max"
                    type="number"
                    fullWidth
                    size="small"
                    defaultValue={memoryColumn?.style?.ranges[1]?.max || 85}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="mem-med-color"
                    label="Color"
                    type="color"
                    fullWidth
                    size="small"
                    defaultValue={
                      memoryColumn?.style?.ranges[1]?.style?.color || "#FFA500"
                    }
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* High Range (Red) */}
            <Box sx={{ mb: 2, p: 1, borderLeft: "4px solid #FF0000" }}>
              <Typography variant="subtitle2" gutterBottom color="primary">
                High Range (Red)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    id="mem-high-min"
                    label="Min"
                    type="number"
                    fullWidth
                    size="small"
                    defaultValue={memoryColumn?.style?.ranges[2]?.min || 85}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="mem-high-max"
                    label="Max"
                    type="number"
                    fullWidth
                    size="small"
                    defaultValue={memoryColumn?.style?.ranges[2]?.max || 100}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="mem-high-color"
                    label="Color"
                    type="color"
                    fullWidth
                    size="small"
                    defaultValue={
                      memoryColumn?.style?.ranges[2]?.style?.color || "#FF0000"
                    }
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          className="app"
          sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
          <AppBar position="static" color="default" elevation={2}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "primary.main", fontWeight: 600 }}
              >
                HeatMap Generator Project
              </Typography>

              {/* Updated Theme Toggle */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(0,0,0,0.2)"
                      : "rgba(255,255,255,0.2)",
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  border: `1px solid ${
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.1)"
                  }`,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    mr: 1,
                    color:
                      theme.palette.mode === "dark" ? "white" : "text.primary",
                    fontWeight: "medium",
                  }}
                >
                  Theme:
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={darkMode}
                      onChange={toggleDarkMode}
                      size="small"
                      icon={<LightModeIcon sx={{ fontSize: 16 }} />}
                      checkedIcon={<DarkModeIcon sx={{ fontSize: 16 }} />}
                    />
                  }
                  label=""
                  sx={{ m: 0 }}
                />
              </Box>

              <Box sx={{ display: "flex" }}>
                <NavLink
                  to="/"
                  icon={<HomeIcon />}
                  isActive={currentHeatmapType === null}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/numberheatmap"
                  icon={<NumbersIcon />}
                  isActive={currentHeatmapType === "numberheatmap"}
                >
                  Number Heatmap
                </NavLink>
                <NavLink
                  to="/timeheatmap"
                  icon={<AccessTimeIcon />}
                  isActive={currentHeatmapType === "timestamp"}
                >
                  Time Heatmap
                </NavLink>
                <NavLink
                  to="/rangeheatmap"
                  icon={<BarChartIcon />}
                  isActive={currentHeatmapType === "rangeheatmap"}
                >
                  Range Heatmap
                </NavLink>
              </Box>
            </Toolbar>
          </AppBar>

          <Container maxWidth="lg" sx={{ flex: 1, py: 3 }}>
            <Routes>
              <Route
                path="/"
                element={
                  <Box>
                    <Box sx={{ textAlign: "center", mb: 4 }}>
                      <Typography variant="h4" color="primary" gutterBottom>
                        Heatmap Generator
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Generate customized heatmaps based on your specific data
                        requirements.
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
                          description="Visualize numeric data with customizable color gradients and intensity scales for clear data representation."
                          icon={<NumbersIcon fontSize="medium" />}
                          linkTo="/numberheatmap"
                        />
                      </Box>

                      {/* Time Heatmap Card */}
                      <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "0" } }}>
                        <HeatmapCard
                          title="Time Heatmaps"
                          description="Track temporal patterns with time-based visualization using color intensity for effective time trend analysis."
                          icon={<AccessTimeIcon fontSize="medium" />}
                          linkTo="/timeheatmap"
                        />
                      </Box>

                      {/* Range Heatmap Card */}
                      <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "0" } }}>
                        <HeatmapCard
                          title="Range Heatmaps"
                          description="Apply distinct styles to data ranges for clearer segment visualization and threshold-based analysis."
                          icon={<BarChartIcon fontSize="medium" />}
                          linkTo="/rangeheatmap"
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
                          {activeTab === "number" &&
                            renderNumberHeatmapSettings()}
                          {activeTab === "time" && renderTimeHeatmapSettings()}
                          {activeTab === "range" &&
                            renderRangeHeatmapSettings()}

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
                              onClick={() => {
                                if (activeTab === "number") {
                                  setCurrentHeatmapType("numberheatmap");
                                } else if (activeTab === "time") {
                                  setCurrentHeatmapType("timestamp");
                                } else if (activeTab === "range") {
                                  setCurrentHeatmapType("rangeheatmap");
                                }
                                handleUpdateConfig();
                              }}
                              disabled={loading}
                            >
                              Update Configuration
                            </Button>
                          </Box>
                        </>
                      )}
                    </Paper>
                  </Box>
                }
              />

              <Route
                path="/numberheatmap"
                element={
                  <NumberHeatGenerator
                    configuration={configurations.numberheatmap}
                    onSettingsUpdated={(newConfig) => {
                      setConfigurations((prev) => ({
                        ...prev,
                        numberheatmap: newConfig,
                      }));
                    }}
                  />
                }
              />

              <Route
                path="/timeheatmap"
                element={
                  <TimeHeatMapGenerator
                    configuration={configurations.timestamp}
                    onSettingsUpdated={(newConfig) => {
                      setConfigurations((prev) => ({
                        ...prev,
                        timestamp: newConfig,
                      }));
                    }}
                  />
                }
              />

              <Route
                path="/rangeheatmap"
                element={
                  <RangeHeatmapGenerator
                    configuration={configurations.rangeheatmap}
                    onSettingsUpdated={(newConfig) => {
                      setConfigurations((prev) => ({
                        ...prev,
                        rangeheatmap: newConfig,
                      }));
                    }}
                  />
                }
              />
            </Routes>
          </Container>

          <Box
            component="footer"
            sx={{
              py: 2,
              textAlign: "center",
              borderTop: `2px solid`,
              borderColor: "primary.main",
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              &copy; 2025 Heatmap Generator
            </Typography>
          </Box>

          {/* Snackbar for notifications */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
