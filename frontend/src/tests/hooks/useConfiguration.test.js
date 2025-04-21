// useConfigurations.test.js
import { renderHook, act } from "@testing-library/react";
import { useConfigurations } from "../../../src/hooks/useConfigurations";
import * as apiService from "../../../src/services/api";

// Mock the API service
jest.mock("../../../src/services/api", () => ({
  getAllConfigurations: jest.fn(),
  updateConfiguration: jest.fn(),
}));

// Mock MUI components
jest.mock("@mui/material", () => ({
  Snackbar: ({ children }) => <div data-testid="snackbar">{children}</div>,
  Alert: ({ children, severity }) => (
    <div data-testid="alert" data-severity={severity}>
      {children}
    </div>
  ),
}));

describe("useConfigurations Hook", () => {
  const mockConfigurations = {
    configurations: [
      { id: "numberheatmap", title: "Number Heatmap", colorScheme: "blues" },
      { id: "timestamp", title: "Time Heatmap", timeFormat: "24h" },
      {
        id: "rangeheatmap",
        title: "Range Heatmap",
        minValue: 0,
        maxValue: 100,
      },
    ],
  };

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Default mock implementation
    apiService.getAllConfigurations.mockResolvedValue(mockConfigurations);
    apiService.updateConfiguration.mockResolvedValue({
      configuration: { id: "numberheatmap", colorScheme: "reds" },
    });

    // Mock window.location
    delete window.location;
    window.location = { pathname: "/" };

    // Mock window event listeners
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
  });

  it("should fetch configurations on mount", async () => {
    const { result } = renderHook(() => useConfigurations());

    // Initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.configurations).toEqual({
      numberheatmap: null,
      timestamp: null,
      rangeheatmap: null,
    });

    // Wait for the useEffect to complete
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // After loading
    expect(apiService.getAllConfigurations).toHaveBeenCalledTimes(1);
    expect(result.current.loading).toBe(false);
    expect(result.current.configurations).toEqual({
      numberheatmap: mockConfigurations.configurations[0],
      timestamp: mockConfigurations.configurations[1],
      rangeheatmap: mockConfigurations.configurations[2],
    });
  });

  it("should handle API errors when fetching configurations", async () => {
    apiService.getAllConfigurations.mockRejectedValueOnce(
      new Error("API Error")
    );

    const { result } = renderHook(() => useConfigurations());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.configurations).toEqual({
      numberheatmap: null,
      timestamp: null,
      rangeheatmap: null,
    });
    expect(result.current.snackbar.open).toBe(true);
    expect(result.current.snackbar.message).toBe(
      "Failed to load configurations"
    );
    expect(result.current.snackbar.severity).toBe("error");
  });

  it("should determine currentHeatmapType based on URL", async () => {
    window.location.pathname = "/numberheatmap";

    const { result } = renderHook(() => useConfigurations());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.currentHeatmapType).toBe("numberheatmap");

    // Test the event listener
    const locationChangeHandler = window.addEventListener.mock.calls.find(
      (call) => call[0] === "popstate"
    )[1];

    // Simulate URL change
    window.location.pathname = "/timeheatmap";
    await act(async () => {
      locationChangeHandler();
    });

    expect(result.current.currentHeatmapType).toBe("timestamp");
  });

  it("should update configuration successfully", async () => {
    const { result } = renderHook(() => useConfigurations());

    // Wait for initial data loading
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const updates = [{ path: "colorScheme", value: "reds" }];

    await act(async () => {
      await result.current.updateConfiguration("numberheatmap", updates);
    });

    expect(apiService.updateConfiguration).toHaveBeenCalledWith(
      "numberheatmap",
      updates
    );
    expect(result.current.configurations.numberheatmap).toEqual({
      id: "numberheatmap",
      colorScheme: "reds",
    });
    expect(result.current.snackbar.open).toBe(true);
    expect(result.current.snackbar.message).toBe(
      "Settings updated successfully"
    );
    expect(result.current.snackbar.severity).toBe("success");
  });

  it("should handle API errors when updating configuration", async () => {
    apiService.updateConfiguration.mockRejectedValueOnce(
      new Error("Update Failed")
    );

    const { result } = renderHook(() => useConfigurations());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const updates = [{ path: "colorScheme", value: "invalid" }];

    await act(async () => {
      try {
        await result.current.updateConfiguration("numberheatmap", updates);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.snackbar.open).toBe(true);
    expect(result.current.snackbar.message).toBe(
      "Failed to update settings: Update Failed"
    );
    expect(result.current.snackbar.severity).toBe("error");
  });

  it("should validate updates before sending to API", async () => {
    const { result } = renderHook(() => useConfigurations());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await act(async () => {
      try {
        await result.current.updateConfiguration("numberheatmap", null);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(apiService.updateConfiguration).not.toHaveBeenCalled();
    expect(result.current.snackbar.message).toBe(
      "Failed to update settings: Invalid update format"
    );
  });

  it("should close snackbar when handleCloseSnackbar is called", async () => {
    const { result } = renderHook(() => useConfigurations());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // First make the snackbar appear
    await act(async () => {
      try {
        await result.current.updateConfiguration("numberheatmap", null);
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.snackbar.open).toBe(true);

    // Now close it
    act(() => {
      result.current.handleCloseSnackbar();
    });

    expect(result.current.snackbar.open).toBe(false);
  });

  it("should refresh configurations when refreshConfigurations is called", async () => {
    const { result } = renderHook(() => useConfigurations());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Clear the mock calls count
    apiService.getAllConfigurations.mockClear();

    // Update the mock to return different data
    const updatedConfigs = {
      configurations: [
        {
          id: "numberheatmap",
          title: "Updated Number Heatmap",
          colorScheme: "greens",
        },
        { id: "timestamp", title: "Updated Time Heatmap", timeFormat: "12h" },
        {
          id: "rangeheatmap",
          title: "Updated Range Heatmap",
          minValue: 10,
          maxValue: 90,
        },
      ],
    };
    apiService.getAllConfigurations.mockResolvedValueOnce(updatedConfigs);

    await act(async () => {
      await result.current.refreshConfigurations();
    });

    expect(apiService.getAllConfigurations).toHaveBeenCalledTimes(1);
    expect(result.current.configurations).toEqual({
      numberheatmap: updatedConfigs.configurations[0],
      timestamp: updatedConfigs.configurations[1],
      rangeheatmap: updatedConfigs.configurations[2],
    });
  });

  it("should handle API errors when refreshing configurations", async () => {
    const { result } = renderHook(() => useConfigurations());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    apiService.getAllConfigurations.mockRejectedValueOnce(
      new Error("Refresh Failed")
    );

    await act(async () => {
      try {
        await result.current.refreshConfigurations();
      } catch (error) {
        // Expected to throw
      }
    });

    expect(result.current.snackbar.open).toBe(true);
    expect(result.current.snackbar.message).toBe(
      "Failed to refresh configurations"
    );
    expect(result.current.snackbar.severity).toBe("error");
  });

  it("should clean up event listener on unmount", async () => {
    const { unmount } = renderHook(() => useConfigurations());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    unmount();

    // Verify the event listener was removed
    expect(window.removeEventListener).toHaveBeenCalledWith(
      "popstate",
      expect.any(Function)
    );
  });
});
