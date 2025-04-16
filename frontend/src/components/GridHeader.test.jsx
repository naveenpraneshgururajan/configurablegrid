// Updated GridHeader.test.jsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import GridHeader from "../components/GridHeader"; // Update path as needed

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

  test("renders header with correct text", () => {
    const { getByText } = renderWithTableStructure(
      <GridHeader
        column={mockColumn}
        sortConfig={{ key: null, direction: "asc" }}
        onSort={jest.fn()}
      />
    );

    expect(getByText("Test Header")).toBeInTheDocument();
  });

  test("applies width style from column configuration", () => {
    const { container } = renderWithTableStructure(
      <GridHeader
        column={mockColumn}
        sortConfig={{ key: null, direction: "asc" }}
        onSort={jest.fn()}
      />
    );

    expect(container.querySelector("th")).toHaveStyle("width: 100px");
  });

  test("uses auto width when not specified", () => {
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

  test("calls onSort when header is clicked", () => {
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

  test("shows ascending sort indicator when sorted ascending", () => {
    const { getByText } = renderWithTableStructure(
      <GridHeader
        column={mockColumn}
        sortConfig={{ key: "test", direction: "asc" }}
        onSort={jest.fn()}
      />
    );

    expect(getByText("▲")).toBeInTheDocument();
  });

  test("shows descending sort indicator when sorted descending", () => {
    const { getByText } = renderWithTableStructure(
      <GridHeader
        column={mockColumn}
        sortConfig={{ key: "test", direction: "desc" }}
        onSort={jest.fn()}
      />
    );

    expect(getByText("▼")).toBeInTheDocument();
  });

  test("does not show sort indicator when not sorted", () => {
    const { container } = renderWithTableStructure(
      <GridHeader
        column={mockColumn}
        sortConfig={{ key: "other", direction: "asc" }}
        onSort={jest.fn()}
      />
    );

    expect(container.querySelector(".sort-indicator")).toBeNull();
  });

  test("adds sorted class when column is sorted", () => {
    const { container } = renderWithTableStructure(
      <GridHeader
        column={mockColumn}
        sortConfig={{ key: "test", direction: "asc" }}
        onSort={jest.fn()}
      />
    );

    expect(container.querySelector("th")).toHaveClass("sorted");
  });

  test("does not add sorted class when column is not sorted", () => {
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
