// api.test.js - Improved with full coverage
import {
  getAllConfigurations,
  getConfiguration,
  updateConfiguration,
  getGridData,
} from "../../../src/services/api";

global.fetch = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

describe("API Utilities", () => {
  describe("getAllConfigurations", () => {
    it("should fetch all configurations successfully", async () => {
      const mockResponse = {
        configurations: [
          { id: "numberheatmap", title: "Number Heatmap" },
          { id: "timestamp", title: "Time Heatmap" },
          { id: "rangeheatmap", title: "Range Heatmap" },
        ],
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const configs = await getAllConfigurations();

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:8000/api/configurations"
      );
      expect(configs).toEqual(mockResponse);
    });

    it("should throw an error if getAllConfigurations fetch fails", async () => {
      fetch.mockResolvedValueOnce({ ok: false, status: 500 });

      await expect(getAllConfigurations()).rejects.toThrow("API error: 500");
    });

    it("should handle network errors", async () => {
      fetch.mockRejectedValueOnce(new Error("Network failure"));

      await expect(getAllConfigurations()).rejects.toThrow("Network failure");
    });
  });

  describe("getConfiguration", () => {
    it("should fetch configuration successfully", async () => {
      const mockResponse = { id: "heatmap", title: "Test Config" };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const config = await getConfiguration("heatmap");

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:8000/api/configurations/heatmap"
      );
      expect(config).toEqual(mockResponse);
    });

    it("should throw an error if fetch fails", async () => {
      fetch.mockResolvedValueOnce({ ok: false, status: 404 });

      await expect(getConfiguration("invalid")).rejects.toThrow(
        "API error: 404"
      );
    });
  });

  describe("updateConfiguration", () => {
    it("should update configuration successfully", async () => {
      const configId = "numberheatmap";
      const updates = [
        { path: "colorScheme", value: "blues" },
        { path: "displayLabels", value: true },
      ];

      const mockResponse = {
        configuration: {
          id: configId,
          colorScheme: "blues",
          displayLabels: true,
        },
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await updateConfiguration(configId, updates);

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:8000/api/configurations/numberheatmap/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if update fails", async () => {
      const configId = "numberheatmap";
      const updates = [{ path: "colorScheme", value: "invalid" }];

      fetch.mockResolvedValueOnce({ ok: false, status: 400 });

      await expect(updateConfiguration(configId, updates)).rejects.toThrow(
        "API error: 400"
      );
    });

    it("should handle network errors during update", async () => {
      fetch.mockRejectedValueOnce(new Error("Network failure during update"));

      await expect(updateConfiguration("testId", [])).rejects.toThrow(
        "Network failure during update"
      );
    });
  });

  describe("getGridData", () => {
    it("should fetch grid data with pagination", async () => {
      const mockResponse = {
        data: [{ id: 1, name: "Product A" }],
        pagination: { page: 1, pageSize: 10 },
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const data = await getGridData("heatmap", 1, 10);

      const calledUrl = fetch.mock.calls[0][0].toString();
      expect(calledUrl).toBe(
        "http://localhost:8000/api/data/heatmap?page=1&page_size=10"
      );
      expect(data).toEqual(mockResponse);
    });

    it("should use default pagination values if not provided", async () => {
      const mockResponse = {
        data: [{ id: 1, name: "Default Page" }],
        pagination: { page: 1, pageSize: 10 },
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await getGridData("heatmap");

      const calledUrl = fetch.mock.calls[0][0].toString();
      expect(calledUrl).toBe(
        "http://localhost:8000/api/data/heatmap?page=1&page_size=10"
      );
    });

    it("should throw an error if grid data fetch fails", async () => {
      fetch.mockResolvedValueOnce({ ok: false, status: 500 });

      await expect(getGridData("heatmap")).rejects.toThrow("API error: 500");
    });
  });
});
