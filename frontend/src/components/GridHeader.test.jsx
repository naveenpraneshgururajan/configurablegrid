import React from "react";
import { render, fireEvent } from "@testing-library/react";
import GridHeader from "../components/GridHeader";

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
      <GridHeader
        column={mockColumn}
        sortConfig={{ key: null, direction: "asc" }}
        onSort={jest.fn()}
      />
    );

    expect(getByText("Test Header")).toBeInTheDocument();
  });

  it("applies width style from column configuration", () => {
    const { container } = renderWithTableStructure(
      <GridHeader
        column={mockColumn}
        sortConfig={{ key: null, direction: "asc" }}
        onSort={jest.fn()}
      />
    );

    expect(container.querySelector("th")).toHaveStyle("width: 100px");
  });

  it("uses auto width when not specified", () => {
    const columnWithoutWidth = {
      field: "test",
      header: "Test Header",
    };

    const { container } = renderWithTableStructure(
      <GridHeader
        column={columnWithoutWidth}
        sortConfig={{ key: null, direction: "asc" }}
        onSort={jest.fn()}
      />
    );

    expect(container.querySelector("th")).toHaveStyle("width: auto");
  });

  it("calls onSort when header is clicked", () => {
    const onSortMock = jest.fn();

    const { getByText } = renderWithTableStructure(
      <GridHeader
        column={mockColumn}
        sortConfig={{ key: null, direction: "asc" }}
        onSort={onSortMock}
      />
    );

    fireEvent.click(getByText("Test Header"));
    expect(onSortMock).toHaveBeenCalledWith("test");
  });

  it("shows ascending sort indicator when sorted ascending", () => {
    const { getByText } = renderWithTableStructure(
      <GridHeader
        column={mockColumn}
        sortConfig={{ key: "test", direction: "asc" }}
        onSort={jest.fn()}
      />
    );

    expect(getByText("▲")).toBeInTheDocument();
  });

  it("shows descending sort indicator when sorted descending", () => {
    const { getByText } = renderWithTableStructure(
      <GridHeader
        column={mockColumn}
        sortConfig={{ key: "test", direction: "desc" }}
        onSort={jest.fn()}
      />
    );

    expect(getByText("▼")).toBeInTheDocument();
  });

  it("does not show sort indicator when not sorted", () => {
    const { container } = renderWithTableStructure(
      <GridHeader
        column={mockColumn}
        sortConfig={{ key: "other", direction: "asc" }}
        onSort={jest.fn()}
      />
    );

    expect(container.querySelector(".sort-indicator")).toBeNull();
  });

  it("adds sorted class when column is sorted", () => {
    const { container } = renderWithTableStructure(
      <GridHeader
        column={mockColumn}
        sortConfig={{ key: "test", direction: "asc" }}
        onSort={jest.fn()}
      />
    );

    expect(container.querySelector("th")).toHaveClass("sorted");
  });

  it("does not add sorted class when column is not sorted", () => {
    const { container } = renderWithTableStructure(
      <GridHeader
        column={mockColumn}
        sortConfig={{ key: "other", direction: "asc" }}
        onSort={jest.fn()}
      />
    );

    expect(container.querySelector("th")).not.toHaveClass("sorted");
  });
});
