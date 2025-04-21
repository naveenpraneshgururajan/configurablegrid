import React from "react";
import { Link } from "react-router-dom";
import { Paper, Box, Typography, Button } from "@mui/material";

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

export default HeatmapCard;
