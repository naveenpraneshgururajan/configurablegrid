import React from "react";
import { render, screen } from "@testing-library/react";
import RangeHeatmapGenerator from "../RangeHeatmapGenerator/RangeHeatmapGenerator";

jest.mock("../../components/grid/ConfigurableGrid", () => {
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
        /This example shows how you can visually style cells based on /i
      )
    ).toBeInTheDocument();
  });

  it("renders the features list", () => {
    expect(screen.getByText(/Features demonstrated:/)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Each column is styled differently based on what it shows/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Colors gradually shift from low to high values to help spot trends easily/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Greener shades mean better performance, while red tones highlight areas that may need attention/i
      )
    ).toBeInTheDocument();
  });

  it("renders the example config block", () => {
    expect(
      screen.getByText(/Example of How Config is returned from the API:/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/"title": "System Performance Dashboard"/)
    ).toBeInTheDocument();
  });
});
