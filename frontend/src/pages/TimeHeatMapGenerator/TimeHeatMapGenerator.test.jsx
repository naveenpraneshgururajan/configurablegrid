import React from "react";
import { render, screen } from "@testing-library/react";
import TimeHeatMapGenerator from "../TimeHeatMapGenerator/TimeHeatMapGenerator";

jest.mock("../../components/grid/ConfigurableGrid", () => {
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
      screen.getByText(
        /This example uses color to show how recent each row is/i
      )
    ).toBeInTheDocument();
  });

  it("renders the features list", () => {
    expect(screen.getByText(/Features demonstrated:/)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Rows are colored based on how recent they are, using a green-to-red gradient/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /A simple timeline helps visually rank items from newest to oldest/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /The age of each item is calculated automatically using its timestamp/i
      )
    ).toBeInTheDocument();
  });

  it("renders the example config block", () => {
    expect(
      screen.getByText(/Example of How Config is returned from the API:/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/"title": "Project Activity Timeline"/)
    ).toBeInTheDocument();
  });
});
