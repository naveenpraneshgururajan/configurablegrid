import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavLink from "./NavLink";
import HomeIcon from "@mui/icons-material/Home";

// Mock Material UI Button component
jest.mock("@mui/material", () => ({
  Button: ({ children, sx, startIcon, ...props }) => (
    <button
      data-testid="button"
      data-active={sx?.color === "primary.main" ? "true" : "false"}
      data-color={sx?.color || "default"}
      data-border-bottom={sx?.borderBottom || "none"}
      data-border-color={sx?.borderColor || "none"}
      {...props}
    >
      {startIcon && <span data-testid="button-icon">{startIcon}</span>}
      {children}
    </button>
  ),
}));

// Mock HomeIcon
jest.mock("@mui/icons-material/Home", () => {
  return function MockHomeIcon() {
    return <div data-testid="home-icon">HomeIcon</div>;
  };
});

describe("NavLink Component", () => {
  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  test("renders with correct text and link", () => {
    renderWithRouter(
      <NavLink to="/home" icon={<HomeIcon />}>
        Home
      </NavLink>
    );

    const linkElement = screen.getByTestId("button");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Home");
    expect(linkElement).toHaveAttribute("to", "/home");
  });

  test("applies active styles when isActive is true", () => {
    renderWithRouter(
      <NavLink to="/home" icon={<HomeIcon />} isActive={true}>
        Home
      </NavLink>
    );

    const linkElement = screen.getByTestId("button");
    expect(linkElement).toHaveAttribute("data-active", "true");
    expect(linkElement).toHaveAttribute("data-color", "primary.main");
    expect(linkElement).toHaveAttribute("data-border-bottom", "2px solid");
    expect(linkElement).toHaveAttribute("data-border-color", "primary.main");
  });

  test("applies inactive styles when isActive is false", () => {
    renderWithRouter(
      <NavLink to="/home" icon={<HomeIcon />} isActive={false}>
        Home
      </NavLink>
    );

    const linkElement = screen.getByTestId("button");
    expect(linkElement).toHaveAttribute("data-active", "false");
    expect(linkElement).toHaveAttribute("data-color", "text.secondary");
    expect(linkElement).toHaveAttribute(
      "data-border-bottom",
      "2px solid transparent"
    );
    expect(linkElement).toHaveAttribute("data-border-color", "transparent");
  });

  test("renders with icon", () => {
    renderWithRouter(
      <NavLink to="/home" icon={<HomeIcon />}>
        Home
      </NavLink>
    );

    const iconElement = screen.getByTestId("button-icon");
    expect(iconElement).toBeInTheDocument();
    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
  });
});
