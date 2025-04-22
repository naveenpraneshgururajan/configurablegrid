import { formatCellValue } from "../../../src/utils/formatters";

describe("formatCellValue", () => {
  it("returns em dash for null or undefined", () => {
    expect(formatCellValue(null, "anyField")).toBe("—");
    expect(formatCellValue(undefined, "anotherField")).toBe("—");
  });

  it("returns original value if invalid date", () => {
    expect(formatCellValue("not-a-date", "updated_at")).toBe("not-a-date");
  });

  it("formats percent and profit fields with %", () => {
    expect(formatCellValue(25, "profit")).toBe("25%");
    expect(formatCellValue(12345.67, "profit_margin_percent")).toBe(
      "12,345.67%"
    );
  });

  it("formats price and revenue fields with $", () => {
    expect(formatCellValue(5000, "price")).toBe("$5,000");
    expect(formatCellValue(9876543.21, "monthly_revenue")).toBe(
      "$9,876,543.21"
    );
  });

  it("formats generic numbers with commas", () => {
    expect(formatCellValue(1000000, "views")).toBe("1,000,000");
    expect(formatCellValue(1234.56, "count")).toBe("1,234.56");
  });

  it("returns original value for non-numeric, non-date fields", () => {
    expect(formatCellValue("Test Product", "name")).toBe("Test Product");
    expect(formatCellValue(true, "isActive")).toBe(true);
  });
});
