import React from "react";
import { render, screen } from "@testing-library/react";
import TimeHeatMapGenerator from "../TimeHeatMapGenerator/TimeHeatMapGenerator";

jest.mock("../../components/ConfigurableGrid", () => {
  return jest.fn((props) => {
    return <div data-testid="mock-grid" data-config-id={props.configId} />;
  });
});

describe("TimeHeatMapGenerator Component", () => {
  beforeEach(() => {
    render(<TimeHeatMapGenerator />);
  });

  it("renders the title correctly", () => {
    expect(screen.getByText("Time Heatmap")).toBeInTheDocument();
  });

  it("renders the description text", () => {
    expect(
      screen.getByText(/This example shows a simplified approach to coloring/i)
    ).toBeInTheDocument();
  });

  it("renders the features list", () => {
    expect(screen.getByText(/Features demonstrated:/)).toBeInTheDocument();
    expect(
      screen.getByText(/Time-based gradient coloring using age of items/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Simple linear scale for time values/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Automatic calculation of "freshness" for timestamps/i)
    ).toBeInTheDocument();
  });

  it("renders the example config block", () => {
    expect(
      screen.getByText(/Example of How Config is returned from the API:/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/"title": "Activity Timeline"/)
    ).toBeInTheDocument();
  });
});
