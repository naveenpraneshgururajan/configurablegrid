import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import Header from "../../../../src/components/layout/Header";
import { navRoutes } from "../../../../src/utils/routes";

// Mock the NavLink component since it uses React Router
jest.mock("../../../../src/components/nav/NavLink", () => {
  return ({ children, to, isActive }) => (
    <a
      href={to}
      data-testid={`nav-link-${children}`}
      className={isActive ? "active" : ""}
    >
      {children}
    </a>
  );
});

describe("Header component", () => {
  const theme = createTheme();
  const mockToggleDarkMode = jest.fn();

  const renderWithProviders = (darkMode = false, currentHeatmapType = null) => {
    return render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header
            darkMode={darkMode}
            toggleDarkMode={mockToggleDarkMode}
            currentHeatmapType={currentHeatmapType}
          />
        </BrowserRouter>
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    mockToggleDarkMode.mockClear();
  });

  test("renders the header with app title", () => {
    renderWithProviders();

    const titleElement = screen.getByText(/HeatMap Generator/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders all navigation links", () => {
    renderWithProviders();

    navRoutes.forEach((route) => {
      const linkElement = screen.getByTestId(`nav-link-${route.label}`);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.getAttribute("href")).toBe(route.path);
    });
  });

  test("highlights the active navigation item", () => {
    // Test with Number Heatmap selected
    renderWithProviders(false, "numberheatmap");

    const navLinks = navRoutes.map((route) =>
      screen.getByTestId(`nav-link-${route.label}`)
    );

    // The "Number Heatmap" link should have the active class
    const activeNavLink = screen.getByTestId("nav-link-Number Heatmap");
    expect(activeNavLink.className).toContain("active");

    // Other links should not have the active class
    const homeLink = screen.getByTestId("nav-link-Home");
    expect(homeLink.className).not.toContain("active");
  });
});
