import { getConfiguration, getGridData } from "../services/api";

global.fetch = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

describe("API Utilities", () => {
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

    it("should throw an error if grid data fetch fails", async () => {
      fetch.mockResolvedValueOnce({ ok: false, status: 500 });

      await expect(getGridData("heatmap")).rejects.toThrow("API error: 500");
    });
  });
});
