import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  FormControlLabel,
  Switch,
} from "@mui/material";
import NavLink from "../nav/NavLink";
import { navRoutes } from "../../utils/routes";
import { useLocation } from "react-router-dom";

// Material UI Icons
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NumbersIcon from "@mui/icons-material/Numbers";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BarChartIcon from "@mui/icons-material/BarChart";
import HomeIcon from "@mui/icons-material/Home";
import { headerFooterLabels } from "../../constant/label";

const { header, theme } = headerFooterLabels;

const getIconForRoute = (routeId) => {
  switch (routeId) {
    case "numberheatmap":
      return <NumbersIcon />;
    case "timestamp":
      return <AccessTimeIcon />;
    case "rangeheatmap":
      return <BarChartIcon />;
    default:
      return <HomeIcon />;
  }
};

const Header = ({ darkMode, toggleDarkMode, currentHeatmapType }) => {
  // Get current location to help determine active tab
  const location = useLocation();
  const currentPath = location.pathname;

  // Helper function to determine if a route is active
  const isRouteActive = (route) => {
    // For heatmap-specific routes (non-home routes)
    if (
      route.id === "numberheatmap" ||
      route.id === "timestamp" ||
      route.id === "rangeheatmap"
    ) {
      // Is active if:
      // 1. We're on this route's path, OR
      // 2. The currentHeatmapType matches this route's ID
      return currentPath === route.path || currentHeatmapType === route.id;
    }

    // For the home route
    if (route.path === "/" || route.id === "home") {
      // Home is active only when:
      // 1. We're on the home path AND
      // 2. No specific heatmap type is selected, OR "home" is the selected type
      const noSpecificHeatmapSelected =
        !currentHeatmapType ||
        currentHeatmapType === "home" ||
        (currentHeatmapType !== "numberheatmap" &&
          currentHeatmapType !== "timestamp" &&
          currentHeatmapType !== "rangeheatmap");

      return currentPath === "/" && noSpecificHeatmapSelected;
    }

    // Default fallback (shouldn't normally be reached)
    return false;
  };

  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "primary.main", fontWeight: 600 }}
        >
          {header}
        </Typography>

        {/* Theme Toggle */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: darkMode ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)",
            px: 2,
            py: 0.5,
            borderRadius: 2,
            border: `1px solid ${
              darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            }`,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              mr: 1,
              color: darkMode ? "white" : "text.primary",
              fontWeight: "medium",
            }}
          >
            {theme}
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
          {navRoutes.map((route) => {
            // Determine if this route should be active
            const active = isRouteActive(route);

            return (
              <NavLink
                key={route.path}
                to={route.path}
                icon={getIconForRoute(route.id)}
                isActive={active}
              >
                {route.label}
              </NavLink>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
