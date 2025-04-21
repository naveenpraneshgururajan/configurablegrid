import React from "react";
import { render, screen } from "@testing-library/react";
import NumberHeatGenerator from "../NumberHeatGenerator/NumberHeatGenerator";

jest.mock("../../components/grid/ConfigurableGrid", () => {
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
      screen.getByText(
        /This example shows how you can turn numbers into visual coloured/i
      )
    ).toBeInTheDocument();
  });

  it("renders the features list", () => {
    expect(screen.getByText(/Features demonstrated:/)).toBeInTheDocument();
    expect(
      screen.getByText(/Each column has its own heatmap styling/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Colors smoothly shift from minimum to maximum based on the values values/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Colour more towards Green indicate good performance, colour more towards red indicate, didnt meet the expected value/i
      )
    ).toBeInTheDocument();
  });

  it("renders the example config block", () => {
    expect(
      screen.getByText(/Example of How Config is returned from the API:/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/"title": "Sales Revenew Profit Heatmap"/)
    ).toBeInTheDocument();
  });
});
