import React from "react";
import { render, fireEvent } from "@testing-library/react";
import GridHeader from "../../../../src/components/grid/GridHeader";

describe("GridHeader", () => {
  const mockColumn = {
    field: "test",
    header: "Test Header",
    width: "100px",
  };

  // Helper function to render GridHeader within proper table structure
  const renderWithTableStructure = (ui) => {
    return render(
      <table>
        <thead>
          <tr>{ui}</tr>
        </thead>
      </table>
    );
  };

  it("renders header with correct text", () => {
    const { getByText } = renderWithTableStructure(
      <GridHeader column={mockColumn} />
    );

    expect(getByText("Test Header")).toBeInTheDocument();
  });

  it("applies width style from column configuration", () => {
    const { container } = renderWithTableStructure(
      <GridHeader column={mockColumn} />
    );

    expect(container.querySelector("th")).toHaveStyle("width: 100px");
  });

  it("uses auto width when not specified", () => {
    const columnWithoutWidth = {
      field: "test",
      header: "Test Header",
    };

    const { container } = renderWithTableStructure(
      <GridHeader column={columnWithoutWidth} />
    );

    expect(container.querySelector("th")).toHaveStyle("width: auto");
  });
});
