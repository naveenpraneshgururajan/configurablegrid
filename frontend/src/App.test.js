// Mock the routes
jest.mock("./utils/routes", () => ({
  routes: {
    home: "/",
    numberHeatmap: "/number-heatmap",
    timeHeatmap: "/time-heatmap",
    rangeHeatmap: "/range-heatmap",
  },
}));
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

// Mock the required modules before importing the component
jest.mock("./utils/theme", () => ({
  useTheme: () => ({
    theme: {
      palette: { mode: "light" },
      typography: {
        fontWeightBold: 700,
        fontWeightRegular: 400,
        fontWeightLight: 300,
        fontWeightMedium: 500,
      },
      breakpoints: {
        values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
      },
      components: {},
      spacing: (factor) => `${factor * 8}px`,
    },
    darkMode: false,
    toggleDarkMode: jest.fn(),
  }),
}));

jest.mock("./hooks/useConfigurations", () => ({
  useConfigurations: () => ({
    configurations: [{ id: "test1", name: "Test Config" }],
    loading: false,
    currentHeatmapType: "number",
    setCurrentHeatmapType: jest.fn(),
    snackbar: {
      component: () => <div data-testid="snackbar">Snackbar</div>,
    },
    handleCloseSnackbar: jest.fn(),
    updateConfiguration: jest.fn(),
  }),
}));

// Mock the router components
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div data-testid="router">{children}</div>,
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: ({ path, element }) => {
    // Convert the path to a valid testid by removing any slashes
    const testId = `route-${path.replace(/\//g, "")}`;
    return <div data-testid={testId}>{element}</div>;
  },
}));

// Mock MUI components
jest.mock("@mui/material", () => ({
  ThemeProvider: ({ children }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
  CssBaseline: () => <div data-testid="css-baseline" />,
}));

// Mock the page components
jest.mock("./components/layout/Layout", () => ({
  __esModule: true,
  default: ({ children, darkMode, toggleDarkMode, currentHeatmapType }) => (
    <div
      data-testid="layout"
      data-darkmode={darkMode}
      data-heatmaptype={currentHeatmapType}
    >
      {children}
    </div>
  ),
}));

jest.mock("./pages/HomePage", () => ({
  __esModule: true,
  default: ({
    configurations,
    loading,
    updateConfiguration,
    setCurrentHeatmapType,
  }) => (
    <div
      data-testid="home-page"
      data-loading={loading}
      data-configs={JSON.stringify(configurations)}
    >
      Home Page
    </div>
  ),
}));

jest.mock("./pages/NumberHeatGenerator/NumberHeatGenerator", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="number-heat-generator">Number Heat Generator</div>
  ),
}));

jest.mock("./pages/TimeHeatMapGenerator/TimeHeatMapGenerator", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="time-heat-map-generator">Time Heat Map Generator</div>
  ),
}));

jest.mock("./pages/RangeHeatmapGenerator/RangeHeatmapGenerator", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="range-heatmap-generator">Range Heatmap Generator</div>
  ),
}));

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the app with router setup", () => {
    const { container } = render(<App />);
    expect(container).not.toBeNull();
    expect(screen.getByTestId("router")).toBeInTheDocument();
    expect(screen.getByTestId("routes")).toBeInTheDocument();
  });

  test("renders the layout with correct props", () => {
    render(<App />);
    const layout = screen.getByTestId("layout");
    expect(layout).toBeInTheDocument();
    expect(layout.getAttribute("data-darkmode")).toBe("false");
    expect(layout.getAttribute("data-heatmaptype")).toBe("number");
  });

  test("renders routes correctly", () => {
    render(<App />);
    // Check for routes with adjusted testIds (removed slashes)
    expect(screen.getByTestId("route-")).toBeInTheDocument(); // Home route
    expect(screen.getByTestId("route-number-heatmap")).toBeInTheDocument();
    expect(screen.getByTestId("route-time-heatmap")).toBeInTheDocument();
    expect(screen.getByTestId("route-range-heatmap")).toBeInTheDocument();
  });

  test("home page receives correct props", () => {
    render(<App />);
    const homePage = screen.getByTestId("home-page");
    expect(homePage).toBeInTheDocument();
    expect(homePage.getAttribute("data-loading")).toBe("false");
    expect(JSON.parse(homePage.getAttribute("data-configs"))).toEqual([
      { id: "test1", name: "Test Config" },
    ]);
  });

  test("renders snackbar", () => {
    render(<App />);
    expect(screen.getByTestId("snackbar")).toBeInTheDocument();
  });

  test("handles dark mode", () => {
    // Save original implementation
    const originalModule = jest.requireMock("./utils/theme");
    const originalUseTheme = originalModule.useTheme;

    // Replace with dark mode version for this test
    originalModule.useTheme = () => ({
      theme: {
        palette: { mode: "dark" },
        typography: {
          fontWeightBold: 700,
          fontWeightRegular: 400,
          fontWeightLight: 300,
          fontWeightMedium: 500,
        },
        breakpoints: {
          values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
        },
        components: {},
        spacing: (factor) => `${factor * 8}px`,
      },
      darkMode: true,
      toggleDarkMode: jest.fn(),
    });

    render(<App />);
    const layout = screen.getByTestId("layout");
    expect(layout.getAttribute("data-darkmode")).toBe("true");

    // Restore original
    originalModule.useTheme = originalUseTheme;
  });

  test("handles loading state", () => {
    // Save original implementation
    const originalModule = jest.requireMock("./hooks/useConfigurations");
    const originalUseConfigurations = originalModule.useConfigurations;

    // Replace with loading version for this test
    originalModule.useConfigurations = () => ({
      configurations: [],
      loading: true,
      currentHeatmapType: "number",
      setCurrentHeatmapType: jest.fn(),
      snackbar: {
        component: () => <div data-testid="snackbar">Snackbar</div>,
      },
      handleCloseSnackbar: jest.fn(),
      updateConfiguration: jest.fn(),
    });

    render(<App />);
    const homePage = screen.getByTestId("home-page");
    expect(homePage.getAttribute("data-loading")).toBe("true");

    // Restore original
    originalModule.useConfigurations = originalUseConfigurations;
  });
});
