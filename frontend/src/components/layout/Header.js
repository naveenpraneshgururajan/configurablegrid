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

// Material UI Icons
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NumbersIcon from "@mui/icons-material/Numbers";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BarChartIcon from "@mui/icons-material/BarChart";
import HomeIcon from "@mui/icons-material/Home";

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
  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "primary.main", fontWeight: 600 }}
        >
          HeatMap Generator
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
          {navRoutes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              icon={getIconForRoute(route.id)}
              isActive={currentHeatmapType === route.id}
            >
              {route.label}
            </NavLink>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
