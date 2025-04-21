import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TimeHeatmapSettings from "../../../../src/pages/SettingsPage/TimeHeatmapSettings";

describe("TimeHeatmapSettings", () => {
  const mockConfiguration = {
    columns: [{ field: "age", style: { min: 5, max: 45 } }],
  };

  const mockOnChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders nothing when no configuration is provided", () => {
    const { container } = render(
      <TimeHeatmapSettings onChange={mockOnChange} />
    );
    expect(container.firstChild).toBeNull();
  });

  test("renders settings section when configuration is provided", () => {
    render(
      <TimeHeatmapSettings
        configuration={mockConfiguration}
        onChange={mockOnChange}
      />
    );

    // Check heading
    expect(screen.getByText("Days Settings")).toBeInTheDocument();
  });

  test("renders input fields with correct default values", () => {
    render(
      <TimeHeatmapSettings
        configuration={mockConfiguration}
        onChange={mockOnChange}
      />
    );

    // Check input fields
    const minDaysInput = screen.getByLabelText("Min Days");
    const maxDaysInput = screen.getByLabelText("Max Days");

    expect(minDaysInput.value).toBe("5");
    expect(maxDaysInput.value).toBe("45");
  });

  test("calls onChange handler when input values change", () => {
    render(
      <TimeHeatmapSettings
        configuration={mockConfiguration}
        onChange={mockOnChange}
      />
    );

    // Change min days value
    const minDaysInput = screen.getByLabelText("Min Days");
    fireEvent.change(minDaysInput, { target: { value: "10" } });
    expect(mockOnChange).toHaveBeenCalled();

    // Change max days value
    const maxDaysInput = screen.getByLabelText("Max Days");
    fireEvent.change(maxDaysInput, { target: { value: "60" } });
    expect(mockOnChange).toHaveBeenCalledTimes(2);
  });

  test("uses fallback values when configuration is incomplete", () => {
    const incompleteConfig = {
      columns: [{ field: "age" }],
    };

    render(
      <TimeHeatmapSettings
        configuration={incompleteConfig}
        onChange={mockOnChange}
      />
    );

    // Check that fallback values are used
    const minDaysInput = screen.getByLabelText("Min Days");
    const maxDaysInput = screen.getByLabelText("Max Days");

    expect(minDaysInput.value).toBe("0");
    expect(maxDaysInput.value).toBe("30");
  });

  test("uses fallback values when age column is missing", () => {
    const missingColumnConfig = {
      columns: [{ field: "other", style: { min: 10, max: 50 } }],
    };

    render(
      <TimeHeatmapSettings
        configuration={missingColumnConfig}
        onChange={mockOnChange}
      />
    );

    // Check that fallback values are used
    const minDaysInput = screen.getByLabelText("Min Days");
    const maxDaysInput = screen.getByLabelText("Max Days");

    expect(minDaysInput.value).toBe("0");
    expect(maxDaysInput.value).toBe("30");
  });

  test("handles partial style configuration", () => {
    const partialStyleConfig = {
      columns: [{ field: "age", style: { min: 15 } }],
    };

    render(
      <TimeHeatmapSettings
        configuration={partialStyleConfig}
        onChange={mockOnChange}
      />
    );

    // Check that provided and fallback values are used
    const minDaysInput = screen.getByLabelText("Min Days");
    const maxDaysInput = screen.getByLabelText("Max Days");

    expect(minDaysInput.value).toBe("15");
    expect(maxDaysInput.value).toBe("30");
  });
});
