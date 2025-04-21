import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RangeHeatmapSettings from "../../../../src/pages/SettingsPage/RangeHeatmapSettings";

describe("RangeHeatmapSettings", () => {
  const mockConfiguration = {
    columns: [
      {
        field: "cpu",
        style: {
          ranges: [
            { min: 0, max: 60, style: { color: "#008000" } },
            { min: 60, max: 85, style: { color: "#FFA500" } },
            { min: 85, max: 100, style: { color: "#FF0000" } },
          ],
        },
      },
      {
        field: "memory",
        style: {
          ranges: [
            { min: 0, max: 60, style: { color: "#008000" } },
            { min: 60, max: 85, style: { color: "#FFA500" } },
            { min: 85, max: 100, style: { color: "#FF0000" } },
          ],
        },
      },
    ],
  };

  const mockOnChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders nothing when no configuration is provided", () => {
    const { container } = render(
      <RangeHeatmapSettings onChange={mockOnChange} />
    );
    expect(container.firstChild).toBeNull();
  });

  test("renders all settings sections when configuration is provided", () => {
    render(
      <RangeHeatmapSettings
        configuration={mockConfiguration}
        onChange={mockOnChange}
      />
    );

    // Check main headings
    expect(screen.getByText("CPU Usage Ranges")).toBeInTheDocument();
    expect(screen.getByText("Memory Usage Ranges")).toBeInTheDocument();

    // Check range headings for CPU
    const cpuLowRanges = screen.getAllByText("Low Range (Green)");
    const cpuMedRanges = screen.getAllByText("Medium Range (Orange)");
    const cpuHighRanges = screen.getAllByText("High Range (Red)");

    expect(cpuLowRanges.length).toBe(2); // One for CPU, one for Memory
    expect(cpuMedRanges.length).toBe(2);
    expect(cpuHighRanges.length).toBe(2);
  });

  test("renders input fields with correct default values for CPU", () => {
    render(
      <RangeHeatmapSettings
        configuration={mockConfiguration}
        onChange={mockOnChange}
      />
    );

    // CPU Low Range
    const cpuLowMinInput = document.getElementById("cpu-low-min");
    const cpuLowMaxInput = document.getElementById("cpu-low-max");
    const cpuLowColorInput = document.getElementById("cpu-low-color");

    expect(cpuLowMinInput.value).toBe("0");
    expect(cpuLowMaxInput.value).toBe("60");
    expect(cpuLowColorInput.value).toBe("#008000");

    // CPU Medium Range
    const cpuMedMinInput = document.getElementById("cpu-med-min");
    const cpuMedMaxInput = document.getElementById("cpu-med-max");
    const cpuMedColorInput = document.getElementById("cpu-med-color");

    expect(cpuMedMinInput.value).toBe("60");
    expect(cpuMedMaxInput.value).toBe("85");
    expect(cpuMedColorInput.value).toBe("#ffa500");

    // CPU High Range
    const cpuHighMinInput = document.getElementById("cpu-high-min");
    const cpuHighMaxInput = document.getElementById("cpu-high-max");
    const cpuHighColorInput = document.getElementById("cpu-high-color");

    expect(cpuHighMinInput.value).toBe("85");
    expect(cpuHighMaxInput.value).toBe("100");
    expect(cpuHighColorInput.value).toBe("#ff0000");
  });

  test("renders input fields with correct default values for Memory", () => {
    render(
      <RangeHeatmapSettings
        configuration={mockConfiguration}
        onChange={mockOnChange}
      />
    );

    // Memory Low Range
    const memLowMinInput = document.getElementById("mem-low-min");
    const memLowMaxInput = document.getElementById("mem-low-max");
    const memLowColorInput = document.getElementById("mem-low-color");

    expect(memLowMinInput.value).toBe("0");
    expect(memLowMaxInput.value).toBe("60");
    expect(memLowColorInput.value).toBe("#008000");

    // Memory Medium Range
    const memMedMinInput = document.getElementById("mem-med-min");
    const memMedMaxInput = document.getElementById("mem-med-max");
    const memMedColorInput = document.getElementById("mem-med-color");

    expect(memMedMinInput.value).toBe("60");
    expect(memMedMaxInput.value).toBe("85");
    expect(memMedColorInput.value).toBe("#ffa500");

    // Memory High Range
    const memHighMinInput = document.getElementById("mem-high-min");
    const memHighMaxInput = document.getElementById("mem-high-max");
    const memHighColorInput = document.getElementById("mem-high-color");

    expect(memHighMinInput.value).toBe("85");
    expect(memHighMaxInput.value).toBe("100");
    expect(memHighColorInput.value).toBe("#ff0000");
  });

  test("calls onChange handler when input values change", () => {
    render(
      <RangeHeatmapSettings
        configuration={mockConfiguration}
        onChange={mockOnChange}
      />
    );

    // Change CPU low range min value
    const cpuLowMinInput = document.getElementById("cpu-low-min");
    fireEvent.change(cpuLowMinInput, { target: { value: "5" } });
    expect(mockOnChange).toHaveBeenCalled();

    // Change Memory high range color
    const memHighColorInput = document.getElementById("mem-high-color");
    fireEvent.change(memHighColorInput, { target: { value: "#990000" } });
    expect(mockOnChange).toHaveBeenCalledTimes(2);
  });

  test("uses fallback values when configuration fields are missing or incomplete", () => {
    const incompleteConfig = {
      columns: [
        { field: "cpu", style: { ranges: [] } },
        {
          field: "memory",
          style: {
            ranges: [{ min: 10, style: {} }, {}, { max: 95 }],
          },
        },
      ],
    };

    render(
      <RangeHeatmapSettings
        configuration={incompleteConfig}
        onChange={mockOnChange}
      />
    );

    // CPU should use all default values
    const cpuLowMinInput = document.getElementById("cpu-low-min");
    expect(cpuLowMinInput.value).toBe("0");

    // Memory should use mix of provided and default values
    const memLowMinInput = document.getElementById("mem-low-min");
    const memHighMaxInput = document.getElementById("mem-high-max");

    expect(memLowMinInput.value).toBe("10");
    expect(memHighMaxInput.value).toBe("95");
  });
});
