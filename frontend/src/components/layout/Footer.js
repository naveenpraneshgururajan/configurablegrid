import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
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
  );
};

export default Footer;
