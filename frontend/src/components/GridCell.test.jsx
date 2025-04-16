import React from "react";
import { render } from "@testing-library/react";
import GridCell from "../components/GridCell";
import {
  getHeatmapColor,
  getRangeStyle,
  getCellValueStyle,
} from "../utils/styleHelpers";
import { formatCellValue } from "../utils/formatters";

// Mock the utility functions
jest.mock("../utils/styleHelpers", () => ({
  getHeatmapColor: jest.fn(),
  getRangeStyle: jest.fn(),
  getCellValueStyle: jest.fn(),
}));

jest.mock("../utils/formatters", () => ({
  formatCellValue: jest.fn((value) => value?.toString() || ""),
}));

// Helper function to render GridCell within a table structure
const renderWithTableStructure = (ui) => {
  return render(
    <table>
      <tbody>
        <tr>{ui}</tr>
      </tbody>
    </table>
  );
};

describe("GridCell", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock returns
    getHeatmapColor.mockReturnValue("rgb(200, 200, 200)");
    getRangeStyle.mockReturnValue({ backgroundColor: "yellow" });
    getCellValueStyle.mockReturnValue({ fontWeight: "bold" });
    formatCellValue.mockImplementation((value) => value?.toString() || "");
  });

  it("renders cell with formatted value", () => {
    const { getByText } = renderWithTableStructure(
      <GridCell
        value="test value"
        column={{ field: "test", header: "Test" }}
        row={{ id: 1, test: "test value" }}
        cellStyles={[]}
      />
    );

    expect(getByText("test value")).toBeInTheDocument();
    expect(formatCellValue).toHaveBeenCalledWith("test value", "test");
  });

  it("applies number heatmap styling", () => {
    const column = {
      field: "value",
      header: "Value",
      style: {
        type: "numberheatmap",
        min: 0,
        max: 100,
        invertColor: false,
      },
    };

    const { container } = renderWithTableStructure(
      <GridCell
        value={75}
        column={column}
        row={{ id: 1, value: 75 }}
        cellStyles={[]}
      />
    );

    expect(getHeatmapColor).toHaveBeenCalledWith(75, 0, 100, false);
    expect(container.querySelector("td")).toHaveStyle(
      "background-color: rgb(200, 200, 200)"
    );
  });

  it("applies range heatmap styling", () => {
    const column = {
      field: "value",
      header: "Value",
      style: {
        type: "rangeheatmap",
        ranges: [
          { min: 0, max: 30, color: "red" },
          { min: 31, max: 70, color: "yellow" },
          { min: 71, max: 100, color: "green" },
        ],
      },
    };

    const { container } = renderWithTableStructure(
      <GridCell
        value={50}
        column={column}
        row={{ id: 1, value: 50 }}
        cellStyles={[]}
      />
    );

    expect(getRangeStyle).toHaveBeenCalledWith(50, column.style.ranges);
    expect(container.querySelector("td")).toHaveStyle(
      "background-color: yellow"
    );
  });

  it("applies cell-specific styling", () => {
    const cellStyles = [
      {
        field: "status",
        conditions: [
          { value: "active", style: { color: "green" } },
          { value: "inactive", style: { color: "red" } },
        ],
      },
    ];

    const { container } = renderWithTableStructure(
      <GridCell
        value="active"
        column={{ field: "status", header: "Status" }}
        row={{ id: 1, status: "active" }}
        cellStyles={cellStyles}
      />
    );

    expect(getCellValueStyle).toHaveBeenCalled();
    expect(container.querySelector("td")).toHaveStyle("font-weight: bold");
  });

  it("combines multiple styles", () => {
    const column = {
      field: "value",
      header: "Value",
      style: {
        type: "numberheatmap",
        min: 0,
        max: 100,
      },
    };

    const cellStyles = [
      {
        field: "value",
        conditions: [{ min: 70, style: { fontWeight: "bold" } }],
      },
    ];

    const { container } = renderWithTableStructure(
      <GridCell
        value={75}
        column={column}
        row={{ id: 1, value: 75 }}
        cellStyles={cellStyles}
      />
    );

    expect(getHeatmapColor).toHaveBeenCalled();
    expect(getCellValueStyle).toHaveBeenCalled();
    expect(container.querySelector("td")).toHaveStyle({
      backgroundColor: "rgb(200, 200, 200)",
      fontWeight: "bold",
    });
  });

  it("handles null values", () => {
    const { container } = renderWithTableStructure(
      <GridCell
        value={null}
        column={{ field: "test", header: "Test" }}
        row={{ id: 1, test: null }}
        cellStyles={[]}
      />
    );

    expect(container.querySelector("td")).toHaveTextContent("");
    expect(formatCellValue).toHaveBeenCalledWith(null, "test");
  });
});
