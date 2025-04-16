import React from "react";
import { render, screen } from "@testing-library/react";
import NumberHeatGenerator from "../NumberHeatGenerator/NumberHeatGenerator";

jest.mock("../../components/ConfigurableGrid", () => {
  return jest.fn((props) => {
    return <div data-testid="mock-grid" data-config-id={props.configId} />;
  });
});

describe("NumberHeatGenerator Component", () => {
  beforeEach(() => {
    render(<NumberHeatGenerator />);
  });

  it("renders the title correctly", () => {
    expect(screen.getByText("Number Heatmap")).toBeInTheDocument();
  });

  it("renders the description text", () => {
    expect(
      screen.getByText(/demonstrates how to color cells as a heatmap/i)
    ).toBeInTheDocument();
  });

  it("renders the features list", () => {
    expect(screen.getByText(/Features demonstrated:/)).toBeInTheDocument();
    expect(
      screen.getByText(/Column-specific heatmap styling/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Color interpolation/i)).toBeInTheDocument();
    expect(screen.getByText(/Automatic value formatting/i)).toBeInTheDocument();
  });

  it("renders the example config block", () => {
    expect(
      screen.getByText(/Example of How Config is returned from the API:/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/"title": "Sales Performance Heatmap"/)
    ).toBeInTheDocument();
  });
});
