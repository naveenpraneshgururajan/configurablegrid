import {
  getHeatmapColor,
  getRangeStyle,
  getCellValueStyle,
} from "../../../src/utils/styleHelpers";

describe("getHeatmapColor", () => {
  it("returns green (hsl(120, 100%, 50%)) for min value", () => {
    expect(getHeatmapColor(0, 0, 100)).toBe("hsl(0, 100%, 50%)"); // red
    expect(getHeatmapColor(100, 0, 100)).toBe("hsl(120, 100%, 50%)"); // green
  });

  it("returns yellow (approx) for mid value", () => {
    expect(getHeatmapColor(50, 0, 100)).toBe("hsl(60, 100%, 50%)");
  });

  it("clamps values below min", () => {
    expect(getHeatmapColor(-50, 0, 100)).toBe("hsl(0, 100%, 50%)");
  });

  it("clamps values above max", () => {
    expect(getHeatmapColor(150, 0, 100)).toBe("hsl(120, 100%, 50%)");
  });

  it("inverts color when invertColor is true", () => {
    expect(getHeatmapColor(0, 0, 100, true)).toBe("hsl(120, 100%, 50%)");
    expect(getHeatmapColor(100, 0, 100, true)).toBe("hsl(0, 100%, 50%)");
  });
});

describe("getRangeStyle", () => {
  const ranges = [
    { min: 0, max: 50, style: { backgroundColor: "lightblue" } },
    { min: 50, max: 100, style: { backgroundColor: "lightgreen" } },
  ];

  it("returns matching range style", () => {
    expect(getRangeStyle(25, ranges)).toEqual({ backgroundColor: "lightblue" });
    expect(getRangeStyle(75, ranges)).toEqual({
      backgroundColor: "lightgreen",
    });
  });

  it("returns empty object if no match", () => {
    expect(getRangeStyle(150, ranges)).toEqual({});
  });

  it("returns empty object for invalid input", () => {
    expect(getRangeStyle(10, null)).toEqual({});
    expect(getRangeStyle(10, "invalid")).toEqual({});
  });
});

describe("getCellValueStyle", () => {
  const conditions = [
    { value: "Active", style: { color: "green" } },
    { value: "Inactive", style: { color: "gray" } },
    { value: 0, style: { color: "red" } },
  ];

  it("returns matching style for exact string match (case-insensitive)", () => {
    expect(getCellValueStyle("active", conditions)).toEqual({ color: "green" });
    expect(getCellValueStyle("INACTIVE", conditions)).toEqual({
      color: "gray",
    });
  });

  it("returns matching style for numeric value", () => {
    expect(getCellValueStyle(0, conditions)).toEqual({ color: "red" });
  });

  it("returns empty object if no match", () => {
    expect(getCellValueStyle("Unknown", conditions)).toEqual({});
  });

  it("returns empty object for invalid input", () => {
    expect(getCellValueStyle("test", null)).toEqual({});
    expect(getCellValueStyle("test", "invalid")).toEqual({});
  });
});
