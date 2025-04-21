import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import Layout from "../../../../src/components/layout/Layout";

// Mock the Header and Footer components
jest.mock("../../../../src/components/layout/Header", () => {
  return function MockHeader(props) {
    return (
      <div
        data-testid="header"
        data-darkmode={props.darkMode}
        data-heatmaptype={props.currentHeatmapType}
      >
        Header
      </div>
    );
  };
});

jest.mock("../../../../src/components/layout/Footer", () => {
  return function MockFooter() {
    return <div data-testid="footer">Footer</div>;
  };
});

describe("Layout component", () => {
  const theme = createTheme();
  const mockToggleDarkMode = jest.fn();

  const renderWithProviders = (
    darkMode = false,
    currentHeatmapType = null,
    children = "Test Content"
  ) => {
    return render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout
            darkMode={darkMode}
            toggleDarkMode={mockToggleDarkMode}
            currentHeatmapType={currentHeatmapType}
          >
            {children}
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    );
  };

  test("renders header and footer components", () => {
    renderWithProviders();

    const headerElement = screen.getByTestId("header");
    const footerElement = screen.getByTestId("footer");

    expect(headerElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();
  });

  test("renders children content", () => {
    const testContent = "Test Children Content";
    renderWithProviders(false, null, testContent);

    const contentElement = screen.getByText(testContent);
    expect(contentElement).toBeInTheDocument();
  });

  test("passes correct props to Header component", () => {
    const testHeatmapType = "numberheatmap";
    renderWithProviders(true, testHeatmapType);

    const headerElement = screen.getByTestId("header");

    // Check if props are correctly passed to the Header component
    expect(headerElement.dataset.darkmode).toBe("true");
    expect(headerElement.dataset.heatmaptype).toBe(testHeatmapType);
  });
});
