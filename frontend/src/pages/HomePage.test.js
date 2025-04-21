import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";

// Mock the components that HomePage uses
jest.mock("../components/ui/HeatmapCard", () => {
  return function MockHeatmapCard({ title, description, linkTo }) {
    return (
      <div data-testid="heatmap-card">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={linkTo}>View Heatmap</a>
      </div>
    );
  };
});

jest.mock("./settings/NumberHeatmapSettings", () => {
  return function MockNumberSettings() {
    return <div data-testid="number-settings">Number Settings</div>;
  };
});

jest.mock("./settings/TimeHeatmapSettings", () => {
  return function MockTimeSettings() {
    return <div data-testid="time-settings">Time Settings</div>;
  };
});

jest.mock("./settings/RangeHeatmapSettings", () => {
  return function MockRangeSettings() {
    return <div data-testid="range-settings">Range Settings</div>;
  };
});

// Mock Material UI icons
jest.mock("@mui/icons-material/Numbers", () => () => "NumbersIcon");
jest.mock("@mui/icons-material/AccessTime", () => () => "AccessTimeIcon");
jest.mock("@mui/icons-material/BarChart", () => () => "BarChartIcon");

// Mock routes
jest.mock("../utils/routes", () => ({
  routes: {
    numberHeatmap: "/number-heatmap",
    timeHeatmap: "/time-heatmap",
    rangeHeatmap: "/range-heatmap",
  },
}));

describe("HomePage Component", () => {
  const mockConfigurations = {
    numberheatmap: {
      sales: { min: 0, max: 100 },
      revenue: { min: 0, max: 1000 },
      profit: { min: 0, max: 500 },
    },
    timestamp: {
      age: { min: 0, max: 100, invertColor: "true" },
    },
    rangeheatmap: {
      cpu: {
        ranges: [
          { min: 0, max: 30, style: { color: "#008000" } },
          { min: 31, max: 70, style: { color: "#FFA500" } },
          {
            min: 71,
            max: 100,
            style: { color: "#FF0000", fontWeight: "bold" },
          },
        ],
      },
      memory: {
        ranges: [
          { min: 0, max: 30, style: { color: "#008000" } },
          { min: 31, max: 70, style: { color: "#FFA500" } },
          {
            min: 71,
            max: 100,
            style: { color: "#FF0000", fontWeight: "bold" },
          },
        ],
      },
    },
  };

  const mockUpdateConfiguration = jest.fn().mockResolvedValue({});

  const defaultProps = {
    configurations: mockConfigurations,
    loading: false,
    updateConfiguration: mockUpdateConfiguration,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders heatmap cards", () => {
    render(
      <BrowserRouter>
        <HomePage {...defaultProps} />
      </BrowserRouter>
    );

    // Check if all three cards are rendered
    const heatmapCards = screen.getAllByTestId("heatmap-card");
    expect(heatmapCards).toHaveLength(3);

    // Check card titles
    expect(screen.getByText("Number Heatmaps")).toBeInTheDocument();
    expect(screen.getByText("Time Heatmaps")).toBeInTheDocument();
    expect(screen.getByText("Range Heatmaps")).toBeInTheDocument();
  });

  test("renders number settings by default", () => {
    render(
      <BrowserRouter>
        <HomePage {...defaultProps} />
      </BrowserRouter>
    );

    expect(screen.getByTestId("number-settings")).toBeInTheDocument();
    expect(screen.queryByTestId("time-settings")).not.toBeInTheDocument();
    expect(screen.queryByTestId("range-settings")).not.toBeInTheDocument();
  });

  test("shows loading text when loading is true", () => {
    render(
      <BrowserRouter>
        <HomePage {...defaultProps} loading={true} />
      </BrowserRouter>
    );

    expect(screen.getByText("Loading configuration...")).toBeInTheDocument();
    expect(screen.queryByTestId("number-settings")).not.toBeInTheDocument();
  });

  test("displays correct title and description", () => {
    render(
      <BrowserRouter>
        <HomePage {...defaultProps} />
      </BrowserRouter>
    );

    expect(screen.getByText("Heatmap Generator")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Generate customized heatmaps based on your specific data requirements."
      )
    ).toBeInTheDocument();
  });
});
