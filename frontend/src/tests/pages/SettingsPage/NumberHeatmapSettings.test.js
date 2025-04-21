import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NumberHeatmapSettings from "../../../../src/pages/SettingsPage/NumberHeatmapSettings";

describe("NumberHeatmapSettings", () => {
  const mockConfiguration = {
    columns: [
      { field: "sales", style: { min: 100, max: 5000 } },
      { field: "revenue", style: { min: 1000, max: 100000 } },
      { field: "profit", style: { min: 10, max: 90 } },
    ],
  };

  const mockOnChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders nothing when no configuration is provided", () => {
    const { container } = render(
      <NumberHeatmapSettings onChange={mockOnChange} />
    );
    expect(container.firstChild).toBeNull();
  });

  test("renders all settings sections when configuration is provided", () => {
    render(
      <NumberHeatmapSettings
        configuration={mockConfiguration}
        onChange={mockOnChange}
      />
    );

    // Check headings
    expect(screen.getByText("Sales Settings")).toBeInTheDocument();
    expect(screen.getByText("Revenue Settings")).toBeInTheDocument();
    expect(screen.getByText("Profit Settings")).toBeInTheDocument();
  });

  test("renders input fields with correct default values", () => {
    render(
      <NumberHeatmapSettings
        configuration={mockConfiguration}
        onChange={mockOnChange}
      />
    );

    // Access elements by their HTML ID attribute instead of test ID or label
    // Sales inputs
    const salesMin = document.getElementById("sales-min");
    const salesMax = document.getElementById("sales-max");
    expect(salesMin.value).toBe("100");
    expect(salesMax.value).toBe("5000");

    // Revenue inputs
    const revenueMin = document.getElementById("revenue-min");
    const revenueMax = document.getElementById("revenue-max");
    expect(revenueMin.value).toBe("1000");
    expect(revenueMax.value).toBe("100000");

    // Profit inputs
    const profitMin = document.getElementById("profit-min");
    const profitMax = document.getElementById("profit-max");
    expect(profitMin.value).toBe("10");
    expect(profitMax.value).toBe("90");
  });

  test("calls onChange handler when input values change", () => {
    render(
      <NumberHeatmapSettings
        configuration={mockConfiguration}
        onChange={mockOnChange}
      />
    );

    // Change sales min value
    const salesMinInput = document.getElementById("sales-min");
    fireEvent.change(salesMinInput, { target: { value: "200" } });
    expect(mockOnChange).toHaveBeenCalled();

    // Change revenue max value
    const revenueMaxInput = document.getElementById("revenue-max");
    fireEvent.change(revenueMaxInput, { target: { value: "150000" } });
    expect(mockOnChange).toHaveBeenCalledTimes(2);

    // Change profit min value
    const profitMinInput = document.getElementById("profit-min");
    fireEvent.change(profitMinInput, { target: { value: "20" } });
    expect(mockOnChange).toHaveBeenCalledTimes(3);
  });

  test("uses fallback values when configuration fields are missing styles", () => {
    const incompleteConfig = {
      columns: [
        { field: "sales" },
        { field: "revenue", style: {} },
        { field: "profit", style: { min: 5 } },
      ],
    };

    render(
      <NumberHeatmapSettings
        configuration={incompleteConfig}
        onChange={mockOnChange}
      />
    );

    // Check that fallback values are used
    const salesMin = document.getElementById("sales-min");
    const salesMax = document.getElementById("sales-max");
    expect(salesMin.value).toBe("0");
    expect(salesMax.value).toBe("1000");

    const revenueMin = document.getElementById("revenue-min");
    const revenueMax = document.getElementById("revenue-max");
    expect(revenueMin.value).toBe("0");
    expect(revenueMax.value).toBe("50000");

    const profitMin = document.getElementById("profit-min");
    const profitMax = document.getElementById("profit-max");
    expect(profitMin.value).toBe("5");
    expect(profitMax.value).toBe("100");
  });
});
