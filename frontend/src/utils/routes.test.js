import { routes, navRoutes } from "./routes";

describe("routes", () => {
  test("routes object contains all necessary routes", () => {
    // Check if routes object has all expected routes
    expect(routes).toHaveProperty("home");
    expect(routes).toHaveProperty("numberHeatmap");
    expect(routes).toHaveProperty("timeHeatmap");
    expect(routes).toHaveProperty("rangeHeatmap");

    // Check if routes have correct paths
    expect(routes.home).toBe("/");
    expect(routes.numberHeatmap).toBe("/numberheatmap");
    expect(routes.timeHeatmap).toBe("/timeheatmap");
    expect(routes.rangeHeatmap).toBe("/rangeheatmap");
  });

  test("navRoutes array contains all routes with correct properties", () => {
    // Check if navRoutes has the correct length
    expect(navRoutes).toHaveLength(4);

    // Check properties of each route object
    navRoutes.forEach((route) => {
      expect(route).toHaveProperty("path");
      expect(route).toHaveProperty("label");
      expect(route).toHaveProperty("id");
    });

    // Check specific routes
    const homeRoute = navRoutes.find((route) => route.path === routes.home);
    expect(homeRoute).toBeDefined();
    expect(homeRoute.label).toBe("Home");
    expect(homeRoute.id).toBeNull();

    const numberHeatmapRoute = navRoutes.find(
      (route) => route.path === routes.numberHeatmap
    );
    expect(numberHeatmapRoute).toBeDefined();
    expect(numberHeatmapRoute.label).toBe("Number Heatmap");
    expect(numberHeatmapRoute.id).toBe("numberheatmap");

    const timeHeatmapRoute = navRoutes.find(
      (route) => route.path === routes.timeHeatmap
    );
    expect(timeHeatmapRoute).toBeDefined();
    expect(timeHeatmapRoute.label).toBe("Time Heatmap");
    expect(timeHeatmapRoute.id).toBe("timestamp");

    const rangeHeatmapRoute = navRoutes.find(
      (route) => route.path === routes.rangeHeatmap
    );
    expect(rangeHeatmapRoute).toBeDefined();
    expect(rangeHeatmapRoute.label).toBe("Range Heatmap");
    expect(rangeHeatmapRoute.id).toBe("rangeheatmap");
  });

  test("all route paths in navRoutes match their corresponding routes object", () => {
    // Check if all paths in navRoutes match the paths in routes
    expect(navRoutes[0].path).toBe(routes.home);
    expect(navRoutes[1].path).toBe(routes.numberHeatmap);
    expect(navRoutes[2].path).toBe(routes.timeHeatmap);
    expect(navRoutes[3].path).toBe(routes.rangeHeatmap);
  });
});
