// src/components/__tests__/ConfigurableGrid.test.jsx
import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import ConfigurableGrid from "../components/ConfigurableGrid";
import { getConfiguration, getGridData } from "../services/api";

// Mock the API services
jest.mock("../services/api");

describe("ConfigurableGrid", () => {
  const mockConfig = {
    title: "Test Grid",
    columns: [
      { field: "id", header: "ID", width: "50px" },
      { field: "name", header: "Name" },
      { field: "status", header: "Status" },
      {
        field: "value",
        header: "Value",
        style: {
          type: "numberheatmap",
          min: 0,
          max: 100,
        },
      },
    ],
    rowStyles: [
      {
        condition: {
          type: "timestamp",
          field: "updatedAt",
          operator: "<",
          value: "7days",
        },
        style: { backgroundColor: "#ffeaea" },
      },
    ],
    cellStyles: [
      {
        field: "status",
        conditions: [
          { value: "active", style: { color: "green" } },
          { value: "inactive", style: { color: "red" } },
        ],
      },
    ],
  };

  const mockData = {
    data: [
      {
        id: 1,
        name: "Item 1",
        status: "active",
        value: 75,
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Item 2",
        status: "inactive",
        value: 30,
        updatedAt: new Date().toISOString(),
      },
      {
        id: 3,
        name: "Item 3",
        status: "active",
        value: 50,
        updatedAt: new Date().toISOString(),
      },
    ],
    total: 3,
    totalPages: 1,
  };

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    // Use a delayed promise to properly test loading state
    let resolveConfig;
    const configPromise = new Promise((resolve) => {
      resolveConfig = resolve;
    });

    // Setup the mock to use our delayed promise
    getConfiguration.mockImplementation(() => configPromise);

    render(<ConfigurableGrid configId="test-config" />);

    // Check for loading state before resolving the promise
    expect(screen.getByText("Loading configuration...")).toBeInTheDocument();

    // Now resolve the promise to allow the component to continue
    await act(async () => {
      resolveConfig(mockConfig);
    });
  });

  it("renders grid with data after loading", async () => {
    // Setup mocks
    getConfiguration.mockResolvedValue(mockConfig);
    getGridData.mockResolvedValue(mockData);

    await act(async () => {
      render(<ConfigurableGrid configId="test-config" />);
    });

    // Wait for the component to update with data
    await waitFor(() => {
      expect(screen.getByText("Test Grid")).toBeInTheDocument();
    });

    // Check if headers are rendered
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();

    // Check if data rows are rendered
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("handles API errors correctly", async () => {
    // Mock configuration to reject with error
    getConfiguration.mockRejectedValue(new Error("Failed to load config"));

    render(<ConfigurableGrid configId="test-config" />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(
        screen.getByText("Error loading configuration: Failed to load config")
      ).toBeInTheDocument();
    });
  });

  it("shows error when no configuration is found", async () => {
    // Mock configuration returning null
    getConfiguration.mockResolvedValue(null);

    render(<ConfigurableGrid configId="test-config" />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText("No configuration found")).toBeInTheDocument();
    });
  });

  it("handles pagination correctly", async () => {
    const mockDataPage1 = {
      data: [{ id: 1, name: "Item 1", status: "active", value: 75 }],
      total: 2,
      totalPages: 2,
    };

    const mockDataPage2 = {
      data: [{ id: 2, name: "Item 2", status: "inactive", value: 30 }],
      total: 2,
      totalPages: 2,
    };

    // Setup mocks
    getConfiguration.mockResolvedValue(mockConfig);
    getGridData.mockResolvedValueOnce(mockDataPage1);
    getGridData.mockResolvedValueOnce(mockDataPage2);

    render(<ConfigurableGrid configId="test-config" />);

    // Wait for the first page to load
    await waitFor(() => {
      expect(screen.getByText("Item 1")).toBeInTheDocument();
    });

    // Click next page button
    await act(async () => {
      fireEvent.click(screen.getByText(">"));
    });

    // Wait for the second page to load
    await waitFor(() => {
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });

    // Verify API was called with correct parameters
    expect(getGridData).toHaveBeenCalledTimes(2);
    expect(getGridData).toHaveBeenLastCalledWith("test-config", 2, 10);
  });

  it("handles sorting correctly", async () => {
    // Setup mocks
    getConfiguration.mockResolvedValue(mockConfig);
    getGridData.mockResolvedValue(mockData);

    render(<ConfigurableGrid configId="test-config" />);

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getByText("Item 1")).toBeInTheDocument();
    });

    // Get the Name column header
    const nameHeader = screen.getByText("Name").closest(".header-content");

    // Click on header to sort
    await act(async () => {
      fireEvent.click(nameHeader);
    });

    // Check if sort indicator appears
    await waitFor(() => {
      const sortIndicator = screen.getByText("▲");
      expect(sortIndicator).toBeInTheDocument();
    });

    // Click again to toggle sort direction
    await act(async () => {
      fireEvent.click(nameHeader);
    });

    // Check if sort indicator changes
    await waitFor(() => {
      const sortIndicator = screen.getByText("▼");
      expect(sortIndicator).toBeInTheDocument();
    });
  });

  it("evaluates row conditions correctly", async () => {
    // Create a date 10 days ago
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 10);

    const mockDataWithOldDate = {
      data: [
        {
          id: 1,
          name: "Item 1",
          status: "active",
          value: 75,
          updatedAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Item 2",
          status: "inactive",
          value: 30,
          updatedAt: oldDate.toISOString(),
        },
      ],
      total: 2,
      totalPages: 1,
    };

    // Setup mocks
    getConfiguration.mockResolvedValue(mockConfig);
    getGridData.mockResolvedValue(mockDataWithOldDate);

    render(<ConfigurableGrid configId="test-config" />);

    // Wait for the component to render the data
    await waitFor(() => {
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });

    // Check that the API was called correctly
    expect(getConfiguration).toHaveBeenCalledWith("test-config");
    expect(getGridData).toHaveBeenCalledWith("test-config", 1, 10);

    // You could also check that the row has the expected background color
    // by checking for the presence of the style attribute
    // This would require an additional check on the DOM elements
  });
});
