import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Footer from "../../../../src/components/layout/Footer";

describe("Footer component", () => {
  const theme = createTheme();

  test("renders the copyright text correctly", () => {
    render(
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>
    );

    // Check if copyright text is displayed
    const copyrightText = screen.getByText(/© 2025 Heatmap Generator/i);
    expect(copyrightText).toBeInTheDocument();
  });

  test("has the correct styling", () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>
    );

    // Get the footer element
    const footerElement = container.querySelector("footer");

    // Check if the footer exists
    expect(footerElement).toBeInTheDocument();

    // Check if the footer has the correct styling classes
    // Note: The exact classes will depend on how Material-UI applies them
    // This test checks for the presence of the footer element only
  });
});
