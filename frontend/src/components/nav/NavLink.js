import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

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

export default NavLink;
