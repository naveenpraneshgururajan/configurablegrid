export const routes = {
  home: "/",
  numberHeatmap: "/numberheatmap",
  timeHeatmap: "/timeheatmap",
  rangeHeatmap: "/rangeheatmap",
};
export const navRoutes = [
  {
    path: routes.home,
    label: "Home",
    id: null,
  },
  {
    path: routes.numberHeatmap,
    label: "Number Heatmap",
    id: "numberheatmap",
  },
  {
    path: routes.timeHeatmap,
    label: "Time Heatmap",
    id: "timestamp",
  },
  {
    path: routes.rangeHeatmap,
    label: "Range Heatmap",
    id: "rangeheatmap",
  },
];
