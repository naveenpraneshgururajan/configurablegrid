import React from "react";
import { render, screen } from "@testing-library/react";
import RangeHeatmapGenerator from "../RangeHeatmapGenerator/RangeHeatmapGenerator";

jest.mock("../../components/ConfigurableGrid", () => {
  return jest.fn((props) => {
    return <div data-testid="mock-grid" data-config-id={props.configId} />;
  });
});

describe("angeHeatmapGenerator Component", () => {
  beforeEach(() => {
    render(<RangeHeatmapGenerator />);
  });

  it("renders the title correctly", () => {
    expect(screen.getByText("Range Heatmap")).toBeInTheDocument();
  });

  it("renders the description text", () => {
    expect(
      screen.getByText(
        /This example demonstrates how to apply different styles/i
      )
    ).toBeInTheDocument();
  });

  it("renders the features list", () => {
    expect(screen.getByText(/Features demonstrated:/)).toBeInTheDocument();
    expect(
      screen.getByText(/Range-based styling for numeric values/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Value-based cell styling for categorical data/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Combined styling techniques in a single grid/i)
    ).toBeInTheDocument();
  });

  it("renders the example config block", () => {
    expect(
      screen.getByText(/Example of How Config is returned from the API:/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/"title": "Server Performance Dashboard"/)
    ).toBeInTheDocument();
  });
});
