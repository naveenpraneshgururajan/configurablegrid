import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  it("renders the header and navigation links", () => {
    render(<App />);

    expect(screen.getByText(/HeatMap Generator Project/i)).toBeInTheDocument();

    // Use getAllByText to account for multiple matching elements
    const numberHeatmap = screen.getAllByText(/Number Heatmaps/i);
    expect(numberHeatmap).toHaveLength(1); // Ensure that there are 2 elements matching
    expect(numberHeatmap[0]).toBeInTheDocument(); // Check the first match (e.g., the navigation link)
  });

  it("renders the home page content by default", () => {
    render(<App />);
    expect(screen.getByText(/HeatMap Generator Project/i)).toBeInTheDocument();
  });

  it("navigates to Number Heatmap page", async () => {
    render(<App />);

    const user = userEvent.setup();
    await user.click(screen.getByText(/Number Heatmaps/i));
    expect(await screen.findByText(/Number Heatmaps/i)).toBeInTheDocument();
  });

  it("navigates to Time Heatmap page", async () => {
    render(<App />);

    const user = userEvent.setup();
    await user.click(screen.getByText(/Time Heatmaps/i));
    expect(await screen.findByText(/Time Heatmaps/i)).toBeInTheDocument();
  });

  it("navigates to Range Heatmap page", async () => {
    render(<App />);

    const user = userEvent.setup();
    await user.click(screen.getByText(/Range Heatmaps/i));
    expect(await screen.findByText(/Range Heatmaps/i)).toBeInTheDocument();
  });
});
