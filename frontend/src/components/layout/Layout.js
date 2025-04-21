import React from "react";
import { Box, Container } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, darkMode, toggleDarkMode, currentHeatmapType }) => {
  return (
    <Box
      className="app"
      sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        currentHeatmapType={currentHeatmapType}
      />

      <Container maxWidth="lg" sx={{ flex: 1, py: 3 }}>
        {children}
      </Container>

      <Footer />
    </Box>
  );
};

export default Layout;
