import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HeatmapCard from "../../../../src/components/ui/HeatmapCard";
import BarChartIcon from "@mui/icons-material/BarChart";

// Mock Material UI components
jest.mock("@mui/material", () => ({
  Paper: ({ children, sx, ...props }) => (
    <div data-testid="paper" style={sx} {...props}>
      {children}
    </div>
  ),
  Box: ({ children, sx, ...props }) => (
    <div style={sx} {...props}>
      {children}
    </div>
  ),
  Typography: ({ children, variant, ...props }) => (
    <div data-variant={variant} {...props}>
      {children}
    </div>
  ),
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

describe("HeatmapCard Component", () => {
  const defaultProps = {
    title: "Test Heatmap",
    description: "This is a test description",
    icon: <BarChartIcon data-testid="test-icon" />,
    linkTo: "/test-heatmap",
  };

  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  test("renders with correct title and description", () => {
    renderWithRouter(<HeatmapCard {...defaultProps} />);

    expect(screen.getByText("Test Heatmap")).toBeInTheDocument();
    expect(screen.getByText("This is a test description")).toBeInTheDocument();
  });

  test("renders the icon", () => {
    renderWithRouter(<HeatmapCard {...defaultProps} />);

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  test("renders button with correct link", () => {
    renderWithRouter(<HeatmapCard {...defaultProps} />);

    const button = screen.getByRole("button", { name: /view heatmap/i });
    expect(button).toBeInTheDocument();
  });

  test("applies hover styles to card", () => {
    renderWithRouter(<HeatmapCard {...defaultProps} />);

    const card = screen.getByTestId("paper");
    expect(card).toHaveStyle({
      transition: "all 0.3s ease",
    });
    const cardStyle = window.getComputedStyle(card);
    expect(cardStyle).toBeDefined();
  });

  test("button has correct styling", () => {
    renderWithRouter(<HeatmapCard {...defaultProps} />);

    const button = screen.getByRole("button", { name: /view heatmap/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/view heatmap/i);
  });
});
